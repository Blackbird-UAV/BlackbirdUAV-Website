import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faInstagram,
  faYoutube,
  faDiscord,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import styles from '@/styles/Footer.module.css'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/blackbird-uav/',
    icon: faLinkedin,
    className: styles.linkedin
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/blackbird.uav/',
    icon: faInstagram,
    className: styles.instagram
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@BlackbirdUAV',
    icon: faYoutube,
    className: styles.youtube
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/Spw3F6KrCn',
    icon: faDiscord,
    className: styles.discord
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Blackbird-UAV',
    icon: faGithub,
    className: styles.github
  }
]

export default function Footer () {
  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          {/* The logo's own proportions, so its box has the right height
              before the image loads */}
          <Image
            src='/logos/BirdBBUAVLogo.png'
            alt='Blackbird UAV'
            width={300}
            height={101}
          />
        </div>

        <div className={styles.socialLinksSection}>
          <div className={styles.socialLinks}>
            {/* The icons are aria-hidden, so each link is named by its label */}
            {socialLinks.map(({ name, href, icon, className }) => (
              <a
                key={name}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={className}
                aria-label={`Blackbird UAV on ${name} (opens in a new tab)`}
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <p>Canal Building, Library Rd, Ottawa, ON</p>
          <p>Carleton University, Ottawa, ON K1S 5B6</p>
          <p>© Copyright, Blackbird UAV</p>
          <p>
            <a href='mailto:contact@blackbirduav.ca'>contact@blackbirduav.ca</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
