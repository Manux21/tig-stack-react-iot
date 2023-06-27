import React from 'react';
import styles from './instant-fuel-consumption.module.css'

const InstantFuelConsumption = ({instantFuelConsumption}) => {
  return (
    <div className={styles.fuelConsumption}>
      <div className={styles.header}>
        Fuel consumption
      </div>

      <div className={styles.numbersContainer}>
        <div className={styles.numbers}>
          {instantFuelConsumption}
        </div>
        {/*<h2>l/sec</h2>*/}
      </div>

    </div>
  );
};

export default InstantFuelConsumption;
