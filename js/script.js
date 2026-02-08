// Initialize EmailJS (Replace with your actual credentials)
emailjs.init("YOUR_USER_ID");

// Enhanced Restaurant Data
const restaurants = [
  {
    id: 1,
    name: "Night Grill Express",
    category: "grill",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    deliveryTime: "25-40 min",
    closingTime: "04:00",
    status: "open",
    featured: true,
    menu: [
      {
        id: 101,
        name: "Suya Platter",
        description: "Spicy grilled beef skewers",
        basePrice: 2500,
        minPrice: 2500,
        popular: true,
      },
      {
        id: 102,
        name: "Chicken Wings",
        description: "Crispy fried chicken wings",
        basePrice: 1800,
        minPrice: 1800,
      },
      {
        id: 103,
        name: "Grilled Fish",
        description: "Fresh tilapia with spices",
        basePrice: 3500,
        minPrice: 3500,
      },
    ],
  },
  {
    id: 2,
    name: "Mama Eka's Kitchen",
    category: "local",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    deliveryTime: "30-45 min",
    closingTime: "02:00",
    status: "open",
    featured: true,
    menu: [
      {
        id: 201,
        name: "Edikaikong Soup",
        description: "Vegetable soup with assorted meat",
        basePrice: 3000,
        minPrice: 3000,
      },
      {
        id: 202,
        name: "Afang Soup",
        description: "Traditional Calabar soup",
        basePrice: 2800,
        minPrice: 2800,
      },
      {
        id: 203,
        name: "Fisherman Soup",
        description: "Spicy seafood delight",
        basePrice: 4000,
        minPrice: 4000,
      },
    ],
  },
  {
    id: 3,
    name: "Pizza Palace",
    category: "fast-food",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    deliveryTime: "35-50 min",
    closingTime: "03:30",
    status: "open",
    featured: false,
    menu: [
      {
        id: 301,
        name: "Pepperoni Pizza",
        description: "Large 14-inch pizza",
        basePrice: 4500,
        minPrice: 4500,
      },
      {
        id: 302,
        name: "BBQ Chicken Pizza",
        description: "Smoky chicken delight",
        basePrice: 5000,
        minPrice: 5000,
      },
      {
        id: 303,
        name: "Vegetarian Pizza",
        description: "Fresh vegetable mix",
        basePrice: 4000,
        minPrice: 4000,
      },
    ],
  },
  {
    id: 4,
    name: "Continental Delight",
    category: "continental",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    deliveryTime: "40-55 min",
    closingTime: "01:00",
    status: "open",
    featured: true,
    menu: [
      {
        id: 401,
        name: "Beef Burger",
        description: "Juicy beef with cheese",
        basePrice: 2200,
        minPrice: 2200,
      },
      {
        id: 402,
        name: "Spaghetti Bolognese",
        description: "Italian pasta special",
        basePrice: 2800,
        minPrice: 2800,
      },
      {
        id: 403,
        name: "Grilled Chicken Salad",
        description: "Healthy fresh salad",
        basePrice: 3200,
        minPrice: 3200,
      },
    ],
  },
  {
    id: 5,
    name: "Seafood Harbor",
    category: "local",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    deliveryTime: "45-60 min",
    closingTime: "03:00",
    status: "open",
    featured: false,
    menu: [
      {
        id: 501,
        name: "Prawn Delight",
        description: "Fresh prawns in pepper sauce",
        basePrice: 4200,
        minPrice: 4200,
      },
      {
        id: 502,
        name: "Fish Pepper Soup",
        description: "Spicy fish soup",
        basePrice: 2800,
        minPrice: 2800,
      },
      {
        id: 503,
        name: "Mixed Seafood Platter",
        description: "Assorted seafood",
        basePrice: 5500,
        minPrice: 5500,
      },
    ],
  },
  {
    id: 6,
    name: "Crispy Chicken Hub",
    category: "fast-food",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    deliveryTime: "20-35 min",
    closingTime: "04:00",
    status: "open",
    featured: false,
    menu: [
      {
        id: 601,
        name: "Crispy Chicken Bucket",
        description: "8 pieces of crispy chicken",
        basePrice: 3800,
        minPrice: 3800,
      },
      {
        id: 602,
        name: "Chicken & Chips",
        description: "Fried chicken with fries",
        basePrice: 2500,
        minPrice: 2500,
      },
      {
        id: 603,
        name: "Spicy Chicken Wings",
        description: "Hot and spicy wings",
        basePrice: 2200,
        minPrice: 2200,
      },
    ],
  },
  {
    id: 7,
    name: "Tasty Bites",
    category: "local",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    deliveryTime: "25-40 min",
    closingTime: "02:30",
    status: "open",
    featured: false,
    menu: [
      {
        id: 701,
        name: "Jollof Rice Special",
        description: "Party jollof with chicken",
        basePrice: 2000,
        minPrice: 2000,
      },
      {
        id: 702,
        name: "Fried Rice Combo",
        description: "Fried rice with assorted meat",
        basePrice: 2200,
        minPrice: 2200,
      },
      {
        id: 703,
        name: "Pounded Yam Set",
        description: "Pounded yam with soup",
        basePrice: 2800,
        minPrice: 2800,
      },
    ],
  },
  {
    id: 8,
    name: "Sweet Treats Bakery",
    category: "continental",
    image:
      "https://images.unsplash.com/photo-1556909211-36987daf7bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    deliveryTime: "30-45 min",
    closingTime: "01:00",
    status: "open",
    featured: false,
    menu: [
      {
        id: 801,
        name: "Red Velvet Cake",
        description: "Slice of delicious cake",
        basePrice: 1500,
        minPrice: 1500,
      },
      {
        id: 802,
        name: "Chocolate Brownies",
        description: "Freshly baked brownies",
        basePrice: 1200,
        minPrice: 1200,
      },
      {
        id: 803,
        name: "Assorted Pastries",
        description: "Mix of 6 pastries",
        basePrice: 2500,
        minPrice: 2500,
      },
    ],
  },
];

