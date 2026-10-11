<?php
require_once __DIR__ . '/functions.php';

$input = bootstrap_proxy();

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