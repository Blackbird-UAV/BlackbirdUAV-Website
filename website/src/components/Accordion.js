import { useState } from 'react'
import styles from '@/styles/Accordion.module.css'

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={styles.accordion}>
      {data.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <button
            className={styles.accordionTrigger}
            onClick={() => toggleItem(index)}
          >
            {item.question}
            <span
              className={`${styles.arrow} ${
                activeIndex === index ? styles.open : ''
              }`}
            >
              &#9660;
            </span>
          </button>
          <div
            className={`${styles.accordionContent} ${
              activeIndex === index ? styles.open : ''
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
