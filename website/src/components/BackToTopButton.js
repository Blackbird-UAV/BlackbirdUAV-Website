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

  const scrollToTop = (event) => {
    // 'auto' jumps: globals.css turns the page's smooth scrolling off when
    // the OS asks for reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth'
    })
    // The button goes away at the top of the page. Pressed from the keyboard
    // (detail 0), focus moves to the page's first stop, the skip link, as on
    // a fresh page load, instead of being dropped on <body>
    if (event.detail === 0) document.querySelector('a[href="#main"]')?.focus()
  }

  return (
    isVisible && (
      <button
        type='button'
        className={`${styles.backToTopButton} ${styles.visible}`}
        onClick={scrollToTop}
        aria-label='Back to top'
      >
        <span className={styles.icon} aria-hidden='true'>✈︎</span>
      </button>
    )
  )
}

export default BackToTopButton
