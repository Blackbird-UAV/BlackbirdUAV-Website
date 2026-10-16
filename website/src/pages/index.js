import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import PageMeta from '@/components/PageMeta'
import ScrollDownIndicator from '@/components/ScrollDownIndicator'

import Accordion from '@/components/Accordion'
import { motion } from 'motion/react'
import {
  fadeInUpDelayed,
  slideFromLeftDelayed,
  slideFromLeft,
  slideFromRight
} from '@/components/animations'

import SponsorGrid from '@/components/sponsorGrid'
import faqData from '@/data/faqData'

const slides = [
  {
    name: 'Leviathan',
    image: '/images/Vehicles/Leviathan_2.jpg',
    description:
      'Endurance-focused platform with a fully modular payload bay and a fully LTE command link, flying 30 minutes at its 15 kg maximum take-off weight.'
  },
  {
    name: 'Goliath',
    image: '/images/Vehicles/Goliath_1.jpg',
    description:
      "Designed to autonomously detect multiple hotspots within a very large zone and to autonomously pick up water from a reservoir and dispense it on the hotspots."
  },
  {
    name: 'Apogee',
    image: '/images/Vehicles/Apogee_1.jpg',
    description:
      "Blackbird UAV's drone that features autonomous capabilities from take-off to landing and a modular payload compartment."
  },
  {
    name: 'Zenith',
    image: '/images/Vehicles/Zenith_1.jpg',
    description:
      'Designed for endurance with advanced navigation systems and enhanced flight stability, ideal for long-range missions.'
  }
]

const cloudLeftVariants = {
  hidden: { x: '-100%', opacity: 0.1 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' }
  }
}

