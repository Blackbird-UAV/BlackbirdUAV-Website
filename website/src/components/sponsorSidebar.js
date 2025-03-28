import {
  Stack,
  Heading,
  Text,
  Button,
  Container,
  Link,
  Box,
  Image,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger, scaleUp } from "@/components/animations";
import styles from "@/styles/SponsorSidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDonate,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const SponsorSidebar = () => {
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionStack = motion(Stack);
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  const position = useBreakpointValue({
    base: "relative",
    lg: "fixed",
  });

  const top = useBreakpointValue({
    base: 20,
    lg: 20,
  });

  const width = useBreakpointValue({
    base: "100%",
    lg: "55%",
  });

  return (
    <>
      <MotionBox
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        position={position}
        top={top}
        width={width}
        bg="black"
        color="white"
        zIndex={10}
      >
        <Container
          py={2}
          mt={8}
          height={{ lg: "100vh" }}
          alignItems={{ lg: "center" }}
        >
          <MotionStack
            variants={stagger}
            spacing={6}
            w="100%"
            justify="center"
            align="center"
          >
            {/* Heading */}
            <MotionHeading
              as="h1"
              size="4xl"
              color="#ffffff"
              variants={fadeInUp}
            >
              Sponsorships
            </MotionHeading>
            {/* Content Box */}
            <Box
              // bg="gray.800"
              bg="linear-gradient(150deg, #2e2e2e,rgb(20, 20, 20))"
              h="fit-content"
              minH="60vh"
              px={8}
              mt={2}
              borderRadius="md"
              boxShadow="0 0 8px 4px rgba(255, 255, 255, 0.2)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              className={styles.mobilePaddingTop} // Add padding to the top in mobile mode
            >
              <Grid
                templateColumns={{
                  base: "1fr",
                  lg: "repeat(2, 1fr)",
                }}
                gap={4}
                alignItems="center"
                textAlign="center"
              >
                {/* Text Content */}
                <Box>
                  <MotionHeading as="h2" size="2xl" my={4} variants={fadeInUp}>
                    What do sponsors do?
                  </MotionHeading>
                  <MotionText mb={4} variants={fadeInUp} textAlign="left">
                    Sponsors play a vital role in helping us achieve our goals.
                    Their generous contributions enable us to participate in
                    competitions and enhance our resources year by year.
                    <br />
                    <br />
                    There are many ways to support our team. For more
                    information, please read our sponsorship package.
                  </MotionText>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <MotionButton
                      as={Link}
                      href="/assets/Blackbird UAV Sponsorship Package 2024-2025.pdf"
                      target="_blank"
                      isExternal
                      size="lg"
                      bg="linear-gradient(135deg,rgb(255, 65, 97),rgb(247, 57, 51))"
                      color="white"
                      borderRadius="full"
                      mb={2}
                      p={6}
                      variants={scaleUp}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#e91c23",
                        boxShadow: "0 0px 15px rgba(233, 28, 35, 0.5)",
                        filter: "brightness(1.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition="all 0.3s ease-in-out"
                      boxShadow="lg"
                      _focus={{
                        outline: "none",
                        boxShadow: "0 0 0 2px #e68787",
                      }}
                      _hover={{
                        backgroundColor: "#e91c23",
                        transform: "scale(1.05)",
                        boxShadow: "0 0px 15px rgba(233, 28, 35, 0.5)",
                        filter: "brightness(1.2)",
                      }}
                      w="fit-content"
                    >
                      Sponsorship Package{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </MotionButton>
                  </Box>
                </Box>
                {/* Image */}
                <MotionBox
                  variants={fadeInUp}
                  overflow="hidden"
                  borderRadius="lg"
                  height="95%"
                  display="cover"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mb={2}
                >
                  <Image
                    src="/images/Sponsor_TeamWorking.jpg"
                    alt="Sponsorship Event"
                    objectFit="cover"
                    height="100%"
                    width="auto"
                    borderRadius="md"
                    boxShadow="lg"
                  />
                </MotionBox>
              </Grid>

              <Box
                width="100%"
                height="1px"
                bg="rgba(255, 255, 255, 0.2)"
                my={2}
              />

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={2}
                id="donate"
                className={styles.mobilePaddingBottom} // Add padding below the button in mobile mode
              >
                <MotionText
                  color="white"
                  mb={4}
                  variants={fadeInUp}
                  textAlign="center"
                >
                  If you have any questions, would like to discuss sponsorship
                  opportunities, or wish to support us with a donation, feel
                  free to reach out:
                </MotionText>
                <Box
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }} // Stack vertically on mobile
                  alignItems="center"
                  width="100%"
                >
                  <MotionButton
                    as={Link}
                    href="mailto:sponsor@blackbirduav.ca?subject=Blackbird%20UAV%20Sponsorship"
                    target="_blank"
                    isExternal
                    size={{ base: "md", md: "lg" }} // Smaller on mobile
                    bg="linear-gradient(135deg,rgb(255, 65, 97),rgb(247, 57, 51))"
                    color="white"
                    borderRadius="full"
                    mb={2}
                    p={{ base: 4, md: 6 }} // Less padding on mobile
                    variants={scaleUp}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#e91c23",
                      boxShadow: "0 0px 15px rgba(233, 28, 35, 0.5)",
                      filter: "brightness(1.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition="all 0.3s ease-in-out"
                    boxShadow="lg"
                    _focus={{
                      outline: "none",
                      boxShadow: "0 0 0 2px #e68787",
                    }}
                    _hover={{
                      backgroundColor: "#e91c23",
                      transform: "scale(1.05)",
                      boxShadow: "0 0px 15px rgba(233, 28, 35, 0.5)",
                      filter: "brightness(1.2)",
                    }}
                    w={{ base: "90%", md: "fit-content" }} // Width control for mobile
                  >
                    Send us an email <FontAwesomeIcon icon={faEnvelope} />
                  </MotionButton>

                  <MotionButton
                    as={Link}
                    href="https://futurefunder.carleton.ca/campaigns/blackbird-uav-national-design-competition/"
                    target="_blank"
                    isExternal
                    size={{ base: "md", md: "lg" }} // Smaller on mobile
                    bg="linear-gradient(135deg,rgb(65, 105, 225),rgb(57, 51, 247))"
                    color="white"
                    borderRadius="full"
                    mb={2}
                    p={{ base: 4, md: 6 }} // Less padding on mobile
                    ml={{ base: 0, md: 4 }} // No left margin on mobile
                    variants={scaleUp}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#4169e1",
                      boxShadow: "0 0px 15px rgba(65, 105, 225, 0.5)",
                      filter: "brightness(1.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition="all 0.3s ease-in-out"
                    boxShadow="lg"
                    _focus={{
                      outline: "none",
                      boxShadow: "0 0 0 2px #87a7e6",
                    }}
                    _hover={{
                      backgroundColor: "#4169e1",
                      transform: "scale(1.05)",
                      boxShadow: "0 0px 15px rgba(65, 105, 225, 0.5)",
                      filter: "brightness(1.2)",
                    }}
                    w={{ base: "90%", md: "fit-content" }} // Width control for mobile
                  >
                    Donate <FontAwesomeIcon icon={faDonate} />
                  </MotionButton>
                </Box>

                <MotionText
                  color="gray.400"
                  fontSize={{ base: "xs", md: "sm" }} // Smaller on mobile
                  mt={2}
                  px={{ base: 3, md: 0 }} // Add padding on mobile
                  textAlign="center"
                  fontStyle="italic"
                  fontWeight="bold"
                  variants={fadeInUp}
                >
                  * Note: Unlike sponsorships, donations do not provide
                  corporate benefits or recognition in return.
                </MotionText>
              </Box>
            </Box>
          </MotionStack>
        </Container>
      </MotionBox>
    </>
  );
};

export default React.memo(SponsorSidebar);
