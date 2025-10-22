/* Code Attribution
   Author: Daniel Rivera
   Title: Expo Root Component Registration Script
   Date Published: 2025
   Link/URL: https://github.com/danielrivera-dev/expo-root-config
   Date Accessed: 2025-09-29
*/

// Importing the function 'registerRootComponent' from the Expo library.
// This function is responsible for registering the main app component with the app registry.
import { registerRootComponent } from 'expo';

// Importing the root component of the application (App.tsx or App.js),
// which serves as the main entry point of the user interface.
import App from './App';

// The registerRootComponent function automatically registers the main App component
// as the root of the application. It wraps AppRegistry.registerComponent('main', () => App)
// under the hood, ensuring that the app runs correctly in both environments:
//
// 1. Expo Go (development environment)
// 2. Native builds (production or standalone apps)
//
// This setup ensures consistent initialization and environment configuration
// regardless of how the app is launched.
registerRootComponent(App);
