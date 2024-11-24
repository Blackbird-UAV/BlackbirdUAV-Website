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

const sponsors = [
  {
    name: "Company One",
    logo: "/images/clear1.png",
    link: "https://company1.com",
    tier: "platinum",
  },
  {
    name: "Company One Point Five",
    logo: "/images/clear4.png",
    link: "https://company1.com",
    tier: "platinum",
  },
  {
    name: "Company Two",
    logo: "/images/clear2.png",
    link: "https://company2.com",
    tier: "gold",
  },
  {
    name: "Company Two Point Three",
    logo: "/images/clear5.png",
    link: "https://company2.com",
    tier: "gold",
  },
  {
    name: "Company Three",
    logo: "/images/clear3.png",
    link: "https://company3.com",
    tier: "silver",
  },
  {
    name: "Company Four",
    logo: "/images/clear4.png",
    link: "https://company4.com",
    tier: "silver",
  },
  {
    name: "Company Five",
    logo: "/images/clear5.png",
    link: "https://company1.com",
    tier: "bronze",
  },
  {
    name: "Company Six",
    logo: "/images/clear6.png",
    link: "https://company2.com",
    tier: "bronze",
  },
  {
    name: "Company Seven",
    logo: "/images/clear7.png",
    link: "https://company3.com",
    tier: "bronze",
  },
  {
    name: "Company Eight",
    logo: "/images/clear1.png",
    link: "https://company3.com",
    tier: "bronze",
  },
  {
    name: "Company Nine",
    logo: "/images/clear2.png",
    link: "https://company3.com",
    tier: "bronze",
  },
  {
    name: "Company Ten",
    logo: "/images/clear3.png",
    link: "https://company3.com",
    tier: "bronze",
  },
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
    const columnSettings = {
      Platinum: { base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" },
      Gold: { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
      Silver: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
      Bronze: { base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" },
    };

    return (
      <Grid templateColumns={columnSettings[tier]} gap={4} px={2} w="100%">
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
                  />
                </Box>
              </GridItem>
            </motion.div>
          ))}
      </Grid>
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
        bg={tierColors[tier]}
        borderRadius="lg"
        padding={5}
        mb={2}
        ml={4}
        shadow="lg"
        display="flex"
        alignItems="center"
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
    <Box bg="black">
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
        gap={6}
      >
        <GridItem
          padding={padding}
          mt={marginTopSidebar}
          mb={marginBottom}
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
          mb={20}
          rowSpan={2}
          colSpan={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
          overflow="hidden"
        >
          <Stack w="90%" spacing={10}>
            <Heading
              as="h2"
              size="3xl"
              textAlign="center"
              mb={4}
              color={"white"}
            >
              Thank you to our generous sponsors!
            </Heading>
            {["Platinum", "Gold", "Silver", "Bronze"].map((tier, index) => (
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
