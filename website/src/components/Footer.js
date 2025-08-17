import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faYoutube,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styles from "@/styles/Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContent}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Image
            src="/logos/BirdBBUAVLogo.png"
            alt="Blackbird Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Social Media Links Section */}
        <div className={styles.socialLinksSection}>
          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/company/blackbird-uav/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.instagram.com/blackbird.uav/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.youtube.com/@BlackbirdUAV"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtube}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://discord.gg/Spw3F6KrCn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discord}
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
                        <a
              href="https://github.com/Blackbird-UAV"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.github}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          <p>Canal Building, Library Rd, Ottawa, ON</p>
          <p>Carleton University, Ottawa, ON K1S 5B6</p>
          <p>© Copyright, Blackbird UAV</p>
          <p>contact@blackbirduav.ca</p>
        </div>
      </div>
    </footer>
  );
}
