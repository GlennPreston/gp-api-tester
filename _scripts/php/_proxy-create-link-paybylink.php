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
    'type' => 'PAYMENT',
    'usage_mode' => $input['usageMode'],
    'usage_limit' => $input['usageLimit'] ?? '',
    'reference' => uniqid(),
    'name' => $input['linkName'],
    'description' => $input['linkDescription'],
    'shippable' => $input['shippable'],
    'transactions' => [
        'allowed_payment_methods' => [
            "CARD"
        ],
        'amount' => $input['amount'],
        'channel' => 'CNP',
        'country' => $input['country'],
        'currency' => $input['currency'],
    ],
];

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