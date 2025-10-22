// Import core React and React Native components
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

// -----------------------------
// Type Definitions
// -----------------------------

// Interface describing the structure of a menu item object
export interface MenuItem {
  id: string;          // Unique identifier for each dish
  name: string;        // Dish name
  description: string; // Short summary or ingredients
  course: string;      // Course category (Breakfast, Lunch, Dinner, etc.)
  price: number;       // Price of the dish
  image?: string;      // Optional image URL
}

// Props expected by the HomeScreen component
interface HomeScreenProps {
  menuItems: MenuItem[];          // Array of menu items to display
  onAddPress: () => void;         // Callback when the "Add Dish" button is pressed
  onDeleteItem: (id: string) => void; // Callback when a dish is deleted
}

// -----------------------------
// HomeScreen Component
// -----------------------------

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onAddPress, onDeleteItem }) => {
  // Show confirmation alert before deleting a dish
  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Dish',                        // Alert title
      `Are you sure you want to delete "${name}"?`, // Confirmation message
      [
        { text: 'Cancel', style: 'cancel' }, // Cancel option
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteItem(id) }, // Confirm delete
      ]
    );
  };

  // Render a single menu item card
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      {/* Display dish image if available */}
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.dishImage}
          resizeMode="cover"
        />
      )}

      {/* Card content section */}
      <View style={styles.cardContent}>
        {/* Header: dish name and course tag */}
        <View style={styles.menuCardHeader}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.courseTag}>{item.course}</Text>
        </View>

        {/* Description of the dish */}
        <Text style={styles.description}>{item.description}</Text>

        {/* Footer: price and delete button */}
        <View style={styles.cardFooter}>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id, item.name)}
          >
            <Text style={styles.deleteButtonText}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // -----------------------------
  // Component Render
  // -----------------------------
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* App header section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Christoffel's App</Text>
          <Text style={styles.headerSubtitle}>Menu Management</Text>
        </View>

        {/* Statistics card displaying total dishes */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{menuItems.length}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
        </View>

        {/* Add New Dish button */}
        <TouchableOpacity style={styles.addDishButton} onPress={onAddPress}>
          <Text style={styles.addDishButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        {/* Menu list section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Current Menu</Text>

          {/* If no dishes exist, show an empty state message */}
          {menuItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No dishes added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap "Add New Dish" to create your first menu item
              </Text>
            </View>
          ) : (
            // Otherwise, render list of menu items
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} // Disable nested scrolling (handled by ScrollView)
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// -----------------------------
// Styles
// -----------------------------

const styles = StyleSheet.create({
  // Root container with background color
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  // Header section at top of screen
  header: {
    backgroundColor: '#ff0000ff',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFE5D9',
    marginTop: 5,
  },
  // Card showing total menu items
  statsCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fc1414ff',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  // "Add Dish" button styling
  addDishButton: {
    backgroundColor: '#ff2525ff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addDishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Section for the current menu list
  menuSection: {
    margin: 15,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  // Individual dish card styling
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  dishImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  // Header within each menu card
  menuCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  courseTag: {
    backgroundColor: '#FFE5D9',
    color: '#ff1d1dff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000ff',
  },
  deleteButton: {
    backgroundColor: '#ff0101ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Empty state styling (when no dishes exist)
  emptyState: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
});

// Export the HomeScreen component as the default export
export default HomeScreen;
