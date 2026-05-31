class FieldSelect extends HTMLElement {

	static get observedAttributes() {
		return ['input-id', 'label', 'options', 'value'];
	}

	constructor() {
		super();
	}

	// -------------------------------------------------------------------------
	// Lifecycle
	// -------------------------------------------------------------------------

	connectedCallback() {
		this._inputId = this.getAttribute('input-id');
		this._label   = this.getAttribute('label');
		this._default = this.getAttribute('value');
		this._options = this.getAttribute('options').split(',');

		this.innerHTML = this.render();
	}

	// -------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------

	render() {
		const options = this._options.map(option => `
			<option value="${option}"${option === this._default ? ' selected' : ''}>
				${option}
			</option>
		`).join('');

		return `
			<label class="field-label" for="${this._inputId}">${this._label}</label>
			<select id="${this._inputId}" class="field-input field-select">
				${options}
			</select>
		`;
	}

	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	get value() {
		const el = this.querySelector('select');
		return el ? el.value : null;
	}

	set value(val) {
		const el = this.querySelector('select');
		if (el) el.value = val;
	}
}

customElements.define('field-select-component', FieldSelect);