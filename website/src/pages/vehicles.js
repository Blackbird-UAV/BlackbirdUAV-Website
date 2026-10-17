import Image from 'next/image'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Vehicles.module.css'
import Header from '@/components/Header'
import PageMeta from '@/components/PageMeta'
import { fadeInUpSlower } from '@/components/animations'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'
import { PauseIcon, PlayIcon } from '@/components/PlayPauseIcons'

const vehicles = [
  {
    id: 0,
    name: 'Leviathan',
    description: {
      overview:
        'Leviathan is built around a fully modular payload bay and an all-LTE command link, flying 30 minutes at its 15 kg maximum take-off weight.',
      MTOW: '15 kg',
      flightTime: '30 min',
      payloadCompartment: 'Modular',
      communication: 'Fully LTE',
      platform: 'Bespoke Platform'
    },
    photos: [
      {
        src: '/images/Vehicles/Leviathan_1.jpg',
        alt: 'Leviathan standing in a grassy field, its payload bay slung below the frame'
      },
      {
        src: '/images/Vehicles/Leviathan_2.jpg',
        alt: 'Leviathan hovering in front of autumn trees'
      },
      {
        src: '/images/Vehicles/Leviathan_3.jpg',
        alt: 'Leviathan flying against an overcast sky'
      },
      {
        src: '/images/Vehicles/Leviathan_4.jpg',
        alt: 'Leviathan seen from below against a clear blue sky'
      }
    ]
  },
  {
    id: 1,
    name: 'Goliath',
    description: {
      overview:
        'Goliath was built in a quadcopter configuration with a fully modular payload. It also included First Person View cameras to give better precision for the pilots.',
      MTOW: '15 kg',
      maxSpeed: '45 km/h (24.3 kt)',
      payloadCompartment: 'Modular',
      communication: 'Fully LTE',
      platform: 'Bespoke Platform'
    },
    photos: [
      {
        src: '/images/Vehicles/Goliath_1.jpg',
        alt: 'Goliath, a black quadcopter, standing on a concrete floor'
      },
      {
        src: '/images/Vehicles/Goliath_2.jpg',
        alt: 'Goliath hovering against a grey sky'
      },
      {
        src: '/images/Vehicles/Goliath_3.jpg',
        alt: 'Goliath hovering over a field with a tube hanging below it'
      }
    ]
  },
  {
    id: 2,
    name: 'Apogee',
    description: {
      overview:
        "Apogee is a VTOL quadplane featuring our team's airframe design and software integration efforts. Apogee boasts autonomous capabilities throughout its entire flight, from take-off to landing.",
      wingspan: '2.5 meters',
      MTOW: '15 kg',
      maxSpeed: '156 km/h (84.2 kt)',
      payloadCompartment: 'Modular',
      communication: 'Fully LTE',
      platform: 'Bespoke Platform'
    },
    photos: [
      {
        src: '/images/Vehicles/Apogee_1.jpg',
        alt: 'Apogee flying against a blue sky, seen from the side'
      },
      {
        src: '/images/Vehicles/Apogee_2.jpg',
        alt: 'Apogee on the grass at sunset, with eight team members standing behind it'
      },
      {
        src: '/images/Vehicles/Apogee_3.jpg',
        alt: 'Apogee on a table at the flying field, with team members around it'
      }
    ]
  },
  {
    id: 3,
    name: 'Zenith',
    description: {
      overview:
        'Zenith is designed for endurance, with advanced navigation systems and enhanced flight stability, ideal for long-range missions. Zenith was the first to feature LTE and VTOL transition in 2023.',
      wingspan: '2.0 meters',
      MTOW: '11 kg',
      maxSpeed: '120 km/h (64.8 kt)',
      payloadCompartment: 'Modular',
      communication: 'Fully LTE',
      platform: 'Bespoke Platform'
    },
    photos: [
      {
        src: '/images/Vehicles/Zenith_1.jpg',
        alt: 'Zenith, a white VTOL plane, flying below the clouds'
      },
      {
        src: '/images/Vehicles/Zenith_2.jpg',
        alt: 'Zenith flying above a line of evergreen trees'
      },
      {
        src: '/images/Vehicles/Zenith_3.jpg',
        alt: 'Zenith low over a grass field in front of evergreen trees'
      }
    ]
  }
]

const PHOTO_INTERVAL = 3000

