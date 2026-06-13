const searchInput = document.getElementById('searchInput');
const categorySections = document.querySelectorAll('.category-section');
const CART_KEY = 'shopeaseCart';
const RECENT_ITEM_KEY = 'shopeaseRecentItem';
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

function updateCartBadge() {
    if (!cartCountEl) {
        return;
    }

    const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(entry => entry.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart(cart);
    localStorage.setItem(RECENT_ITEM_KEY, JSON.stringify(item));
    updateCartBadge();
}

const productsByCategory = {
    Grocery: [
        { name: 'Fresh Apples', price: 120, oldPrice: 160, discount: '25% OFF', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce' },
        { name: 'Organic Bananas', price: 50, oldPrice: 60, discount: '20% OFF', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba' },
        { name: 'Basmati Rice', price: 299, oldPrice: 350, discount: '15% OFF', image: 'https://images.unsplash.com/photo-1604908177225-36f4f54df4a3' },
        { name: 'Fresh Milk', price: 55, oldPrice: 60, discount: '10% OFF', image: 'https://images.unsplash.com/photo-1615484477201-9f4953340fab' }
    ],
    Snacks: [
        { name: 'Potato Chips', price: 70, oldPrice: 100, discount: '30% OFF', image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Potato-Chips.jpg' },
        { name: 'Chocolate Bar', price: 150, oldPrice: 200, discount: '25% OFF', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96' },
        { name: 'Cookies Pack', price: 90, oldPrice: 110, discount: '20% OFF', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' },
        { name: 'Nachos', price: 120, oldPrice: 140, discount: '15% OFF', image: 'https://images.unsplash.com/photo-1603052875735-14a4b1e1f9fc' }
    ],
    Beauty: [
        { name: 'Face Cream', price: 299, oldPrice: 375, discount: '20% OFF', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
        { name: 'Matte Lipstick', price: 250, oldPrice: 300, discount: '15% OFF', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348' },
        { name: 'Face Wash', price: 199, oldPrice: 240, discount: '18% OFF', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908' },
        { name: 'Perfume', price: 899, oldPrice: 1150, discount: '22% OFF', image: 'https://images.unsplash.com/photo-1556228578-5c9f28b52b19' }
    ],
    Household: [
        { name: 'Liquid Detergent', price: 180, oldPrice: 240, discount: '25% OFF', image: 'https://images.unsplash.com/photo-1585386959984-a41552231693' },
        { name: 'Dish Soap', price: 90, oldPrice: 110, discount: '20% OFF', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64' },
        { name: 'Floor Cleaner', price: 210, oldPrice: 260, discount: '18% OFF', image: 'https://images.unsplash.com/photo-1616627984391-8b1cba9d6a9c' },
        { name: 'Garbage Bags', price: 120, oldPrice: 135, discount: '10% OFF', image: 'https://images.unsplash.com/photo-1598300056102-b5bcd23aef06' }
    ],
    Electronics: [
        { name: 'Wireless Earbuds', price: 1999, oldPrice: 2999, discount: '35% OFF', image: 'https://images.unsplash.com/photo-1580894908360-8d98d13c3b3c' },
        { name: 'Mobile Cover', price: 499, oldPrice: 699, discount: '30% OFF', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db' },
        { name: 'Bluetooth Speaker', price: 1499, oldPrice: 1999, discount: '25% OFF', image: 'https://images.unsplash.com/photo-1585386959984-a41552231693' },
        { name: 'Smart Watch', price: 2499, oldPrice: 3199, discount: '20% OFF', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' }
    ]
};

function createProductCard(item) {
    return `
        <div class="card">
            <span class="discount">${item.discount}</span>
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price} <span>₹${item.oldPrice}</span></p>
            <button
                class="cart-btn"
                data-name="${item.name}"
                data-price="${item.price}"
                data-old-price="${item.oldPrice}"
                data-discount="${item.discount}"
                data-image="${item.image}"
            >Add to Cart</button>
        </div>
    `;
}

function renderProducts() {
    categorySections.forEach(section => {
        const items = productsByCategory[section.id] || [];
        const container = section.querySelector('.products');

        if (container) {
            container.innerHTML = items.map(createProductCard).join('');
        }
    });
}

function filterCategory(category) {
    categorySections.forEach(section => {
        section.style.display = section.id === category ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();

    categorySections.forEach(section => {
        const cards = section.querySelectorAll('.card');
        let visibleCards = 0;

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const match = text.includes(query) || section.id.toLowerCase().includes(query);
            card.style.display = match ? 'block' : 'none';

            if (match) {
                visibleCards += 1;
            }
        });

        section.style.display = (query === '' || section.id.toLowerCase().includes(query) || visibleCards > 0) ? 'block' : 'none';
    });
});

renderProducts();
updateCartBadge();

const productsContainer = document.querySelector('.home');

if (productsContainer) {
    productsContainer.addEventListener('click', function(event) {
        const button = event.target.closest('.cart-btn');

        if (!button) {
            return;
        }

        const item = {
            name: button.dataset.name,
            price: Number(button.dataset.price),
            oldPrice: Number(button.dataset.oldPrice),
            discount: button.dataset.discount,
            image: button.dataset.image
        };

        addToCart(item);
        button.textContent = 'Added ✓';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
        }, 1000);
    });
}

const toggleBtn = document.getElementById('chat-toggle');
const chatbot = document.getElementById('chatbot');
const closeChat = document.getElementById('close-chat');

if (toggleBtn && chatbot && closeChat) {
    toggleBtn.onclick = () => {
        chatbot.style.display = 'flex';
    };

    closeChat.onclick = () => {
        chatbot.style.display = 'none';
    };
}

const input = document.getElementById('chat-input');
const chat = document.getElementById('chat-messages');

if (input && chat) {
    input.addEventListener('keypress', async function(e) {
        if (e.key === 'Enter') {
            const message = input.value.trim();

            if (!message) {
                return;
            }

            chat.innerHTML += `<div class="user">${message}</div>`;
            input.value = '';

            try {
                const response = await fetch('http://localhost:3000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                chat.innerHTML += `<div class="bot">${data.reply}</div>`;
            } catch (error) {
                chat.innerHTML += '<div class="bot">Sorry, the chatbot is unavailable right now.</div>';
            }

            chat.scrollTop = chat.scrollHeight;
        }
    });
}