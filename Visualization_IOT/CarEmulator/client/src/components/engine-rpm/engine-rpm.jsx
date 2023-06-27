import React from 'react';
import styles from './engine-rpm.module.css'

const EngineRPM = ({engineRPM, setEngineRPM}) => {

  const handleEngineRPMChange = (event) => {
    setEngineRPM(Number(event.target.value));
  };

  return (
    <div className={styles.engineRPM}>
      <div className={styles.header}>
        RPM
      </div>

      <div className={styles.numbers}>
        {engineRPM}

        <input
          type="range"
          min="700"
          max="10000"
          step="100"
          value={engineRPM}
          onChange={handleEngineRPMChange}
        />
      </div>

    </div>
  );
};

export default EngineRPM;
