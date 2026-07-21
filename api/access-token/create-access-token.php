<?php
require_once __DIR__ . '/../../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Create Access Token");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Create Access Token</h2>

		<!-- PROFILE SELECTOR -->
		<profile-selector-component></profile-selector-component>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component></demo-fieldset-credentials-component>

			<!-- PERMISSIONS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Permissions</span><toggle-switch-component input-id="demo-permissions" is-fieldset=true></toggle-switch-component></legend>

				<div id="demo-permissions-fields" class="form-fieldset-fields">
					<div class="field-row">
						<field-multiselect-component
							input-id="demo-permissions"
							label="Permissions"
							options="TRN_POST_Authorize,TRN_POST_Capture,TRN_POST_Refund,TRN_POST_Void,TRN_POST_Reversal,
								TRN_GET_TransactionDetail,PMT_POST_Create,PMT_GET_Details,PMT_DELETE_Payment,HPP_POST_Charge,
								HPP_POST_Authorize,DIS_POST_Create,DIS_GET_Detail,BAT_POST_Close,BAT_GET_Detail">
						</field-multiselect-component>
					</div>
				</div>
			</fieldset>

			<!-- EXPIRE -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Expire</span><toggle-switch-component input-id="demo-expire" is-fieldset=true></toggle-switch-component></legend>

				<div id="demo-expire-fields" class="form-fieldset-fields">
					<div class="field-row">
						<field-select-component
							input-id="demo-expiretype"
							label="Expire Type"
							options="Seconds to Expire,Interval to Expire"
							value="Seconds to Expire">
						</field-select-component>
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-secondstoexpire">Seconds to Expire</label>
						<input id="demo-secondstoexpire" class="field-input" value="60">
					</div>

					<div class="field-row hidden">
						<field-select-component
							input-id="demo-intervaltoexpire"
							label="Interval to Expire"
							options="5_MINUTES,10_MINUTES,30_MINUTES,1_HOUR,3_HOURS,6_HOURS,12_HOURS,DAY,WEEK"
							value="5_MINUTES">
						</field-select-component>
					</div>
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

<script src="./_scripts/js/pages/create-access-token.js" type="text/javascript" defer></script>