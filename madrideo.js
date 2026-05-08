
const products = [
    { id: 1, name: "Casio Classic", price: 1500 },
    { id: 2, name: "Seiko Automatic", price: 8500 },
    { id: 3, name: "G-Shock Digital", price: 4000 },
    { id: 4, name: "Leather Minimalist", price: 2500 },
    { id: 5, name: "Smart Watch", price: 3500 }
];

let cart = [];


const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total-price");
const countDisplay = document.getElementById("cart-count");
const emptyMsg = document.getElementById("empty-msg");
const totalSection = document.getElementById("cart-total-container");

// 3. Add to Cart Function
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push({ ...product, qty: 1 });
        renderCart();
    }
}

function renderCart() {
    cartContainer.innerHTML = "";
    let grandTotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty; // Subtotal calculation
        grandTotal += subtotal;
        totalItems += item.qty;

        cartContainer.innerHTML += `
            <div class="cart-item" style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                <h4>${item.name}</h4>
                <p>₱${item.price} x ${item.qty}</p>
                <p><strong>Subtotal: ₱${subtotal}</strong></p>
                <button onclick="updateQty(${item.id}, 1)">+</button>
                <button onclick="updateQty(${item.id}, -1)">-</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    // Update Visual Indicators
    totalDisplay.innerText = grandTotal.toLocaleString();
    countDisplay.innerText = totalItems;

    // Show/Hide messages based on cart state
    emptyMsg.style.display = cart.length === 0 ? "block" : "none";
    totalSection.style.display = cart.length === 0 ? "none" : "block";

    updateButtonStates();
}


function updateQty(id, change) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeItem(id);
        else renderCart();
    }
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function updateButtonStates() {
    document.querySelectorAll(".product-card").forEach(card => {
        const id = parseInt(card.getAttribute("data-id"));
        const btn = card.querySelector("button");
        const inCart = cart.some(item => item.id === id);

        if (inCart) {
            btn.innerText = "Already in Cart";
            btn.disabled = true;
            btn.style.opacity = "0.5";
        } else {
            btn.innerText = "Add to Cart";
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
}