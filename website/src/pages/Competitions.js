import React from 'react'
import Image from 'next/image'
import teamData from '@/data/teamData'
import teamStyles from '@/styles/Team.module.css'
import styles from '@/styles/Competitions.module.css'
import Header from '@/components/Header'
import AwardBadge from '@/components/AwardBadge'

const Competition = () => {
  const { years } = teamData.Competition

  return (
    <>
      <Header
        imagePath='/images/team4.jpg'
        headerText='Competition Teams'
        className={teamStyles.teamHeader}
      />
      <div className={teamStyles.container}>
        <ol className={styles.timeline}>
          {Object.keys(years)
            .sort((a, b) => b - a)
            .map((year, index) => {
              const { image, award, description, members } = years[year]

              return (
                <li
                  key={year}
                  className={`${styles.entry} ${image ? '' : styles.entryNoMedia}`}
                >
                  {image && (
                    <figure className={styles.media}>
                      <Image
                        src={image}
                        alt={`${year} Competition Team`}
                        className={styles.image}
                        width={1200}
                        height={750}
                        /* The newest year sits at the top and is the LCP image. */
                        priority={index === 0}
                        onError={(e) => {
                          console.error(`Failed to load image for year ${year}`)
                          e.target.onerror = null // Prevent infinite loop
                          e.target.src = '/images/team4.jpg' // Fallback image
                        }}
                      />
                    </figure>
                  )}
                  <div className={styles.body}>
                    <div className={styles.entryHeader}>
                      <span className={styles.year}>{year}</span>
                      {award && (
                        <AwardBadge
                          variant={award.variant}
                          label={award.label}
                          detail={award.detail}
                        />
                      )}
                    </div>
                    <div
                      className={styles.description}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <h2 className={styles.rosterHeading}>Team</h2>
                    <ul className={styles.membersList}>
                      {members.map((member, memberIndex) => (
                        <li key={memberIndex} className={styles.memberItem}>
                          <span className={styles.memberName}>
                            {member.firstName} {member.lastName}
                          </span>
                          {member.role && (
                            <span className={styles.memberRole}>{member.role}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
        </ol>
      </div>
    </>
  )
}

export default Competition
