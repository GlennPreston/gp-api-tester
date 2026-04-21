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
		<p><i>Demo mode coming soon...</i></p>
	</section>

	<section id="mode-debug" class="hidden">
		<!--p><i>Debug mode coming soon...</i></p-->
		<div class="debug-block">
			<div class="debug-block-header">
				<span class="debug-block-title">Endpoint</span>
			</div>

			<div class="debug-endpoint-row">
				<method-dropdown-component method="POST"></method-dropdown-component>
			</div>
		</div>
	</section>
</div>