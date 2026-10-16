const DURATIONS = {
  VeryFast: 0.3,
  Fast: 0.6,
  Normal: 0.8,
  Slow: 1.2,
  VerySlow: 1.8
}
// The home hero's and the sponsor page's entrances, which are CSS, use the
// same curve
const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUpSlower = {
  initial: {
    y: 80,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.Slow,
      ease: easing
    }
  }
}

const slideFromLeft = {
  initial: {
    x: -100, // Start off-screen to the left
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.Normal,
      ease: easing
    }
  }
}

const slideFromRight = {
  initial: {
    x: 100, // Start off-screen to the right
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.Normal,
      ease: easing
    }
  }
}

export {
  DURATIONS,
  easing,
  fadeInUpSlower,
  slideFromLeft,
  slideFromRight
}
