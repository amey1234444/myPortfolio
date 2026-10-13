import { CSSProperties, useEffect, useRef, useState } from 'react'

const groups = [
  {
    name: 'Interfaces',
    symbol: '⚛',
    tools: 'React · Next.js · TypeScript',
    text: 'Responsive interfaces, clear interactions and the details that make an application comfortable to use.',
  },
  {
    name: 'Backend',
    symbol: '{ }',
    tools: 'Java · Spring Boot · Node.js · NestJS',
    text: 'APIs, background jobs and event-driven services. The foundations behind the interface.',
  },
  {
    name: 'AI & data',
    symbol: '✳',
    tools: 'Python · PyTorch · LangChain · PostgreSQL',
    text: 'Image-generation workflows, AI applications and the data they depend on.',
  },
  {
    name: 'Problem solving',
    symbol: '↗',
    tools: 'C++ · Algorithms · Data structures',
    text: 'Breaking a complicated problem into smaller, testable pieces. Then looking for a simpler solution.',
  },
]

export default function SkillOrbit() {
  const [selected, setSelected] = useState(0)
  const [active, setActive] = useState(false)
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setActive(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])
  const group = groups[selected]
  return (
    <section
      ref={root}
      data-active={active}
      className="skill-universe"
      aria-label="Explore my skills"
    >
      <div className="star-field" aria-hidden="true">
        {Array.from({ length: 38 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 47 + 3) % 100}%`,
              top: `${(i * 31 + 11) % 100}%`,
              opacity: 0.18 + (i % 4) * 0.13,
            }}
          />
        ))}
      </div>
      <div className="universe-top">
        <span>A FEW THINGS IN MY ORBIT</span>
        <span>Always learning ↗</span>
      </div>
      <div className="universe-stage" aria-hidden="true">
        <span className="universe-word">SKILLS</span>
        <div className="orbit-scene">
          <div className="orbit-sun">
            a<span>b.</span>
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              className="skill-orbit"
              key={i}
              style={
                {
                  '--orbit': i,
                  '--duration': `${19 + i * 11}s`,
                  '--delay': `${-i * 8}s`,
                } as CSSProperties
              }
            >
              <div className="planet-track">
                <span className="skill-planet" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="universe-controls"
        role="group"
        aria-label="Skill disciplines"
      >
        {groups.map((item, i) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span aria-hidden="true">{item.symbol}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="universe-readout" aria-live="polite" aria-atomic="true">
        <h2>{group.tools}</h2>
        <p>{group.text}</p>
      </div>
    </section>
  )
}
