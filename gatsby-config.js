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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