// Featured items from random restaurants
const featuredItems = [
  {
    id: 101,
    restaurantId: 1,
    name: "Spicy Suya Platter",
    description: "Signature beef suya with spices",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 201,
    restaurantId: 2,
    name: "Edikaikong Soup",
    description: "Traditional vegetable soup",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 301,
    restaurantId: 3,
    name: "Pepperoni Pizza",
    description: "Large 14-inch pizza",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80",
  },
  {
    id: 403,
    restaurantId: 4,
    name: "Grilled Chicken Salad",
    description: "Healthy fresh salad",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

// State Management
let cart = JSON.parse(localStorage.getItem("nightBitesCart")) || [];
let selectedLocation = null;
let currentRestaurant = null;

// DOM Elements
const restaurantGrid = document.getElementById("restaurantGrid");
const featuredGrid = document.getElementById("featuredGrid");
const cartCount = document.querySelector(".cart-count");
const cartBtn = document.getElementById("cartBtn");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const currentTimeEl = document.getElementById("currentTime");
const serviceStatusEl = document.getElementById("serviceStatus");

// Initialize Swiper Carousel
let swiper;
function initSwiper() {
  swiper = new Swiper(".swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    speed: 1000,
  });
}

// Initialize
function init() {
  updateTime();
  initSwiper();
  renderRestaurants();
  renderFeaturedItems();
  updateCartCount();
  checkServiceHours();

  // Set interval to update time and check service every minute
  setInterval(() => {
    updateTime();
    checkServiceHours();
    renderRestaurants();
  }, 60000);

  // Event Listeners
  cartBtn.addEventListener("click", () => openModal("cartModal"));
  themeToggle.addEventListener("click", toggleTheme);
  searchInput.addEventListener("input", handleSearch);

  // Check initial theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Time Management
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  currentTimeEl.textContent = timeString;
  document.getElementById("currentTime2").textContent = timeString;
  document.getElementById("currentTime3").textContent = timeString;
}

function checkServiceHours() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  // Service hours: 6:00 PM (18:00) to 4:30 AM (4:30)
  const serviceStart = 18 * 60; // 6:00 PM
  const serviceEnd = 4 * 60 + 30; // 4:30 AM

  let isServiceActive = false;

  if (currentHour >= 18) {
    // After 6 PM, before midnight
    isServiceActive = currentTime >= serviceStart;
  } else if (currentHour < 4 || (currentHour === 4 && currentMinute <= 30)) {
    // After midnight, before 4:30 AM
    isServiceActive = currentTime <= serviceEnd;
  }

  if (isServiceActive) {
    serviceStatusEl.textContent = "Service: Active";
    serviceStatusEl.style.color = "var(--accent)";
  } else {
    serviceStatusEl.textContent = "Service: Closed (Opens 6:00 PM)";
    serviceStatusEl.style.color = "var(--danger)";
  }

  return isServiceActive;
}

