export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const username = 'amey_bhagwatkar_07';

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query userProfileData($username: String!) {
            matchedUser(username: $username) {
              submissionCalendar
              badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                  slug
                  config {
                    iconGif
                    iconGifBackground
                  }
                }
                creationDate
                category
              }
              upcomingBadges {
                name
                icon
                progress
              }
            }
            userContestRanking(username: $username) {
              attendedContestsCount
              rating
              globalRanking
              totalParticipants
              topPercentage
              badge {
                name
              }
            }
            userContestRankingHistory(username: $username) {
              attended
              trendDirection
              problemsSolved
              totalProblems
              finishTimeInSeconds
              rating
              ranking
              contest {
                title
                startTime
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    const data = await response.json();

    // Transform and validate the data
    const transformedData = {
      data: {
        matchedUser: data.data?.matchedUser ? {
          submissionCalendar: data.data.matchedUser.submissionCalendar,
          badges: data.data.matchedUser.badges?.map(badge => ({
            ...badge,
            icon: badge.icon?.startsWith('http') 
              ? badge.icon 
              : `https://leetcode.com${badge.icon}`,
            medal: badge.medal ? {
              ...badge.medal,
              config: {
                iconGif: badge.medal.config?.iconGif?.startsWith('http')
                  ? badge.medal.config.iconGif
                  : `https://leetcode.com${badge.medal.config.iconGif}`,
                iconGifBackground: badge.medal.config?.iconGifBackground
              }
            } : null
          })) || [],
          upcomingBadges: data.data.matchedUser.upcomingBadges?.map(badge => ({
            ...badge,
            icon: badge.icon?.startsWith('http')
              ? badge.icon
              : `https://leetcode.com${badge.icon}`
          })) || []
        } : null,
        userContestRanking: data.data?.userContestRanking || null,
        userContestRankingHistory: data.data?.userContestRankingHistory || []
      }
    };

    return res.status(200).json(transformedData);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
  