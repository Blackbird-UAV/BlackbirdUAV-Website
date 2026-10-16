import Image from 'next/image'
import { motion } from 'motion/react'
import styles from '@/styles/Header.module.css'

// A page's title over a photo. The photo is the largest thing on screen when
// the page opens, so it is an <img> the browser finds in the HTML and fetches
// first, not a CSS background it only discovers once styles are applied.
const Header = ({ imagePath, headerText }) => {
  return (
    <header className={styles.header}>
      <Image
        src={imagePath}
        alt=''
        fill
        loading='eager'
        fetchPriority='high'
        className={styles.photo}
      />
      <div className={styles.overlay} />
      <motion.h1
        className={styles.text}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {headerText}
      </motion.h1>
    </header>
  )
}

export default Header
