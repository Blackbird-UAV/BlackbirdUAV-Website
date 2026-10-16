import { useId, useState } from 'react'
import styles from '@/styles/Accordion.module.css'

// One answer open at a time. Follows the WAI-ARIA accordion pattern: each
// question is a button in a heading that says whether its answer is
// expanded, and closed answers are hidden from everyone, screen readers
// included.
const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const id = useId()

  return (
    <div className={styles.accordion}>
      {data.map((item, index) => {
        const open = activeIndex === index
        const buttonId = `${id}-question-${index}`
        const panelId = `${id}-answer-${index}`
        return (
          <div key={item.question}>
            <h3>
              <button
                type='button'
                id={buttonId}
                className={styles.accordionTrigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActiveIndex(open ? null : index)}
              >
                {item.question}
                <span
                  className={`${styles.arrow} ${open ? styles.open : ''}`}
                  aria-hidden='true'
                >
                  &#9660;
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role='region'
              aria-labelledby={buttonId}
              className={styles.accordionContent}
              hidden={!open}
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
