class FieldMultiSelect extends HTMLElement {

	static get observedAttributes() {
		return ['input-id', 'label', 'options'];
	}

	constructor() {
		super();
		this._open     = false;
		this._selected = new Set();
		this._options  = [];
	}

	// -------------------------------------------------------------------------
	// Lifecycle
	// -------------------------------------------------------------------------

	connectedCallback() {
		this._inputId = this.getAttribute('input-id') || '';
		this._label   = this.getAttribute('label')    || '';
		this._options = (this.getAttribute('options') || '').split(',').map(o => o.trim()).filter(Boolean);
		this.render();
	}

	disconnectedCallback() {
		document.removeEventListener('click', this._onOutsideClick);
	}

	// -------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------

	render() {
		const label = this._btnLabel();

		const items = this._options.map(o => `
			<li class="field-multiselect-option ${this._selected.has(o) ? 'selected' : ''}" data-value="${o}">
				<span class="field-multiselect-checkbox">
					${this._selected.has(o) ? `<svg viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
				</span>
				<span class="field-multiselect-option-label">${o}</span>
			</li>
		`).join('');

		this.innerHTML = `
			<label class="field-label" for="${this._inputId}">${this._label}</label>
			<div class="field-multiselect-wrap">
				<button class="field-input field-multiselect-btn ${this._open ? 'field-select-btn-open' : ''}" type="button" id="${this._inputId}">
					<span class="field-multiselect-btn-text">${label}</span>
					<svg class="field-select-chevron ${this._open ? 'open' : ''}" viewBox="0 0 10 6" fill="none">
						<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
				<ul class="field-select-list field-multiselect-list ${this._open ? '' : 'hidden'}">
					<li class="field-multiselect-actions">
						<button class="field-multiselect-action-btn" data-action="all">All</button>
						<button class="field-multiselect-action-btn" data-action="none">None</button>
					</li>
					<li class="field-multiselect-divider"></li>
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
		const btn  = this.querySelector('.field-multiselect-btn');
		const list = this.querySelector('.field-multiselect-list');

		btn.addEventListener('click', e => {
			e.stopPropagation();
			this._open ? this.close() : this.openList();
		});

		// Toggle individual options
		list.querySelectorAll('.field-multiselect-option').forEach(opt => {
			opt.addEventListener('click', e => {
				e.stopPropagation();
				const val = opt.dataset.value;
				this._selected.has(val) ? this._selected.delete(val) : this._selected.add(val);
				this.render();
				this._dispatchChange();
			});
		});

		// All / None buttons
		list.querySelectorAll('.field-multiselect-action-btn').forEach(btn => {
			btn.addEventListener('click', e => {
				e.stopPropagation();
				if (btn.dataset.action === 'all') {
					this._options.forEach(o => this._selected.add(o));
				} else {
					this._selected.clear();
				}
				this.render();
				this._dispatchChange();
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
		this.querySelector('.field-multiselect-list')?.classList.remove('hidden');
		this.querySelector('.field-multiselect-btn')?.classList.add('field-select-btn-open');
		this.querySelector('.field-select-chevron')?.classList.add('open');
	}

	close() {
		this._open = false;
		this.querySelector('.field-multiselect-list')?.classList.add('hidden');
		this.querySelector('.field-multiselect-btn')?.classList.remove('field-select-btn-open');
		this.querySelector('.field-select-chevron')?.classList.remove('open');
	}

	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	// Returns array of selected values
	get value() {
		return [...this._selected];
	}

	// -------------------------------------------------------------------------
	// Helpers
	// -------------------------------------------------------------------------

	_btnLabel() {
		const count = this._selected.size;
		if (count === 0) return 'None selected';
		if (count === this._options.length) return 'All permissions';
		return `${count} selected`;
	}

	_dispatchChange() {
		this.dispatchEvent(new CustomEvent('change', {
			bubbles: true,
			detail: { value: this.value }
		}));
	}
}

customElements.define('field-multiselect-component', FieldMultiSelect);