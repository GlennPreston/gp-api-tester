class ToggleSwitch extends HTMLElement {
	// Observed attributes
    static get observedAttributes() {
        return ['input-id', 'is-checked', 'is-fieldset'];
    }

    constructor() {
        super();
    }

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    connectedCallback() {
        this._inputID = this.getAttribute('input-id');
        this._isChecked = this.getAttribute('is-checked') ? 'checked' : '';
        this._isFieldset = this.getAttribute('is-fieldset') ? this.getAttribute('is-fieldset') : false;

        this.innerHTML = `
			<label class="toggle-switch">
                <input id="${this._inputID}" type="checkbox" ${this._isChecked}>
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
		`;

        if (this._isFieldset) {
            this.initToggle();
        }
    }

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

	initToggle() {
		const btn = document.querySelector("#"+this._inputID);
        const group = document.querySelector("#"+this._inputID+"-fields");

        if (group.classList.contains("open")) {
            group.style.height = "auto";
        } else {
            group.style.height = "0px";
        }

        btn.addEventListener("click", () => {
	        if (group.classList.contains("open")) {
                // Clip before animating closed so content doesn't overflow during collapse
                group.style.overflow = "hidden";
                group.style.height = group.scrollHeight + "px";
                requestAnimationFrame(() => { group.style.height = "0px"; });
                group.classList.remove("open");
            } else {
                group.classList.add("open");
                group.style.height = group.scrollHeight + "px";

                group.addEventListener("transitionend", function handler() {
                    group.style.height = "auto";
                    // Allow dropdowns inside to escape the container
                    group.style.overflow = "visible";
                    group.removeEventListener("transitionend", handler);
                });
            }
        });
	}
}

customElements.define('toggle-switch-component', ToggleSwitch);