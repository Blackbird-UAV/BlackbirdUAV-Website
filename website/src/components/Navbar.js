// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link href="/" style={linkStyle}>
        Home
      </Link>
      <Link href="/about" style={linkStyle}>
        About
      </Link>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  gap: '1rem',
  background: '#333',
  padding: '1rem',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};
