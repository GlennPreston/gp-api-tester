<?php

define('APP_ROOT', dirname(__DIR__));
define('BASE_URL', str_replace('\\', '/', str_replace(realpath($_SERVER['DOCUMENT_ROOT']), '', APP_ROOT)) . '/');
define('APP_NAME', 'GP API Tester');

// Helper for page titles
function page_title($title = null) {
	if ($title) {
		return $title . " | " . APP_NAME;
	}

	return APP_NAME;
}

?>