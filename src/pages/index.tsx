import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import { Arrow, SectionHeading } from '../components/Portfolio/Elements'
import ProjectCard from '../components/Portfolio/ProjectCard'
import Activity from '../components/Portfolio/Activity'
import { AboutCards, Workbench } from '../components/Portfolio/Studio'
import { profile } from '../data/portfolio'
import { projects } from '../data/projects'

export default function HomePage() {
  return (
    <Layout>
      <section className="studio-hero container">
        <div className="studio-kicker"><p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER & CURIOUS HUMAN</p><span>BASED IN PUNE, INDIA ↗</span></div>
        <div className="studio-title"><p className="studio-greeting">Hey there, I&apos;m</p><h1>Amey<span className="name-period">.</span><span className="sr-only"> Bhagwatkar</span></h1><div className="hero-margin-note"><span aria-hidden="true">↙</span><p>Good questions.<br />Thoughtful code.<br />A little personality.</p></div></div>
        <div className="studio-hero-grid">
          <div className="studio-intro">
            <h2>I build things for<br /><span className="serif">the other side<br />of the screen.</span></h2>
            <p>Web applications, AI experiments, and the systems that make them work. I like taking a complicated idea and finding a clear, useful way to bring it to life.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Take a look around <Arrow diagonal /></a><a href={profile.github} target="_blank" rel="noreferrer" className="text-link">GitHub <Arrow diagonal /></a></div>
            <div className="intro-signoff"><span className="handwritten">Always a work in progress.</span><span aria-hidden="true">↴</span></div>
          </div>
          <Workbench />
        </div>
        <div className="studio-index"><span>01 / SELECTED WORK</span><span>02 / THE PERSON</span><span>03 / THE PRACTICE</span><a href="#work" aria-label="Scroll to selected work">SCROLL TO EXPLORE ↓</a></div>
      </section>
      <section className="work-section container" id="work">
        <SectionHeading number="01" label="A FEW THINGS I'VE BUILT" title={<>From a what-if<br /><span className="serif">to a working thing.</span></>}><Link className="text-link" href="/projects">All projects <Arrow diagonal /></Link></SectionHeading>
        <div className="project-grid">{projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        <Link href="/projects/2" className="featured-row reveal"><span className="row-number">03</span><div><p className="eyebrow">DEVELOPER TOOL · AUTOMATION</p><h3>Plagiarism WebApp</h3></div><p>A closer look at the code behind the contest.</p><span className="circle-arrow"><Arrow diagonal /></span></Link>
        <p className="project-note">Project artwork is illustrative. Open a project for its details and available live links.</p>
      </section>
      <section className="studio-about container" id="about">
        <SectionHeading number="02" label="MORE THAN A TECH STACK" title={<>The person<br /><span className="serif">behind the commits.</span></>}><Link href="/about" className="text-link">A little more about me <Arrow diagonal /></Link></SectionHeading>
        <AboutCards />
      </section>
      <Activity />
      <section className="closing-note container reveal"><span aria-hidden="true">✳</span><p>Good software starts with a conversation.<br /><span className="serif">Let&apos;s have one.</span></p><a href="#contact" className="circle-arrow" aria-label="Go to contact"><Arrow diagonal /></a></section>
    </Layout>
  )
}
