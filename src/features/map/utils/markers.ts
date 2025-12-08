import { DivIcon } from 'leaflet';

/**
 * Creates a driver marker icon - pulsing dot like Google Maps
 */
export function createDriverIcon(): DivIcon {
  return new DivIcon({
    className: 'driver-marker',
    html: `
      <div class="driver-marker__wrapper">
        <div class="driver-marker__pulse"></div>
        <div class="driver-marker__dot"></div>
      </div>
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
      <div class="destination-marker__wrapper">
        <div class="destination-marker__pin"></div>
        <div class="destination-marker__shadow"></div>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });
}
