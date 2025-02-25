import { useState } from "react";
import teamData from "../data/teamData";
import { Text, TextInput } from "@mantine/core";
import styles from "../styles/Team.module.css";
import Header from "@/components/Header";

const Alumni = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const alumni = teamData["Alumni"].members;

  const filteredAlumni = alumni.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        imagePath="/images/team2.jpg"
        headerText="Our Alumni"
        initialOffset={200}
        className={styles.teamHeader}
      />
      <div className={styles.alumniContainer}>
        <div className={styles.headerDesc}>
          {teamData["Alumni"].description && (
            <div>{teamData["Alumni"].description}</div>
          )}
        </div>
        <div className={styles.searchBarContainer}>
          {/* <input
            type="text"
            placeholder="Search Alumni"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
          /> */}
          <div className={styles.searchBar}>
            <TextInput
              // description="Type the name of an alumni to search for them"
              placeholder="Search for an alumni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.alumniList}>
          {filteredAlumni.map((member) => (
            <div key={member.id} className={styles.alumniItem}>
              <Text className={styles.alumniName}>
                {member.firstName} {member.lastName}
              </Text>
              <div className={styles.alumniDetails}>
                <div className={styles.roleTags}>
                  {member.role.split(" / ").map((role, index) => (
                    <span
                      key={index}
                      className={`${styles.roleTag} ${
                        styles[role.toLowerCase().replace(/ /g, "")]
                      }`}
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
  );
};

export default Alumni;
