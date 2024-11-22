// src/pages/index.js
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import ScrollDownIndicator from '@/components/ScrollDownIndicator';
import { Carousel } from '@mantine/carousel';
import { Progress } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  const handleWindowScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
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
        <ScrollDownIndicator />
      </div>

      <div className={styles.cloudContainer}>
        <img src="/images/cloud.png" alt="Cloud Left" className={styles.cloudLeft} style={{ transform: `translateX(-${scrollY * 0.9}px)` }} />
        <img src="/images/cloud2.png" alt="Cloud Right" className={styles.cloudRight} style={{ transform: `translateX(${scrollY * 0.9}px)` }} />
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

      <div className={styles.galleryContainer}>
        <h2 className={styles.galleryTitle}>Our UAVs</h2>
        <Carousel
          slideSize="60%"
          height={300}
          slideGap="md"
          controlsOffset="md"
          loop
          withIndicators
          getEmblaApi={setEmbla}
          styles={{
            indicator: {
              width: 10,
              height: 10,
              background: 'gray',
              '&[data-active]': {
                background: 'blue',
              },
            },
          }}
        >
          <Carousel.Slide>
            <div className={styles.carouselSlide}>
              <img src="/images/vehicle1.jpg" alt="Pegasus" className={styles.uavImage} />
              <h3 className={styles.uavName}>Pegasus</h3>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className={styles.carouselSlide}>
              <img src="/images/vehicle2.jpg" alt="Phoenix" className={styles.uavImage} />
              <h3 className={styles.uavName}>Phoenix</h3>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className={styles.carouselSlide}>
              <img src="/images/vehicle3.jpg" alt="Valkyrie" className={styles.uavImage} />
              <h3 className={styles.uavName}>Valkyrie</h3>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className={styles.carouselSlide}>
              <img src="/images/vehicle4.jpg" alt="Orion" className={styles.uavImage} />
              <h3 className={styles.uavName}>Orion</h3>
            </div>
          </Carousel.Slide>
        </Carousel>
        <Progress value={scrollProgress} size="sm" mt="xl" mx="auto" className={styles.progressBar} />
      </div>
    </div>
  );
}