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
					<input id="demo-account" class="field-input">
				</div>
			`;
		}

		this.innerHTML = `
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Credentials</span></legend>

				<div class="field-row">
					<label class="field-label" for="demo-app-id">App ID</label>
					<input id="demo-app-id" class="field-input">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-app-key">App Key</label>
					<input id="demo-app-key" class="field-input">
				</div>`
				+ accountElement + `
			</fieldset>
		`;
	}
}

customElements.define('demo-fieldset-credentials-component', DemoFieldsetCredentials);