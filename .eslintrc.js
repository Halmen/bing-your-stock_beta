module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ["next/core-web-vitals", "@react-native-community"],
  ignorePatterns: [".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "prettier/prettier": 0,
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
