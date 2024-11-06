import { useRouter } from 'next/router';
import teamData from '../../data/teamData';
import { Avatar, Text, Paper } from '@mantine/core';
import styles from '../../styles/Team.module.css';

const MeetTeam = () => {
  const router = useRouter();
  const { year } = router.query;

  const team = year && teamData[year] ? teamData[year] : null;

  let teamTitle;
  if (year === '2024-2025') {
    teamTitle = 'Current Team';
  } else if (year === 'pastMembers') {
    teamTitle = 'Past Members';
  } else if (year === '2023-2024') {
    teamTitle = '2023 - 2024 Team';
  } else if (year === '2022-2023') {
    teamTitle = '2022 - 2023 Team';
  } else {
    teamTitle = year ? `${year} Team` : 'Team Not Found';
  }

  if (!team) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{teamTitle}</h1>
        <p className={styles.message}>Sorry, we couldn't find the team for the specified year.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{teamTitle}</h1>
      {Object.keys(team).map((subteam) => (
        <div className={styles.subteam} key={subteam}>
          <div className={`${styles.sidebar} ${styles[subteam]}`}>
            <span className={styles.sidebarText}>{subteam.charAt(0).toUpperCase() + subteam.slice(1)}</span>
          </div>
          <div className={styles.grid}>
            {team[subteam].map((member) => (
              <div key={member.name} className={styles.card}>
                <div className={styles.cardInner}>
                  {/* Front Side */}
                  <div className={styles.cardFront}>
                    <Avatar src={member.image} radius="xs" size="sm" />
                    <Text className={styles.name}>{member.name}</Text>
                    {member.isExecutive && <span className={styles.executiveTag}>Executive</span>}
                    <Text className={styles.description}>{member.description}</Text>
                  </div>
                  {/* Back Side */}
                  <div className={styles.cardBack}>
                    <Text className={styles.name}>{member.name}</Text>
                    <Text className={styles.extendedDescription}>{member.extendedDescription}</Text>
                    <a href={member.link} className={styles.linkButton} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetTeam;
