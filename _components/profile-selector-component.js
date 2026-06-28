class ProfileSelector extends HTMLElement {
	constructor() {
		super();
		this._open  = false;
		this._profilesConfig = null;
		this._profiles = [];
		this._activeId = null;
	}

	// -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

	connectedCallback() {
		this.innerHTML = this.renderLoading();
		this.fetchProfiles();
	}

	disconnectedCallback() {
		document.removeEventListener('click', this._onOutsideClick);
	}

	// -------------------------------------------------------------------------
	// Fetch
	// -------------------------------------------------------------------------

	async fetchProfiles() {
		const res = await fetch(BASE_URL + '_scripts/php/_proxy-profiles-read.php');
		this._profilesConfig = await res.json();
        this._profiles = this._profilesConfig.profiles || [];
        this._activeId = this._profilesConfig.activeId || null;
		this.render();
		this.selectProfile(this._activeId);
	}

	// -------------------------------------------------------------------------
	// Render
	// -------------------------------------------------------------------------

	renderLoading() {
		return `
			<div class="profile-selector-bar">
				<button class="profile-selector-btn" type="button" disabled>
					<svg class="profile-selector-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
						<circle cx="8" cy="5" r="2.5"/>
						<path d="M2.5 13.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5"/>
					</svg>
					<span class="profile-selector-btn-text" style="opacity:0.4">Loading...</span>
				</button>
			</div>
		`;
	}

	render() {
		const activeProfile = this._profiles.find(p => p.id === this._activeId);

		const items = this._profiles.length
			? this._profiles.map(p => `
				<li class="profile-selector-option" data-id="${p.id}">
					<span class="profile-selector-option-name">${p.name}</span>
				</li>
			`).join('')
			: `<li class="profile-selector-empty">No profiles saved</li>`;

		this.innerHTML = `
			<div class="profile-selector-wrap">
				<div class="profile-selector-bar">
					<button class="profile-selector-btn" type="button">
						<svg class="profile-selector-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
							<circle cx="8" cy="5" r="2.5"/>
							<path d="M2.5 13.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5"/>
						</svg>
						<span class="profile-selector-btn-text">${activeProfile ? activeProfile.name : 'Select Profile'}</span>
						<svg class="profile-selector-chevron" viewBox="0 0 10 6" fill="none">
							<path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</button>
				</div>

				<ul class="profile-selector-list hidden">
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
		const btn  = this.querySelector('.profile-selector-btn');
		const list = this.querySelector('.profile-selector-list');

		btn.addEventListener('click', e => {
			e.stopPropagation();
			this._open ? this.close() : this.openList();
		});

		this.querySelectorAll('.profile-selector-option').forEach(opt => {
			opt.addEventListener('click', e => {
				e.stopPropagation();
				this.selectProfile(opt.dataset.id);
			});
		});

		this._onOutsideClick = e => {
			if (this._open && !this.contains(e.target)) this.close();
		};
		document.addEventListener('click', this._onOutsideClick);
	}

	openList() {
        this._open = true;
        this.querySelector('.profile-selector-list').classList.remove('hidden');
        this.querySelector('.profile-selector-btn').classList.add('profile-selector-btn-open');
    }

    close() {
        this._open = false;
        this.querySelector('.profile-selector-list').classList.add('hidden');
        this.querySelector('.profile-selector-btn').classList.remove('profile-selector-btn-open');
    }

	// -------------------------------------------------------------------------
	// Select — fills credential + default fields on the page
	// -------------------------------------------------------------------------

	async selectProfile(id) {
		const profile = this._profiles.find(p => p.id === id);
		if (!profile) return;

		this._activeId = id;
		this._profilesConfig.activeId = id;
		const saveResponse = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-write.php', this._profilesConfig);
		console.log(saveResponse);

		this.fill('demo-app-id', profile.appId || '');
		this.fill('demo-app-key', profile.appKey || '');
		this.fill('demo-account', profile.account || '');
		this.fill('demo-country', profile.country || '');
		this.fill('demo-currency', profile.currency || '');

		this.close();
		this.render();
	}

	fill(id, value) {
		const el = document.getElementById(id);
		if (el) el.value = value;
	}
}

customElements.define('profile-selector-component', ProfileSelector);