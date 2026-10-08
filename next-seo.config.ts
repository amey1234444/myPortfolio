import { DefaultSeoProps } from 'next-seo'

const SEO: DefaultSeoProps = {
  title: 'Amey Bhagwatkar · Full-stack Developer',
  description:
    'Full-stack developer and competitive programmer based in Pune, India.',
  openGraph: {
    url: 'https://notamey.vercel.app',
    title: 'Amey Bhagwatkar',
    description: 'Thoughtful code. Real-world impact.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Amey Bhagwatkar',
  },
  twitter: { cardType: 'summary' },
}
export default SEO
