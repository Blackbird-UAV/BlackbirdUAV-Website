// src/pages/_app.js
import "@mantine/carousel/styles.css";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import { ChakraProvider } from "@chakra-ui/react";
import BackToTopButton from "@/components/BackToTopButton";
import { defaultSystem } from "@chakra-ui/react/preset";

// Prevent Font Awesome icons from loading in before their CSS has (the massive icons on Join page)
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { GoogleAnalytics } from "@next/third-parties/google";
config.autoAddCss = false; // Prevent duplicate CSS injection

export default function App({ Component, pageProps }) {
  return (
    <>
      <MantineProvider>
        <ChakraProvider value={defaultSystem}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <GoogleAnalytics gaId="G-G90X971NWB" />
        </ChakraProvider>
      </MantineProvider>
      <BackToTopButton />
    </>
  );
}