// One aircraft's photos, which change on their own every few seconds until
// the visitor pauses them. They don't start on their own when the OS asks
// for reduced motion.
function Gallery ({ name, photos }) {
  const reduceMotion = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)
  // null until the visitor presses play/pause
  const [playChoice, setPlayChoice] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const playButtonRef = useRef(null)

  const playing = playChoice ?? !reduceMotion
  const rotating = playing && !hovering && !focusInside

  useEffect(() => {
    if (!rotating) return
    const timeout = setTimeout(() => {
      setCurrent((index) => (index + 1) % photos.length)
    }, PHOTO_INTERVAL)
    return () => clearTimeout(timeout)
  }, [rotating, current, photos.length])

  // Like the WAI-ARIA carousel pattern, the photos hold still while the
  // pointer is over them or keyboard focus is in them, but not for the
  // play/pause button itself, so pressing play visibly starts them. Mouse
  // clicks focus the photo buttons without :focus-visible, so they don't
  // hold them once the pointer has left.
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
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocusInside(false)
    }
  }

  const photo = photos[current]

  return (
    <div
      className={styles.carousel}
      role='group'
      aria-roledescription='carousel'
      aria-label={`${name} photos`}
      onPointerOver={handlePointerOver}
      onPointerLeave={() => setHovering(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className={styles.photo}>
        {/* Screen readers announce the new photo only when the visitor
            changed it */}
        <div aria-live={rotating ? 'off' : 'polite'}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={500}
            height={300}
            className={styles.vehicleImage}
          />
        </div>
        <button
          ref={playButtonRef}
          type='button'
          className={styles.playButton}
          aria-label={`${playing ? 'Pause' : 'Play'} ${name} photos`}
          onClick={() => setPlayChoice(!playing)}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className={styles.indicatorContainer}>
          {photos.map((p, index) => (
            <button
              key={p.src}
              type='button'
              className={`${styles.indicator} ${
                index === current ? styles.activeIndicator : ''
              }`}
              aria-label={`Show ${name} photo ${index + 1} of ${photos.length}`}
              aria-current={index === current ? 'true' : undefined}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.titleOverlay}>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

// The first card is on the first screen, so its entrance is in
// Vehicles.module.css and runs from the page's first paint. The others rise
// in as they scroll into view.
function VehicleCard ({ index, children }) {
  if (index === 0) {
    return (
      <div className={`${styles.vehicleCard} ${styles.firstCard}`}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      data-entrance
      className={`${styles.vehicleCard} ${
        index % 2 === 1 ? styles.right : ''
      }`}
      variants={fadeInUpSlower}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default function Vehicles () {
  return (
    <>
      <PageMeta
        title='Blackbird UAV | Our Vehicles'
        description="Leviathan, Goliath, Apogee and Zenith: the aircraft Blackbird UAV, Carleton University's student UAV design team, has designed and built, with their specs."
        path='/vehicles'
      />
      <Header
        imagePath='/images/Vehicles/Goliath_1.jpg'
        headerText='Our Aircraft'
      />
      <div className={styles.container}>
        <div className={styles.vehiclesList}>
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} index={index}>
              <div className={styles.carouselContainer}>
                <Gallery name={vehicle.name} photos={vehicle.photos} />
              </div>

              <div className={styles.textBox}>
                <p>{vehicle.description.overview}</p>
                <div className={styles.divider} />
                <ul className={styles.specsList}>
                  {vehicle.description.wingspan && (
                    <li>
                      <strong>Wingspan:</strong> {vehicle.description.wingspan}
                    </li>
                  )}
                  <li>
                    <strong>MTOW:</strong> {vehicle.description.MTOW}
                  </li>
                  {vehicle.description.flightTime && (
                    <li>
                      <strong>Flight Time:</strong>{' '}
                      {vehicle.description.flightTime}
                    </li>
                  )}
                  {vehicle.description.maxSpeed && (
                    <li>
                      <strong>Max Speed:</strong> {vehicle.description.maxSpeed}
                    </li>
                  )}
                  <li>
                    <strong>Payload Compartment:</strong>{' '}
                    {vehicle.description.payloadCompartment}
                  </li>
                  <li>
                    <strong>Communication:</strong>{' '}
                    {vehicle.description.communication}
                  </li>
                  <li>
                    <strong>Platform:</strong> {vehicle.description.platform}
                  </li>
                </ul>
              </div>
            </VehicleCard>
          ))}
        </div>
      </div>
    </>
  )
}
