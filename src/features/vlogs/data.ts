export type VlogEntry = {
  title: string;
  date: string;
  tags: string[];
  youtubeUrl: string;
  summary: string;
  takeaway: string;
};

export type VlogWorkflowCard = {
  title: string;
  description: string;
};

export type VlogsPageConfig = {
  title: string;
  intro: string;
  primaryActionLabel: string;
  primaryActionUrl?: string;
  primaryActionEnabled: boolean;
  workflowCards: VlogWorkflowCard[];
};

export const vlogsPageConfig: VlogsPageConfig = {
  title: "Vlogs",
  intro:
    "A clean space for video updates on projects, learning, and engineering thoughts. The page is ready for manual entries now and YouTube integration later.",
  primaryActionLabel: "YouTube Channel",
  primaryActionEnabled: false,
  workflowCards: [
    {
      title: "Manual first",
      description: "Add video entries manually first so the page stays stable and easy to update.",
    },
    {
      title: "YouTube later",
      description: "Connect the channel only after the content structure feels right and easy to maintain.",
    },
    {
      title: "My takeaway stays manual",
      description: "Each video should include your own takeaway so the page feels personal, not auto-generated.",
    },
  ],
};

export const vlogEntries: VlogEntry[] = [];
