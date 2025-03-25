import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '@/styles/Navbar.module.css'
import dropdownStyles from '@/styles/Dropdown.module.css'
import { Menu, Center } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

export default function Navbar () {
  const router = useRouter()
  const [showNavbar, setShowNavbar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleDropdownHover = (isEntering) => {
    if (!isMobile) {
      setIsDropdownOpen(isEntering)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }

    const handleMouseMove = (event) => {
      if (window.scrollY < 300 && event.clientY < 100) {
        setShowNavbar(true)
      } else if (!isDropdownOpen && window.scrollY < 300) {
        setShowNavbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleDropdownClick = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const navbarClass =
    router.pathname === '/'
      ? `${styles.navbar} ${showNavbar ? styles.show : ''} ${
          isOpen ? styles.open : ''
        }`
      : `${styles.navbar} ${styles.show} ${isOpen ? styles.open : ''}`

  const teamLinks = [
    { link: '/MeetTheTeam/2024-2025', label: 'Current Team' },
    { link: '/MeetTheTeam/2023-2024', label: '2023-2024' },
    { link: '/Competitions', label: 'Competitions' },
    { link: '/Alumni', label: 'Alumni' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        !event.target.closest(`.${dropdownStyles.dropdownMenu}`) &&
        !event.target.closest(`.${styles.linkWrapper}`)
      ) {
        setIsDropdownOpen(false)
      } else if (
        isOpen &&
        !event.target.closest(`.${styles.linksContainer}`) &&
        !event.target.closest(`.${styles.hamburger}`)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen, isOpen])

  return (
    <nav className={`${navbarClass}`}>
      <Link href='/'>
        <div className={styles.logoContainer}>
          <Image
            src='/logos/BirdLogo.png'
            alt='Logo'
            fill
            className={`${styles.logo}`}
            sizes='(max-width: 768px) 50px, 100px'
            loading='lazy'
          />
        </div>
      </Link>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle menu'
      >
        <div />
        <div />
        <div />
      </button>

      <div className={`${styles.linksContainer} ${isOpen ? styles.open : ''}`}>
        <div
          className={`${styles.linkWrapper} ${
            router.pathname === '/' ? styles.activeLink : ''
          }`}
        >
          <Link href='/' className={styles.link} onClick={handleLinkClick}>
            <span>Home</span>
          </Link>
        </div>
        <div
          className={`${styles.linkWrapper} ${
            router.pathname === '/vehicles' ? styles.activeLink : ''
          }`}
        >
          <Link
            href='/vehicles'
            className={styles.link}
            onClick={handleLinkClick}
          >
            <span>Vehicles</span>
          </Link>
        </div>

        <div
          className={`${styles.linkWrapper} ${
            router.pathname.startsWith('/meetTeam') ? styles.activeLink : ''
          }`}
          style={{ position: 'relative' }}
          onClick={handleDropdownClick}
          onMouseEnter={() => handleDropdownHover(true)}
          onMouseLeave={() => handleDropdownHover(false)}
        >
          <Center className={styles.link}>
            <span>
              Team
              <IconChevronDown
                size='0.9rem'
                stroke={1.5}
                color='#f9fafb'
                className={styles.chevron}
              />
            </span>
          </Center>
          {isDropdownOpen && (
            <div
              className={`${dropdownStyles.dropdownMenu} ${
                isDropdownOpen ? dropdownStyles.show : ''
              }`}
            >
              {teamLinks.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  onClick={handleLinkClick}
                >
                  <div className={dropdownStyles.dropdownItem}>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className={`${styles.linkWrapper} ${
            router.pathname === '/joinTheTeam' ? styles.activeLink : ''
          }`}
        >
          <Link
            href='/joinTheTeam'
            className={styles.link}
            onClick={handleLinkClick}
          >
            <span>Join</span>
          </Link>
        </div>
        <div className={`${styles.linkWrapper} ${styles.sponsorButton}`}>
          <Link
            href='/sponsor'
            className={styles.sponsorLink}
            onClick={handleLinkClick}
          >
            Sponsor Us
          </Link>
        </div>
      </div>
    </nav>
  )
}
