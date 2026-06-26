<?php
require_once __DIR__ . '/../../_config/app.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['profiles']) || !is_array($input['profiles'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

$file = APP_ROOT . '/_data/profiles.json';
$dir  = dirname($file);

if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

if (!is_writable($dir)) {
    http_response_code(500);
    echo json_encode(['error' => '_data/ directory is not writable by the server']);
    exit;
}

$data = [
    'profiles' => $input['profiles'],
    'activeId' => $input['activeId'] ?? null,
];

file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
echo json_encode(['ok' => true]);