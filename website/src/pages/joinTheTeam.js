import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faDraftingCompass,
  faPlane,
  faCogs,
  faUsers,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Accordion, Group, Text } from "@mantine/core";
import Header from "@/components/Header";

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
        <title>BlackBird UAV | Join the Team</title>
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
            <div className={styles.leftContent}>
              <img
                src="/images/JoinUsMedia.jpg"
                alt="Join Us"
                className={styles.aboutUsImage}
              />
            </div>
            <div className={styles.rightContent}>
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
            </div>
          </div>

          {/* Subteams */}
          <div className={styles.backgroundContainer}>
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
                  <img
                    src={activeTab.image}
                    alt={`Image for ${activeTab.title}`}
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
