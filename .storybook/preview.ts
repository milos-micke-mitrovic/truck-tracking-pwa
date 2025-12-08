import type { Preview } from '@storybook/react-vite';

// Import Ionic styles
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

// Import our global styles
import '../src/styles/globals.css';

// Setup Ionic
import { setupIonicReact } from '@ionic/react';
setupIonicReact({ mode: 'ios' });

// Mobile-only viewports
const mobileViewports = {
  iphone14: {
    name: 'iPhone 14',
    styles: { width: '390px', height: '844px' },
  },
  iphone14promax: {
    name: 'iPhone 14 Pro Max',
    styles: { width: '430px', height: '932px' },
  },
  iphonese: {
    name: 'iPhone SE',
    styles: { width: '375px', height: '667px' },
  },
  pixel5: {
    name: 'Pixel 5',
    styles: { width: '393px', height: '851px' },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f4f4f4' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    viewport: {
      viewports: mobileViewports,
      defaultViewport: 'iphone14',
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default preview;
