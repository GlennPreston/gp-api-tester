<?php
require_once __DIR__ . '/functions.php';

$input = bootstrap_proxy();

// --- Build request body ---
$body = [
    'account_name' => $input['account'],
    'type' => 'HOSTED_PAYMENT_PAGE',
    'reference' => uniqid(),
    'order' => [
        'amount' => $input['amount'],
        'currency' => $input['currency'],
        'transaction_configuration' => [
            'channel' => 'CNP',
            'country' => $input['country'],
            'capture_mode' => $input['captureMode'],
            'allowed_payment_methods' => [
                "CARD"
            ],
        ],
    ],
    'notifications' => [
        'return_url' => $input['notifications']['returnURL'] ?? '',
    ],
];

$body['order']['reference'] = $body['reference'];

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
    $body['payer']['status'] = 'ACTIVE';
    $body['payer']['id'] = $input['cardStorage']['payerID'];

    $body['order']['payment_method_configuration']['storage_mode'] = $input['cardStorage']['storageMode'];
}

// Digital wallets fields
if (isset($input['digitalWallets'])) {
    if ($input['digitalWallets']['googlePay']) {
        $body['order']['payment_method_configuration']['digital_wallets']['provider'][] = 'googlepay';
    }

    if ($input['digitalWallets']['applePay']) {
        $body['order']['payment_method_configuration']['digital_wallets']['provider'][] = 'applepay';
    }
}

// APMs fields
if (isset($input['apms'])) {
    $body['payer']['first_name'] = 'James';
    $body['payer']['last_name'] = 'Mason';

    if ($input['apms']['testPay']) {
        $body['order']['transaction_configuration']['allowed_payment_methods'][] = 'testpay';
    }

    if ($input['apms']['weChatPay']) {
        $body['order']['transaction_configuration']['allowed_payment_methods'][] = 'wechatpay';
    }
}


// --- Build headers ---
$headers = [
    'content-type: application/json',
    'accept: application/json',
    'x-gp-version: 2021-03-22',
    'authorization: Bearer '.$input['accessToken'],
];


// --- Execute request via cURL ---
$method = 'POST';
$url = 'https://apis.sandbox.globalpay.com/ucp/links';

$response = curl_request($method, $url, $headers, $body);

echo json_encode([
    'request'  => ['method' => $method, 'endpoint' => $url, 'body' => $body],
    'response' => $response,
]);
exit;

?>