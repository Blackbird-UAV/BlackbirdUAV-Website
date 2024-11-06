import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Sponsor.module.css";
import { useEffect } from "react";

const sponsors = [
  {
    name: "Company One",
    logo: "/images/company1.jpg",
    link: "https://company1.com",
    tier: "platinum",
  },
  {
    name: "Company Two",
    logo: "/images/company2.jpg",
    link: "https://company2.com",
    tier: "gold",
  },
  {
    name: "Company Three",
    logo: "/images/company3.jpg",
    link: "https://company3.com",
    tier: "silver",
  },
  {
    name: "Company Four",
    logo: "/images/company4.jpg",
    link: "https://company4.com",
    tier: "silver",
  },
  {
    name: "Company Five",
    logo: "/images/company1.jpg",
    link: "https://company1.com",
    tier: "bronze",
  },
  {
    name: "Company Six",
    logo: "/images/company2.jpg",
    link: "https://company2.com",
    tier: "bronze",
  },
  {
    name: "Company Seven",
    logo: "/images/company3.jpg",
    link: "https://company3.com",
    tier: "bronze",
  },
];

export default function Sponsor() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = document.querySelector(`.${styles.header}`);
      const speed = 0.5;
      header.style.backgroundPositionY = `-${scrollPosition * speed}px`;
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible); // Add the visible class when in view
            observer.unobserve(entry.target); // Stop observing once it's in view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe each tier section
    const tierSections = document.querySelectorAll(`.${styles.tierSection}`);
    tierSections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sponsorships</title>
        <meta
          name="description"
          content="Learn more about our sponsors and support"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerOverlay}>
          <h1 className={styles.headerTitle}>Sponsorships</h1>
        </div>
      </header>

      {/* Introduction Section */}
      <section className={styles.introSection}>
        <div className={styles.introText}>
          <h2>What do sponsors do?</h2>
          <p>
            Sponsors play a vital role in helping us achieve our goals. We
            proudly display our sponsors' logos and brands at competitions, just
            like we do at any local team event. Their generous contributions
            enable us to participate in competitions and enhance our resources
            year by year.
            <br />
            <br />
            There are many ways to support our team. For more information,
            please read our{" "}
            <a
              href="/assets/Blackbird UAV Sponsorship Package 2024-2025.pdf"
              target="_blank"
            >
              sponsorship package
            </a>
            .
          </p>
        </div>
        <div className={styles.introImage}>
          <Image
            src="/images/company4.jpg"
            alt="Sponsorship Event"
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <div class="custom-shape-divider-bottom-1730849865">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      {/* Sponsor Logos Section */}
      <section className={styles.sponsorsSection}>
        <h2>Thank you to our generous sponsors!</h2>
        {/* Platinum Tier */}
        <div className={styles.tierSection}>
          <h3 className={`${styles.platinumText}`}>Platinum Sponsors</h3>
          <div className={styles.sponsorGrid}>
            {sponsors
              .filter((s) => s.tier === "platinum")
              .map((sponsor, index) => (
                <div key={index} className={styles.sponsor}>
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={150}
                      className={styles.logo}
                    />
                  </a>
                </div>
              ))}
          </div>
        </div>
        {/* Gold Tier */}
        <div className={styles.tierSection}>
          <h3 className={styles.goldText}>Gold Sponsors</h3>
          <div className={styles.sponsorGrid}>
            {sponsors
              .filter((s) => s.tier === "gold")
              .map((sponsor, index) => (
                <div key={index} className={styles.sponsor}>
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={150}
                      className={styles.logo}
                    />
                  </a>
                </div>
              ))}
          </div>
        </div>
        {/* Silver Tier */}
        <div className={styles.tierSection}>
          <h3 className={styles.silverText}>Silver Sponsors</h3>
          <div className={styles.sponsorGrid}>
            {sponsors
              .filter((s) => s.tier === "silver")
              .map((sponsor, index) => (
                <div key={index} className={styles.sponsor}>
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={150}
                      className={styles.logo}
                    />
                  </a>
                </div>
              ))}
          </div>
        </div>
        {/* Bronze Tier */}
        <div className={styles.tierSection}>
          <h3 className={styles.bronzeText}>Bronze Sponsors</h3>
          <div className={styles.sponsorGrid}>
            {sponsors
              .filter((s) => s.tier === "bronze")
              .map((sponsor, index) => (
                <div key={index} className={styles.sponsor}>
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={150}
                      className={styles.logo}
                    />
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
