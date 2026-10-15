import Image from 'next/image'
import { motion } from 'motion/react'
import {
  fadeInUp,
  stagger,
  scaleUp,
  simpleOpacity
} from '@/components/animations'
import styles from '@/styles/SponsorSidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faDonate,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons'

const redHover = {
  scale: 1.05,
  backgroundColor: '#e91c23',
  boxShadow: '0 0px 15px rgba(233, 28, 35, 0.5)',
  filter: 'brightness(1.2)'
}
const blueHover = {
  scale: 1.05,
  backgroundColor: '#4169e1',
  boxShadow: '0 0px 15px rgba(65, 105, 225, 0.5)',
  filter: 'brightness(1.2)'
}
const tap = { scale: 0.95 }

const SponsorSidebar = () => (
  // Fades without sliding, so /sponsor#donate stays where the browser
  // scrolled it instead of rising under the navbar
  <motion.div
    className={styles.sidebar}
    initial='initial'
    animate='animate'
    variants={simpleOpacity}
  >
    <div className={styles.container}>
      <motion.div className={styles.stack} variants={stagger}>
        <motion.h1 className={styles.title} variants={fadeInUp}>
          Sponsorships
        </motion.h1>
        <div className={styles.card}>
          <div className={styles.intro}>
            <div>
              <motion.h2 className={styles.subtitle} variants={fadeInUp}>
                What do sponsors do?
              </motion.h2>
              <motion.p className={styles.introText} variants={fadeInUp}>
                Sponsors play a vital role in helping us achieve our goals.
                Their generous contributions enable us to participate in
                competitions and enhance our resources year by year.
                <br />
                <br />
                There are many ways to support our team. For more
                information, please read our sponsorship package.
              </motion.p>
              <div className={styles.packageButtonWrap}>
                <motion.a
                  className={`${styles.button} ${styles.red} ${styles.packageButton}`}
                  href='/assets/bbuavsponsorpackage2025.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  variants={scaleUp}
                  whileHover={redHover}
                  whileTap={tap}
                >
                  Sponsorship Package{' '}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </motion.a>
              </div>
            </div>
            <motion.div className={styles.photoWrap} variants={fadeInUp}>
              <Image
                className={styles.photo}
                src='/images/Sponsor_TeamWorking.jpg'
                alt='Three team members working on a fixed-wing drone set on a folding table outdoors'
                width={800}
                height={450}
                loading='eager'
              />
            </motion.div>
          </div>

          <div className={styles.divider} />

          <div id='donate' className={styles.donate}>
            <motion.p className={styles.donateText} variants={fadeInUp}>
              If you or your company are interested in sponsoring Blackbird UAV
              or have any questions, please reach out to sponsor@blackbirduav.ca
              to start the sponsorship process and learn about next steps.
            </motion.p>
            <div className={styles.donateButtons}>
              <motion.a
                className={`${styles.button} ${styles.red} ${styles.contactButton}`}
                href='mailto:sponsor@blackbirduav.ca?subject=Blackbird%20UAV%20Sponsorship'
                variants={scaleUp}
                whileHover={redHover}
                whileTap={tap}
              >
                Send us an email <FontAwesomeIcon icon={faEnvelope} />
              </motion.a>
              <motion.a
                className={`${styles.button} ${styles.blue} ${styles.contactButton} ${styles.donateButton}`}
                href='https://futurefunder.carleton.ca/giving-fund/blackbird-uav-national-design-competition/'
                target='_blank'
                rel='noopener noreferrer'
                variants={scaleUp}
                whileHover={blueHover}
                whileTap={tap}
              >
                Donate <FontAwesomeIcon icon={faDonate} />
              </motion.a>
            </div>
            <motion.p className={styles.note} variants={fadeInUp}>
              * Note: Unlike sponsorships, donations do not provide corporate
              benefits or recognition in return.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
)

export default SponsorSidebar
