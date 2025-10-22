/* Code Attribution
   Author: Olivia Bennett
   Title: React Native Multi-Screen Menu Management App
   Date Published: 2025
   Link/URL: https://github.com/oliviabennettdev/react-native-menu-manager
   Date Accessed: 2025-09-29
*/

// Import necessary modules and components from React and React Native
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Import custom screen components
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';

// -----------------------------
// Type Definitions
// -----------------------------

// Interface representing a single menu item in the app
export interface MenuItem {
  id: string;          // Unique identifier for each dish
  name: string;        // Name of the dish
  description: string; // Short description of the dish
  course: string;      // Course category (e.g., Breakfast, Lunch, Dinner)
  price: number;       // Price of the dish
  image?: string;      // Optional image URL for the dish
}

// Define available screens for navigation
type Screen = 'splash' | 'home' | 'addDish';

// -----------------------------
// Sample Data
// -----------------------------

// Initial dishes displayed when the app loads for the first time
const INITIAL_DISHES: MenuItem[] = [
  {
    id: '2',
    name: 'Full English Breakfast',
    description: 'Classic Full English breakfast with eggs, bacon, sausages, and beans',
    course: 'Breakfast',
    price: 85.00,
    image: 'https://plus.unsplash.com/premium_photo-1663840225558-03ac41c68873?...',
  },
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons and Caesar dressing',
    course: 'Lunch',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?...',
  },
  {
    id: '3',
    name: 'Beef Steak',
    description: 'Prime ribeye steak with garlic butter and roasted vegetables',
    course: 'Dinner',
    price: 225.00,
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?...',
  },
];

// -----------------------------
// Main App Component
// -----------------------------

const App: React.FC = () => {
  // State to track which screen is currently active
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  // State to store the list of dishes (menu items)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_DISHES);

  // -----------------------------
  // Navigation and Actions
  // -----------------------------

  // Called when the splash screen finishes loading
  const handleSplashFinish = () => {
    setCurrentScreen('home'); // Navigate to the home screen
  };

  // Navigate from Home to Add Dish screen
  const navigateToAddDish = () => {
    setCurrentScreen('addDish');
  };

  // Navigate back from Add Dish to Home screen
  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  // Add a new dish to the menu
  const addMenuItem = (
    name: string,
    description: string,
    course: string,
    price: number,
    imageUrl?: string
  ) => {
    const newItem: MenuItem = {
      id: Date.now().toString(), // Generate unique ID using timestamp
      name,
      description,
      course,
      price,
      image: imageUrl,
    };

    // Add the new item to the existing menu
    setMenuItems([...menuItems, newItem]);
  };

  // Delete a dish by its ID
  const deleteMenuItem = (id: string) => {
    // Filter out the item to be deleted
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // -----------------------------
  // Screen Rendering Logic
  // -----------------------------

  // Conditionally render screens based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        // Show splash screen first
        return <SplashScreen onFinish={handleSplashFinish} />;

      case 'home':
        // Show home screen with menu and add/delete features
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );

      case 'addDish':
        // Show Add Dish screen to create new dishes
        return (
          <AddDishScreen
            onAddDish={addMenuItem}
            onCancel={navigateToHome}
          />
        );

      default:
        // Fallback to home screen in case of an unknown state
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );
    }
  };

  // Render the app container and display the selected screen
  return <View style={styles.container}>{renderScreen()}</View>;
};

// -----------------------------
// Styles
// -----------------------------

// Basic layout styling for the main container
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the view takes up the full screen
  },
});

// Export the App component as the default export
export default App;
