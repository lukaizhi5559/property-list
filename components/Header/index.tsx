import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface Props {
  navButton: React.JSX.Element;
}

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
