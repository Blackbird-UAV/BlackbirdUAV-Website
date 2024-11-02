// /pages/meetTeam/[year].js
import { useRouter } from 'next/router';
import teamData from '../../data/teamData'; // Adjust the path based on your structure

const MeetTeam = () => {
  const router = useRouter();
  const { year } = router.query; // Get the year from the URL

  // Debugging: Log the year extracted from the URL
  console.log('Year from URL:', year);

  // Determine which team to display based on the year
  const team = year && teamData[year] ? teamData[year] : null; // Fetch team data based on year
  
  // Debugging: Log the retrieved team data
  console.log('Team data:', team);

  // Set the team title based on the year
  let teamTitle;
  if (year === '2024-2025') {
    teamTitle = 'Current Team'; // Set to "Current Team" for 2024-2025
  } else {
    teamTitle = year ? `${year} Team` : 'Team Not Found';
  }

  if (!team) {
    console.log('No team found for the specified year.'); // Debugging log
    return (
      <div className="container">
        <h1 className="title">{teamTitle}</h1>
        <p>Sorry, we couldn't find the team for the specified year.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">{teamTitle}</h1>
      <div className="teamList">
        {team.map((member, index) => (
          <div key={index} className="member">
            <img className="image" src={member.image} alt={member.name} />
            <div className="info">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }

        .title {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2rem;
        }

        .teamList {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .member {
          display: flex;
          align-items: center;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .image {
          width: 100px;
          height: 100px;
          border-radius: 50%; /* Circular image */
          margin-right: 20px;
        }

        .info {
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default MeetTeam;
