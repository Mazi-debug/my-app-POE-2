/* Code Attribution
   Author: Sophia Martinez
   Title: Type Definitions for ChefCast React Native App
   Date Published: 2025
   Link/URL: https://github.com/sophiamartinezdev/chefcast-types
   Date Accessed: 2025-09-29
*/

// types.ts - Central type definitions for ChefCast app

// Interface representing a single menu item within the app
export interface MenuItem {
  id: string;          // Unique identifier for the menu item
  name: string;        // Name of the dish (e.g., "Pasta Carbonara")
  description: string; // Short description of the dish
  course: string;      // Course category (e.g., "Lunch", "Dinner")
  price: number;       // Price of the dish in the restaurant’s currency
}

// Type alias defining possible screen names for navigation within the app
export type Screen = 'splash' | 'home' | 'addDish';

// Constant array listing all available course categories
// The 'readonly' keyword prevents modification of the array
export const COURSES: readonly string[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];
