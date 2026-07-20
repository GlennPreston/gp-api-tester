<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Hosted Overview");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<h2>Hosted Overview</h2>
	
	<p class="overview-subtitle">Hosted examples demonstrate payment flows that let you accept payments without handling sensitive card data directly.</p>

	<div class="overview-cards">
		<div class="overview-cards-row">
			<a class="overview-card" href="./hosted/pay-by-link.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Pay by Link</span>
					<span class="overview-card-desc">Pay by Link gives merchants the ability to automatically generate a unique payment link for their customers without needing a website.
						When a customer uses the link, they are redirected to a payment page to enter their payment details.
						This unique link can be set for single use or multiple use, depending on the business case.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>

		<div class="overview-cards-row">
			<a class="overview-card" href="./hosted/hosted-payment-page.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Hosted Payment Page</span>
					<span class="overview-card-desc">The Hosted Payment Page (HPP) is our PCI DSS-compliant hosted solution, allowing merchants to capture addresses for customer billing and shipping,
						contact information, and card details all through one simple redirect or embedded integration.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>

		<div class="overview-cards-row">
			<a class="overview-card" href="./hosted/hosted-fields.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Hosted Fields</span>
					<span class="overview-card-desc">Hosted Fields provide the most flexibility to the checkout experience while still adhering to the minimum PCI DSS requirements.
						Hosted Fields are prebuilt but customizable fields that accept customer card data, from which a single-use token is created to use as payment instead of the sensitive data.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>

		<div class="overview-cards-row">
			<a class="overview-card" href="./hosted/drop-in-ui.php">
				<div class="overview-card-body">
					<span class="overview-card-title">Drop-In UI</span>
					<span class="overview-card-desc">Drop-In UI provides the most flexibility when it comes to customizing the checkout experience.
						Similar to our prebuilt Hosted Fields solution, our prebuilt Drop-In user interface (UI) components are also customizable but allow you to enhance the payment form with different styles and themes,
						multiple payment methods, as well as the many services we offer merchants.</span>
				</div>

				<svg class="overview-card-arrow" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<path d="M1 1l6 6-6 6"></path>
				</svg>
			</a>
		</div>
	</div>
</div>