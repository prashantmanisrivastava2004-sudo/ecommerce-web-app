const CART_KEY = 'shopeaseCart';
const RECENT_ITEM_KEY = 'shopeaseRecentItem';
const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotal = document.getElementById('cart-total');
const recentItemCard = document.getElementById('recent-item-card');
const cartCountEl = document.getElementById('cart-count');

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        console.error('Unable to read cart from localStorage', error);
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function removeFromCart(name) {
    const cart = getCart().filter(item => item.name !== name);
    saveCart(cart);
    updateCartUI();
}

function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const itemsValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = itemsValue > 999 ? 0 : 49;
    const discount = Math.round(itemsValue * 0.08);
    const totalPrice = itemsValue + deliveryFee - discount;

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }

    if (cartSummary) {
        cartSummary.textContent = `${totalItems} item(s) in your cart.`;
    }

    if (cartTotal) {
        cartTotal.textContent = `₹${totalPrice}`;
    }

    const summaryItems = document.getElementById('summary-items');
    const summaryDelivery = document.getElementById('summary-delivery');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryTotal = document.getElementById('summary-total');

    if (summaryItems) summaryItems.textContent = `₹${itemsValue}`;
    if (summaryDelivery) summaryDelivery.textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
    if (summaryDiscount) summaryDiscount.textContent = `-₹${discount}`;
    if (summaryTotal) summaryTotal.textContent = `₹${totalPrice}`;

    if (cartItems) {
        if (!cart.length) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} each</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="cart-item-total">Subtotal: ₹${item.price * item.quantity}</p>
                </div>
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            </div>
        `).join('');
    }

    const recentItem = JSON.parse(localStorage.getItem(RECENT_ITEM_KEY) || 'null');

    if (recentItemCard) {
        if (!recentItem) {
            recentItemCard.innerHTML = '<p class="empty-cart">No recent item yet.</p>';
            return;
        }

        recentItemCard.innerHTML = `
            <div class="recent-item-box">
                <img src="${recentItem.image}" alt="${recentItem.name}">
                <div>
                    <h3>${recentItem.name}</h3>
                    <p>₹${recentItem.price}</p>
                    <span>${recentItem.discount}</span>
                </div>
            </div>
        `;
    }
}

cartItems?.addEventListener('click', function(event) {
    const button = event.target.closest('.remove-btn');

    if (!button) {
        return;
    }

    removeFromCart(button.dataset.name);
});

updateCartUI();
