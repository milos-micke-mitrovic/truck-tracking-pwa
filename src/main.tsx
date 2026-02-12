import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './styles/globals.css';

import { App } from '@/app/App';

setupIonicReact({
  mode: 'ios',
});

async function enableMocking(): Promise<void> {
  // Enable MSW only when explicitly enabled
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });

    // Setup SSE mock for console testing
    const { setupSSEMock } = await import('@/mocks/sse-mock');
    setupSSEMock();
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

void enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
