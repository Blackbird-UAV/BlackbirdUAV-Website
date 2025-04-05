import React from 'react'
import styles from '@/styles/ScrollDownIndicator.module.css'

const ScrollDownIndicator = () => {
  return (
    <div className={styles.scrollDownIndicator}>
      <span className={styles.arrow} />
      <span className={styles.arrow} />
    </div>
  )
}

export default ScrollDownIndicator
