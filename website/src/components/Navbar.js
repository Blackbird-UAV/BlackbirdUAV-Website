import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image
            src="/logos/BirdLogo.png" 
            alt="Logo"
            fill
            className={styles.logo}
            sizes="(max-width: 768px) 50px, 100px"
          />
        </div>
      </Link>

      <div className={styles.linksContainer}>
        <div className={`${styles.linkWrapper} ${router.pathname === '/' ? styles.activeLink : ''}`}>
          <Link href="/" className={styles.link}>
            <span>Home</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/vehicles' ? styles.activeLink : ''}`}>
          <Link href="/vehicles" className={styles.link}>
            <span>Vehicles</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/meetTeam' ? styles.activeLink : ''}`}>
          <Link href="/meetTeam" className={styles.link}>
            <span>Team</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/joinTheTeam' ? styles.activeLink : ''}`}>
          <Link href="/joinTheTeam" className={styles.link}>
            <span>Join</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${styles.sponsorButton}`}>
          <Link href="/sponsor" className={styles.sponsorLink}>
            Sponsor Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
