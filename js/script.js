// Main application script
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize components
  await initApp();
});

async function initApp() {
  try {
    // Initialize EmailJS first
    initEmailJS();

    // Load restaurant data
    await loadRestaurants();

    // Initialize time and service status
    updateTime();
    checkServiceHours();

    // Initialize Swiper carousel
    initSwiper();

    // Render all components
    renderRestaurants();
    renderFeaturedItems();
    renderHighlights();
    renderAboutSection();
    updateCartCount();

    // Set up event listeners
    setupEventListeners();

    // Start auto-update intervals
    startAutoUpdate();

    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    showNotification(
      "Error loading application. Please refresh the page.",
      "error",
    );
  }
}

//==================== EMAILJS CONFIGURATION ====================

const EMAILJS_CONFIG = {
  PUBLIC_KEY: "_PEwD_ZbRO1EoYbHU",
  SERVICE_ID: "service_2lly29s",
  TEMPLATE_ID: "template_5nro6ss",
};

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Build order items HTML for email template
function buildOrderItemsHTML(items) {
  if (!items || items.length === 0)
    return '<tr><td colspan="3">No items</td></tr>';

  let html = "";
  items.forEach((item) => {
    const itemTotal = (item.price * item.quantity).toLocaleString();
    html += `
            <tr>
                <td style="padding: 10px 0;">
                    <div class="item-name">${escapeHtml(item.name)}</div>
                    <div class="item-restaurant">${escapeHtml(item.restaurantName)}</div>
                </td>
                <td style="text-align: center; padding: 10px 0;">${item.quantity}</td>
                <td style="text-align: right; padding: 10px 0;">NGN ${itemTotal}</td>
            </tr>
        `;
  });
  return html;
}

// Initialize EmailJS
function initEmailJS() {
  try {
    // Check if EmailJS is loaded
    if (typeof emailjs === "undefined") {
      console.error("EmailJS library not loaded. Check your script tag.");
      showNotification(
        "Email service not available. Please contact support.",
        "error",
      );
      return false;
    }

    // Initialize with public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log("EmailJS initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
}

// Send order confirmation email via EmailJS
async function sendOrderConfirmation(orderData) {
  try {
    // Validate EmailJS configuration
    if (
      !EMAILJS_CONFIG.PUBLIC_KEY ||
      EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY"
    ) {
      console.warn("EmailJS not configured. Please add your credentials.");
      return { success: false, error: "Email service not configured" };
    }

    // Build order items HTML
    const orderItemsHTML = buildOrderItemsHTML(orderData.items);

    // Format delivery time based on location
    const deliveryTime =
      orderData.delivery_area === "Urban Area"
        ? "30-45 minutes"
        : "45-60 minutes";

    // Prepare email template parameters - using order_items_html instead of items array
    const templateParams = {
      // Order Details
      order_id: orderData.order_id,
      customer_name: escapeHtml(orderData.customer_name),
      customer_phone: orderData.customer_phone,

      // Delivery Details
      delivery_address: escapeHtml(orderData.customer_address),
      delivery_area: orderData.delivery_area,
      delivery_time: deliveryTime,
      special_instructions: escapeHtml(
        orderData.special_instructions || "None",
      ),

      // Order Items HTML (built in JavaScript)
      order_items_html: orderItemsHTML,

      // Financial Details
      subtotal: orderData.subtotal.toLocaleString(),
      delivery_fee: orderData.delivery_fee.toLocaleString(),
      total: orderData.total.toLocaleString(),

      // Additional Info
      order_date: new Date().toLocaleString(),
    };

    console.log("Sending email with params:", templateParams);

    // Send the email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
    );

    console.log("Email sent successfully:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.text || error.message || "Failed to send email",
    };
  }
}

