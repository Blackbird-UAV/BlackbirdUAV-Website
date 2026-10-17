import Image from 'next/image'
import { motion } from 'motion/react'
import styles from '@/styles/Join.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlane,
  faBolt,
  faComputer,
  faUsers,
  faClipboard
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { useRef, useState } from 'react'
import Header from '@/components/Header'
import PageMeta from '@/components/PageMeta'
import { slideFromLeft, slideFromRight } from '@/components/animations'

const tabs = [
  {
    id: 1,
    title: 'Electrical',
    tagline:
      'Powering innovation – where circuitry meets the sky.',
    content:
      "Electrical is the powerhouse behind our UAVs. From helping with software design to integrating complex electrical systems, this team ensures that every UAV flies with precision and control. You’ll work with cutting-edge technologies, including flight control systems, sensors, and communications equipment. You’ll be at the heart of UAV technology, pushing the limits of innovation with every flight.",
    image: {
      src: '/images/Join/Join_Design.jpg',
      width: 673,
      height: 436,
      alt: 'Team members at laptops around a workshop table covered in cables and parts'
    },
    icon: faBolt,
    color: '#7ed957'
  },
  {
    id: 2,
    title: 'Mechanical',
    tagline:
      'Building the backbone of innovation – strong, reliable, and ready for takeoff.',
    content:
      "The Mechanical Team is where ideas take flight — transforming concepts into high-performance UAVs that balance cutting-edge technology, precision engineering, and sleek design.   Here, you’ll gain hands-on experience assembling and fine-tuning components, working with advanced fabrication techniques such as 3D printing and composite materials to ensure every part is built for peak performance. Join us to develop real-world skills in fabrication and engineering — and leave your mark on the future of flight.",
    image: {
      src: '/images/Join/Join_Manufacturing.jpg',
      width: 1500,
      height: 1000,
      alt: 'Team members in safety vests working on an aircraft on a table at the airfield'
    },
    icon: faPlane,
    color: '#ff3131'
  },
  {
    id: 3,
    title: 'Software',
    tagline:
      'Coding the skies – developing intelligent systems for autonomous flight.',
    content:
      "The Software team is at the forefront of our UAV's intelligence and autonomy. As a member of this team, you'll dive into programming flight control systems, developing algorithms for navigation, and working with electrical components that make operating our UAVs seamless. If you're passionate about coding and eager to see your software take to the skies, this is the perfect team for you!",
    image: {
      src: '/images/Join/Join_Systems.jpg',
      width: 1500,
      height: 1000,
      alt: "A team member wiring the electronics under an aircraft's wing in a hangar"
    },
    icon: faComputer,
    color: '#ff914d'
  },
  {
    id: 4,
    title: 'Administration',
    tagline:
      'The heart of the operation – keeping everything running like clockwork.',
    content:
      "The Administration team is crucial to the success of Blackbird UAV. You’ll manage schedules, resources, and communication, ensuring that everything stays on track throughout the season. This is a great opportunity for leaders who are organized and passionate about project management. You'll be the glue that keeps the team together and running efficiently, coordinating tasks and ensuring deadlines are met so that every team can do its best work.",
    image: {
      src: '/images/Join/Join_Administration.jpg',
      width: 1500,
      height: 1000,
      alt: 'Two team members reading through a binder outdoors beside a camera tripod'
    },
    icon: faUsers,
    color: '#f6b93b'
  },
  {
    id: 5,
    title: 'Operations',
    tagline:
      'Flying high with precision – ensuring every mission is executed to perfection.',
    content:
      "The Operations team is responsible for making sure every UAV flight is executed flawlessly. You’ll be directly involved in mission planning, safety protocols, and flight coordination. Whether it’s navigating through challenging conditions or managing team logistics, the Operations team is integral to making each mission a success. If you're detail-oriented, love a challenge, and enjoy the thrill of real-time problem solving, this is the team for you!",
    image: {
      src: '/images/Join/Join_Operations.jpg',
      width: 1500,
      height: 1000,
      alt: 'Team members at laptops in a tent at the flying field, one of them on the phone'
    },
    icon: faClipboard,
    color: '#5ce1e6'
  }
]

// Ids for each subteam's tab and panel, e.g. electrical-tab
const tabId = (tab) => `${tab.title.toLowerCase()}-tab`
const panelId = (tab) => `${tab.title.toLowerCase()}-panel`

