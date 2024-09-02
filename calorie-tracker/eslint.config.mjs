import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginJest from "eslint-plugin-jest";

export default [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node 
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      semi: ["warn", "always"]
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    files: ["src/**/*.{test,spec}.{js,mjs,cjs,jsx}"],
    plugins: {
      jest: pluginJest
    },
    env: {
      "jest/globals": true,
      "node": true
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }
];
