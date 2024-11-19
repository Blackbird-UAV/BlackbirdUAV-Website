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
    image: '/images/vehicle1.jpg'
  },
  {
    icon: faPlane,
    value: 'Structures',
    description: 'Engineering robust UAV structures',
    content: 'Design and construct UAV structures that are strong, reliable, and lightweight for optimal performance.',
    image: '/images/vehicle2.jpg'
  },
  {
    icon: faCogs,
    value: 'Systems',
    description: 'Advanced UAV systems',
    content: 'Develop sophisticated systems and software that power modern UAV technology.',
    image: '/images/vehicle3.jpg'
  },
  {
    icon: faUsers,
    value: 'Administration',
    description: 'Managing team and logistics',
    content: 'Handle team operations, ensuring smooth collaboration and efficient resource management.',
    image: '/images/vehicle4.jpg'
  },
  {
    icon: faClipboard,
    value: 'Operations',
    description: 'Overseeing UAV missions',
    content: 'Coordinate UAV operations, ensuring missions are conducted safely and efficiently.',
    image: '/images/vehicle5.jpg'
  }
];

// This is the top label that acts as a button to reveal the content
function AccordionLabel({ icon, value, description }) {
  return (
      <Group noWrap>
        <FontAwesomeIcon icon={icon} size="2x" style={{ marginRight: '10px' }} />
        <div>
          <Text ta="left" className={styles.accordionLabelValue}>{value}</Text>
          <Text ta="left" className={styles.accordionLabelDescription}>
            {description}
          </Text>
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
          <Accordion
              chevronPosition="right"
              radius="md"
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
                    // icon={<FontAwesomeIcon icon={faChevronDown} />}
                  >
                    <AccordionLabel 
                      icon={<FontAwesomeIcon icon={item.icon} />}
                      value={item.value} 
                      description={item.description}
                    />
                  </Accordion.Control>
                  <Accordion.Panel className={styles.accordionPanel}>
                    {item.content}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          <div className={styles.rightContent}>
            <img src={selectedImage} alt="Selected" className={styles.aboutUsImage} />
          </div>
        </div>
      </div>
    </>
  );
}
