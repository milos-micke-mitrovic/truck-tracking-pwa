import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useCallback, useRef } from 'react';
import { IonFabButton, IonIcon } from '@ionic/react';
import { locateOutline, navigateOutline, closeOutline } from 'ionicons/icons';
import { cn } from '@/shared/utils';
import { useGeolocation } from '@/shared/hooks';
import { Spinner, Text } from '@/shared/ui';
import { RoutingControl } from './RoutingControl';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  CENTERED_ZOOM,
  PROGRAMMATIC_MOVE_DELAY,
  TILE_LAYER_URL,
  TILE_LAYER_ATTRIBUTION,
} from '../constants';
import { createDriverIcon, createDestinationIcon } from '../utils';
import type { Destination } from '../types';

interface MapContainerProps {
  className?: string;
  destination?: Destination;
  onClearDestination?: () => void;
}

// Component to handle follow mode - auto-centers map when position changes
function FollowModeHandler({
  lat,
  lng,
  followMode,
  onCenteredChange,
  isProgrammaticMove,
}: {
  lat: number;
  lng: number;
  followMode: boolean;
  onCenteredChange: (centered: boolean) => void;
  isProgrammaticMove: React.MutableRefObject<boolean>;
}) {
  const map = useMap();

  // Disable/enable map interactions based on follow mode
  useEffect(() => {
    if (followMode) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }
  }, [followMode, map]);

  // Auto-center when position changes in follow mode
  useEffect(() => {
    if (followMode) {
      isProgrammaticMove.current = true;
      map.setView([lat, lng], map.getZoom(), { animate: true });
      onCenteredChange(true);
      setTimeout(() => {
        isProgrammaticMove.current = false;
      }, PROGRAMMATIC_MOVE_DELAY);
    }
  }, [lat, lng, followMode, map, onCenteredChange, isProgrammaticMove]);

  return null;
}

// Component to expose map instance and track user interactions
function MapController({
  onMapReady,
  onUserInteraction,
  isProgrammaticMove,
}: {
  onMapReady: (map: L.Map) => void;
  onUserInteraction: () => void;
  isProgrammaticMove: React.MutableRefObject<boolean>;
}) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);

    // Detect user interactions (pan, zoom) - ignore programmatic changes
    const handleInteraction = () => {
      if (isProgrammaticMove.current) return;
      onUserInteraction();
    };

    const handleDragStart = () => handleInteraction();
    const handleZoomStart = () => handleInteraction();

    map.on('dragstart', handleDragStart);
    map.on('zoomstart', handleZoomStart);

    return () => {
      map.off('dragstart', handleDragStart);
      map.off('zoomstart', handleZoomStart);
    };
  }, [map, onMapReady, onUserInteraction, isProgrammaticMove]);

  return null;
}

export function MapContainer({ className, destination, onClearDestination }: MapContainerProps) {
  const { coordinates, isLoading, error } = useGeolocation({
    enableHighAccuracy: true,
    watchPosition: true,
  });
  const [followMode, setFollowMode] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const isProgrammaticMove = useRef(false);

  const center: [number, number] = coordinates
    ? [coordinates.latitude, coordinates.longitude]
    : DEFAULT_CENTER;

  const originCoords: [number, number] = coordinates
    ? [coordinates.latitude, coordinates.longitude]
    : DEFAULT_CENTER;

  // Create icons
  const driverIcon = createDriverIcon();
  const destinationIcon = createDestinationIcon();

  const handleMapReady = useCallback((map: L.Map) => {
    mapRef.current = map;
  }, []);

  const handleUserInteraction = useCallback(() => {
    setIsCentered(false);
    if (followMode) {
      setFollowMode(false);
    }
  }, [followMode]);

  const handleCenteredChange = useCallback((centered: boolean) => {
    setIsCentered(centered);
  }, []);

  const handleCenterLocation = useCallback(() => {
    if (mapRef.current && coordinates) {
      isProgrammaticMove.current = true;
      mapRef.current.setView([coordinates.latitude, coordinates.longitude], CENTERED_ZOOM, {
        animate: true,
      });
      setIsCentered(true);
      setTimeout(() => {
        isProgrammaticMove.current = false;
      }, PROGRAMMATIC_MOVE_DELAY);
    }
  }, [coordinates]);

  const handleToggleFollowMode = useCallback(() => {
    const newFollowMode = !followMode;
    setFollowMode(newFollowMode);

    if (newFollowMode && mapRef.current && coordinates) {
      isProgrammaticMove.current = true;
      mapRef.current.setView([coordinates.latitude, coordinates.longitude], CENTERED_ZOOM, {
        animate: true,
      });
      setIsCentered(true);
      setTimeout(() => {
        isProgrammaticMove.current = false;
      }, PROGRAMMATIC_MOVE_DELAY);
    }
  }, [followMode, coordinates]);

  if (isLoading) {
    return (
      <div className={cn('map-container', 'map-container--loading', className)}>
        <div className="map-container__loading">
          <Spinner size="lg" />
          <Text color="secondary">Getting your location...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('map-container', className)}>
      <LeafletMapContainer
        center={center}
        zoom={DEFAULT_ZOOM}
        className="map-container__leaflet"
        zoomControl={false}
      >
        <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
        <MapController
          onMapReady={handleMapReady}
          onUserInteraction={handleUserInteraction}
          isProgrammaticMove={isProgrammaticMove}
        />
        {coordinates && (
          <>
            <FollowModeHandler
              lat={coordinates.latitude}
              lng={coordinates.longitude}
              followMode={followMode}
              onCenteredChange={handleCenteredChange}
              isProgrammaticMove={isProgrammaticMove}
            />
            <Marker position={[coordinates.latitude, coordinates.longitude]} icon={driverIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          </>
        )}
        {!coordinates && (
          <Marker position={DEFAULT_CENTER} icon={driverIcon}>
            <Popup>Current Location (Novi Sad)</Popup>
          </Marker>
        )}
        {destination && (
          <>
            <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
              <Popup>
                <strong>{destination.customer}</strong>
                <br />
                {destination.address}
              </Popup>
            </Marker>
            <RoutingControl
              origin={originCoords}
              destination={[destination.lat, destination.lng]}
            />
          </>
        )}
      </LeafletMapContainer>

      {/* Map Controls */}
      <div className="map-controls">
        {destination && onClearDestination && (
          <IonFabButton
            size="small"
            onClick={onClearDestination}
            className="map-controls__button map-controls__button--danger"
          >
            <IonIcon icon={closeOutline} />
          </IonFabButton>
        )}
        {!followMode && (
          <IonFabButton
            size="small"
            onClick={handleCenterLocation}
            className={cn('map-controls__button', isCentered && 'map-controls__button--primary')}
          >
            <IonIcon icon={locateOutline} />
          </IonFabButton>
        )}
        <IonFabButton
          size="small"
          onClick={handleToggleFollowMode}
          className={cn('map-controls__button', followMode && 'map-controls__button--active')}
        >
          <IonIcon icon={navigateOutline} />
        </IonFabButton>
      </div>

      {error && (
        <div className="map-container__error-banner">
          <Text size="sm">{error.message}</Text>
        </div>
      )}
    </div>
  );
}
