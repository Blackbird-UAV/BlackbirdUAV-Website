import React, { useEffect, useState } from 'react';
import styles from '@/styles/ScrollDownIndicator.module.css';

const ScrollDownIndicator = () => {
  const [visible, setVisible] = useState(true);
  let timeoutId;

  const handleScroll = () => {
    setVisible(false);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setVisible(true);
    }, 2500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    visible && (
      <div className={styles.scrollDownIndicator}>
        <span className={styles.arrow}></span>
        <span className={styles.arrow}></span>
      </div>
    )
  );
};

export default ScrollDownIndicator;