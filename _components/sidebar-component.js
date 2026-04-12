class SideBar extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
        const section = this.getAttribute("section") || "hosted";

        const menus = {
            hosted: {
                title: "Hosted References",
                links: [
                    {
                        label: "Overview",
                        href: "hosted/overview.php"
                    },
                    {
                        label: "Pay by Link",
                        href: "hosted/pay-by-link.php"
                    },
                    {
                        label: "Hosted Payment Page",
                        href: "hosted/hosted-payment-page.php"
                    },
                    {
                        label: "Hosted Fields",
                        href: "hosted/hosted-fields.php"
                    },
                    {
                        label: "Drop-In UI",
                        href: "hosted/drop-in-ui.php"
                    }
                ]
            },
            api: {
                title: "API References",
                links: [
                    {
                        label: "Overview",
                        href: "api/overview.php"
                    }
                ],
                groups: [
                    {
                        label: "Access Token",
                        links: [
                            {
                                label: "Create Access Token",
                                href: "api/access-token/create-access-token.php",
                                method: "POST"
                            }
                        ]
                    },
                    {
                        label: "Links",
                        links: [
                            {
                                label: "Create Link",
                                href: "api/links/create-link.php",
                                method: "POST"
                            },
                            {
                                label: "Get Link",
                                href: "api/links/get-link.php",
                                method: "GET"
                            },
                            {
                                label: "Get Links",
                                href: "api/links/get-links.php",
                                method: "GET"
                            }
                        ]
                    }
                ]
            }
        };

        this.innerHTML = this.renderSidebar(menus[section]);

        this.initSidebarToggle();
        this.initGroupToggle();
	}

    // -------------------------------------------------------------------------
    // Render sidebar
    // -------------------------------------------------------------------------

    renderSidebar(menu) {
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <span class="sidebar-title">
                        ${menu.title}
                    </span>

                    <button id="sidebarToggle">
                        <svg viewBox="0 0 24 24">
                            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="4"/>
                        </svg>
                    </button>
                </div>

                <div class="sidebar-menu">
                    ${menu.groups ? this.renderGroups(menu) : this.renderLinks(menu)}
                </div>
            </aside>
        `;
    }

    renderGroups(menu) {
        return menu.links.map(link => `
            <a class="sidebar-link" href="./${link.href}">${link.label}</a>
        `).join("") +
        menu.groups.map(group => `
            <div class="menu-group">
                <button class="menu-group-toggle">
                    <svg viewBox="0 0 20 20">
                        <path d="M7 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2"/>
                    </svg>

                    ${group.label}
                </button>

                <div class="menu-submenu">
                    ${group.links.map(link => `
                        <a href="./${link.href}">
                            ${link.label}

                            ${link.method ? `<span class="method ${link.method.toLowerCase()}">${link.method}</span>` : ""}
                        </a>
                    `).join("")}
                </div>
            </div>
        `).join("");
    }

    renderLinks(menu) {
        return menu.links.map(link => `
            <a class="sidebar-link" href="./${link.href}">${link.label}</a>
        `).join("");
    }

    // -------------------------------------------------------------------------
    // Init sidebar event listeners
    // -------------------------------------------------------------------------

    // --- Toggle sidebar open/close ---
    initSidebarToggle() {
        this.querySelector("#sidebarToggle").addEventListener("click", () => {
            document.querySelector(".app-layout-sidebar").classList.toggle("sidebar-collapsed");
        });
    }

    // --- Toggle sidebar group open/close ---
    initGroupToggle() {
        this.querySelectorAll(".menu-group-toggle").forEach(btn => {
            btn.addEventListener("click", () => {
                const group   = btn.parentElement;
                const submenu = group.querySelector(".menu-submenu");

                if (group.classList.contains("open")) {
                    submenu.style.height = submenu.scrollHeight + "px";
                    requestAnimationFrame(() => { submenu.style.height = "0px"; });
                    group.classList.remove("open");
                } else {
                    group.classList.add("open");
                    submenu.style.height = submenu.scrollHeight + "px";

                    submenu.addEventListener("transitionend", function handler() {
                        submenu.style.height = "auto";
                        submenu.removeEventListener("transitionend", handler);
                    });
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // Set sidebar active link — called by router after each navigation
    // -------------------------------------------------------------------------

    // --- Set active sidebar link ---
    setActiveLink(path) {
        const normalisedPath = "./" + path.replaceAll("\\", "/").replace(/^\.\//, "");
        console.log(normalisedPath);
 
        this.querySelectorAll("a").forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === normalisedPath);
        });
    }

    // --- Expand sidebar group containing the active link ---
    expandActiveGroup() {
        this.querySelectorAll(".menu-group").forEach(group => {
            const isActive = group.querySelector("a.active") !== null;
            const submenu  = group.querySelector(".menu-submenu");
            const isOpen   = group.classList.contains("open");
 
            if (isActive && !isOpen) {
                group.classList.add("open");
                submenu.style.height = submenu.scrollHeight + "px";
 
                submenu.addEventListener("transitionend", function handler() {
                    submenu.style.height = "auto";
                    submenu.removeEventListener("transitionend", handler);
                });
            }
        });
    }
}

customElements.define('sidebar-component', SideBar);