import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "no-empty-pattern": "off",
    },
  },
  {
    ignores: [
      "node_modules",
      "playwright-report",
      "test-results",
      ".env",
      "eslint.config.mjs",
      "juice-shop",
    ]
  }
);
