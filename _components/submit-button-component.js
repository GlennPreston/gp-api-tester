class SubmitButton extends HTMLElement {
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
			<button id="${this._inputID}" class="btn-primary">
                <span class="btn-text">Send Request</span>
                <span class="btn-spinner hidden"></span>
            </button>
		`;
	}

	// -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

	setLoading(on) {
		const btn  = document.querySelector("#"+this._inputID);

        btn.querySelector('.btn-text').classList.toggle('hidden', on);
        btn.querySelector('.btn-spinner').classList.toggle('hidden', !on);
        btn.disabled = on;
    }
}

customElements.define('submit-button-component', SubmitButton);