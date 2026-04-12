const navbar = document.querySelector("navbar-component");
const sidebar = document.querySelector("sidebar-component");
const container = document.getElementById("content-inner");

const routes = {
    "hosted/overview.php": "hosted/_overview-content.php",
    "hosted/_overview-content.php": "hosted/overview.php",
    "api/overview.php": "api/_overview-content.php",
    "api/_overview-content.php": "api/overview.php"
};

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    bindSidebarLinks();
    handleRoute();
});

// --- Navigation events ---
window.addEventListener("popstate", handleRoute);

// ---------------------------------------------------------------------------
// Sidebar – link clicks
// ---------------------------------------------------------------------------

function bindSidebarLinks() {
    sidebar?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const path = normalisePath(link.getAttribute("href"));
            if (routes[path]) { loadContent(routes[path], true); }
            else { loadContent(normalisePath(link.getAttribute("href")), true); }
        });
    });
}

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

function handleRoute() {
    const params = new URLSearchParams(location.search);
    const directLoad = params.get("content");

    if (directLoad) {
        const path = normalisePath(directLoad);
        loadContent(path, false);
        history.replaceState({ path }, "", BASE_URL + path);
        return;
    }

    const path = location.pathname.replace(BASE_URL, "");

    if (routes[path]) {
        loadContent(routes[path], false);
        return;
    }

    if (path.includes("hosted/") || path.includes("api/")) {
        loadContent(path.replace(/^\//, ""), false);
    }
}

// ---------------------------------------------------------------------------
// Content loading
// ---------------------------------------------------------------------------

async function loadContent(path, pushState = true) {
    const response = await fetch(BASE_URL + path, {
        headers: { "X-Internal-Navigation": "true" }
    });

    container.innerHTML = await response.text();
    
    // Update page title
    const titleElement = container.querySelector("[data-page-title]");

    if (titleElement) { document.title = titleElement.dataset.pageTitle + " | GP API Demo Tool"; }


    // Scripts injected via innerHTML are not executed by the browser.
    // Re-create each one as a real script element so they run.
    container.querySelectorAll("script").forEach(inert => {
        const script = document.createElement("script");
 
        if (inert.src) {
            script.src = inert.src;
        } else {
            script.textContent = inert.textContent;
        }
 
        inert.replaceWith(script);
    });

    // Convert _overview-content.php path back to overview.php
    if (routes[path]) {
        path = routes[path];
    }

    sidebar?.setActiveLink(path);
    sidebar?.expandActiveGroup();

    if (pushState) {
        history.pushState({ path }, "", path);
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalisePath(path) {
    return path
        .replaceAll("\\", "/")  // Windows path separators from PHP
        .replace(/^\.\//, "");  // strip leading ./
}