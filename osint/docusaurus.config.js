// @ts-check

const config = {
  title: 'OSINT Investigation Methodology',
  tagline: 'Finding What Is Already There',
  favicon: 'https://skunkworksacademy.com/images/favicon-black.png',

  url: process.env.DOCUSAURUS_URL || 'https://osint.skunkworksacademy.com',
  baseUrl: process.env.DOCUSAURUS_BASE_URL || '/',
  trailingSlash: true,

  organizationName: 'skunkworks-academy',
  projectName: 'security',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          'A protected self-paced OSINT investigation course focused on lawful collection, source verification, evidence handling and defensible reporting.',
      },
      {name: 'robots', content: 'index,follow,max-image-preview:large'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OSINT | SKUNKWORKS',
      logo: {
        alt: 'Skunkworks Academy',
        src: 'https://skunkworksacademy.com/images/favicon-white.png',
        srcDark: 'https://skunkworksacademy.com/images/favicon-white.png',
      },
      items: [
        {to: '/', label: 'Overview', position: 'left'},
        {to: '/learn/', label: 'Course', position: 'left'},
        {to: '/resources/', label: 'Resources', position: 'left'},
        {to: '/enrol/', label: 'Enrol', position: 'left'},
        {
          href: 'https://security.skunkworksacademy.com/',
          label: 'Security Hub',
          position: 'right',
        },
        {
          to: '/login/',
          label: 'Sign in',
          position: 'right',
          className: 'navbar-login',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            {label: 'Overview', to: '/'},
            {label: 'Learning dashboard', to: '/learn/'},
            {label: 'Resources', to: '/resources/'},
          ],
        },
        {
          title: 'Academy',
          items: [
            {label: 'Portal', href: 'https://portal.skunkworksacademy.com/'},
            {label: 'Security', href: 'https://security.skunkworksacademy.com/'},
            {label: 'Training support', href: 'mailto:training@skunkworks.africa'},
          ],
        },
        {
          title: 'Governance',
          items: [
            {label: 'Legal and ethical guardrails', to: '/#guardrails'},
            {label: 'Privacy', href: 'https://skunkworksacademy.com/privacy/'},
            {label: 'Terms', href: 'https://skunkworksacademy.com/terms/'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Skunkworks Academy. Dream. Design. Deliver.`,
    },
  },

  customFields: {
    courseCode: 'OSINT-101',
    checkoutUrl:
      process.env.COURSE_CHECKOUT_URL ||
      'https://portal.skunkworksacademy.com/checkout/?course=OSINT-101',
    supportEmail: 'training@skunkworks.africa',
  },
};

export default config;
