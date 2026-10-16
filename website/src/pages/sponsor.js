import PageMeta from '@/components/PageMeta'
import Sidebar from '@/components/sponsorSidebar'
import sponsors, { tiers } from '@/data/sponsorData'
import styles from '@/styles/Sponsor.module.css'

// --tier and --logo time each tier's entrance and its logos'
// (Sponsor.module.css)
const SponsorTier = ({ tier, index }) => (
  <div
    className={`${styles.tier} ${styles[tier.id]}`}
    style={{ '--tier': index }}
  >
    <div className={styles.tierLabel}>
      <h3 className={styles.tierName}>{tier.name}</h3>
    </div>
    <div className={styles.logoGrid} style={{ '--columns': tier.columns }}>
      {sponsors
        .filter((sponsor) => sponsor.tier === tier.id)
        .map((sponsor, logoIndex) => (
          <div
            key={sponsor.name}
            className={styles.logoItem}
            style={{ '--logo': logoIndex }}
          >
            <a
              className={styles.logoLink}
              href={sponsor.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className={styles.logoBox}>
                {/* A plain <img>, as in SponsorGrid: images are unoptimized,
                    so next/image adds nothing, and its development check
                    warns about every logo, as the CSS changes its width but
                    not its 100px height */}
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
          </div>
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
              <SponsorTier key={tier.id} tier={tier} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
