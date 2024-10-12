import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Importing useRouter
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const router = useRouter(); // Using useRouter to get current route

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
        <div className={`${styles.linkWrapper} ${router.pathname === '/' ? styles.activeLinkWrapper : ''}`}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/vehicles' ? styles.activeLinkWrapper : ''}`}>
          <Link href="/vehicles" className={styles.link}>
            Vehicles
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/meetTeam' ? styles.activeLinkWrapper : ''}`}>
          <Link href="/meetTeam" className={styles.link}>
            Meet the Team
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${router.pathname === '/joinTheTeam' ? styles.activeLinkWrapper : ''}`}>
          <Link href="/joinTheTeam" className={styles.link}>
            Join the Team
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
