import { DivIcon } from 'leaflet';

/**
 * Creates a driver marker icon - pulsing dot like Google Maps
 */
export function createDriverIcon(): DivIcon {
  return new DivIcon({
    className: 'driver-marker',
    html: `
      <div style="position: relative; width: 24px; height: 24px;">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: rgba(124, 58, 237, 0.3);
          border-radius: 50%;
          animation: driver-pulse 2s ease-out infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: #7c3aed;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        "></div>
      </div>
      <style>
        @keyframes driver-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

/**
 * Creates a destination marker icon - custom pin
 */
export function createDestinationIcon(): DivIcon {
  return new DivIcon({
    className: 'destination-marker',
    html: `
      <div style="position: relative; width: 32px; height: 40px;">
        <div style="
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 4px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          filter: blur(2px);
        "></div>
        <div style="
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          background: #ef4444;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: translateX(-50%) rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        "></div>
        <div style="
          position: absolute;
          top: 7px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
}