const cloudRightVariants = {
  hidden: { x: '100%', opacity: 0.1 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' }
  }
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

const ChevronLeft = (props) => (
  <svg
    className={styles.chevron}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M15 6L9 12L15 18'
      stroke='#fff'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ChevronRight = (props) => (
  <svg
    className={styles.chevron}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M9 6L15 12L9 18'
      stroke='#fff'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default function Home () {
  const cloudLeftRef = useRef(null)
  const cloudRightRef = useRef(null)

  // The clouds part as the page scrolls. Their transforms are written
  // straight to the DOM, so scrolling doesn't re-render the page, and
  // browsers fire scroll events at most once a frame. With reduced motion
  // they stay put.
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION)
    const update = () => {
      const offset = query.matches ? 0 : window.scrollY * 0.4
      cloudLeftRef.current.style.transform = `translateX(${-offset}px)`
      cloudRightRef.current.style.transform = `translateX(${offset}px)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    query.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      query.removeEventListener('change', update)
    }
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }, [isTransitioning])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    )
  }, [isTransitioning])

  const handleDotClick = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    const transitionEndHandler = () => setIsTransitioning(false)
    const slideContainer = document.querySelector(`.${styles.slideContainer}`)
    slideContainer.addEventListener('transitionend', transitionEndHandler)
    return () => {
      slideContainer.removeEventListener('transitionend', transitionEndHandler)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <div className={styles.pageWrapper}>
      <PageMeta
        title='Blackbird UAV'
        description="Blackbird UAV is Carleton University's student UAV design team in Ottawa. We design, build and fly drones for the national AEAC Student Competition."
        path='/'
      />

      <div className={styles.HomeContainer}>
        <Image
          src='/images/goliath-hero.png'
          alt='Goliath in flight'
          className={styles.skyGoliath}
          width={460}
          height={289}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.textSection}>
            <motion.h1
              className={styles.name}
              variants={slideFromLeftDelayed}
              initial='initial'
              animate='animate'
            >
              BLACKBIRD UAV
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              variants={fadeInUpDelayed}
              initial='initial'
              animate='animate'
            >
              Fly Around and Find Out
            </motion.p>
          </div>
          {/* Beside the wordmark on desktop, under the subtitle from 1050px
              down (Home.module.css) */}
          <motion.div
            className={styles.buttonSection}
            variants={fadeInUpDelayed}
            initial='initial'
            animate='animate'
          >
            <Link href='/sponsor#donate' className={styles.donateButton}>
              Donate
            </Link>
            <Link href='/sponsor' className={styles.sponsorButton}>
              Sponsor Us
            </Link>
          </motion.div>
        </div>
        <ScrollDownIndicator />
      </div>

      <div className={styles.wavesHome}>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className={styles.wavesHomeFill}
          />
        </svg>
      </div>

      <div id='firstDiv' className={styles.cloudContainer}>
        <Image
          src='/images/leviathan-hero.png'
          alt='Leviathan hovering between the clouds'
          className={styles.heroCraft}
          width={537}
          height={319}
          priority
        />
        <motion.div
          className={styles.cloudLayer}
          initial='hidden'
          animate='visible'
          variants={cloudLeftVariants}
        >
          <Image
            ref={cloudLeftRef}
            src='/images/cloud.webp'
            alt=''
            className={styles.cloudLeft}
            width={1440}
            height={827}
          />
        </motion.div>
        <motion.div
          className={styles.cloudLayer}
          initial='hidden'
          animate='visible'
          variants={cloudRightVariants}
        >
          <Image
            ref={cloudRightRef}
            src='/images/cloud.webp'
            alt=''
            className={styles.cloudRight}
            width={1440}
            height={827}
          />
        </motion.div>
      </div>

      <div className={styles.backgroundContainer}>
        <div id='secondDiv' className={styles.aboutContainer}>
          <motion.div
            variants={slideFromLeft}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src='/images/Home_AboutUs.jpg'
              alt='Four Blackbird UAV members preparing a drone on a test stand at the airfield'
              className={styles.aboutImage}
              width={500}
              height={300}
            />
          </motion.div>
          <motion.div
            className={styles.aboutText}
            variants={slideFromRight}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>About Us</h2>
            <p>
              Blackbird UAV (BBUAV) is a student organization participating annually in a national drone design competition. The club aims to design, build and operate aircrafts while providing students with a practical hands-on experience in the design, manufacturing, and software integration components of such an undertaking.
            </p>
            <p>
              BBUAV was established in 2009 as an extra-curricular program for
              this competition but evolved to offer experience for students
              from varied studies and background in real-world design
              projects, operations, administration, and teamwork.
            </p>
          </motion.div>
        </div>

        <div id='aeacContainer' className={styles.aeacContainer}>
          <motion.div
            className={styles.aboutText}
            variants={slideFromLeft}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>AEAC SC</h2>
            <p>
              The Aerial Evolution Association of Canada Student Competition
              (AEAC SC) is a national event that challenges university and
              college students to design, build, and operate uncrewed aerial
              systems (UAS) for real-world applications.
            </p>
            <p>
              The competition provides students with hands-on experience in
              aerospace engineering, avionics, and mission planning, while
              promoting innovation in the UAV industry.
            </p>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <a href='https://www.aerialevolution.ca/annual-student-competition/'>
              <Image
                src='/images/AEACSC_logo.jpg'
                alt='Aerial Evolution Association of Canada Student Competition'
                className={styles.aboutImage}
                width={500}
                height={300}
              />
            </a>
          </motion.div>
        </div>
      </div>

      <div className={styles.galleryContainer}>
        <h2 className={styles.galleryTitle}>Our UAVs</h2>
        <p className={styles.gallerySubtitle}>
          Discover the evolution of our UAV technology and designs over the
          years.
        </p>
        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.control} ${styles.controlLeft}`}
            onClick={handlePrev}
          >
            <ChevronLeft />
          </button>
          <div className={styles.carousel}>
            <div
              className={styles.slideContainer}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${styles.slide} ${index === currentIndex ? styles.active : ''
                    }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    width={500}
                    height={300}
                    className={styles.uavImage}
                  />
                  <div className={styles.gradientOverlay}>
                    <Link href='/vehicles'>
                      <h3 className={styles.uavName}>{slide.name}</h3>
                    </Link>
                    <p className={styles.uavDescription}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className={`${styles.control} ${styles.controlRight}`}
            onClick={handleNext}
          >
            <ChevronRight />
          </button>
        </div>
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''
                }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      <div id='backgroundSection' className={styles.backgroundSection}>
        <div id='sponsorSection' className={styles.sponsorSection}>
          <h2>Sponsors</h2>
          <SponsorGrid />
        </div>
        <div id='faqSection' className={styles.faqSection}>
          <h2>FAQ</h2>
          <Accordion data={faqData} />
        </div>
      </div>
    </div>
  )
}
