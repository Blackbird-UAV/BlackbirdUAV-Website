import styles from "@/styles/Footer.module.css"; // Import CSS module for styles

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
