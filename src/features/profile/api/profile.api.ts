import { apiClient } from '@/shared/api';
import type { DriverProfile, VehicleDetail, TrailerDetail } from '../types/profile.types';

export const profileApi = {
  getDriver(driverId: string) {
    return apiClient.get<DriverProfile>(`/drivers/${driverId}`);
  },

  getVehicle(vehicleId: string) {
    return apiClient.get<VehicleDetail>(`/vehicles/${vehicleId}`);
  },

  getTrailerByVehicle(vehicleId: string) {
    return apiClient.get<TrailerDetail>(`/trailers/vehicle/${vehicleId}`);
  },
};
