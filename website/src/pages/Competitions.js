import React from 'react'
import teamData from '@/data/teamData'
import styles from '@/styles/Team.module.css'
import Header from '@/components/Header'
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
        imagePath='/images/team2.jpg'
        headerText='Competition Teams'
        initialOffset={200}
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
                  <img
                    src={years[year].image}
                    alt={`${year} Competition Team`}
                    className={styles.teamImage}
                    onError={(e) => {
                      console.error(`Failed to load image for year ${year}`)
                      e.target.onerror = null // Prevent infinite loop
                      e.target.src = '/images/team2.jpg' // Fallback image
                    }}
                  />
                )}
                <div className={styles.yearTitle}>{year}</div>
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
