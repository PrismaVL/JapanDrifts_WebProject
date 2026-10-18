(function () {
    const cartKey = "japan-drifts-cart-v1";
    const currency = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0
    });
    const maxQuantity = 99;
    const productButtons = document.querySelectorAll("[data-cart-add]");
    const cartContainer = document.querySelector("[data-shopping-cart]");
    const orderForm = document.querySelector("#order-form");

    function formatPrice(amount) {
        return currency.format(amount);
    }

    function readCart() {
        const saved = localStorage.getItem(cartKey);
        if (!saved) return [];

        const cart = JSON.parse(saved);
        if (!Array.isArray(cart) || cart.some((item) =>
            !item || typeof item.id !== "string" || typeof item.name !== "string" ||
            typeof item.image !== "string" || !Number.isSafeInteger(item.price) || item.price < 0 ||
            !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > maxQuantity
        )) {
            throw new Error("Saved cart data is invalid.");
        }
        return cart;
    }

    function saveCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        window.dispatchEvent(new Event("japan-drifts-cart-change"));
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function updateDialogTotal(dialog) {
        const item = dialog.currentItem;
        const quantity = Number(dialog.querySelector("[data-cart-quantity]").value);
        dialog.querySelector("[data-cart-line-total]").textContent = formatPrice(item.price * quantity);
    }

    function createProductDialog() {
        const dialog = document.createElement("dialog");
        dialog.className = "shop-dialog";
        dialog.setAttribute("aria-labelledby", "shop-dialog-title");
        dialog.innerHTML = `
            <div class="shop-dialog-heading">
                <div>
                    <p class="shop-kicker">JAPAN DRIFTS / SAMPLE PRICING</p>
                    <h2 id="shop-dialog-title"></h2>
                </div>
            </div>
            <img class="shop-dialog-image" alt="">
            <p class="shop-dialog-description"></p>
            <p class="shop-sample-note">Sample price in PHP; actual prices may vary.</p>
            <div class="shop-price-row"><span>Unit price</span><strong data-cart-unit-price></strong></div>
            <div class="shop-quantity-group">
                <label class="shop-quantity-label" for="shop-dialog-quantity">Quantity</label>
                <div class="shop-quantity-control">
                    <button class="shop-quantity-step" type="button" data-quantity-decrease aria-label="Decrease quantity">−</button>
                    <input id="shop-dialog-quantity" data-cart-quantity type="number" min="1" max="${maxQuantity}" value="1" inputmode="numeric">
                    <button class="shop-quantity-step" type="button" data-quantity-increase aria-label="Increase quantity">+</button>
                </div>
            </div>
            <div class="shop-price-row shop-line-total"><span>Item total</span><strong data-cart-line-total></strong></div>
            <p class="shop-cart-status" role="status" aria-live="polite"></p>
            <div class="shop-dialog-actions">
                <button class="shop-button shop-button-secondary" type="button" data-cart-cancel>Cancel</button>
                <button class="shop-button shop-button-primary" type="button" data-cart-confirm>Add to cart</button>
            </div>`;
        document.body.append(dialog);

        const quantity = dialog.querySelector("[data-cart-quantity]");
        quantity.addEventListener("input", () => {
            const value = Number(quantity.value);
            if (Number.isInteger(value) && value >= 1 && value <= maxQuantity) {
                updateDialogTotal(dialog);
            }
        });
        dialog.querySelector("[data-quantity-decrease]").addEventListener("click", () => {
            quantity.value = String(Math.max(1, Number(quantity.value || 1) - 1));
            quantity.dispatchEvent(new Event("input", { bubbles: true }));
        });
        dialog.querySelector("[data-quantity-increase]").addEventListener("click", () => {
            quantity.value = String(Math.min(maxQuantity, Number(quantity.value || 1) + 1));
            quantity.dispatchEvent(new Event("input", { bubbles: true }));
        });
        dialog.querySelector("[data-cart-cancel]").addEventListener("click", () => dialog.close());
        dialog.querySelector("[data-cart-confirm]").addEventListener("click", () => {
            const item = dialog.currentItem;
            const requestedQuantity = Number(quantity.value);
            const status = dialog.querySelector(".shop-cart-status");
            const addButton = dialog.querySelector("[data-cart-confirm]");

            if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1 || requestedQuantity > maxQuantity) {
                status.textContent = `Choose a quantity from 1 to ${maxQuantity}.`;
                quantity.focus();
                return;
            }

            try {
                const cart = readCart();
                const existing = cart.find((entry) => entry.id === item.id);
                if (existing && existing.quantity + requestedQuantity > maxQuantity) {
                    status.textContent = `You can add up to ${maxQuantity} of this item.`;
                    return;
                }

                if (existing) {
                    existing.quantity += requestedQuantity;
                } else {
                    cart.push({ ...item, quantity: requestedQuantity });
                }
                saveCart(cart);
                status.textContent = `${item.name} added to your cart.`;
                addButton.disabled = true;
                addButton.textContent = "Added to cart";
            } catch (error) {
                console.error("Unable to save the shopping cart.", error);
                status.textContent = "Could not save your cart. Check that browser storage is available and try again.";
            }
        });
        dialog.addEventListener("close", () => {
            if (dialog.opener?.isConnected) dialog.opener.focus();
        });

        return dialog;
    }

    if (productButtons.length) {
        const dialog = createProductDialog();

        productButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const card = button.closest(".product-box");
                const heading = card?.querySelector(".product-info h3");
                const description = card?.querySelector(".product-info p");
                const image = card?.querySelector(":scope > img");
                const price = Number(button.dataset.price);
                if (!card || !heading || !description || !image || !button.dataset.productId ||
                    !Number.isSafeInteger(price) || price < 0) {
                    console.error("Unable to open product: product details or price are missing.", button);
                    return;
                }

                dialog.currentItem = {
                    id: button.dataset.productId,
                    name: heading.textContent.trim(),
                    description: description.textContent.trim(),
                    image: image.getAttribute("src"),
                    price
                };
                dialog.opener = button;
                dialog.querySelector("#shop-dialog-title").textContent = dialog.currentItem.name;
                dialog.querySelector(".shop-dialog-description").textContent = dialog.currentItem.description;
                const dialogImage = dialog.querySelector(".shop-dialog-image");
                dialogImage.src = dialog.currentItem.image;
                dialogImage.alt = image.alt;
                dialog.querySelector("[data-cart-unit-price]").textContent = formatPrice(price);
                dialog.querySelector("[data-cart-quantity]").value = "1";
                dialog.querySelector(".shop-cart-status").textContent = "";
                const addButton = dialog.querySelector("[data-cart-confirm]");
                addButton.disabled = false;
                addButton.textContent = "Add to cart";
                updateDialogTotal(dialog);
                dialog.showModal();
            });
        });
    }

    function renderCart() {
        if (!cartContainer) return;
        cartContainer.replaceChildren();

        let cart;
        try {
            cart = readCart();
        } catch (error) {
            console.error("Unable to read the shopping cart.", error);
            cartContainer.append(createElement("p", "shop-cart-error", "Your saved cart could not be read. Clear this site's browser storage to start a new cart."));
            updateOrderTotals([]);
            return;
        }

        if (!cart.length) {
            cartContainer.append(createElement("p", "shop-cart-empty", "Your cart is empty."));
            const links = createElement("div", "shop-cart-links");
            const essentialsLink = createElement("a", "shop-button shop-button-secondary", "Shop essentials");
            essentialsLink.href = "Essential.html";
            const streetwearLink = createElement("a", "shop-button shop-button-secondary", "Shop streetwear");
            streetwearLink.href = "Streetwear.html";
            links.append(essentialsLink, streetwearLink);
            cartContainer.append(links);
            updateOrderTotals(cart);
            return;
        }

        const list = createElement("div", "shop-cart-list");
        let itemCount = 0;

        cart.forEach((item) => {
            itemCount += item.quantity;
            const row = createElement("article", "shop-cart-item");
            row.dataset.productId = item.id;
            const image = createElement("img", "shop-cart-item-image");
            image.src = item.image;
            image.alt = item.name;
            const details = createElement("div", "shop-cart-item-details");
            details.append(
                createElement("h2", "", item.name),
                createElement("p", "shop-cart-unit-price", `${formatPrice(item.price)} each`)
            );
            const quantityLabel = createElement("label", "shop-cart-quantity-label", "Quantity");
            const quantity = createElement("input", "shop-cart-quantity");
            quantity.type = "number";
            quantity.min = "1";
            quantity.max = String(maxQuantity);
            quantity.value = String(item.quantity);
            quantity.dataset.cartQuantity = "";
            quantity.setAttribute("aria-label", `Quantity of ${item.name}`);
            quantityLabel.append(quantity);
            const itemTotal = createElement("strong", "shop-cart-item-total", formatPrice(item.price * item.quantity));
            itemTotal.dataset.cartItemTotal = "";
            const remove = createElement("button", "shop-cart-remove", "Remove");
            remove.type = "button";
            remove.dataset.cartRemove = "";
            row.append(image, details, quantityLabel, itemTotal, remove);
            list.append(row);
        });
        cartContainer.append(list);

        cartContainer.prepend(createElement("p", "shop-cart-count", `${itemCount} ${itemCount === 1 ? "item" : "items"}`));
        updateOrderTotals(cart);
    }

    function updateOrderTotals(cart) {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const selectedDelivery = document.querySelector("[name='delivery-method']:checked");
        const shipping = cart.length ? Number(selectedDelivery?.dataset.shippingPrice) || 0 : 0;
        const subtotalElement = document.querySelector("[data-order-subtotal]");
        const shippingElement = document.querySelector("[data-order-shipping]");
        const totalElement = document.querySelector("[data-order-total]");

        if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
        if (shippingElement) shippingElement.textContent = formatPrice(shipping);
        if (totalElement) totalElement.textContent = formatPrice(subtotal + shipping);
    }

    if (cartContainer) {
        cartContainer.addEventListener("change", (event) => {
            const quantityInput = event.target.closest("[data-cart-quantity]");
            if (!quantityInput) return;

            const quantity = Number(quantityInput.value);
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQuantity) {
                quantityInput.setCustomValidity(`Enter a quantity from 1 to ${maxQuantity}.`);
                quantityInput.reportValidity();
                return;
            }
            quantityInput.setCustomValidity("");

            try {
                const cart = readCart();
                const item = cart.find((entry) => entry.id === quantityInput.closest("[data-product-id]")?.dataset.productId);
                if (!item) throw new Error("The selected item is no longer in the cart.");
                item.quantity = quantity;
                saveCart(cart);
                renderCart();
            } catch (error) {
                console.error("Unable to update the shopping cart.", error);
                renderCartError();
            }
        });
        cartContainer.addEventListener("click", (event) => {
            const removeButton = event.target.closest("[data-cart-remove]");
            if (!removeButton) return;

            try {
                const productId = removeButton.closest("[data-product-id]")?.dataset.productId;
                saveCart(readCart().filter((item) => item.id !== productId));
                renderCart();
            } catch (error) {
                console.error("Unable to remove the cart item.", error);
                renderCartError();
            }
        });
        renderCart();
    }

    document.querySelectorAll("[name='delivery-method']").forEach((choice) => {
        choice.addEventListener("change", () => {
            try {
                updateOrderTotals(readCart());
            } catch (error) {
                console.error("Unable to calculate the order total.", error);
                renderCartError();
            }
        });
    });

    if (orderForm) {
        const phoneInput = orderForm.elements.namedItem("phone");
        phoneInput.addEventListener("input", (event) => {
            if (event.inputType.startsWith("delete")) return;

            const value = phoneInput.value;
            if (!value) return;

            let normalized;
            if (value.startsWith("+")) {
                const digits = value.slice(1).replace(/\D/g, "");
                const phoneDigits = digits.startsWith("639") ? digits.slice(3) :
                    digits.startsWith("63") ? digits.slice(2) : digits;
                normalized = `+639${phoneDigits.slice(0, 9)}`;
            } else if (value.startsWith("0")) {
                const digits = value.replace(/\D/g, "");
                const phoneDigits = digits.startsWith("09") ? digits.slice(2) : digits.slice(1);
                normalized = `09${phoneDigits.slice(0, 9)}`;
            } else {
                phoneInput.value = "";
                return;
            }

            if (phoneInput.value !== normalized) {
                phoneInput.value = normalized;
                phoneInput.setSelectionRange(normalized.length, normalized.length);
            }
        });

        orderForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const feedback = document.querySelector("[data-order-feedback]");
            feedback.textContent = "";

            if (!orderForm.reportValidity()) return;

            try {
                if (!readCart().length) {
                    feedback.textContent = "Add at least one item to your cart before completing the order.";
                    return;
                }
            } catch (error) {
                console.error("Unable to validate the order cart.", error);
                feedback.textContent = "Your cart could not be read, so the order cannot be validated.";
                return;
            }

            feedback.textContent = "Your details are valid, but checkout is a demo: payment processing and order submission are not connected.";
        });
    }

    window.addEventListener("japan-drifts-cart-change", () => {
        if (cartContainer) renderCart();
    });

    function renderCartError() {
        if (!cartContainer) return;
        cartContainer.replaceChildren(createElement("p", "shop-cart-error", "Could not update your cart. Check that browser storage is available and reload the page."));
    }

    window.addEventListener("storage", (event) => {
        if (event.key === cartKey && cartContainer) renderCart();
    });
})();
