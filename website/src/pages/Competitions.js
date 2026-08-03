import React from 'react'
import Image from 'next/image'
import teamData from '@/data/teamData'
import styles from '@/styles/Team.module.css'
import Header from '@/components/Header'
import AwardBadge from '@/components/AwardBadge'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

const Competition = () => {
  const { years } = teamData.Competition

  return (
    <>
      <Header
        imagePath='/images/team4.jpg'
        headerText='Competition Teams'
        className={styles.teamHeader}
      />
      <div className={styles.container}>
        <VerticalTimeline>
          {Object.keys(years)
            .sort((a, b) => b - a)
            .map((year, index) => (
              <VerticalTimelineElement
                className={styles.verticalTimelineElement}
                key={year}
                date={year}
                iconStyle={{ background: 'red', color: '#fff' }}
                contentStyle={{ background: '#333', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  #333' }}
              >
                {years[year].image && (
                  <Image
                    src={years[year].image}
                    alt={`${year} Competition Team`}
                    className={styles.teamImage}
                    width={500}
                    height={300}
                    onError={(e) => {
                      console.error(`Failed to load image for year ${year}`)
                      e.target.onerror = null // Prevent infinite loop
                      e.target.src = '/images/team4.jpg' // Fallback image
                    }}
                  />
                )}
                <div className={styles.yearTitle}>{year}</div>
                {years[year].award && (
                  <AwardBadge
                    variant={years[year].award.variant}
                    label={years[year].award.label}
                    detail={years[year].award.detail}
                  />
                )}
                <div
                  className={styles.yearDescription}
                  dangerouslySetInnerHTML={{ __html: years[year].description }}
                />
                <div className={styles.membersList}>
                  {years[year].members.map((member, index) => (
                    <div key={index} className={styles.memberItem}>
                      <span className={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </span>
                      {member.role && (
                        <span className={styles.memberRole}>{member.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default Competition
