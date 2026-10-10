import { useState } from 'react'

import Layout from '../../components/Layout/Layout'
import { Arrow, PageIntro } from '../../components/Portfolio/Elements'
import ProjectCard from '../../components/Portfolio/ProjectCard'
import { profile } from '../../data/portfolio'
import { projects } from '../../data/projects'

const filters = ['All projects', 'Full stack', 'AI & data', 'Mobile']
export default function Projects() {
  const [filter, setFilter] = useState('All projects')
  const filtered = projects.filter(
    (project) => filter === 'All projects' || project.category === filter
  )
  return (
    <Layout>
      <div className="container page-content">
        <PageIntro
          label="THE PROJECT INDEX / 01"
          title={<>The work, in detail.</>}
          description="Manufacturing workflows, image-generation infrastructure and event-driven services. Explore the systems, decisions and code behind the projects."
        />
        <div className="project-controls">
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>
                  {item === 'All projects'
                    ? projects.length
                    : projects.filter((project) => project.category === item)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow diagonal />
          </a>
        </div>
        <p className="sr-only" role="status">
          Showing {filtered.length} projects
        </p>
        <div className="project-grid" key={filter}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p className="project-note">
          Project artwork is an illustrative concept, not a screenshot of the
          deployed application.
        </p>
      </div>
    </Layout>
  )
}
