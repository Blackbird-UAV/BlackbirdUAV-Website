import Head from "next/head";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

export default function Join() {
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  // Scroll event listener to detect when the user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = document.querySelector(`.${styles.parallaxBackground}`);
      const speed = 0.5;
      header.style.backgroundPositionY = `-${scrollPosition * speed}px`;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      console.log(scrolledToBottom);
      setIsBottomVisible(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Join the Team</title>
        <meta
          name="description"
          content="Join Black Bird UAV - Be a part of a cutting-edge UAV community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Parallax Background Section */}
      <div className={styles.parallaxBackground}>
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.bigHeader}>
              <strong>Soar Higher with Black Bird UAV</strong>
            </h1>
            <p className={styles.flavourTextTop}>
              Explore the future of UAV technology with a community that pushes
              boundaries.
            </p>
            <p className={styles.flavourText}>
              Take your passion for technology to new heights. Whether you're a
              seasoned engineer or just curious about UAVs, Black Bird UAV
              offers hands-on experience in aerial robotics. All Carleton
              students are welcome to be part of something bigger.
            </p>
            <p className={styles.contentText}>
              Work on cutting-edge projects, gain practical skills, and be part
              of a community that thrives on innovation. We offer a space where
              everyone can contribute—regardless of experience level. Stay
              informed on our open-door meetings and collaborative efforts by
              joining us on Discord.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll-Up Section */}
      <div
        className={`${styles.scrollUpSection} ${
          isBottomVisible ? styles.visible : ""
        }`}
      >
        <div class="content">
          <h2>Interested in joining?</h2>
          <a
            href="https://discord.gg/Spw3F6KrCn"
            target="_blank"
            rel="noreferrer"
            className={styles.discordButton}
          >
            <FontAwesomeIcon icon={faDiscord} width={24} height={24} />
            <span>Join us on Discord!</span>
          </a>
        </div>
      </div>
    </>
  );
}
