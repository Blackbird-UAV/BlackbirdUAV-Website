import React from 'react'
import Image from 'next/image'
import teamData from '@/data/teamData'
import teamStyles from '@/styles/Team.module.css'
import styles from '@/styles/Competitions.module.css'
import Header from '@/components/Header'
import PageMeta from '@/components/PageMeta'
import AwardBadge from '@/components/AwardBadge'

const Competition = () => {
  const { years } = teamData.Competition

  return (
    <>
      <PageMeta
        title='Blackbird UAV | Competitions'
        description="Blackbird UAV's competition history, year by year: the awards, the write-ups and the Carleton University students on each competition team."
        path='/Competitions'
      />
      <Header imagePath='/images/team4.jpg' headerText='Competition Teams' />
      <div className={teamStyles.container}>
        <ol className={styles.timeline}>
          {Object.keys(years)
            .sort((a, b) => b - a)
            .map((year) => {
              const { image, imageWidth, imageHeight, award, description, members } =
                years[year]

              return (
                <li
                  key={year}
                  className={`${styles.entry} ${image ? '' : styles.entryNoMedia}`}
                >
                  {image && (
                    <figure className={styles.media}>
                      {/* The photo's own size, so its box has the photo's
                          shape before it loads and the text beside or
                          below it doesn't move when it arrives */}
                      <Image
                        src={image}
                        alt={`The ${year} Blackbird UAV competition team`}
                        className={styles.image}
                        width={imageWidth}
                        height={imageHeight}
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
                      <h2 className={styles.year}>{year}</h2>
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
                    <h3 className={styles.rosterHeading}>Team</h3>
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
