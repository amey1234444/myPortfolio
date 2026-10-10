import Link from 'next/link'

import { PortfolioProject } from '../../data/projects'
import { Arrow } from './Elements'

export function ProjectVisual({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={`project-visual visual-${project.visual}`}
      aria-hidden="true"
    >
      <span className="preview-caption">
        CONCEPT VISUAL / {String(project.id + 1).padStart(2, '0')}
      </span>
      {project.visual === 'gridx' ? (
        <div className="gridx-art">
          <div className="gridx-art-top">
            <b>GRID-X</b>
            <span>Operations, connected.</span>
          </div>
          <div className="gridx-orbit">
            <span className="gridx-core">
              G<span>↗</span>
            </span>
            <i />
            <i />
            <i />
          </div>
          <div className="gridx-stages">
            <span>Plan</span>
            <span>Produce</span>
            <span>Inspect</span>
            <span>Dispatch</span>
          </div>
          <p>
            Every handoff.
            <br />
            <strong>One shared system.</strong>
          </p>
        </div>
      ) : project.visual === 'image-studio' ? (
        <div className="image-studio-art">
          <div className="image-art-frame frame-back" />
          <div className="image-art-frame frame-front">
            <span>img.</span>
            <i />
          </div>
          <div className="image-art-caption">
            <b>
              From a prompt
              <br />
              to a possibility.
            </b>
            <span>Generate · Review · Train</span>
          </div>
        </div>
      ) : project.visual === 'newsroom' ? (
        <div className="news-art">
          <div className="news-paper">
            <div className="news-masthead">The signal.</div>
            <div className="news-rule" />
            <b>
              Make sense
              <br />
              of the story.
            </b>
            <div className="news-lines">
              <i />
              <i />
              <i />
            </div>
            <span>RSS → AI → DELIVERY</span>
          </div>
          <div className="news-event">
            <span>news.refined</span>
            <b>Ready for the next step ↗</b>
          </div>
        </div>
      ) : project.visual === 'artist' ? (
        <div className="artist-preview">
          <div className="mini-nav">
            <b>
              artist<span>hub</span>
            </b>
            <span>Discover your next inspiration ↗</span>
          </div>
          <div className="artist-type">
            Where ideas
            <br />
            <em>find their people.</em>
          </div>
          <div className="art-tiles">
            <div className="art-tile tile-one" />
            <div className="art-tile tile-two" />
            <div className="art-tile tile-three" />
          </div>
          <div className="chat-pill">
            <span>✳</span> A little creative assistance.
          </div>
        </div>
      ) : project.visual === 'split' ? (
        <div className="split-preview">
          <div className="mini-nav">
            <b>
              split<span>it.</span>
            </b>
            <span>Life is better shared ↗</span>
          </div>
          <div className="expense-card">
            <span>THE WEEKEND PLAN</span>
            <strong>
              Good times.
              <br />
              All squared up.
            </strong>
            <div className="avatars">
              <i>A</i>
              <i>B</i>
              <i>C</i>
              <i>+1</i>
            </div>
            <div className="expense-line">
              <span>Dinner with friends</span>
              <b>₹2,400</b>
            </div>
            <div className="expense-line">
              <span>Your share</span>
              <b>₹600</b>
            </div>
            <div className="settled">✓ Split equally. Simply.</div>
          </div>
        </div>
      ) : project.visual === 'code' ? (
        <div className="code-preview">
          <div className="code-toolbar">
            <i />
            <i />
            <i />
            <span>contest-review.ts</span>
          </div>
          <div className="code-columns">
            <div>
              <span>01</span> function compare() {'{'}
              <br />
              <span>02</span> &nbsp;const patterns =<br />
              <span>03</span> &nbsp;&nbsp;analyze(submissions);
              <br />
              <span>04</span> &nbsp;return patterns;
              <br />
              <span>05</span> {'}'}
            </div>
            <div className="code-match">
              <span>⌁</span>
              <b>
                Look beyond
                <br />
                the solution.
              </b>
              <small>CODE · PATTERNS · INTEGRITY</small>
            </div>
          </div>
        </div>
      ) : (
        <div className={`abstract-preview abstract-${project.visual}`}>
          <span>
            {project.visual === 'notes'
              ? 'Aa'
              : project.visual === 'vision'
              ? '◉'
              : '⌘'}
          </span>
          <p>
            {project.visual === 'notes'
              ? 'Room for a thought.'
              : project.visual === 'vision'
              ? 'A different perspective.'
              : 'Everything is connected.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ProjectCard({
  project,
}: {
  project: PortfolioProject
}) {
  return (
    <article
      className={`project-card reveal ${
        project.caseStudy ? 'case-study-card' : ''
      }`}
    >
      <Link href={`/projects/${project.id}`} className="project-card-link">
        <ProjectVisual project={project} />
        <div className="project-card-copy">
          <div className="project-info">
            <div>
              <p className="eyebrow">{project.kind}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <span className="circle-arrow">
              <Arrow diagonal />
            </span>
          </div>
          <div className="tag-list">
            {project.stack.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {project.caseStudy && (
            <span className="case-study-link">
              Explore the case study <Arrow diagonal />
            </span>
          )}
        </div>
        <span className="sr-only">View project details</span>
      </Link>
    </article>
  )
}
