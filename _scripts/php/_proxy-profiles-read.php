<?php
require_once __DIR__ . '/../../_config/app.php';
header('Content-Type: application/json');

$file = APP_ROOT . '/_data/profiles.json';

if (!file_exists($file)) {
    echo json_encode(['profiles' => [], 'activeId' => null]);
    exit;
}

$content = file_get_contents($file);
$data    = json_decode($content, true);

if (!is_array($data) || !isset($data['profiles'])) {
    echo json_encode(['profiles' => [], 'activeId' => null]);
    exit;
}

echo json_encode($data);