<?php
require_once __DIR__ . '/functions.php';

$input = bootstrap_proxy();

// --- Build request body ---
$body = [
    'first_name' => $input['firstName'],
    'last_name' => $input['lastName'],
    'reference' => uniqid(),
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
$url = 'https://apis.sandbox.globalpay.com/ucp/payers';

$response = curl_request($method, $url, $headers, $body);

echo json_encode([
    'request'  => ['method' => $method, 'endpoint' => $url, 'body' => $body],
    'response' => $response,
]);
exit;

?>