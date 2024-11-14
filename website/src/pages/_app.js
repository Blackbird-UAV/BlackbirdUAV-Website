import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MantineProvider } from "@mantine/core";
import BackToTopButton from "@/components/BackToTopButton";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MantineProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
      <BackToTopButton /> 
    </>
  );
}