function isRestaurantOpen(closingTime) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const [closeHour, closeMinute] = closingTime.split(":").map(Number);
  const closingTimeMinutes = closeHour * 60 + closeMinute;

  // Convert closing time to 24-hour format if needed
  const adjustedClosingTime =
    closingTimeMinutes < 600
      ? closingTimeMinutes + 24 * 60
      : closingTimeMinutes;
  const adjustedCurrentTime = currentTime + (currentHour < 12 ? 24 * 60 : 0);

  return adjustedCurrentTime < adjustedClosingTime && checkServiceHours();
}

// Restaurant Rendering
function renderRestaurants(filteredRestaurants = restaurants) {
  restaurantGrid.innerHTML = "";

  filteredRestaurants.forEach((restaurant) => {
    const isOpen = isRestaurantOpen(restaurant.closingTime);

    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
                    <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-img">
                    <div class="restaurant-info">
                        <div class="restaurant-header">
                            <h3 class="restaurant-name">${restaurant.name}</h3>
                            <span class="restaurant-status ${isOpen ? "status-open" : "status-closed"}">
                                ${isOpen ? "Open" : "Closed"}
                            </span>
                        </div>
                        <div class="restaurant-meta">
                            <span><i class="fas fa-star"></i> ${restaurant.rating}</span>
                            <span><i class="fas fa-clock"></i> ${restaurant.deliveryTime}</span>
                            <span><i class="fas fa-tag"></i> ${restaurant.category}</span>
                        </div>
                        <p>Closes at: ${restaurant.closingTime} AM</p>
                        <button class="menu-btn" onclick="openMenu(${restaurant.id})" ${!isOpen ? "disabled" : ""}>
                            ${isOpen ? "View Menu" : "Closed"}
                        </button>
                    </div>
                `;
    restaurantGrid.appendChild(card);
  });
}

// Featured Items Rendering
function renderFeaturedItems() {
  featuredGrid.innerHTML = "";

  featuredItems.forEach((item) => {
    const restaurant = restaurants.find((r) => r.id === item.restaurantId);
    if (!restaurant) return;

    const card = document.createElement("div");
    card.className = "featured-card";
    card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="featured-img">
                    <div class="featured-info">
                        <span class="featured-tag">Featured</span>
                        <h3>${item.name}</h3>
                        <p style="color: var(--gray); margin: 0.5rem 0;">${item.description}</p>
                        <p style="color: var(--primary); font-weight: 700; font-size: 1.2rem; margin: 0.5rem 0;">₦${item.price.toLocaleString()}</p>
                        <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 1rem;">From: ${restaurant.name}</p>
                        <button class="add-to-cart-btn" onclick="addFeaturedToCart(${item.id}, ${item.restaurantId})" style="width: 100%;">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                `;
    featuredGrid.appendChild(card);
  });
}

function filterRestaurants(type) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  let filtered = restaurants;
  if (type === "open") {
    filtered = restaurants.filter((r) => isRestaurantOpen(r.closingTime));
  }
  renderRestaurants(filtered);
}

function filterByCategory(category) {
  const buttons = document.querySelectorAll(".filter-container .filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  let filtered =
    category === "all"
      ? restaurants
      : restaurants.filter((r) => r.category === category);
  renderRestaurants(filtered);
}

function handleSearch() {
  const term = searchInput.value.toLowerCase();
  if (term.length < 2) {
    renderRestaurants();
    return;
  }

  const filtered = restaurants.filter((restaurant) => {
    // Search in restaurant name
    if (restaurant.name.toLowerCase().includes(term)) return true;

    // Search in menu items
    return restaurant.menu.some(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term),
    );
  });

  renderRestaurants(filtered);
}

// Menu Management
function openMenu(restaurantId) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  if (!restaurant || !isRestaurantOpen(restaurant.closingTime)) return;

  currentRestaurant = restaurant;
  document.getElementById("modalRestaurantName").textContent = restaurant.name;

  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";

  restaurant.menu.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.innerHTML = `
                    <div class="menu-item-info">
                        <h4>${item.name} ${item.popular ? "🔥" : ""}</h4>
                        <p>${item.description}</p>
                        <p class="menu-item-price">₦${item.basePrice.toLocaleString()}</p>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id}, ${restaurantId})">
                        Add to Cart
                    </button>
                `;
    menuGrid.appendChild(menuItem);
  });

  openModal("menuModal");
}

// Cart Management
function addToCart(menuItemId, restaurantId) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const menuItem = restaurant.menu.find((m) => m.id === menuItemId);

  const existingItem = cart.find(
    (item) =>
      item.menuItemId === menuItemId && item.restaurantId === restaurantId,
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      menuItemId,
      restaurantId,
      name: menuItem.name,
      basePrice: menuItem.basePrice,
      minPrice: menuItem.minPrice,
      price: menuItem.basePrice,
      quantity: 1,
      restaurantName: restaurant.name,
    });
  }

  updateCart();
  closeModal("menuModal");
  showNotification(`${menuItem.name} added to cart!`);
}

