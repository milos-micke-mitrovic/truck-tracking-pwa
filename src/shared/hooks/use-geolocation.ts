import { useState, useEffect, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export interface GeolocationState {
  coordinates: GeolocationCoordinates | null;
  error: GeolocationError | null;
  isLoading: boolean;
  timestamp: number | null;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  watchPosition?: boolean; // Alias for watch
}

interface UseGeolocationReturn extends GeolocationState {
  heading: number | null;
  speed: number | null;
  refresh: () => void;
}

const defaultOptions: UseGeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
  watch: false,
};

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const { enableHighAccuracy, timeout, watch, watchPosition } = {
    ...defaultOptions,
    ...options,
  };
  // Support both watch and watchPosition
  const shouldWatch = watch || watchPosition;

  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
    timestamp: null,
  });

  const getCurrentPosition = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check and request permissions
      const permStatus = await Geolocation.checkPermissions();

      if (permStatus.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          throw new Error('Location permission denied');
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy,
        timeout,
      });

      setState({
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude ?? null,
          altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
          heading: position.coords.heading ?? null,
          speed: position.coords.speed ?? null,
        },
        error: null,
        isLoading: false,
        timestamp: position.timestamp,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: {
          code: 1,
          message: error instanceof Error ? error.message : 'Failed to get location',
        },
        isLoading: false,
      }));
    }
  }, [enableHighAccuracy, timeout]);

  useEffect(() => {
    let watchId: string | undefined;

    const init = async () => {
      if (shouldWatch) {
        try {
          watchId = await Geolocation.watchPosition(
            { enableHighAccuracy, timeout },
            (position, err) => {
              if (err) {
                const errorMessage = err instanceof Error ? err.message : 'Location error';
                setState((prev) => ({
                  ...prev,
                  error: { code: 1, message: errorMessage },
                  isLoading: false,
                }));
                return;
              }

              if (position) {
                setState({
                  coordinates: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude ?? null,
                    altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
                    heading: position.coords.heading ?? null,
                    speed: position.coords.speed ?? null,
                  },
                  error: null,
                  isLoading: false,
                  timestamp: position.timestamp,
                });
              }
            }
          );
        } catch (error) {
          setState((prev) => ({
            ...prev,
            error: {
              code: 1,
              message: error instanceof Error ? error.message : 'Failed to watch location',
            },
            isLoading: false,
          }));
        }
      } else {
        await getCurrentPosition();
      }
    };

    void init();

    return () => {
      if (watchId) {
        void Geolocation.clearWatch({ id: watchId });
      }
    };
  }, [shouldWatch, enableHighAccuracy, timeout, getCurrentPosition]);

  const refresh = () => {
    void getCurrentPosition();
  };

  return {
    ...state,
    heading: state.coordinates?.heading ?? null,
    speed: state.coordinates?.speed ?? null,
    refresh,
  };
}
