import { http, HttpResponse, delay } from 'msw';
import { mockDriverProfile, mockVehicle, mockTrailer } from '../data/profile.data';

export const profileHandlers = [
  http.get('/api/drivers/:id', async () => {
    await delay(300);
    return HttpResponse.json(mockDriverProfile);
  }),

  http.get('/api/vehicles/:id', async () => {
    await delay(300);
    return HttpResponse.json(mockVehicle);
  }),

  http.get('/api/trailers/vehicle/:vehicleId', async () => {
    await delay(300);
    return HttpResponse.json(mockTrailer);
  }),
];
