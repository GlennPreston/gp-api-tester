class ModeToggle extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.innerHTML = `
			<div class="mode-toggle">
				<button class="mode-btn active" data-mode="demo">Demo</button>
				<button class="mode-btn" data-mode="debug">Debug</button>
			</div>
		`;

		this.initModeToggle();
	}

	// ---------------------------------------------------------------------------
	// Init mode toggle
	// ---------------------------------------------------------------------------

	initModeToggle() {
		const modeBtns  = document.querySelectorAll('.mode-btn');
		const demoSect  = document.getElementById('mode-demo');
		const debugSect = document.getElementById('mode-debug');

		modeBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				modeBtns.forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
				const m = btn.dataset.mode;
				demoSect.classList.toggle('hidden',  m !== 'demo');
				debugSect.classList.toggle('hidden', m !== 'debug');
			});
		});
	}
}

customElements.define('mode-toggle-component', ModeToggle);