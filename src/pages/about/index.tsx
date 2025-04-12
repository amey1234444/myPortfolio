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
          year={selectedYear}
          style={{ maxWidth: '960px' }}
        />
      </Box>
    </Layout>
  )
}

export default About

// import {
//   Github,
//   Gmail,
//   Linkedin,
//   Medium,
//   Twitter,
// } from '@icons-pack/react-simple-icons'
// import {
//   Anchor,
//   Box,
//   Group,
//   Select,
//   Text,
//   Title,
//   useMantineColorScheme,
// } from '@mantine/core'
// import dynamic from 'next/dynamic'
// import { useState } from 'react'

// import Layout from '../../components/Layout/Layout'

// const GitHubCalendar = dynamic(() => import('react-github-calendar'))

// const About: React.FC = () => {
//   const { colorScheme } = useMantineColorScheme()
//   const iconColor = colorScheme === 'dark' ? '#fff' : '#000'

//   const socialMediaIcons: { component: React.ReactNode; url: string }[] = [
//     {
//       component: <Github color={iconColor} size={32} />,
//       url: 'https://www.github.com/aycanogut',
//     },
//     {
//       component: <Linkedin color={iconColor} size={32} />,
//       url: 'https://www.linkedin.com/in/aycanogut',
//     },
//     {
//       component: <Medium color={iconColor} size={32} />,
//       url: 'https://medium.com/@aycanogut',
//     },
//     {
//       component: <Twitter color={iconColor} size={32} />,
//       url: 'https://twitter.com/bleedeleventh',
//     },
//     {
//       component: <Gmail color={iconColor} size={32} />,
//       url: 'mailto:me@aycan.dev',
//     },
//   ]

//   const currentYear = new Date().getFullYear()
//   const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString())

//   return (
//     <Layout>
//       <Box>
//         <Title order={1} mb={30}>
//           About
//         </Title>
//         <Text weight={500} mt={8}>
//           <strong>Aycan Öğüt</strong>. 1989.
//         </Text>
//         <Text weight={500} mt={20}>
//           I&apos;m a self-taught developer from Izmir.
//         </Text>
//         <Text weight={500} mt={20}>
//           I&apos;ve been working to improve myself in web development field
//           since 2020 with a focus on responsive web applications. I enjoy
//           learning new technologies and tools, writing articles, and working on
//           open source projects. My motivation for developing this website is to
//           share my learnings with the rest of the world.
//         </Text>
//         <Text weight={500} my={20}>
//           Currently, I&apos;m working as a frontend developer at&nbsp;
//           <Anchor
//             href="https://90pixel.com/"
//             target="_blank"
//             variant="link"
//             weight={500}
//             underline
//           >
//             <strong>90Pixel</strong>
//           </Anchor>
//           .
//         </Text>
//         <Text weight={500} mt={20}>
//           Along with pixel hunting, I enjoy skating, going to live music events,
//           playing video games, watching TV series, and hanging out with my
//           friends.
//         </Text>
//         <Text weight={500} mt={20}>
//           Find out more about me&nbsp;
//           <Anchor
//             variant="link"
//             href="https://read.cv/aycanogut"
//             target="_blank"
//             weight={500}
//             underline
//           >
//             <strong>by visiting this page</strong>.
//           </Anchor>
//         </Text>
//       </Box>
//       <Box>
//         <Title order={2} mt={50} mb={30}>
//           Contact Me
//         </Title>
//         <Group>
//           {socialMediaIcons.map((icon) => (
//             <Anchor key={icon.url} href={icon.url} target="_blank">
//               {icon.component}
//             </Anchor>
//           ))}
//         </Group>
//       </Box>
//       <Box>
//         <Title order={3} mt={50} mb={30}>
//           My Github Stats
//         </Title>
//         <Select
//           label="Select Year"
//           data={Array.from({ length: 5 }, (_, i) => (currentYear - i).toString())}
//           value={selectedYear}
//           onChange={(year) => year && setSelectedYear(year)}
//           mb={20}
//           placeholder="Pick a year"
//         />
//         <GitHubCalendar
//           username="amey1234444"
//           year={selectedYear}
//           style={{ maxWidth: '960px' }}
//         />
//       </Box>
//     </Layout>
//   )
// }

