import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {
      sourceType: "commonjs",
      globals:  globals.node
    }
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Désactiver la règle no-undef pour les paramètres de fonction
      "no-undef": "off",
    },
  },
   // Ignorer les fichiers de test Jest et Playwright
  {
    ignores: [
      "**/__tests__/**",
      "**/*.test.js",
      "**/*.spec.js",
      "**/*.test.ts",
      "**/*.spec.ts",
      "coverage/",
      "node_modules/",
      "playwright-report/"
    ],
  },
];