import { motion } from 'motion/react'
import sponsors, { tiers } from '@/data/sponsorData'
import styles from '@/styles/SponsorGrid.module.css'

const SponsorItem = ({ sponsor, index }) => (
  <motion.div
    data-entrance
    className={styles.item}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px 0px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <a
      className={styles.link}
      href={sponsor.link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className={styles.box}>
        {/* A plain <img>: images are unoptimized, so next/image adds nothing,
            and its development check warns about every logo, as the CSS
            changes its width but not its 100px height. Lazy, as the grid is
            far below the fold. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          src={sponsor.logo}
          alt={sponsor.name}
          width={300}
          height={100}
          loading='lazy'
          decoding='async'
        />
      </div>
    </a>
  </motion.div>
)

// Each tier wraps its logos onto rows of `columns` and centres the last row
const SponsorGrid = () =>
  tiers.map((tier) => (
    <div
      key={tier.id}
      className={styles.tier}
      style={{ '--columns': tier.columns }}
    >
      {sponsors
        .filter((sponsor) => sponsor.tier === tier.id)
        .map((sponsor, index) => (
          <SponsorItem key={sponsor.name} sponsor={sponsor} index={index} />
        ))}
    </div>
  ))

export default SponsorGrid
