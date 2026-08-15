class FieldDatePicker extends HTMLElement {

	static get observedAttributes() {
		return ['input-id', 'label', 'value'];
	}

	constructor() {
		super();
		this._open        = false;
		this._selected    = null; // Date object or null
		this._cursor      = new Date(); // month/year currently shown
		this._cursor.setDate(1);
	}

	// -------------------------------------------------------------------------
	// Lifecycle
	// -------------------------------------------------------------------------

	connectedCallback() {
		this._inputId = this.getAttribute('input-id') || '';
		this._label   = this.getAttribute('label')    || '';

		const val = this.getAttribute('value');
		if (val) this._selected = this._parseISO(val);
		if (this._selected) {
			this._cursor = new Date(this._selected.getFullYear(), this._selected.getMonth(), 1);
		}

		this.render();
	}

	disconnectedCallback() {
		document.removeEventListener('click', this._onOutsideClick);
	}

	// -------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------

	render() {
		this.innerHTML = `
			<label class="field-label" for="${this._inputId}">${this._label}</label>
			<div class="field-datepicker-wrap">
				<button class="field-input field-datepicker-btn ${this._open ? 'field-select-btn-open' : ''}"
					type="button" id="${this._inputId}">
					<svg class="field-datepicker-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
						<rect x="1.5" y="2.5" width="13" height="12" rx="1.5"/>
						<path d="M1.5 6.5h13M5 1v3M11 1v3"/>
					</svg>
					<span class="field-datepicker-btn-text">
						${this._selected ? this._formatDisplay(this._selected) : 'DD/MM/YYYY'}
					</span>
					<svg class="field-select-chevron ${this._open ? 'open' : ''}" viewBox="0 0 10 6" fill="none">
						<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>

				<div class="field-datepicker-dropdown ${this._open ? '' : 'hidden'}">
					${this._renderCalendar()}
				</div>
			</div>
		`;

		this._bindEvents();
	}

	_renderCalendar() {
		const year  = this._cursor.getFullYear();
		const month = this._cursor.getMonth();
		const today = new Date();

		const monthName = this._cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

		// Build day grid — pad start with blanks
		const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		// Shift so week starts Monday
		const startPad = (firstDay + 6) % 7;

		let cells = '';
		for (let i = 0; i < startPad; i++) {
			cells += `<span class="field-datepicker-cell empty"></span>`;
		}
		for (let d = 1; d <= daysInMonth; d++) {
			const date    = new Date(year, month, d);
			const isToday = this._isSameDay(date, today);
			const isSel   = this._selected && this._isSameDay(date, this._selected);
			cells += `
				<button type="button"
					class="field-datepicker-cell day ${isToday ? 'today' : ''} ${isSel ? 'selected' : ''}"
					data-date="${this._toISO(date)}">
					${d}
				</button>`;
		}

		return `
			<div class="field-datepicker-header">
				<button type="button" class="field-datepicker-nav" data-nav="prev">
					<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
						<path d="M7 1L1 7l6 6"/>
					</svg>
				</button>
				<span class="field-datepicker-month">${monthName}</span>
				<button type="button" class="field-datepicker-nav" data-nav="next">
					<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
						<path d="M1 1l6 6-6 6"/>
					</svg>
				</button>
			</div>
			<div class="field-datepicker-weekdays">
				<span>Mo</span><span>Tu</span><span>We</span>
				<span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
			</div>
			<div class="field-datepicker-grid">
				${cells}
			</div>
			<div class="field-datepicker-footer">
				<button type="button" class="field-datepicker-today">Today</button>
				${this._selected ? `<button type="button" class="field-datepicker-clear">Clear</button>` : ''}
			</div>
		`;
	}

	// -------------------------------------------------------------------------
	// Events
	// -------------------------------------------------------------------------

	_bindEvents() {
		const btn      = this.querySelector('.field-datepicker-btn');
		const dropdown = this.querySelector('.field-datepicker-dropdown');

		btn.addEventListener('click', e => {
			e.stopPropagation();
			this._open ? this._close() : this._openPicker();
		});

		// Day selection
		dropdown?.querySelectorAll('.field-datepicker-cell.day').forEach(cell => {
			cell.addEventListener('click', e => {
				e.stopPropagation();
				this._selected = this._parseISO(cell.dataset.date);
				this._close();
				this.render();
				this._dispatchChange();
			});
		});

		// Month navigation
		dropdown?.querySelectorAll('.field-datepicker-nav').forEach(nav => {
			nav.addEventListener('click', e => {
				e.stopPropagation();
				const dir = nav.dataset.nav === 'prev' ? -1 : 1;
				this._cursor.setMonth(this._cursor.getMonth() + dir);
				// Re-render just the calendar part
				const cal = this.querySelector('.field-datepicker-dropdown');
				if (cal) cal.innerHTML = this._renderCalendar();
				this._bindCalendarEvents();
			});
		});

		// Clear
		dropdown?.querySelector('.field-datepicker-clear')?.addEventListener('click', e => {
			e.stopPropagation();
			this._selected = null;
			this._close();
			this.render();
			this._dispatchChange();
		});

		// Today
		dropdown?.querySelector('.field-datepicker-today')?.addEventListener('click', e => {
			e.stopPropagation();
			const today = new Date();
			this._selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			this._cursor   = new Date(today.getFullYear(), today.getMonth(), 1);
			this._close();
			this.render();
			this._dispatchChange();
		});

		// Outside click
		document.removeEventListener('click', this._onOutsideClick);
		this._onOutsideClick = e => {
			if (this._open && !this.contains(e.target)) this._close();
		};
		document.addEventListener('click', this._onOutsideClick);
	}

	// Re-bind only the calendar events (used after month nav re-render)
	_bindCalendarEvents() {
		const dropdown = this.querySelector('.field-datepicker-dropdown');

		dropdown?.querySelectorAll('.field-datepicker-cell.day').forEach(cell => {
			cell.addEventListener('click', e => {
				e.stopPropagation();
				this._selected = this._parseISO(cell.dataset.date);
				this._close();
				this.render();
				this._dispatchChange();
			});
		});

		dropdown?.querySelectorAll('.field-datepicker-nav').forEach(nav => {
			nav.addEventListener('click', e => {
				e.stopPropagation();
				const dir = nav.dataset.nav === 'prev' ? -1 : 1;
				this._cursor.setMonth(this._cursor.getMonth() + dir);
				const cal = this.querySelector('.field-datepicker-dropdown');
				if (cal) cal.innerHTML = this._renderCalendar();
				this._bindCalendarEvents();
			});
		});

		dropdown?.querySelector('.field-datepicker-clear')?.addEventListener('click', e => {
			e.stopPropagation();
			this._selected = null;
			this._close();
			this.render();
			this._dispatchChange();
		});

		dropdown?.querySelector('.field-datepicker-today')?.addEventListener('click', e => {
			e.stopPropagation();
			const today = new Date();
			this._selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			this._cursor   = new Date(today.getFullYear(), today.getMonth(), 1);
			this._close();
			this.render();
			this._dispatchChange();
		});
	}

	// -------------------------------------------------------------------------
	// Open / close
	// -------------------------------------------------------------------------

	_openPicker() {
		this._open = true;
		this.querySelector('.field-datepicker-dropdown')?.classList.remove('hidden');
		this.querySelector('.field-datepicker-btn')?.classList.add('field-select-btn-open');
		this.querySelector('.field-select-chevron')?.classList.add('open');
	}

	_close() {
		this._open = false;
		this.querySelector('.field-datepicker-dropdown')?.classList.add('hidden');
		this.querySelector('.field-datepicker-btn')?.classList.remove('field-select-btn-open');
		this.querySelector('.field-select-chevron')?.classList.remove('open');
	}

	// -------------------------------------------------------------------------
	// Public API
	// -------------------------------------------------------------------------

	// Returns selected date as YYYY-MM-DD string, or null
	get value() {
		return this._selected ? this._toISO(this._selected) : null;
	}

	set value(val) {
		this._selected = val ? this._parseISO(val) : null;
		if (this._selected) {
			this._cursor = new Date(this._selected.getFullYear(), this._selected.getMonth(), 1);
		}
		this.render();
	}

	// -------------------------------------------------------------------------
	// Helpers
	// -------------------------------------------------------------------------

	_formatDisplay(date) {
		const d = String(date.getDate()).padStart(2, '0');
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const y = date.getFullYear();
		return `${d}/${m}/${y}`;
	}

	_toISO(date) {
		const d = String(date.getDate()).padStart(2, '0');
		const m = String(date.getMonth() + 1).padStart(2, '0');
		return `${date.getFullYear()}-${m}-${d}`;
	}

	_parseISO(str) {
		if (!str) return null;
		const [y, m, d] = str.split('-').map(Number);
		return new Date(y, m - 1, d);
	}

	_isSameDay(a, b) {
		return a.getDate()     === b.getDate()     &&
		       a.getMonth()    === b.getMonth()     &&
		       a.getFullYear() === b.getFullYear();
	}

	_dispatchChange() {
		this.dispatchEvent(new CustomEvent('change', {
			bubbles: true,
			detail: { value: this.value }
		}));
	}
}

customElements.define('field-datepicker-component', FieldDatePicker);