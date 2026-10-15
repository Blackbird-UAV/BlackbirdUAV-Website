import { useState } from 'react'
import Image from 'next/image'
import teamData from '@/data/teamData'
import { Text, TextInput } from '@mantine/core'
import styles from '@/styles/Team.module.css'
import Header from '@/components/Header'
import PageMeta from '@/components/PageMeta'

const Alumni = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const alumni = teamData.Alumni.members
  const search = searchTerm.trim().toLowerCase()

  const filteredAlumni = alumni.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(search)
  )

  return (
    <>
      <PageMeta
        title='Blackbird UAV | Alumni'
        description="Alumni of Blackbird UAV, Carleton University's student UAV design team: former members, the roles they held and the years they were on the team."
        path='/Alumni'
      />
      <Header imagePath='/images/team4.jpg' headerText='Our Alumni' />
      <div className={styles.alumniContainer}>
        <div className={styles.headerDesc}>
          {teamData.Alumni.description && (
            <div>{teamData.Alumni.description}</div>
          )}
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <TextInput
              label='Search alumni'
              classNames={{ label: styles.visuallyHidden }}
              placeholder='Search for an alumni...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && searchTerm) setSearchTerm('')
              }}
            />
            <p className={styles.visuallyHidden} role='status'>
              {search &&
                `Showing ${filteredAlumni.length} of ${alumni.length} alumni`}
            </p>
          </div>
        </div>

        <div className={styles.alumniList}>
          {filteredAlumni.map((member) => (
            <div key={member.id} className={styles.alumniItem}>
              <div className={styles.alumniImageContainer}>
                {/* The name is printed next to the photo, so it needs no alt */}
                <Image
                  src={member.image}
                  alt=''
                  className={styles.alumniImage}
                  width={150}
                  height={150}
                />
              </div>
              <Text className={styles.alumniName}>
                {member.firstName} {member.lastName}
              </Text>
              <div>
                <div className={styles.roleTags}>
                  {member.role
                    .split(' / ')
                    .filter(Boolean)
                    .map((role, index) => (
                      <span
                        key={index}
                        className={`${styles.roleTag} ${styles[role.toLowerCase().replace(/ /g, '')] || ''}`}
                      >
                        {role}
                      </span>
                    ))}
                </div>
                <Text className={styles.alumniDates}>
                  Joined: {member.joined} - Left: {member.left}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Alumni
