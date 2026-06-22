export type LearningRepoSource = {
  id: string;
  title: string;
  owner: string;
  repo: string;
  branch: string;
  description: string;
  contentExtensions: string[];
};

export const dsaRepoSource: LearningRepoSource = {
  id: "dsa",
  title: "DSA",
  owner: "awsafambar",
  repo: "DSA",
  branch: "main",
  description:
    "Live repository-backed practice explorer for data structures and algorithms. The folder structure is preserved from GitHub.",
  contentExtensions: [
    ".md",
    ".txt",
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".json",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".go",
    ".rs",
  ],
};
