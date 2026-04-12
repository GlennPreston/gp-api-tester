class NavBar extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.innerHTML = `
			<!-- Navbar -->
			<nav class="navbar">
				<div class="navbar-left">
					<a class="navbar-title" href="./home.php">GP API Tester</a>
				</div>

				<div class="navbar-center">
					<a class="navbar-link" href="./hosted/overview.php">Hosted</a>
					<a class="navbar-link" href="./api/overview.php">API</a>
				</div>
				
				<div class="navbar-right">
					<button id="themeToggle">
						<span class="theme-toggle-track">
							<span class="theme-toggle-icon theme-toggle-sun">
								<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
									<circle cx="8" cy="8" r="3"/>
									<line x1="8"    y1="1"    x2="8"    y2="2.5"/>
									<line x1="8"    y1="13.5" x2="8"    y2="15"/>
									<line x1="1"    y1="8"    x2="2.5"  y2="8"/>
									<line x1="13.5" y1="8"    x2="15"   y2="8"/>
									<line x1="2.93"  y1="2.93"  x2="4.05"  y2="4.05"/>
									<line x1="11.95" y1="11.95" x2="13.07" y2="13.07"/>
									<line x1="2.93"  y1="13.07" x2="4.05"  y2="11.95"/>
									<line x1="11.95" y1="4.05"  x2="13.07" y2="2.93"/>
								</svg>
							</span>
							<span class="theme-toggle-icon theme-toggle-moon">
								<svg viewBox="0 0 16 16" fill="currentColor">
									<path d="M13.5 10.5A6 6 0 0 1 6.5 2.5a.5.5 0 0 0-.64-.48A6.5 6.5 0 1 0 14 9.14a.5.5 0 0 0-.5-.64z"/>
								</svg>
							</span>
							<span class="theme-toggle-thumb"></span>
						</span>
					</button>
				</div>
			</nav>
		`;

		this.initThemeToggle();
		this.setActiveNavbarLink();
	}

	// ---------------------------------------------------------------------------
	// Theme toggle
	// ---------------------------------------------------------------------------

	initThemeToggle() {
        this.querySelector("#themeToggle").addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            const next = isDark ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }

	// ---------------------------------------------------------------------------
	// Set active navbar link
	// ---------------------------------------------------------------------------

	setActiveNavbarLink() {
		const path = location.pathname.replace(BASE_URL, "/");

		document.querySelectorAll(".navbar-link").forEach(link => {
			const href = link.getAttribute("href");
			const section = href.includes("/hosted/") ? "hosted" : "api";
			link.classList.toggle("active", path.includes("/" + section + "/"));
		});
	}
}

customElements.define('navbar-component', NavBar);