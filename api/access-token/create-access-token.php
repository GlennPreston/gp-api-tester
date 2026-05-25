<?php
require_once __DIR__ . '/../../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Create Access Token");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Create Access Token</h2>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component></demo-fieldset-credentials-component>
		</div>

		<div class="form-actions">
            <submit-button-component></submit-button-component>
        </div>

		<div class="response-block">
			<div class="response-block-header">
				<span class="response-block-title">Response</span>
			</div>

			<div class="response-block-body">
				<div class="response-block-body-empty">
                    <pre>Send a request to see the response</pre>
                </div>

				<div class="response-block-body-content hidden">
					<!--pre class="response-block-body-content-output">Hello World!</pre-->
				</div>
			</div>
		</div>
	</section>
</div>

<script src="./_scripts/js/pages/create-access-token.js" type="text/javascript" defer></script>