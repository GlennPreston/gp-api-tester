class MethodDropdown extends HTMLElement {
	// Observed attributes
    static get observedAttributes() {
        return ['method'];
    }

    constructor() {
        super();
        this._method = 'GET';
        this._open   = false;
    }

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    connectedCallback() {
        const attr = this.getAttribute('method') || 'GET';
        this._method = attr.toUpperCase();
        const methods = ['GET', 'POST', 'PATCH', 'DELETE'];

        this.innerHTML = `
			<button class="method-dropdown-btn ${this._method.toLowerCase()}" type="button">
                ${this._method}
                <svg viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>

            <ul class="method-dropdown-list hidden">
                ${methods.map(m => `
                    <li class="method-dropdown-list-option ${m.toLowerCase()}" data-value="${m}">${m}</li>
                `).join('')}
            </ul>
		`;

        this.initEvents();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'method' && newVal && newVal !== oldVal) {
            this._method = newVal.toUpperCase();
            if (this.isConnected) this.updateBtn();
        }
    }

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

    initEvents() {
        const btn  = this.querySelector('.method-dropdown-btn');
        const list = this.querySelector('.method-dropdown-list');

        // Toggle open
        btn.addEventListener('click', e => {
            e.stopPropagation();
            this._open = !this._open;
            list.classList.toggle('hidden', !this._open);
        });

        // Select option
        list.querySelectorAll('.method-dropdown-list-option').forEach(opt => {
            opt.addEventListener('click', e => {
                e.stopPropagation();
                this.value = opt.dataset.value;
                list.classList.add('hidden');
                this._open = false;
            });
        });

        // Close on outside click
        document.addEventListener('click', this._onOutsideClick = () => {
            if (this._open) {
                list.classList.add('hidden');
                this._open = false;
            }
        });
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    // Get current method
    get value() {
        return this._method;
    }

    // Set method programmatically
    set value(method) {
        const m = method.toUpperCase();
        if (m === this._method) return;
        this._method = m;
        this.setAttribute('method', m);
        this.updateBtn();

        // Dispatch change event so consumer pages can react
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            detail: { method: m }
        }));
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    updateBtn() {
        const btn = this.querySelector('.method-dropdown-btn');
        if (!btn) return;
        btn.childNodes[0].textContent = this._method + ' ';
        btn.className = 'method-dropdown-btn ' + this._method.toLowerCase();
    }
}

customElements.define('method-dropdown-component', MethodDropdown);