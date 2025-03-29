import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faPlane,
  faCogs,
  faUsers,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Header from "@/components/Header";
import { slideFromLeft, slideFromRight } from "@/components/animations";

const tabs = [
  {
    id: 1,
    title: "Design",
    tagline:
      "Where creativity meets precision – designing the future, one UAV at a time.",
    content:
      "The Design team brings ideas to life, crafting UAVs that balance cutting-edge technology with sleek, functional aesthetics. You’ll have the chance to work with top-tier design software and collaborate with experts in aerodynamics and user-centered design. Your contributions will directly shape the performance and look of our UAVs, making them stand out on the competition stage. Join us and leave your mark on the future of flight!",
    image: "/images/Join/Join_Design.jpg",
    icon: faDraftingCompass,
    color: "#30b463",
  },
  {
    id: 2,
    title: "Manufacturing",
    tagline:
      "Building the backbone of innovation – strong, reliable, and ready for takeoff.",
    content:
      "The Manufacturing team is where ideas become reality. Here, you'll have hands-on experience assembling and fine-tuning UAV components, ensuring every part is precisely built for peak performance. From 3D printing to composite materials, we use cutting-edge techniques to create UAVs that withstand the challenges of competition. Join us and gain real-world skills in fabrication and engineering, all while bringing your designs to life.",
    image: "/images/Join/Join_Manufacturing.jpg",
    icon: faPlane,
    color: "#e01d19",
  },
  {
    id: 3,
    title: "Systems",
    tagline:
      "Crafting the brains behind the wings – sophisticated systems, seamless flight.",
    content:
      "Systems is the powerhouse behind our UAVs. From designing software to integrating complex electrical systems, this team ensures that every UAV flies with precision and control. You’ll work with cutting-edge technologies, including flight control systems, sensors, and communications equipment. Whether coding, debugging, or testing, you’ll be at the heart of UAV technology, pushing the limits of innovation with every flight.",
    image: "/images/Join/Join_Systems.jpg",
    icon: faCogs,
    color: "#e94e77",
  },
  {
    id: 4,
    title: "Administration",
    tagline:
      "The heart of the operation – keeping everything running like clockwork.",
    content:
      "The Administration team is crucial to the success of Blackbird UAV. You’ll manage schedules, resources, and communication, ensuring that everything stays on track throughout the season. This is a great opportunity for leaders who are organized and passionate about project management. You'll be the glue that keeps the team together and running efficiently, coordinating tasks and ensuring deadlines are met so that every team can do its best work.",
    image: "/images/Join/Join_Administration.jpg",
    icon: faUsers,
    color: "#f6b93b",
  },
  {
    id: 5,
    title: "Operations",
    tagline:
      "Flying high with precision – ensuring every mission is executed to perfection.",
    content:
      "The Operations team is responsible for making sure every UAV flight is executed flawlessly. You’ll be directly involved in mission planning, safety protocols, and flight coordination. Whether it’s navigating through challenging conditions or managing team logistics, the Operations team is integral to making each mission a success. If you're detail-oriented, love a challenge, and enjoy the thrill of real-time problem solving, this is the team for you!",
    image: "/images/Join/Join_Operations.jpg",
    icon: faClipboard,
    color: "#6553e0",
  },
];

export default function Join() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <Head>
        <title>Blackbird UAV | Join the Team</title>
        <meta
          name="description"
          content="Join Black Bird UAV - Be a part of a cutting-edge UAV community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header imagePath="/images/JoinUsMedia.jpg" headerText="Join the Team" />

      <div className={styles.pageWrapper}>
        {/* <div className={styles.banner}>
          <img src="/images/JoinUsMedia.jpg" alt="Join Us Banner" />
        </div> */}

        <div className={styles.contentContainer}>
          {/* About us box */}
          <div className={styles.aboutUs}>
            <motion.div
              className={styles.leftContent}
              variants={slideFromLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image
                src="/images/JoinUsMedia.jpg"
                alt="Join Us"
                className={styles.aboutUsImage}
                width={600}
                height={500}
              />
            </motion.div>
            <motion.div
              className={styles.rightContent}
              variants={slideFromRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3>Join Us Today!</h3>
              <p>
                Be part of a team that is at the forefront of UAV technology.
                Collaborate, innovate, and soar to new heights with us.
                Interested in learning more about our subteams? Look below!
              </p>
              <a
                href="https://discord.gg/Spw3F6KrCn"
                target="_blank"
                rel="noreferrer"
                className={styles.discordButton}
              >
                <FontAwesomeIcon icon={faDiscord} width={24} height={24} />
                <span>Discord Server</span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className={styles.wavesJoin}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={styles.wavesJoinFill}
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={styles.wavesJoinFill}
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={styles.wavesJoinFill}
            />
          </svg>
        </div>

        {/* Subteams */}
        <div className={styles.backgroundContainer}>
          <motion.div
            className={styles.leftSubteams}
            variants={slideFromLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1>Introducing Our Subteams</h1>
            <p className={styles.subteamsDescription}>
              Explore the teams that make Blackbird UAV soar. Each subteam plays
              a vital role in our success, from design to operations.
            </p>
          </motion.div>
          <motion.div
            className={styles.rightSubteams}
            variants={slideFromRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.subteamSection}>
              {/* Subteams: Clickable Tabs */}
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tab} ${
                      activeTab.id === tab.id ? styles.active : ""
                    }`}
                    style={{
                      "--tab-color": tab.color,
                      color: activeTab.id === tab.id ? "white" : tab.color,
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    <FontAwesomeIcon
                      icon={tab.icon}
                      style={{ marginRight: "8px", width: "20px" }}
                    />
                    {tab.title}
                    {/* <FontAwesomeIcon
                          icon={tab.icon}
                          style={{
                            color: activeTab.id === tab.id ? "white" : tab.color,
                            marginLeft: "12px",
                          }}
                        /> */}
                  </button>
                ))}
              </div>

              {/* Subteams: Content Carousel */}
              <div className={styles.carouselContent}>
                <div className={styles.textSection}>
                  <div className={styles.tagline}>{activeTab.tagline}</div>
                  {activeTab.content}
                </div>
                <div className={styles.imageSection}>
                  <Image
                    src={activeTab.image}
                    alt={`Image for ${activeTab.title}`}
                    className={styles.image}
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
