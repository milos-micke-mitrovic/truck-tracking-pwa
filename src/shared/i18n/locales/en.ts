export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    retry: 'Retry',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    submit: 'Submit',
    search: 'Search',
    noResults: 'No results found',
    optional: 'Optional',
    required: 'Required',
  },

  // Navigation
  nav: {
    home: 'Home',
    map: 'Map',
    profile: 'Profile',
    settings: 'Settings',
    help: 'Help & Support',
    logout: 'Logout',
  },

  // Auth
  auth: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember me',
    signInTitle: 'Sign in to continue',
    invalidCredentials: 'Invalid email or password',
    sessionExpired: 'Your session has expired. Please sign in again.',
    demoCredentials: 'Demo credentials',
  },

  // Validation
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email',
    minLength: 'Must be at least {{min}} characters',
    maxLength: 'Must be at most {{max}} characters',
    passwordMismatch: 'Passwords do not match',
  },

  // Home
  home: {
    welcome: 'Welcome back, {{name}}',
    welcomeGuest: 'Welcome back, Driver',
    driverId: 'Driver ID: {{id}}',
    status: 'Status',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    gettingStarted: 'Getting Started',
    gettingStartedDesc: 'Welcome to Truck Drive! This is your driver dashboard.',
    gettingStartedHint: 'Use the navigation below to access different features.',
  },

  // Map
  map: {
    title: 'Map',
    loading: 'Loading map...',
    error: 'Failed to load map',
    placeholder: 'Map View',
    placeholderHint: 'Integrate your preferred map provider here',
    myLocation: 'My Location',
    directions: 'Directions',
  },

  // Profile
  profile: {
    title: 'Profile',
    personalInfo: 'Personal Information',
    name: 'Name',
    phone: 'Phone Number',
    vehicle: 'Vehicle Information',
    licensePlate: 'License Plate',
    vehicleType: 'Vehicle Type',
  },

  // Settings
  settings: {
    title: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    emailNotifications: 'Email Notifications',
    privacy: 'Privacy',
    locationServices: 'Location Services',
    about: 'About',
    version: 'Version',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
  },

  // Errors
  errors: {
    generic: 'Something went wrong',
    network: 'Network error. Please check your connection.',
    notFound: 'Not found',
    unauthorized: 'Unauthorized',
    forbidden: 'Access denied',
    serverError: 'Server error. Please try again later.',
    timeout: 'Request timed out',
    offline: 'You are offline',
  },

  // Empty states
  empty: {
    noData: 'No data available',
    noNotifications: 'No notifications',
    noMessages: 'No messages',
  },

  // Time
  time: {
    now: 'Just now',
    minutesAgo: '{{count}} minute ago',
    minutesAgo_plural: '{{count}} minutes ago',
    hoursAgo: '{{count}} hour ago',
    hoursAgo_plural: '{{count}} hours ago',
    daysAgo: '{{count}} day ago',
    daysAgo_plural: '{{count}} days ago',
  },

  // App
  app: {
    name: 'Truck Drive',
    tagline: 'Your reliable driving companion',
  },
} as const;

export type TranslationKeys = typeof en;
