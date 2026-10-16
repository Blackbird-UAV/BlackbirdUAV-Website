import styles from '@/styles/Header.module.css'

// Other sizes of a header photo, for the browser to choose from by screen
// width and pixel density: a phone needn't download the desktop size, and a
// 2x laptop screen or a 2560 px monitor would otherwise get a blurry one.
// Images are unoptimized in the static export, so next/image would write no
// srcset of its own (and drops one passed to it).
const SRCSETS = {
  '/images/team4.jpg':
    '/images/team4-1280.jpg 1280w, /images/team4.jpg 1920w, /images/team4-2880.jpg 2880w'
}

// A page's title over a photo. The photo is the largest thing on screen when
// the page opens, so it is an <img> the browser finds in the HTML and fetches
// first, not a CSS background it only discovers once styles are applied.
const Header = ({ imagePath, headerText }) => {
  const srcSet = SRCSETS[imagePath]

  return (
    <header className={styles.header}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagePath}
        srcSet={srcSet}
        sizes={srcSet && '100vw'}
        alt=''
        loading='eager'
        fetchPriority='high'
        decoding='async'
        className={styles.photo}
      />
      <div className={styles.overlay} />
      {/* Its entrance is in Header.module.css */}
      <h1 className={styles.text}>{headerText}</h1>
    </header>
  )
}

export default Header
