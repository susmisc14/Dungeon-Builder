/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],

  semi: true,
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",

  importOrder: [
    "^react$",
    "^next.*",
    "<THIRD_PARTY_MODULES>",
    "^@repo/(.*)$",
    "^[./]",
    "<SIDE_EFFECT>",
  ],
  importOrderSortSpecifiers: true,
};
