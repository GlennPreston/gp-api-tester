<?php
require_once __DIR__ . "/../_config/app.php";

$pageTitle = page_title("API Overview");
?>

<!DOCTYPE html>

<html data-theme="light">
	<?php require_once APP_ROOT . "/_includes/head.php"; ?>
	
	<body>
		<div class="app-layout-sidebar">
			<navbar-component></navbar-component>

			<sidebar-component section="api"></sidebar-component>
		
			<!-- Main Content -->
			<main class="content">
				<div id="content-inner" class="content-inner">
				</div>
			</main>
		</div>
	</body>

	<!-- JavaScript -->
	<script>const BASE_URL = "<?= BASE_URL ?>";</script>
	<script src="./_scripts/js/router.js" type="text/javascript" defer></script>
</html>