import {
  Grid,
  GridItem,
  Stack,
  Box,
  Heading,
  Link,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/sponsorSidebar";
import { fadeInUp, stagger } from "@/components/animations";
import Head from "next/head";

const sponsors = [
  {
    name: "Carleton University | Faculty of Engineering and Design",
    logo: "/images/Sponsors/Sponsor_CarletonEng.png",
    link: "https://carleton.ca/engineering-design/",
    tier: "gold",
  },
  {
    name: "Carleton Student Engineering Society",
    logo: "/images/Sponsors/Sponsor_CSES.png",
    link: "https://www.mycses.ca/",
    tier: "gold",
  },
  {
    name: "Aircraft Spruce & Specialty Co.",
    logo: "/images/Sponsors/Sponsor_AircraftSpruce.png",
    link: "https://www.aircraftspruce.ca/",
    tier: "gold",
  },
  {
    name: "SolidWorks",
    logo: "/images/Sponsors/Sponsor_Solidworks.png",
    link: "https://www.solidworks.com/",
    tier: "gold",
  },
  {
    name: "Kostiuk Engineering Funding Collective",
    logo: "/images/Sponsors/Sponsor_KEFC.png",
    link: "https://www.mycses.ca/student-group-funding",
    tier: "platinum"
  }
];

const DURATIONS = {
  VeryFast: 0.2,
  Fast: 0.4,
  Normal: 0.6,
  Slow: 0.8,
  VerySlow: 1.0,
};

const staggerAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: DURATIONS.Normal,
      // ease: [0.6, -0.05, 0.01, 0.99], // optional, uncomment to make it more snappy and comment to make it more flowy
    },
  }),
};

