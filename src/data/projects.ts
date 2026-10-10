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
  caseStudy?: {
    focus: string
    status: string
    challenge: string
    capabilities: { title: string; description: string }[]
    flow: { title: string; description: string }[]
    decisions: { title: string; description: string }[]
    scope: string
    sources: { label: string; url: string }[]
  }
}

export const projects: PortfolioProject[] = [
  {
    id: 8,
    title: 'GRID-X',
    description: 'A shared operating system for distributed manufacturing.',
    stack: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Zod'],
    links: ['https://github.com/amey1234444/GRID-X'],
    category: 'Full stack',
    kind: 'Manufacturing operations',
    visual: 'gridx',
    detail:
      'GRID-X brings partner onboarding, job allocation, drawings, materials, inspections and payment approvals into one connected workflow. Its pnpm monorepo separates the web experience, NestJS API, database and shared domain rules. Control teams, partners and inspectors each have a dedicated view of the work.',
    caseStudy: {
      focus: 'Full-stack systems · Domain modelling',
      status: 'Web, API and domain workflows implemented',
      challenge:
        'A manufacturing job crosses company boundaries. The drawing revision, material issue, production progress and accepted quantity all need to stay connected as different people move the job forward. GRID-X makes those handoffs explicit in the application.',
      capabilities: [
        {
          title: 'One job, across teams',
          description:
            'Partner onboarding, allocation, production milestones and logistics share a job record, giving each role a view of its next action.',
        },
        {
          title: 'Controlled drawing releases',
          description:
            'Revisions move through review, approval and release. A new release supersedes the previous revision; partners see released revisions explicitly shared with them.',
        },
        {
          title: 'Inspection before payment',
          description:
            'Inspection plans, measured results, non-conformances, rework and deviations connect quality decisions to the quantity eligible for payment.',
        },
        {
          title: 'Accountable changes',
          description:
            'JWT authentication, role permissions and audit records sit alongside shared validation schemas and explicit state transitions.',
        },
      ],
      flow: [
        {
          title: 'Plan & allocate',
          description:
            'Onboard a partner, allocate a job and share the approved drawing revision.',
        },
        {
          title: 'Produce & inspect',
          description:
            'Track materials and milestones, then record inspection results and exceptions.',
        },
        {
          title: 'Dispatch & reconcile',
          description:
            'Connect logistics, accepted quantities, partner invoices and payment approvals.',
        },
      ],
      decisions: [
        {
          title: 'Share the business rules',
          description:
            'The shared package holds enums, Zod schemas, permissions and domain logic. The web and API can work from the same vocabulary instead of duplicating definitions.',
        },
        {
          title: 'Make releases transactional',
          description:
            'The drawing service changes the current revision and supersedes older releases in a database transaction, keeping the released state consistent.',
        },
        {
          title: 'Model exceptions as work',
          description:
            'Rework, deviations and corrective actions are explicit records. They remain connected to the job and inspection instead of becoming informal side conversations.',
        },
      ],
      scope:
        'This case study describes the public repository implementation. It does not claim measured factory throughput, production adoption or financial impact. Deployment requires database configuration, seeded roles and operational validation.',
      sources: [
        {
          label: 'Architecture & setup',
          url: 'https://github.com/amey1234444/GRID-X#readme',
        },
        {
          label: 'Drawing control implementation',
          url: 'https://github.com/amey1234444/GRID-X/blob/HEAD/apps/api/src/drawings/drawings.service.ts',
        },
        {
          label: 'Inspection implementation',
          url: 'https://github.com/amey1234444/GRID-X/blob/HEAD/apps/api/src/quality/quality.service.ts',
        },
      ],
    },
  },
  {
    id: 6,
    title: 'IMG Creator',
    description:
      'An image studio with generation, private galleries and a training workflow.',
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'PyTorch',
      'Diffusers',
      'S3',
      'Stripe',
    ],
    links: ['https://github.com/amey1234444/IMG_Creator'],
    category: 'AI & data',
    kind: 'AI image platform',
    visual: 'image-studio',
    detail:
      'IMG Creator combines a local Gradio studio with a separate multi-user FastAPI application. The hosted architecture includes accounts, private galleries, credit accounting, a durable generation queue and an owner console. Dedicated workers handle provider generation, GPU inference and LoRA training.',
    caseStudy: {
      focus: 'AI infrastructure · Product engineering',
      status: 'Implemented; provider and GPU validation required',
      challenge:
        'An image-generation interface is only one part of the system. Requests need to survive restarts, credits need consistent accounting, images need private storage, and training data needs a review trail. The platform separates these responsibilities while preserving the settings behind each result.',
      capabilities: [
        {
          title: 'A controllable studio',
          description:
            'Model, effort, aspect ratio, seed and export resolution are selected before submission. Quotes distinguish native generation dimensions from the final exported image.',
        },
        {
          title: 'Durable generation jobs',
          description:
            'PostgreSQL stores the job and reserves credits in one transaction. Workers claim jobs with leases and heartbeats, while idempotency keys protect retried requests.',
        },
        {
          title: 'Private image ownership',
          description:
            'Authenticated, ownership-checked endpoints serve gallery images from private object storage. Browser sessions use HttpOnly cookies and CSRF protection.',
        },
        {
          title: 'Training with review',
          description:
            'Dataset snapshots, grouped splits, checkpoint preservation and owner approval connect a LoRA training workflow to registered adapters.',
        },
      ],
      flow: [
        {
          title: 'Choose & quote',
          description:
            'Select generation settings, preview the credit quote and submit an authenticated request.',
        },
        {
          title: 'Queue & generate',
          description:
            'Reserve credits, claim the job and run the configured provider or GPU worker.',
        },
        {
          title: 'Store & review',
          description:
            'Save the private image with its metadata; keep training and adapter approval in the owner workflow.',
        },
      ],
      decisions: [
        {
          title: 'Keep models out of web replicas',
          description:
            'The web application handles accounts and orchestration. Separate model-owning workers keep inference and training resources independent from web serving.',
        },
        {
          title: 'Preserve uncertain outcomes',
          description:
            'Interrupted or ambiguous provider requests enter an uncertain state for review instead of automatically repeating a potentially billable operation.',
        },
        {
          title: 'Distinguish generation from export',
          description:
            'Higher-resolution exports use configured resizing or learned super-resolution. The system records the processing method and preserves the native source.',
        },
      ],
      scope:
        'Provider credentials, private storage, billing setup and real GPU validation are still deployment requirements. 8K is an export option, not a claim of native 8K generation. The repository does not establish measured model quality, throughput or completed training results.',
      sources: [
        {
          label: 'Project & implementation status',
          url: 'https://github.com/amey1234444/IMG_Creator#readme',
        },
        {
          label: 'Hosted platform architecture',
          url: 'https://github.com/amey1234444/IMG_Creator/blob/main/docs/platform.md',
        },
        {
          label: 'Training lifecycle',
          url: 'https://github.com/amey1234444/IMG_Creator/blob/main/docs/training-lifecycle.md',
        },
      ],
    },
  },
  {
    id: 7,
    title: 'News Platform',
    description:
      'An event-driven pipeline from RSS feeds to AI-refined news and notifications.',
    stack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
    links: ['https://github.com/amey1234444/NEWS-PLATFORM'],
    category: 'AI & data',
    kind: 'Event-driven backend',
    visual: 'newsroom',
    detail:
      'News Platform separates ingestion, AI refinement and delivery into three Spring Boot services. The fetcher reads RSS and Atom feeds, stores raw articles and publishes Kafka events. The refiner creates structured news records, and the notification service consumes the refined stream for delivery.',
    caseStudy: {
      focus: 'Backend engineering · Asynchronous systems',
      status: 'Service implementation; integration deployment required',
      challenge:
        'News arrives from multiple feeds with different formats and repeated items. Fetching, language-model processing and delivery also fail in different ways. Separating them into services gives each stage a clear responsibility and a durable record of the data it processes.',
      capabilities: [
        {
          title: 'Feed ingestion',
          description:
            'The fetcher parses RSS and Atom sources, persists raw news and uses a canonical-identifier hash to avoid re-saving the same item.',
        },
        {
          title: 'Event-based handoffs',
          description:
            'Kafka topics news.raw and news.refined connect the services, separating the ingestion step from refinement and delivery.',
        },
        {
          title: 'Structured refinement',
          description:
            'An OpenAI-compatible client supports the configured language-model provider. The refiner normalizes titles, summaries and tags, with explicit handling of missing fields.',
        },
        {
          title: 'Notification delivery',
          description:
            'A dedicated service consumes refined news and includes a Telegram delivery integration. Docker Compose supplies the local infrastructure.',
        },
      ],
      flow: [
        {
          title: 'Fetch',
          description:
            'Poll a feed, parse the article, check its identifier and persist the raw item.',
        },
        {
          title: 'Refine',
          description:
            'Consume news.raw, generate a structured summary and publish news.refined.',
        },
        {
          title: 'Deliver',
          description:
            'Consume the refined event and send it through the configured notification sink.',
        },
      ],
      decisions: [
        {
          title: 'Separate each stage',
          description:
            'Ingestion, refinement and notification have separate Spring Boot applications, keeping provider-specific work out of the feed parser.',
        },
        {
          title: 'Persist before publishing',
          description:
            'The fetcher stores the raw article before publishing it. Database records provide a useful starting point for tracing an item through the pipeline.',
        },
        {
          title: 'Keep configuration external',
          description:
            'Feed sources, provider settings and notification credentials are supplied through service configuration and environment variables.',
        },
      ],
      scope:
        'The repository contains the service code and local deployment instructions. This case study does not claim production traffic, delivery guarantees or measured summarization accuracy. End-to-end verification needs running infrastructure and configured provider and notification credentials.',
      sources: [
        {
          label: 'Project & local setup',
          url: 'https://github.com/amey1234444/NEWS-PLATFORM#readme',
        },
        {
          label: 'Fetcher system design',
          url: 'https://github.com/amey1234444/NEWS-PLATFORM/blob/main/news-fetcher-service/SYSTEM_DESIGN.md',
        },
        {
          label: 'Refinement implementation',
          url: 'https://github.com/amey1234444/NEWS-PLATFORM/tree/main/ai-refiner-service/src/main/java/com/example/airefiner',
        },
      ],
    },
  },

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

export const featuredProjects = projects.filter((project) => project.caseStudy)
