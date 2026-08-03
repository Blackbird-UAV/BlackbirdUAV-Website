const teamData = {
  '2025-2026': {
    description:
      'This is the current Blackbird UAV team for the 2026 year. This team is working together throughout the course of the year on a new drone that will fulfill competition goals.',
    Executives: [
      {
        id: 1,
        firstName: 'Kevin',
        lastName: 'Fernando',
        role: 'President',
        isPresident: true,
        isExecutive: false,
        image: '/images/2025Headshots/Kevin.jpg',
        description: 'Kevin leads Blackbird UAV toward innovation and success',
        extendedDescription:
          'Kevin leads Blackbird UAV, overseeing all technical and organizational operations. A fifth-year Aerospace Engineering student and UAV pilot, he ensures the executive functions effectively.',
        link: 'https://www.linkedin.com/in/kmfernando/'
      },
      {
        id: 2,
        firstName: 'DJ',
        lastName: 'Van Nice',
        role: 'Mechanical',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/DJ.jpg',
        description:
          '4th year Mech Eng. undergrad supporting as lead for the mech sub-team',
        extendedDescription:
          'DJ joined Blackbird UAV in 2022 at the beginning of his 1st year in Mechanical Engineering. Now in his 4th year, he is a mechanical team lead with a major role in vehicle design and assembly, as well as being one of the team\'s head pilots.',
        link: 'https://www.linkedin.com/in/daniel-van-nice-28298a256/'
      },
      {
        id: 3,
        firstName: 'Samuel',
        lastName: 'Howell',
        role: 'Mechanical',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Sam.jpg',
        description:
          'Sam is a Mechanical Subteam Lead in his 4th-year of Aerospace Engineering',
        extendedDescription:
          'As Mechanical Lead, Sam\'s responsibilities include conceptual design, CAD, structures and sizing, and vehicle performance. He optimizes systems integration and manages a 20+ member subteam.',
        link: 'https://www.linkedin.com/in/samueldavidhowell/'
      },
      {
        id: 4,
        firstName: 'Lucas',
        lastName: 'Klemm',
        role: 'Mechanical',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Lucas.jpg',
        description: 'Lucas is a Mech Lead and Second Year Student',
        extendedDescription:
          'Lucas helps lead the Mech Team designing and manufacturing mechanisms and drones.',
        link: 'https://www.linkedin.com/in/lucas-klemm-aero'
      },
      {
        id: 5,
        firstName: 'Duaa',
        lastName: 'Israr',
        role: 'Administrative',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Duaa.jpg',
        description:
          'Duaa is the BBUAV Admin Lead and a 4th year Aerospace Eng Student',
        extendedDescription:
          'As BBUAV’s Admin Lead, she oversees communications, manages merchandise, and supports the Finance and External Leads. She also assists other sub-teams and continually learns new skills while contributing to the team’s success.',
        link: 'https://www.linkedin.com/in/duaa-j-israr-3b3657218/'
      },
      {
        id: 6,
        firstName: 'Maxwell',
        lastName: 'Magnusson',
        role: 'Administrative / Finance',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Max.jpg',
        description:
          'Maxwell manages the financial aspects of Blackbird UAV',
        extendedDescription:
          'Maxwell prepares funding pitches, oversees purchasing, and manages the budget.',
        link: 'https://www.linkedin.com/in/maxwell-magnusson'
      },
      {
        id: 7,
        firstName: 'Jacob',
        lastName: 'Hamdani',
        role: 'Administrative / External',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/JacobH.jpg',
        description:
          'Jacob is BBUAV\'s External Lead and an Aerospace Engineering Student.',
        extendedDescription:
          'As External Lead, Jacob oversees Blackbird UAV’s sponsorships, partnerships, events, and public relations, helping grow the team’s network and industry presence.',
        link: 'https://www.linkedin.com/in/jacob-hamdani-149b6a22a/'
      },
      {
        id: 8,
        firstName: 'Jeremy',
        lastName: 'Friesen',
        role: 'Software',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Jeremy.jpg',
        description:
          'Jeremy is the software lead for Blackbird UAV',
        extendedDescription:
          'Jeremy, a 3rd year Computer Science student, oversees all aspects of the club’s software infrastructure, ensuring reliable performance in both competitive and non-competitive environments.',
        link: 'https://www.linkedin.com/in/jeremyfriesen1'
      },
      {
        id: 9,
        firstName: 'Gopesh',
        lastName: 'Jaganbabu',
        role: 'Software',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Gopesh.jpg',
        description:
          'Gopesh leads the development of competition system software.',
        extendedDescription:
          'Gopesh co-leads the software subteam, managing and guiding the development of systems for networking, machine learning, automation, and sensor integration.',
        link: 'https://www.linkedin.com/in/gopesh-jaganbabu-1998a3359'
      },
      {
        id: 10,
        firstName: 'Denise',
        lastName: 'Tablac',
        role: 'Electrical',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Denise.jpg',
        description:
          'Aerospace Electronics and System student passionate about systems integration.',
        extendedDescription:
          'Denise leads the electrical team through projects of all scales that advance the competition vehicle’s capabilities, drawing on his experience in UAV systems and electrical design.',
        link: 'https://www.linkedin.com/in/denisetablac/'
      },
      {
        id: 11,
        firstName: 'Jivitesh',
        lastName: 'Mullangi',
        role: 'Operations',
        isPresident: false,
        isExecutive: true,
        image: '/images/2025Headshots/Jivitesh.jpg',
        description:
          'Jivitesh is the BBUAV Operations Lead and a member since 2023',
        extendedDescription:
          'Jivitesh is a third-year undergraduate student and the Operations Subteam Lead, overseeing vehicle testing, Transport Canada registration, and coordination with current and future team pilots.',
        link: 'https://www.linkedin.com/in/jivitesh-mullangi'
      }
    ],
    managers: [
      {
        id: 12,
        firstName: 'JW',
        lastName: 'Esterak',
        role: 'Electrical',
        isPresident: false,
        isExecutive: false,
        isManager: true,
        image: '/images/2025Headshots/JW.jpg',
        description:
          'Second year aerospace engineering student',
        extendedDescription:
          'JW is a manager on the electrical sub-team. In this role he manages various projects, designs electronic components, and integrates off-the-shelf hardware.',
        link: 'https://www.linkedin.com/in/james-w-esterak-530193211/'
      },
      {
        id: 18,
        firstName: 'Ali Asghar',
        lastName: 'Bundookwalla',
        role: 'Software',
        isPresident: false,
        isExecutive: false,
        isManager: true,
        image: '/images/2025Headshots/...',
        description: 'Ali is a 3rd Year Computer Systems Engineering student',
        extendedDescription:
          'Ali Asghar focuses on drone automation scripts and simulations of drone sequences.',
        link: 'https://www.linkedin.com/in/ali-asghar-bundookwalla/ '
      },
      {
        id: 30,
        firstName: 'Ryan',
        lastName: 'Wong',
        role: 'Mechanical',
        isPresident: false,
        isExecutive: false,
        isManager: true,
        image: '/images/TeamHeadshots/RyanW.JPG',
        description:
          'Ryan is a 3rd year Aerospace (A) Student on the Mechanical Team',
        extendedDescription:
          'Ryan is a manager for the mechanical sub-team. His role includes component optimization and landing leg resizing. ',
        link: 'https://www.linkedin.com/in/rwong23'
      }
      // {
      //   id: 19,
      //   firstName: 'Jacob',
      //   lastName: 'LastName',
      //   role: 'Mechanical',
      //   isPresident: false,
      //   isExecutive: false,
      //   isManager: true,
      //   image: '/images/2025Headshots/AltJacob.jpg',
      //   description: '',
      //   extendedDescription:
      //     '',
      //   link: ''
      // }
    ],
    advisors: [
      {
        id: 13,
        firstName: 'Ryan',
        lastName: 'Whalen',
        role: 'Mechanical / Advisor',
        isPresident: false,
        isExecutive: false,
        image: '/images/2025Headshots/Ryan.jpg',
        description:
          'Ryan assists the mechanical team with design decisions and project management.',
        extendedDescription:
          'Ryan is an advisor to the mechanical sub-team, assisting with design choices, project management, vehicle sizing and motor testing.',
        link: 'http://www.linkedin.com/in/ryan-whalen-065257252/'
      },
      // {
      //   id: 14,
      //   firstName: 'Cole',
      //   lastName: 'Gladders',
      //   role: 'Mechanical / Advisor',
      //   isPresident: false,
      //   isExecutive: false,
      //   isManager: false,
      //   image: '/images/TeamHeadshots/Cole.JPG',
      //   description:
      //     'Cole is a mechanical advisor & a 5th-year Aero-Eng student',
      //   extendedDescription:
      //     'As a mechanical advisor, Cole helps with various projects relating to design. He contributes primarily to vehicle performance, vehicle architecture, and propulsion systems.',
      //   link: 'https://www.linkedin.com/in/cole-gladders-6525541a8'
      // },
      {
        id: 15,
        firstName: 'Jedidiah',
        lastName: 'Nevo',
        role: 'Mechanical / Advisor',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Jedidiah.JPG',
        description: 'Jedidiah is a 3rd year graduate student.',
        extendedDescription:
          'Jed is a Blackbird advisor. Having been a member since 2020, Jed has worked on a variety of projects. He has helped with vehicle propulsion and stability.',
        link: 'http://www.linkedin.com/in/jedidiahnevo'
      },
      {
        id: 16,
        firstName: 'Karl',
        lastName: 'Kurniawan',
        role: 'Mechanical / Advisor',
        isPresident: false,
        isExecutive: false,
        image: '/images/2025Headshots/Karl.jpg',
        description: 'Master student specializing in gas turbine aerodynamics.',
        extendedDescription:
          'Karl is an advisor for manufacturing and structures. He brings practical hands-on experience in composites and different manufacturing methods, focusing on continuous improvement through learning and experience.',
        link: 'https://www.linkedin.com/in/karlkurniawan/'
      },
      {
        id: 17,
        firstName: 'Nick',
        lastName: 'Mucci',
        role: 'Mechanical / Advisor',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Nick.JPG',
        description:
          'Manufacturing and CAD advisor with industry expertise.',
        extendedDescription:
          "As a 7th year Masters student specializing in Advanced Dynamics, Nick brings extensive drone industry experience to BBUAV. His expert knowledge of CAD/SolidWorks drives innovation in the team's design and manufacturing processes.",
        link: 'https://www.linkedin.com/in/nicholas-mucci-164b49185'
      }
    ]
  },
  '2024-2025': {
    description:
      'This is the Blackbird UAV team for the 2024-2025 year. This team worked together throughout the course of the year on a new drone that fullfilled competition goals: Goliath. Goliath was built in a quadcopter configuration with a fully modular payload and is BBUAV\'s most recent drone. It also included First Person View cameras to give better precision for the pilots and won 3rd prize at AEAC.',
    Executives: [
      {
        id: 1,
        firstName: 'Félix-Antoine',
        lastName: 'Chenier',
        role: 'President / Administration',
        isPresident: true,
        isExecutive: false,
        image: '/images/TeamHeadshots/Felix.JPG',
        description: 'Club President since 2024',
        extendedDescription:
          'Felix joined BBUAV in 2022 and became president in 2024. He oversees club activities and management to reach the clubs goals at Carleton and at competitions.',
        link: 'https://www.linkedin.com/in/fa-chenier/?locale=fr_FR'
      },
      {
        id: 2,
        firstName: 'DJ',
        lastName: 'Van-Nice',
        role: 'Vice-President / Systems',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/DJ.JPG',
        description:
          'As Vice President, DJ assists club progression and management',
        extendedDescription:
          'DJ joined Blackbird UAV in 2022 at the beginning of his first year in Mechanical Engineering. Now in his third year, he is vice president while assisting as needed with vehicle assembly and system implementation.',
        link: 'https://www.linkedin.com/in/daniel-van-nice-28298a256/?originalSubdomain=ca'
      },
      {
        id: 3,
        firstName: 'Duaa',
        lastName: 'J.Israr',
        role: 'Administrative',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/Duaa.JPG',
        description:
          'Duaa is the BBUAV Admin Co-Lead and a 3rd-year Aero Eng student.',
        extendedDescription:
          'As BBUAV’s Admin Co-Lead, she oversees club communications, manages social media, and contributes to merch design. She also assists the Manufacturing Sub-Team and learns new skills while supporting the team’s success.',
        link: 'https://www.linkedin.com/in/duaa-j-israr-3b3657218/'
      },
      {
        id: 4,
        firstName: 'Ryan',
        lastName: 'Whalen',
        role: 'Design',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/Ryan.JPG',
        description:
          'Ryan is the BBUAV Design Lead and a 4th year Aero Eng student.',
        extendedDescription:
          'Ryan leads the Design sub-team, which is responsible for aircraft sizing, aircraft conceptual design, detail design, and collaboration with the Manufacturing sub-team. ',
        link: 'http://www.linkedin.com/in/ryan-whalen-065257252'
      },
      {
        id: 5,
        firstName: 'Jedidiah',
        lastName: 'Nevo',
        role: 'Executive / Design',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/Jedidiah.JPG',
        description: 'Jedidiah is a 2nd year graduate student.',
        extendedDescription:
          'Jed is a part of executive team. Having been a member since 2020, Jed has worked on a variety of projects. He is currently in charge of vehicle propulsion and stability.',
        link: 'http://www.linkedin.com/in/jedidiahnevo'
      },
      {
        id: 20,
        firstName: 'Karl',
        lastName: 'Kurniawan',
        role: 'Manufacturing / Structures',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/Karl.JPG',
        description: 'Master student specializing in gas turbine aerodynamics.',
        extendedDescription:
          'Karl is the Co-lead for manufacturing and structures sub team for the 2nd year. He brings practical hands-on experience in composites and different manufacturing methods, focusing on continuous improvement through learning and experience.',
        link: 'https://www.linkedin.com/in/karlkurniawan/?originalSubdomain=ca'
      },
      {
        id: 31,
        firstName: 'Nick',
        lastName: 'Mucci',
        role: 'CAD Design Lead / Manufacturing Co-Lead',
        isPresident: false,
        isExecutive: true,
        image: '/images/TeamHeadshots/Nick.JPG',
        description:
          'Lead CAD designer and manufacturing co-lead with industry expertise.',
        extendedDescription:
          "As a 6th year Masters student specializing in Advanced Dynamics, Nick brings extensive drone industry experience to BBUAV. His expert knowledge of CAD/SolidWorks drives innovation in the team's design and manufacturing processes.",
        link: 'https://www.linkedin.com/in/nicholas-mucci-164b49185'
      }
    ],
    systems: [
      {
        id: 6,
        firstName: 'Gopesh',
        lastName: 'Jaganbabu',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Gopesh.JPG',
        description:
          'First year computer systems engineer. A member since 2024.',
        extendedDescription:
          'Gopesh works on integrating sensors to enable drones to operate fully autonomously. Additionly, he develops and implements machine learning algorithms to enhance drone functionality for various tasks.'
      },
      {
        id: 7,
        firstName: 'Ahmed',
        lastName: 'Ali',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        isManager: true,
        image: '/images/TeamHeadshots/Ahmed.JPG',
        description: 'CE in Networking/Security and Embedded Systems.',
        extendedDescription:
          'Ahmed joined the BBUAV team in 2025 as a sub-team manager for the Systems team. His role focuses on the development of software for autonomous drone navigation and seamless integration with hardware components.',
        link: 'https://www.linkedin.com/in/ahmed-ali-050738221/'
      },
      {
        id: 8,
        firstName: 'Denise',
        lastName: 'Tablac',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Denise.JPG',
        description:
          'Aerospace student passionate about innovation and technology.',
        extendedDescription:
          'Contributed to Black bird UAV by designing and optimizing flight systems. Focused on improving performance and reliability, integrating components to ensure seamless operations.',
        link: 'http://www.linkedin.com/in/denisetablac'
      },
      {
        id: 9,
        firstName: 'JW',
        lastName: 'Esterak',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/JW.JPG',
        description:
          'JW joined Blackbird UAV in 2024 and is in aerospace engineering.',
        extendedDescription:
          'JW is a member of the systems team. He has made contributions to the development of various aspects of the different vehicles.',
        link: 'https://www.linkedin.com/in/james-w-esterak-530193211/'
      },
      {
        id: 10,
        firstName: 'Edwin',
        lastName: 'Ngui',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Edwin.JPG',
        description: 'Edwin leads the development of the Blackbird UAV Website',
        extendedDescription:
          'Edwin is part of the website sub-team, leading the website team to create the customer-facing website to attract sponsors and potential members.',
        link: 'https://www.linkedin.com/in/edwin-ngui/'
      },
      {
        id: 11,
        firstName: 'Marc',
        lastName: 'Vidal',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Marc.JPG',
        description: 'Marc develops components for the Blackbird UAV website.',
        extendedDescription:
          'Marc is part of the website sub-team, developing key components for the functionality of the website.',
        link: 'https://www.linkedin.com/in/marc-vidal-979148278/'
      },
      {
        id: 12,
        firstName: 'Daniel',
        lastName: 'Lu',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Daniel.JPG',
        description:
          'Daniel develops components for the Blackbird UAV website.',
        extendedDescription:
          'Daniel is part of the website sub-team, developing key components for the functionality of the website.',
        link: 'https://www.linkedin.com/in/daniel-lu-9575a0176/'
      },
      {
        id: 13,
        firstName: 'Teddy',
        lastName: 'Kurita',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Teddy.JPG',
        description:
          'Teddy works on the website and graphic design for Blackbird.',
        extendedDescription:
          'Teddy is part of the website sub-team and assists by working on the graphic design. He also provides graphic design for different aspects within Blackbird UAV where it is needed.',
        link: 'http://www.linkedin.com/in/edwardkurita'
      },
      {
        id: 14,
        firstName: 'Jonah',
        lastName: 'Pasquantonio',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Jonah.JPG',
        description: 'Jonah develops components for the Blackbird UAV website.',
        extendedDescription:
          'Jonah is part of the website sub-team, developing key components for the functionality of the website.',
        link: 'https://www.linkedin.com/in/jonah-pasquantonio-5158b52b2/'
      },
      {
        id: 31,
        firstName: 'Ali Asghar ',
        lastName: 'Bundookwalla',
        role: 'Systems',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Jonah.JPG',
        description: 'Ali is a 2nd Year Computer Systems Engineering student',
        extendedDescription:
          'Ali Asghar focuses on drone automation scripts and simulations of drone sequences.',
        link: 'https://www.linkedin.com/in/ali-asghar-bundookwalla/ '
      }
    ],
    administrative: [
      {
        id: 15,
        firstName: 'Lucas',
        lastName: 'Klemm',
        role: 'Administrative / Manufacturing',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Lucas.JPG',
        description: 'Lucas joined Blackbird UAV in 2024.',
        extendedDescription:
          'Lucas manages relationships with sponsors and donors, playing a pivotal role in securing and maintaining financial support. Additionally, he contributes as a member of the manufacturing team.',
        link: 'http://www.linkedin.com/in/lucas-klemm-32b22a339'
      },

      {
        id: 16,
        firstName: 'Peter',
        lastName: 'Liang',
        role: 'Administrative / Structures',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Peter.JPG',
        description:
          'Peter joined in 2019 and has since taken on an advisory role.',
        extendedDescription:
          'Formerly a member of the 2019-20 UGV subteam, Peter currently assists the club with photography, graphical design, and additive manufacturing of various UAV components.',
        link: 'https://www.linkedin.com/in/donglin-peter-liang/?originalSubdomain=ca'
      },

      {
        id: 17,
        firstName: 'William',
        lastName: 'Sison',
        role: 'Administrative',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/William.JPG',
        description:
          'Member since 2023. Third Year Aerospace Engineering Stream B.',
        extendedDescription:
          "William facilitates the team's financial systems and technical writing projects.",
        link: 'https://www.linkedin.com/in/williamsison/'
      },
      {
        id: 18,
        firstName: 'Nassim',
        lastName: 'Gaboune',
        role: 'Administrative',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Nassim.JPG',
        description: 'Joined BBUAV in 2022. Bachelor of Commerce, Accounting.',
        extendedDescription:
          'Nassim assists with KEFC reports and phase 1 documentation. He has contributed to sponsorship initiatives and provides financial expertise to the team.',
        link: 'https://www.linkedin.com/in/nassim-gaboune-73b8252a1/'
      }
    ],
    manufacturing: [
      {
        id: 21,
        firstName: 'Timothy',
        lastName: 'Hildebrand',
        role: 'Manufacturing / Structures',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Timothy.JPG',
        description:
          'Timothy joined Blackbird UAV this year as part of his first year.',
        extendedDescription:
          'Timothy is a part of the structures subteam and helps with the manufacturing and construction of the drones.',
        link: 'https://www.linkedin.com/in/timothy-hildebrand-ba6199341'
      },
      {
        id: 22,
        firstName: 'Emma',
        lastName: 'Ellsworth',
        role: 'Manufacturing / Structures',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Emma.JPG',
        description:
          'Emma is in her third year of aerospace engineering (stream D).',
        extendedDescription:
          "Emma is a general member involved in the manufacturing and design of the club's drones.",
        link: 'https://www.linkedin.com/in/emma-ellsworth-a30221289/'
      },
      {
        id: 23,
        firstName: 'Jasmine',
        lastName: 'Hartwig',
        role: 'Manufacturing / Structures / Administrative',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Jasmine.JPG',
        description:
          'Jas is a third year Aero Eng student who joined BBUAV in 2023',
        extendedDescription:
          "Jasmine contributes primarily to manufacturing and has trained several club members on the operation of BBUAV's CNC foam cutter. She also helps write the club's technical reports every winter.",
        link: 'https://www.linkedin.com/in/jasmine-hartwig'
      }
    ],
    design: [
      {
        id: 24,
        firstName: 'Shamaita',
        lastName: 'Shabnam',
        role: 'Design / Structures',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Shamaita.JPG',
        description: 'Driven by passion for engineering, limited by thesis.',
        extendedDescription:
          'Shamaita assists the design team with the wing support design and occasionally aids in manufacturing.',
        link: 'https://www.linkedin.com/in/shamaita-shabnam/'
      },
      {
        id: 25,
        firstName: 'Owen',
        lastName: 'McKechnie',
        role: 'Design / Manufacturing',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Owen.JPG',
        description:
          'Owen is an active member of the landing gear design sub-team.',
        extendedDescription:
          "A Blackbird UAV member since 2023, Owen actively contributes to UAV design and performance by creating CAD models, collaborating on innovating solutions and supporting the team's efforts to maximize success.",
        link: 'https://www.linkedin.com/in/owen-mckechnie-97a526293'
      },
      {
        id: 26,
        firstName: 'Samuel',
        lastName: 'Howell',
        role: 'Design',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Samuel.JPG',
        description:
          'Sam is on the design team, specializing in aerospace engineering',
        extendedDescription:
          'Sam contributes to creation, calculations, and CAD for Blackbird UAV. He is pursuing a degree in Aerospace Engineering with a specialization in Space Systems Design.',
        link: 'https://www.linkedin.com/in/samueldavidhowell/'
      },
      {
        id: 27,
        firstName: 'Cole',
        lastName: 'Gladders',
        role: 'Design',
        isPresident: false,
        isExecutive: false,
        isManager: true,
        image: '/images/TeamHeadshots/Cole.JPG',
        description:
          'Cole is a design sub-team manager & a 4th-year Aero-Eng student',
        extendedDescription:
          'As a sub-team manager, Cole leads various projects in the design team. He contributes primarily to vehicle performance, vehicle architecture, and propulsion systems.',
        link: 'https://www.linkedin.com/in/cole-gladders-6525541a8'
      },
      {
        id: 28,
        firstName: 'James',
        lastName: 'Houghton',
        role: 'Design',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/James.JPG',
        description:
          'Second year Aerospace Engineering student who joined in 2024.',
        extendedDescription:
          'Contributing to the design of the water reservoir and release system while assisting with other aspects as the design progresses.',
        link: 'http://linkedin.com/in/james-houghton-1886bb2a0'
      },
      {
        id: 29,
        firstName: 'Charles-Xavier',
        lastName: 'Mino',
        role: 'Design / Operations',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/Charles.JPG',
        description: 'CX joined Blackbird UAV in 2024, and loves aviation.',
        extendedDescription:
          'CX assists in designing placements for the battery, ECM, Pixhawk, and motor on Goliath, ensures Mission Planner compatibility, and serves as a secondary pilot.'
      },
      {
        id: 30,
        firstName: 'Ryan',
        lastName: 'Wong',
        role: 'Design',
        isPresident: false,
        isExecutive: false,
        image: '/images/TeamHeadshots/RyanW.JPG',
        description:
          'Ryan is a 2nd year Aerospace (A) Student on the Design Team',
        extendedDescription:
          'Ryan is currently a member under the design sub-team. He has worked on historical data and components research and is currently involved in designing various components using SolidWorks.',
        link: 'https://www.linkedin.com/in/rwong23'
      }
    ]
  },
  '2023-2024': {
    description:
      'The 2023-2024 team achieved significant milestones, including winning the Innovation Award and competing in the national competition. They worked on advanced projects such as a quadcopter and a fixed-wing plane, showcasing their expertise and dedication.',
    Legacy: [
      {
        id: 1,
        firstName: 'PJ',
        lastName: 'Parisien',
        role: 'President / Communication Engineering',
        joined: '2019',
        left: '2024',
        image: '/images/TeamHeadshots/Pj.JPG',
        description: 'PJ is the current president of Blackbird UAV.',
        extendedDescription:
          'PJ joined Blackbird UAV in 2019 as a first-year student in communication engineering. As president, he rebuilt the club with Jed, recruiting new members and leading the team to a first-place victory in 2023. After his final competition in 2024, he plans to stay involved as an alum, guiding the next generation.',
        link: 'https://www.linkedin.com/in/pjparisien'
      },
      {
        id: 2,
        firstName: 'Félix-Antoine',
        lastName: 'Chénier',
        role: 'Vice-President / Civil Engineering',
        joined: '2021',
        left: '2024',
        image: '/images/TeamHeadshots/Felix.JPG',
        description: 'Felix is the Vice-President of Blackbird UAV.',
        extendedDescription:
          'Felix joined Blackbird UAV in 2021 and is now Vice-President. Studying civil engineering, he introduced project management systems and led the team’s first custom vehicle project. He plans to stay with Blackbird until graduation to ensure a strong future for the team.',
        link: 'https://www.linkedin.com/in/felixchenier'
      },
      {
        id: 3,
        firstName: 'Dylan',
        lastName: 'Tingley',
        role: 'Propulsion / Vehicle Performance',
        joined: '2020',
        left: '2024',
        image: '/images/TeamHeadshots/Dylan.JPG',
        description:
          'Dylan handles sizing and selecting the propulsion system.',
        extendedDescription:
          'Dylan is a 4th year aerospace engineering student (Stream A Propulsion, Vehicle Performance and Aerodynamics). He handles sizing and selecting the propulsion system, as well as designing the booms and motor mounts. He also handles manufacturing the components he designed.',
        link: 'https://www.linkedin.com/in/dylantingley'
      },
      {
        id: 4,
        firstName: 'DJ',
        lastName: 'Van Nice',
        role: 'Mechanical Engineering / Systems',
        joined: '2022',
        left: '2024',
        image: '/images/TeamHeadshots/DJ.JPG',
        description: 'DJ designs, CADs, and manufactures parts for the UAV.',
        extendedDescription:
          'DJ, a second-year mechanical engineering student, joined Blackbird UAV in 2022. With prior quadcopter experience, he installed electronics for the 2023 winning aircraft. Now, he is leading the design and manufacturing of the cabin and fuselage for the team’s first fully custom UAV.',
        link: 'https://www.linkedin.com/in/djvannice'
      },
      {
        id: 5,
        firstName: 'Jacob',
        lastName: 'Lebrasseur',
        role: 'Structural Design',
        joined: '2021',
        left: '2024',
        image: '/images/TeamHeadshots/Jacob.JPG',
        description:
          'Jacob helps with the tail assembly and related components.',
        extendedDescription:
          'Jacob is a 3rd year student in aerospace engineering. He is involved in structural design, mainly helping with the tail assembly and related components. He is also in charge of designing a crate to ensure safe and easy transportation of the UAV.',
        link: 'https://www.linkedin.com/in/jacoblebrasseur'
      },
      {
        id: 6,
        firstName: 'Meyiwa',
        lastName: 'Temile',
        role: 'Software Development',
        joined: '2020',
        left: '2024',
        image: '/images/TeamHeadshots/Meyiwa.JPG',
        description: 'Meyiwa develops autonomous solutions for UAV navigation.',
        extendedDescription:
          'Meyiwa, a fourth-year Software Engineering major contributes his ability in software development towards developing autonomous solutions for UAV navigation. He closely collaborates with team members to further the efficiency and functionality of the club’s software projects.',
        link: 'https://www.linkedin.com/in/meyiwatemile'
      },
      {
        id: 7,
        firstName: 'Karl',
        lastName: 'Kurniawan',
        role: 'Manufacturing Manager / Structural Design',
        joined: '2020',
        left: '2024',
        image: '/images/TeamHeadshots/Karl.JPG',
        description: 'Karl is the leading manufacturing manager.',
        extendedDescription:
          'Karl, a final-year aerospace engineering student, specializes in aerodynamics and gas turbines. As manufacturing lead, he streamlined production, machining, and composites layup while contributing to wing structure design.',
        link: 'https://www.linkedin.com/in/karlkurniawan'
      },
      {
        id: 8,
        firstName: 'Jedidiah',
        lastName: 'Nevo',
        role: 'Manufacturing / Design',
        joined: '2020',
        left: '2024',
        image: '/images/TeamHeadshots/Jedidiah.JPG',
        description:
          'Jedidiah focuses on wing-related projects and aircraft stability.',
        extendedDescription:
          'Jedidiah Nevo, a Master’s Student in Mechanical Engineering specializing in Aerospace (Stream A), is part of Blackbird’s Manufacturing and Design team, with a focus on wing-related projects and aircraft stability, including PID tuning. Joining in September 2020, he also serves on the executive team, contributing to decision-making processes.',
        link: 'https://www.linkedin.com/in/jedidiahnevo'
      },
      {
        id: 9,
        firstName: 'Nick',
        lastName: 'Mucci',
        role: 'Mechanical Engineering / Applied Dynamics',
        joined: '2024',
        left: '2024',
        image: '/images/TeamHeadshots/Nick.JPG',
        description: 'Nick focuses on the design and modeling of the aircraft.',
        extendedDescription:
          'Nick, a 6th-year mechanical engineering MASc student, joined BBUAV in 2024. With industry experience in drones, he contributed to fuselage design, composites, 3D printing, and power distribution.',
        link: 'https://www.linkedin.com/in/nickmucci'
      },
      {
        id: 10,
        firstName: 'Ryan',
        lastName: 'Whalen',
        role: 'Aerospace Engineering / Manufacturing',
        joined: '2024',
        left: '2024',
        image: '/images/TeamHeadshots/Ryan.JPG',
        description: 'Ryan contributes to the manufacturing of Apogee.',
        extendedDescription:
          'Ryan, a third-year aerospace engineering student, joined BBUAV in 2024. Specializing in aerodynamics and propulsion, he helped design, manufacture, and reinforce Apogee’s wings and tail.',
        link: 'https://www.linkedin.com/in/ryanwhalen'
      },
      {
        id: 11,
        firstName: 'Lidya',
        lastName: 'Sobhano',
        role: 'Graphics / Design',
        joined: '2024',
        left: '2024',
        image: '/images/TeamHeadshots/Lidya.JPG',
        description: 'Lidya works on graphics and design for the club.',
        extendedDescription:
          'Lidya is her last year of Aerospace Engineering Stream B. Currently she is working on graphics and design for the club.',
        link: 'https://www.linkedin.com/in/lidyasobhano'
      },
      {
        id: 12,
        firstName: 'Duaa',
        lastName: 'J. Israr',
        role: 'Aerospace Engineering / Social Media',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Duaa.JPG',
        description: 'Duaa coordinates the club’s social media.',
        extendedDescription:
          'Duaa is a 2nd-year student studying Aerospace Engineering. She is in stream B, focusing on Aerospace Structures, Systems, and Vehicle Design. Currently, she is coordinating the club’s social media, creating graphics for the website, and working with the manufacturing team to produce CAD components for the competition vehicle.',
        link: 'https://www.linkedin.com/in/duaajisrar'
      },
      {
        id: 13,
        firstName: 'Jasmine',
        lastName: 'Hartwig',
        role: 'Aerospace Engineering / Electronics and Systems',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Jasmine.JPG',
        description: 'Jasmine is designing the seats for Apogee.',
        extendedDescription:
          'Jasmine is a 2nd Year student studying Aerospace Engineering with a focus in Electronics and Systems. Currently she is designing the seats for Apogee and working with a few other members to rehabilitate one of the club’s older drones, Archie.',
        link: 'https://www.linkedin.com/in/jasminehartwig'
      },
      {
        id: 14,
        firstName: 'Benjamin',
        lastName: 'Pyun',
        role: 'Aerospace Engineering / Design',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Ben.JPG',
        description:
          'Benjamin designs and models 3D printed parts for the UAV.',
        extendedDescription:
          'Benjamin is a third year Aerospace Engineering student at Carleton. He is studying in stream A which specializes in aerodynamics, propulsion, and vehicle performance. Currently, Benjamin is working on designing and modeling 3D printed parts that hold important components for the UAV using CAD software.',
        link: 'https://www.linkedin.com/in/benjaminpyun'
      },
      // {
      //   id: 15,
      //   firstName: "Zachary",
      //   lastName: "Myers",
      //   role: "Aerospace Engineering / Administrative",
      //   joined: "2023",
      //   left: "2024",
      //   image: "/images/TeamHeadshots/ZacharyMyers.JPG",
      //   description: "Zachary focuses on avionics and electronics.",
      //   extendedDescription:
      //     "Zachary is a first year Aerospace Engineering student, focusing on the avionics and electronics stream. He is involved with administrative work including documentation and planning. In addition, he provides support for rehabilitation of past projects and helps with 3D modeling across a range of applications.",
      //   link: "https://www.linkedin.com/in/zacharymyers",
      // },
      // {
      //   id: 16,
      //   firstName: "Aidan",
      //   lastName: "Sheridan",
      //   role: "Aerospace Engineering / Design",
      //   joined: "2023",
      //   left: "2024",
      //   image: "/images/TeamHeadshots/AidanSheridan.JPG",
      //   description:
      //     "Aidan designs seats for Apogee and rehabilitates older drones.",
      //   extendedDescription:
      //     "Aidan is a 2nd Year Aerospace Engineering student in Stream A which focuses on Aerodynamics, Propulsion and Vehicle Performance. He is working on designing seats for Apogee and is part of a team working to rehabilitate Archie, one of the club’s older drones.",
      //   link: "https://www.linkedin.com/in/aidansheridan",
      // },
      {
        id: 17,
        firstName: 'Nassim',
        lastName: 'Gaboune',
        role: 'Administrative / Finance',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Nassim.JPG',
        description: 'Nassim focuses on finance and administrative tasks.',
        extendedDescription:
          'Nassim Gaboune is a first-year bachelor of commerce student with a concentration in accounting. His role in Blackbird UAV is as an administrative assistant, with a focus on finance.',
        link: 'https://www.linkedin.com/in/nassim-gaboune-73b8252a1/'
      },
      {
        id: 18,
        firstName: 'Emilia',
        lastName: 'Dashko',
        role: 'Administrative / Editor',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Emilia.JPG',
        description: 'Emilia provides editorial and administrative support.',
        extendedDescription:
          'Emilia Dashko is in the final year of her MA in History. She joined Blackbird in December 2023 as editor and administrator, using her humanities skills to provide the team with an outsider point of view.',
        link: 'https://www.linkedin.com/in/emiliadashko'
      }
    ]
  },
  Competition: {
    description:
      'This page lists all the competition teams of Blackbird UAV. Each section represents a different year.',
    years: {
      2026: {
        description: `
          <p>Blackbird's 2nd Quadcopter built from scratch.</p>
          <p>The team received the team spirit award for recognizing sportsmanship and support for other teams.</p>
          <p>Location: Ottawa, ON</p>
          <p>A modular quadcopter was designed to detect and extinguish urban fires, as well as carry a payload up to 4.5 kg. The team sucessfully completed task one of the mission, and were a fantastic host all-weekend long for the travelling teams in Ottawa.</p>
          <p>Read More: <a href="https://charlatan.ca/blackbird-uav/">LINK</a></p>
        `,
        award: { variant: 'innovation', label: 'Team Spirit Award'},
        image: '/images/comp2026.jpg',
        members: [
          { firstName: 'Kevin', lastName: 'Fernando', role: 'Club president' },
          { firstName: 'DJ', role: 'Flight' },
          { firstName: 'Sam', role: 'Flight' },
          { firstName: 'Gopesh', role: 'Flight' },
          { firstName: 'Denise', role: 'Flight' },
          { firstName: 'Jivitesh', role: 'Operations' },
          { firstName: 'Parsa', role: 'Operations' },
          { firstName: 'Eleena', role: 'Operations' },
          { firstName: 'J.W.', role: 'Electrical' },
          { firstName: 'Felipe', role: 'Software' },
          { firstName: 'Ryan', role: 'Mechanical' },
          { firstName: 'Lucas', role: 'Mechanical' },
          { firstName: 'Faraz', role: 'Mechanical' },
          { firstName: 'Adam', role: 'Mechanical' },
          { firstName: 'Liam', role: 'Mechanical' },
          { firstName: 'Louis', role: 'Mechanical' },
          { firstName: 'Duaa', role: 'Support' },
          { firstName: 'Max', role: 'Support' },
          { firstName: 'Jacob', role: 'Support' },
          { firstName: 'Viveca', role: 'Support' },
        ]
      },
      2025: {
        description: `
          <p>Second aircraft made completely from scratch since COVID by Blackbird UAV.</p>
          <p>Team placed 3rd overall at the national UAV competition.</p>
          <p>Location: Medicine Hat, Alberta</p>
          <p>A modular quadcopter was designed to detect and suppress wildfire hotspots. Despite major setbacks, including two motor failures and a broken Raspberry Pi, the team successfully completed the mission thanks to support from Queen’s Aerospace Design Team and UVic Aero.</p>
          <p>Read More: <a href="https://carleton.ca/mae/2025/congrats-to-blackbird-uav-team/">LINK</a></p>
        `,
        award: { variant: 'bronze', label: '3rd Place', detail: 'Overall' },
        image: '/images/comp2025.jpg',
        members: [
          { firstName: 'Felix', lastName: 'Chenier', role: 'Club president' },
          { firstName: 'DJ', role: 'Flight' },
          { firstName: 'Karl', role: 'Flight' },
          { firstName: 'Nick', role: 'Flight' },
          { firstName: 'Kevin', role: 'Flight' },
          { firstName: 'Jed', role: 'Operations' },
          { firstName: 'Jivitesh', role: 'Operations ' },
          { firstName: 'Denise', role: 'Systems' },
          { firstName: 'Gopesh', role: 'Systems' },
          { firstName: 'Ryan', role: 'Manufacturing' },
          { firstName: 'Owen', role: 'Manufacturing' },
          { firstName: 'Samuel', role: 'Manufacturing' },
          { firstName: 'Timothy', role: 'Manufacturing' },
          { firstName: 'Duaa', role: 'Support' },
          { firstName: 'Cole', role: 'Support' },
          { firstName: 'Lucas', role: 'Support' },
        ]
      },
      2024: {
        description: `
          <p>First year since COVID that BBUAV produced a vehicle completely from the ground up.</p>
          <p>Team won the 2nd innovation award in its history.</p>
          <p>Ground Speed record broken with 156 km/h.</p>
          <p>Vehicle was still a quadplane, and still controlled over the internet.</p>
          <p>Location: Alma, Québec</p>
          <p>Read More: <a href="https://www.linkedin.com/posts/carleton-university-s-faculty-of-engineering-and-design_the-blackbird-uav-team-of-carleton-students-ugcPost-7204499293171322881-QS_R?utm_source=share&utm_medium=member_desktop&rcm=ACoAADx9pYcBep3DuqdyzH94hYcRvLehjvlYwas">LINK</a></p>
        `,
        award: { variant: 'innovation', label: 'Innovation Award' },
        image: '/images/comp2024.png',
        members: [
          { firstName: 'PJ', lastName: 'Parisien', role: 'Club president' },
          { firstName: 'Felix', lastName: 'Vice-President' },
          { firstName: 'Jed', lastName: '' },
          { firstName: 'Meyiwa', lastName: '' },
          { firstName: 'DJ', lastName: '' },
          { firstName: 'Jacob', lastName: '' },
          { firstName: 'Dylan', lastName: '' },
          { firstName: 'Emilia', lastName: '' },
          { firstName: 'Lidya', lastName: '' },
          { firstName: 'Nick', lastName: 'Mucci' },
          { firstName: 'Duaa', lastName: '' },
          { firstName: 'Ryan', lastName: '' },
          { firstName: 'Jasmine', lastName: '' },
          {
            firstName: 'Karl',
            lastName: 'Kurniawan',
            role: 'Integral to comp'
          }
        ]
      },
      2023: {
        description: `
          <p>First year of BBUAV actually participating in the competition since COVID.</p>
          <p>Team won First Place in Phase 2 for the first time in the club's history.</p>
          <p>First team to run a vehicle completely over the internet instead of radio control.</p>
          <p>First team to successfully transition flight modes in any vehicle (vertical flight to horizontal flight and back).</p>
          <p>Potential ground speed record of 120 km/h.</p>
          <p>Location: Alma, Québec</p>
          <p>Read More: <a href="https://carleton.ca/engineering-design/story/team-blackbird-takes-top-prize-in-aerial-evolution-association-of-canadas-national-student-drone-competition/">LINK</a></p>
        `,
        award: { variant: 'gold', label: '1st Place', detail: 'Phase 2' },
        image: '/images/comp2023.png',
        members: [
          { firstName: 'PJ', lastName: 'Parisien', role: 'Club president' },
          { firstName: 'Jed', lastName: '' },
          { firstName: 'Meyiwa', lastName: '' },
          { firstName: 'Imad', lastName: '', role: 'Executive' },
          { firstName: 'Felix', lastName: '' },
          { firstName: 'Ben', lastName: '' },
          { firstName: 'DJ', lastName: '' },
          { firstName: 'Jacob', lastName: '' },
          { firstName: 'Dylan', lastName: '' }
        ]
      },
      2022: {
        description: `
          <p>First year of in-person comp after COVID.</p>
          <p>Team only observed.</p>
          <p>Location: Southport, Manitoba</p>
        `,
        image: '/images/comp2022.png',
        members: [
          {
            firstName: 'Pier-Jean',
            lastName: 'Parisien',
            role: 'Club President'
          },
          { firstName: 'Jed', lastName: '' },
          { firstName: 'Meyiwa', lastName: '' },
          { firstName: 'Imad', lastName: '' },
          { firstName: 'Felix', lastName: '' },
          { firstName: 'Ben', lastName: '' }
        ]
      }
    }
  },
  Alumni: {
    description:
      'This page lists all the alumni of Blackbird UAV. You can search for specific alumni using the search bar below.',
    members: [
      {
        id: 1,
        firstName: 'Pier-Jean',
        lastName: 'Parisien',
        role: 'Executive / President',
        joined: '2022',
        left: '2024',
        image: '/images/TeamHeadshots/Pj.JPG'
      },
      {
        id: 2,
        firstName: 'Meyiwa',
        lastName: 'Temile',
        role: '',
        joined: '2022',
        left: '2024',
        image: '/images/TeamHeadshots/Meyiwa.JPG'
      },
      {
        id: 3,
        firstName: 'Imad',
        lastName: 'Rehman',
        role: 'Executive',
        joined: '2022',
        left: '2023',
        image: '/images/TeamHeadshots/Imad.JPG'
      },
      {
        id: 4,
        firstName: 'Dylan',
        lastName: 'Tingley',
        role: 'Executive',
        joined: '2023',
        left: '2024',
        image: '/images/TeamHeadshots/Dylan.JPG'
      },
      {
        id: 5,
        firstName: 'Lidya',
        lastName: 'Sobhano',
        role: '',
        joined: '2024',
        left: '2024',
        image: '/images/TeamHeadshots/Lidya.JPG'
      },
      {
        id: 6,
        firstName: 'Ben',
        lastName: 'Pyun',
        role: 'Executive',
        joined: '2022',
        left: '2023',
        image: '/images/TeamHeadshots/Ben.JPG'
      }
    ]
  }
}

export default teamData
