import Head from "next/head";
import styles from "@/styles/Vehicles.module.css"; // 

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
        <div className={styles.vehiclesList}>
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={`${styles.vehicle} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <img src={vehicle.image} alt={vehicle.name} className={styles.image} />
              <div className={styles.info}>
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
