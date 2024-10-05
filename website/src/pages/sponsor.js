import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Sponsor.module.css"; // Import the CSS module for styling

const sponsors = [
  {
    name: "Company One",
    logo: "/images/company1.jpg", // Ensure this image exists in the public/images directory
    link: "https://company1.com",
  },
  {
    name: "Company Two",
    logo: "/images/company2.jpg",
    link: "https://company2.com",
  },
  {
    name: "Company Three",
    logo: "/images/company3.jpg",
    link: "https://company3.com",
  },
  {
    name: "Company Four",
    logo: "/images/company4.jpg",
    link: "https://company4.com",
  },
];

export default function Sponsor() {
  return (
    <>
      <Head>
        <title>Our Sponsors</title>
        <meta name="description" content="Meet our sponsors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Sponsors</h1>
        <p className={styles.description}>
          We are grateful for the support of our sponsors. Here are some of the amazing companies that help us achieve our goals.
        </p>
        <div className={styles.sponsors}>
          {sponsors.map((sponsor, index) => (
            <div key={index} className={styles.sponsor}>
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={150}
                  height={150}
                  className={styles.logo}
                />
              </a>
              <h2 className={styles.sponsorName}>{sponsor.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
