import React, { useState, useEffect } from 'react';
import styles from './App.module.css'
import InstantFuelConsumption from "./components/instant-fuel-consumption/instant-fuel-consupmtion";
import FuelLevel from "./components/fuel-level/fuel-level";
import EngineRpm from "./components/engine-rpm/engine-rpm";
import Button from './components/button/button';

function App() {

  const [instantFuelConsumption, setInstantFuelConsumption] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalFuelConsumed, setTotalFuelConsumed] = useState(0);
  const [fuelLevel, setFuelLevel] = useState(80); // Уровень топлива в процентах
  const [isCalculating, setIsCalculating] = useState(false);
  const [engineRPM, setEngineRPM] = useState(2000); // Начальное значение оборотов двигателя

  useEffect(() => {
    const calculateInstantFuelConsumption = () => {
      // Формула для расчета мгновенного расхода топлива на основе оборотов двигателя и случайных факторов
      const baseFuelConsumption = 0.000002 * Math.pow(engineRPM, 2) + 0.01 * engineRPM + 1;
      const randomFactor = Math.random() * 0.2 + 0.9; // Случайный фактор для изменения расхода
      return baseFuelConsumption * randomFactor / 60; // Переводим в литры в секунду
    };

    const interval = setInterval(() => {
      if (isCalculating) {
        const instantFuelConsumption = calculateInstantFuelConsumption();
        setInstantFuelConsumption(instantFuelConsumption);

        const fuelConsumed = instantFuelConsumption; // Объем потребленного топлива за 1 секунду
        const distance = instantFuelConsumption * 10; // Пройденное расстояние за 1 секунду

        setTotalFuelConsumed((prev) => prev + fuelConsumed);
        setTotalDistance((prev) => prev + distance);

        // Уменьшаем уровень топлива на основе потребленного топлива
        const fuelLevelPercentage = fuelLevel - (fuelConsumed / 1000) * 100; // Переводим в проценты
        setFuelLevel(fuelLevelPercentage);

        // Проверяем, если уровень топлива достиг нуля, останавливаем подсчет
        if (fuelLevelPercentage <= 0) {
          setIsCalculating(false);
        }
      }
    }, 1000); // Задержка между итерациями

    return () => clearInterval(interval);
  }, [isCalculating, engineRPM, fuelLevel]);


  useEffect(() => {
    const sendData = (engineRPM, fuelLevel, instantFuelConsumption) => {
      fetch('http://localhost:9005/publishMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          engineRPM,
          fuelLevel,
          instantFuelConsumption,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Message published');
          } else {
            console.error('Failed to publish message');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    sendData(engineRPM, fuelLevel, instantFuelConsumption);
  }, [engineRPM, fuelLevel, instantFuelConsumption]);


  const calculateAverageFuelConsumption = () => {
    if (totalDistance === 0) {
      return 0;
    }
    return (totalFuelConsumed / totalDistance) * 100;
  };

  const averageFuelConsumption = calculateAverageFuelConsumption();


  return (
      <div className={styles.App}>
        <div className={styles.header}>Red Hot Car Emulator</div>
        <div className={styles.emulator}>
          <EngineRpm engineRPM={engineRPM} setEngineRPM={setEngineRPM}/>
          <FuelLevel fuelLevel={fuelLevel.toFixed(2)}/>

          <div className={styles.control}>
            <InstantFuelConsumption instantFuelConsumption={instantFuelConsumption.toFixed(2)}/>
            <Button isCalculating={isCalculating} setIsCalculating={setIsCalculating}/>
          </div>
        </div>

      </div>
  );
}

export default App;
