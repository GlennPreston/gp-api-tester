<?php
if (empty($_SERVER['HTTP_X_INTERNAL_NAVIGATION'])) {
    $fullPath = str_replace('\\', '/', $_SERVER['SCRIPT_FILENAME']);
    $appRoot  = str_replace('\\', '/', APP_ROOT);
    $path     = ltrim(str_replace($appRoot, '', $fullPath), '/');

    if (str_starts_with($path, 'hosted')) {
        $section = 'hosted';
    }
    else if (str_starts_with($path, 'api')) {
        $section = 'api';
    }
    else {
        $section = '';
    }

    header("Location: " . BASE_URL . $section . "/overview.php?content=" . $path);

    exit;
}
?>