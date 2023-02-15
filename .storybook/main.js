module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false, // Disabling due to https://github.com/storybookjs/storybook/issues/17482 and other errors
      },
    },
    "@storybook/addon-interactions",
    "storybook-addon-next-router",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
};
