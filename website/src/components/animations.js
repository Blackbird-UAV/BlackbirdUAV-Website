const DURATIONS = {
  VeryFast: 0.3,
  Fast: 0.6,
  Normal: 0.8,
  Slow: 1.2,
  VerySlow: 1.8
}
// Some of the entrances on the first screen, which are CSS, use the same
// curve: the home hero, the /sponsor sidebar and logos, the first aircraft
// on /vehicles and the intro on /joinTheTeam. The others there (the page
// titles, the /sponsor tiers and the first row of Meet the Team cards) ease
// out.
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