// Send admin notification email (optional)
async function sendAdminNotification(orderData) {
  try {
    // Build items list for admin notification
    const itemsList = orderData.items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} (${item.restaurantName}) - NGN ${(item.price * item.quantity).toLocaleString()}`,
      )
      .join("\n");

    const adminTemplateParams = {
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      customer_address: orderData.customer_address,
      delivery_area: orderData.delivery_area,
      total: orderData.total.toLocaleString(),
      items_list: itemsList,
      special_instructions: orderData.special_instructions || "None",
      order_time: new Date().toLocaleString(),
    };

    // Uncomment and configure when you have an admin template
    /*
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            'ADMIN_TEMPLATE_ID', // Create a separate admin template
            adminTemplateParams
        );
        console.log('Admin notification sent');
        */

    return { success: true };
  } catch (error) {
    console.log("Admin notification not sent:", error);
    return { success: false };
  }
}

// Save order to localStorage for order history
function saveOrderToHistory(orderData) {
  try {
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orders.unshift({
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      customer_address: orderData.customer_address,
      delivery_area: orderData.delivery_area,
      total: orderData.total,
      items_count: orderData.items.length,
      timestamp: new Date().toISOString(),
      status: "pending",
    });
    // Keep last 50 orders
    localStorage.setItem("orderHistory", JSON.stringify(orders.slice(0, 50)));
    console.log("Order saved to history");
  } catch (error) {
    console.error("Error saving order to history:", error);
  }
}

// Enhanced submitOrder with EmailJS integration
async function submitOrder() {
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

  if (cart.length === 0) {
    showNotification("Your cart is empty. Please add items to order.", "error");
    return;
  }

  // Get submit button and show loading state
  const submitBtn = document.querySelector("#cartModal .menu-btn:last-child");
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
  submitBtn.disabled = true;

  try {
    // Calculate totals
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryFee = selectedLocation === "urban" ? 2500 : 3500;
    const serviceFee = 500;
    const total = subtotal + deliveryFee + serviceFee;

    // Generate order ID
    const orderId = "NB" + Date.now().toString().slice(-6);
    document.getElementById("orderId").textContent = orderId;

    // Prepare order data for EmailJS
    const orderData = {
      order_id: orderId,
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      special_instructions: instructions || "None",
      delivery_area:
        selectedLocation === "urban" ? "Urban Area" : "Sub-Urban Area",
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      subtotal: subtotal,
      total: total,
      items: cart.map((item) => ({
        name: item.name,
        restaurantName: item.restaurantName,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
    };

    console.log("Submitting order:", orderData);

    // Send email via EmailJS
    const emailResult = await sendOrderConfirmation(orderData);

    if (emailResult.success) {
      // Save order to history
      saveOrderToHistory(orderData);

      // Send admin notification (optional, uncomment if you have admin template)
      // await sendAdminNotification(orderData);

      // Clear cart
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

      // Show success modal
      setTimeout(() => {
        openModal("successModal");
      }, 500);

      showNotification(
        "Order submitted! Check your email for confirmation.",
        "success",
      );
    } else {
      // If email fails, still complete the order but show warning
      console.error("Email failed:", emailResult.error);

      // Save order to history anyway
      saveOrderToHistory(orderData);

      // Clear cart
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

      // Show success modal but with warning
      setTimeout(() => {
        openModal("successModal");
      }, 500);

      showNotification(
        "Order placed! However, confirmation email could not be sent. Please save your Order ID: " +
          orderId,
        "warning",
      );
    }
  } catch (error) {
    console.error("Order submission error:", error);
    showNotification("Error submitting order. Please try again.", "error");
  } finally {
    // Reset button state
    if (submitBtn) {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }
}

// State Management
let cart = JSON.parse(localStorage.getItem("nightBitesCart")) || [];
let selectedLocation = null;
let currentRestaurant = null;

// DOM Elements
const restaurantGrid = document.getElementById("restaurantGrid");
const featuredGrid = document.getElementById("featuredGrid");
const highlightsGrid = document.getElementById("highlightsGrid");
const cartCount = document.querySelector(".cart-count");
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

// Time Management
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  if (currentTimeEl) {
    currentTimeEl.textContent = timeString;
  }
}

function checkServiceHours() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  // Service hours: 6:00 PM (18:00) to 4:30 AM (4:30)
  const serviceStart = 18 * 60;
  const serviceEnd = 4 * 60 + 30;

  let isServiceActive = false;

  if (currentHour >= 18) {
    isServiceActive = currentTime >= serviceStart;
  } else if (currentHour < 4 || (currentHour === 4 && currentMinute <= 30)) {
    isServiceActive = currentTime <= serviceEnd;
  }

  if (serviceStatusEl) {
    if (isServiceActive) {
      serviceStatusEl.textContent = "Service: Active";
      serviceStatusEl.style.color = "var(--accent)";
    } else {
      serviceStatusEl.textContent = "Service: Closed (Opens 6:00 PM)";
      serviceStatusEl.style.color = "var(--danger)";
    }
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

  const adjustedClosingTime =
    closingTimeMinutes < 600
      ? closingTimeMinutes + 24 * 60
      : closingTimeMinutes;
  const adjustedCurrentTime = currentTime + (currentHour < 12 ? 24 * 60 : 0);

  return adjustedCurrentTime < adjustedClosingTime && checkServiceHours();
}

// Restaurant Rendering
function renderRestaurants(filteredRestaurants = restaurants) {
  if (!restaurantGrid) return;

  restaurantGrid.innerHTML = "";

  if (filteredRestaurants.length === 0) {
    restaurantGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray); margin-bottom: 1rem;"></i>
                <h3>No restaurants found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    return;
  }

  filteredRestaurants.forEach((restaurant) => {
    const isOpen = isRestaurantOpen(restaurant.closingTime);

    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-img" loading="lazy">
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
                <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 0.5rem;">${restaurant.description}</p>
                <p style="font-size: 0.85rem;">Closes at: ${restaurant.closingTime} AM</p>
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
  if (!featuredGrid) return;

  featuredGrid.innerHTML = "";

  featuredItems.forEach((item) => {
    const restaurant = restaurants.find((r) => r.id === item.restaurantId);
    if (!restaurant) return;

    const card = document.createElement("div");
    card.className = "featured-card";
    card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="featured-img" loading="lazy">
            <div class="featured-info">
                <span class="featured-tag">Featured</span>
                <h3>${item.name}</h3>
                <p style="color: var(--gray); margin: 0.5rem 0; font-size: 0.9rem;">${item.description}</p>
                <p style="color: var(--primary); font-weight: 700; font-size: 1.2rem; margin: 0.5rem 0;">₦${item.price.toLocaleString()}</p>
                <p style="font-size: 0.85rem; color: var(--gray); margin-bottom: 1rem;">From: ${restaurant.name}</p>
                <button class="add-to-cart-btn" onclick="addFeaturedToCart(${item.id}, ${item.restaurantId})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
    featuredGrid.appendChild(card);
  });
}

// Highlights Section (Restaurant of the Week + Most Popular Dish)
function renderHighlights() {
  if (!highlightsGrid) return;

  // Get restaurant of the week (first featured restaurant)
  const restaurantOfWeek =
    restaurants.find((r) => r.featured) || restaurants[0];
  const popularDish =
    restaurantOfWeek.menu.find((m) => m.popular) || restaurantOfWeek.menu[0];

  highlightsGrid.innerHTML = `
        <!-- Restaurant of the Week -->
        <div class="week-card">
            <span class="week-badge">🏆 RESTAURANT OF THE WEEK</span>
            <div>
                <h3>${restaurantOfWeek.name}</h3>
                <p style="opacity: 0.9; margin-bottom: 1rem;">${restaurantOfWeek.description}</p>
                <div class="week-stats">
                    <div class="week-stat">
                        <div class="week-stat-value">${restaurantOfWeek.rating}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Rating</div>
                    </div>
                    <div class="week-stat">
                        <div class="week-stat-value">${restaurantOfWeek.deliveryTime}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Delivery</div>
                    </div>
                    <div class="week-stat">
                        <div class="week-stat-value">${restaurantOfWeek.closingTime}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Closes</div>
                    </div>
                </div>
            </div>
            <button class="menu-btn" onclick="openMenu(${restaurantOfWeek.id})" style="background: white; color: #764ba2; margin-top: 1rem;">
                Order Now
            </button>
        </div>
        
        <!-- Most Popular Dish -->
        <div class="popular-card">
            <span class="popular-badge">🔥 MOST POPULAR</span>
            <div>
                <h3>${popularDish.name}</h3>
                <p style="opacity: 0.9; margin-bottom: 1rem;">${popularDish.description}</p>
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">From: ${restaurantOfWeek.name}</p>
                <div class="popular-stats">
                    <div class="popular-stat">
                        <div class="popular-stat-value">₦${popularDish.basePrice.toLocaleString()}</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Price</div>
                    </div>
                    <div class="popular-stat">
                        <div class="popular-stat-value">4.9</div>
                        <div style="opacity: 0.8; font-size: 0.9rem;">Rating</div>
                    </div>
                </div>
            </div>
            <button class="menu-btn" onclick="addToCart(${popularDish.id}, ${restaurantOfWeek.id})" style="background: white; color: var(--primary); margin-top: 1rem;">
                <i class="fas fa-cart-plus"></i> Add to Cart - ₦${popularDish.basePrice.toLocaleString()}
            </button>
        </div>
    `;
}

// About Section
function renderAboutSection() {
  const aboutSection = document.querySelector(".about-content");
  if (!aboutSection) return;

  aboutSection.innerHTML = `
        <div class="about-text">
            <h2>About <span>Calabar Night Bites</span></h2>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                We're Calabar's premier late-night food delivery service, bringing the best restaurants 
                to your doorstep from 6:00 PM to 4:30 AM daily. Our mission is to satisfy your cravings 
                with quality food from trusted vendors.
            </p>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                Whether you're craving local delicacies, continental dishes, or midnight snacks, 
                we've got you covered with our extensive network of restaurants and efficient delivery system.
            </p>
            <div class="about-stats">
                <div class="stat-item">
                    <div class="stat-number">5+</div>
                    <div class="stat-label">Restaurants</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">600+</div>
                    <div class="stat-label">Happy Customers</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Support</div>
                </div>
            </div>
        </div>
        <div class="about-image">
            <img src="img/2.png" alt="Calabar Night Bites Team" loading="lazy">
        </div>
    `;
}

// Filter Functions
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
    if (restaurant.name.toLowerCase().includes(term)) return true;

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

  showNotification(`${menuItem.name} added to cart!`);
}

function addFeaturedToCart(menuItemId, restaurantId) {
  addToCart(menuItemId, restaurantId);
}

function updateCart() {
  localStorage.setItem("nightBitesCart", JSON.stringify(cart));
  updateCartCount();

  if (document.getElementById("cartModal")?.classList.contains("active")) {
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
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div style="text-align: right;">
                    <input type="number" class="price-input" 
                        value="${item.price}" 
                        min="${item.minPrice}"
                        onchange="updatePrice(${index}, this.value)">
                    <p style="margin-top: 5px;">₦${(item.price * item.quantity).toLocaleString()}</p>
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
      ? 2500
      : selectedLocation === "suburban"
        ? 3500
        : 0;
  const serviceFee = 500;
  const total = subtotal + deliveryFee + serviceFee;

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
  const account = "6607279314";
  navigator.clipboard.writeText(account).then(() => {
    showNotification("Account number copied to clipboard!");
  });
}

// Enhanced submitOrder with EmailJS integration
async function submitOrder() {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("deliveryAddress").value;
  const instructions = document.getElementById("specialInstructions").value;
  const email = document.getElementById("customerEmail")?.value || "";

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

  // Get submit button and show loading state
  const submitBtn = document.querySelector("#cartModal .menu-btn:last-child");
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
  submitBtn.disabled = true;

  try {
    // Calculate totals
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryFee = selectedLocation === "urban" ? 2500 : 3500;
    const serviceFee = 500;
    const total = subtotal + deliveryFee + serviceFee;

    // Generate order ID
    const orderId = "NB" + Date.now().toString().slice(-6);
    document.getElementById("orderId").textContent = orderId;

    // Get unique restaurants
    const uniqueRestaurants = [
      ...new Set(cart.map((item) => item.restaurantName)),
    ];

    // Prepare order data for EmailJS
    const orderData = {
      order_id: orderId,
      customer_name: name,
      customer_phone: phone,
      customer_email:
        email || `${name.toLowerCase().replace(/\s/g, ".")}@customer.com`,
      customer_address: address,
      special_instructions: instructions || "None",
      delivery_area:
        selectedLocation === "urban" ? "Urban Area" : "Sub-Urban Area",
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      subtotal: subtotal,
      total: total,
      items: cart.map((item) => ({
        name: item.name,
        restaurantName: item.restaurantName,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      restaurants: uniqueRestaurants.join(", "),
    };

    console.log("Submitting order:", orderData);

    // Send email via EmailJS
    const emailResult = await sendOrderConfirmation(orderData);

    if (emailResult.success) {
      // Save order to history
      saveOrderToHistory(orderData);

      // Send admin notification (optional)
      await sendAdminNotification(orderData);

      // Clear cart
      cart = [];
      updateCart();
      closeModal("cartModal");

      // Reset form
      document.getElementById("customerName").value = "";
      document.getElementById("customerPhone").value = "";
      document.getElementById("deliveryAddress").value = "";
      document.getElementById("specialInstructions").value = "";
      if (document.getElementById("customerEmail")) {
        document.getElementById("customerEmail").value = "";
      }
      selectedLocation = null;
      document.querySelectorAll(".location-option").forEach((option) => {
        option.classList.remove("selected");
      });

      // Show success modal
      setTimeout(() => {
        openModal("successModal");
      }, 500);

      showNotification(
        "Order submitted! Check your email for confirmation.",
        "success",
      );
    } else {
      throw new Error(emailResult.error || "Failed to send confirmation email");
    }
  } catch (error) {
    console.error("Order submission error:", error);
    showNotification(
      error.message || "Error submitting order. Please try again.",
      "error",
    );
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
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
  // Remove existing notifications
  document.querySelectorAll(".notification").forEach((n) => n.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type === "error" ? "error" : ""}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Event Listeners Setup
function setupEventListeners() {
  // Cart button
  document
    .getElementById("cartBtn")
    ?.addEventListener("click", () => openModal("cartModal"));

  // Theme toggle
  themeToggle?.addEventListener("click", toggleTheme);

  // Search input
  searchInput?.addEventListener("input", handleSearch);

  // Check initial theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Add to cart from anywhere
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const itemName = e.target
        .closest(".menu-item")
        ?.querySelector("h4")?.textContent;
      if (itemName) {
        showNotification(`${itemName} added to cart!`);
      }
    }
  });
}

// Auto Update Functions
function startAutoUpdate() {
  // Update time every minute
  setInterval(() => {
    updateTime();
    checkServiceHours();
    renderRestaurants();
  }, 60000);
}

// Make functions globally available
window.filterRestaurants = filterRestaurants;
window.filterByCategory = filterByCategory;
window.openMenu = openMenu;
window.addToCart = addToCart;
window.addFeaturedToCart = addFeaturedToCart;
window.updateQuantity = updateQuantity;
window.updatePrice = updatePrice;
window.removeFromCart = removeFromCart;
window.selectLocation = selectLocation;
window.openModal = openModal;
window.closeModal = closeModal;
window.copyAccount = copyAccount;
window.submitOrder = submitOrder;
window.toggleTheme = toggleTheme;
window.showNotification = showNotification;
