(function () {
    class SiteFooter extends HTMLElement {
        connectedCallback() {
            const root = this.getAttribute("data-root") || "";
            this.classList.add("site-footer");
            this.innerHTML = `
                <footer>
                    <div class="footer-container">
                        <div class="footer-column">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>Email: <a href="mailto:202310398@fit.edu.ph">202310398@fit.edu.ph</a></li>
                                <li>Phone: <a href="tel:+639667036969">(+63) 966-703-6969</a></li>
                                <li>Address: 69 Curve St., Tokyo, Japan</li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h3>Follow Us</h3>
                            <ul class="social-links">
                                <li><a href="https://www.facebook.com/Prismalcs/">Facebook</a></li>
                                <li><a href="https://x.com/Japan_Drifts">Twitter</a></li>
                                <li><a href="https://www.instagram.com/prsm_lcs/">Instagram</a></li>
                            </ul>
                        </div>
                        <div class="footer-logo">
                            <img src="${root}assets/images/JAPAN.png" alt="Japan Drifts logo">
                        </div>
                    </div>
                    <div class="footer-info">
                        <p>By Jaymard Licas</p>
                        <p>© 2024 JAPAN DRIFTS. All rights reserved.</p>
                    </div>
                </footer>`;
        }
    }

    if (!customElements.get("site-footer")) {
        customElements.define("site-footer", SiteFooter);
    }
})();
