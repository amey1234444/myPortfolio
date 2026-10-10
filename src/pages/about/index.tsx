import Layout from '../../components/Layout/Layout'
import { PageIntro } from '../../components/Portfolio/Elements'
import ActivitySection from '../../components/Studio/ActivitySection'
import { AboutBento } from '../../components/Studio/Studio'

export default function About() {
  return (
    <Layout>
      <div className="container page-content studio-about">
        <PageIntro
          label="THE PERSON BEHIND THE CODE"
          title={
            <>
              Developer by practice.
              <br />
              <span className="serif">Curious by default.</span>
            </>
          }
          description="I'm Amey Bhagwatkar, a full-stack developer in Pune. I build web applications, explore AI, and enjoy the kind of problem that makes you reach for a pen and paper."
        />
        <AboutBento />
        <div className="about-letter reveal">
          <span className="handwritten">A small introduction ↘</span>
          <div>
            <h2>
              I like understanding how things work.
              <br />
              And finding ways to make them better.
            </h2>
            <p>
              My engineering background is in Electronics and Telecommunication
              at VIT Pune. At MTB Solutions, I worked on web applications with
              React, Express, MongoDB, and conversational AI tools.
            </p>
            <p>
              That mix of engineering and experimentation shapes the way I
              build: start with the problem, understand the constraints, and pay
              attention to the person using the result.
            </p>
          </div>
        </div>
      </div>
      <ActivitySection />
    </Layout>
  )
}
