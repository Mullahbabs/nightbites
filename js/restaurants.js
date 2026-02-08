// This file loads restaurant data from JSON
// In production, this would be an API call

let restaurants = [];

// Function to load restaurants from JSON file
async function loadRestaurants() {
  try {
    const response = await fetch("data/restaurants.json");
    restaurants = await response.json();
    console.log("Restaurants loaded successfully:", restaurants.length);
    return restaurants;
  } catch (error) {
    console.error("Error loading restaurants:", error);
    // Fallback to sample data if JSON fails to load
    restaurants = getSampleRestaurants();
    return restaurants;
  }
}

// Fallback sample data in case JSON fails
function getSampleRestaurants() {
  return [
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
      description: "Best grilled meats in Calabar, open till 4am",
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
    // Add more sample restaurants as needed
  ];
}

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
