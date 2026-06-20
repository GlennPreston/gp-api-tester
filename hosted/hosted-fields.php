<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Hosted Fields");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Hosted Fields</h2>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component account-field="true"></demo-fieldset-credentials-component>

			<!-- TRANSACTION DETAIL FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Transaction Details</span></legend>

				<div class="field-row">
					<label class="field-label" for="demo-amount">Amount</label>
					<input id="demo-amount" class="field-input" value="1000">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-currency">Currency</label>
					<input id="demo-currency" class="field-input" value="EUR">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-country">Country</label>
					<input id="demo-country" class="field-input" value="IE">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-capturemode">Capture Mode</label>
					<input id="demo-capturemode" class="field-input" value="AUTO">
				</div>
			</fieldset>

			<!-- FORM ACTIONS -->
			<div class="form-actions">
                <submit-button-component></submit-button-component>
            </div>

			<!-- HOSTED FIELDS -->
			<div class="hosted-fields-spinner hidden" id="hosted-fields-spinner">
				<div class="hosted-fields-spinner-dots">
					<span></span><span></span><span></span>
				</div>
				<p>Loading Hosted Fields</p>
			</div>

			<div class="hosted-fields">
				<form id="payment-form">
					<label for="card-number">Card Number</label>
					<div id="card-number"></div>

					<label for="card-expiration">Expiry Date</label>
					<div id="card-expiration"></div>

					<label for="card-cvv">Security Code</label>
					<div id="card-cvv"></div>

					<label for="card-holder-name">Cardholder Name</label>
					<div id="card-holder-name"></div>

					<div id="submit-button"></div>
				</form>
			</div>

			<!-- RESPONSE BLOCK -->
			<div class="response-block-outer hidden">
				<div class="response-block">
					<div class="response-block-header">
						<span class="response-block-title">Response</span>
					</div>

					<div class="response-block-body">
						<div class="response-block-body-empty">
							<pre>Send a request to see the response</pre>
						</div>

						<div class="response-block-body-content hidden">
						</div>
					</div>
				</div>
			</div>
		</div>
	</section
</div>

<script src="./_scripts/js/pages/hosted-fields.js" type="text/javascript" defer></script>