<?php
require_once __DIR__ . '/../_config/app.php';

$pageTitle = page_title("Profiles");
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
					<div class="content-header">
						<h2>Profiles</h2>
					</div>

					<div class="profiles-layout">
						<!-- Left: profile list -->
						<div class="profiles-col-list">
							<div id="profile-list" class="profile-list"></div>
						</div>

						<!-- Right: detail / edit panel -->
						<div class="profiles-col-detail">
							<!-- Header -->
							<div class="profile-detail-header">
								<span id="profile-detail-title" class="profile-detail-title"></span>
							</div>

							<!-- Form -->
							<div class="form-fields">
								<!-- PROFILE -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Profile</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-name">Name</label>
										<input id="profile-name" class="field-input" disabled>
									</div>
								</fieldset>

								<!-- CREDENTIALS -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Credentials</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-app-id">App ID</label>
										<input id="profile-app-id" class="field-input" disabled>
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-app-key">App Key</label>
										<input id="profile-app-key" class="field-input" disabled>
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-account">Account</label>
										<input id="profile-account" class="field-input" disabled>
									</div>
								</fieldset>

								<!-- TRANSACTION DETAIL FIELDS -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Transaction Details</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-currency">Currency</label>
										<input id="profile-currency" class="field-input" disabled>
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-country">Country</label>
										<input id="profile-country" class="field-input" disabled>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</body>

	<!-- JavaScript -->
	<script>const BASE_URL = "<?= BASE_URL ?>";</script>
	<script src="./_scripts/js/helpers.js" type="text/javascript" defer></script>
	<script src="./_scripts/js/pages/profiles.js" type="text/javascript" defer></script>
</html>