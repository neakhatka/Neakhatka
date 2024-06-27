import type { Meta, StoryObj } from "@storybook/react";
// import ContactUs from "./page";
import Role from './page'

const meta: Meta<typeof Role> = {
  title: "Neakhatka/Pages/Role",
  component: Role,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/Cvvmjfhl1K2c8EkXBRK3OF/Neakhatka?page-id=22%3A18&node-id=163-590&viewport=2202%2C684%2C0.15&t=7UxqehVfqGTaRUiE-1&scaling=scale-down-width&content-scaling=fixed",
    },
    // pageLayout: "page",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Role>;

export const Default: Story = {
  args: {},
};
