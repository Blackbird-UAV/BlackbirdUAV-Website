const DURATIONS = {
  VeryFast: 0.3,
  Fast: 0.6,
  Normal: 0.8,
  Slow: 1.2,
  VerySlow: 1.8
}
const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.Normal,
      ease: easing
    }
  }
}

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

const fadeInUpDelayed = {
  initial: {
    y: 80,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: DURATIONS.Slow,
      ease: easing
    }
  }
}

const simpleOpacity = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: easing
    }
  }
}

const scaleUp = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    opacity: [0, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: DURATIONS.VerySlow,
      ease: easing
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
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

const slideFromLeftDelayed = {
  initial: {
    x: -100, // Start off-screen to the left
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
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
  fadeInUp,
  fadeInUpSlower,
  fadeInUpDelayed,
  stagger,
  simpleOpacity,
  scaleUp,
  slideFromLeft,
  slideFromRight,
  slideFromLeftDelayed
}
