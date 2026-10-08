import Head from 'next/head'
import { useRouter } from 'next/router'

const titles: Record<string, string> = {
  '/': 'Full-stack Developer & Problem Solver',
  '/projects': 'Projects',
  '/about': 'About',
  '/timeline': 'Journey',
  '/tools': 'Toolbox',
  '/projects/repos': 'GitHub Repositories',
}
export default function Seo() {
  const { pathname, asPath } = useRouter()
  const title = `${titles[pathname] || 'Portfolio'} · Amey Bhagwatkar`
  const description =
    'Amey Bhagwatkar — full-stack developer and competitive programmer in Pune, India. Explore web applications, AI experiments, and the thinking behind the code.'
  const url = `https://notamey.vercel.app${asPath.split(/[?#]/)[0]}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Amey Bhagwatkar" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
