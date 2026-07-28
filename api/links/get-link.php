<?php
require_once __DIR__ . '/../../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Get Link");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Get Link</h2>

		<!-- PROFILE SELECTOR -->
		<profile-selector-component></profile-selector-component>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component></demo-fieldset-credentials-component>

			<!-- DETAILS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Details</span></legend>

				<div class="field-row">
					<label class="field-label" for="getlink-linkid">Link ID</label>
					<input id="getlink-linkid" class="field-input">
				</div>
			</fieldset>
		</div>

		<!-- FORM ACTIONS -->
		<div class="form-actions">
            <submit-button-component></submit-button-component>
        </div>

		<!-- RESPONSE BLOCK -->
		<div class="response-block-outer">
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
	</section>
</div>

<script src="./_scripts/js/pages/get-link.js" type="text/javascript" defer></script>