module.exports = {
  siteMetadata: {
    siteUrl: "https://similar.cinetimes.org",
    title: "ProxiMovie - What to watch next",
    titleTemplate: "%s · ProxiMovie",
    description:
    "Find movies that are similar to the ones you already enjoy. If you don't find here what to watch next, I am afraid there is no hope for you.",
    image: "/images/logo.png", 
    twitterUsername: "@cinetimes",
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "ñokñfdksoñfkds",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/movies`,
      },
    },
  ],
};
