import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import ThreeScene from "@/components/ThreeScene";
import { motion } from "framer-motion";
import { fadeInUp, fadeInUpSlower } from "@/components/animations";

const slides = [
  {
    name: "Apogee",
    image: "/images/Vehicles/Apogee_1.jpg",
    description: "BlackBird UAV's most advanced drone, featuring autonomous capabilities from take-off to landing and a modular payload compartment.",
  },
  {
    name: "Zenith",
    image: "/images/Vehicles/Zenith_1.jpg",
    description: "Designed for endurance with advanced navigation systems and enhanced flight stability, ideal for long-range missions.",
  },
];

const ChevronLeft = (props) => (
  <svg
    className={styles.chevron}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 6L9 12L15 18"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = (props) => (
  <svg
    className={styles.chevron}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = useCallback(() => {
    const progress = Math.max(
      0,
      Math.min(1, window.scrollY / document.body.scrollHeight)
    );
    setScrollProgress(progress * 100);
  }, []);

  const handleWindowScroll = () => {
    setScrollY(window.scrollY);
  };

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [isTransitioning]);

  const handleDotClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const transitionEndHandler = () => setIsTransitioning(false);
    const slideContainer = document.querySelector(`.${styles.slideContainer}`);
    slideContainer.addEventListener("transitionend", transitionEndHandler);
    return () => {
      slideContainer.removeEventListener("transitionend", transitionEndHandler);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={styles.pageWrapper}>
        <Head>
          <title>BlackBird UAV</title>
          <meta
            name="description"
            content="BlackBird UAV | Carleton University's UAV Design Team"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <ThreeScene />
        <div className={styles.HomeContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.textSection}>
              <motion.h1
                className={styles.name}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                BLACKBIRD UAV
              </motion.h1>
              <motion.h2
                className={styles.subtitle}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                Fly Around and Find Out
              </motion.h2>
              {isMobile && (
                <div className={styles.mobileButtonSection}>
                  <Link href="/sponsor" className={styles.sponsorButton}>
                    Sponsor Us
                  </Link>
                </div>
              )}
            </div>
            {!isMobile && (
              <div className={styles.buttonSection}>
                <Link href="/sponsor" className={styles.sponsorButton}>
                  Sponsor Us
                </Link>
              </div>
            )}
          </div>
          <ScrollDownIndicator />
        </div>

        <motion.div
          id="firstDiv"
          className={styles.cloudContainer}
          variants={fadeInUpSlower}
          initial="initial"
          animate="animate"
        >
          <Image
            src="/images/cloud.png"
            alt="Cloud Left"
            className={styles.cloudLeft}
            style={{ transform: `translateX(-${scrollY * 0.4}px)` }}
            width={500} // Provide the width
            height={300} // Provide the height
          />
          <Image
            src="/images/cloud2.png"
            alt="Cloud Right"
            className={styles.cloudRight}
            style={{ transform: `translateX(${scrollY * 0.4}px)` }}
            width={500} // Provide the width
            height={300} // Provide the height
          />
        </motion.div>

        <div id="secondDiv" className={styles.aboutContainer}>
          <Image
            src="/images/Home_AboutUs.jpg"
            alt="Blackbird UAV Logo"
            className={styles.aboutImage}
            width={500} // Provide the width
            height={300} // Provide the height
          />
          <div className={styles.aboutText}>
            <h1 className={styles.aboutUsText}>About Us</h1>
            <p>
            We are Blackbird UAV (BBUAV), a group of Carleton University students working to create uncrewed aerial vehicles (UAVs) to compete at the Aerial Evolution Association of Canada Student Competition (AEAC SC)
            </p>
            <p>
            BBUAV was established in 2009 as an extra-curricular
            program for this competition but evolved to offer experience for students from varied studies and background in real-world design projects, operations, administration, and teamwork.


            </p>
          </div>
        </div>

        <div className={styles.galleryContainer}>
          <h2 className={styles.galleryTitle}>Our UAVs</h2>
          <div className={styles.carouselWrapper}>
            <button
              className={`${styles.control} ${styles.controlLeft}`}
              onClick={handlePrev}
            >
              <ChevronLeft />
            </button>
            <div className={styles.carousel}>
              <div
                className={styles.slideContainer}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: `transform 0.5s ease-in-out`,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`${styles.slide} ${
                      index === currentIndex ? styles.active : ""
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      width={500} // Provide the width
                      height={300} // Provide the height
                      className={styles.uavImage}
                    />
                    <div className={styles.gradientOverlay}>
                      <h3 className={styles.uavName}>{slide.name}</h3>
                      <p className={styles.uavDescription}>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`${styles.control} ${styles.controlRight}`}
              onClick={handleNext}
            >
              <ChevronRight />
            </button>
          </div>
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
