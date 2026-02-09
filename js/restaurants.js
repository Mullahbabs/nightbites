// This file loads restaurant data from JSON
// In production, this would be an API call

let restaurants = [];
let featuredItems = [];

// Function to load restaurants from JSON file
async function loadRestaurants() {
  try {
    const response = await fetch("data/restaurants.json");
    restaurants = await response.json();
    console.log("Restaurants loaded successfully:", restaurants.length);

    // Generate featured items from the loaded data
    generateFeaturedItems();

    return restaurants;
  } catch (error) {
    console.error("Error loading restaurants:", error);
    // Fallback to sample data if JSON fails to load
    restaurants = getSampleRestaurants();
    generateFeaturedItems();
    return restaurants;
  }
}

// Generate featured items from restaurants
function generateFeaturedItems() {
  featuredItems = [];

  // Get popular items from different restaurants
  restaurants.forEach((restaurant) => {
    const popularItems = restaurant.menu.filter((item) => item.popular);

    if (popularItems.length > 0) {
      const featuredItem = popularItems[0];
      featuredItems.push({
        id: featuredItem.id,
        restaurantId: restaurant.id,
        name: featuredItem.name,
        description: featuredItem.description,
        price: featuredItem.basePrice,
        image: restaurant.image, // Using restaurant image for featured items
      });
    }
  });

  // Ensure we have at least 4 featured items
  while (featuredItems.length < 4 && restaurants.length > 0) {
    restaurants.forEach((restaurant) => {
      if (featuredItems.length < 4 && restaurant.menu.length > 0) {
        const firstItem = restaurant.menu[0];
        // Check if item is already in featured
        if (!featuredItems.find((item) => item.id === firstItem.id)) {
          featuredItems.push({
            id: firstItem.id,
            restaurantId: restaurant.id,
            name: firstItem.name,
            description: firstItem.description,
            price: firstItem.basePrice,
            image: restaurant.image,
          });
        }
      }
    });
  }

  console.log("Featured items generated:", featuredItems.length);
}

// Fallback sample data in case JSON fails to load
function getSampleRestaurants() {
  return [
    {
      id: 1,
      name: "Daddy K's Kitchen",
      category: "fast-food",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      deliveryTime: "25-40 min",
      closingTime: "04:00",
      status: "open",
      featured: true,
      description: "Delicious noodles, rice dishes, and grilled meats",
      menu: [
        {
          id: 5,
          name: "Noodles & Egg",
          description: "One Indomie & One egg, (mini pack)",
          basePrice: 950,
          minPrice: 950,
          popular: true,
        },
        {
          id: 13,
          name: "Fried Chicken",
          description: "Well fried chicken",
          basePrice: 2200,
          minPrice: 2200,
          popular: true,
        },
      ],
    },
    {
      id: 2,
      name: "Ifeco's Kitchen",
      category: "local",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      deliveryTime: "30-45 min",
      closingTime: "03:00",
      status: "open",
      featured: true,
      description: "Authentic Calabar cuisine with variety of local dishes",
      menu: [
        {
          id: 36,
          name: "Noodles & Egg",
          description: "One Indomie & One egg, (mini pack)",
          basePrice: 950,
          minPrice: 950,
          popular: true,
        },
        {
          id: 45,
          name: "Fried Chicken",
          description: "Well fried chicken wing",
          basePrice: 3200,
          minPrice: 3200,
          popular: true,
        },
      ],
    },
  ];
}

// Make variables globally accessible
window.restaurantsData = restaurants;
window.featuredItemsData = featuredItems;
