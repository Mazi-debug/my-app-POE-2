// types.ts - Central type definitions for ChefCast app

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

export type Screen = 'splash' | 'home' | 'addDish';

export const COURSES: readonly string[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];