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
  const hasFittedRef = useRef(false);
  const originRef = useRef(origin);
  const onRouteReadyRef = useRef(onRouteReady);

  // Keep refs updated
  originRef.current = origin;
  onRouteReadyRef.current = onRouteReady;

  // Create stable destination key
  const destKey = `${destination[0]},${destination[1]}`;

  // Initialize routing control when destination changes
  useEffect(() => {
    isMounted.current = true;
    hasFittedRef.current = false;

    if (!map || !destination) return;

    const timeoutId = setTimeout(() => {
      if (!isMounted.current) return;

      // Clean up existing control
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch {
          // Ignore
        }
        routingControlRef.current = null;
      }

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(originRef.current[0], originRef.current[1]),
          L.latLng(destination[0], destination[1]),
        ],
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
            onRouteReadyRef.current?.();
          }
        }
      });

      if (isMounted.current) {
        routingControl.addTo(map);
        routingControlRef.current = routingControl;

        // Hide the routing container
        const container = document.querySelector('.leaflet-routing-container');
        if (container) {
          (container as HTMLElement).style.display = 'none';
        }
      }
    }, ROUTING_INIT_DELAY);

    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);

      const control = routingControlRef.current;
      if (control) {
        routingControlRef.current = null;
        setTimeout(() => {
          try {
            if (map && control) {
              map.removeControl(control);
            }
          } catch {
            // Ignore
          }
        }, 0);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, destKey]);

  return null;
}
