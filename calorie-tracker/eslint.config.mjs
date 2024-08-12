import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
export default [
  {files: ["src/**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error"
        }
    },
    {
      rules: {
          semi: ["error", "never"]
      }
  },
  {
      rules: {
          semi: ["warn", "always"]
      }
  },
];
