import Link from 'next/link'

import Layout from '../components/Layout/Layout'
import {
  Arrow,
  OrbitalArt,
  SectionHeading,
} from '../components/Portfolio/Elements'
import ProjectCard from '../components/Portfolio/ProjectCard'
import { capabilities, profile } from '../data/portfolio'
import { projects } from '../data/projects'

export default function HomePage() {
  return (
    <Layout>
      <section className="hero container">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="status-dot" /> AMEY BHAGWATKAR
          </p>
          <span className="eyebrow hero-location">BASED IN PUNE, INDIA ↗</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-role">FULL-STACK DEVELOPER & PROBLEM SOLVER</p>
            <h1>
              Thoughtful
              <br />
              code.
              <br />
              <span className="serif">Real-world</span>
              <br />
              <span className="accent">impact.</span>
            </h1>
            <p className="hero-description">
              I turn complex problems into considered digital experiences. From
              the first idea to the last interaction.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <Arrow diagonal />
              </a>
              <Link className="text-link" href="/about">
                A little about me <Arrow />
              </Link>
            </div>
          </div>
          <OrbitalArt />
        </div>
        <div className="hero-bottom">
          <span>
            WEB DEVELOPMENT <i /> AI APPLICATIONS <i /> COMPETITIVE PROGRAMMING
          </span>
          <a href="#work">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </div>
      </section>
      <section className="work-section container" id="work">
        <SectionHeading
          number="01"
          label="SELECTED WORK"
          title={
            <>
              Ideas made <span className="serif">tangible.</span>
            </>
          }
        >
          <Link className="text-link" href="/projects">
            All projects <Arrow diagonal />
          </Link>
        </SectionHeading>
        <div className="project-grid">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Link href="/projects/2" className="featured-row reveal">
          <span className="row-number">03</span>
          <div>
            <p className="eyebrow">DEVELOPER TOOL · AUTOMATION</p>
            <h3>Plagiarism WebApp</h3>
          </div>
          <p>Bringing a little more integrity to competitive coding.</p>
          <span className="circle-arrow">
            <Arrow diagonal />
          </span>
        </Link>
      </section>
      <section className="about-band">
        <div className="container about-grid reveal">
          <div>
            <p className="eyebrow">
              <span>02 /</span> THE WAY I THINK
            </p>
            <div className="asterisk" aria-hidden="true">
              ✳
            </div>
          </div>
          <div>
            <h2>
              Curious by nature.
              <br />
              <span className="serif">Engineer by practice.</span>
            </h2>
            <p>
              I&apos;m Amey, a developer who enjoys the space where logic meets
              creativity. I build web and mobile applications, explore AI, and
              keep my problem-solving skills sharp through competitive
              programming.
            </p>
            <Link href="/about" className="text-link">
              Get to know me <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className="capabilities-section container">
        <SectionHeading
          number="03"
          label="MY TOOLKIT"
          title={
            <>
              Built with <span className="serif">range.</span>
            </>
          }
        >
          <p className="section-aside">
            The right tools.
            <br />A thoughtful approach.
          </p>
        </SectionHeading>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card reveal" key={item.number}>
              <span className="eyebrow">/ {item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="practice-section container reveal">
        <div>
          <p className="eyebrow">
            <span>04 /</span> BEYOND THE INTERFACE
          </p>
          <h2>
            A habit of
            <br />
            <span className="serif">solving things.</span>
          </h2>
          <p>
            Algorithms, edge cases, and the satisfaction of finding a better
            approach. Competitive programming is where I keep learning.
          </p>
        </div>
        <div className="profile-list">
          {[
            ['LeetCode', 'Algorithms & contests', profile.leetcode],
            ['Codeforces', 'Competitive programming', profile.codeforces],
            [
              'GeeksforGeeks',
              'Data structures & practice',
              profile.geeksforgeeks,
            ],
            ['CodeChef', 'Contests & problem-solving', profile.codechef],
          ].map(([name, label, url], i) => (
            <a href={url} key={name} target="_blank" rel="noreferrer">
              <span className="row-number">0{i + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{label}</p>
              </div>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>
    </Layout>
  )
}
