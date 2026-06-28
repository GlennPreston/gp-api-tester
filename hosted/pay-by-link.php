<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Pay by Link");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Pay by Link</h2>

		<!-- PROFILE SELECTOR -->
		<profile-selector-component></profile-selector-component>
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
			</fieldset>

			<!-- Link FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Link Details</span></legend>

				<div class="field-row">
					<field-select-component
						input-id="demo-usagemode"
						label="Usage Mode"
						options="SINGLE,MULTIPLE"
						value="SINGLE">
					</field-select-component>
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-usagelimit">Usage Limit</label>
					<input id="demo-usagelimit" class="field-input" value="1">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-linkname">Link Name</label>
					<input id="demo-linkname" class="field-input" value="iphone 14">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-linkdescription">Link Description</label>
					<input id="demo-linkdescription" class="field-input" value="iPhone 14 Max">
				</div>

				<div class="field-row">
					<field-select-component
						input-id="demo-shippable"
						label="Shippable"
						options="NO,YES"
						value="NO">
					</field-select-component>
				</div>
			</fieldset>

			<!-- FORM ACTIONS -->
			<div class="form-actions">
                <submit-button-component></submit-button-component>
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
	</section>
</div>

<script src="./_scripts/js/pages/pay-by-link.js" type="text/javascript" defer></script>