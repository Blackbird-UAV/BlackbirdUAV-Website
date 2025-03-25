'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'

import Image from 'next/image'
import styles from '@/styles/ParallaxScroll.module.css'
import { InstagramEmbed, LinkedInEmbed } from 'react-social-media-embed'

export const ParallaxScroll = ({ items, className }) => {
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ['start start', 'end start']
  })
  const translateFirst = useTransform(scrollYProgress, [0, 1], [120, -50])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [20, 320])
  const translateThird = useTransform(scrollYProgress, [0, 1], [80, -50])
  const firstPart = items.filter((item) => item.column === 1)
  const secondPart = items.filter((item) => item.column === 2)
  const thirdPart = items.filter((item) => item.column === 3)
  // const firstPart = items.slice(0, third);
  // const secondPart = items.slice(third, 2 * third);
  // const thirdPart = items.slice(2 * third);
  const renderSocialEmbed = (item) => {
    switch (item.platform.toLowerCase()) {
      case 'linkedin':
        return (
          <LinkedInEmbed
            url={item.embedLink}
            postUrl={item.link}
            width='100%'
          />
        )
      case 'instagram':
        return <InstagramEmbed url={item.link} width='100%' captioned />
      case 'discord':
        // For Discord, use an image if available, otherwise a text box
        if (
          item.link &&
          !item.link.startsWith('http') &&
          item.link.includes('/images/')
        ) {
          return (
            <div className={styles.discordEmbed}>
              <Image
                src={item.link}
                height='600'
                width='400'
                alt='Discord newsletter'
                className={styles.discordImage}
              />
            </div>
          )
        } else {
          return (
            <div className={styles.discordEmbed}>
              <div className={styles.discordText}>
                <p>{item.caption}</p>
              </div>
            </div>
          )
        }
      default:
        // Fallback for any other platform
        if (item.link) {
          return (
            <div className={styles.fallbackEmbed}>
              <a href={item.link} target='_blank' rel='noopener noreferrer'>
                {item.caption || item.link}
              </a>
            </div>
          )
        } else {
          return (
            <div className={styles.fallbackEmbed}>
              <p>{item.caption}</p>
            </div>
          )
        }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.blurTop} />
      <div className={styles.blurBottom} />
      <div className={`${styles.container} ${className || ''}`} ref={gridRef}>
        <div className={styles.grid}>
          {' '}
          <div className={styles.column}>
            {firstPart.map((item, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={'grid-1' + idx}
                className={styles.embedContainer}
              >
                {renderSocialEmbed(item)}
                <div className={styles.captionBox}>
                  <div className={styles.platformContainer}>
                    <Image
                      src={item.platformIcon}
                      height='24'
                      width='24'
                      alt={item.platform}
                      className={styles.platformIcon}
                    />
                    <p className={styles.platformName}>{item.title}</p>
                  </div>
                  <p className={styles.caption}>{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.column}>
            {secondPart.map((item, idx) => (
              <motion.div
                style={{ y: translateSecond }}
                key={'grid-2' + idx}
                className={styles.embedContainer}
              >
                {renderSocialEmbed(item)}
                <div className={styles.captionBox}>
                  <div className={styles.platformContainer}>
                    <Image
                      src={item.platformIcon}
                      height='24'
                      width='24'
                      alt={item.platform}
                      className={styles.platformIcon}
                    />
                    <p className={styles.platformName}>{item.title}</p>
                  </div>
                  <p className={styles.caption}>{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.column}>
            {thirdPart.map((item, idx) => (
              <motion.div
                style={{ y: translateThird }}
                key={'grid-3' + idx}
                className={styles.embedContainer}
              >
                {renderSocialEmbed(item)}
                <div className={styles.captionBox}>
                  <div className={styles.platformContainer}>
                    <Image
                      src={item.platformIcon}
                      height='24'
                      width='24'
                      alt={item.platform}
                      className={styles.platformIcon}
                    />
                    <p className={styles.platformName}>{item.title}</p>
                  </div>
                  <p className={styles.caption}>{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParallaxScroll
