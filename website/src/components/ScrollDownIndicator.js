import styles from '@/styles/ScrollDownIndicator.module.css'

// Decorative: the page scrolls on its own, so screen readers skip it
const ScrollDownIndicator = () => {
  return (
    <div className={styles.scrollDownIndicator} aria-hidden='true'>
      <span className={styles.arrow} />
      <span className={styles.arrow} />
    </div>
  )
}

export default ScrollDownIndicator
