import Head from "next/head";
import styles from "@/styles/Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Accordion } from '@mantine/core';

const accordionItems = [
  { value: 'Design', emoji: '🟢', description: 'Focus on creative and innovative UAV designs.', image: '/images/vehicle1.jpg' },
  { value: 'Structures', emoji: '🔴', description: 'Engineering robust and reliable structures.', image: '/images/vehicle2.jpg' },
  { value: 'Systems', emoji: '🟣', description: 'Developing advanced UAV systems and software.', image: '/images/vehicle3.jpg' },
  { value: 'Administration', emoji: '🟡', description: 'Managing team operations and logistics.', image: '/images/vehicle4.jpg' },
  { value: 'Operations', emoji: '🔵', description: 'Overseeing UAV operations and missions.', image: '/images/vehicle2.jpg' },
];

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

      <div className={styles.contentContainer}>
        <div className={styles.banner}>
          <img src="/images/JoinUsMedia.jpg" alt="Join Us Banner" />
        </div>

        <div className={styles.gradientTextContainer}>
          <h1 className={styles.bigHeader}>
            <strong>Fly around and find out</strong>
          </h1>
        </div>

        <div className={styles.aboutUs}>
          <div className={styles.leftContent}>
            <img src="/images/JoinUsMedia.jpg" alt="Join Us" className={styles.aboutUsImage} />
          </div>
          <div className={styles.rightContent}>
            <h3>About Us</h3>
            <p>
              Be part of a team that is at the forefront of UAV technology. Collaborate, innovate, and soar to new heights with us.
            </p>
            <a
              href="https://discord.gg/Spw3F6KrCn"
              target="_blank"
              rel="noreferrer"
              className={styles.discordButton}
            >
              <FontAwesomeIcon icon={faDiscord} width={24} height={24} />
              <span>Join us on Discord!</span>
            </a>
          </div>
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.leftContent}>
            <img src={selectedImage} alt="Selected" className={styles.aboutUsImage} />
          </div>
          <div className={styles.rightContent}>
            <Accordion
              chevronPosition="left"
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
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control 
                    className={`${styles.accordionControl} ${currentAccordionValue === item.value ? styles.selected : ''}`} 
                    icon={item.emoji}
                  >
                    {item.value}
                  </Accordion.Control>
                  <Accordion.Panel className={styles.accordionPanel}>
                    {item.description}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
