(function () {
    const brands = [
        ["Toyota", "Toyota.html"],
        ["Mazda", "Mazda.html"],
        ["Honda", "Honda.html"],
        ["Mitsubishi", "Mitsubishi.html"],
        ["Lexus", "Lexus.html"],
        ["Subaru", "Subaru.html"],
        ["Nissan", "Nissan.html"]
    ];

    class SiteNavbar extends HTMLElement {
        connectedCallback() {
            const root = this.getAttribute("data-root") || "";
            const compact = this.getAttribute("data-variant") === "compact";
            const home = document.body.classList.contains("home-page");
            this.classList.add("site-navbar");
            this.classList.toggle("home-navbar", home);

            if (compact) {
                this.innerHTML = `
                    <header class="compact-header">
                        <div class="container container1">
                            <a class="site-brand" href="${root}index.html" aria-label="Japan Drifts home">
                                <img src="${root}assets/images/JAPAN.png" class="logo" alt="">
                                <h1>JAPAN DRIFTS</h1>
                            </a>
                        </div>
                    </header>`;
                return;
            }

            const brandLinks = brands.map(([name, file]) =>
                `<li><a href="${root}pages/${file}"><span>${name}</span></a></li>`
            ).join("");
            const brand = `<a class="site-brand" href="${root}index.html" aria-label="Japan Drifts home">
                    <img src="${root}assets/images/JAPAN.png" class="logo" alt="">
                    <h1>JAPAN DRIFTS</h1>
               </a>`;

            this.innerHTML = `
                <header class="${home ? "site-header" : ""}">
                    <div class="container">
                        ${brand}
                        <nav aria-label="Main navigation">
                            <div class="navbar">
                                <ul>
                                    <li><a href="${root}index.html">Home</a></li>
                                    <li><button class="nav-link-button" type="button" data-brand-toggle aria-controls="brand-subnav" aria-expanded="false">Car Brands</button></li>
                                    <li><a href="${root}pages/Essential.html">Essentials</a></li>
                                    <li><a href="${root}pages/Streetwear.html">Streetwears</a></li>
                                    <li><a href="${root}pages/cart.html">Cart</a></li>
                                    <li><a href="${root}pages/log.html">Account</a></li>
                                    <li><a href="#sidebar-more" data-sidebar-toggle aria-controls="sidebar-more" aria-expanded="false">More</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
                <nav id="brand-subnav" class="brand-subnav" aria-label="Car brand navigation" hidden>
                    <div class="brand-subnav-inner">
                        <p class="brand-subnav-kicker">Explore by manufacturer</p>
                        <ul>${brandLinks}</ul>
                    </div>
                </nav>`;
        }
    }

    let brandCloseTimer;

    function setBrandsOpen(open) {
        const panel = document.querySelector("#brand-subnav");
        const trigger = document.querySelector("[data-brand-toggle]");
        if (!panel || !trigger) return;

        trigger.setAttribute("aria-expanded", String(open));
        window.clearTimeout(brandCloseTimer);

        if (open) {
            panel.hidden = false;
            panel.getBoundingClientRect();
            panel.classList.add("is-open");
            return;
        }

        panel.classList.remove("is-open");
        brandCloseTimer = window.setTimeout(() => {
            panel.hidden = true;
        }, 220);
    }

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-brand-toggle]");
        if (trigger) {
            setBrandsOpen(trigger.getAttribute("aria-expanded") !== "true");
            return;
        }

        if (!event.target.closest("#brand-subnav")) {
            setBrandsOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.querySelector("#brand-subnav:not([hidden])")) {
            setBrandsOpen(false);
            document.querySelector("[data-brand-toggle]")?.focus();
        }
    });

    if (!customElements.get("site-navbar")) {
        customElements.define("site-navbar", SiteNavbar);
    }
})();
