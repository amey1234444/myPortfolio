import { useState } from 'react'

import Layout from '../../components/Layout/Layout'
import { Arrow, PageIntro } from '../../components/Portfolio/Elements'
import tools from '../../data/tools'

export default function Tools() {
  const [query, setQuery] = useState('')
  const filtered = tools.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase().trim())
  )
  return (
    <Layout>
      <div className="container page-content">
        <PageIntro
          label="THE TOOLBOX / 04"
          title={
            <>
              Less friction.
              <br />
              <span className="serif">More making.</span>
            </>
          }
          description="A collection of development, design, and everyday productivity tools from my toolkit."
        />
        <div className="tools-search">
          <label htmlFor="tool-search">
            Find a tool
            <input
              id="tool-search"
              type="search"
              placeholder="Search the toolbox…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <span role="status">{filtered.length} tools</span>
        </div>
        <div className="tools-grid">
          {filtered.map((tool) => (
            <a
              className="tool-card"
              href={tool.link}
              target="_blank"
              rel="noreferrer"
              key={tool.id}
            >
              <span className="tool-initial">{tool.title.slice(0, 1)}</span>
              <h2>{tool.title}</h2>
              <Arrow diagonal />
            </a>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <h2>No tools found.</h2>
            <p>
              Try a different name, or clear your search to see the full
              collection.
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => setQuery('')}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
