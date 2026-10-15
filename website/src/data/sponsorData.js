// Sponsor tiers in display order, with how many logos share a row in each
export const tiers = [
  { id: 'partner', name: 'Partner', columns: 1 },
  { id: 'gold', name: 'Gold', columns: 2 },
  { id: 'silver', name: 'Silver', columns: 3 },
  { id: 'bronze', name: 'Bronze', columns: 3 }
]

// Within a tier, logos show in the order they are listed here
const sponsors = [
  {
    name: 'Carleton University Department of Mechanical and Aerospace Engineering',
    logo: '/images/Sponsors/Sponsor_Carleton_MechandAero.png',
    link: 'https://carleton.ca/mae/',
    tier: 'partner'
  },
  {
    name: 'Kostiuk Engineering Funding Collective',
    logo: '/images/Sponsors/Sponsor_KEFC.png',
    link: 'https://www.mycses.ca/student-group-funding',
    tier: 'partner'
  },
  {
    name: 'Howell Data Systems',
    logo: '/images/Sponsors/Sponsor_Howell.png',
    link: 'https://www.howelldatasystems.com/',
    tier: 'partner'
  },
  {
    name: 'SolidWorks',
    logo: '/images/Sponsors/Sponsor_SolidWorks.png',
    link: 'https://www.solidworks.com/',
    tier: 'gold'
  },
  {
    name: 'T-MOTOR',
    logo: '/images/Sponsors/Sponsor_T-MOTOR.png',
    link: 'https://uav-en.tmotor.com/',
    tier: 'gold'
  },
  {
    name: 'Tattu',
    logo: '/images/Sponsors/Sponsor_Tattu.png',
    link: 'https://www.genstattu.com/',
    tier: 'silver'
  },
  {
    name: 'SIMNET',
    logo: '/images/Sponsors/Sponsor_SIMNET.png',
    link: 'https://www.simnet.aero/',
    tier: 'bronze'
  },
  {
    name: 'AVSS',
    logo: '/images/Sponsors/Sponsor_AVSS.svg',
    link: 'https://www.avss.co/',
    tier: 'partner'
  },
  {
    name: 'Robotics Centre',
    logo: '/images/Sponsors/Sponsor_RoboticsCentre.svg',
    link: 'https://robotics-centre.com/',
    tier: 'partner'
  },
  {
    name: 'Malleum',
    logo: '/images/Sponsors/Sponsor_Malleum.jpg',
    link: 'https://malleum.com/',
    tier: 'partner'
  },
  {
    name: 'KF Aerospace',
    logo: '/images/Sponsors/Sponsor_KF.png',
    link: 'https://www.kfaero.ca/',
    tier: 'gold'
  },
  {
    name: 'CarteNav',
    logo: '/images/Sponsors/Sponsor_CarteNav.svg',
    link: 'https://cartenav.com/',
    tier: 'gold'
  },
  {
    name: 'Babcock',
    logo: '/images/Sponsors/Sponsor_Babcock.png',
    link: 'https://babcockcanada.com/',
    tier: 'gold'
  },
  {
    name: 'MHIRJ',
    logo: '/images/Sponsors/Sponsor_MHIRJ.png',
    link: 'https://mhirj.com/',
    tier: 'partner'
  }
]

export default sponsors
