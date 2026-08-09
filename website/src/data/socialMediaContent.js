/*
  Each entry is one card in the "Follow Our Flight Plan" grid.

  `image` is optional and takes precedence over the platform embed: point it at
  a file under /public and the card renders that artwork, linking out to the
  post. Prefer it. It always renders, costs one image request rather than an
  iframe plus the platform's scripts, and cannot be collapsed by a content
  blocker — which is what happens to LinkedIn's embed, so those three posts show
  a plain link card until their artwork is added here.

  `column` (1-3) picks which column the card falls into; keep the three roughly
  even or the grid ends up lopsided.
*/
const socialMediaContent = [
  // Linkedin posts
  {
    platform: 'LinkedIn',
    title: 'Blackbird UAV',
    platformIcon: '/logos/logo_linkedin.png',
    column: 1,
    embedLink:
      'https://www.linkedin.com/embed/feed/update/urn:li:share:7475663570379108353?collapsed=1',
    link: 'https://www.linkedin.com/feed/update/urn:li:share:7475663570379108353/',
    image: '/images/social/li-exec-applications.jpg',
    caption:
      'Blackbird UAV Executive Applications Are Now Open! Interested in helping lead Blackbird UAV for the 2026-2027 season? Everyone is welcome to apply, whether you are new to Blackbird or already involved...'
  },
  {
    platform: 'LinkedIn',
    title: 'Blackbird UAV',
    platformIcon: '/logos/logo_linkedin.png',
    column: 1,
    embedLink:
      'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7472685155506102272?collapsed=1',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7472685155506102272/',
    image: '/images/social/li-partner-sponsors.jpg',
    caption:
      'As we wrap up another incredible competition season, we want to extend a huge thank you to all of our sponsors for their continued support of Blackbird UAV. Your contributions make it possible for our team to design, build, test, and fly...'
  },
  {
    platform: 'LinkedIn',
    title: 'Blackbird UAV',
    platformIcon: '/logos/logo_linkedin.png',
    column: 1,
    embedLink:
      'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7465559788521967616?collapsed=1',
    link: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7465559788521967616/',
    image: '/images/social/li-aeac-competition.jpg',
    caption:
      'This weekend, Blackbird UAV had the chance to represent Carleton University at the annual Aerial Evolution Association of Canada Student Competition at Area X.O!'
  },
  // Instagram posts
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 2,
    link: 'https://www.instagram.com/p/DZFz6oRFbEG/',
    caption:
      "Introducing Leviathan! After a year of design, testing, prototyping, and manufacturing, we're excited to finally reveal Leviathan, Blackbird UAV's 2026 AEAC Student Competition Vehicle. Built for urban firefighting missions, Leviathan is a fully modular quadcopter..."
  },
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 2,
    link: 'https://www.instagram.com/p/DWmHJ-iFSwC/',
    caption:
      "Meet Blackbird UAV's 2026 AEAC Student Competition Team! After months of hard work and preparation, we're excited to introduce the 14 members representing Blackbird at this year's competition."
  },
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 2,
    link: 'https://www.instagram.com/p/DXHp5qsFYoH/',
    caption:
      "Testing, testing, testing! With warmer weather rolling in, we've been frequent flyers lately. Things are ramping up as we get closer to competition!"
  },
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 3,
    link: 'https://www.instagram.com/p/DWpaxRqCYtL/',
    caption:
      "We're excited to welcome MHIRJ as a new sponsor of Blackbird UAV! MHIRJ is a leader in aviation services, providing engineering expertise, maintenance, and support for regional aircraft programs around the world."
  },
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 3,
    link: 'https://www.instagram.com/p/DWb-3zZiTs2/',
    caption:
      'Blackbird will be competing in the SAE Aero Regular Class next year! The goal is to design, build, and fly a fixed wing UAV capable of carrying the maximum payload.'
  },
  {
    platform: 'Instagram',
    title: '@blackbird.uav',
    platformIcon: '/logos/logo_instagram.png',
    column: 3,
    link: 'https://www.instagram.com/p/DRZ0z7LDmfO/',
    caption:
      'Meet the Blackbird UAV Leadership Team! Our Execs and Managers are here to lead our subteams and projects, oversee club operations, support our members, and keep Blackbird UAV flying forward.'
  }
]

export default socialMediaContent
