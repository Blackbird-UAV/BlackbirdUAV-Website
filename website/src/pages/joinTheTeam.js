import Head from "next/head";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Join() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          {/* Image for large screens */}
          <img src="/images/JoinUsMedia.jpg" alt="Black Bird UAV" className={styles.largeImage} />
        </div>

        <div className={styles.rightSide}>
          <p className={styles.flavourTextTop}>
            Explore the future of UAV technology with a community that pushes boundaries.
          </p>
          <h1 className={styles.bigHeader}>
            <strong>Soar Higher with Black Bird UAV</strong>
          </h1>

          {/* On tablet and smaller devices, show the image between the header and content */}
          <img src="/images/JoinUsMedia.jpg" alt="Black Bird UAV" className={styles.mobileImage} />
          
          <p className={styles.flavourText}>
            Take your passion for technology to new heights. Whether you're a seasoned engineer or just curious about UAVs, Black Bird UAV offers hands-on experience in aerial robotics. All Carleton students are welcome to be part of something bigger.
          </p>
          <p className={styles.contentText}>
            Work on cutting-edge projects, gain practical skills, and be part of a community that thrives on innovation. We offer a space where everyone can contribute—regardless of experience level. Stay informed on our open-door meetings and collaborative efforts by joining us on Discord.
          </p>
          <a href="https://discord.gg/Spw3F6KrCn" target="_blank" rel="noreferrer" className={styles.discordButton}>
            <FontAwesomeIcon icon={faDiscord} width={24} height={24} />
            <span>Join Us on Discord</span>
          </a>
        </div>
      </div>
    </>
  );
}
