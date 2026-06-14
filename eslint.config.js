import js from "@eslint/js"
import globals from "globals"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["**/dist/", "packages/desktop", "packages/io/scad-deserializer", "packages/vtree"]),
  {
    files: ["**/*.{js}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: {...globals.browser, ...globals.node} }
  },
  {
    "rules": {
      // enforce consistent arrow functions
      "func-style": [
        "error",
        "expression"
      ],
      "arrow-body-style": [
        "error",
        "as-needed"
      ],
      "arrow-parens": [
        "error",
        "always"
      ],
      "arrow-spacing": "error",
      "prefer-arrow-callback": "error",
      // enforce consistent code
      "consistent-return": ["error"],
      // "curly": ["error"],
      "default-case": ["error"],
      "eqeqeq": ["error", "smart"],
      "no-array-constructor": ["error"],
      // "no-loop-func": ["error"],
      "no-multi-assign": ["error"],
      "no-var": "error"
    }
   }
])