export default function Sponsor() {
  const padding = useBreakpointValue({ base: 6, md: 8, lg: 12 });
  const marginTopSidebar = useBreakpointValue({ base: 6, sm: 6, md: 6 });
  const marginBottom = useBreakpointValue({ base: 20, lg: 0 });
  const marginTop = useBreakpointValue({ base: 0, lg: 20 });

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const renderSponsorsByTier = (tier, sectionIndex) => {
    // const columnSettings = {
    //   Platinum: { base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" },
    //   Gold: { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
    //   Silver: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
    //   Bronze: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
    // };
    const columnSettings = {
      Platinum: {
        base: "repeat(auto-fit, minmax(200px, 1fr))",
        lg: "repeat(auto-fit, minmax(180px, 1fr))", // change these md values as needed
      },
      Gold: {
        base: "repeat(auto-fit, minmax(160px, 1fr))",
        lg: "repeat(auto-fit, minmax(140px, 1fr))", // change these md values as needed
      },
      Silver: {
        base: "repeat(auto-fit, minmax(140px, 1fr))",
        lg: "repeat(auto-fit, minmax(120px, 1fr))", // change these md values as needed
      },
      Bronze: {
        base: "repeat(auto-fit, minmax(120px, 1fr))",
        lg: "repeat(auto-fit, minmax(100px, 1fr))", // change these md values as needed
      },
    };

    return (
      <>
        <Head>
          <title>BlackBird UAV | Sponsor Us</title>
          <meta
            name="description"
            content="Sponsor Us!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Grid templateColumns={columnSettings[tier]} gap={2} px={2} w="100%">
          {sponsors
            .filter((s) => s.tier.toLowerCase() === tier.toLowerCase())
            .map((sponsor, sponsorIndex) => (
              <motion.div
                id={(function () {
                  switch (tier.toLowerCase()) {
                    case "platinum":
                      return "platSection";
                    case "gold":
                      return "goldSection";
                    case "silver":
                      return "silverSection";
                    case "bronze":
                      return "bronzeSection";
                    default:
                      return undefined;
                  }
                })()}
                key={sponsor.name}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: sectionIndex * 0.3 + sponsorIndex * 0.08 + 0.1,
                      duration: DURATIONS.Normal,
                      // ease: [0.6, -0.05, 0.01, 0.99],
                    },
                  },
                }}
              >
                <GridItem
                  as={Link}
                  target="_blank"
                  href={sponsor.link}
                  isExternal
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  overflow="hidden"
                  width="100%"
                >
                  <Box
                    bg="white"
                    margin={2}
                    padding={2}
                    borderRadius="md"
                    boxShadow="md"
                    overflow="hidden"
                    _hover={{
                      transform: "scale(1.04)",
                      transition: "0.3s",
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      objectFit="contain"
                      height="100px"
                      width="100%"
                      minWidth="50px"
                    />
                  </Box>
                </GridItem>
              </motion.div>
            ))}
        </Grid>
      </>
    );
  };

  const renderSponsorSections = (tier, sectionIndex) => {
    const tierColors = {
      Platinum: "#d6cff0",
      Gold: "#fddd5b",
      Silver: "#c4c4c4",
      Bronze: "#de975d",
    };

    return (
      <Box
        width="100%"
        bg={tierColors[tier]}
        borderRadius="lg"
        padding={5}
        mb={2}
        shadow="lg"
        display="flex"
        alignItems="center"
        // if section is platinum, add a glow on hover
        _hover={
          tier.toLowerCase() === "platinum"
            ? {
              boxShadow: "0 0 8px 4px rgba(214, 207, 240, 0.8)", // Glow effect
              transform: "scale(1.03)", // Slight scaling
              transition: "box-shadow 0.3s ease, transform 0.3s ease", // Smooth transition
            }
            : {
              transform: "scale(1.02)", // Subtle scaling for other tiers
              transition: "transform 0.3s ease", // Smooth transition
            }
        }
      >
        <Box
          transform="rotate(180deg)"
          writingMode="vertical-rl"
          textAlign="center"
          mr={0}
        >
          <Heading as="h3" size="2xl" color="black">
            {tier}
          </Heading>
        </Box>
        {renderSponsorsByTier(tier, sectionIndex)}
      </Box>
    );
  };

  const handleScrollDown = () => {
    const bronzeSection = document.getElementById("bronzeSection");
    if (bronzeSection) {
      bronzeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleVisibility = () => {
    const scrollThreshold = 300;
    const isVisible = window.scrollY < scrollThreshold;
    setIsButtonVisible(isVisible);
  };

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(toggleVisibility);

    window.addEventListener("scroll", handleScroll);
    toggleVisibility();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Button visibility updated:", isButtonVisible);
  }, [isButtonVisible]);

  return (
    <Box bg="black" pl={{ base: 0, lg: 5 }}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        templateRows={{
          sm: "repeat(1, 0)",
          lg: "repeat(2, 1fr)",
        }}
        gap={{
          base: 0,
          lg: 6,
        }}
      >
        <GridItem
          padding={padding}
          mt={marginTopSidebar}
          mb={marginBottom}
          mx={2}
          rowSpan={2}
          colSpan={{ base: 1, sm: 1, md: 1, lg: 3, xl: 3 }}
          display="flex"
          alignContent="center"
          as="div"
          flexDirection={"row"}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          padding={padding}
          mt={marginTop}
          mb={6}
          mx={2}
          rowSpan={2}
          colSpan={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
          overflow="hidden"
        >
          <Stack w="100%" spacing={10}>
            <Heading as="h2" size="3xl" textAlign="center" mb={4} color={"white"}>
              Thank you to our generous sponsors!
            </Heading>
            {["Platinum", "Gold"/*, "Silver", "Bronze"*/].map((tier, index) => (
              <motion.div
                key={index}
                variants={staggerAnimation}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {renderSponsorSections(tier, index)}
              </motion.div>
            ))}
          </Stack>
        </GridItem>
      </Grid>
      {isButtonVisible && (
        <Button
          onClick={handleScrollDown}
          position="fixed"
          bottom="40px"
          left="50%"
          transform={
            isButtonVisible ? "translate(-50%, 0)" : "translate(-50%, 100px)"
          }
          transition="transform 0.4s ease, opacity 0.4s ease"
          borderRadius="full"
          bg="transparent"
          border="2px solid white"
          color="white"
          _hover={{
            bg: "gray.800",
            transform: "translate(-50%, 0) scale(1.1)",
            transition: "transform 0.3s ease-in-out",
          }}
          _active={{ bg: "gray.900" }}
          size="md"
          boxShadow="lg"
          zIndex={999}
        >
          <Box as="span" transform="rotate(90deg)" fontSize="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Box>
        </Button>
      )}
    </Box>
  );
}
