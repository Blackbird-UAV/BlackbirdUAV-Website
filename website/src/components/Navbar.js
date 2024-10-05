import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav style={navStyle}>
      {/* Update the logo path to the public directory */}
      <Image src="/images/blackbirdLogo.jpg" alt="Logo" width={40} height={40} style={logoStyle} />
      <div style={linksContainer}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/vehicles" style={linkStyle}>
          Vehicles
        </Link>
        <Link href="/meetTeam" style={linkStyle}>
          Meet the Team
        </Link>
        <Link href="/joinTeam" style={linkStyle}>
          Join the Team
        </Link>
        <Link href="/sponsor" style={linkStyle}>
          Sponsor
        </Link>
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#333',
  padding: '1rem',
};

const logoStyle = {
  marginRight: '1rem', // Space between the logo and links
};

const linksContainer = {
  display: 'flex',
  gap: '1rem',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};
