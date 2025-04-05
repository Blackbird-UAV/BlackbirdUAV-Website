import { Grid, GridItem, Box, Link, Image } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import sponsors from "@/data/sponsorData";

const TIER_COLUMN_CONFIG = {
  Partner: 1,
  Gold: 2,
  Silver: 3,
  Bronze: 3,
  Support: 3,
};

const TIERS = ["Partner", "Gold", "Silver", /* "Bronze", */ "Support"];

const SponsorItem = ({ sponsor, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
  );
};

const SponsorGrid = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const calculateLastRowLeftMargin = (tier, lastRowCount) => {
    const columns = TIER_COLUMN_CONFIG[tier];
    const gap = 8;
    const columnWidth = (windowWidth - (96 + 32)) / columns;
    const totalWidth = columns * columnWidth + (columns - 1) * gap;
    const lastRowWidth = lastRowCount * columnWidth + (lastRowCount - 1) * gap;
    
    return (totalWidth - lastRowWidth) / 2;
  };

  const renderSponsorsByTier = (tier) => {
    const columns = TIER_COLUMN_CONFIG[tier];
    const filteredSponsors = sponsors.filter(
      (s) => s.tier.toLowerCase() === tier.toLowerCase()
    );

    if (!filteredSponsors.length) return null;

    const rows = Math.ceil(filteredSponsors.length / columns);
    const mainRowsSponsors = filteredSponsors.slice(0, (rows - 1) * columns);
    const lastRowSponsors = filteredSponsors.slice((rows - 1) * columns);
    const shouldCenterLastRow = lastRowSponsors.length < columns;
    const leftMargin = shouldCenterLastRow 
      ? calculateLastRowLeftMargin(tier, lastRowSponsors.length) 
      : 0;

    return (
      <>
        {mainRowsSponsors.length > 0 && (
          <Grid templateColumns={`repeat(${columns}, 1fr)`} px={2} w="100%">
            {mainRowsSponsors.map((sponsor, index) => (
              <SponsorItem key={sponsor.name} sponsor={sponsor} index={index} />
            ))}
          </Grid>
        )}

        {lastRowSponsors.length > 0 && (
          <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            px={2}
            w="100%"
            justifyContent="center"
            marginLeft={shouldCenterLastRow ? leftMargin : 0}
          >
            {lastRowSponsors.map((sponsor, index) => (
              <SponsorItem 
                key={sponsor.name} 
                sponsor={sponsor} 
                index={mainRowsSponsors.length + index} 
              />
            ))}
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      {TIERS.map((tier) => (
        <div key={tier}>{renderSponsorsByTier(tier)}</div>
      ))}
    </>
  );
};

export default SponsorGrid;