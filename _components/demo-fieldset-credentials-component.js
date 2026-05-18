class DemoFieldsetCredentials extends HTMLElement {
	// Observed attributes
    static get observedAttributes() {
        return ['account-field'];
    }

	constructor() {
		super();
	}
	
	// -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

	connectedCallback() {
		this._accountField = this.getAttribute('account-field');
		var accountElement = "";

		if (this._accountField == "true") {
			accountElement = `
				<div class="field-row">
					<label class="field-label" for="demo-account">Account</label>
					<input id="demo-account" class="field-input" value="transaction_processing">
				</div>
			`;
		}

		this.innerHTML = `
			<fieldset class="form-fieldset">
				<legend>Credentials</legend>

				<div class="field-row">
					<label class="field-label" for="demo-app-id">App ID</label>
					<input id="demo-app-id" class="field-input" value="jFmpwykc5x8btC5PvIO4mAj94I7bp0si">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-app-key">App Key</label>
					<input id="demo-app-key" class="field-input" value="EUBL3eCVbSg9mAzt">
				</div>`
				+ accountElement + `
			</fieldset>
		`;
	}
}

customElements.define('demo-fieldset-credentials-component', DemoFieldsetCredentials);