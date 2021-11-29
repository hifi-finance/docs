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
          routeBasePath: "protocol/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // "light" | "dark"
        defaultMode: "dark",

        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,

        // Should we use the prefers-color-scheme media-query,
        // using user system preferences, instead of the hardcoded defaultMode
        respectPrefersColorScheme: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Company",
            items: [
              {
                label: "About",
                href: "https://hifi.finance/team",
              },
              {
                label: "Branding",
                href: "https://hifi.finance/branding",
              },
              {
                label: "Careers",
                href: "https://hifi.finance/jobs",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/mhtSRz6",
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
            label: "Protocol",
            position: "left",
            type: "doc",
          },
          { label: "SDK", position: "left", to: "/protocol/developers/sdk" },
          { label: "Smart Contracts", position: "left", to: "/protocol/technical-reference/core/balance-sheet" },
          {
            href: "https://github.com/hifi-finance/hifi",
            label: "GitHub",
            position: "right",
          },
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
