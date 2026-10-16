import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
import usePrefersReducedMotion, {
  REDUCED_MOTION
} from '@/components/usePrefersReducedMotion'
import { PauseIcon, PlayIcon } from '@/components/PlayPauseIcons'

const slides = [
  {
    name: 'Leviathan',
    image: '/images/Vehicles/Leviathan_2.jpg',
    alt: 'Leviathan, a quadcopter, flying in front of autumn trees',
    description:
      'Endurance-focused platform with a fully modular payload bay and a fully LTE command link, flying 30 minutes at its 15 kg maximum take-off weight.'
  },
  {
    name: 'Goliath',
    image: '/images/Vehicles/Goliath_1.jpg',
    alt: 'Goliath, a quadcopter, standing on its landing legs in front of a concrete wall',
    description:
      "Designed to autonomously detect multiple hotspots within a very large zone and to autonomously pick up water from a reservoir and dispense it on the hotspots."
  },
  {
    name: 'Apogee',
    image: '/images/Vehicles/Apogee_1.jpg',
    alt: 'Apogee, a VTOL quadplane, flying against a blue sky',
    description:
      "Blackbird UAV's drone that features autonomous capabilities from take-off to landing and a modular payload compartment."
  },
  {
    name: 'Zenith',
    image: '/images/Vehicles/Zenith_1.jpg',
    alt: 'Zenith, a white VTOL quadplane, flying below the clouds',
    description:
      'Designed for endurance with advanced navigation systems and enhanced flight stability, ideal for long-range missions.'
  }
]

// Each slide stays 3s after its 0.5s slide-in
const SLIDE_INTERVAL = 3500

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

const ChevronLeft = () => (
  <svg
    className={styles.chevron}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
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

const ChevronRight = () => (
  <svg
    className={styles.chevron}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
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

  const reduceMotion = usePrefersReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  // null until the visitor presses play/pause; until then the slides only
  // rotate on their own when the OS doesn't ask for reduced motion
  const [playChoice, setPlayChoice] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const playButtonRef = useRef(null)

  const playing = playChoice ?? !reduceMotion
  const rotating = playing && !hovering && !focusInside

  useEffect(() => {
    if (!rotating) return
    const timeout = setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % slides.length)
    }, SLIDE_INTERVAL)
    return () => clearTimeout(timeout)
  }, [rotating, currentIndex])

  const showSlide = (index) => {
    setCurrentIndex((index + slides.length) % slides.length)
  }

  // Like the WAI-ARIA carousel pattern, rotation holds while the pointer is
  // over the carousel or keyboard focus is in it, but not for the play/pause
  // button itself, so pressing play visibly resumes it. Mouse clicks focus
  // the arrows without :focus-visible, so they don't hold it once the pointer
  // has left.
  const handlePointerOver = (event) => {
    if (event.pointerType === 'touch') return
    setHovering(!playButtonRef.current.contains(event.target))
  }
  const handleFocus = (event) => {
    setFocusInside(
      !playButtonRef.current.contains(event.target) &&
        event.target.matches(':focus-visible')
    )
  }
  // A key pressed on an arrow or dot that a mouse click focused makes it
  // :focus-visible with no new focus event, so the key press holds the
  // rotation too
  const handleKeyDown = (event) => {
    if (!playButtonRef.current.contains(event.target)) setFocusInside(true)
  }
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocusInside(false)
    }
  }

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
          src='/images/leviathan-hero.webp'
          alt='Leviathan hovering between the clouds'
          className={styles.heroCraft}
          width={625}
          height={304}
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
        <h2 id='our-uavs' className={styles.galleryTitle}>Our UAVs</h2>
        <p className={styles.gallerySubtitle}>
          Discover the evolution of our UAV technology and designs over the
          years.
        </p>
        <div
          className={styles.carouselRegion}
          role='region'
          aria-roledescription='carousel'
          aria-labelledby='our-uavs'
          onPointerOver={handlePointerOver}
          onPointerLeave={() => setHovering(false)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        >
          <div className={styles.carouselWrapper}>
            <button
              ref={playButtonRef}
              type='button'
              className={styles.playButton}
              aria-label={playing ? 'Pause slide show' : 'Play slide show'}
              onClick={() => setPlayChoice(!playing)}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type='button'
              className={`${styles.control} ${styles.controlLeft}`}
              aria-label='Previous aircraft'
              onClick={() => showSlide(currentIndex - 1)}
            >
              <ChevronLeft />
            </button>
            {/* Screen readers announce the new slide only when the visitor
                changed it. The slides out of view are inert: they can't take
                focus (which scrolled the carousel to a blank slide) and
                screen readers skip them. */}
            <div className={styles.carousel}>
              <div
                className={styles.slideContainer}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                aria-live={rotating ? 'off' : 'polite'}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.name}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    role='group'
                    aria-roledescription='slide'
                    aria-label={`${index + 1} of ${slides.length}`}
                    inert={index !== currentIndex}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
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
              type='button'
              className={`${styles.control} ${styles.controlRight}`}
              aria-label='Next aircraft'
              onClick={() => showSlide(currentIndex + 1)}
            >
              <ChevronRight />
            </button>
          </div>
          <div className={styles.dots}>
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                type='button'
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                aria-label={`Show ${slide.name}`}
                aria-current={index === currentIndex ? 'true' : undefined}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
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