export default function Join () {
  const [activeId, setActiveId] = useState(tabs[0].id)
  const tabRefs = useRef([])

  // The tabs are one Tab stop; the arrow keys (either pair, as the tabs
  // stack on phones), Home and End move between them and show that panel
  const handleTabKeyDown = (event, index) => {
    const last = tabs.length - 1
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActiveId(tabs[next].id)
    tabRefs.current[next].focus()
  }

  return (
    <>
      <PageMeta
        title='Blackbird UAV | Join the Team'
        description="Join Blackbird UAV, Carleton University's student UAV design team. Meet our electrical, mechanical, software, administration and operations subteams."
        path='/joinTheTeam'
      />
      <Header imagePath='/images/JoinUsMedia.jpg' headerText='Join the Team' />

      <div className={styles.pageWrapper}>
        <div className={styles.contentContainer}>
          {/* About us box. It is on the first screen, so its entrance is in
              Join.module.css and runs from the page's first paint. */}
          <div className={styles.aboutUs}>
            <div className={styles.leftContent}>
              <Image
                src='/images/JoinUsMedia.jpg'
                alt='Team members in safety vests walking across an airfield, carrying aircraft'
                className={styles.aboutUsImage}
                width={600}
                height={500}
              />
            </div>
            <div className={styles.rightContent}>
              <h2>Join Us Today!</h2>
              <p>
                Be part of a team that is at the forefront of UAV technology.
                Collaborate, innovate, and soar to new heights with us.
                Interested in learning more about our subteams? Look below!
              </p>
              <a
                href='https://discord.gg/Spw3F6KrCn'
                target='_blank'
                rel='noreferrer'
                className={styles.discordButton}
              >
                <FontAwesomeIcon icon={faDiscord} width={24} height={24} />
                <span>Discord Server</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.wavesJoin}>
          <svg
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <path
              d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
              opacity='.25'
              className={styles.wavesJoinFill}
            />
            <path
              d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
              opacity='.5'
              className={styles.wavesJoinFill}
            />
            <path
              d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
              className={styles.wavesJoinFill}
            />
          </svg>
        </div>

        {/* Subteams */}
        <div className={styles.backgroundContainer}>
          <motion.div
            data-entrance
            className={styles.leftSubteams}
            variants={slideFromLeft}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 id='subteams-heading'>Introducing Our Subteams</h2>
            <p className={styles.subteamsDescription}>
              Explore the teams that make Blackbird UAV soar. Each subteam plays
              a vital role in our success, from design to operations.
            </p>
          </motion.div>
          <motion.div
            data-entrance
            className={styles.rightSubteams}
            variants={slideFromRight}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.subteamSection}>
              <div
                className={styles.tabs}
                role='tablist'
                aria-labelledby='subteams-heading'
              >
                {tabs.map((tab, index) => {
                  const selected = tab.id === activeId
                  return (
                    <button
                      key={tab.id}
                      ref={(element) => {
                        tabRefs.current[index] = element
                      }}
                      type='button'
                      role='tab'
                      id={tabId(tab)}
                      aria-selected={selected}
                      aria-controls={panelId(tab)}
                      tabIndex={selected ? 0 : -1}
                      className={`${styles.tab} ${selected ? styles.active : ''}`}
                      style={{ '--tab-color': tab.color }}
                      onClick={() => setActiveId(tab.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                    >
                      <FontAwesomeIcon
                        icon={tab.icon}
                        style={{ marginRight: '8px', width: '20px' }}
                      />
                      {tab.title}
                    </button>
                  )
                })}
              </div>

              {/* Every panel is in the page, so its text is too; only the
                  selected one shows */}
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  id={panelId(tab)}
                  role='tabpanel'
                  aria-labelledby={tabId(tab)}
                  tabIndex={0}
                  hidden={tab.id !== activeId}
                  className={styles.carouselContent}
                >
                  <div className={styles.textSection}>
                    <p className={styles.tagline}>{tab.tagline}</p>
                    <p>{tab.content}</p>
                  </div>
                  <div className={styles.imageSection}>
                    <Image
                      src={tab.image.src}
                      alt={tab.image.alt}
                      width={tab.image.width}
                      height={tab.image.height}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
