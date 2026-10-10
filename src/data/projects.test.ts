import { getStaticPaths, getStaticProps } from '../pages/projects/[id]'
import { featuredProjects, projects } from './projects'

describe('Project case studies', () => {
  it('keeps existing URLs and adds the three featured repositories', async () => {
    const result = await getStaticPaths({})
    expect(result.paths).toHaveLength(9)
    expect(new Set(projects.map((project) => project.id)).size).toBe(9)
    expect(featuredProjects.map((project) => project.title)).toEqual([
      'GRID-X',
      'IMG Creator',
      'News Platform',
    ])
    const oldProject = await getStaticProps({ params: { id: '0' } })
    expect(oldProject).toEqual({
      props: { project: expect.objectContaining({ title: 'ArtistHub' }) },
    })
    expect(await getStaticProps({ params: { id: 'unknown' } })).toEqual({
      notFound: true,
    })
  })
})
