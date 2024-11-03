module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["tailwind.config.js", "dist/**"],
};
