<?php
require_once __DIR__ . '/../../_config/app.php';

header('Content-Type: application/json');

// Only accept POST from internal navigation
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// --- Build request body ---
$body = [
    'account_name' => $input['account'],
    'type' => 'HOSTED_PAYMENT_PAGE',
    'reference' => $input['orderID'],
    'order' => [
        'amount' => $input['amount'],
        'currency' => $input['currency'],
        'reference' => $input['orderID'],
        'transaction_configuration' => [
            'channel' => 'CNP',
            'country' => $input['country'],
            'capture_mode' => $input['captureMode'],
            'allowed_payment_methods' => [
                "CARD"
            ],
        ],
    ],
];

// 3DS fields
if (isset($input['threeDS'])) {
    $body['payer']['email'] = $input['threeDS']['email'];

    $body['payer']['mobile_phone']['country_code'] = $input['threeDS']['phoneNumber']['countryCode'];
    $body['payer']['mobile_phone']['subscriber_number'] = $input['threeDS']['phoneNumber']['subscriberNumber'];

    $body['payer']['billing_address']['line_1'] = $input['threeDS']['billingAddress']['line1'];
    $body['payer']['billing_address']['line_2'] = $input['threeDS']['billingAddress']['line2'];
    $body['payer']['billing_address']['line_3'] = $input['threeDS']['billingAddress']['line3'];
    $body['payer']['billing_address']['city'] = $input['threeDS']['billingAddress']['city'];
    $body['payer']['billing_address']['state'] = $input['threeDS']['billingAddress']['state'];
    $body['payer']['billing_address']['postal_code'] = $input['threeDS']['billingAddress']['postalCode'];
    $body['payer']['billing_address']['country'] = $input['threeDS']['billingAddress']['country'];

    $body['order']['shipping_address']['line_1'] = $input['threeDS']['shippingAddress']['line1'];
    $body['order']['shipping_address']['line_2'] = $input['threeDS']['shippingAddress']['line2'];
    $body['order']['shipping_address']['line_3'] = $input['threeDS']['shippingAddress']['line3'];
    $body['order']['shipping_address']['city'] = $input['threeDS']['shippingAddress']['city'];
    $body['order']['shipping_address']['state'] = $input['threeDS']['shippingAddress']['state'];
    $body['order']['shipping_address']['postal_code'] = $input['threeDS']['shippingAddress']['postalCode'];
    $body['order']['shipping_address']['country'] = $input['threeDS']['shippingAddress']['country'];

    $body['order']['payment_method_configuration']['authentication']['preference'] = $input['threeDS']['authenticationPreference'];
}

// Card storage fields
if (isset($input['cardStorage'])) {
    $body['payer']['status'] = $input['cardStorage']['payerStatus'];
    $body['payer']['id'] = $input['cardStorage']['payerID'];

    if ($input['cardStorage']['payerStatus'] == "NEW") {
        $body['order']['payment_method_configuration']['storage_mode'] = $input['cardStorage']['storageMode'];
    }
}

// Digital wallets fields
if (isset($input['digitalWallets'])) {
    if ($input['digitalWallets']['googlePay']) {
        $body['order']['payment_method_configuration']['digital_wallets']['provider'][] = 'GOOGLE_PAY';
    }

    if ($input['digitalWallets']['applePay']) {
        $body['order']['payment_method_configuration']['digital_wallets']['provider'][] = 'APPLE_PAY';
    }
}

$endpoint  = 'https://apis.sandbox.globalpay.com/ucp/links';
$json_body = json_encode($body);

// --- Build headers ---
$request_headers = [
    'content-type: application/json',
    'accept: application/json',
    'x-gp-version: 2021-03-22',
    'authorization: Bearer '.$input['accessToken'],
];

// --- Execute request via cURL ---
$start = microtime(true);

$ch    = curl_init($endpoint);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $json_body,
    CURLOPT_HTTPHEADER     => $request_headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER         => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_ENCODING       => '',
]);

$raw      = curl_exec($ch);
$duration = round((microtime(true) - $start) * 1000);
$http_code   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$curl_errno  = curl_errno($ch);
$curl_error  = curl_error($ch);

curl_close($ch);

if ($curl_error) {
    http_response_code(502);
    echo json_encode(['error' => 'cURL error: ' . $curl_error]);
    exit;
}

$response_headers_raw = substr($raw, 0, $header_size);
$response_body = substr($raw, $header_size);

// Parse response headers into key/value
$response_headers = [];
foreach (explode("\r\n", $response_headers_raw) as $line) {
    if (str_contains($line, ':')) {
        [$k, $v] = explode(':', $line, 2);
        $response_headers[trim($k)] = trim($v);
    }
}

echo json_encode([
    'request' => [
        'method'   => 'POST',
        'endpoint' => $endpoint,
        'headers'  => $request_headers,
        'body'     => $body,
    ],
    'response' => [
        'status'       => $http_code,
        'duration_ms'  => $duration,
        'headers'      => $response_headers,
        'body'         => json_decode($response_body, true),
    ],
]);
exit;

?>