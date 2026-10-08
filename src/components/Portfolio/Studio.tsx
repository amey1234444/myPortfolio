import { useRef, useState } from 'react'
import Link from 'next/link'
import { profile } from '../../data/portfolio'
import { Arrow } from './Elements'

const disciplines = [
  { name: 'Web', file: 'interface.tsx', title: 'Make the useful feel effortless.', lines: ['const experience = {', '  interface: "clear & responsive",', '  details: "worth getting right",', '  people: "at the centre",', '};', '', 'build(experience);'], tags: ['React', 'Next.js', 'TypeScript'], note: 'Interfaces with a purpose.' },
  { name: 'Systems', file: 'service.ts', title: 'Good interfaces need solid foundations.', lines: ['async function handle(request) {', '  const input = validate(request);', '  const result = await service(input);', '  return respond(result);', '}', '', '// Understand the edge cases.'], tags: ['Node.js', 'PostgreSQL', 'Java'], note: 'Thoughtful APIs. Clear boundaries.' },
  { name: 'AI', file: 'assistant.py', title: 'Connect curiosity to something useful.', lines: ['def answer(question):', '    context = retrieve(question)', '    response = model.generate(', '        question, context=context', '    )', '    return evaluate(response)', '', '# Keep the human in the loop.'], tags: ['Python', 'LangChain', 'LangGraph'], note: 'Experiments that become applications.' },
]

export function Workbench() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const current = disciplines[selected]
  return (
    <div className="workbench">
      <div className="workbench-top"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>amey / workbench</span><span className="workbench-star" aria-hidden="true">✳</span></div>
      <div className="workbench-tabs" role="tablist" aria-label="Engineering disciplines">
        {disciplines.map((item, index) => <button key={item.name} ref={(element) => { tabs.current[index] = element }} type="button" role="tab" id={'discipline-' + index} aria-selected={selected === index} aria-controls="discipline-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
          let next = selected
          if (event.key === 'ArrowRight') next = (selected + 1) % disciplines.length
          else if (event.key === 'ArrowLeft') next = (selected + disciplines.length - 1) % disciplines.length
          else if (event.key === 'Home') next = 0
          else if (event.key === 'End') next = disciplines.length - 1
          else return
          event.preventDefault(); setSelected(next); tabs.current[next]?.focus()
        }}>{item.name}<span aria-hidden="true">0{index + 1}</span></button>)}
      </div>
      <div role="tabpanel" id="discipline-panel" aria-labelledby={'discipline-' + selected} tabIndex={0}>
        <div className="workbench-file"><span>{current.file}</span><span>ILLUSTRATIVE CODE</span></div>
        <div className="workbench-code" key={current.name}>{current.lines.map((line, index) => <div key={index}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><code>{line || ' '}</code></div>)}</div>
        <div className="workbench-output"><span className="workbench-output-icon" aria-hidden="true">↳</span><div><p>{current.note}</p><h2>{current.title}</h2></div></div>
        <div className="workbench-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="workbench-bottom"><span><i /> ALWAYS LEARNING</span><span>PUNE, IN</span></div>
    </div>
  )
}

const principles = [
  { title: 'Start with why.', body: 'Before choosing a framework, understand the person, the problem, and what a useful outcome looks like.', symbol: '?' },
  { title: 'Sweat the small stuff.', body: 'The empty state, the keyboard shortcut, the error message. The details are part of the experience.', symbol: '✳' },
  { title: 'Stay a student.', body: 'Read the code. Ask the question. Try the unfamiliar approach. There is always something worth learning.', symbol: '↗' },
]

export function AboutCards() {
  const [current, setCurrent] = useState(0)
  const [command, setCommand] = useState('whoami')
  const output: Record<string, string> = {
    whoami: 'Amey Bhagwatkar\nDeveloper. Problem solver. Curious human.',
    interests: 'Web applications · AI · competitive programming\nCurrently exploring how these fit together.',
    location: 'Pune, India\n18.5204° N, 73.8567° E',
  }
  return (
    <div className="about-cards">
      <section className="identity-card reveal">
        <p className="eyebrow">A LITTLE CONTEXT</p>
        <div className="identity-monogram" aria-hidden="true"><span>ab.</span><i>Made of curiosity.</i></div>
        <h3>Hi, I&apos;m Amey.</h3><p>An engineer from Pune, finding the interesting bit between a good question and a working product.</p>
        <Link href="/timeline" className="text-link">My journey <Arrow diagonal /></Link>
      </section>
      <section className="principles-card reveal" aria-label="How I approach my work" aria-roledescription="carousel">
        <div className="card-top"><p className="eyebrow">HOW I THINK</p><span>0{current + 1} / 03</span></div>
        <div className="principle-content" key={current} aria-live="polite" aria-atomic="true"><div className="principle-symbol" aria-hidden="true">{principles[current].symbol}</div><h3>{principles[current].title}</h3><p>{principles[current].body}</p></div>
        <div className="principle-controls"><div className="principle-dots" aria-hidden="true">{principles.map((item, index) => <i key={item.title} className={current === index ? 'active' : ''} />)}</div><button type="button" aria-label="Previous principle" onClick={() => setCurrent((current + 2) % 3)}>←</button><button type="button" aria-label="Next principle" onClick={() => setCurrent((current + 1) % 3)}>→</button></div>
      </section>
      <section className="terminal-card reveal">
        <div className="card-top"><p className="eyebrow">A SHORT INTRODUCTION</p><span aria-hidden="true">⌘</span></div>
        <p className="terminal-prompt"><span>amey@portfolio</span> ~ % {command}<i aria-hidden="true" /></p>
        <pre aria-live="polite">{output[command]}</pre>
        <div className="terminal-commands" role="group" aria-label="Explore Amey's introduction">{Object.keys(output).map((item) => <button type="button" key={item} aria-pressed={command === item} onClick={() => setCommand(item)}>{item}</button>)}</div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-link">Find me on GitHub <Arrow diagonal /></a>
      </section>
    </div>
  )
}
