<?php
require_once __DIR__ . '/functions.php';

$input = bootstrap_proxy();

// --- Build request body ---
$body = [
    'account_name' => $input['account'],
    'channel' => 'CNP',
    'type' => 'SALE',
    'amount' => $input['amount'],
    'currency' => $input['currency'],
    'country' => $input['country'],
    'reference' => uniqid(),
    'payment_method' => [
        'name' => 'Jane',
        'entry_mode' => 'ECOM',
        'id' => $input['pmtID'],
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
$url = 'https://apis.sandbox.globalpay.com/ucp/transactions';

$response = curl_request($method, $url, $headers, $body);

echo json_encode([
    'request'  => ['method' => $method, 'endpoint' => $url, 'body' => $body],
    'response' => $response,
]);
exit;

?>