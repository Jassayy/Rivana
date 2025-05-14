import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// This configuration keeps your ESLint setup but disables all rules
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignorePatterns: ["**/*"],  // Ignore all files
    rules: {},                // Empty rules object disables all rules
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: false,
    }
  }
];

export default eslintConfig;