import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Vehicles.module.css'
import Header from '@/components/Header'
import { fadeInUpSlower } from '@/components/animations'

const vehicles = [
  {
    id: 1,
    name: 'Apogee',
    description: {
      overview:
        "Apogee is a quadcopter featuring our team's most recent airframe design and software integration efforts. Apogee stands as BBUAVS's most advanced drone, boasting autonomous capabilities throughout its entire flight, from take-off to landing.",
      wingspan: '2.5 meters',
      MTOW: '15 kg',
      maxSpeed: '156 km/h (84.2 kt)',
      payloadCompartment: 'Modular',
      communication: 'Fully LTE',
      platform: 'Bespoke Platform'
    },
    images: [
      '/images/Vehicles/Apogee_1.jpg',
      '/images/Vehicles/Apogee_2.jpg',
      '/images/Vehicles/Apogee_3.jpg'
    ]
  },
  {
    id: 2,
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
    images: [
      '/images/Vehicles/Zenith_1.jpg',
      '/images/Vehicles/Zenith_2.jpg',
      '/images/Vehicles/Zenith_3.jpg'
    ]
  }
]

export default function Vehicles () {
  const vehiclesRef = useRef([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600
      const container = document.querySelector(`.${styles.vehiclesList}`)
      if (isMobile) {
        container.style.scrollSnapType = 'none'
      } else {
        container.style.scrollSnapType = 'y mandatory'
      }

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjusted threshold to ensure only one card is snapped to
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isMobile) {
              // entry.target.scrollIntoView({
              //   behavior: "smooth",
              //   block: "center",
              // });
              // Stop scroll momentum
              // setTimeout(() => {x
              //   container.style.scrollSnapType = 'none';
              //   setTimeout(() => {
              //     container.style.scrollSnapType = 'y mandatory';
              //   }, 100);
              // }, 300);
            }
          }
        })
      }, observerOptions)

      vehiclesRef.current.forEach((ref) => {
        if (ref) observer.observe(ref)
      })

      return () => observer.disconnect()
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call initially to set the correct state

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % vehicles[0].images.length
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>Blackbird UAV | Our Vehicles</title>
        <meta name='description' content='Sponsor Us!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Header
        imagePath='/images/Vehicles/Apogee_1.jpg'
        headerText='Our Aircraft'
      />
      <div className={styles.container}>
        <div className={styles.vehiclesList}>
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className={`${styles.vehicleCard} ${
                index % 2 === 1 ? styles.right : styles.left
              }`}
              ref={(el) => (vehiclesRef.current[index] = el)}
              // style={{ scrollSnapAlign: "center" }} // Ensure snap alignment
              variants={fadeInUpSlower}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className={styles.carouselContainer}>
                <div className={styles.carousel}>
                  <Image
                    src={vehicle.images[currentIndex]}
                    alt={`${vehicle.name} image ${currentIndex + 1}`}
                    width={500}
                    height={300}
                    className={styles.vehicleImage}
                  />
                  <div className={styles.titleOverlay}>
                    <h2 className={styles.imageTitle}>{vehicle.name}</h2>
                  </div>
                  <div
                    className={`${styles.indicatorContainer} ${
                      index % 2 === 1
                        ? styles.indicatorLeft
                        : styles.indicatorRight
                    }`}
                  >
                    {vehicle.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`${styles.indicator} ${
                          currentIndex === idx ? styles.activeIndicator : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.textBox}>
                <p>{vehicle.description.overview}</p>
                <div className={styles.divider} />
                <ul className={styles.specsList}>
                  <li>
                    <strong>Wingspan:</strong> {vehicle.description.wingspan}
                  </li>
                  <li>
                    <strong>MTOW:</strong> {vehicle.description.MTOW}
                  </li>
                  <li>
                    <strong>Max Speed:</strong> {vehicle.description.maxSpeed}
                  </li>
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
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
