import { List, Timeline as MantineTimeline, Text, Title } from '@mantine/core'
import { Circle, CircleDashed } from 'tabler-icons-react'

import Layout from '../../components/Layout/Layout'

const Timeline = () => (
  <Layout>
    <Title order={1} mb={30}>
      Timeline
    </Title>
    <MantineTimeline active={1} color="violet">
      <MantineTimeline.Item
        bullet={<Circle size={48} strokeWidth={4} color="white" />}
        title="Web Developer Intern at MTB Solutions"
      >
        <List center icon>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Engineered Rythemecca, a complex web app using React.js,
              Node.js, and MongoDB.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Integrated LangChain and LangGraph with Llama 3.3-70B LLM for
              chatbot functionality.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Utilized Cloudinary for managing 10k+ image files securely.
            </Text>
          </List.Item>
        </List>
        <Text size="xs" mt={4}>
          June 2024 - Dec 2024
        </Text>
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={<Circle size={48} strokeWidth={4} color="white" />}
        title="Plagiarism WebApp Development"
      >
        <List center icon>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Built a plagiarism detection system for LeetCode contests using
              Puppeteer API.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Successfully identified over 95% of plagiarized submissions.
            </Text>
          </List.Item>
        </List>
        <Text size="xs" mt={4}>
          April 2024
        </Text>
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={<Circle size={48} strokeWidth={4} color="white" />}
        title="Notepad App Development"
      >
        <List center icon>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Created a Java-based note-taking app with Firebase backend.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Achieved 150+ downloads within the first month of launch.
            </Text>
          </List.Item>
        </List>
        <Text size="xs" mt={4}>
          Feb 2024
        </Text>
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={<CircleDashed size={48} strokeWidth={4} color="gray" />}
        title="Started Competitive Programming"
      >
        <List center icon>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Solved 1000+ DSA problems on LeetCode, securing a rating of
              1860.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Ranked 337 in BiWeekly Contest 122 among 35,000 participants.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Achieved Institute Rank 77 on GFG and a peak rating of 1637 on
              CodeChef.
            </Text>
          </List.Item>
        </List>
        <Text size="xs" mt={4}>
          2022 - Present
        </Text>
      </MantineTimeline.Item>
      <MantineTimeline.Item
        bullet={<CircleDashed size={48} strokeWidth={4} color="gray" />}
        title="Started Programming Journey"
      >
        <List center icon>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Began learning programming with C++, Java, and JavaScript.
            </Text>
          </List.Item>
          <List.Item>
            <Text color="dimmed" size="sm">
              - Completed multiple courses and small-scale projects.
            </Text>
          </List.Item>
        </List>
        <Text size="xs" mt={4}>
          June - 2022
        </Text>
      </MantineTimeline.Item>
    </MantineTimeline>
  </Layout>
)

export default Timeline

// import { List, Timeline as MantineTimeline, Text, Title } from '@mantine/core'
// import { Circle, CircleDashed } from 'tabler-icons-react'

// import Layout from '../../components/Layout/Layout'

// const Timeline = () => (
//   <Layout>
//     <Title order={1} mb={30}>
//       Timeline
//     </Title>
//     <MantineTimeline active={1} color="violet">
//       <MantineTimeline.Item
//         bullet={<Circle size={48} strokeWidth={4} color="white" />}
//         title="Still learning"
//       >
//         <List center icon>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - After some relaxed time, I&apos;m back to learning and working.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Joined a start-up specializing in education technologies.
//             </Text>
//           </List.Item>
//         </List>

//         <Text size="xs" mt={4}>
//           Now
//         </Text>
//       </MantineTimeline.Item>
//       <MantineTimeline.Item
//         bullet={<Circle size={48} strokeWidth={4} color="white" />}
//         title="Learning and growing"
//       >
//         <List center icon>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Working to enhance and refine my JavaScript skills and
//               abilities.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Acquiring knowledge and understanding of web accessibility
//               principles, to ensure inclusive design and user experience.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Investigating design systems and testing methodologies to
//               enhance the development process and produce high-quality, robust
//               software.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Participating in open-source projects to further develop
//               expertise and contribute to the software development community.
//             </Text>
//           </List.Item>
//         </List>
//         <Text size="xs" mt={4}>
//           2022
//         </Text>
//       </MantineTimeline.Item>
//       <MantineTimeline.Item
//         bullet={<Circle size={48} strokeWidth={4} color="white" />}
//         title="Landed first job as a developer"
//         lineVariant="dashed"
//       >
//         <List center icon>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Joined a start-up specializing in e-commerce fulfillment,
//               robotics and logistics services.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Engaged in the development, maintenance, and optimization of the
//               company&apos;s website, oplog.io, a several internal projects and
//               one of the company&apos;s production applications.
//             </Text>
//           </List.Item>

//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Acquired knowledge and experience in technologies such as
//               JavaScript, React.js, TypeScript, Mantine, Tailwind, Redux,
//               Directus, Zustand, and Hubspot.
//             </Text>
//           </List.Item>
//         </List>
//         <Text size="xs" mt={4}>
//           2021
//         </Text>
//       </MantineTimeline.Item>
//       <MantineTimeline.Item
//         title="Started to learn programming"
//         bullet={<CircleDashed size={48} strokeWidth={4} color="gray" />}
//         lineVariant="dashed"
//       >
//         <List center icon>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Started with Python and transitioned into web development.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Completed numerous courses and several small-scale projects.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Utilized freecodecamp and The Odin Project as primary
//               educational resources.
//             </Text>
//           </List.Item>
//           <List.Item>
//             <Text color="dimmed" size="sm">
//               - Successfully graduated from a bootcamp program.
//             </Text>
//           </List.Item>
//         </List>
//         <Text size="xs" mt={4}>
//           2020
//         </Text>
//       </MantineTimeline.Item>
//       <MantineTimeline.Item
//         title="Born"
//         bullet={<CircleDashed size={48} strokeWidth={4} color="gray" />}
//       >
//         <Text size="xs" mt={4}>
//           1989
//         </Text>
//       </MantineTimeline.Item>
//     </MantineTimeline>
//   </Layout>
// )

// export default Timeline
