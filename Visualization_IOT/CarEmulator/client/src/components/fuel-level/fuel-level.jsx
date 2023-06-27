import React from 'react';
import styles from './fuel-level.module.css';

const FuelLevel = ({ fuelLevel }) => {
  const fillHeight = fuelLevel * 3.25;

  return (
    <div className={styles.fuelLevel}>
      <div className={styles.header}>Fuel</div>
      <div className={styles.fuelContainer}>
        <div className={styles.fuelFill} style={{ height: fillHeight }}>
          <div className={styles.fuelNumberContainer}>
            <div className={styles.fuelNumber}>{Math.round(fuelLevel)}%</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FuelLevel;
