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
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionStack = motion(Stack);
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);
  const display = useBreakpointValue({ base: "none", lg: "block" });

  const handleContactUsClick = () => {
    window.location.href =
      "mailto:business@cublackbird.ca?subject=Inquiry%20from%20Sponsor&body=Dear%20Team%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20about%20our%20sponsorship.";
  };

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      position="fixed" // Set the position to 'fixed' to make it stick at the bottom
      top={20} // This will stick the sidebar to the bottom of the page
      width="55%" // Optional: Set the width to 100% to cover the full width of the page
      // maxHeight="auto"
      bg="black"
      color="white"
    >
      {/* <motion.div
        id="sidebarCircle"
        className={`${styles.sidebar}`}
        variants={scaleUp}
        style={{ display: display }}
        animate={"animate"}
      ></motion.div> */}
      <Container
        padding={0}
        mt={4}
        // height={{ xl: "100vh" }}
        display={{ xl: "flex" }}
        alignItems={{ xl: "center" }}
      >
        <MotionStack variants={stagger} spacing={6} w="100%">
          {/* Heading */}
          <MotionHeading as="h1" size="3xl" color="#e68787" variants={fadeInUp}>
            Sponsorships
          </MotionHeading>

          {/* Content Box */}
          <Box bg="gray.800" p={6} mt={2} borderRadius="md" boxShadow="lg">
            <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
              {/* Text Content */}
              <Box>
                <MotionHeading as="h2" size="2xl" mb={4} variants={fadeInUp}>
                  What do sponsors do?
                </MotionHeading>
                <MotionText mb={4} variants={fadeInUp}>
                  Sponsors play a vital role in helping us achieve our goals.
                  Their generous contributions enable us to participate in
                  competitions and enhance our resources year by year.
                  <br />
                  <br />
                  There are many ways to support our team. For more information,
                  please read our sponsorship package.
                </MotionText>
                <MotionButton
                  as={Link}
                  href="/assets/Blackbird UAV Sponsorship Package 2024-2025.pdf"
                  isExternal
                  size="lg"
                  bg="#e68787"
                  color="white"
                  borderRadius="full"
                  m={4}
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
                    boxShadow:
                      "0 0 0 2px #e68787" /* Focus outline matches the default color */,
                  }}
                  _hover={{
                    background:
                      "#e68787" /* Reverts to default color when unhovered */,
                    boxShadow:
                      "0 4px 15px rgba(0, 181, 216, 0.5)" /* Hover shadow effect */,
                  }}
                  display="flex" // Make the Box a flex container
                  alignItems="center" // Center horizontally
                >
                  Sponsorship Package
                </MotionButton>
              </Box>

              {/* Image */}
              <MotionBox
                variants={fadeInUp}
                overflow="hidden"
                borderRadius="lg"
                height="80%"
                display="cover"
              >
                <Image
                  src="/images/company4.jpg"
                  alt="Sponsorship Event"
                  objectFit="cover"
                  height="auto"
                  width="100%"
                  borderRadius="md"
                  boxShadow="md"
                />
              </MotionBox>
            </Grid>
            <Box
              display="flex" // Make the Box a flex container
              flexDirection="column" // Stack the content vertically
              alignItems="center" // Center horizontally
              mt={2}
            >
              <MotionText
                color="white"
                mb={3}
                variants={fadeInUp}
                textAlign="center"
              >
                If you have any questions or would like to discuss sponsorship
                opportunities, feel free to reach out:
              </MotionText>
              <MotionButton
                onClick={handleContactUsClick}
                size="lg"
                bg="#e68787"
                color="white"
                borderRadius="full"
                m={2}
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
                w="96%"
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
