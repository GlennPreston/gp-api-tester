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
					<h2>GP API Tester</h2>

					<p class="overview-subtitle">An interactive sandbox for exploring and testing the Global Payments REST API. Browse hosted payment integrations, test API operations, and view responses.</p>

					<div class="overview-cards">
						<div class="overview-cards-row">
							<a class="overview-card" href="./hosted/overview.php">
								<div class="overview-card-body">
									<span class="overview-card-title">Hosted Examples</span>
									<span class="overview-card-desc">Test hosted payment integrations - Pay by Link, Hosted Payment Page, Hosted Fields, and Drop-In UI.</span>
								</div>

								<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
									<path d="M1 1l6 6-6 6"></path>
								</svg>
							</a>

							<a class="overview-card" href="./api/overview.php">				
								<div class="overview-card-body">
									<span class="overview-card-title">API Examples</span>
									<span class="overview-card-desc">Explore the REST API - authenticate with access tokens, create payment links, and inspect full request and response payloads.</span>
								</div>

								<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
									<path d="M1 1l6 6-6 6"></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	</body>

	<!-- JavaScript -->
	<script>const BASE_URL = "<?= BASE_URL ?>";</script>
	<script src="./_scripts/js/router.js" type="text/javascript" defer></script>
</html>