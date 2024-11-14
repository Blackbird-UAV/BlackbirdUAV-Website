import React, { useState, useEffect } from 'react';
import styles from "@/styles/BackToTopButton.module.css";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    const toggleVisibility = () => {
      const footerRect = footer ? footer.getBoundingClientRect() : { top: Infinity };
      setIsVisible(window.pageYOffset > 300 && footerRect.top > window.innerHeight);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button className={styles.backToTopButton} onClick={scrollToTop}>
        <span className={styles.icon}>✈︎</span>
      </button>
    )
  );
}

export default BackToTopButton;