function addFeaturedToCart(menuItemId, restaurantId) {
  addToCart(menuItemId, restaurantId);
}

function updateCart() {
  localStorage.setItem("nightBitesCart", JSON.stringify(cart));
  updateCartCount();

  // Update cart modal if open
  if (document.getElementById("cartModal").classList.contains("active")) {
    renderCart();
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartCheckout = document.getElementById("cartCheckout");

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartCheckout.style.display = "none";
    cartItems.innerHTML = "";
    return;
  }

  cartEmpty.style.display = "none";
  cartCheckout.style.display = "block";

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>${item.restaurantName}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <div style="text-align: right;">
                            <input type="number" class="price-input" 
                                value="${item.price}" 
                                min="${item.minPrice}"
                                onchange="updatePrice(${index}, this.value)">
                            <p>₦${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <button class="quantity-btn" onclick="removeFromCart(${index})" style="color: var(--danger);">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
    cartItems.appendChild(cartItem);
  });

  updateTotal();
}

function updateQuantity(index, change) {
  const newQuantity = cart[index].quantity + change;
  if (newQuantity < 1) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = newQuantity;
  updateCart();
}

function updatePrice(index, newPrice) {
  newPrice = parseInt(newPrice);
  if (isNaN(newPrice) || newPrice < cart[index].minPrice) {
    newPrice = cart[index].minPrice;
  }
  cart[index].price = newPrice;
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee =
    selectedLocation === "urban"
      ? 500
      : selectedLocation === "suburban"
        ? 800
        : 0;
  const total = subtotal + deliveryFee;

  document.getElementById("totalAmount").textContent =
    `₦${total.toLocaleString()}`;
}

function selectLocation(location) {
  selectedLocation = location;
  document.querySelectorAll(".location-option").forEach((option) => {
    option.classList.remove("selected");
  });
  document
    .querySelector(`[data-location="${location}"]`)
    .classList.add("selected");
  updateTotal();
}

// Modal Management
function openModal(modalId) {
  if (modalId === "cartModal") {
    renderCart();
  }
  document.getElementById(modalId).classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
  document.body.style.overflow = "auto";
}

// Payment & Order Submission
function copyAccount() {
  const account = "0123456789";
  navigator.clipboard.writeText(account).then(() => {
    showNotification("Account number copied to clipboard!");
  });
}

function submitOrder() {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("deliveryAddress").value;
  const instructions = document.getElementById("specialInstructions").value;

  // Validation
  if (!name.trim()) {
    showNotification("Please enter your name", "error");
    return;
  }

  if (!phone.trim()) {
    showNotification("Please enter your phone number", "error");
    return;
  }

  if (!address.trim()) {
    showNotification("Please enter your delivery address", "error");
    return;
  }

  if (!selectedLocation) {
    showNotification("Please select a delivery area", "error");
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = selectedLocation === "urban" ? 500 : 800;
  const total = subtotal + deliveryFee;

  // Generate order ID
  const orderId = "NB" + Date.now().toString().slice(-6);
  document.getElementById("orderId").textContent = orderId;

  // Prepare order data for EmailJS
  const orderData = {
    order_id: orderId,
    customer_name: name,
    customer_phone: phone,
    customer_address: address,
    special_instructions: instructions,
    delivery_area:
      selectedLocation === "urban" ? "Urban Area" : "Sub-Urban Area",
    delivery_fee: deliveryFee,
    subtotal: subtotal,
    total: total,
    items: cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - ₦${item.price * item.quantity}`,
      )
      .join("\n"),
    payment_account: "0123456789 • Calabar Night Bites Ltd.",
    order_time: new Date().toLocaleString(),
  };

  // In a real implementation, you would send this via EmailJS
  console.log("Order submitted:", orderData);

  // Simulate successful order submission
  cart = [];
  updateCart();
  closeModal("cartModal");

  // Reset form
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("deliveryAddress").value = "";
  document.getElementById("specialInstructions").value = "";
  selectedLocation = null;
  document.querySelectorAll(".location-option").forEach((option) => {
    option.classList.remove("selected");
  });

  setTimeout(() => {
    openModal("successModal");
  }, 500);
}

// UI Effects
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === "success" ? "var(--success)" : "var(--danger)"};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: var(--shadow);
                z-index: 3000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            `;

  notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
                    <span>${message}</span>
                </div>
            `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
document.head.appendChild(style);

// Initialize the app
window.onload = init;
