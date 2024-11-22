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
import { motion, useAnimation } from "framer-motion";
import { fadeInUpSlower } from "@/components/animations";
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
    const padding = useBreakpointValue({ base: 6, md: 8, lg: 12 });
    const marginTopSidebar = useBreakpointValue({ base: 6, sm: 6, md: 6 });
    const marginBottom = useBreakpointValue({ base: 20, lg: 0 });
    const marginTop = useBreakpointValue({ base: 0, lg: 20 });
    const MotionBox = motion(Box);
    const controls = useAnimation();

    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5,
            },
        },
    };

    useEffect(() => {
        controls.start("animate");
    }, [controls]);

    const renderSponsorsByTier = (tier) => {
        const columnSettings = {
            Platinum: { base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }, // Full row
            Gold: { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }, // Two per row
            Silver: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }, // Three per row
            Bronze: { base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }, // Three per row
        };

        return (
            <Grid templateColumns={columnSettings[tier]} gap={4} w="100%">
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
                            overflow="hidden"
                            width="100%"
                        >
                            <Box
                                bg="white"
                                margin={2}
                                padding={2}
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
                                    objectFit="contain"
                                    height="100px"
                                    width="100%"
                                />
                            </Box>
                        </GridItem>
                    ))}
            </Grid>
        );
    };

    const renderSponsorSections = (tier) => {
        const tierColors = {
            Platinum: "#d6cff0",
            Gold: "#fddd5b",
            Silver: "#c4c4c4",
            Bronze: "#de975d",
        };


        const boxShadowStyles = (tier) => {
            if (tier === "Platinum") {
                return {
                    shadow: "xl",
                    boxShadow: "0 0 0px 0px #7468B2",
                    _hover: {
                        boxShadow: "0 0 10px 5px #7468B2",
                        transition: "0.3s ease",
                    },
                };
            } else {
                return {
                    shadow: "lg",
                    boxShadow: "0 0 0px 0px #c4c4c4",
                    _hover: {
                        boxShadow: "0 0 6px 1px #c4c4c4",
                        transition: "0.3s ease",
                    },
                };
            }
        };

        return (
            <Box
                bg={tierColors[tier]}
                borderRadius="lg"
                padding={5}
                mb={2}
                ml={4}
                {...boxShadowStyles(tier)}
                display="flex"
                alignItems="center"
            >
                <Box
                    transform="rotate(180deg)"
                    writingMode="vertical-rl"
                    textAlign="center"
                    mr={2}
                >
                    <Heading as="h3" size="2xl" color="black">
                        {tier}
                    </Heading>
                </Box>
                {renderSponsorsByTier(tier)}
            </Box>
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
            const scrollThreshold = 200;
            setIsButtonVisible(window.scrollY < scrollThreshold);
        };

        const handleScroll = () => requestAnimationFrame(toggleVisibility);

        window.addEventListener("scroll", handleScroll);
        toggleVisibility();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box bg="black">
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
                        <MotionBox
                            initial="hidden"
                            animate="animateaez"
                            variants={containerVariants}
                        >
                            {["Platinum", "Gold", "Silver", "Bronze"].map((tier) => (
                                <MotionBox
                                    initial="hidden"
                                    animate="animate"
                                    variants={fadeInUpSlower}
                                    key={tier}
                                >
                                    {renderSponsorSections(tier)}
                                </MotionBox>
                            ))}
                        </MotionBox>
                        {/* <FadeInLayout>
                <Box
                  bg="rgba(214, 207, 240, 1)"
                  borderRadius="lg"
                  padding={5}
                  mb={2}
                  ml={4}
                  shadow="xl"
                  boxShadow="0 0 0px 0px #7468B2"
                  _hover={{
                    boxShadow: "0 0 10px 5px #7468B2",
                    transition: "0.3s ease",
                  }}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    transform="rotate(180deg)"
                    writingMode="vertical-rl"
                    textAlign="center"
                    mr={2}
                  >
                    <Heading as="h3" size="2xl" color="black">
                      Platinum
                    </Heading>
                  </Box>
                  {renderSponsorsByTier("platinum")}
                </Box>
              </FadeInLayout>
              <FadeInLayout>
                <Box
                  bg="rgba(253, 221, 91, 1)"
                  borderRadius="lg"
                  padding={5}
                  mb={2}
                  ml={4}
                  // Optional glow
                  shadow="lg"
                  boxShadow="0 0 0px 0px #fddc5b"
                  _hover={{
                    boxShadow: "0 0 6px 1px #fddc5b",
                    transition: "0.3s ease",
                  }}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    transform="rotate(180deg)"
                    writingMode="vertical-rl"
                    textAlign="center"
                    mr={2}
                  >
                    <Heading as="h3" size="2xl" color="black">
                      Gold
                    </Heading>
                  </Box>
                  {renderSponsorsByTier("gold")}
                </Box>
              </FadeInLayout>
              <FadeInLayout>
                <Box
                  bg="rgba(196, 196, 196, 1)"
                  borderRadius="lg"
                  padding={5}
                  mb={2}
                  ml={4}
                  // Optional glow
                  shadow="lg"
                  boxShadow="0 0 0px 0px #c4c4c4"
                  _hover={{
                    boxShadow: "0 0 6px 1px #c4c4c4",
                    transition: "0.3s ease",
                  }}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    transform="rotate(180deg)"
                    writingMode="vertical-rl"
                    textAlign="center"
                    mr={2}
                  >
                    <Heading as="h3" size="2xl" color="black">
                      Silver
                    </Heading>
                  </Box>
                  {renderSponsorsByTier("silver")}
                </Box>
              </FadeInLayout>
              <FadeInLayout>
                <Box
                  id="bronzeSection"
                  bg="rgba(222, 151, 93, 1)"
                  borderRadius="lg"
                  padding={5}
                  mb={2}
                  ml={4}
                  // Optional glow
                  shadow="lg"
                  boxShadow="0 0 0px 0px #de965d"
                  _hover={{
                    boxShadow: "0 0 6px 1px #de965d",
                    transition: "0.3s ease",
                  }}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    transform="rotate(180deg)"
                    writingMode="vertical-rl"
                    textAlign="center"
                    mr={2}
                  >
                    <Heading as="h3" size="2xl" color="black">
                      Bronze
                    </Heading>
                  </Box>
                  {renderSponsorsByTier("bronze")}
                </Box>
              </FadeInLayout> */}
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
                    opacity={isButtonVisible ? 1 : 0}
                    visibility={isButtonVisible ? "visible" : "hidden"} // might be an issue idek
                    borderRadius="full"
                    bg="transparent"
                    border="2px solid white"
                    color="white"
                    _hover={{ bg: "gray.800" }}
                    _active={{ bg: "gray.900" }}
                    size="md"
                    boxShadow="lg"
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
