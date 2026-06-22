import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "../features/learn/ProblemsAndConcepts/components/ProgressBar/ProgressBar";

const meta = {
  title: "Learn/ProgressBar",
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainColor: "#e0e0e0",
    progressBarColor: "#76c7c0",
  },
};
