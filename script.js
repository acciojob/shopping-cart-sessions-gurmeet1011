// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear the product list before re-rendering
  products.forEach((product) => {
  const li = document.createElement("li");
  li.innerHTML = `${product.name} - $${product.price} 
  <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
  productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear cart before re-rendering
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
        <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
      cartList.appendChild(li);
    });
  
  saveCartToSession();
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  if (product) {
    cart.push(product);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId){
  cart = cart.filter((item) => item.id !== parseInt(productId));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

// Save cart to session storage
function saveCartToSession() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Event delegation for Add to Cart
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});

// Event delegation for Remove from Cart
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const productId = e.target.dataset.id;
    removeFromCart(productId);
  }
});

// Event listener for Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

