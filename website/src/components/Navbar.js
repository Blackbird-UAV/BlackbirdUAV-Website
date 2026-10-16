import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import styles from '@/styles/Navbar.module.css'
import dropdownStyles from '@/styles/Dropdown.module.css'
import { IconChevronDown } from '@tabler/icons-react'

// Kept by hand rather than read from teamData, which is large and would then
// ship with every page: add a season here when its roster goes into teamData.
const teamLinks = [
  { link: '/MeetTheTeam/2026-2027', label: '2026-2027' },
  { link: '/MeetTheTeam/2025-2026', label: '2025-2026' },
  { link: '/MeetTheTeam/2024-2025', label: '2024-2025' },
  { link: '/MeetTheTeam/2023-2024', label: '2023-2024' },
  { link: '/Alumni', label: 'Alumni' }
]

// The breakpoint of the full-screen menu in Navbar.module.css
const MOBILE_QUERY = '(max-width: 1023px)'
const isMobileWidth = () => window.matchMedia(MOBILE_QUERY).matches

export default function Navbar () {
  const router = useRouter()
  const [showNavbar, setShowNavbar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const hamburgerRef = useRef(null)
  const linksRef = useRef(null)
  const teamRef = useRef(null)
  const teamButtonRef = useRef(null)
  const teamMenuRef = useRef(null)
  // Whether the Team menu is open because the mouse is over it
  const hoverOpened = useRef(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY >= 300) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }

      // Not while one of its links has focus: hiding the list would drop
      // the focus to <body> (ArrowUp or PageUp pressed on a team link)
      if (
        currentScrollY < lastScrollY &&
        isDropdownOpen &&
        !teamMenuRef.current.contains(document.activeElement)
      ) {
        setIsDropdownOpen(false)
      }

      lastScrollY = currentScrollY
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

  // While the full-screen menu is open, the rest of the page is inert (out
  // of the tab order and hidden from screen readers) and doesn't scroll, so
  // focus starts and stays in the menu
  useEffect(() => {
    if (!isOpen) return

    const inerted = []
    for (let node = navRef.current; node !== document.body; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && !sibling.inert) {
          sibling.inert = true
          inerted.push(sibling)
        }
      }
    }
    document.body.style.overflow = 'hidden'
    linksRef.current.querySelector('a').focus()

    // Widening the window past the breakpoint leaves the inline links
    const query = window.matchMedia(MOBILE_QUERY)
    const handleChange = () => {
      if (!query.matches) setIsOpen(false)
    }
    query.addEventListener('change', handleChange)

    return () => {
      inerted.forEach((element) => { element.inert = false })
      document.body.style.overflow = ''
      query.removeEventListener('change', handleChange)
    }
  }, [isOpen])

  useEffect(() => {
    // A press on another navbar link is left to that link's click, so the
    // full-screen menu doesn't shift under the finger before the click lands
    const handlePointerDown = (event) => {
      if (isDropdownOpen && !linksRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (
        isOpen &&
        !linksRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      const focusInTeam = teamRef.current.contains(document.activeElement)
      if (isDropdownOpen && (focusInTeam || !isOpen)) {
        setIsDropdownOpen(false)
        if (focusInTeam) teamButtonRef.current.focus()
      } else if (isOpen) {
        setIsOpen(false)
        setIsDropdownOpen(false)
        hamburgerRef.current.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen, isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
    setIsDropdownOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setIsDropdownOpen(false)
  }

  // Above the breakpoint the Team menu opens while a mouse is over it. A
  // touch only clicks, and in the full-screen menu it's a plain toggle.
  const handleTeamPointerEnter = (event) => {
    if (event.pointerType !== 'mouse' || isMobileWidth()) return
    if (!isDropdownOpen) hoverOpened.current = true
    setIsDropdownOpen(true)
  }

  const handleTeamPointerLeave = (event) => {
    if (event.pointerType !== 'mouse' || isMobileWidth()) return
    hoverOpened.current = false
    // A keyboard user on one of its links keeps it until they Tab or
    // Escape out of it
    if (!teamMenuRef.current.contains(document.activeElement)) {
      setIsDropdownOpen(false)
    }
  }

  const handleTeamClick = (event) => {
    // A mouse click usually follows the hover that just opened the menu, so
    // it leaves it open. Enter and Space (detail 0) always toggle, and a
    // click always opens a closed menu (Escape or a scroll can close a
    // hover-opened one while the pointer is still over Team).
    const keepOpen = isDropdownOpen && hoverOpened.current && event.detail !== 0
    hoverOpened.current = false
    if (!keepOpen) setIsDropdownOpen(!isDropdownOpen)
  }

  // Moving focus out of the floating menu closes it (a click on its padding
  // leaves no relatedTarget and keeps it open). Inside the full-screen menu
  // it is inline, and closing it would move the links under the focus.
  const handleTeamBlur = (event) => {
    const next = event.relatedTarget
    if (!isMobileWidth() && next && !teamRef.current.contains(next)) {
      hoverOpened.current = false
      setIsDropdownOpen(false)
    }
  }

  const navbarClass =
    router.pathname === '/'
      ? `${styles.navbar} ${showNavbar ? styles.show : ''} ${
          isOpen ? styles.open : ''
        }`
      : `${styles.navbar} ${styles.show} ${isOpen ? styles.open : ''}`

  const isTeamRoute =
    router.pathname.startsWith('/MeetTheTeam') || router.pathname === '/Alumni'
  const currentPath = router.asPath.split(/[?#]/)[0]

  const pageLink = (href, label) => (
    <div
      className={`${styles.linkWrapper} ${
        router.pathname === href ? styles.activeLink : ''
      }`}
    >
      <Link
        href={href}
        className={styles.link}
        aria-current={router.pathname === href ? 'page' : undefined}
        onClick={handleLinkClick}
      >
        <span>{label}</span>
      </Link>
    </div>
  )

  return (
    <nav ref={navRef} className={`${navbarClass}`}>
      <Link href='/' className={styles.logoLink} onClick={handleLinkClick}>
        <Image
          src='/logos/BirdLogo.png'
          alt='Blackbird UAV home'
          fill
          className={styles.logo}
          loading='eager'
        />
      </Link>

      <button
        ref={hamburgerRef}
        type='button'
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label='Menu'
        aria-expanded={isOpen}
        aria-controls='navbar-links'
      >
        <span />
        <span />
        <span />
      </button>

      <div
        ref={linksRef}
        id='navbar-links'
        className={`${styles.linksContainer} ${isOpen ? styles.open : ''}`}
      >
        {pageLink('/', 'Home')}
        {pageLink('/Competitions', 'Competitions')}
        {pageLink('/vehicles', 'Vehicles')}

        <div
          ref={teamRef}
          className={`${styles.linkWrapper} ${styles.dropdownWrapper} ${
            isTeamRoute ? styles.activeLink : ''
          }`}
          onPointerEnter={handleTeamPointerEnter}
          onPointerLeave={handleTeamPointerLeave}
          onBlur={handleTeamBlur}
        >
          <button
            ref={teamButtonRef}
            type='button'
            onClick={handleTeamClick}
            className={`${styles.link} ${styles.dropdownTrigger}`}
            aria-expanded={isDropdownOpen}
            aria-controls='navbar-team-menu'
          >
            <span>
              Team
              <IconChevronDown
                size='0.9rem'
                stroke={1.5}
                color='#f9fafb'
                aria-hidden='true'
                className={`${styles.chevron} ${
                  isDropdownOpen ? styles.chevronOpen : ''
                }`}
              />
            </span>
          </button>

          {/* Always rendered, so the team pages are linked from every page's
              HTML; `hidden` takes the links out of view and the tab order */}
          <ul
            ref={teamMenuRef}
            id='navbar-team-menu'
            className={dropdownStyles.dropdownMenu}
            hidden={!isDropdownOpen}
          >
            {teamLinks.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  aria-current={currentPath === item.link ? 'page' : undefined}
                  className={dropdownStyles.dropdownItem}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {pageLink('/joinTheTeam', 'Join')}
        <div className={`${styles.linkWrapper} ${styles.sponsorButton}`}>
          <Link
            href='/sponsor'
            className={styles.sponsorLink}
            aria-current={router.pathname === '/sponsor' ? 'page' : undefined}
            onClick={handleLinkClick}
          >
            Sponsor Us
          </Link>
        </div>
      </div>
    </nav>
  )
}
