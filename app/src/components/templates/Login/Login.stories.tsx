import type { Meta, StoryObj } from "@storybook/react";
import { Login } from "./Login";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Login> = {
  title: "Neakhatka/Templates/Login",
  component: Login,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/Cvvmjfhl1K2c8EkXBRK3OF/Neakhatka?page-id=22%3A18&node-id=2991-7339&viewport=2202%2C684%2C0.15&t=7UxqehVfqGTaRUiE-1&scaling=min-zoom&content-scaling=fixed",
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByPlaceholderText("example@gmail.com");
    await userEvent.type(emailInput, "user@example.com");

    // Simulate user typing into the password input
    const passwordInput = canvas.getByPlaceholderText("password123");
    await userEvent.type(passwordInput, "password123");
   
  },
};

// import React from "react";
// import { Meta, Story } from "@storybook/react";
// import { within, userEvent } from "@storybook/testing-library";
// import { expect } from "@storybook/jest";
// import { Login, LoginProps } from "../Login/Login";

// export default {
//   title: "Neakhatka/templates/Login",
//   component: Login,
// } as Meta;

// const Template: Story<LoginProps> = (args) => <Login {...args} />;

// export const Default = Template.bind({});
// Default.args = {};

// export const WithError = Template.bind({});
// WithError.args = {
//   emailError: "Invalid email address",
//   passwordError: "Password is required",
// };

// export const LoadingState = Template.bind({});
// LoadingState.args = {
//   loading: true,
// };

// export const UserInteraction = Template.bind({});
// UserInteraction.args = {};

// UserInteraction.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);

//   // Simulate user typing into the email input
//   const emailInput = canvas.getByPlaceholderText("example@gmail.com");
//   await userEvent.type(emailInput, "user@example.com");

//   // Simulate user typing into the password input
//   const passwordInput = canvas.getByPlaceholderText("password123");
//   await userEvent.type(passwordInput, "password123");

//   // Simulate user clicking the login button
//   const loginLogin = canvas.getByRole("button", { name: /login/i });
//   await userEvent.click(loginLogin);

//   // Check if the loading spinner is displayed
//   expect(canvas.getByText("Loading...")).toBeInTheDocument();
// };
