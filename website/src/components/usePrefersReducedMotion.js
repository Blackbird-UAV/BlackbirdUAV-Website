import { useSyncExternalStore } from 'react'

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribe (onChange) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

// The OS's reduce-motion setting, kept up to date. False in the server HTML
// and while hydrating, so both render the same markup.
export default function usePrefersReducedMotion () {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )
}
