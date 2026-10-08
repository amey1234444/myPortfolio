import Link from 'next/link'

import Layout from '../../components/Layout/Layout'
import {
  Arrow,
  OrbitalArt,
  PageIntro,
} from '../../components/Portfolio/Elements'
import { capabilities, profile } from '../../data/portfolio'

export default function About() {
  return (
    <Layout>
      <div className="container page-content">
        <PageIntro
          label="A LITTLE ABOUT ME / 02"
          title={
            <>
              A curious mind.
              <br />
              <span className="serif">A builder at heart.</span>
            </>
          }
          description="I'm Amey Bhagwatkar, a full-stack developer and competitive programmer based in Pune, India."
        />
        <div className="bio-grid">
          <div className="bio-art">
            <OrbitalArt />
          </div>
          <div className="bio-copy reveal">
            <p className="eyebrow">HELLO, AGAIN.</p>
            <h2>
              I like understanding
              <br />
              <span className="serif">how things work.</span>
            </h2>
            <p>
              And then figuring out how to make them work better. My interests
              span web development, mobile applications, AI, and the kind of
              problem-solving that makes you lose track of time.
            </p>
            <p>
              My engineering background is in Electronics and Telecommunication
              at Vishwakarma Institute of Technology, Pune. During my internship
              at MTB Solutions, I worked with React.js, Express.js, MongoDB, and
              conversational AI tools.
            </p>
            <p>
              Outside of building applications, you&apos;ll find me practicing
              algorithms, entering programming contests, and exploring new
              technologies.
            </p>
            <Link href="/timeline" className="text-link">
              Follow the journey <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="values-grid">
          {capabilities.map((item) => (
            <article className="reveal" key={item.number}>
              <p className="eyebrow">{item.number}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <a
          className="github-banner"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <p className="eyebrow">THE WORK CONTINUES</p>
            <h2>
              See what I&apos;m <span className="serif">building.</span>
            </h2>
            <p>Repositories, experiments, and contributions on GitHub.</p>
          </div>
          <Arrow diagonal />
        </a>
      </div>
    </Layout>
  )
}
