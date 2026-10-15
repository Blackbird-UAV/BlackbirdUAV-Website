import Image from 'next/image'
import { motion } from 'motion/react'
import PageMeta from '@/components/PageMeta'
import Sidebar from '@/components/sponsorSidebar'
import { DURATIONS, easing } from '@/components/animations'
import sponsors, { tiers } from '@/data/sponsorData'
import styles from '@/styles/Sponsor.module.css'

// Each tier rises in a little after the one above it
const tierAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: DURATIONS.Fast }
  })
}

// Then its logos, one after another
const logoAnimation = (tierIndex, logoIndex) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: tierIndex * 0.3 + logoIndex * 0.08 + 0.1,
      duration: DURATIONS.Fast,
      ease: easing
    }
  }
})

const SponsorTier = ({ tier, index }) => (
  <div className={`${styles.tier} ${styles[tier.id]}`}>
    <div className={styles.tierLabel}>
      <h3 className={styles.tierName}>{tier.name}</h3>
    </div>
    <div className={styles.logoGrid} style={{ '--columns': tier.columns }}>
      {sponsors
        .filter((sponsor) => sponsor.tier === tier.id)
        .map((sponsor, logoIndex) => (
          <motion.div
            key={sponsor.name}
            initial='hidden'
            animate='visible'
            variants={logoAnimation(index, logoIndex)}
          >
            <a
              className={styles.logoLink}
              href={sponsor.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className={styles.logoBox}>
                {/* The CSS sizes the logo; width and height are only what
                    next/image requires */}
                <Image
                  className={styles.logo}
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={300}
                  height={100}
                />
              </div>
            </a>
          </motion.div>
        ))}
    </div>
  </div>
)

export default function Sponsor () {
  return (
    <div className={styles.page}>
      <PageMeta
        title='Blackbird UAV | Sponsor Us'
        description="Sponsor or donate to Blackbird UAV, Carleton University's student UAV design team: meet our sponsors, read our sponsorship package and get in touch."
        path='/sponsor'
      />
      <div className={styles.layout}>
        <div className={styles.sidebarCell}>
          <Sidebar />
        </div>
        <section className={styles.sponsorsCell} aria-labelledby='sponsors-title'>
          <div className={styles.stack}>
            <h2 id='sponsors-title' className={styles.title}>
              Thank you to our generous sponsors!
            </h2>
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                variants={tierAnimation}
                initial='hidden'
                animate='visible'
                custom={index}
              >
                <SponsorTier tier={tier} index={index} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
