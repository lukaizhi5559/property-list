import React from 'react';
import styles from './PropertyList.module.css';
import { extractPropertyData, getStateAbbreviation, formatDate, calculateTotalBaths } from '../../utils';
import { Property } from '../../models';

interface Props {
  mapVisible?: boolean;
  properties: Property[];
  favorites: number[];
  selectedPropertyMlsId: number | null;
  setSelectedProperty: (property: Property | null) => void;
  onToggleFavorite: (mlsId: number, maintainPosition?: boolean) => void;
  scrollToProperty: (mlsId: number) => void;
}

const PropertyList: React.FC<Props> = (
  { properties, favorites, onToggleFavorite, selectedPropertyMlsId, setSelectedProperty, mapVisible, scrollToProperty }
) => {
  const extractedPropertyData = extractPropertyData(properties);

  const handlePropertyCardClicked = (property: Property) => {
    if (mapVisible) {
      setSelectedProperty(property);
      scrollToProperty(property.mlsId);
    }
  }

  return (
    extractedPropertyData.map((property) => (
      <div 
        key={property.mlsId} 
        id={`property-${property.mlsId}`}
        data-testid={`property-${property.mlsId}`}
        className={`${styles.property} ${selectedPropertyMlsId === property.mlsId && mapVisible ? styles.highlighted : ''}`}
        onClick={() => handlePropertyCardClicked(property)}
      >
        <div className={styles.imageContainer}>
          <img className={mapVisible ? '' : styles.imgOverride} src={property.photos[0]} alt="Property" />
          <div className={styles.details}>
            <p>
              {property.bedrooms} BR | {calculateTotalBaths(property.bathsFull, property.bathsHalf)} Bath | {property.area} Sq Ft
            </p>
            <h2>${property.listPrice.toLocaleString()}</h2>
            <p>{property.address.streetName}, {property.address.city}, {getStateAbbreviation(property.address.state)}</p>
            <p>Listed: {formatDate(property.listDate)}</p>
          </div>
          <div className={styles.favoriteButton} onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            onToggleFavorite(property.mlsId, true);
          }}>
            {favorites.includes(property.mlsId) ? (
              <img src="/heart-fill.svg" alt="Favorite" />
            ) : (
              <img src="/heart-stroke.svg" alt="Not Favorite" />
            )}
          </div>
        </div>
      </div>
    ))
  );
};

export default PropertyList;
