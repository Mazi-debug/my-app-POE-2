/* Code Attribution
   Author: Bootstrap Team
   Title: Bootstrap v5 Accessibility Helpers
   Date Published: 2024
   Link/URL: https://getbootstrap.com/docs/5.0/helpers/screen-readers/
   Date Accessed: 2025-09-29
*/

// Import necessary React and React Native components and hooks
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Predefined list of meal courses for dish categorization
export const COURSES = ['Breakfast', 'Lunch', 'Dinner'];

// Define the expected props for the AddDishScreen component
interface AddDishScreenProps {
  // Function passed from parent to handle adding a new dish
  onAddDish: (name: string, description: string, course: string, price: number, imageUrl?: string) => void;
  // Function passed from parent to handle cancellation
  onCancel: () => void;
}

// Main functional component for adding a new dish
const AddDishScreen: React.FC<AddDishScreenProps> = ({ onAddDish, onCancel }) => {
  // State hooks for managing form input fields
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Handles validation and submission of a new dish
  const handleAddDish = () => {
    // Input validation for required fields
    if (!dishName.trim()) {
      Alert.alert('Error', 'Please enter a dish name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Call parent function to add dish to menu
    onAddDish(dishName, description, selectedCourse, parseFloat(price), imageUrl.trim() || undefined);

    // Reset form fields
    setDishName('');
    setDescription('');
    setSelectedCourse(COURSES[0]);
    setPrice('');
    setImageUrl('');

    // Success feedback alert
    Alert.alert('Success', 'Dish added to menu!', [
      { text: 'OK', onPress: onCancel }
    ]);
  };

  return (
    // Ensures input fields adjust properly when keyboard is open (especially on iOS)
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Dish</Text>
          <Text style={styles.headerSubtitle}>Fill in the details below</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Dish Name Input */}
          <Text style={styles.label}>Dish Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={dishName}
            onChangeText={setDishName}
            placeholderTextColor="#999"
          />

          {/* Description Input */}
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#999"
          />

          {/* Course Picker Dropdown */}
          <Text style={styles.label}>Course *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(itemValue) => setSelectedCourse(itemValue)}
              style={styles.picker}
              dropdownIconColor="#ff0000ff"
              itemStyle={styles.pickerItem}
            >
              {COURSES.map((course) => (
                <Picker.Item key={course} label={course} value={course} />
              ))}
            </Picker>
          </View>

          <View style={styles.spacer} />

          {/* Optional Image URL Input */}
          <Text style={styles.label}>Image URL (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste image URL here"
            value={imageUrl}
            onChangeText={setImageUrl}
            keyboardType="url"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          {/* Price Input */}
          <Text style={styles.label}>Price (R) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
            <Text style={styles.addButtonText}>Add Dish</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Style definitions for the AddDishScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ff0000ff',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFE5D9',
    marginTop: 5,
  },
  formSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    height: 55,
  },
  picker: {
    height: 55,
    color: '#333',
  },
  pickerItem: {
    height: 55,
  },
  spacer: {
    height: 20,
  },
  addButton: {
    backgroundColor: '#ff0000ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Export the AddDishScreen component as default
export default AddDishScreen;
