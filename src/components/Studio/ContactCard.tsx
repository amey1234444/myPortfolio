import { FormEvent, useState } from 'react'

import { profile } from '../../data/portfolio'
import { Arrow } from '../Portfolio/Elements'

export default function ContactCard() {
  const [status, setStatus] = useState('')
  const compose = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name')).trim()
    const email = String(data.get('email')).trim()
    const message = String(data.get('message')).trim()
    if (!name || !message) {
      setStatus('Please add your name and a message.')
      return
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nReply to: ${email}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus(
      'Your email app will open with this draft. Send it there to reach me, or use the email link below.'
    )
  }
  return (
    <section className="contact-postcard" aria-labelledby="postcard-heading">
      <div className="postcard-copy">
        <p className="postcard-label">A NOTE FROM YOU → A NEW POSSIBILITY</p>
        <h2 id="postcard-heading">
          Good things
          <br />
          start with
          <br />
          <span className="serif">a hello.</span>
        </h2>
        <p>
          A project, an opportunity, or something interesting you&apos;re
          building. I&apos;d love to hear about it.
        </p>
        <a href={`mailto:${profile.email}`} className="postcard-email">
          {profile.email} <Arrow diagonal />
        </a>
        <div className="postcard-social">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
        <span className="postcard-signature">Amey.</span>
      </div>
      <div className="postcard-form-side">
        <div className="postage" aria-hidden="true">
          <span>FROM YOU</span>
          <b>✳</b>
          <span>TO PUNE, IN</span>
        </div>
        <form onSubmit={compose}>
          <label htmlFor="contact-name">
            01 / YOUR NAME
            <input
              id="contact-name"
              name="name"
              placeholder="What should I call you?"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="contact-email">
            02 / YOUR EMAIL
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label htmlFor="contact-message">
            03 / WHAT&apos;S ON YOUR MIND?
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me a little about it…"
              rows={4}
              required
              maxLength={3000}
            />
          </label>
          <div className="postcard-form-bottom">
            <span>
              Opens your email app.
              <br />
              Every field is required.
            </span>
            <button type="submit">
              Let&apos;s talk <Arrow diagonal />
            </button>
          </div>
          <p className="compose-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}
