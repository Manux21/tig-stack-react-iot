import React from 'react';
import styles from './button.module.css'

const Button = ({isCalculating, setIsCalculating}) => {

  const handleStartCalculation = () => {
    setIsCalculating(true);
  };

  const handleStopCalculation = () => {
    setIsCalculating(false);
  };

  return (
    <div>
      {isCalculating ? <div onClick={handleStopCalculation} className={styles.button}>
        <div className={styles.text}>
          Stop
        </div>
      </div>
        : <div onClick={handleStartCalculation} className={styles.button}>
          <div className={styles.text}>
            Start
          </div>
        </div> }
    </div>
  );
};

export default Button;
