// Icons for the pause/play buttons on the auto-advancing photo carousels.
// The buttons carry the accessible name, so the icons are hidden from AT.
export const PauseIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' fill='currentColor' />
  </svg>
)

export const PlayIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M8 5v14l11-7z' fill='currentColor' />
  </svg>
)
