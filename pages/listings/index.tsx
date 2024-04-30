import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MapPanel from '../../components/MapPanel';
import PropertyList from '../../components/PropertyList';
import Header from '../../components/Header';
import { fetchProperties } from '../../services/fetchProperties';
import styles from './listings.module.css'; // Import CSS module for styling
import { Property } from '../../models';
import { debounce } from 'utils';

const Listings: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mapVisible, setMapVisible] = useState(true); // New state to control map visibility
  const [properties, setProperties] = useState([]);
  const [propertiesInView, setPropertiesInView] = useState([]); // New state to hold properties within viewable area
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const toggleView = () => {
    setViewMode((prevMode) => (prevMode === 'map' ? 'list' : 'map'));
    setSelectedProperty(null);
  };

  // Callback to update propertiesInView based on viewable area
  const onPropertyUpdate = debounce((mlsIds: number[], _properties = []) => {
    if (mlsIds?.length) {
      const propertiesInView = properties.filter((property: { mlsId: number }) => mlsIds.includes(property.mlsId));
      setPropertiesInView(propertiesInView)
    } else {
      setPropertiesInView(_properties);
    }
  }, 300);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
    onPropertyUpdate([], properties);
    setSelectedProperty(null);
  };

  const scrollToProperty = useCallback((mlsId?: number) => {
    const propertyElement = document.getElementById(`property-${mlsId}`);
    if (propertyElement) {
      const container = document.getElementById('propertyListWrapper')
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = propertyElement.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top - (containerRect.height - elementRect.height) / 2;
        container.scrollTo({
          top: offset + container.scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handleToggleFavorite = (mlsId: number, maintainPosition?: boolean) => {
    const index = favorites.indexOf(mlsId);
    let newFavorites;
    if (index === -1) {
      newFavorites = [...favorites, mlsId];
    } else {
      newFavorites = [...favorites];
      newFavorites.splice(index, 1);
    }

    // Update favorites state
    setFavorites(newFavorites);

    // Store favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const memoizedMapPanel = useMemo(() => (
    <MapPanel 
      key="map" 
      properties={properties} 
      onPropertyUpdate={onPropertyUpdate} 
      favorites={favorites} 
      onToggleFavorite={handleToggleFavorite} 
      selectedProperty={selectedProperty}
      setSelectedProperty={setSelectedProperty}
      scrollToProperty={scrollToProperty}
    />
  ), [properties, favorites, selectedProperty, setSelectedProperty]);


  const fetchData = async () => {
    try {
      const data = await fetchProperties();
      if (data) {
        setProperties(data);
        setPropertiesInView(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from SimplyRETS API on component mount
    fetchData();
    // Retrieve favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <Header navButton={
        <div className={styles.mapToggleButton} onClick={toggleMapVisibility} data-testid={`map-toggle-button`}>
          { mapVisible ? <>&#9664;</> : <>&#9654;</> }
        </div>
      } />
      <div className={styles.container}>
        <div className={styles.toggleButton}>
          <button onClick={toggleView}>
            {viewMode === 'map' ? 'List View' : 'Map View'}
          </button>
        </div>
        <div className={styles.mobileView}>
          {viewMode === 'map' 
            ? <div className={styles.mapPanel}>
                {memoizedMapPanel}
              </div>
            : <div className={styles.propertyListWrapper}>
                <PropertyList 
                  properties={propertiesInView} 
                  favorites={favorites} 
                  onToggleFavorite={handleToggleFavorite} 
                  selectedPropertyMlsId={selectedProperty ? selectedProperty.mlsId : null}
                  setSelectedProperty={setSelectedProperty}
                  scrollToProperty={scrollToProperty}
                />
              </div>
          }
        </div>        
        <div className={styles.webView}>
          {mapVisible && (
            <div className={styles.mapPanel} data-testid={`map-panel`}>
              {memoizedMapPanel}
            </div>
          )}
          <div id='propertyListWrapper' className={`${styles.propertyListWrapper} ${!mapVisible && styles.fullWidth}`} data-testid={`property-list`}>
            <PropertyList 
              mapVisible={mapVisible}
              properties={propertiesInView}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite} 
              selectedPropertyMlsId={selectedProperty ? selectedProperty.mlsId : null}
              setSelectedProperty={setSelectedProperty}
              scrollToProperty={scrollToProperty}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
