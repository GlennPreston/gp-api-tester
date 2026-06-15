<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Drop-In UI");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Drop-In UI</h2>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component account-field="true"></demo-fieldset-credentials-component>

			<div class="form-actions">
                <submit-button-component></submit-button-component>
            </div>

			<div class="drop-in-ui-spinner hidden" id="drop-in-ui-spinner">
				<div class="drop-in-ui-spinner-dots">
					<span></span><span></span><span></span>
				</div>
				<p>Loading Drop-In UI</p>
			</div>

			<div class="drop-in-ui">
				<div id="credit-card-form"></div>
			</div>

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

<script src="./_scripts/js/pages/drop-in-ui.js" type="text/javascript" defer></script>