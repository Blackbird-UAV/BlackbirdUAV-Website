// src/pages/_app.js
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MantineProvider } from '@mantine/core'
import BackToTopButton from '@/components/BackToTopButton'
import { Fahkwang, Fira_Sans } from 'next/font/google'
import { MotionConfig } from 'motion/react'

// Prevent Font Awesome icons from loading in before their CSS has (the massive icons on Join page)
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics } from '@next/third-parties/google'
config.autoAddCss = false // Prevent duplicate CSS injection

// next/font downloads these at build time and serves them from
// /_next/static/media, so visitors never fetch anything from Google.
// It declares every face under the family's real name, so the calls below
// add up to one 'Fira Sans' and one 'Fahkwang'. They are split only to load
// exactly the weights and styles the CSS uses and to pick what is
// preloaded; the calls that aren't referenced still add their faces. If
// the CSS starts using another weight or style, add it here, or the
// browser will fake it from the nearest face.
//
// Regular Fira Sans (page titles, body copy) is above the fold on most
// pages, so it is the one file preloaded. The other faces are fetched when
// text first needs them, with a size-matched fallback shown until then.
const firaSans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
const firaSansWeights = Fira_Sans({
  weight: ['300', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  preload: false
})
const firaSansItalic = Fira_Sans({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  preload: false
})
// Only the home page hero uses Fahkwang, so none of it is preloaded.
const fahkwang = Fahkwang({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  preload: false
})
const fahkwangItalic = Fahkwang({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  preload: false
})

// <main> takes focus only for the skip link's jump. Always focusable, a
// click on any of its text would focus it, and the next Tab would go back
// to the top of the page instead of on from the click.
const focusMain = () => {
  const main = document.getElementById('main')
  main.setAttribute('tabindex', '-1')
  main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true })
}

export default function App ({ Component, pageProps }) {
  return (
    <>
      {/* On :root so every element, portals included, can use them */}
      <style jsx global>{`
        :root {
          --font-fira-sans: ${firaSans.style.fontFamily};
          --font-fahkwang: ${fahkwang.style.fontFamily};
        }
      `}</style>
      {/* With the OS's reduce-motion setting on, motion animations skip
          their movement (transforms) and keep only fades */}
      <MotionConfig reducedMotion='user'>
        <MantineProvider>
          {/* First thing a keyboard user reaches; jumps past the navbar */}
          <a href='#main' className='skip-link' onClick={focusMain}>
            Skip to content
          </a>
          <Navbar />
          <main id='main'>
            <Component {...pageProps} />
          </main>
          <Footer />
          <GoogleAnalytics gaId='G-G90X971NWB' />
        </MantineProvider>
      </MotionConfig>
      <BackToTopButton />
    </>
  )
}
