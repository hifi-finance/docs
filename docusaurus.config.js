const katex = require("rehype-katex");
const math = require("remark-math");

/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: "/",
  favicon: "img/favicon.ico",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  organizationName: "hifi-finance",
  projectName: "hifi-docs",
  tagline: "Documentation and Guides for Hifi",
  title: "Hifi Docs",
  url: "https://docs.hifi.finance",
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl: "https://github.com/hifi-finance/docs/tree/main/",
          includeCurrentVersion: true,
          path: "protocol",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: "protocol/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity: "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // "light" | "dark"
        defaultMode: "light",

        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,

        // Should we use the prefers-color-scheme media-query,
        // using user system preferences, instead of the hardcoded defaultMode
        respectPrefersColorScheme: true,
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Company",
            items: [
              {
                label: "Website",
                href: "https://hifi.finance/",
              },
              {
                label: "Ecosystem",
                href: "https://hifi.finance/ecosystem",
              },
              {
                label: "Branding",
                href: "https://hifi.finance/branding",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/uGxaCppKSH",
              },
              {
                label: "Blog",
                href: "https://blog.hifi.finance/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/HifiFinance",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Monorepo",
                href: "https://github.com/hifi-finance/hifi",
              },
              {
                label: "Docs",
                href: "https://github.com/hifi-finance/docs",
              },
              {
                label: "Liquidator",
                href: "https://github.com/hifi-finance/hifi-liquidator-js",
              },
              {
                label: "Subgraph",
                href: "https://github.com/hifi-finance/hifi-subgraph",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mainframe Group Inc.`,
      },
      navbar: {
        title: "Hifi Docs",
        logo: {
          alt: "Hifi Logo",
          src: "img/logo.png",
        },
        items: [
          {
            docId: "introduction",
            label: "PROTOCOL",
            position: "left",
            type: "doc",
          },
          { label: "SDK", position: "left", to: "/protocol/developers/sdk" },
          { label: "SMART CONTRACTS", position: "left", to: "/protocol/technical-reference/core/balance-sheet" },
        ],
      },
      prism: {
        additionalLanguages: ["solidity"],
        darkTheme: require("prism-react-renderer/themes/dracula"),
        theme: require("prism-react-renderer/themes/github"),
      },
    }),
};

module.exports = config;
