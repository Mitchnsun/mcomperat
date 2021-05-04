module.exports = {
  siteMetadata: {
    title: 'Matthieu Compérat',
    description: 'Matthieu Compérat Frontend developper ReactJS NextJS HTML5 CSS3',
    author: '@Mitchnsun',
  },
  flags: {
    // THE_FLAG: 'DEV_SSR', // (Umbrella Issue (https://gatsby.dev/dev-ssr-feedback)) · Server Side Render (SSR) pages on full reloads during develop. Helps you detect SSR bugs and fix them without needing to do full builds.
    THE_FLAG: 'FAST_DEV', // Enable all experiments aimed at improving develop server start time
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/assets/data/',
      },
    },
    {
      resolve: 'gatsby-plugin-styled-jsx',
      options: {
        optimizeForSpeed: true,
        sourceMaps: false,
        vendorPrefixes: true,
      },
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'UA-36979515-1',
      },
    },
  ],
};
