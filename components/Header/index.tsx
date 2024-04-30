import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface Props {
  navButton: React.JSX.Element;
}

/**
 * Header component for the Property List app.
 * @param {Object} props - Props for the Header component.
 * @param {React.JSX.Element} props.navButton - Navigation button element.
 * @returns {React.ReactElement} The rendered Header component.
 */
const Header: React.FC<Props> = ({ navButton }) => {
  return (
    <div className={styles.header}>
      <h3>
        <Link href="/" passHref className={styles.propertyListLabel}>
          Property Listings
        </Link>
      </h3>
      {navButton}
    </div>
  );
};

export default Header;
