// App Information
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Truck Drive';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || '/api';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10);

// Feature Flags
export const ENABLE_MSW = import.meta.env.VITE_ENABLE_MSW === 'true';
export const ENABLE_DEVTOOLS = import.meta.env.VITE_ENABLE_DEVTOOLS === 'true';

// Map Configuration
export const MAP_PROVIDER = import.meta.env.VITE_MAP_PROVIDER || '';
export const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY || '';

// Push Notifications
export const PUSH_ENABLED = import.meta.env.VITE_PUSH_ENABLED === 'true';
export const PUSH_VAPID_KEY = import.meta.env.VITE_PUSH_VAPID_KEY || '';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH: 'truck-drive-auth',
  PREFERENCES: 'truck-drive-preferences',
  CACHE: 'truck-drive-cache',
} as const;

// Route Paths
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  MAP: '/map',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// Animation Durations (in ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 100,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;
