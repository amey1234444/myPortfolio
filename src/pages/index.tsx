import {
  Bootstrap,
  Codechef,
  Codeforces,
  Cplusplus,
  CssThree,
  Docker,
  Express,
  Firebase,
  Geeksforgeeks,
  Git,
  Github,
  Go,
  Html5,
  Javascript,
  Jenkins,
  Kubernetes,
  Leetcode,
  Mongodb,
  Nestjs,
  Netlify,
  Nextdotjs,
  Postgresql,
  Python,
  ReactJs,
  Redux,
  Sass,
  Styledcomponents,
  Tailwindcss,
  Typescript,
  Vercel,
} from '@icons-pack/react-simple-icons'
import { Anchor, Box, Group, Paper, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout/Layout'
import LeetCodeHeatmap from '../components/LeetcodeMap/LeetCodeHeatmap'
import Loader from '../components/Loader/Loader'
import useWidth from '../hooks/useWidth'

const TechIcon = ({ href, Icon, color }) => (
  <Link href={href} target="_blank">
    <Box
      sx={{
        padding: 10,
        borderRadius: 10,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(230, 251, 249, 0.1)',
          transform: 'scale(1.1)',
        },
      }}
    >
      <Icon color={color} size={70} />
    </Box>
  </Link>
)

const HomePage = () => {
  const [loading, setLoading] = useState(true)

  const { width } = useWidth()

  useEffect(() => {
    setLoading(true)

    if (loading) {
      setTimeout(() => setLoading(false), 250)
    }
  }, [])

  if (loading) return <Loader />

  return (
    <Layout>
      <Title order={1} mb={30}>
        Hello 🤙
      </Title>
      <Box>
        <Group position="apart">
          <Group direction="column" spacing={2}>
            <Text>
              I&apos;m a Full Stack developer,React native developer AND
              Competitive Programmer based in PUNE, INDIA.
            </Text>
            <Text>
              I love to&nbsp;
              <Anchor
                href="https://github.com/amey1234444"
                target="_blank"
                variant="link"
                weight={500}
                underline
              >
                <strong>build things</strong>
              </Anchor>
              &nbsp;with JavaScript and enhance problem solving skills by
              participating in Programming &nbsp;
              <Anchor
                href=""
                target="_blank"
                variant="link"
                weight={500}
                underline
              >
                <strong>contests</strong>
              </Anchor>
              &nbsp;regularly.
            </Text>
            <Text mt={10}>
              Find out&nbsp;
              <Link href="/about" passHref prefetch={false}>
                <Anchor component="span" weight={500} underline>
                  <strong>more</strong>.
                </Anchor>
              </Link>
            </Text>
          </Group>
        </Group>
        <Group direction="column" mt={60}>
          <Title order={2} align="center">
            Tech Stack
          </Title>

          <Paper
            py="lg"
            px="md"
            sx={{ background: 'rgba(0,0,0, 0.03)', borderRadius: 10 }}
          >
            {/* Frontend */}
            <Title order={3} mt="md">
              Frontend
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5"
                Icon={Html5}
                color="#E34F26"
              />
              <TechIcon
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                Icon={CssThree}
                color="#1572B6"
              />
              <TechIcon
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                Icon={Javascript}
                color="#F7DF1E"
              />
              <TechIcon
                href="https://www.typescriptlang.org/"
                Icon={Typescript}
                color="#3178C6"
              />
              <TechIcon
                href="https://reactjs.org/"
                Icon={ReactJs}
                color="#61DAFB"
              />
              <TechIcon
                href="https://nextjs.org/"
                Icon={Nextdotjs}
                color="#000000"
              />
              <TechIcon
                href="https://redux.js.org/"
                Icon={Redux}
                color="#764ABC"
              />
              <TechIcon
                href="https://getbootstrap.com/"
                Icon={Bootstrap}
                color="#7952B3"
              />
            </Group>

            {/* Backend */}
            <Title order={3} mt="md">
              Backend
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://expressjs.com/"
                Icon={Express}
                color="#000000"
              />
              <TechIcon
                href="https://nestjs.com/"
                Icon={Nestjs}
                color="#E0234E"
              />
            </Group>

            {/* Databases */}
            <Title order={3} mt="md">
              Databases
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://www.mongodb.com/"
                Icon={Mongodb}
                color="#47A248"
              />
              <TechIcon
                href="https://www.postgresql.org/"
                Icon={Postgresql}
                color="#336791"
              />
              <TechIcon
                href="https://firebase.google.com/"
                Icon={Firebase}
                color="#FFCA28"
              />
            </Group>

            {/* DevOps */}
            <Title order={3} mt="md">
              DevOps
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://www.docker.com/"
                Icon={Docker}
                color="#2496ED"
              />
              <TechIcon
                href="https://kubernetes.io/"
                Icon={Kubernetes}
                color="#326CE5"
              />
              <TechIcon
                href="https://git-scm.com/"
                Icon={Git}
                color="#F05032"
              />
              <TechIcon
                href="https://github.com/"
                Icon={Github}
                color="#181717"
              />
              <TechIcon
                href="https://vercel.com/"
                Icon={Vercel}
                color="#000000"
              />
              <TechIcon
                href="https://www.netlify.com/"
                Icon={Netlify}
                color="#00C7B7"
              />
              <TechIcon
                href="https://www.jenkins.io/"
                Icon={Jenkins}
                color="#D24939"
              />
            </Group>

            {/* Programming Languages */}
            <Title order={3} mt="md">
              Programming Languages
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://www.python.org/"
                Icon={Python}
                color="#3776AB"
              />
              <TechIcon
                href="https://isocpp.org/"
                Icon={Cplusplus}
                color="#00599C"
              />
              <TechIcon href="https://golang.org/" Icon={Go} color="#00ADD8" />
            </Group>

            {/* Competitive Programming Platforms */}
            <Title order={3} mt="md">
              Competitive Programming Accounts
            </Title>
            <Group position="center" spacing="xl" py="md">
              <TechIcon
                href="https://leetcode.com/u/amey_bhagwatkar_07/"
                Icon={Leetcode}
                color="#FFA116"
              />
              <TechIcon
                href="https://codeforces.com/profile/AmeyBhagwatkar"
                Icon={Codeforces}
                color="#1F8ACB"
              />
              <TechIcon
                href="https://www.geeksforgeeks.org/user/ameybhagw6t9h/"
                Icon={Geeksforgeeks}
                color="#2F8D46"
              />
              <TechIcon
                href="https://www.codechef.com/users/amey_100"
                Icon={Codechef}
                color="#5B4638"
              />
            </Group>
          </Paper>
        </Group>
      </Box>
      <LeetCodeHeatmap username="yash_bhale" />
    </Layout>
  )
}

export default HomePage
