<?php
require_once __DIR__ . '/functions.php';

$input = bootstrap_proxy();

// --- Build secret: SHA512(nonce.app_key) ---
$nonce  = uniqid('', true);
$secret = hash('sha512', $nonce . $input['appKey']);


// --- Build request body ---
$body = [
    'app_id'     => $input['appID'],
    'nonce'      => $nonce,
    'secret'     => $secret,
    'grant_type' => 'client_credentials',
];

// Token Settings fields
$body['restricted_token'] = $input['restrictedToken'] ?? '';

// Permission fields
if (isset($input['permissions'])) {
    $body['permissions'] = $input['permissions'];
}

// Expire fields
if (isset($input['expire'])) {
    $body['seconds_to_expire'] = $input['expire']['secondsToExpire'] ?? '';
    $body['interval_to_expire'] = $input['expire']['intervalToExpire'] ?? '';
}


// --- Build headers ---
$headers = [
    'content-type: application/json',
    'accept: application/json',
    'x-gp-version: 2021-03-22',
];


// --- Execute request via cURL ---
$method = 'POST';
$url = 'https://apis.sandbox.globalpay.com/ucp/accesstoken';

$response = curl_request($method, $url, $headers, $body);

echo json_encode([
    'request'  => ['method' => $method, 'endpoint' => $url, 'body' => $body],
    'response' => $response,
]);
exit;

?>