import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Vehicles.module.css";

const vehicles = [
  {
    id: 1,
    name: "Pegasus",
    description: {
      overview: "Pegasus is a quadcopter featuring our team's most recent airframe design and software integration efforts. Pegasus stands as WARG's most advanced drone, boasting autonomous capabilities throughout its entire flight, from take-off to landing.",
      weight: "10 kg",
      flightTime: "30 min",
      propulsion: "22\" propellers",
      powerSupply: "50v (12s LiPo)",
      payload: "2 kg"
    },
    images: ["/images/vehicle1.jpg", "/images/vehicle2.jpg", "/images/vehicle3.jpg"]
  },
  {
    id: 2,
    name: "Phoenix",
    description: {
      overview: "Phoenix is designed for endurance, with advanced navigation systems and enhanced flight stability, ideal for long-range missions.",
      weight: "12 kg",
      flightTime: "45 min",
      propulsion: "24\" propellers",
      powerSupply: "60v (14s LiPo)",
      payload: "2.5 kg"
    },
    images: ["/images/vehicle2.jpg", "/images/vehicle1.jpg", "/images/vehicle3.jpg"]
  },
  {
    id: 3,
    name: "Valkyrie",
    description: {
      overview: "Valkyrie is optimized for agility and rapid response, suitable for close-range operations with minimal setup time.",
      weight: "8 kg",
      flightTime: "25 min",
      propulsion: "20\" propellers",
      powerSupply: "45v (10s LiPo)",
      payload: "1.5 kg"
    },
    images: ["/images/vehicle3.jpg", "/images/vehicle3.jpg", "/images/vehicle3.jpg"]
  },
  {
    id: 4,
    name: "Orion",
    description: {
      overview: "Orion combines power and precision, designed to handle payloads with heavy-duty requirements for complex missions.",
      weight: "15 kg",
      flightTime: "40 min",
      propulsion: "26\" propellers",
      powerSupply: "70v (16s LiPo)",
      payload: "3 kg"
    },
    images: ["/images/vehicle4.jpg", "/images/vehicle4.jpg", "/images/vehicle4.jpg"]
  },
];

export default function Vehicles() {
  const vehiclesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const isVisible = entry.isIntersecting;

        if (isVisible) {
          element.classList.add(
            styles.visible,
            element.classList.contains(styles.right) ? styles.right : styles.left
          );
          element.classList.remove(styles.out);
        } else {
          element.classList.add(
            styles.out,
            element.classList.contains(styles.right) ? styles.right : styles.left
          );
          element.classList.remove(styles.visible);
        }
      });
    }, observerOptions);

    vehiclesRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Carousel interval for cycling images
  useEffect(() => {
    const interval = setInterval(() => {
      const currentElement = vehiclesRef.current[currentIndex];
      currentElement.classList.add(styles.fadeOut);

      setTimeout(() => {
        currentElement.classList.remove(styles.fadeOut);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
      }, 500); // Match the transition duration in CSS
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

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
              className={`${styles.vehicleCard} ${index % 2 === 1 ? styles.right : styles.left}`}
              ref={(el) => (vehiclesRef.current[index] = el)}
            >
              <div className={styles.carousel}>
                <img
                  src={vehicle.images[currentIndex]}
                  alt={`${vehicle.name} image ${currentIndex + 1}`}
                  className={styles.vehicleImage}
                />
              </div>
              <div className={styles.textBox}>
                <h2 className={styles.vehicleTitle}>{vehicle.name}</h2>
                <p><strong>Overview:</strong> {vehicle.description.overview}</p>
                <ul className={styles.specsList}>
                  <li><strong>Weight:</strong> {vehicle.description.weight}</li>
                  <li><strong>Flight Time:</strong> {vehicle.description.flightTime}</li>
                  <li><strong>Propulsion:</strong> {vehicle.description.propulsion}</li>
                  <li><strong>Power Supply:</strong> {vehicle.description.powerSupply}</li>
                  <li><strong>Payload:</strong> {vehicle.description.payload}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
