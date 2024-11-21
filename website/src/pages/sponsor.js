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
import FadeInLayout from "@/components/FadeWhenVisible";
import Sidebar from "@/components/sponsorSidebar";

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

export default function Sponsor() {
  const sideBarPadding = useBreakpointValue({ base: "5", md: "8", lg: "14" });
  const mainContent = useBreakpointValue({
    base: "5",
    md: "14",
    lg: "14",
    xl: 0,
  });
  const paddTop = useBreakpointValue({ base: "20", sm: 20, md: 20 });

  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const renderSponsorsByTier = (tier) => {
    const columnSettings = {
      platinum: { base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }, // Full row
      gold: { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }, // Two per row
      silver: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }, // Three per row
      bronze: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }, // Four per row
    };

    return (
      <Grid templateColumns={columnSettings[tier]} gap={4}>
        {sponsors
          .filter((s) => s.tier === tier)
          .map((sponsor, index) => (
            <GridItem
              key={index}
              as={Link}
              href={sponsor.link}
              isExternal
              display="flex"
              justifyContent="center"
              alignItems="center"
              overflow="hidden" // Ensure cropped content is hidden
            >
              <Box
                bg="white" // White background for the image container
                margin={2}
                padding={2} // Optional padding for spacing inside the container
                borderRadius="md"
                boxShadow="md"
                _hover={{
                  transform: "scale(1.05)",
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
                  objectFit="contain" // Ensure the entire logo fits within the box
                  height="100px"
                  width="100%"
                />
              </Box>
            </GridItem>
          ))}
      </Grid>
    );
  };

  const handleScrollDown = () => {
    const bronzeSection = document.getElementById("bronzeSection");
    if (bronzeSection) {
      bronzeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = 200; // You can make this configurable
      setIsButtonVisible(window.scrollY < scrollThreshold);
    };

    // Optimize with requestAnimationFrame
    const handleScroll = () => requestAnimationFrame(toggleVisibility);

    window.addEventListener("scroll", handleScroll);
    toggleVisibility(); // Ensure visibility is updated on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box bg="black" minHeight="100vh">
      <Grid
        id="mainGrid"
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        templateRows={{
          sm: "repeat(1, 0)",
          lg: "repeat(2, 1fr)",
        }}
        gap={8}
      >
        <GridItem
          padding={sideBarPadding}
          marginTop={paddTop}
          marginBottom={20}
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
          padding={mainContent}
          marginTop={40}
          marginBottom={20}
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
            <FadeInLayout>
              <Box
                bg="rgba(214, 207, 240, 1)"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                ml={6}
                shadow="xl"
                boxShadow="0 0 0px 0px #7468B2"
                _hover={{
                  boxShadow: "0 0 10px 5px #7468B2", // Enhance glow on hover
                  transition: "0.3s ease",
                }}
              >
                <Heading as="h3" size="lg" mb={6} color="black">
                  Platinum Sponsors
                </Heading>
                {renderSponsorsByTier("platinum")}
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="rgba(253, 221, 91, 1)"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                ml={6}
                shadow="lg"
                boxShadow="0 0 0px 0px #fddc5b"
                _hover={{
                  boxShadow: "0 0 8px 4px #fddc5b", // Enhance glow on hover
                  transition: "0.3s ease",
                }}
              >
                <Heading as="h3" size="lg" mb={6} color="black">
                  Gold Sponsors
                </Heading>
                {renderSponsorsByTier("gold")}
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="rgba(196, 196, 196, 1)"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                ml={6}
                shadow="lg"
                boxShadow="0 0 0px 0px #c4c4c4"
                _hover={{
                  boxShadow: "0 0 8px 4px #c4c4c4", // Enhance glow on hover
                  transition: "0.3s ease",
                }}
              >
                <Heading as="h3" size="lg" mb={6} color="black">
                  Silver Sponsors
                </Heading>
                {renderSponsorsByTier("silver")}
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="rgba(222, 151, 93, 1)"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                ml={6}
                shadow="lg"
                boxShadow="0 0 0px 0px #de965d"
                _hover={{
                  boxShadow: "0 0 8px 4px #de965d", // Enhance glow on hover
                  transition: "0.3s ease",
                }}
              >
                <Heading
                  id="bronzeSection"
                  as="h3"
                  size="lg"
                  mb={6}
                  color="black"
                >
                  Bronze Sponsors
                </Heading>
                {renderSponsorsByTier("bronze")}
              </Box>
            </FadeInLayout>
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
          // opacity={isButtonVisible ? 1 : 0}
          opacity={1}
          visibility={"visible"}
          // visibility={isButtonVisible ? "visible" : "hidden"}
          borderRadius="full"
          bg="transparent"
          border="2px solid white"
          color="white"
          _hover={{ bg: "gray.800" }}
          _active={{ bg: "gray.900" }}
          size="sm"
          boxShadow="md"
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
