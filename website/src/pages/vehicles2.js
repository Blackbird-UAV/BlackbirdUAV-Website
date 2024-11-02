import Head from "next/head";
import { useEffect, useRef } from "react";
import styles from "@/styles/VehiclesDraft.module.css";

const vehicles = [
  { id: 1, name: "Vehicle 1", description: "Description for Vehicle 1.", image: "/images/vehicle1.jpg" },
  { id: 2, name: "Vehicle 2", description: "Description for Vehicle 2.", image: "/images/vehicle2.jpg" },
  { id: 3, name: "Vehicle 3", description: "Description for Vehicle 3.", image: "/images/vehicle3.jpg" },
  { id: 4, name: "Vehicle 4", description: "Description for Vehicle 4.", image: "/images/vehicle4.jpg" },
];

export default function Vehicles() {
  const vehiclesRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.classList.contains(styles.right)) {
            element.classList.add(`${styles.visible}`, `${styles.right}`);
          } else {
            element.classList.add(`${styles.visible}`, `${styles.left}`);
          }
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    vehiclesRef.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Our Aircraft</title>
        <meta name="description" content="Showcase of aircraft" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Aircraft</h1>
        <div className={styles.vehiclesList}>
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={`${styles.vehicleCard} ${index % 2 === 1 ? styles.right : ""}`}
              ref={el => vehiclesRef.current[index] = el}
            >
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className={styles.circleImage} 
              />
              <div className={styles.textBox}>
                <h2>{vehicle.name}</h2>
                <p>{vehicle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
