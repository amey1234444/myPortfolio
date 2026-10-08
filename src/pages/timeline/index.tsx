import Layout from '../../components/Layout/Layout'
import { PageIntro } from '../../components/Portfolio/Elements'
import { milestones } from '../../data/portfolio'

export default function Timeline() {
  return (
    <Layout>
      <div className="container page-content">
        <PageIntro
          label="THE JOURNEY / 03"
          title={
            <>
              One step.
              <br />
              <span className="serif">Then the next.</span>
            </>
          }
          description="Selected milestones from my journey through software development, hands-on projects, and competitive programming."
        />
        <div className="journey">
          {milestones.map((item, i) => (
            <article className="journey-item reveal" key={item.title}>
              <div className="journey-date">
                <span className="eyebrow">{item.date}</span>
                <span className="journey-dot" />
              </div>
              <div className="journey-body">
                <span className="eyebrow">
                  0{i + 1} / {item.subtitle}
                </span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="project-note">
          Selected milestones from the portfolio archive.
        </p>
      </div>
    </Layout>
  )
}
