import { Grid, GridItem, Stack, Box, Heading, Link, Image, Button, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FadeInLayout from "@/components/FadeWhenVisible";
import Sidebar from "@/components/sponsorSidebar";

const sponsors = [
  { name: "Company One", logo: "/images/company1.jpg", link: "https://company1.com", tier: "platinum" },
  { name: "Company Two", logo: "/images/company2.jpg", link: "https://company2.com", tier: "gold" },
  { name: "Company Three", logo: "/images/company3.jpg", link: "https://company3.com", tier: "silver" },
  { name: "Company Four", logo: "/images/company4.jpg", link: "https://company4.com", tier: "silver" },
  { name: "Company Five", logo: "/images/company1.jpg", link: "https://company1.com", tier: "bronze" },
  { name: "Company Six", logo: "/images/company2.jpg", link: "https://company2.com", tier: "bronze" },
  { name: "Company Seven", logo: "/images/company3.jpg", link: "https://company3.com", tier: "bronze" },
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

  const [isBronzeVisible, setIsBronzeVisible] = useState(false);

  const renderSponsorsByTier = (tier) => (
    sponsors
      .filter((s) => s.tier === tier)
      .map((sponsor, index) => (
        <GridItem key={index} as={Link} href={sponsor.link} isExternal>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            boxSize="150px"
            objectFit="cover"
            borderRadius="md"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          />
        </GridItem>
      ))
  );

  const handleScrollDown = () => {
    const bronzeSection = document.getElementById("bronzeSection");
    if (bronzeSection) {
      bronzeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // also try to make it so the bronze section is false when the bronze section is visible

  return (
    <>
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
            <Heading as="h2" size="3xl" textAlign="center" mb={4} color={"white"}>
              Thank you to our generous sponsors!
            </Heading>
            <FadeInLayout>
              <Box
                bg="gray.900"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                shadow="xl"
              >
                <Heading as="h3" size="lg" mb={6} color="#e5e4e2">
                  Platinum Sponsors
                </Heading>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
                  {renderSponsorsByTier("platinum")}
                </Grid>
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="gray.800"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                shadow="lg"
              >
                <Heading as="h3" size="lg" mb={6} color="#fed807">
                  Gold Sponsors
                </Heading>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
                  {renderSponsorsByTier("gold")}
                </Grid>
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="gray.700"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                shadow="lg"
              >
                <Heading as="h3" size="lg" mb={6} color="#c4c4c4">
                  Silver Sponsors
                </Heading>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
                  {renderSponsorsByTier("silver")}
                </Grid>
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                bg="gray.600"
                borderRadius="lg"
                paddingY={6}
                paddingX={8}
                mb={2}
                shadow="lg"
              >
                <Heading id="bronzeSection" as="h3" size="lg" mb={6} color="#ce8946">
                  Bronze Sponsors
                </Heading>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
                  {renderSponsorsByTier("bronze")}
                </Grid>
              </Box>
            </FadeInLayout>
          </Stack>

          {!isBronzeVisible && (
            <Button
              onClick={handleScrollDown}
              position="fixed"
              bottom="40px"
              left="50%"
              transform="translateX(-50%)"
              borderRadius="full"
              bg="transparent"
              border="2px solid white"
              color="white"
              _hover={{ bg: "gray.800" }}
              _active={{ bg: "gray.900" }}
              size="sm"
              animation="bounce 1s infinite"
              boxShadow="md"
            >
              <Box as="span" transform="rotate(90deg)" fontSize="lg">
                {/* Custom SVG Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24" height="24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Box>
            </Button>
          )}
        </GridItem>
      </Grid>
    </>
  );
}
