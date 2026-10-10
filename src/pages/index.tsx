import Link from 'next/link'

import Layout from '../components/Layout/Layout'
import { Arrow, SectionHeading } from '../components/Portfolio/Elements'
import ProjectCard from '../components/Portfolio/ProjectCard'
import ActivitySection from '../components/Studio/ActivitySection'
import { AboutBento, StudioHero } from '../components/Studio/Studio'
import { projects } from '../data/projects'

export default function HomePage() {
  return (
    <Layout>
      <StudioHero />
      <section className="container studio-section" id="work">
        <SectionHeading
          number="01"
          label="A FEW THINGS I'VE BUILT"
          title={
            <>
              Less talking.
              <br />
              <span className="serif">More making.</span>
            </>
          }
        >
          <Link className="text-link" href="/projects">
            View all projects <Arrow diagonal />
          </Link>
        </SectionHeading>
        <div className="project-grid">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <Link href="/projects/2" className="studio-project-row reveal">
          <span>03 / DEVELOPER TOOLS</span>
          <h3>Keeping competition fair.</h3>
          <span>Plagiarism WebApp</span>
          <Arrow diagonal />
        </Link>
      </section>
      <section className="container studio-section" id="about">
        <SectionHeading
          number="02"
          label="THE PERSON BEHIND THE CODE"
          title={
            <>
              Hello again.
              <br />
              <span className="serif">A little more me.</span>
            </>
          }
        >
          <Link href="/about" className="text-link">
            The longer version <Arrow diagonal />
          </Link>
        </SectionHeading>
        <AboutBento />
      </section>
      <ActivitySection />
    </Layout>
  )
}
