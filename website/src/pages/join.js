import Head from "next/head";
import styles from "@/styles/Join.module.css";

export default function Join() {
  return (
    <>
      <Head>
        <title>Join the Team</title>
        <meta name="description" content="Apply to join our team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Join Our Team</h1>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role of Interest</label>
            <input type="text" id="role" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
}
