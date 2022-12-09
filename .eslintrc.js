module.exports = {
  root: true,
  extends: ["custom", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-html-link-for-pages": "off",
  },
  globals: {
    JSX: true,
  },
};
