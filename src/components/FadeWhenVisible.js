import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { fadeInUpSlower } from '@/components/animations'

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.3
  })

  useEffect(() => {
    if (inView) {
      controls.start('animate')
    }
  }, [controls, inView])

  // New animation to stagger children fading in
  const staggerVariants = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between child animations
        delayChildren: 0.2 // Optional: Add initial delay before first child animation
      }
    }
  }

  return (
    <motion.div
      style={{ margin: 0 }}
      ref={ref}
      animate={controls}
      initial='hidden'
      variants={staggerVariants} // Apply stagger variant here
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={fadeInUpSlower} // Apply individual child fade-in animation
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default FadeInWhenVisible
