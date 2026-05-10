class SubmitButton extends HTMLElement {
	constructor() {
		super();
	}

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------
	
	connectedCallback() {
		this.innerHTML = `
			<button id="demo-submit" class="btn-primary">
                <span class="btn-text">Send Request</span>
                <span class="btn-spinner hidden"></span>
            </button>
		`;

		this.initEvents();
	}

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

	initEvents() {
		const submitBtn  = this.querySelector('#demo-submit');

		submitBtn.addEventListener('click', async () => {
			this.setLoading(submitBtn, true);
		});
	}

	// -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

	setLoading(btn, on) {
        btn.querySelector('.btn-text').classList.toggle('hidden', on);
        btn.querySelector('.btn-spinner').classList.toggle('hidden', !on);
        btn.disabled = on;
    }
}

customElements.define('submit-button-component', SubmitButton);