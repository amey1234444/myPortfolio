export type ProjectCategory = 'Full stack' | 'AI & data' | 'Mobile'
export interface PortfolioProject {
  id: number
  title: string
  description: string
  stack: string[]
  links: string[]
  category: ProjectCategory
  kind: string
  detail: string
  visual: string
}

export const projects: PortfolioProject[] = [
  {
    id: 0,
    title: 'ArtistHub',
    description: 'A creative platform with a conversational layer.',
    stack: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'MongoDB',
      'LangChain',
      'LangGraph',
    ],
    links: ['https://artist-hub-lfje.vercel.app/'],
    category: 'Full stack',
    kind: 'WEB APPLICATION · AI',
    detail:
      'Developed during my internship at MTB Solutions. The application brings together a full-stack web experience and an LLM-based chatbot using LangChain and LangGraph.',
    visual: 'artist',
  },
  {
    id: 1,
    title: 'SplitIT',
    description: 'Shared experiences. Simpler shared expenses.',
    stack: ['Next.js', 'TypeScript', 'Convex', 'Clerk', 'Tailwind CSS'],
    links: ['https://split-it-8w5l.vercel.app/'],
    category: 'Full stack',
    kind: 'WEB APPLICATION · FINANCE',
    detail:
      'An expense-splitting application for friends and groups. Built to divide and track shared costs, with Convex for application data and Clerk for authentication.',
    visual: 'split',
  },
  {
    id: 2,
    title: 'Plagiarism WebApp',
    description: 'A closer look at the code behind the contest.',
    stack: [
      'React.js',
      'Vite',
      'MongoDB',
      'Node.js',
      'Express.js',
      'Puppeteer',
    ],
    links: ['https://github.com/amey1234444/leetcode-plagiarism-checker'],
    category: 'Full stack',
    kind: 'DEVELOPER TOOL · AUTOMATION',
    detail:
      'A web application for detecting plagiarism in LeetCode contests. Combines a React interface, a Node.js and Express backend, MongoDB, and Puppeteer-based data collection.',
    visual: 'code',
  },
  {
    id: 3,
    title: 'Notepad App',
    description: 'A small space for your next big idea.',
    stack: ['Java', 'Firebase', 'Android Studio'],
    links: [],
    category: 'Mobile',
    kind: 'ANDROID · PRODUCTIVITY',
    detail:
      'A note-taking application built in Java with Google Firebase. Designed around a straightforward way to capture and organize notes on Android.',
    visual: 'notes',
  },
  {
    id: 4,
    title: 'Facial Emotion Detection',
    description: 'Exploring the expressions that make us human.',
    stack: ['Python', 'OpenCV', 'Kaggle Dataset'],
    links: [],
    category: 'AI & data',
    kind: 'COMPUTER VISION · EXPERIMENT',
    detail:
      'A facial emotion detection project using Python and OpenCV, developed with a dataset from Kaggle to explore visual patterns in human expressions.',
    visual: 'vision',
  },
  {
    id: 5,
    title: 'Circular Fraud Detection',
    description: 'Finding suspicious connections in market data.',
    stack: ['Graph Techniques', 'Python'],
    links: [],
    category: 'AI & data',
    kind: 'GRAPH ANALYSIS · FINANCE',
    detail:
      'A stock market circular fraud detection project that uses graph techniques in Python to examine relationships and identify circular patterns.',
    visual: 'graph',
  },
]
