// src/pages/index.js
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>BlackBird UAV</title>
        <meta name="description" content="BlackBird UAV | Carleton University's UAV Design Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Our Company</h1>
          <Image
            src="/images/tempImage.png" // Path to the image
            alt="Temp Image"
            width={300} // Specify the width
            height={300} // Specify the height
            priority
          />
          <p className={styles.description}>
            We provide innovative solutions to help your business grow.
          </p>
          <div className={styles.infoBoxes}>
            <div className={styles.infoBox}>
              <h2>Our Services</h2>
              <p>Discover a range of services tailored for your needs.</p>
            </div>
            <div className={styles.infoBox}>
              <h2>Our Mission</h2>
              <p>Committed to delivering excellence and value to our clients.</p>
            </div>
            <div className={styles.infoBox}>
              <h2>Contact Us</h2>
              <p>Get in touch to see how we can assist you.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
