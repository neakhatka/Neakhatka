import type { Meta, StoryObj } from "@storybook/react";
import ContactUs from './page'

const meta: Meta<typeof ContactUs> = {
  title: "Neakhatka/Pages/ContactUs",
  component: ContactUs,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/Cvvmjfhl1K2c8EkXBRK3OF/Neakhatka?page-id=22%3A18&node-id=220-779&viewport=2202%2C684%2C0.15&t=7UxqehVfqGTaRUiE-1&scaling=scale-down-width&content-scaling=fixed",
    },
    pageLayout: "page",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ContactUs>;

export const Default: Story = {
  args: {},
};
