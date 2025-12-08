// Default map center: Novi Sad, Serbia
export const DEFAULT_CENTER: [number, number] = [45.2671, 19.8335];

// Zoom levels
export const DEFAULT_ZOOM = 14;
export const CENTERED_ZOOM = 16;

// Tile layer
export const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

// Route styling
export const ROUTE_STYLE = {
  color: '#7c3aed',
  weight: 6,
  opacity: 0.8,
} as const;

// Map bounds padding
export const FIT_BOUNDS_PADDING: [number, number] = [50, 50];

// Animation timing (ms)
export const PROGRAMMATIC_MOVE_DELAY = 300;
export const ROUTING_INIT_DELAY = 150;
