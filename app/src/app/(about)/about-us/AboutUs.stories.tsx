import type { Meta, StoryObj } from "@storybook/react";
// import { Login } from "./Login";
import AboutUs from "./page";

const meta: Meta<typeof AboutUs> = {
  title: "Neakhatka/Pages/AboutUs",
  component: AboutUs,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/Cvvmjfhl1K2c8EkXBRK3OF/Neakhatka?page-id=22%3A18&node-id=1976-7655&viewport=2202%2C684%2C0.15&t=7UxqehVfqGTaRUiE-1&scaling=scale-down&content-scaling=fixed",
    },
    pageLayout: "page",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AboutUs>;

export const Default: Story = {
  args: {},
};
