// Experience supplied in Amey's October 2026 resume. Keep dates and outcomes
// together so Home, About and Journey always present the same information.
export const experiences = [
  {
    id: 'blackrock',
    company: 'BlackRock',
    role: 'Software Engineer Intern',
    team: 'Process Engineering',
    date: 'Jan – Jun 2026',
    period: '2026',
    theme: 'amber',
    focus: 'BACKEND & DISTRIBUTED SYSTEMS',
    title: 'Reliable systems. Real scale.',
    summary:
      'Built Java services for transaction pipelines, with a focus on dependable APIs, faster data access, secure delivery and test coverage.',
    metrics: [
      { value: '4', label: 'Spring Boot microservices' },
      { value: '45%', label: 'lower p95 query latency' },
      { value: '300+', label: 'unit & integration tests' },
    ],
    contributions: [
      {
        title: 'Services that connect',
        body: 'Built four Java Spring Boot microservices with REST and gRPC APIs for tier-0 transaction pipelines, supporting cross-platform integration and 99.9% availability.',
      },
      {
        title: 'Faster access to data',
        body: 'Implemented DB2 and MySQL persistence with SQL, JDBC and Spring Data JPA. Added Redis caching to reduce p95 database query latency by 45% and peak database load by 30%.',
      },
      {
        title: 'Secure, repeatable releases',
        body: 'Secured APIs with Spring Security, JWT and role-based access control. Automated GitLab CI/CD with Docker and Kubernetes on AWS EKS, bringing build and deployment cycles from around two hours to 20 minutes.',
      },
      {
        title: 'Confidence beyond the happy path',
        body: 'Wrote 300+ JUnit 5 and Mockito tests with 85% branch coverage. Used Linux heap and thread dumps to investigate latency bottlenecks and troubleshoot production incidents.',
      },
    ],
    stack: [
      'Java',
      'Spring Boot',
      'REST / gRPC',
      'DB2 / MySQL',
      'Redis',
      'Spring Security',
      'JUnit / Mockito',
      'GitLab CI/CD',
      'Docker / AWS EKS',
    ],
  },
  {
    id: 'intangles',
    company: 'Intangles Labs',
    role: 'AI / Software Engineer Intern',
    team: 'Generative AI & analytics',
    date: 'Aug – Dec 2025',
    period: '2025',
    theme: 'rose',
    focus: 'AI & DATA APPLICATIONS',
    title: 'From questions to useful answers.',
    summary:
      'Connected generative AI, vector search and analytics services to make data easier to retrieve and use through one consistent interface.',
    metrics: [
      { value: '40%', label: 'better retrieval efficiency' },
      { value: '6', label: 'analytics services integrated' },
      { value: 'REST + MCP', label: 'unified service interfaces' },
    ],
    contributions: [
      {
        title: 'An end-to-end AI analytics service',
        body: 'Built a Python service using LangGraph, Google ADK and Pinecone vector search over MongoDB, improving semantic data retrieval efficiency by 40%.',
      },
      {
        title: 'Connected services, clearer visibility',
        body: 'Integrated six analytics services through modular REST APIs and MCP protocols, replacing point-to-point scripts with a unified interface. Tracked latency in Grafana alongside 90%+ verified accuracy.',
      },
    ],
    stack: [
      'Python',
      'Generative AI',
      'LangGraph',
      'Google ADK',
      'Pinecone',
      'MongoDB',
      'REST APIs',
      'MCP',
      'Grafana',
    ],
  },
  {
    id: 'persistent',
    company: 'Persistent Systems',
    role: 'Software Engineer Intern',
    team: 'Full-stack development & quality',
    date: 'Jan – Jun 2025',
    period: '2025',
    theme: 'sky',
    focus: 'FULL STACK & AUTOMATION',
    title: 'Thoughtful interfaces. Tested releases.',
    summary:
      'Worked across React interfaces, Java services and automated API checks, connecting the user experience with dependable release validation.',
    metrics: [
      { value: '15+', label: 'REST endpoints validated' },
      { value: '70%', label: 'less release verification time' },
      { value: 'React + Java', label: 'full-stack development' },
    ],
    contributions: [
      {
        title: 'Interfaces built around the workflow',
        body: 'Developed full-stack components with React, JavaScript and Java. Validated user workflows, form accessibility and state management across browsers.',
      },
      {
        title: 'Validation built into delivery',
        body: 'Automated checks for 15+ REST endpoints using REST-Assured and SQL. Integrated test stages into Jenkins CI to reduce release verification turnaround by 70%.',
      },
    ],
    stack: [
      'React',
      'JavaScript',
      'TypeScript',
      'Java',
      'REST-Assured',
      'SQL',
      'Jenkins CI',
      'Accessibility',
    ],
  },
]
