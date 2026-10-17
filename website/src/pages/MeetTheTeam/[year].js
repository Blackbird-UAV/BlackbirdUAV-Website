import Image from 'next/image'
import teamData from '@/data/teamData'
import { Text, TextInput } from '@mantine/core'
import styles from '@/styles/Team.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import Header from '@/components/Header'
import PageMeta from '@/components/PageMeta'
import { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'motion/react'

const isYear = (key) => /^\d{4}-\d{4}$/.test(key)
// Only the newest roster has a member search
const LATEST_YEAR = Object.keys(teamData).filter(isYear).sort().at(-1)

// Shown, blurred, for a member with no `image` in teamData, and in place of
// a headshot that fails to load.
const PLACEHOLDER_IMAGE = '/images/TeamHeadshots/memberPlaceholder.jpg'
const PLACEHOLDER_STYLE = { filter: 'blur(4px) brightness(0.9)', scale: '1.02' }

// Presidents first, then executives, then managers
const rank = (member) =>
  member.isPresident ? 3 : member.isExecutive ? 2 : member.isManager ? 1 : 0

const subteamsOf = (team) =>
  Object.keys(team).filter((key) => key !== 'description')

const membersOf = (team) => subteamsOf(team).flatMap((key) => team[key])

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const RoleTags = ({ member }) => (
  <>
    {member.isPresident && (
      <span className={styles.presidentTag}>President</span>
    )}
    {member.isExecutive && (
      <span className={styles.executiveTag}>Executive</span>
    )}
    {member.isManager && <span className={styles.managerTag}>Manager</span>}
  </>
)

const Name = ({ member }) => (
  <>
    <Text className={styles.firstName}>{member.firstName}</Text>
    <Text
      className={`${styles.lastName} ${member.lastName.length > 12
        ? styles.small
        : member.lastName.length > 8
          ? styles.medium
          : ''
        }`}
    >
      {member.lastName}
    </Text>
  </>
)

const MemberCard = ({ member, index, firstRow }) => {
  const [flipped, setFlipped] = useState(false)
  const bioRef = useRef(null)
  const [bioScrolls, setBioScrolls] = useState(false)

  // A bio too long for the card scrolls. Give it a Tab stop then, so it can
  // be scrolled by keyboard in every browser (Chrome and Firefox add one
  // themselves; Safari doesn't).
  useEffect(() => {
    const bio = bioRef.current
    const measure = () => setBioScrolls(bio.scrollHeight > bio.clientHeight)
    const observer = new ResizeObserver(measure)
    observer.observe(bio)
    document.fonts.ready.then(measure)
    return () => observer.disconnect()
  }, [])

  // A mouse turns the card over by resting on it, which presses the button,
  // so a click on the button turns it back while the mouse is still there,
  // and leaving always turns it back. Touch and pen pointers are left out:
  // they can enter a card in the same moment as they tap its button, and the
  // tap would then undo the turn.
  const onPointerEnter = (e) => e.pointerType === 'mouse' && setFlipped(true)
  const onPointerLeave = (e) => e.pointerType === 'mouse' && setFlipped(false)

  // On a touch screen a tap anywhere on the card turns it over and back, as
  // the button does. A tap on the LinkedIn link just follows it. Mouse clicks
  // are left out, so selecting text in the bio doesn't turn the card.
  const onCardClick = (e) => {
    if (window.matchMedia('(hover: hover)').matches) return
    if (e.target.closest('a')) return
    setFlipped((f) => !f)
  }

  // The first row of the page's first subteam is on its first screen, so
  // those cards' entrance is in Team.module.css and runs from the page's
  // first paint, each card 0.1s after the one before it (--card is its
  // place in the row). The other cards rise in as they scroll into view.
  const Card = firstRow ? 'div' : motion.div
  const entrance = firstRow
    ? { style: { '--card': index } }
    : {
        'data-entrance': true,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.1 },
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: (index % 4) * 0.1, duration: 0.6 }
          }
        }
      }

  return (
    <Card
      id={`member-${member.id}`}
      className={[styles.card, flipped && styles.flipped, firstRow && styles.firstRow]
        .filter(Boolean)
        .join(' ')}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      {...entrance}
    >
      {/* Turns the card over and back. It is the keyboard's way to the bio,
          and the only one on a card with no link. It sits outside
          .cardInner, so a tap on it isn't also a tap on the card. */}
      <button
        type='button'
        className={styles.flipButton}
        aria-label={`Show bio for ${member.firstName} ${member.lastName}`}
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className={styles.turnOverIcon}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </span>
      </button>
      <div className={styles.cardInner} onClick={onCardClick}>
        <div className={styles.cardFront}>
          {/* The name is printed on the card, so the photo needs no alt */}
          <Image
            src={member.image || PLACEHOLDER_IMAGE}
            alt=''
            className={styles.memberImage}
            width={250}
            height={300}
            style={member.image ? undefined : PLACEHOLDER_STYLE}
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE
              Object.assign(e.target.style, PLACEHOLDER_STYLE)
            }}
          />
          <RoleTags member={member} />
          <Name member={member} />
          <Text className={styles.description}>{member.description}</Text>
        </div>
        <div className={styles.cardBack}>
          {/* Repeats the front, so screen readers skip it */}
          <div className={styles.colorTop} aria-hidden='true'>
            <RoleTags member={member} />
            <Name member={member} />
          </div>
          <Text
            ref={bioRef}
            className={styles.extendedDescription}
            tabIndex={bioScrolls ? 0 : undefined}
          >
            {member.extendedDescription}
          </Text>
          {member.link && member.link !== '#' && (
            <a
              href={member.link}
              className={styles.linkButton}
              target='_blank'
              rel='noopener noreferrer'
            >
              See LinkedIn
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

const MemberSearch = ({ team }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const members = useMemo(() => membersOf(team), [team])
  const search = query.trim().toLowerCase()
  const results = search
    ? members.filter((member) =>
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(search)
    )
    : []

  const goToMember = (id) => {
    const card = document.getElementById(`member-${id}`)
    if (!card) return
    // Focus the card's button so the next Tab carries on from the card
    card.querySelector('button').focus({ preventScroll: true })
    card.scrollIntoView({
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
      block: 'center'
    })
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown' && listRef.current) {
      e.preventDefault()
      listRef.current.querySelector('button').focus()
    } else if (e.key === 'Escape' && query) {
      setQuery('')
    }
  }

  // Arrow keys move between results; Escape goes back to the search box
  const onResultKeyDown = (e) => {
    const buttons = [...listRef.current.querySelectorAll('button')]
    const i = buttons.indexOf(e.currentTarget)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      buttons[Math.min(i + 1, buttons.length - 1)].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const previous = buttons[i - 1] || inputRef.current
      previous.focus()
    } else if (e.key === 'Escape') {
      inputRef.current.focus()
    }
  }

  return (
    <div className={styles.searchBar}>
      <TextInput
        ref={inputRef}
        label='Search team members'
        classNames={{ label: styles.visuallyHidden }}
        placeholder='Search for a member...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onInputKeyDown}
      />
      <p className={styles.visuallyHidden} role='status'>
        {search &&
          (results.length === 0
            ? 'No members found'
            : `${results.length} ${results.length === 1 ? 'member' : 'members'} found`)}
      </p>
      {results.length > 0 && (
        <ul
          ref={listRef}
          className={styles.searchResults}
          aria-label='Matching members'
        >
          {results.map((member) => (
            <li key={member.id}>
              <button
                type='button'
                className={styles.searchResultItem}
                onClick={() => goToMember(member.id)}
                onKeyDown={onResultKeyDown}
              >
                {member.firstName} {member.lastName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const MeetTeam = ({ year }) => {
  const team = teamData[year]
  const teamTitle = `${year.replace('-', ' - ')} Team`

  return (
    <>
      <PageMeta
        title={`Blackbird UAV | Meet the ${teamTitle}`}
        description={`The ${year} roster of Blackbird UAV, Carleton University's student UAV design team: all ${membersOf(team).length} members, with their roles and bios.`}
        path={`/MeetTheTeam/${year}`}
      />
      <Header imagePath='/images/team4.jpg' headerText={teamTitle} />
      {/* Keyed by year so that moving to another year's page starts every
          card and the search afresh, rather than keeping the state of the
          card that had the same member id */}
      <div className={styles.container} key={year}>
        <h2 className={styles.headerDescTitle}>Meet the Team</h2>
        <div className={styles.headerDesc}>
          {team.description && <div>{team.description}</div>}
        </div>
        {year === LATEST_YEAR && <MemberSearch team={team} />}
        {subteamsOf(team).map((subteam, subteamIndex) => (
          <div
            className={`${styles.subteam} ${styles[subteam.replace(/\s+/g, '')] || ''}`}
            key={subteam}
          >
            <div className={styles.subteamContent}>
              <h2 className={styles.sidebar}>
                <span className={styles.sidebarText}>
                  {subteam.charAt(0).toUpperCase() + subteam.slice(1)}
                </span>
              </h2>
              <div className={styles.grid}>
                {[...team[subteam]]
                  .sort((a, b) => rank(b) - rank(a))
                  // A row holds 4 cards at most. Where it holds fewer, the
                  // rest of the first 4 make their entrance as the page
                  // opens, not as they scroll into view.
                  .map((member, index) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      index={index}
                      firstRow={subteamIndex === 0 && index < 4}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// Without these, `output: 'export'` emits a single literal [year].html whose
// __NEXT_DATA__ carries an empty query, so a direct load (typed URL, refresh,
// shared link) never resolves `year`. One page per year fixes that; in-app
// navigation was unaffected either way. With fallback: false, no other year
// can reach the page.
export async function getStaticPaths () {
  return {
    paths: Object.keys(teamData)
      .filter(isYear)
      .map((year) => ({ params: { year } })),
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  return { props: { year: params.year } }
}

export default MeetTeam
