import useSWR from 'swr'

import Layout from '../../../components/Layout/Layout'
import { Arrow, PageIntro } from '../../../components/Portfolio/Elements'
import { profile } from '../../../data/portfolio'

type Repository = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
}
async function fetchRepositories(url: string): Promise<Repository[]> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('GitHub is temporarily unavailable')
  return response.json()
}
export default function Repositories() {
  const { data, error, mutate } = useSWR<Repository[]>(
    'https://api.github.com/users/amey1234444/repos?per_page=100&sort=updated',
    fetchRepositories,
    { shouldRetryOnError: false }
  )
  return (
    <Layout>
      <div className="container page-content">
        <PageIntro
          label="OPEN SOURCE / THE REPOSITORIES"
          title={
            <>
              More behind <span className="serif">the scenes.</span>
            </>
          }
          description="Explore my public GitHub repositories. This collection loads directly from GitHub."
        />
        {error ? (
          <div className="empty-state" role="status">
            <h2>GitHub is taking a moment.</h2>
            <p>
              The repository feed is unavailable. You can retry or visit my
              profile directly.
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => mutate()}
            >
              Try again
            </button>
          </div>
        ) : !data ? (
          <p role="status">Loading repositories…</p>
        ) : data.length === 0 ? (
          <p>No public repositories found.</p>
        ) : (
          <div className="tools-grid">
            {data.map((repo) => (
              <a
                className="tool-card"
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <h2>{repo.name}</h2>
                <Arrow diagonal />
              </a>
            ))}
          </div>
        )}
        <a
          className="text-link back-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          Visit GitHub <Arrow diagonal />
        </a>
      </div>
    </Layout>
  )
}
