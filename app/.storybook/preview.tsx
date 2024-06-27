import React from "react";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { Nav } from "@/components/organisms/Navbar/Nav";
import { Footer } from "@/components";
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading from parameters
      const { pageLayout } = parameters;
      switch (pageLayout) {
        case "page":
          return (
            // Your page layout is probably a little more complex than this ;)
            <div>
              <Nav />
              <Story />
              <Footer />
            </div>
          );

        default:
          // In the default case, don't apply a layout
          return <Story />;
      }
    },
  ],
};

export default preview;
