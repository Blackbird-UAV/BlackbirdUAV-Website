import React, { useEffect, useState } from 'react';
import styles from '@/styles/ScrollDownIndicator.module.css';

const ScrollDownIndicator = () => {
  return (
     (
      <div className={styles.scrollDownIndicator}>
        <span className={styles.arrow}></span>
        <span className={styles.arrow}></span>
      </div>
    )
  );
};

export default ScrollDownIndicator;