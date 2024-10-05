// src/pages/about.js
import Head from "next/head";
import Navbar from "@/components/Navbar";
import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>About Us</h1>
        <p>This is the about page of our Next.js application.</p>
      </div>
    </>
  );
}
