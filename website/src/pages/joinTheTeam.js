import Head from "next/head";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faDraftingCompass, faPlane, faCogs, faUsers, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Accordion, Group, Text } from '@mantine/core';

const accordionItems = [
  {
    icon: faDraftingCompass,
    value: 'Design',
    description: 'Creative UAV designs',
    content: 'Focus on creative and innovative UAV designs, combining cutting-edge aesthetics with functionality.',
    image: '/images/vehicle1.jpg',
    color: '#30b463',
  },
  {
    icon: faPlane,
    value: 'Manufacturing',
    description: 'Engineering robust UAV structures',
    content: 'Design and construct UAV structures that are strong, reliable, and lightweight for optimal performance.',
    image: '/images/vehicle2.jpg',
    color: '#e01d19'
  },
  {
    icon: faCogs,
    value: 'Systems',
    description: 'Advanced UAV systems',
    content: 'Develop sophisticated systems and software that power modern UAV technology.',
    image: '/images/vehicle3.jpg',
    color: '#e94e77',
  },
  {
    icon: faUsers,
    value: 'Administration',
    description: 'Managing team and logistics',
    content: 'Handle team operations, ensuring smooth collaboration and efficient resource management.',
    image: '/images/vehicle4.jpg',
    color: '#f6b93b'
  },
  {
    icon: faClipboard,
    value: 'Operations',
    description: 'Overseeing UAV missions',
    content: 'Coordinate UAV operations, ensuring missions are conducted safely and efficiently.',
    image: '/images/vehicle5.jpg',
    color: '#6553e0'
  }
];

// This is the top label that acts as a button to reveal the content
function AccordionLabel({ icon, value, description, color }) {
  return (
      <Group noWrap style={{ justifyContent: 'space-between', width: '100%' }}>
        <div className={styles.accordionLabelLR}>
          <div>
            <FontAwesomeIcon icon={icon} size="2x" className={styles.accordionLabelIcon} style={{ color }} />
          </div>
          <div>
            <Text ta="left" className={styles.accordionLabelValue}>{value}</Text>
            <Text ta="left" className={styles.accordionLabelDescription}>
              {description}
            </Text>
          </div>
        </div>
      </Group>
  );
}

export default function Join() {
  const [selectedImage, setSelectedImage] = useState(accordionItems[0].image);
  const [currentAccordionValue, setCurrentAccordionValue] = useState("Design");

  return (
    <>
      <Head>
        <title>Join the Team</title>
        <meta
          name="description"
          content="Join Black Bird UAV - Be a part of a cutting-edge UAV community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.banner}>
          <img src="/images/JoinUsMedia.jpg" alt="Join Us Banner" />
      </div>

      <div className={styles.contentContainer}>
        
        {/* Top banner */}
        <div className={styles.gradientTextContainer}>
          <h1 className={styles.bigHeader}>
            Join a team of innovators,
          </h1>
          <h1 className={styles.bigHeaderGradient}>
            <strong>Fly around and find out.</strong>
          </h1>
        </div>

        {/* About us box */}
        <div className={styles.aboutUs}>
          <div className={styles.leftContent}>
            <img src="/images/JoinUsMedia.jpg" alt="Join Us" className={styles.aboutUsImage} />
          </div>
          <div className={styles.rightContent}>
            <h3>Join Us Today!</h3>
            <p>
              Be part of a team that is at the forefront of UAV technology. Collaborate, innovate, and soar to new heights with us. Interested in learning more about our subteams? Look below!
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

        {/* Accordion subteams */}
        <div className={styles.accordionSection}>

          <div className={styles.leftContent}>
            <div className={styles.accordionHeightWrapper}>
            <Accordion
                className={styles.accordionStyles}
                chevron={
                  <div className={styles.accordionLabelChevron}>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                }
                defaultValue="Design"
                onChange={(value) => {
                  if (value !== currentAccordionValue) {
                    const selectedItem = accordionItems.find(item => item.value === value);
                    if (selectedItem) {
                      setSelectedImage(selectedItem.image);
                      setCurrentAccordionValue(value);
                    }
                  }
                }}
              >
                {accordionItems.map((item) => (
                  <Accordion.Item key={item.value} value={item.value} className={styles.accordionItem}>
                    <Accordion.Control
                      className={`
                        ${styles.accordionControl} 
                        ${currentAccordionValue === item.value ? styles.selected : ''}
                        `}
                    >
                      <AccordionLabel 
                        icon={item.icon}
                        value={item.value} 
                        description={item.description}
                        color={item.color}
                      />
                    </Accordion.Control>
                    <Accordion.Panel className={styles.accordionPanel}>
                      {item.content}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
          </div>
          </div>

          <div className={styles.rightContent}>
            <img src={selectedImage} alt="Selected" className={styles.accordionImage} />
          </div>
        </div>
      </div>
    </>
  );
}
