import { useRouter } from 'next/router';
import teamData from '../../data/teamData';
import { Avatar, Text, Paper, Grid } from '@mantine/core';
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
      <div className={styles.grid}>
        {team.map((member) => (
          <Paper key={member.name} className={styles.card}>
            <Avatar src={member.image} size={80} radius={40} mx="auto" />
            <Text className={styles.name}>{member.name}</Text>
            {member.tags.map((tag, index) => (
              <span key={index} className={`${styles.tag} ${styles[tag]}`}>{tag}</span>
            ))}
            <Text className={styles.description}>{member.description}</Text>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default MeetTeam;
