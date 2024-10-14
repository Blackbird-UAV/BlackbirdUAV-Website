import Head from "next/head";
import { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import styles from "@/styles/Vehicles.module.css";

// Sample vehicle data
const vehicles = [
  {
    id: 1,
    name: "Vehicle 1",
    description: "Description for Vehicle 1.",
    image: "/images/vehicle1.jpg", // Path to the image in public/images
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
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]); // Initialize state with the first vehicle
  const [arrowPosition, setArrowPosition] = useState(0); // State for arrow position
  const vehicleRefs = useRef([]); // Ref to store vehicle image elements
  const [isPaused, setIsPaused] = useState(false); // State to manage pause status

  useEffect(() => {
    const index = vehicles.findIndex(v => v.id === selectedVehicle.id);
    if (vehicleRefs.current[index]) {
      const rect = vehicleRefs.current[index].getBoundingClientRect();
      const textBoxRect = document.querySelector(`.${styles.textBox}`).getBoundingClientRect();
      
      // Calculate the center of the selected vehicle image
      const centerX = rect.left + rect.width / 2 - 20;
      
      // Set the arrow position relative to the text box
      setArrowPosition(centerX - textBoxRect.left); // Center the arrow above the text box
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
      intervalId = setInterval(changeVehicle, 3000); // Change vehicle every 3 seconds
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [selectedVehicle, isPaused]);

  const handleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsPaused(true); // Pause the automatic change

    // Set a timeout to resume automatic changes after 20 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 20000); // Resume after 20 seconds
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
