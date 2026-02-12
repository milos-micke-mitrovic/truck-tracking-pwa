import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { routesHandlers } from './handlers/routes.handlers';
import { profileHandlers } from './handlers/profile.handlers';
import { notificationsHandlers } from './handlers/notifications.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...routesHandlers,
  ...profileHandlers,
  ...notificationsHandlers
);
