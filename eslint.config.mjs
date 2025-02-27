import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierLint from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    prettierLint,
    prettierPlugin,
    importPlugin,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "import/order": [
                "error",
                {
                    "newlines-between": "always",
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            quotes: [
                "error",
                "double",
                {
                    allowTemplateLiterals: true,
                },
            ],
            semi: ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
        },
    },
];

export default eslintConfig;
