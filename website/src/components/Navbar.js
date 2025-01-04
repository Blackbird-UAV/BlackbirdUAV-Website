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
    if (router.pathname === "/") {
      const handleScroll = () => {
        if (window.scrollY >= 300) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      };

      const handleMouseMove = (event) => {
        if (window.innerWidth > 600) {
          if (isDropdownOpen) {
            setShowNavbar(true);
          } else {
            if (event.clientY < 100) {
              setShowNavbar(true);
            } else {
              setShowNavbar(false);
            }
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      if (window.innerWidth > 600) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (window.innerWidth > 600) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      };
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

  const navbarClass =
    router.pathname === "/"
      ? `${styles.navbar} ${showNavbar ? styles.show : ""} ${
          isOpen ? styles.open : ""
        }`
      : `${styles.navbar} ${styles.show} ${isOpen ? styles.open : ""}`;

  const teamLinks = [
    { link: "/MeetTheTeam/2024-2025", label: "Current Team" },
    { link: "/MeetTheTeam/2023-2024", label: "2023 - 2024" },
    { link: "/MeetTheTeam/2022-2023", label: "2022 - 2023" },
    { link: "/MeetTheTeam/pastMembers", label: "Past Members" },
  ];

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
          className={`${styles.linkWrapper} ${
            router.pathname === "/" ? styles.activeLink : ""
          }`}
        >
          <Link href="/" className={styles.link} onClick={handleLinkClick}>
            <span>Home</span>
          </Link>
        </div>
        <div
          className={`${styles.linkWrapper} ${
            router.pathname === "/vehicles" ? styles.activeLink : ""
          }`}
        >
          <Link
            href="/vehicles"
            className={styles.link}
            onClick={handleLinkClick}
          >
            <span>Vehicles</span>
          </Link>
        </div>

        <Menu trigger="hover" transitionProps={{ exitDuration: 0 }}>
          <Menu.Target>
            <div
              className={`${styles.linkWrapper} ${
                router.pathname.startsWith("/meetTeam") ? styles.activeLink : ""
              }`}
              style={{ position: "relative" }}
            >
              <Center className={styles.link}>
                <Link
                  href="/MeetTheTeam/2024-2025"
                  className={styles.link}
                  onClick={handleLinkClick}
                >
                  <span>
                    Team
                    <IconChevronDown
                      size="0.9rem"
                      stroke={1.5}
                      color="#f9fafb"
                      className={styles.chevron}
                    />
                  </span>
                </Link>
              </Center>
            </div>
          </Menu.Target>

          <Menu.Dropdown
            className={dropdownStyles.dropdownMenu}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={(event) => handleDropdownLeave(event)}
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
          className={`${styles.linkWrapper} ${
            router.pathname === "/joinTheTeam" ? styles.activeLink : ""
          }`}
        >
          <Link
            href="/joinTheTeam"
            className={styles.link}
            onClick={handleLinkClick}
          >
            <span>Join</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${styles.sponsorButton}`}>
          <Link
            href="/sponsor"
            className={styles.sponsorLink}
            onClick={handleLinkClick}
          >
            Sponsor Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
