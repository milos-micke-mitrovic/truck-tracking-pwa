/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Server
  readonly VITE_PORT: string;

  // API
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;

  // App
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;

  // Feature Flags
  readonly VITE_ENABLE_MSW: string;
  readonly VITE_ENABLE_DEVTOOLS: string;

  // Map
  readonly VITE_MAP_PROVIDER: string;
  readonly VITE_MAP_API_KEY: string;

  // Push Notifications
  readonly VITE_PUSH_ENABLED: string;
  readonly VITE_PUSH_VAPID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
