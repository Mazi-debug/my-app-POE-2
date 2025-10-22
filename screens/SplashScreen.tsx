// Import necessary modules from React and React Native
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

// -----------------------------
// Props Interface
// -----------------------------

// Defines the props accepted by the SplashScreen component
// onFinish: callback function that triggers navigation when the splash screen ends
interface SplashScreenProps {
  onFinish: () => void;
}

// -----------------------------
// SplashScreen Component
// -----------------------------

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Create animated values for opacity (fade) and scale (zoom)
  const fadeAnim = new Animated.Value(0);   // Starts fully transparent
  const scaleAnim = new Animated.Value(0.3); // Starts at 30% size

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Run both fade and scale animations simultaneously
    Animated.parallel([
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,           // Fade to fully visible
        duration: 1000,       // Duration: 1 second
        useNativeDriver: true // Use native driver for better performance
      }),
      // Scale-up animation with spring effect
      Animated.spring(scaleAnim, {
        toValue: 1,           // Scale to full size
        tension: 10,          // Controls spring stiffness
        friction: 2,          // Controls spring resistance
        useNativeDriver: true
      }),
    ]).start(); // Start both animations

    // After 3 seconds, trigger the onFinish callback to move to the next screen
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // -----------------------------
  // Component Render
  // -----------------------------
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,             // Bind opacity to fade animation
            transform: [{ scale: scaleAnim }], // Bind scaling transformation
          },
        ]}
      >
        {/* Circular logo area with chef emoji */}
        <View style={styles.logoContainer}>
          <Text style={styles.chefIcon}>👨🏽‍🍳</Text>
        </View>

        {/* App title and tagline */}
        <Text style={styles.title}>Christoffel's App</Text>
        <Text style={styles.subtitle}>Menu Management Made Easy</Text>

        {/* Decorative divider */}
        <View style={styles.divider} />

        {/* Attribution text */}
        <Text style={styles.tagline}>By Chef Christoffel</Text>
      </Animated.View>
    </View>
  );
};

// -----------------------------
// Styles
// -----------------------------

const styles = StyleSheet.create({
  // Main container centered on screen
  container: {
    flex: 1,
    backgroundColor: '#ff1818ff', // Red background
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Container for animated content
  content: {
    alignItems: 'center',
  },
  // Circular white logo background
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // Emoji logo style
  chefIcon: {
    fontSize: 60,
  },
  // App title text style
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  // Subtitle text style
  subtitle: {
    fontSize: 18,
    color: '#FFE5D9',
    marginBottom: 20,
  },
  // Decorative divider line
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  // Tagline style (italicized text)
  tagline: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
});

// Export component as default
export default SplashScreen;
