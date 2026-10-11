<?php
require_once __DIR__ . '/../../_config/app.php';

// ---------------------------------------------------------------------------
// bootstrap_proxy
// Validates the incoming request and returns the decoded JSON body.
// Call at the top of every proxy file instead of repeating the boilerplate.
// ---------------------------------------------------------------------------

function bootstrap_proxy(): array {
    header('Content-Type: application/json');

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

    return $input;
}

// ---------------------------------------------------------------------------
// curl_request
// Executes a cURL request and returns a normalised response envelope.
// Supports GET, POST, PUT, PATCH, DELETE.
// ---------------------------------------------------------------------------

function curl_request(string $method = 'POST', string $url, array $headers, array $body = []): array {
    $start = microtime(true);

    $ch   = curl_init($url);
    $opts = [
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_ENCODING       => '',
    ];

    if (!empty($body)) {
        $opts[CURLOPT_POSTFIELDS] = json_encode($body);
    }

    curl_setopt_array($ch, $opts);

    $raw         = curl_exec($ch);
    $duration    = round((microtime(true) - $start) * 1000);
    $http_code   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $curl_error  = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        http_response_code(502);
        echo json_encode(['error' => 'cURL error: ' . $curl_error]);
        exit;
    }

    // Parse response headers into key/value pairs
    $response_headers = [];
    foreach (explode("\r\n", substr($raw, 0, $header_size)) as $line) {
        if (str_contains($line, ':')) {
            [$k, $v] = explode(':', $line, 2);
            $response_headers[trim($k)] = trim($v);
        }
    }

    return [
        'status'      => $http_code,
        'duration_ms' => $duration,
        'headers'     => $response_headers,
        'body'        => json_decode(substr($raw, $header_size), true),
    ];
}

?>