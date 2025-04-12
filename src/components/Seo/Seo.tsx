import Head from 'next/head'

const Seo = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="Amey's personal website" />
      <meta name="keywords" content="Amey, developer, portfolio, personal website" />
      <meta property="og:title" content="Amey's Website" />
      <meta property="og:description" content="Amey's personal website" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ameybhagwatkar.dev" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Amey's Website" />
      <meta name="twitter:description" content="Amey's personal website" />
      <title>Amey&apos;s Website</title>
    </Head>
  )
}

export default Seo
