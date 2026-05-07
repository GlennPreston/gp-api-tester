class ToggleSwitch extends HTMLElement {
	// Observed attributes
    static get observedAttributes() {
        return ['input-id'];
    }

    constructor() {
        super();
    }

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    connectedCallback() {
        this._inputID = this.getAttribute('input-id');

        this.innerHTML = `
			<label class="toggle-switch">
                <input id="${this._inputID}" type="checkbox">
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
		`;
    }
}

customElements.define('toggle-switch-component', ToggleSwitch);