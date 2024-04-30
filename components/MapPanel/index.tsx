import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { formatPrice, calculateTotalBaths, getStateAbbreviation, formatDate, extractPropertyData } from '../../utils';
import { Property } from '../../models';

import styles from './MapPanel.module.css';

interface CustomMapMouseEvent {
  latLng: {
    lat: () => number;
    lng: () => number;
  } | null;
}

interface Props {
  properties: Property[];
  favorites: number[]; 
  onToggleFavorite: (mlsId: number, maintainPosition?: boolean) => void;  
  onPropertyUpdate: (mlsId: number[]) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  scrollToProperty: (mlsId: number) => void;
}

/**
 * MapPanel component for displaying a map with property markers.
 * @param {Object} props - Props for the MapPanel component.
 * @param {Property[]} props.properties - Array of property objects.
 * @param {number[]} props.favorites - Array of favorite property IDs.
 * @param {Function} props.onToggleFavorite - Function to toggle favorite status of a property.
 * @param {Function} props.onPropertyUpdate - Function to update properties based on map bounds.
 * @param {Property|null} props.selectedProperty - Selected property object.
 * @param {Function} props.setSelectedProperty - Function to set selected property.
 * @param {Function} props.scrollToProperty - Function to scroll to a property.
 * @returns {React.ReactElement|null} The rendered MapPanel component or null if Google Maps API is not loaded.
 */
const MapPanel: React.FC<Props> = (
  { properties, favorites, onToggleFavorite, onPropertyUpdate, selectedProperty, setSelectedProperty, scrollToProperty }
) => {
  // Correctly type the ref to be a GoogleMap object
  const mapRef = useRef<any>(null);
  const extractedPropertyData = extractPropertyData(properties);

  // Define options for InfoWindow
  const infoWindowOptions = useMemo(() => ({
    disableAutoPan: true, // Prevents the map from panning when InfoWindow opens.
    closeBoxURL: null,      // Hides the default close button.
  }), []);

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const defaultCenter = {
    lat: properties.length > 0 ? properties[0].geo.lat : -34.397,
    lng: properties.length > 0 ? properties[0].geo.lng : 150.644
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCqxqAPlybcdfWGj5SX5kIDG7CmLtPiR58",
  });

  const handleMarkerClicked = (e: CustomMapMouseEvent, property: Property) => {
    setSelectedProperty(property);
  };

  const customMarkerIcon = useCallback(() => {
    if (typeof window !== 'undefined' && typeof window.google !== 'undefined') {
      return {
        url: '/custom-marker.svg',
        scaledSize: new window.google.maps.Size(70, 70),
        anchor: new window.google.maps.Point(25, 50),
      };
    } else {
      return '';
    }
  }, [properties]);

  const handleBoundsChanged = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const visibleMlsIds = extractedPropertyData
      .filter(property =>
        property.geo.lat <= ne.lat() &&
        property.geo.lat >= sw.lat() &&
        property.geo.lng <= ne.lng() &&
        property.geo.lng >= sw.lng()
      )
      .map(property => property.mlsId);

    onPropertyUpdate(visibleMlsIds);
  }, [extractedPropertyData]);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, mlsId: number) => {
    e.stopPropagation(); 
    onToggleFavorite(mlsId, true);
  };

  useEffect(() => {
    const property = selectedProperty as Property;

    if (mapRef?.current && property) {
      mapRef.current.panTo({ lat: property.geo.lat, lng: property.geo.lng });
      scrollToProperty(property.mlsId);
    }
  }, [selectedProperty, favorites])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onLoad={map => {
        mapRef.current = map;
      }}
      onZoomChanged={handleBoundsChanged} 
      onDrag={handleBoundsChanged}
      ref={mapRef}
    >
      {extractedPropertyData.map((property) => (
        <Marker        
          key={property.mlsId}
          position={{ lat: property.geo.lat, lng: property.geo.lng }}
          onClick={(e) => handleMarkerClicked(e, property)}
          icon={customMarkerIcon()}
          label={{
            text: formatPrice(property.listPrice),
            color: '#ffffff',
          }}          
        >
          {selectedProperty?.mlsId === property.mlsId && (
            <InfoWindow options={infoWindowOptions}>
              <div className={styles.property}>
                <img className={styles.photoImg} src={property.photos[0]} alt="Property" />
                <div className={styles.details}>
                  <p>
                    {property.bedrooms} BR | {calculateTotalBaths(property.bathsFull, property.bathsHalf)} Bath | {property.area} Sq Ft
                  </p>
                  <h2>${property.listPrice.toLocaleString()}</h2>
                  <p>{property.address.streetName}</p>
                  <p>{property.address.city}, {getStateAbbreviation(property.address.state)}</p>
                  <p>Listed: {formatDate(property.listDate)}</p>
                  <div className={styles.favoriteButton} onClick={(e) => handleFavoriteClick(e, property.mlsId)}>
                    {favorites.includes(property.mlsId) ? (
                      <img src="/heart-fill.svg" alt="Favorite" />
                    ) : (
                      <img src="/heart-stroke.svg" alt="Not Favorite" />
                    )}
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : null;
};

export default MapPanel;

