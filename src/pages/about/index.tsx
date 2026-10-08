import Link from 'next/link'
import Layout from '../../components/Layout/Layout'
import { Arrow, PageIntro } from '../../components/Portfolio/Elements'
import { AboutCards } from '../../components/Portfolio/Studio'
import { capabilities } from '../../data/portfolio'

export default function About() {
  return (
    <Layout>
      <div className="container page-content studio-about-page">
        <PageIntro label="A LITTLE ABOUT ME / 02" title={<>An engineer.<br />A work in <span className="serif">progress.</span></>} description="I'm Amey Bhagwatkar. I build web applications, explore AI, and solve problems from Pune, India." />
        <div className="about-editorial reveal"><p className="handwritten">The short version.</p><div><h2>I like understanding how things work.<br /><span className="serif">Then making them a little better.</span></h2><p>My engineering background is in Electronics and Telecommunication at Vishwakarma Institute of Technology, Pune. Software gave me a way to turn that curiosity into something people can actually use.</p><p>At MTB Solutions, I worked with React.js, Express.js, MongoDB, and conversational AI tools. My projects range from full-stack products to mobile applications and experiments with computer vision.</p><p>Outside of building, I practice algorithms and enter programming contests. The enjoyable part is often the moment a difficult problem finally becomes a simple idea.</p><Link href="/timeline" className="text-link">Follow the journey <Arrow diagonal /></Link></div></div>
        <AboutCards />
        <section className="about-capabilities"><p className="eyebrow">WHAT I BRING TO THE TABLE</p><div className="capability-grid">{capabilities.map((item) => <article className="capability-card reveal" key={item.number}><span className="eyebrow">/ {item.number}</span><h3>{item.title}</h3><p>{item.description}</p><div className="tag-list">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
      </div>
    </Layout>
  )
}
