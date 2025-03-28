import { Grid, GridItem, Box, Link, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import sponsors from "@/data/sponsorData";
import { fadeInUp } from "@/components/animations";

// const DURATIONS = {
//   VeryFast: 0.2,
//   Fast: 0.4,
//   Normal: 0.6,
//   Slow: 0.8,
//   VerySlow: 1.0
// }

const columnSettings = {
  Partner: 1,
  Gold: 2,
  Silver: 3,
  Bronze: 3,
  Support: 3,
};

const SponsorGrid = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSponsorsByTier = (tier) => {
    const columns = columnSettings[tier];
    const filteredSponsors = sponsors.filter(
      (s) => s.tier.toLowerCase() === tier.toLowerCase()
    );

    const rows = Math.ceil(filteredSponsors.length / columns);
    const lastRowSponsors = filteredSponsors.slice((rows - 1) * columns);
    const shouldCenterLastRow = lastRowSponsors.length < columns;
    const calculateLeftMargin = () => {
      const gap = 8;
      const columnWidth = (windowWidth - (96 + 32)) / columns;
      const totalWidth = columns * columnWidth + (columns - 1) * gap;
      const lastRowWidth =
        lastRowSponsors.length * columnWidth +
        (lastRowSponsors.length - 1) * gap;
      return (totalWidth - lastRowWidth) / 2;
    };
    const leftMargin = calculateLeftMargin();

    return (
      <>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} px={2} w="100%">
          {filteredSponsors
            .slice(0, filteredSponsors.length - lastRowSponsors.length)
            .map((sponsor) => (
              <motion.div
                key={sponsor.name}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
              >
                <GridItem
                  as={Link}
                  target="_blank"
                  href={sponsor.link}
                  isExternal
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <Box
                    bg="white"
                    margin={2}
                    padding={2}
                    borderRadius="md"
                    boxShadow="md"
                    transition="transform 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.02)" }}
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

        {shouldCenterLastRow && (
          <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            px={2}
            w="100%"
            justifyContent="center" // Center the last row
            marginLeft={leftMargin}
          >
            {lastRowSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
              >
                <GridItem
                  as={Link}
                  target="_blank"
                  href={sponsor.link}
                  isExternal
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <Box
                    bg="white"
                    margin={2}
                    padding={2}
                    borderRadius="md"
                    boxShadow="md"
                    transition="transform 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.02)" }}
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
        )}
      </>
    );
  };

  return (
    <>
      {["Partner", "Gold", "Silver", /* "Bronze", */ "Support"].map(
        (tier, index) => (
          <div key={index}>{renderSponsorsByTier(tier)}</div>
        )
      )}
    </>
  );
};

export default SponsorGrid;
