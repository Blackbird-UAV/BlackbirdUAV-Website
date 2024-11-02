import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "@/styles/Vehicles.module.css";

const vehicles = [
  {
    id: 1,
    name: "Vehicle 1",
    description: "Description for Vehicle 1.",
    image: "/images/vehicle1.jpg",
  },
  {
    id: 2,
    name: "Vehicle 2",
    description: "Description for Vehicle 2.",
    image: "/images/vehicle2.jpg",
  },
  {
    id: 3,
    name: "Vehicle 3",
    description: "Description for Vehicle 3.",
    image: "/images/vehicle3.jpg",
  },
  {
    id: 4,
    name: "Vehicle 4",
    description: "Description for Vehicle 4.",
    image: "/images/vehicle4.jpg",
  },
];

export default function Vehicles() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [arrowPosition, setArrowPosition] = useState(0);
  const vehicleRefs = useRef([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const index = vehicles.findIndex(v => v.id === selectedVehicle.id);
    if (vehicleRefs.current[index]) {
      const rect = vehicleRefs.current[index].getBoundingClientRect();
      const textBoxRect = document.querySelector(`.${styles.textBox}`).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 20;
      
      setArrowPosition(centerX - textBoxRect.left);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const changeVehicle = () => {
      const currentIndex = vehicles.findIndex(v => v.id === selectedVehicle.id);
      const nextIndex = (currentIndex + 1) % vehicles.length;
      setSelectedVehicle(vehicles[nextIndex]);
    };

    if (!isPaused) {
      intervalId = setInterval(changeVehicle, 3000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [selectedVehicle, isPaused]);

  const handleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 20000);
  };

  return (
    <>
      <Head>
        <title>Vehicles Showcase</title>
        <meta name="description" content="Showcase of vehicles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Vehicles</h1>
        <div className={styles.vehiclesGrid}>
          {vehicles.map((vehicle, index) => (
            <div key={vehicle.id} className={styles.vehicle} onClick={() => handleClick(vehicle)} ref={el => vehicleRefs.current[index] = el}>
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className={`${styles.image} ${selectedVehicle.id === vehicle.id ? '' : styles.blur}`} 
              />
            </div>
          ))}
        </div>
        <div className={styles.textBox}>
          <div className={styles.arrow} style={{ left: arrowPosition }}></div>
          <h2>{selectedVehicle.name}</h2>
          <p>{selectedVehicle.description}</p>
        </div>
      </div>
    </>
  );
}
