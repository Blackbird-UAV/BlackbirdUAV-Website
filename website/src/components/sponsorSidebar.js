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
// import styles from "@/styles/SponsorSidebar.module.css"; // this page uses tailwind now
import { fadeInUp, stagger, scaleUp } from "@/components/animations";

const SponsorSidebar = () => {
  const MotionHeading = motion.create(Heading);
  const MotionText = motion.create(Text);
  const MotionStack = motion.create(Stack);
  const MotionBox = motion.create(Box);
  const MotionButton = motion.create(Button);
  const display = useBreakpointValue({ base: "none", lg: "block" });

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

  const handleContactUsClick = () => {
    window.open(
      "mailto:sponsor@blackbirduav.ca?subject=Blackbird%20UAV%20Sponsorship",
      "_blank"
    );
  };

  return (
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
      {/* <motion.div
        id="sidebarCircle"
        className={`${styles.sidebar}`}
        variants={scaleUp}
        style={{ display: display }}
        animate={"animate"}
      ></motion.div> */}
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
          <MotionHeading as="h1" size="5xl" color="#ffffff" variants={fadeInUp}>
            Sponsorships
          </MotionHeading>
          {/* <Heading as="h1" size="3xl" color="#ffffff">
            Sponsorships
          </Heading> */}
          {/* Content Box */}
          <Box
            bg="gray.800"
            h="fit-content"
            minH="60vh"
            px={8}
            mt={2}
            borderRadius="md"
            boxShadow="lg"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
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
              {" "}
              {/* instead of center, do same space between */}
              {/* Text Content */}
              <Box>
                <MotionHeading as="h2" size="2xl" mb={4} variants={fadeInUp}>
                  What do sponsors do?
                </MotionHeading>
                <MotionText mb={4} variants={fadeInUp} textAlign="left">
                  {/* &emsp; */}
                  Sponsors play a vital role in helping us achieve our goals.
                  Their generous contributions enable us to participate in
                  competitions and enhance our resources year by year.
                  <br />
                  <br />
                  {/* &emsp; */}
                  There are many ways to support our team. For more information,
                  please read our sponsorship package.
                </MotionText>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <MotionButton
                    as={Link}
                    href="/assets/Blackbird UAV Sponsorship Package 2024-2025.pdf"
                    target="_blank"
                    isExternal
                    size="lg"
                    bg="#eb1d25"
                    color="white"
                    borderRadius="full"
                    mb={2}
                    p={6}
                    fontWeight="bold"
                    variants={scaleUp}
                    whileHover={{
                      scale: 1.1,
                      background: "linear-gradient(to right, #00b5d8, #4e9ff3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    boxShadow="lg"
                    _focus={{
                      outline: "none",
                      boxShadow: "0 0 0 2px #e68787",
                    }}
                    _hover={{
                      background: "#e68787",
                      boxShadow: "0 4px 15px rgba(0, 181, 216, 0.5)",
                    }}
                    w="fit-content"
                  >
                    Sponsorship Package
                  </MotionButton>
                </Box>
              </Box>
              {/* Image */}
              <MotionBox
                variants={fadeInUp}
                overflow="hidden"
                borderRadius="lg"
                height="95%"
                // display="flex"
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
                  // height="auto"
                  // width="100%"
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
            >
              <MotionText
                color="white"
                mb={4}
                variants={fadeInUp}
                textAlign="center"
              >
                If you have any questions or would like to discuss sponsorship
                opportunities, feel free to reach out:
              </MotionText>
              <MotionButton
                onClick={handleContactUsClick}
                size="lg"
                bg="#eb1d25"
                color="white"
                borderRadius="full"
                mb={2}
                p={6}
                fontWeight="bold"
                variants={scaleUp}
                whileHover={{
                  scale: 1.1,
                  background: "linear-gradient(to right, #00b5d8, #4e9ff3)",
                }}
                whileTap={{ scale: 0.95 }}
                boxShadow="lg"
                _focus={{
                  outline: "none",
                  boxShadow: "0 0 0 2px #e68787", // Focus outline matches the default color
                }}
                _hover={{
                  background: "#e68787", // Reverts to default color when unhovered
                  boxShadow: "0 4px 15px rgba(0, 181, 216, 0.5)", // Hover shadow effect
                }}
                display="flex" // Make the Box a flex container
                alignItems="center" // Center horizontally
                w="fit-content"
              >
                Send us an email
              </MotionButton>
            </Box>
          </Box>
        </MotionStack>
      </Container>
    </MotionBox>
  );
};

export default React.memo(SponsorSidebar);
