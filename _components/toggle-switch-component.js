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

        this.initToggle();
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
                group.style.height = group.scrollHeight + "px";
                requestAnimationFrame(() => { group.style.height = "0px"; });
                group.classList.remove("open");
            } else {
                group.classList.add("open");
                group.style.height = group.scrollHeight + "px";

                group.addEventListener("transitionend", function handler() {
                    group.style.height = "auto";
                    group.removeEventListener("transitionend", handler);
                });
            }
        });
	}
}

customElements.define('toggle-switch-component', ToggleSwitch);