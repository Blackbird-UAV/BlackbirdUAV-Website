import styles from '@/styles/AwardBadge.module.css'

// Inline SVG rather than image files — these render at a small size on a dark
// card, so vectors stay crisp and cost nothing to deploy.

const MedalIcon = ({ variant, from, to }) => (
  <svg
    className={styles.icon}
    viewBox='0 0 24 24'
    width='22'
    height='22'
    aria-hidden='true'
    focusable='false'
  >
    <defs>
      <linearGradient id={`medal-${variant}`} x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor={from} />
        <stop offset='100%' stopColor={to} />
      </linearGradient>
    </defs>
    {/* ribbon tails */}
    <path d='M8.2 1.5 5 8.2l3.4 1.6L11.2 3.4z' fill='#eb1d25' />
    <path d='M15.8 1.5 19 8.2l-3.4 1.6L12.8 3.4z' fill='#b3161c' />
    {/* medal disc */}
    <circle
      cx='12'
      cy='15.4'
      r='6.6'
      fill={`url(#medal-${variant})`}
      stroke='rgba(0,0,0,0.35)'
      strokeWidth='0.6'
    />
    <circle
      cx='12'
      cy='15.4'
      r='4.3'
      fill='none'
      stroke='rgba(0,0,0,0.22)'
      strokeWidth='0.9'
    />
  </svg>
)

const StarIcon = () => (
  <svg
    className={styles.icon}
    viewBox='0 0 24 24'
    width='22'
    height='22'
    aria-hidden='true'
    focusable='false'
  >
    <defs>
      <linearGradient id='medal-innovation' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='#8FB4FF' />
        <stop offset='100%' stopColor='#4A6FD4' />
      </linearGradient>
    </defs>
    <path
      d='M12 2.2l2.7 6.4 6.9.56-5.25 4.5 1.6 6.74L12 16.85 6.05 20.4l1.6-6.74L2.4 9.16l6.9-.56z'
      fill='url(#medal-innovation)'
      stroke='rgba(0,0,0,0.3)'
      strokeWidth='0.6'
      strokeLinejoin='round'
    />
  </svg>
)

const VARIANTS = {
  gold: {
    className: styles.gold,
    icon: <MedalIcon variant='gold' from='#F7D268' to='#C99312' />
  },
  silver: {
    className: styles.silver,
    icon: <MedalIcon variant='silver' from='#E6E9EE' to='#9AA3AE' />
  },
  bronze: {
    className: styles.bronze,
    icon: <MedalIcon variant='bronze' from='#E8A874' to='#A2622F' />
  },
  innovation: {
    className: styles.innovation,
    icon: <StarIcon />
  }
}

const AwardBadge = ({ variant, label, detail }) => {
  const award = VARIANTS[variant]
  if (!award) return null

  return (
    <span className={`${styles.badge} ${award.className}`}>
      {award.icon}
      <span className={styles.label}>{label}</span>
      {detail && <span className={styles.detail}>{detail}</span>}
    </span>
  )
}

export default AwardBadge
