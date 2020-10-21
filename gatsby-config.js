module.exports = {
  siteMetadata: {
    title: 'Matthieu Compérat',
    description: 'Matthieu Compérat Frontend developper ReactJS NextJS HTML5 CSS3',
    author: '@Mitchnsun',
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
