<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("API Overview");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<h2>API Overview</h2>
	
	<p class="overview-subtitle">API examples allow you to test individual REST API operations.</p>

	<div class="overview-cards">
		<div class="overview-cards-row">
			<a class="overview-card" href="./api/access-token/create-access-token.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Access Token</span>
					<span class="overview-card-desc">Learn how to generate a single-use key to start making API requests.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>

		<div class="overview-cards-row">
			<a class="overview-card" href="./api/links/create-link.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Links</span>
					<span class="overview-card-desc">Allow customers to pay with a unique payment link.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>
</div>