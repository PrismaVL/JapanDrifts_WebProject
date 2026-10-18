(function () {
    const accountsKey = "japan-drifts-demo-accounts-v1";
    const sessionKey = "japan-drifts-demo-session-v1";
    const tabs = document.querySelector(".account-tabs");
    const panels = document.querySelectorAll("[data-account-panel]");
    const profile = document.querySelector("[data-account-profile]");
    const loginForm = document.querySelector("#login-panel");
    const registerForm = document.querySelector("#register-panel");
    const profileForm = document.querySelector("[data-profile-form]");
    const tabButtons = document.querySelectorAll("[data-account-tab]");
    let currentAccount = null;

    function readAccounts() {
        const saved = localStorage.getItem(accountsKey);
        if (!saved) return [];

        const accounts = JSON.parse(saved);
        if (!Array.isArray(accounts) || accounts.some((account) =>
            !account || typeof account.name !== "string" || typeof account.email !== "string" ||
            typeof account.address !== "string" || typeof account.salt !== "string" ||
            typeof account.passwordHash !== "string"
        )) {
            throw new Error("Saved demo account data is invalid.");
        }
        return accounts;
    }

    function writeAccounts(accounts) {
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
    }

    function normalizeEmail(email) {
        return email.trim().toLowerCase();
    }

    function hashPassword(password, salt) {
        const encoder = new TextEncoder();
        const saltBytes = Uint8Array.from(salt.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
        return crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"])
            .then((key) => crypto.subtle.deriveBits(
                { name: "PBKDF2", salt: saltBytes, iterations: 120000, hash: "SHA-256" },
                key,
                256
            ))
            .then((bits) => Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join(""));
    }

    function createSalt() {
        return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
            byte.toString(16).padStart(2, "0")
        ).join("");
    }

    function setFeedback(selector, message, isError) {
        const feedback = document.querySelector(selector);
        feedback.textContent = message;
        feedback.dataset.error = String(isError);
    }

    function setView(view) {
        const isProfile = view === "profile";
        tabs.hidden = isProfile;
        profile.hidden = !isProfile;
        panels.forEach((panel) => {
            panel.hidden = isProfile || panel.dataset.accountPanel !== view;
        });
        tabButtons.forEach((button) => {
            const active = button.dataset.accountTab === view;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", String(active));
        });
    }

    function showProfile(account) {
        currentAccount = account;
        document.querySelector("#profile-title").textContent = `Welcome, ${account.name}`;
        profileForm.elements.namedItem("name").value = account.name;
        profileForm.elements.namedItem("email").value = account.email;
        profileForm.elements.namedItem("address").value = account.address;
        setFeedback("[data-profile-feedback]", "", false);
        setView("profile");
    }

    function showAccountError(selector, error, message) {
        console.error(message, error);
        setFeedback(selector, "Account storage is unavailable or invalid. Check browser storage and reload the page.", true);
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setFeedback("[data-login-feedback]", "", false);
            setFeedback("[data-register-feedback]", "", false);
            setView(button.dataset.accountTab);
        });
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        setFeedback("[data-login-feedback]", "", false);

        try {
            const email = normalizeEmail(loginForm.elements.namedItem("email").value);
            const password = loginForm.elements.namedItem("password").value;
            const account = readAccounts().find((entry) => entry.email === email);
            if (!account || await hashPassword(password, account.salt) !== account.passwordHash) {
                setFeedback("[data-login-feedback]", "Email or password is incorrect.", true);
                return;
            }
            sessionStorage.setItem(sessionKey, account.email);
            loginForm.reset();
            showProfile(account);
        } catch (error) {
            showAccountError("[data-login-feedback]", error, "Unable to sign in to the demo account.");
        }
    });

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        setFeedback("[data-register-feedback]", "", false);

        const name = registerForm.elements.namedItem("name").value.trim();
        const email = normalizeEmail(registerForm.elements.namedItem("email").value);
        const address = registerForm.elements.namedItem("address").value.trim();
        const password = registerForm.elements.namedItem("password").value;
        const confirmation = registerForm.elements.namedItem("confirm-password").value;
        if (password !== confirmation) {
            setFeedback("[data-register-feedback]", "Passwords do not match.", true);
            return;
        }

        try {
            const accounts = readAccounts();
            if (accounts.some((account) => account.email === email)) {
                setFeedback("[data-register-feedback]", "An account with this email already exists.", true);
                return;
            }

            const salt = createSalt();
            const account = {
                name,
                email,
                address,
                salt,
                passwordHash: await hashPassword(password, salt)
            };
            accounts.push(account);
            writeAccounts(accounts);
            sessionStorage.setItem(sessionKey, account.email);
            registerForm.reset();
            showProfile(account);
        } catch (error) {
            showAccountError("[data-register-feedback]", error, "Unable to create the demo account.");
        }
    });

    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        setFeedback("[data-profile-feedback]", "", false);

        const name = profileForm.elements.namedItem("name").value.trim();
        const email = normalizeEmail(profileForm.elements.namedItem("email").value);
        const address = profileForm.elements.namedItem("address").value.trim();
        try {
            const accounts = readAccounts();
            if (accounts.some((account) => account.email === email && account.email !== currentAccount.email)) {
                setFeedback("[data-profile-feedback]", "Another account is already using this email.", true);
                return;
            }

            const account = accounts.find((entry) => entry.email === currentAccount.email);
            if (!account) throw new Error("The signed-in demo account could not be found.");
            account.name = name;
            account.email = email;
            account.address = address;
            writeAccounts(accounts);
            sessionStorage.setItem(sessionKey, account.email);
            showProfile(account);
            setFeedback("[data-profile-feedback]", "Profile saved.", false);
        } catch (error) {
            showAccountError("[data-profile-feedback]", error, "Unable to save the demo profile.");
        }
    });

    document.querySelector("[data-account-signout]").addEventListener("click", () => {
        try {
            sessionStorage.removeItem(sessionKey);
            currentAccount = null;
            loginForm.reset();
            setView("login");
            setFeedback("[data-login-feedback]", "You have signed out.", false);
        } catch (error) {
            showAccountError("[data-login-feedback]", error, "Unable to sign out of the demo account.");
        }
    });

    try {
        const email = sessionStorage.getItem(sessionKey);
        if (email) {
            const account = readAccounts().find((entry) => entry.email === email);
            if (account) {
                showProfile(account);
            } else {
                sessionStorage.removeItem(sessionKey);
            }
        }
    } catch (error) {
        showAccountError("[data-login-feedback]", error, "Unable to restore the demo account session.");
    }
})();
