module.exports = {
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-theme-portfolio-minimal",
      options: {
        siteUrl: "https://melinda-funnnnn-code.netlify.app/", // Used for sitemap generation
        manifestSettings: {
          favicon: "./content/images/MF.jpeg", // Path is relative to the root
          siteName: "Melinda's Portfolio", // Used in manifest.json
          shortName: "Portfolio", // Used in manifest.json
          startUrl: "/", // Used in manifest.json
          backgroundColor: "#FFFFFF", // Used in manifest.json
          themeColor: "#000000", // Used in manifest.json
          display: "minimal-ui", // Used in manifest.json
        },
        contentDirectory: "./content",
        blogSettings: {
          path: "/blog", // Defines the slug for the blog listing page
          usePathPrefixForArticles: false, // Default true (i.e. path will be /blog/first-article)
        },
        // googleAnalytics: {
        //     trackingId: "UA-XXXXXX-X",
        //     anonymize: true, // Default true
        //     environments: ["production", "development"] // Default ["production"]
        // }
      },
    },
  ],
  // extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
};
