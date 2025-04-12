import { Box, Group, Paper, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';  // Add this import
import BadgeModal from './BadgeModal';

interface Badge {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  hoverText: string;
  category: string;
}

interface ContestRanking {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
  badge: {
    name: string;
  };
}

interface ContestHistory {
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  ranking: number;
  contest: {
    title: string;
    startTime: string;
  };
}

interface LeetCodeProfileProps {
  badges: any[];
  upcomingBadges: any[];
  contestRanking: any;
  contestHistory: any[];
}

const LeetCodeProfile: FC<LeetCodeProfileProps> = ({
  badges,
  upcomingBadges,
  contestRanking,
  contestHistory
}) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Box mt={30}>
      <Paper p="md" radius="md" withBorder>
        <Title order={3} mb={20}>
          LeetCode Profile
        </Title>

        {/* Contest Rankings */}
        <Box mb={20}>
          <Title order={4} mb={10}>
            Contest Performance
          </Title>
          <Group spacing="xl">
            <Box>
              <Text size="sm" color="dimmed">
                Rating
              </Text>
              <Text weight={700} size="xl">
                {contestRanking?.rating || 'N/A'}
              </Text>
            </Box>
            <Box>
              <Text size="sm" color="dimmed">
                Global Ranking
              </Text>
              <Text weight={700} size="xl">
                {contestRanking?.globalRanking || 'N/A'}
              </Text>
            </Box>
            <Box>
              <Text size="sm" color="dimmed">
                Top Percentage
              </Text>
              <Text weight={700} size="xl">
                {contestRanking?.topPercentage
                  ? `${contestRanking.topPercentage.toFixed(1)}%`
                  : 'N/A'}
              </Text>
            </Box>
          </Group>
        </Box>

        {/* Badges */}
        <Box mb={20}>
          <Title order={4} mb={10}>
            Badges
          </Title>
          <Group spacing="md">
            {badges?.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedBadge(badge);
                  setModalOpened(true);
                }}
              >
                <Paper
                  p="xs"
                  radius="md"
                  withBorder
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[5]
                          : theme.colors.gray[1],
                    },
                  })}
                  title={badge.hoverText}
                >
                  <Group spacing="xs">
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text size="sm">{badge.displayName}</Text>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </Group>
        </Box>

        {/* Add the BadgeModal component at the end of the return statement */}
        <BadgeModal
          badge={selectedBadge}
          opened={modalOpened}
          onClose={() => {
            setModalOpened(false);
            setSelectedBadge(null);
          }}
        />
        {/* Upcoming Badges */}
        {upcomingBadges?.length > 0 && (
          <Box>
            <Title order={4} mb={10}>
              Upcoming Badges
            </Title>
            <Group spacing="md">
              {upcomingBadges.map((badge, index) => (
                <Paper
                  key={index}
                  p="xs"
                  radius="md"
                  withBorder
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  })}
                >
                  <Group spacing="xs">
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      style={{ width: 24, height: 24, opacity: 0.7 }}
                    />
                    <Box>
                      <Text size="sm">{badge.name}</Text>
                      <Text size="xs" color="dimmed">
                        Progress: {badge.progress}%
                      </Text>
                    </Box>
                  </Group>
                </Paper>
              ))}
            </Group>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LeetCodeProfile;