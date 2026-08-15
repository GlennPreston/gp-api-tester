class DemoFieldsetNotificationURLs extends HTMLElement {
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
		this.innerHTML = `
			<fieldset class="form-fieldset">
				<legend><span class="legend-text">Notifications</span></legend>

				<div class="field-row">
					<label class="field-label" for="demo-returnurl">Return URL</label>
					<input id="demo-returnurl" class="field-input" value="https://rlxcarts.dev.globalpay-ecommerce.com/jason/HPP/response.php">
				</div>
			</fieldset>
		`;
	}
}

customElements.define('demo-fieldset-notification-urls-component', DemoFieldsetNotificationURLs);