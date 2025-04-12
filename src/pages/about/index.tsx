import { Github, Gmail, Linkedin } from '@icons-pack/react-simple-icons'
import {
  Anchor,
  Box,
  Group,
  Select,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import Layout from '../../components/Layout/Layout'

const GitHubCalendar = dynamic(() => import('react-github-calendar'))

const About: React.FC = () => {
  const { colorScheme } = useMantineColorScheme()
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000'

  const socialMediaIcons: { component: React.ReactNode; url: string }[] = [
    {
      component: <Github color={iconColor} size={32} />,
      url: 'https://github.com/amey1234444',
    },
    {
      component: <Linkedin color={iconColor} size={32} />,
      url: 'https://www.linkedin.com/in/amey-bhagwatkar-4737252a8/',
    },
    {
      component: <Gmail color={iconColor} size={32} />,
      url: 'mailto:ameybhagwatkar01@gmail.com',
    },
  ]

  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  )

  return (
    <Layout>
      <Box>
        <Title order={1} mb={30}>
          About Me
        </Title>
        <Text weight={500} mt={8}>
          <strong>Amey Bhagwatkar</strong>
        </Text>
        <Text weight={500} mt={20}>
          I am a passionate web developer and software engineer, currently
          pursuing my BTech in Electronics and Telecommunication Engineering at
          Vishwakarma Institute of Technology, Pune.
        </Text>
        <Text weight={500} my={20}>
          I am currently interning at&nbsp;
          <Anchor href="" target="_blank" variant="link" weight={500} underline>
            <strong>MTB Solutions</strong>
          </Anchor>
          , where I work with React.js, Express.js, MongoDB, and LangChain.
        </Text>
        <Text weight={500} mt={20}>
          My interests lie in web development, problem-solving, and AI-powered
          applications. I have experience working on complex projects, such as a
          plagiarism detection web app and a chatbot-powered platform.
        </Text>
        <Text weight={500} mt={20}>
          In my free time, I enjoy coding, competitive programming, and learning
          about new technologies.
        </Text>
      </Box>

      <Box>
        <Title order={2} mt={50} mb={30}>
          Contact Me
        </Title>
        <Group>
          {socialMediaIcons.map((icon) => (
            <Anchor key={icon.url} href={icon.url} target="_blank">
              {icon.component}
            </Anchor>
          ))}
        </Group>
      </Box>

      <Box>
        <Title order={3} mt={50} mb={30}>
          My Github Stats
        </Title>
        <Select
          label="Select Year"
          data={Array.from({ length: 5 }, (_, i) =>
            (currentYear - i).toString()
          )}
          value={selectedYear}
          onChange={(year) => year && setSelectedYear(year)}
          mb={20}
          placeholder="Pick a year"
        />
        <GitHubCalendar
          username="amey1234444"
          year={parseInt(selectedYear, 10)}  // Convert string to number
          style={{ maxWidth: '960px' }}
        />
      </Box>
    </Layout>
  )
}

export default About
