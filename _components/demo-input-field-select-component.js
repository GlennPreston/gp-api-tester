class FieldSelect extends HTMLElement {

	static get observedAttributes() {
		return ['input-id', 'label', 'options', 'value'];
	}

	constructor() {
		super();
		this._open    = false;
		this._value   = null;
		this._options = [];
	}

	// -------------------------------------------------------------------------
	// Lifecycle
	// -------------------------------------------------------------------------

	connectedCallback() {
		this._inputId = this.getAttribute('input-id') || '';
		this._label   = this.getAttribute('label')    || '';
		this._options = (this.getAttribute('options') || '').split(',').map(o => o.trim()).filter(Boolean);
		this._value   = this.getAttribute('value')    || this._options[0] || '';

		this.render();
	}

	attributeChangedCallback(name, _old, val) {
		if (!this.isConnected || !this.querySelector('.field-select-btn')) return;
		if (name === 'value') this.value = val;
	}

	disconnectedCallback() {
		document.removeEventListener('click', this._onOutsideClick);
	}

	// -------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------

	render() {
		const items = this._options.map(o => `
			<li class="field-select-option ${o === this._value ? 'selected' : ''}" data-value="${o}">
				${o}
			</li>
		`).join('');

		this.innerHTML = `
			<label class="field-label" for="${this._inputId}">${this._label}</label>
			<div class="field-select-wrap">
				<button class="field-input field-select-btn" type="button" id="${this._inputId}">
					<span class="field-select-btn-text">${this._value}</span>
					<svg class="field-select-chevron" viewBox="0 0 10 6" fill="none">
						<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<ul class="field-select-list hidden">
					${items}
				</ul>
			</div>
		`;

		this.bindEvents();
	}

	// -------------------------------------------------------------------------
	// Events
	// -------------------------------------------------------------------------

	bindEvents() {
		const btn  = this.querySelector('.field-select-btn');
		const list = this.querySelector('.field-select-list');

		btn.addEventListener('click', e => {
			e.stopPropagation();
			this._open ? this.close() : this.openList();
		});

		list.querySelectorAll('.field-select-option').forEach(opt => {
			opt.addEventListener('click', e => {
				e.stopPropagation();
				this.value = opt.dataset.value;
				this.close();
			});
		});

		this._onOutsideClick = e => {
			if (this._open && !this.contains(e.target)) this.close();
		};
		document.addEventListener('click', this._onOutsideClick);
	}

	// -------------------------------------------------------------------------
	// Open / close
	// -------------------------------------------------------------------------

	openList() {
		this._open = true;
		this.querySelector('.field-select-list').classList.remove('hidden');
		this.querySelector('.field-select-btn').classList.add('field-select-btn-open');
	}

	close() {
		this._open = false;
		this.querySelector('.field-select-list').classList.add('hidden');
		this.querySelector('.field-select-btn').classList.remove('field-select-btn-open');
	}

	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;

		const text = this.querySelector('.field-select-btn-text');
		if (text) text.textContent = val;

		this.querySelectorAll('.field-select-option').forEach(opt => {
			opt.classList.toggle('selected', opt.dataset.value === val);
		});

		this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: val } }));
	}
}

customElements.define('field-select-component', FieldSelect);