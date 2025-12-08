import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { ROUTE_STYLE, FIT_BOUNDS_PADDING, ROUTING_INIT_DELAY } from '../constants';

interface RoutingControlProps {
  origin: [number, number];
  destination: [number, number];
  onRouteReady?: () => void;
}

export function RoutingControl({ origin, destination, onRouteReady }: RoutingControlProps) {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const isMounted = useRef(false);
  const isInitializing = useRef(false);
  const hasFittedRef = useRef(false);
  const lastDestinationRef = useRef<string | null>(null);

  useEffect(() => {
    const destKey = destination ? `${destination[0]},${destination[1]}` : null;

    isMounted.current = true;

    if (!map || !origin || !destination) return;

    // Reset hasFitted only if destination actually changed
    if (destKey !== lastDestinationRef.current) {
      hasFittedRef.current = false;
      lastDestinationRef.current = destKey;
    }

    // Prevent double initialization
    if (isInitializing.current || routingControlRef.current) return;

    isInitializing.current = true;

    const timeoutId = setTimeout(() => {
      if (!isMounted.current) {
        isInitializing.current = false;
        return;
      }

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoutes: false,
        lineOptions: {
          styles: [ROUTE_STYLE],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        show: false,
        addWaypoints: false,
      } as L.Routing.RoutingControlOptions);

      routingControl.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
        if (!isMounted.current) return;

        if (!hasFittedRef.current && e.routes && e.routes.length > 0) {
          const coords = e.routes[0].coordinates;
          if (coords && coords.length > 0) {
            hasFittedRef.current = true;
            const bounds = L.latLngBounds(coords);
            map.fitBounds(bounds, { padding: FIT_BOUNDS_PADDING });
            onRouteReady?.();
          }
        }
      });

      if (isMounted.current) {
        routingControl.addTo(map);
        routingControlRef.current = routingControl;

        // Hide the routing container (instructions panel)
        const container = document.querySelector('.leaflet-routing-container');
        if (container) {
          (container as HTMLElement).style.display = 'none';
        }
      }
    }, ROUTING_INIT_DELAY);

    return () => {
      isMounted.current = false;
      isInitializing.current = false;
      clearTimeout(timeoutId);

      const control = routingControlRef.current;
      if (control) {
        routingControlRef.current = null;
        // Delay removal to let any pending callbacks complete
        setTimeout(() => {
          try {
            if (map && control) {
              map.removeControl(control);
            }
          } catch {
            // Ignore - map or control might be destroyed
          }
        }, 0);
      }
    };
  }, [map, origin, destination, onRouteReady]);

  return null;
}
