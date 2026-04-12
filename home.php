<?php
require_once __DIR__ . '/_config/app.php';

$pageTitle = page_title("Home");
?>

<!DOCTYPE html>

<html data-theme="light">
	<?php require_once APP_ROOT . "/_includes/head.php"; ?>
	
	<body>
		<div class="app-layout-no-sidebar">
			<navbar-component></navbar-component>
		
			<!-- Main Content -->
			<main class="content">
				<div id="content-inner" class="content-inner">
					<h2>Welcome to the GP API Demo Tool</h2>
				</div>
			</main>
		</div>
	</body>

	<!-- JavaScript -->
	<script>const BASE_URL = "<?= BASE_URL ?>";</script>
	<script src="./_scripts/js/router.js" type="text/javascript" defer></script>
</html>