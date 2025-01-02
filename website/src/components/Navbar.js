import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Navbar.module.css";
import dropdownStyles from "../styles/Dropdown.module.css";
import { Menu, Center } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export default function Navbar() {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const isMobileDevice = () => {
      return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    };

    if (router.pathname === "/") {
      const handleScroll = () => {
        const secondDiv = document.getElementById("secondDiv");
        if (secondDiv) {
          if (window.scrollY >= secondDiv.offsetTop) {
            setShowNavbar(true);
          } else {
            setShowNavbar(false);
          }
        }
      };

      const secondDiv = document.getElementById("secondDiv");
      if (secondDiv) {
        window.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (secondDiv) {
          window.removeEventListener("scroll", handleScroll);
        }
      };
    } else {
      setShowNavbar(true);
    }
  }, [router.pathname, isDropdownOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleDropdownEnter = () => {
    setIsDropdownOpen(true);
    setShowNavbar(true);
  };

  const handleDropdownLeave = (event) => {
    setIsDropdownOpen(false);
    if (event.clientY >= 100) {
      setShowNavbar(false);
    }
  };

  const handleTeamClick = (event) => {
    if (isMobileDevice()) {
      event.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  };

  const navbarClass =
    router.pathname === "/"
      ? `${styles.navbar} ${showNavbar ? styles.show : ""} ${isOpen ? styles.open : ""}`
      : `${styles.navbar} ${styles.show} ${isOpen ? styles.open : ""}`;

  const teamLinks = [
    { link: "/MeetTheTeam/2024-2025", label: "Current Team" },
    { link: "/MeetTheTeam/2023-2024", label: "2023 - 2024" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(`.${dropdownStyles.dropdownMenu}`) && !event.target.closest(`.${styles.linkWrapper}`)) {
        setIsDropdownOpen(false);
      } else if (isOpen && !event.target.closest(`.${styles.linksContainer}`) && !event.target.closest(`.${styles.hamburger}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isOpen]);

  return (
    <nav className={navbarClass}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <img
            src="/logos/BirdLogo.png"
            alt="Logo"
            layout="fill"
            className={styles.logo}
            sizes="(max-width: 768px) 50px, 100px"
            loading="lazy"
          />
        </div>
      </Link>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div />
        <div />
        <div />
      </button>

      <div className={`${styles.linksContainer} ${isOpen ? styles.open : ""}`}>
        <div
          className={`${styles.linkWrapper} ${router.pathname === "/" ? styles.activeLink : ""
            }`}
        >
          <Link href="/" className={styles.link} onClick={handleLinkClick}>
            <span>Home</span>
          </Link>
        </div>
        <div
          className={`${styles.linkWrapper} ${router.pathname === "/vehicles" ? styles.activeLink : ""
            }`}
        >
          <Link href="/vehicles" className={styles.link} onClick={handleLinkClick}>
            <span>Vehicles</span>
          </Link>
        </div>

        <Menu trigger="hover" transitionProps={{ exitDuration: 0 }}>
          <Menu.Target>
            <div
              className={`${styles.linkWrapper} ${router.pathname.startsWith("/meetTeam") ? styles.activeLink : ""
                }`}
              style={{ position: "relative" }}
              onClick={handleTeamClick}
            >
              <Center className={styles.link}>
                <span>
                  Team
                  <IconChevronDown
                    size="0.9rem"
                    stroke={1.5}
                    color="#f9fafb"
                    className={styles.chevron}
                  />
                </span>
              </Center>
            </div>
          </Menu.Target>

          <Menu.Dropdown
            className={dropdownStyles.dropdownMenu}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={(event) => handleDropdownLeave(event)}
            style={{ display: isMobileDevice() && !isDropdownOpen ? 'none' : 'block' }}
          >
            {teamLinks.map((item) => (
              <Link href={item.link} key={item.link} onClick={handleLinkClick}>
                <Menu.Item
                  key={item.link}
                  className={dropdownStyles.dropdownItem}
                >
                  {item.label}
                </Menu.Item>
              </Link>
            ))}
          </Menu.Dropdown>
        </Menu>

        <div
          className={`${styles.linkWrapper} ${router.pathname === "/joinTheTeam" ? styles.activeLink : ""
            }`}
        >
          <Link href="/joinTheTeam" className={styles.link} onClick={handleLinkClick}>
            <span>Join</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${styles.sponsorButton}`}>
          <Link href="/sponsor" className={styles.sponsorLink} onClick={handleLinkClick}>
            Sponsor Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
