<?php
require_once __DIR__ . '/../../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Create Access Token");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Create Access Token</h2>

		<mode-toggle-component></mode-toggle-component>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component></demo-fieldset-credentials-component>
		</div>

		<div class="form-actions">
            <submit-button-component></submit-button-component>
        </div>
	</section>

	<section id="mode-debug" class="hidden">
		<!--p><i>Debug mode coming soon...</i></p-->
		<div class="debug-block">
			<div class="debug-block-header">
				<span class="debug-block-title">Endpoint</span>
			</div>

			<div class="debug-endpoint-row">
				<method-dropdown-component method="POST"></method-dropdown-component>

				<input id="debug-endpoint-input" class="debug-endpoint-input" type="text" value="https://apis.sandbox.globalpay.com/ucp/accesstokens">
			</div>
		</div>
	</section>
</div>

<script src="./_scripts/js/create-access-token.js" type="text/javascript" defer></script>