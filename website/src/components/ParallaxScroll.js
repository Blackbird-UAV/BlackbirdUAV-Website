'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import Image from 'next/image'
import styles from '@/styles/ParallaxScroll.module.css'
import { InstagramEmbed, LinkedInEmbed } from 'react-social-media-embed'

// Platforms whose embeds pull in third-party iframes/scripts. These are the
// only ones worth deferring — everything else renders from local assets.
const THIRD_PARTY_PLATFORMS = ['instagram', 'linkedin']

// The data file spells these however it likes; these are the display forms.
const PLATFORM_LABELS = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  discord: 'Discord'
}

const renderSocialEmbed = (item) => {
  switch (item.platform.toLowerCase()) {
    case 'linkedin':
      return <LinkedInEmbed url={item.embedLink} postUrl={item.link} width='100%' />
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

// Stands in for a deferred embed. Reserves height so swapping in the real
// embed doesn't shift the column, and keeps a real link in the static HTML
// for crawlers and for anyone whose embed never loads.
const EmbedPlaceholder = ({ item }) => (
  <div className={styles.placeholder}>
    <Image
      src={item.platformIcon}
      height='32'
      width='32'
      alt=''
      className={styles.placeholderIcon}
    />
    <a
      href={item.link}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.placeholderLink}
    >
      View on {PLATFORM_LABELS[item.platform.toLowerCase()] ?? item.platform}
    </a>
  </div>
)

const SocialCard = ({ item }) => {
  const isThirdParty = THIRD_PARTY_PLATFORMS.includes(item.platform.toLowerCase())
  // Start fetching a little before the card is actually on screen so it has
  // usually settled by the time it scrolls into view.
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px'
  })

  return (
    <>
      <div ref={isThirdParty ? ref : undefined} className={styles.embedSlot}>
        {!isThirdParty || inView
          ? renderSocialEmbed(item)
          : <EmbedPlaceholder item={item} />}
      </div>
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
    </>
  )
}

export const ParallaxScroll = ({ items, className }) => {
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ['start start', 'end start']
  })
  const translateFirst = useTransform(scrollYProgress, [0, 1], [120, -50])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [20, 320])
  const translateThird = useTransform(scrollYProgress, [0, 1], [80, -50])

  const columns = [
    { items: items.filter((item) => item.column === 1), y: translateFirst },
    { items: items.filter((item) => item.column === 2), y: translateSecond },
    { items: items.filter((item) => item.column === 3), y: translateThird }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.blurTop} />
      <div className={styles.blurBottom} />
      <div className={`${styles.container} ${className || ''}`} ref={gridRef}>
        <div className={styles.grid}>
          {columns.map((column, columnIdx) => (
            <div className={styles.column} key={`grid-${columnIdx}`}>
              {column.items.map((item, idx) => (
                <motion.div
                  style={{ y: column.y }}
                  key={`grid-${columnIdx}-${idx}`}
                  className={styles.embedContainer}
                >
                  <SocialCard item={item} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ParallaxScroll
