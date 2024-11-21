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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import styles from "@/styles/SponsorSidebar.module.css";
import { fadeInUp, stagger, scaleUp } from "@/components/animations";

const SponsorSidebar = () => {
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionStack = motion(Stack);
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      position={{ xl: "fixed" }}
      maxWidth={{ base: "100%", xl: "50%" }}
      top={{ lg: 0 }}
      bg="black"
      color="white"
    >
      <Container
        padding={0}
        margin={0}
        height={{ xl: "100vh" }}
        display={{ xl: "flex" }}
        alignItems={{ xl: "center" }}
      >
        <MotionStack variants={stagger} spacing={6} w="100%">
          {/* Heading */}
          <MotionHeading as="h1" size="3xl" variants={fadeInUp}>
            Sponsorships
          </MotionHeading>

          {/* Content Box */}
          <Box bg="gray.800" py={5} px={5} my={5} borderRadius="md" boxShadow="lg">
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
              {/* Text Content */}
              <Box>
                <MotionHeading
                  as="h2"
                  size="lg"
                  mb={4}
                  variants={fadeInUp}
                >
                  What do sponsors do?
                </MotionHeading>
                <MotionText mb={4} variants={fadeInUp}>
                  Sponsors play a vital role in helping us achieve our goals. We proudly display
                  our sponsors' logos and brands at competitions, just like we do at any local
                  team event. Their generous contributions enable us to participate in competitions
                  and enhance our resources year by year.
                  <br />
                  <br />
                  There are many ways to support our team. For more information, please read our sponsorship package.
                </MotionText>
                <MotionButton
                  as={Link}
                  href="/assets/Blackbird UAV Sponsorship Package 2024-2025.pdf"
                  isExternal
                  size="lg"
                  colorScheme="teal"
                  borderRadius="full"
                  m={4}
                  p={6}
                  fontWeight="bold"
                  variants={scaleUp}
                  whileHover={{ scale: 1.1, background: "linear-gradient(to right, #00b5d8, #4e9ff3)" }}
                  whileTap={{ scale: 0.95 }}
                  boxShadow="lg"
                  _focus={{ outline: "none", boxShadow: "0 0 0 2px #00b5d8" }}
                  _hover={{ boxShadow: "0 4px 15px rgba(0, 181, 216, 0.5)" }}
                >
                  Sponsorship Package
                </MotionButton>
              </Box>

              {/* Image */}
              <MotionBox
                variants={fadeInUp}
                overflow="hidden"
                borderRadius="lg"
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
          </Box>
        </MotionStack>
      </Container>
    </MotionBox>
  );
};

export default SponsorSidebar;
