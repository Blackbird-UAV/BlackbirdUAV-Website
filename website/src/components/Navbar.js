import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "@/styles/Navbar.module.css";
import dropdownStyles from "../styles/Dropdown.module.css";
import { Menu, Center } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
export default function Navbar() {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Only add scroll event listener for the home page
    if (router.pathname === '/') {
      const handleScroll = () => {
        const secondDiv = document.getElementById('secondDiv');
        if (secondDiv && window.scrollY >= secondDiv.offsetTop) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      };

      // Attach scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [router.pathname]);

  // If not on the home page, ensure navbar is always visible
  const navbarClass = router.pathname === '/' 
    ? `${styles.navbar} ${showNavbar ? styles.show : ''}`
    : `${styles.navbar} ${styles.show}`;

    const teamLinks = [
      { link: '/meetTeam/2023-2024', label: 'Current Team' },
      { link: '/meetTeam/2022-2023', label: '2022 - 2023' },
      { link: '/meetTeam/2021-2022', label: '2021 - 2022' },
      { link: '/meetTeam/pastExecs', label: 'Past Members' },
    ];

  return (
    <nav className={navbarClass}>
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

          <Menu trigger="hover" transitionProps={{ exitDuration: 0 }}>
            <Menu.Target>
              <div
                className={`${styles.linkWrapper} ${router.pathname.startsWith('/meetTeam') ? styles.activeLink : ''}`}
                style={{ position: 'relative' }}
              >
                <Center className={styles.link}>
                  <span>
                    Team
                    <IconChevronDown size="0.9rem" stroke={1.5} color="#f9fafb" className={styles.chevron} />
                  </span>
                </Center>
              </div>
            </Menu.Target>

            <Menu.Dropdown className={dropdownStyles.dropdownMenu}>
              {teamLinks.map((item) => (
                <Menu.Item key={item.link} className={dropdownStyles.dropdownItem}>
                  <Link href={item.link}>
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

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
