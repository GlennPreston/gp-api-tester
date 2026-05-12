class DemoFieldsetCredentials extends HTMLElement {
	constructor() {
		super();
	}
	
	// -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

	connectedCallback() {
		this.innerHTML = `
			<fieldset class="form-fieldset">
				<legend>Credentials</legend>

				<div class="field-row">
					<label class="field-label" for="demo-app-id">App ID</label>
					<input id="demo-app-id" class="field-input">
				</div>

				<div class="field-row">
					<label class="field-label" for="demo-app-key">App Key</label>
					<input id="demo-app-key" class="field-input">
				</div>
			</fieldset>
		`;
	}
}

customElements.define('demo-fieldset-credentials-component', DemoFieldsetCredentials);