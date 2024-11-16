import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "func-names": "off",
      "no-console": "off",
      "max-len": ["error", 120],
      "newline-before-return": "error",
      "no-trailing-spaces": "error",
      "semi": ["error", "always"]
    },
  },
];