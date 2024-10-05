// src/pages/index.js
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="A simple Next.js application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Welcome to My Next.js App</h1>
          <Image
            className={styles.logo}
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <p>
            Get started by editing <code>src/pages/index.js</code>.
          </p>
          <div className={styles.ctas}>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primary}
            >
              Deploy Now
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read Documentation
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Next.js
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Examples
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Next.js
          </a>
        </footer>
      </div>
    </>
  );
}