// export default About

// import {
//   Github,
//   Gmail,
//   Linkedin,
//   Medium,
//   Twitter,
// } from '@icons-pack/react-simple-icons'
// import {
//   Anchor,
//   Box,
//   Group,
//   Text,
//   Title,
//   useMantineColorScheme,
// } from '@mantine/core'
// import dynamic from 'next/dynamic'
// import { ReactNode } from 'react'

// import Layout from '../../components/Layout/Layout'

// const GitHubCalendar = dynamic(() => import('react-github-calendar'))
// const NowPlaying = dynamic(
//   () => import('../../components/NowPlaying/NowPlaying')
// )

// const About = () => {
//   const { colorScheme } = useMantineColorScheme()
//   const iconColor = colorScheme === 'dark' ? '#fff' : '#000'

//   const socialMediaIcons: { component: ReactNode; url: string }[] = [
//     {
//       component: <Github color={iconColor} size={32} />,
//       url: 'https://www.github.com/aycanogut',
//     },
//     {
//       component: <Linkedin color={iconColor} size={32} />,
//       url: 'https://www.linkedin.com/in/aycanogut',
//     },
//     {
//       component: <Medium color={iconColor} size={32} />,
//       url: 'https://medium.com/@aycanogut',
//     },
//     {
//       component: <Twitter color={iconColor} size={32} />,
//       url: 'https://twitter.com/bleedeleventh',
//     },
//     {
//       component: <Gmail color={iconColor} size={32} />,
//       url: 'mailto:me@aycan.dev',
//     },
//   ]

//   return (
//     <Layout>
//       <Box>
//         <Title order={1} mb={30}>
//           About
//         </Title>
//         <Text weight={500} mt={8}>
//           <strong>Aycan Öğüt</strong>. 1989.
//         </Text>
//         <Text weight={500} mt={20}>
//           I&apos;m a self-taught developer from Izmir.
//         </Text>
//         <Text weight={500} mt={20}>
//           I&apos;ve been working to improve myself in web development field
//           since 2020 with a focus on responsive web applications. I enjoy
//           learning new technologies and tools, writing articles, and working on
//           open source projects. My motivation for developing this website is to
//           share my learnings with the rest of the world.
//         </Text>
//         <Text weight={500} my={20}>
//           Currently, I&apos;m working as a frontend developer at&nbsp;
//           <Anchor
//             href="https://90pixel.com/"
//             target="_blank"
//             variant="link"
//             weight={500}
//             underline
//           >
//             <strong>90Pixel</strong>
//           </Anchor>
//           .
//         </Text>
//         <Text weight={500} mt={20}>
//           Along with pixel hunting, I enjoy skating, going to live music events,
//           playing video games, watching TV series, and hanging out with my
//           friends.
//         </Text>
//         <Text weight={500} mt={20}>
//           Find out more about me&nbsp;
//           <Anchor
//             variant="link"
//             href="https://read.cv/aycanogut"
//             target="_blank"
//             weight={500}
//             underline
//           >
//             <strong>by visiting this page</strong>.
//           </Anchor>
//         </Text>
//       </Box>
//       <Box>
//         <Title order={2} mt={50} mb={30}>
//           Contact Me
//         </Title>
//         <Group>
//           {socialMediaIcons.map(
//             (icon: { component: ReactNode; url: string }) => (
//               <Anchor key={icon.url} href={icon.url} target="_blank">
//                 {icon.component}
//               </Anchor>
//             )
//           )}
//         </Group>
//       </Box>
//       <Box>
//         <Title order={3} mt={50} mb={30}>
//           My Github Stats
//         </Title>
//         <GitHubCalendar
//           username="amey1234444"
//           year="2024"
//           style={{ maxWidth: '960px' }}
//         />
//       </Box>
//       {/* <NowPlaying /> */}
//     </Layout>
//   )
// }

// export default About
