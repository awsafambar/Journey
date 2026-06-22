export type LearningEntry = {
  title: string;
  date: string;
  tags: string[];
  source: string;
  track: string;
  summary: string;
  takeaway: string;
};

export const learningEntries: LearningEntry[] = [
  {
    title: "Upgrading frontend apps without breaking delivery speed",
    date: "2026-06-18",
    tags: ["frontend", "architecture", "vite"],
    source: "project",
    track: "Frontend",
    summary:
      "I revisited lessons from moving production apps across major frontend versions and how small upgrade steps reduce risk.",
    takeaway:
      "The safest upgrade path is usually a series of boring, verified changes instead of one heroic rewrite.",
  },
  {
    title: "Accessibility matters more when the product gets complex",
    date: "2026-06-14",
    tags: ["frontend", "accessibility", "testing"],
    source: "notes",
    track: "Frontend",
    summary:
      "I looked at how accessible UI work becomes easier when it is treated as part of the component design, not as a final checklist.",
    takeaway:
      "Good accessibility is easier to keep when buttons, forms, states, and keyboard behavior are thought through from the start.",
  },
  {
    title: "Making dashboards useful, not just visually busy",
    date: "2026-06-10",
    tags: ["frontend", "charts", "product"],
    source: "project",
    track: "Frontend",
    summary:
      "I reflected on dashboard work where charts only became valuable after the surrounding filters, labels, and context were made clearer.",
    takeaway:
      "A chart is only helpful when the user can quickly understand what changed, why it matters, and what to do next.",
  },
  {
    title: "Using AI search better during technical research",
    date: "2026-06-06",
    tags: ["research", "workflow", "ai"],
    source: "search",
    track: "Workflow",
    summary:
      "I compared how different AI tools help during debugging and concept research, then filtered the useful parts into my own notes.",
    takeaway:
      "AI is most useful when it speeds up exploration, but the final understanding still needs to be written in your own words.",
  },
  {
    title: "Keeping DSA practice visible instead of private",
    date: "2026-06-03",
    tags: ["dsa", "github", "practice"],
    source: "github",
    track: "DSA",
    summary:
      "I started organizing algorithm practice in GitHub so the learning process stays visible and easier to continue consistently.",
    takeaway:
      "A public practice trail makes interview preparation easier because revision, consistency, and accountability all improve together.",
  },
  {
    title: "Why I want an LLD track on the site",
    date: "2026-05-30",
    tags: ["lld", "design", "architecture"],
    source: "notes",
    track: "LLD",
    summary:
      "I want low-level design notes to live beside frontend learning so system thinking grows in the same public workflow.",
    takeaway:
      "LLD becomes much easier to retain when design decisions, trade-offs, and simple examples are written down regularly.",
  },
];
