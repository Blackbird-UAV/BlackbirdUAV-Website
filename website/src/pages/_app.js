import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import { ChakraProvider } from "@chakra-ui/react";
import BackToTopButton from "@/components/BackToTopButton";
import { defaultSystem } from "@chakra-ui/react/preset";

const theme = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <MantineProvider>
        <ChakraProvider value={defaultSystem}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </MantineProvider>
      <BackToTopButton />
    </>
  );
}
