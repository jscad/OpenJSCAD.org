import js from "@eslint/js"
import globals from "globals"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["**/dist/", "packages/io/scad-deserializer", "packages/vtree"]),
  {
    files: ["**/*.{js}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: {...globals.browser, ...globals.node} }
  },
  {
    "rules": {
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
      "no-var": "error"
    }
   }
])
