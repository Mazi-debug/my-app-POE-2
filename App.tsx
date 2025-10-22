import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';

// MenuItem interface
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  image?: string;
}

type Screen = 'splash' | 'home' | 'addDish';

// Initial dishes to display on startup
const INITIAL_DISHES: MenuItem[] = [
  {
    id: '2',
    name: 'Full English Breakfast',
    description: 'Classic Full English breakfast with eggs, bacon, sausages, and beans',
    course: 'Breakfast',
    price: 85.00,
    image: 'https://plus.unsplash.com/premium_photo-1663840225558-03ac41c68873?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
  },
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons and Caesar dressing',
    course: 'Lunch',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1106',
  },
  {
    id: '3',
    name: 'Beef Steak',
    description: 'Prime ribeye steak with garlic butter and roasted vegetables',
    course: 'Dinner',
    price: 225.00,
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
  },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_DISHES);

  // Handle splash screen finish
  const handleSplashFinish = () => {
    setCurrentScreen('home');
  };

  // Navigate to Add Dish screen
  const navigateToAddDish = () => {
    setCurrentScreen('addDish');
  };

  // Navigate back to Home screen
  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  // Add a new menu item
  const addMenuItem = (name: string, description: string, course: string, price: number, imageUrl?: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
      image: imageUrl,
    };

    setMenuItems([...menuItems, newItem]);
  };

  // Delete a menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'home':
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );
      case 'addDish':
        return (
          <AddDishScreen
            onAddDish={addMenuItem}
            onCancel={navigateToHome}
          />
        );
      default:
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;