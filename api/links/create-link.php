<?php
require_once __DIR__ . '/../../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Create Link");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Create Link</h2>

		<!-- PROFILE SELECTOR -->
		<profile-selector-component></profile-selector-component>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component account-field="true"></demo-fieldset-credentials-component>

			<!-- LINK TYPE -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Link Settings</span></legend>

				<div class="field-row">
					<field-select-component
						input-id="demo-linktype"
						label="Link Type"
						options="Pay by Link,Hosted Payment Page"
						value="Pay by Link">
					</field-select-component>
				</div>
			</fieldset>

			<!-- PAY BY LINK SECTION -->
			<section id="createlink-paybylink" class="form-fields">
				<!-- TRANSACTION DETAIL FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">Transaction Details</span></legend>

					<div class="field-row">
						<label class="field-label" for="paybylink-amount">Amount</label>
						<input id="paybylink-amount" class="field-input" value="1000">
					</div>

					<div class="field-row">
						<label class="field-label" for="paybylink-currency">Currency</label>
						<input id="paybylink-currency" class="field-input" value="EUR">
					</div>

					<div class="field-row">
						<label class="field-label" for="paybylink-country">Country</label>
						<input id="paybylink-country" class="field-input" value="IE">
					</div>
				</fieldset>

				<!-- Link FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">Link Details</span></legend>

					<div class="field-row">
						<field-select-component
							input-id="paybylink-usagemode"
							label="Usage Mode"
							options="SINGLE,MULTIPLE"
							value="SINGLE">
						</field-select-component>
					</div>

					<div class="field-row">
						<label class="field-label" for="paybylink-usagelimit">Usage Limit</label>
						<input id="paybylink-usagelimit" class="field-input" value="1">
					</div>

					<div class="field-row">
						<label class="field-label" for="paybylink-linkname">Link Name</label>
						<input id="paybylink-linkname" class="field-input" value="iphone 14">
					</div>

					<div class="field-row">
						<label class="field-label" for="paybylink-linkdescription">Link Description</label>
						<input id="paybylink-linkdescription" class="field-input" value="iPhone 14 Max">
					</div>

					<div class="field-row">
						<field-select-component
							input-id="paybylink-shippable"
							label="Shippable"
							options="NO,YES"
							value="NO">
						</field-select-component>
					</div>
				</fieldset>
			</section>

			<!-- HOSTED PAYMENT PAGE SECTION -->
			<section id="createlink-hpp" class="form-fields hidden">
				<!-- TRANSACTION DETAIL FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">Transaction Details</span></legend>

					<div class="field-row">
						<label class="field-label" for="hpp-amount">Amount</label>
						<input id="hpp-amount" class="field-input" value="1000">
					</div>

					<div class="field-row">
						<label class="field-label" for="hpp-currency">Currency</label>
						<input id="hpp-currency" class="field-input" value="EUR">
					</div>

					<div class="field-row">
						<label class="field-label" for="hpp-country">Country</label>
						<input id="hpp-country" class="field-input" value="IE">
					</div>

					<div class="field-row">
						<field-select-component
							input-id="hpp-capturemode"
							label="Capture Mode"
							options="AUTO,LATER,MULTIPLE"
							value="AUTO">
						</field-select-component>
					</div>
				</fieldset>

				<!-- 3DS FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">3DS</span><toggle-switch-component input-id="hpp-3ds" is-fieldset=true></toggle-switch-component></legend>

					<div id="hpp-3ds-fields" class="form-fieldset-fields">
						<div class="field-row">
							<label class="field-label" for="hpp-email">Email</label>
							<input id="hpp-email" class="field-input" value="test@example.com">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-phonenumber-countrycode">Phone Number</label>
							<input id="hpp-phonenumber-countrycode" class="field-input" value="44">
							<input id="hpp-phonenumber-subscribernumber" class="field-input" value="789456123">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingline1">Billing Line 1</label>
							<input id="hpp-billingline1" class="field-input" value="Flat 123">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingline2">Billing Line 2</label>
							<input id="hpp-billingline2" class="field-input" value="House 456">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingline3">Billing Line 3</label>
							<input id="hpp-billingline3" class="field-input" value="Unit 4">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingcity">Billing City</label>
							<input id="hpp-billingcity" class="field-input" value="Halifax">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingstate">Billing State</label>
							<input id="hpp-billingstate" class="field-input" value="">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingpostalcode">Billing Postal Code</label>
							<input id="hpp-billingpostalcode" class="field-input" value="W5 9HR">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-billingcountry">Billing Country</label>
							<input id="hpp-billingcountry" class="field-input" value="GB">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingline1">Shipping Line 1</label>
							<input id="hpp-shippingline1" class="field-input" value="Apartment 852">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingline2">Shipping Line 2</label>
							<input id="hpp-shippingline2" class="field-input" value="Complex 741">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingline3">Shipping Line 3</label>
							<input id="hpp-shippingline3" class="field-input" value="House 963">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingcity">Shipping City</label>
							<input id="hpp-shippingcity" class="field-input" value="Chicago">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingstate">Shipping State</label>
							<input id="hpp-shippingstate" class="field-input" value="IL">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingpostalcode">Shipping Postal Code</label>
							<input id="hpp-shippingpostalcode" class="field-input" value="50001">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-shippingcountry">Shipping Country</label>
							<input id="hpp-shippingcountry" class="field-input" value="US">
						</div>

						<div class="field-row">
							<field-select-component
								input-id="hpp-addressmatchindicator"
								label="Address Match Indicator"
								options="YES,NO"
								value="YES">
							</field-select-component>
						</div>

						<div class="field-row">
							<field-select-component
								input-id="hpp-authenticationpreference"
								label="Authentication Preference"
								options="NO_PREFERENCE,NO_CHALLENGE_REQUESTED,CHALLENGE_PREFERRED,CHALLENGE_MANDATED,
									NO_CHALLENGE_REQUESTED_TRANSACTION_RISK_ANALYSIS_PERFORMED,NO_CHALLENGE_REQUESTED_DATA_SHARE_ONLY,
									NO_CHALLENGE_REQUESTED_SCA_ALREADY_PERFORMED,NO_CHALLENGE_REQUESTED_WHITELIST,CHALLENGE_REQUESTED_PROMPT_FOR_WHITELIST"
								value="NO_PREFERENCE">
							</field-select-component>
						</div>
					</div>
				</fieldset>

				<!-- CARD STORAGE FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">Card Storage</span><toggle-switch-component input-id="hpp-cardstorage" is-fieldset=true></toggle-switch-component></legend>

					<div id="hpp-cardstorage-fields" class="form-fieldset-fields">

						<div class="field-row">
							<field-select-component
								input-id="hpp-payerstatus"
								label="Payer Status"
								options="NEW,ACTIVE"
								value="NEW">
							</field-select-component>
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-payerfirstname">Payer First Name</label>
							<input id="hpp-payerfirstname" class="field-input" value="James">
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-payerlastname">Payer Last Name</label>
							<input id="hpp-payerlastname" class="field-input" value="Mason">
						</div>

						<div class="field-row hidden">
							<label class="field-label" for="hpp-payerid">Payer ID</label>
							<input id="hpp-payerid" class="field-input">
						</div>

						<div class="field-row">
							<field-select-component
								input-id="hpp-storagemode"
								label="Storage Mode"
								options="PROMPT,ON_SUCCESS,ALWAYS"
								value="PROMPT">
							</field-select-component>
						</div>
					</div>
				</fieldset>

				<!-- DIGITAL WALLETS FIELDS -->
				<fieldset class="form-fieldset">
					<legend><span class="legend-text">Digital Wallets</span><toggle-switch-component input-id="hpp-digitalwallets" is-fieldset=true></toggle-switch-component></legend>

					<div id="hpp-digitalwallets-fields" class="form-fieldset-fields">
						<div class="field-row">
							<label class="field-label" for="hpp-googlepay">Google Pay</label>
							<toggle-switch-component input-id="hpp-googlepay" is-checked=true></toggle-switch-component>
						</div>

						<div class="field-row">
							<label class="field-label" for="hpp-applepay">Apple Pay</label>
							<toggle-switch-component input-id="hpp-applepay" is-checked=true></toggle-switch-component>
						</div>
					</div>
				</fieldset>
			</section>
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

<script src="./_scripts/js/pages/create-link.js" type="text/javascript" defer></script>