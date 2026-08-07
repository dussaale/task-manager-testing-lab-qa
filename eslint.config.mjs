import { defineConfig } from "eslint/config";
import expo from "eslint-config-expo/flat.js";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  ...expo,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "jsx-a11y": jsxA11y,
    },

    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,

      // Reglas adicionales que queremos evaluar
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-role": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
    },
  },
]);