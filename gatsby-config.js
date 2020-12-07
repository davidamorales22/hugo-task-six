require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'HUGO - TWO',
    description: 'TASK TWO',
    author: '@DavidMorales'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesConfig: {
          disableAutoprefixing: true,
          disableMinification: true
        },
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: 'Poppins'
              }
            ]
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'hugo',
        short_name: 'hugo',
        start_url: '/',
        background_color: '#0C4A60',
        theme_color: '#c43831',
        display: 'minimal-ui',
        icon: 'static/images/icon.png'
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: `${__dirname}/src/`,
        pages: `${__dirname}/src/pages/`,
        components: `${__dirname}/src/components`,
        static: `${__dirname}/static/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    }
  ]
}
