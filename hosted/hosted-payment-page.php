<?php
require_once __DIR__ . '/../_config/app.php';
require_once APP_ROOT . '/_includes/directLoad.php';

$pageTitle = page_title("Hosted Payment Page");
?>

<div data-page-title="<?= htmlspecialchars($pageTitle) ?>">
	<div class="content-header">
		<h2>Hosted Payment Page</h2>
	</div>

	<section id="mode-demo">
		<div class="form-fields">
			<!-- CREDENTIAL FIELDS -->
			<demo-fieldset-credentials-component account-field="true"></demo-fieldset-credentials-component>

			<!-- TRANSACTION DETAIL FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Transaction Details</span></legend>

				<div class="field-row">
					<label class="field-label" for="demo-orderid">Order ID</label>
					<input id="demo-orderid" class="field-input" value="12345678">
				</div>

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

				<div class="field-row">
					<label class="field-label" for="demo-capturemode">Capture Mode</label>
					<input id="demo-capturemode" class="field-input" value="AUTO">
				</div>
			</fieldset>

			<!-- 3DS FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">3DS</span><toggle-switch-component input-id="demo-3ds" is-fieldset=true></toggle-switch-component></legend>

				<div id="demo-3ds-fields" class="form-fieldset-fields">
					<div class="field-row">
						<label class="field-label" for="demo-email">Email</label>
						<input id="demo-email" class="field-input" value="test@example.com">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-phonenumber-countrycode">Phone Number</label>
						<input id="demo-phonenumber-countrycode" class="field-input" value="44">
						<input id="demo-phonenumber-subscribernumber" class="field-input" value="789456123">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingline1">Billing Line 1</label>
						<input id="demo-billingline1" class="field-input" value="Flat 123">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingline2">Billing Line 2</label>
						<input id="demo-billingline2" class="field-input" value="House 456">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingline3">Billing Line 3</label>
						<input id="demo-billingline3" class="field-input" value="Unit 4">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingcity">Billing City</label>
						<input id="demo-billingcity" class="field-input" value="Halifax">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingstate">Billing State</label>
						<input id="demo-billingstate" class="field-input" value="">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingpostalcode">Billing Postal Code</label>
						<input id="demo-billingpostalcode" class="field-input" value="W5 9HR">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-billingcountry">Billing Country</label>
						<input id="demo-billingcountry" class="field-input" value="GB">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingline1">Shipping Line 1</label>
						<input id="demo-shippingline1" class="field-input" value="Apartment 852">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingline2">Shipping Line 2</label>
						<input id="demo-shippingline2" class="field-input" value="Complex 741">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingline3">Shipping Line 3</label>
						<input id="demo-shippingline3" class="field-input" value="House 963">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingcity">Shipping City</label>
						<input id="demo-shippingcity" class="field-input" value="Chicago">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingstate">Shipping State</label>
						<input id="demo-shippingstate" class="field-input" value="IL">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingpostalcode">Shipping Postal Code</label>
						<input id="demo-shippingpostalcode" class="field-input" value="50001">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-shippingcountry">Shipping Country</label>
						<input id="demo-shippingcountry" class="field-input" value="US">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-addressmatchindicator">Address Match Indicator</label>
						<input id="demo-addressmatchindicator" class="field-input" value="YES">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-authenticationpreference">Authentication Preference</label>
						<input id="demo-authenticationpreference" class="field-input" value="NO_PREFERENCE">
					</div>
				</div>
			</fieldset>

			<!-- CARD STORAGE FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Card Storage</span><toggle-switch-component input-id="demo-cardstorage" is-fieldset=true></toggle-switch-component></legend>

				<div id="demo-cardstorage-fields" class="form-fieldset-fields">

					<div class="field-row">
						<field-select-component
							input-id="demo-payerstatus"
							label="Payer Status"
							options="NEW,ACTIVE"
							value="NEW">
						</field-select-component>
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-payerfirstname">Payer First Name</label>
						<input id="demo-payerfirstname" class="field-input" value="James">
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-payerlastname">Payer Last Name</label>
						<input id="demo-payerlastname" class="field-input" value="Mason">
					</div>

					<div class="field-row hidden">
						<label class="field-label" for="demo-payerid">Payer ID</label>
						<input id="demo-payerid" class="field-input">
					</div>

					<div class="field-row">
						<field-select-component
							input-id="demo-storagemode"
							label="Storage Mode"
							options="PROMPT,ON_SUCCESS,ALWAYS"
							value="PROMPT">
						</field-select-component>
					</div>
				</div>
			</fieldset>

			<!-- DIGITAL WALLETS FIELDS -->
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Digital Wallets</span><toggle-switch-component input-id="demo-digitalwallets" is-fieldset=true></toggle-switch-component></legend>

				<div id="demo-digitalwallets-fields" class="form-fieldset-fields">
					<div class="field-row">
						<label class="field-label" for="demo-googlepay">Google Pay</label>
						<toggle-switch-component input-id="demo-googlepay" is-checked=true></toggle-switch-component>
					</div>

					<div class="field-row">
						<label class="field-label" for="demo-applepay">Apple Pay</label>
						<toggle-switch-component input-id="demo-applepay" is-checked=true></toggle-switch-component>
					</div>
				</div>
			</fieldset>

			<div class="form-actions">
                <submit-button-component></submit-button-component>
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
	</section>
</div>

<script src="./_scripts/js/pages/hosted-payment-page.js" type="text/javascript" defer></script>