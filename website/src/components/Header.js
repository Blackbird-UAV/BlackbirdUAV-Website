import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";
import styles from "@/styles/Header.module.css";

const Header = ({ imagePath, headerText, initialOffset, className }) => {
  const headerRef = useRef(null);
  const parallaxAmplitude = 0.5;

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offset = window.scrollY;
        const windowWidth = window.innerWidth;
        let adjustedOffset = initialOffset;

        // Responsive offset adjustments
        if (windowWidth <= 480) {
          adjustedOffset = -40;
        } else if (windowWidth <= 768) {
          adjustedOffset = 0;
        } else {
          adjustedOffset = 40;
        }

        headerRef.current.style.backgroundPositionY = `${
          -adjustedOffset + offset * parallaxAmplitude
        }px`;
        headerRef.current.style.backgroundPositionX = "center";
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [parallaxAmplitude, initialOffset]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${className || ""}`}
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className={styles.overlay}></div>
      <motion.h1
        className={`${styles.text} ${styles.headerText}`} // Ensure correct class name
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {headerText}
      </motion.h1>
    </header>
  );
};

Header.propTypes = {
  imagePath: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  initialOffset: PropTypes.number,
};

Header.defaultProps = {
  initialOffset: 0,
};

export default Header;
