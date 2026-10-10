import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/Layout/Layout'
import { Arrow, PageIntro } from '../../components/Portfolio/Elements'
import { ProjectVisual } from '../../components/Portfolio/ProjectCard'
import { PortfolioProject, projects } from '../../data/projects'

export default function ProjectDetail({
  project,
}: {
  project: PortfolioProject
}) {
  const nextProject =
    projects[
      (projects.findIndex((item) => item.id === project.id) + 1) %
        projects.length
    ]
  return (
    <Layout>
      <Head>
        <title>{project.title} · Amey Bhagwatkar</title>
        <meta
          name="description"
          content={project.description}
          key="description"
        />
      </Head>
      <div className="container page-content project-detail">
        <Link className="text-link back-link" href="/projects">
          ← Back to projects
        </Link>
        <PageIntro
          label={project.kind}
          title={project.title}
          description={project.description}
        />
        {project.caseStudy && (
          <div className="case-study-meta">
            <span>{project.caseStudy.focus}</span>
            <span>{project.caseStudy.status}</span>
          </div>
        )}
        <ProjectVisual project={project} />
        <p className="project-note">
          Illustrative project artwork · concept visual
        </p>
        <div className="detail-grid">
          <div>
            <p className="eyebrow">THE PROJECT</p>
            <h2>
              Behind the <span className="serif">build.</span>
            </h2>
            <p>{project.detail}</p>
            {project.links.length > 0 ? (
              project.links.map((url) => (
                <a
                  key={url}
                  className="button button-primary"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {url.includes('github.com')
                    ? 'View source code'
                    : 'Open live project'}{' '}
                  <Arrow diagonal />
                </a>
              ))
            ) : (
              <p className="availability-note">
                A public demo or source link isn&apos;t available for this
                project yet. Get in touch to discuss the work.
              </p>
            )}
          </div>
          <aside>
            <p className="eyebrow">BUILT WITH</p>
            <div className="tag-list">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="eyebrow detail-category">CATEGORY</p>
            <p>{project.category}</p>
          </aside>
        </div>
        {project.caseStudy && (
          <div className="case-study-body">
            <section
              className="case-section case-challenge"
              aria-labelledby="challenge-heading"
            >
              <h2 id="challenge-heading">The problem to solve.</h2>
              <p>{project.caseStudy.challenge}</p>
            </section>
            <section
              className="case-section"
              aria-labelledby="capabilities-heading"
            >
              <h2 id="capabilities-heading">What the system does.</h2>
              <div className="capability-grid">
                {project.caseStudy.capabilities.map((capability) => (
                  <div key={capability.title}>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="case-section" aria-labelledby="flow-heading">
              <h2 id="flow-heading">From start to finish.</h2>
              <ol className="case-flow">
                {project.caseStudy.flow.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section
              className="case-section"
              aria-labelledby="decisions-heading"
            >
              <h2 id="decisions-heading">Decisions behind the build.</h2>
              <div className="case-decisions">
                {project.caseStudy.decisions.map((decision) => (
                  <div key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.description}</p>
                  </div>
                ))}
              </div>
            </section>
            <section
              className="case-section case-scope"
              aria-labelledby="scope-heading"
            >
              <h2 id="scope-heading">Current scope.</h2>
              <p>{project.caseStudy.scope}</p>
              <div className="case-sources">
                {project.caseStudy.sources.map((source) => (
                  <a
                    className="text-link"
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.label}
                    <Arrow diagonal />
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
        <Link className="next-project" href={`/projects/${nextProject.id}`}>
          <div>
            <p className="eyebrow">NEXT PROJECT</p>
            <h3>{nextProject.title}</h3>
          </div>
          <Arrow diagonal />
        </Link>
      </div>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((project) => ({ params: { id: String(project.id) } })),
  fallback: false,
})
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((item) => String(item.id) === params?.id)
  return project ? { props: { project } } : { notFound: true }
}
