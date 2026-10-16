import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // A <form> with only onSubmit falls back to a native GET until React hydrates, which puts the
    // field values (passwords included) in the URL. `action` makes it a POST that works pre-hydration.
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='form']:not(:has(JSXAttribute[name.name='action']))",
          message: "Every <form> needs an `action` (a Server Action). onSubmit alone submits as a GET with the values in the URL before hydration.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
