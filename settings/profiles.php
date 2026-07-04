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
							<button id="profile-add" class="btn-add-profile">
								<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
									<path d="M7 2v10M2 7h10"></path>
								</svg>
								Add Profile
							</button>
						</div>

						<!-- Right: detail / edit panel -->
						<div class="profiles-col-detail">
							<!-- Empty state -->
							<div id="profile-detail-empty" class="profile-detail-empty">
								<svg viewBox="0 0 48 48" fill="none">
									<circle cx="24" cy="18" r="8" stroke="currentColor" stroke-width="1.5"/>
									<path d="M8 40c0-8.8 7.2-14 16-14s16 5.2 16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
								</svg>
								<p>Select a profile or add a new one</p>
							</div>

							<!-- Form -->
							<div id="profile-detail-form" class="form-fields hidden">
								<!-- Header -->
								<div class="profile-detail-header">
									<span id="profile-detail-title" class="profile-detail-title"></span>
								</div>

								<!-- PROFILE -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Profile</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-name">Name</label>
										<input id="profile-name" class="field-input">
									</div>
								</fieldset>

								<!-- CREDENTIALS -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Credentials</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-app-id">App ID</label>
										<input id="profile-app-id" class="field-input">
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-app-key">App Key</label>
										<input id="profile-app-key" class="field-input">
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-account">Account</label>
										<input id="profile-account" class="field-input">
									</div>
								</fieldset>

								<!-- TRANSACTION DETAIL FIELDS -->
								<fieldset class="form-fieldset">
									<legend><span class="legend-text">Transaction Details</span></legend>

									<div class="field-row">
										<label class="field-label" for="profile-currency">Currency</label>
										<input id="profile-currency" class="field-input">
									</div>

									<div class="field-row">
										<label class="field-label" for="profile-country">Country</label>
										<input id="profile-country" class="field-input">
									</div>
								</fieldset>
							</div>

							<!-- FORM ACTIONS -->
							<div class="profile-detail-actions">
								<button id="profile-save" class="btn-save hidden">
									<span class="btn-text">Save</span>
									<span class="btn-spinner hidden"></span>
								</button>

								<button id="profile-delete" class="btn-delete hidden">Delete</button>
								<!-- Confirmation Modal -->
								<div id="profile-delete-modal" class="modal">
									<div class="modal-content">
										<h2>Confirm Deletion</h2>
										<p>Are you sure you want to delete this profile?</p>

										<div class="buttons">
											<button id="profile-delete-cancel" class="cancel">Cancel</button>
											<button id="profile-delete-confirm" class="delete">Delete</button>
										</div>
									</div>
								</div>
							</div>

							<!-- RESPONSE BLOCK -->
							<div id="profile-feedback" class="profile-feedback hidden"></div>
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