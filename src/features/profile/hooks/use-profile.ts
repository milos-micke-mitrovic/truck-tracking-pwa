import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/shared/stores';
import { profileApi } from '../api/profile.api';
import type { DriverProfile, VehicleDetail, TrailerDetail } from '../types/profile.types';

export function useProfile() {
  const user = useAuthStore((state) => state.user);
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [trailer, setTrailer] = useState<TrailerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.driverId) return;

    setIsLoading(true);
    setError(null);

    try {
      const driverData = await profileApi.getDriver(user.driverId);
      setDriver(driverData);

      if (user.vehicleId) {
        const [vehicleData, trailerData] = await Promise.allSettled([
          profileApi.getVehicle(user.vehicleId),
          profileApi.getTrailerByVehicle(user.vehicleId),
        ]);

        if (vehicleData.status === 'fulfilled') setVehicle(vehicleData.value);
        if (trailerData.status === 'fulfilled') setTrailer(trailerData.value);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load profile';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.driverId, user?.vehicleId]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  return {
    driver,
    vehicle,
    trailer,
    isLoading,
    error,
    refresh: fetchProfile,
  };
}
