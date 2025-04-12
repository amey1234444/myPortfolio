import { format, subDays } from 'date-fns';
import React, { useEffect, useState, FC } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styles from './LeetCodeHeatmap.module.css';
import LeetCodeProfile from './LeetCodeProfile';

interface LeetCodeHeatmapProps {
  username?: string;
}

const LeetCodeHeatmap: FC<LeetCodeHeatmapProps> = ({ username = 'amey_bhagwatkar' }) => {
  const [submissionData, setSubmissionData] = useState([]);
  const [profileData, setProfileData] = useState({
    badges: [],
    upcomingBadges: [],
    contestRanking: null,
    contestHistory: []
  });

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        console.log('API Response:', data); 

        if (data?.data?.matchedUser) {
          if (data.data.matchedUser.submissionCalendar) {
            const calendarData = JSON.parse(data.data.matchedUser.submissionCalendar);
            console.log('Calendar Data:', calendarData);
            const formattedData = Object.keys(calendarData).map((timestamp) => ({
              date: format(new Date(Number(timestamp) * 1000), 'yyyy-MM-dd'),
              count: calendarData[timestamp],
            }));
            setSubmissionData(formattedData);
          }

          setProfileData({
            badges: data.data.matchedUser.badges || [],
            upcomingBadges: data.data.matchedUser.upcomingBadges || [],
            contestRanking: data.data.userContestRanking,
            contestHistory: data.data.userContestRankingHistory || []
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      }
    };

    fetchLeetCodeData();
  }, [username]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>LeetCode Profile</h2>
      <LeetCodeProfile
        badges={profileData.badges}
        upcomingBadges={profileData.upcomingBadges}
        contestRanking={profileData.contestRanking}
        contestHistory={profileData.contestHistory}
      />
      <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Submission Calendar</h3>
      <CalendarHeatmap
        startDate={subDays(new Date(), 365)}
        endDate={new Date()}
        values={submissionData}
        classForValue={(value) => {
          if (!value) return styles['color-empty'];
          const count = value.count;
          if (count <= 0) return styles['color-scale-0'];
          if (count <= 2) return styles['color-scale-1'];
          if (count <= 4) return styles['color-scale-2'];
          if (count <= 6) return styles['color-scale-3'];
          if (count <= 10) return styles['color-scale-4'];
          if (count <= 15) return styles['color-scale-5'];
          return styles['color-scale-6'];
        }}
        tooltipDataAttrs={(value) => ({
          'data-tip': value ? `${value.date}: ${value.count} submissions` : 'No submissions',
        })}
      />
    </div>
  );
};

export default LeetCodeHeatmap;
