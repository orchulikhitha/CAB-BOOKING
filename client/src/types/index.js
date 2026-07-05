// Booking Status Constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DRIVER_ASSIGNED: 'driver_assigned',
  DRIVER_ARRIVING: 'driver_arriving',
  ARRIVED: 'arrived',
  TRIP_STARTED: 'trip_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  DRIVER: 'driver',
  ADMIN: 'admin',
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
};

// Driver Availability
export const DRIVER_AVAILABILITY = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
};

// Vehicle Types
export const VEHICLE_TYPES = {
  MINI: 'mini',
  SEDAN: 'sedan',
  SUV: 'suv',
  LUXURY: 'luxury',
};

// Vehicle Status
export const VEHICLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING: 'booking',
  PAYMENT: 'payment',
  PROMO: 'promo',
  SYSTEM: 'system',
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Theme Modes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// API Response helper
export const createApiResponse = (success, data, message, error) => ({
  success,
  data,
  message,
  error,
});

// Default Fare Structure
export const DEFAULT_FARE = {
  baseFare: 25,
  distanceFare: 0,
  timeFare: 0,
  surgeFactor: 1,
  surgeFare: 0,
  tax: 0,
  discount: 0,
  total: 0,
  currency: 'INR',
};
