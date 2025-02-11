import { useRouter } from "next/router";
import teamData from "../../data/teamData";
import { Text } from "@mantine/core";
import styles from "../../styles/Team.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import Head from "next/head";
import { useState, useEffect } from "react";

const MeetTeam = () => {
  const router = useRouter();
  const { year } = router.query;

  const [headerOffset, setHeaderOffset] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setHeaderOffset(10);
      } else if (width <= 768) {
        setHeaderOffset(150);
      } else {
        setHeaderOffset(170);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const team = year && teamData[year] ? teamData[year] : null;

  let teamTitle;
  if (year === "2024-2025") {
    teamTitle = "Current Team";
  } else if (year === "pastMembers") {
    teamTitle = "Past Members";
  } else if (year === "2023-2024") {
    teamTitle = "2023 - 2024 Team";
  } else if (year === "2022-2023") {
    teamTitle = "2022 - 2023 Team";
  } else {
    teamTitle = year ? `${year} Team` : "Team Not Found";
  }

  const teamDescription = team ? team.description : "";

  if (!team) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{teamTitle}</h1>
        <p className={styles.message}>
          Sorry, we couldn&apos;t find the team for the specified year.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>BlackBird UAV | Meet the Team</title>
        <meta name="description" content="Meet the Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header imagePath="/images/team.jpg" headerText={teamTitle} />
      <div className={styles.container}>
        {/* <h1 className={styles.title}>{teamTitle}</h1> */}
        <div className={styles.headerDescTitle}>
          <h1>Meet the Team</h1>
        </div>
        <div className={styles.headerDesc}>
          {teamDescription && <div>{teamDescription}</div>}
        </div>
        {Object.keys(team).map(
          (subteam) =>
            subteam !== "description" && (
              <div className={styles.subteam} key={subteam}>
                <div className={styles.subteamContent}>
                  <div className={`${styles.sidebar} ${styles[subteam]}`}>
                    <span className={styles.sidebarText}>
                      {subteam.charAt(0).toUpperCase() + subteam.slice(1)}
                    </span>
                  </div>
                  <div className={styles.grid}>
                    {team[subteam]
                      .sort(
                        (a, b) =>
                          (b.isPresident
                            ? 3
                            : b.isExecutive
                            ? 2
                            : b.isManager
                            ? 1
                            : 0) -
                          (a.isPresident
                            ? 3
                            : a.isExecutive
                            ? 2
                            : a.isManager
                            ? 1
                            : 0)
                      )
                      .map((member) => (
                        <div key={member.id} className={styles.card}>
                          <div className={styles.cardInner}>
                            {/* Front Side */}
                            <div
                              className={styles.cardFront}
                              style={{
                                backgroundImage: `url(${member.image})`,
                              }}
                            >
                              <div className={styles.turnOverIcon}>
                                <FontAwesomeIcon icon={faAnglesRight} />
                              </div>
                              {member.isPresident && (
                                <span className={styles.presidentTag}>
                                  President
                                </span>
                              )}
                              {member.isExecutive && (
                                <span className={styles.executiveTag}>
                                  Executive
                                </span>
                              )}
                              {member.isManager && (
                                <span className={styles.managerTag}>
                                  Manager
                                </span>
                              )}
                              <Text className={styles.firstName}>
                                {member.firstName}
                              </Text>
                              <Text className={styles.lastName}>
                                {member.lastName}
                              </Text>
                              <Text className={styles.description}>
                                {member.description}
                              </Text>
                            </div>
                            {/* Back Side */}
                            <div className={styles.cardBack}>
                              <div
                                className={`${styles.colorTop} ${styles[subteam]}`}
                              >
                                {member.isPresident && (
                                  <span className={styles.presidentTag}>
                                    President
                                  </span>
                                )}
                                {member.isExecutive && (
                                  <span className={styles.executiveTag}>
                                    Executive
                                  </span>
                                )}
                                {member.isManager && (
                                  <span className={styles.managerTag}>
                                    Manager
                                  </span>
                                )}
                                <Text className={styles.firstName}>
                                  {member.firstName}
                                </Text>
                                <Text className={styles.lastName}>
                                  {member.lastName}
                                </Text>
                              </div>

                              <Text className={styles.extendedDescription}>
                                {member.extendedDescription}
                              </Text>
                              <a
                                href={member.link}
                                className={styles.linkButton}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                See LinkedIn
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Render double lines for comp team */}
                {subteam === "Competition" && (
                  <div className={styles.linesContainer}>
                    <div className={styles.compBox}>
                      <p className={styles.compText}>
                        *This is the description for the competition team.
                        Highlight key details or achievements here*
                      </p>
                    </div>
                    <div className={styles.horizontalLine}></div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </>
  );
};

export default MeetTeam;
