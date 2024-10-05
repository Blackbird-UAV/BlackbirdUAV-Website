import Head from "next/head";
import styles from "@/styles/Team.module.css"; // Import CSS for styling

// Sample team member data
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Project Manager",
    image: "/images/alice.png", // Path to the image in public/images
    bio: "Alice is an experienced project manager with a passion for delivering results.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Lead Developer",
    image: "/images/bob.png",
    bio: "Bob is a skilled developer who loves coding and solving complex problems.",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Designer",
    image: "/images/charlie.png",
    bio: "Charlie is a creative designer focused on user experience and visual appeal.",
  },
  {
    id: 4,
    name: "Dana White",
    role: "Marketing Specialist",
    image: "/images/dana.png",
    bio: "Dana specializes in marketing strategies and building brand awareness.",
  },
];

export default function Team() {
  return (
    <>
      <Head>
        <title>Meet the Team</title>
        <meta name="description" content="Meet our amazing team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Meet the Team</h1>
        <div className={styles.teamList}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.member}>
              <img src={member.image} alt={member.name} className={styles.image} />
              <div className={styles.info}>
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
