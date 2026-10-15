import Head from 'next/head'

const SITE_URL = 'https://blackbirduav.ca'

// The <head> tags every page needs: its title and description, the canonical
// URL, and the Open Graph and Twitter Card tags that link previews (Slack,
// Discord, LinkedIn, iMessage...) read. `path` is the page's clean URL, e.g.
// '/' or '/MeetTheTeam/2026-2027'. `title` must be a plain string: Next.js
// warns when <title> gets more than one child.
export default function PageMeta ({ title, description, path }) {
  const url = SITE_URL + path
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='canonical' href={url} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Blackbird UAV' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* 1200x630, cropped from images/Vehicles/Leviathan_2.jpg */}
      <meta property='og:image' content={`${SITE_URL}/images/og.jpg`} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta
        property='og:image:alt'
        content='Leviathan, a Blackbird UAV quadcopter, flying in front of autumn trees'
      />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  )
}
