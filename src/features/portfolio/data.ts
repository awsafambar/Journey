export type Highlight = {
  label: string;
  value: string;
  detail: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Project = {
  name: string;
  client: string;
  duration: string;
  stack: string[];
  summary: string;
  impact: string[];
};

export type ResumeConfig = {
  label: string;
  publicPath: string;
  enabled: boolean;
};

export const highlights: Highlight[] = [
  {
    label: "Experience",
    value: "7+ years",
    detail: "Frontend-heavy product work across dashboards, portals, and workflow systems.",
  },
  {
    label: "Primary focus",
    value: "React",
    detail: "Strong hands-on delivery with modern React apps, testing, and UI architecture.",
  },
  {
    label: "Strength",
    value: "UI to prod",
    detail: "Comfortable taking polished designs into responsive, production-ready interfaces.",
  },
];

export const strengths: string[] = [
  "Build responsive, high-quality React interfaces from Figma with close attention to detail.",
  "Work across frontend and backend integration using Node.js, Express.js, AWS, and databases.",
  "Ship with testing, documentation, and release discipline using Jest, Storybook, and PR coverage goals.",
  "Support teams beyond coding through mentoring, production support, and ownership of delivery.",
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Redux", "JavaScript", "TypeScript-ready architecture", "HTML5", "CSS3", "Tailwind", "Material UI", "Bootstrap"],
  },
  {
    title: "Testing and quality",
    items: ["Jest", "React Testing", "Enzyme", "TDD mindset", "Accessibility awareness", "Storybook"],
  },
  {
    title: "Backend and cloud",
    items: ["Node.js", "Express.js", "AWS Lambda", "S3", "GraphQL", "SSE", "MongoDB", "Oracle", "DynamoDB", "DocumentDB"],
  },
  {
    title: "Delivery",
    items: ["Git", "Bitbucket", "SVN", "CircleCI", "Jenkins", "Release support", "Client communication", "Mentoring"],
  },
];

export const certifications = [
  "Front-End Web Development with React - Coursera, Hong Kong University",
  "Server-side Development with Node.js, Express.js and MongoDB - Coursera, Hong Kong University",
];

export const resumeConfig: ResumeConfig = {
  label: "Download CV",
  publicPath: "/files/awsaf-ambar-cv.pdf",
  enabled: false,
};

export const projects: Project[] = [
  {
    name: "Sensor Data Dashboard",
    client: "US HVAC company",
    duration: "Mar 2023 - Mar 2026",
    stack: ["React", "ECharts", "GraphQL", "Material UI", "Vite", "AWS", "Node.js", "MongoDB"],
    summary:
      "Built a performance-oriented portal to manage and analyze sensor-driven triggers while supporting backend microservices and cloud data workflows.",
    impact: [
      "Helped migrate a legacy application while maintaining accessible, vulnerability-aware delivery.",
      "Built alarms, alerts, reports, and charts for operational and customer usage insights.",
      "Supported major upgrade work including React and Vite modernization and production deployments.",
    ],
  },
  {
    name: "Appointment Booking Portal",
    client: "Singapore telecommunications company",
    duration: "Jun 2021 - Mar 2023",
    stack: ["React", "Charts.js", "Server-Sent Events", "Bootstrap", "Webpack", "Enzyme", "Jest"],
    summary:
      "Created a responsive booking portal for global sales teams with real-time slot availability and reporting features.",
    impact: [
      "Built the UI from scratch using a desktop-first responsive approach.",
      "Integrated external scheduling data for live slot booking workflows.",
      "Supported UAT, release readiness, and junior onboarding on the project.",
    ],
  },
  {
    name: "Chatbot and Payment Integrations",
    client: "Lenses and camera manufacturer",
    duration: "Dec 2020 - Apr 2021",
    stack: ["EJS", "Express.js", "JavaScript", "Git"],
    summary:
      "Extended an existing chatbot experience inside Facebook Messenger WebView and added payment integration flows.",
    impact: [
      "Connected Messenger WebView with dynamic UI templates driven by chatbot payloads.",
      "Integrated Razorpay, Paytm, and PayU money configuration into the chatbot flow.",
      "Delivered features in a mixed frontend and backend integration setting.",
    ],
  },
  {
    name: "GRC Workflow and Risk Analysis Product",
    client: "US insurance and storage clients",
    duration: "Sep 2018 - Aug 2020",
    stack: ["PLSQL", "Oracle", "React", "JavaScript", "Express.js", "Node.js", "SVN"],
    summary:
      "Developed workflow-driven due diligence forms and dynamic reports for governance, risk, and compliance processes.",
    impact: [
      "Built frontend solutions on top of an existing enterprise platform.",
      "Integrated external compliance and company-data services.",
      "Handled deployment support, reporting pipelines, and client-facing delivery tasks.",
    ],
  },
];
