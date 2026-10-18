(function () {
    class SiteSidebar extends HTMLElement {
        connectedCallback() {
            const root = this.getAttribute("data-root") || "";
            const currentPage = window.location.pathname.split("/").pop().toLowerCase();
            const links = [
                ["FAQ", "FAQ.html"],
                ["About Us", "About.html"],
                ["Our Story", "Story.html"],
                ["Vision & Mission", "Vision.html"]
            ];

            this.innerHTML = `
                <aside id="sidebar-more" class="sidebar" aria-label="More options" aria-hidden="true">
                    <p class="sidebar-kicker">JAPAN DRIFTS / EXPLORE</p>
                    <div class="sidebar-heading">
                        <h2>More Options</h2>
                        <button class="close-button" type="button" aria-label="Close more options" data-sidebar-close>&times;</button>
                    </div>
                    <ul>
                        ${links.map(([label, file]) => `
                            <li><a href="${root}pages/${file}"${currentPage === file.toLowerCase() ? ' aria-current="page"' : ""}>
                                <span class="sidebar-link">${label}</span>
                            </a></li>`).join("")}
                    </ul>
                </aside>`;

            this.addEventListener("click", (event) => {
                if (event.target.closest("[data-sidebar-close]")) {
                    setSidebarOpen(false);
                }
            });
        }
    }

    function setSidebarOpen(open) {
        const sidebar = document.querySelector("#sidebar-more");
        if (!sidebar) return;

        if (open) {
            updateNavbarPush(sidebar);
        } else {
            document.querySelector(".site-navbar")?.style.removeProperty("--sidebar-nav-push");
        }
        sidebar.classList.toggle("active", open);
        document.body.classList.toggle("sidebar-open", open);
        sidebar.setAttribute("aria-hidden", String(!open));
        document.querySelectorAll("[data-sidebar-toggle]").forEach((trigger) => {
            trigger.setAttribute("aria-expanded", String(open));
            if (!open) trigger.focus();
        });
    }

    function updateNavbarPush(sidebar) {
        const navbar = document.querySelector(".site-navbar");
        const lastItem = navbar?.querySelector("[data-sidebar-toggle]");
        if (!navbar || !lastItem) return;

        const currentPush = Number.parseFloat(
            window.getComputedStyle(navbar).getPropertyValue("--sidebar-nav-push")
        ) || 0;
        const lastItemRight = lastItem.getBoundingClientRect().right - currentPush;
        const sidebarLeft = document.documentElement.clientWidth - sidebar.getBoundingClientRect().width;
        const push = Math.max(0, Math.ceil(lastItemRight + 16 - sidebarLeft));

        navbar.style.setProperty("--sidebar-nav-push", `${-push}px`);
    }

    window.addEventListener("resize", () => {
        const sidebar = document.querySelector("#sidebar-more");
        if (sidebar?.classList.contains("active")) {
            updateNavbarPush(sidebar);
        }
    });

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-sidebar-toggle]");
        if (!trigger) return;
        event.preventDefault();
        const sidebar = document.querySelector("#sidebar-more");
        setSidebarOpen(!sidebar || !sidebar.classList.contains("active"));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.querySelector("#sidebar-more.active")) {
            setSidebarOpen(false);
        }
    });

    if (!customElements.get("site-sidebar")) {
        customElements.define("site-sidebar", SiteSidebar);
    }
})();
