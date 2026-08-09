'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import Image from 'next/image'
import styles from '@/styles/ParallaxScroll.module.css'
import { InstagramEmbed } from 'react-social-media-embed'

// Platforms whose embeds pull in third-party iframes/scripts. These are the
// only ones worth deferring — everything else renders from local assets.
// LinkedIn is no longer among them; see the note in renderSocialEmbed.
const THIRD_PARTY_PLATFORMS = ['instagram']

// The data file spells these however it likes; these are the display forms.
const PLATFORM_LABELS = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  discord: 'Discord'
}

// Stands in for a post with no artwork of its own yet. Reserves the slot's
// height and keeps a real link in the static HTML for crawlers and for anyone
// whose embed never loads.
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

// A post whose artwork is stored in this repo. Preferred over any third-party
// embed: it always renders, costs one image request instead of an iframe plus
// the platform's scripts, and can't be collapsed by a content blocker.
const LocalPostCard = ({ item }) => (
  <a
    href={item.link}
    target='_blank'
    rel='noopener noreferrer'
    className={styles.localCard}
  >
    <Image
      src={item.image}
      alt={`${item.title} post`}
      fill
      sizes='(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw'
      className={styles.localCardImage}
    />
  </a>
)

const renderSocialEmbed = (item) => {
  // Self-hosted artwork wins over the platform embed whatever the platform is.
  if (item.image) return <LocalPostCard item={item} />

  switch (item.platform.toLowerCase()) {
    case 'linkedin':
      // No iframe. LinkedIn's embed gets no layout box here at all — it fires
      // onLoad, then reports zero offset/client/rect height inside an explicit
      // 520px slot, so all three posts rendered as blank panels. Verified the
      // same way on a bare page with a plain iframe, so it isn't this app or
      // the embed library. Until the artwork is added to /public/images these
      // degrade to a link card rather than a blank hole.
      return <EmbedPlaceholder item={item} />
    case 'instagram':
      // No `captioned` — the caption is already rendered below every card, and
      // including it here made these embeds 880px tall against LinkedIn's 500.
      return <InstagramEmbed url={item.link} width='100%' />
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

const SocialCard = ({ item, active }) => {
  const isThirdParty = THIRD_PARTY_PLATFORMS.includes(item.platform.toLowerCase())

  return (
    <>
      <div className={styles.embedSlot}>
        {!isThirdParty || active
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
  // One gate for the whole section rather than one per card. Cards are observed
  // through a container that clips its own overflow, so a per-card observer
  // never fires for anything below that container's fold — three of the nine
  // posts stayed placeholders permanently. Nothing loads until the section is
  // approached, which is the part worth deferring.
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px'
  })
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ['start start', 'end start']
  })
  // Small opposing drifts. The previous values ran to +320px on the middle
  // column, which slid it most of a card out of step with its neighbours and
  // opened the empty band this section was mostly made of.
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -40])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 40])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -40])

  const columns = [
    { items: items.filter((item) => item.column === 1), y: translateFirst },
    { items: items.filter((item) => item.column === 2), y: translateSecond },
    { items: items.filter((item) => item.column === 3), y: translateThird }
  ]

  return (
    <div className={styles.wrapper} ref={sectionRef}>
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
                  <SocialCard item={item} active={sectionInView} />
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
