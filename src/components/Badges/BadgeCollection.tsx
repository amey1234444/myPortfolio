import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import snapshot from '../../data/badges.json'
import { profile } from '../../data/portfolio'
import { ProfileBadge } from '../../lib/badges'
import { Arrow } from '../Portfolio/Elements'

const initial = snapshot.badges as ProfileBadge[]
const featuredIds = [
  'lc-10285453',
  'lc-5959844',
  'lc-5623002',
  'lc-10883235',
  'gh-pair-extraordinaire',
  'gh-pull-shark',
  'gh-yolo',
  'gh-quickdraw',
]

function BadgeArt({ badge }: { badge: ProfileBadge }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="badge-art" aria-hidden="true">
      {failed ? (
        <span className="badge-art-fallback">✦</span>
      ) : (
        <Image
          src={badge.icon}
          alt=""
          width={128}
          height={128}
          unoptimized
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function BadgeCollection() {
  const [badges, setBadges] = useState(initial)
  const [verifiedAt, setVerifiedAt] = useState(snapshot.verifiedAt)
  const [live, setLive] = useState(false)
  const [filter, setFilter] = useState('Featured')
  const [limit, setLimit] = useState(12)
  const [selected, setSelected] = useState<ProfileBadge | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 10000)
    fetch('/api/badges', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unavailable')
        const result = await response.json()
        if (!Array.isArray(result.badges)) throw new Error('Invalid badges')
        setBadges([
          ...result.badges,
          ...initial.filter((badge) => badge.platform === 'github'),
        ])
        setVerifiedAt(result.verifiedAt)
        setLive(true)
      })
      .catch(() => {
        /* Keep the dated, verified collection when the provider is unavailable. */
      })
      .finally(() => window.clearTimeout(timer))
    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!selected) return undefined
    const modal = dialog.current
    const onClose = () => {
      setSelected(null)
      trigger.current?.focus({ preventScroll: true })
    }
    modal?.addEventListener('close', onClose)
    modal?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      modal?.removeEventListener('close', onClose)
    }
  }, [selected])

  const close = () => {
    dialog.current?.close()
    setSelected(null)
    trigger.current?.focus({ preventScroll: true })
  }
  const filtered =
    filter === 'Featured'
      ? (featuredIds
          .map((id) => badges.find((badge) => badge.id === id))
          .filter(Boolean) as ProfileBadge[])
      : badges.filter(
          (badge) =>
            filter === 'All badges' ||
            (filter === 'GitHub'
              ? badge.platform === 'github'
              : badge.platform === 'leetcode')
        )
  const lcCount = badges.filter((badge) => badge.platform === 'leetcode').length
  const ghCount = badges.filter((badge) => badge.platform === 'github').length

  return (
    <section
      className="badge-collection"
      id="badges"
      aria-labelledby="badges-heading"
    >
      <div className="badge-section-heading reveal">
        <div>
          <p className="eyebrow">PRACTICE, RECOGNISED</p>
          <h2 id="badges-heading">
            Small wins.
            <br />
            <span>Collected along the way.</span>
          </h2>
        </div>
        <p>
          Consistency on LeetCode.
          <br />
          Collaboration on GitHub.
          <br />
          Every badge has a little story.
        </p>
      </div>
      <div className="badge-overview">
        <div>
          <span className="badge-platform-icon" aria-hidden="true">
            〈/〉
          </span>
          <strong>{lcCount}</strong>
          <span>LeetCode badges</span>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            aria-label="View LeetCode badges on profile"
          >
            <Arrow diagonal />
          </a>
        </div>
        <div>
          <span className="badge-platform-icon" aria-hidden="true">
            ↗
          </span>
          <strong>{ghCount}</strong>
          <span>GitHub achievements</span>
          <a
            href={`${profile.github}?tab=achievements`}
            target="_blank"
            rel="noreferrer"
            aria-label="View GitHub achievements on profile"
          >
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="badge-toolbar">
        <div role="group" aria-label="Filter badges" className="badge-filters">
          {['Featured', 'LeetCode', 'GitHub', 'All badges'].map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={filter === name}
              onClick={() => {
                setFilter(name)
                setLimit(12)
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <span className="badge-count" role="status">
          {filtered.length} {filter === 'Featured' ? 'highlights' : 'badges'}
        </span>
      </div>
      <div className="badge-grid" key={filter}>
        {filtered.slice(0, limit).map((badge, index) => (
          <button
            type="button"
            className="badge-card"
            data-platform={badge.platform}
            key={badge.id}
            style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}
            onClick={(event) => {
              trigger.current = event.currentTarget
              setSelected(badge)
            }}
            aria-label={`View ${badge.name}${
              badge.earned ? `, earned ${formatDate(badge.earned)}` : ''
            }`}
          >
            <span className="badge-card-top">
              <span>{badge.platform === 'github' ? 'GITHUB' : 'LEETCODE'}</span>
              <span aria-hidden="true">↗</span>
            </span>
            <BadgeArt badge={badge} />
            <h3>{badge.name}</h3>
            <span className="badge-card-date">
              {badge.earned ? formatDate(badge.earned) : 'Profile achievement'}
            </span>
            <span className="badge-category">{badge.category}</span>
          </button>
        ))}
      </div>
      {filtered.length > limit && (
        <button
          type="button"
          className="badge-show-more"
          onClick={() => setLimit(limit + 12)}
        >
          Show more badges <span>↓</span>
        </button>
      )}
      <div className="badge-source">
        <span>
          LeetCode · {live ? 'Synced' : 'Saved collection'}{' '}
          {formatDate(verifiedAt)}
        </span>
        <span>GitHub · verified {formatDate(snapshot.verifiedAt)}</span>
      </div>
      {selected && (
        <dialog
          ref={dialog}
          className="badge-dialog"
          aria-labelledby="badge-dialog-title"
        >
          <button
            type="button"
            className="badge-dialog-close"
            onClick={close}
            aria-label="Close badge details"
            autoFocus
          >
            ×
          </button>
          <p className="eyebrow">
            {selected.platform === 'github'
              ? 'GITHUB ACHIEVEMENT'
              : 'LEETCODE BADGE'}
          </p>
          <BadgeArt badge={selected} />
          <h2 id="badge-dialog-title">{selected.name}</h2>
          <p className="badge-dialog-description">{selected.description}</p>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{selected.category}</dd>
            </div>
            {selected.earned && (
              <div>
                <dt>Earned</dt>
                <dd>{formatDate(selected.earned)}</dd>
              </div>
            )}
          </dl>
          <a
            href={
              selected.platform === 'github'
                ? `${profile.github}?tab=achievements`
                : profile.leetcode
            }
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            View on {selected.platform === 'github' ? 'GitHub' : 'LeetCode'}{' '}
            <Arrow diagonal />
          </a>
        </dialog>
      )}
    </section>
  )
}
