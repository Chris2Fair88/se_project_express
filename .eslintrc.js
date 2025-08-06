module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};