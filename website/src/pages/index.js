// src/pages/index.js
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlackBird UAV</title>
        <meta name="description" content="BlackBird UAV | Carleton University's UAV Design Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.HomeContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.textSection}>
            <h1 className={styles.name}>BLACKBIRD</h1>
            <h2 className={styles.subtitle}>Fly Around and Find Out</h2>
          </div>
          <div className={styles.buttonSection}>
            <Link href="/sponsor" className={styles.sponsorButton}>
              Sponsor Us
            </Link>
          </div>
        </div>
      </div>

      <div id="secondDiv" className={styles.aboutContainer}>
  <img src="/images/tempImage.png" alt="Blackbird UAV Logo" className={styles.aboutImage} />
  <div className={styles.aboutText}>
    <h1>About Us</h1>
    <p>
      At Blackbird UAV, we specialize in cutting-edge drone technology that empowers businesses and individuals to reach new heights. Our team of experienced engineers and pilots is dedicated to providing innovative aerial solutions across various industries, including agriculture, construction, and surveillance.
    </p>
  </div>
</div>



<div id="services" className={styles.servicesContainer}>
  <h2 className={styles.servicesTitle}>Our Services</h2>
  <div className={styles.serviceCards}>
    <div className={styles.serviceCard}>
      <img src="/images/aerial-photography.jpg" alt="Aerial Photography" className={styles.serviceImage} />
      <h3>Aerial Photography</h3>
      <p>Capture stunning visuals with our high-resolution drones for marketing and events.</p>
    </div>
    <div className={styles.serviceCard}>
      <img src="/images/surveying-mapping.jpg" alt="Surveying & Mapping" className={styles.serviceImage} />
      <h3>Surveying & Mapping</h3>
      <p>Utilize advanced mapping solutions for accurate land surveys and data collection.</p>
    </div>
    <div className={styles.serviceCard}>
      <img src="/images/inspection-services.jpg" alt="Inspection Services" className={styles.serviceImage} />
      <h3>Inspection Services</h3>
      <p>Perform thorough inspections of hard-to-reach areas, ensuring safety and efficiency.</p>
    </div>
  </div>
</div>


      <div id="gallery" className={styles.galleryContainer}>
        <h2>Gallery</h2>
        <div className={styles.imageGrid}>
          <img src="/images/gallery1.jpg" alt="Drone in Action" className={styles.galleryImage} />
          <img src="/images/gallery2.jpg" alt="Aerial View of Landscape" className={styles.galleryImage} />
          <img src="/images/gallery3.jpg" alt="Team at Work" className={styles.galleryImage} />
          <img src="/images/gallery4.jpg" alt="Drone Technology" className={styles.galleryImage} />
        </div>
      </div>
    </>
  );
}
