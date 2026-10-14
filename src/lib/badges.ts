export interface ProfileBadge {
  id: string
  name: string
  platform: 'github' | 'leetcode'
  category: string
  icon: string
  earned: string | null
  description: string
}

export function normalizeLeetCodeBadges(data: any): ProfileBadge[] {
  const badges = data?.data?.matchedUser?.badges
  if (data?.errors?.length || !Array.isArray(badges)) {
    throw new Error('Badges unavailable')
  }
  return badges.map((badge: any) => {
    const url = new URL(badge.icon, 'https://leetcode.com')
    if (
      !['leetcode.com', 'assets.leetcode.com'].includes(url.hostname) ||
      url.protocol !== 'https:' ||
      !badge.id ||
      !badge.displayName
    ) {
      throw new Error('Invalid badge')
    }
    return {
      id: `lc-${badge.id}`,
      name: badge.displayName,
      platform: 'leetcode',
      category:
        badge.name === 'Knight'
          ? 'Contest'
          : badge.name === 'Daily Coding Challenge'
          ? 'Monthly'
          : 'Milestone',
      icon: url.href,
      earned: /^\d{4}-\d{2}-\d{2}$/.test(badge.creationDate)
        ? badge.creationDate
        : null,
      description: badge.hoverText || badge.displayName,
    }
  })
}
