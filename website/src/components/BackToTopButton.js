import React, { useState, useEffect } from 'react'
import styles from '@/styles/BackToTopButton.module.css'

function BackToTopButton () {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility() // Trigger visibility on initial page load

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    isVisible && (
      <button
        className={`${styles.backToTopButton} ${
          isVisible ? styles.visible : styles.hidden
        }`}
        onClick={scrollToTop}
      >
        <span className={styles.icon}>✈︎</span>
      </button>
    )
  )
}

export default BackToTopButton
