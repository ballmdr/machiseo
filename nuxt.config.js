const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)
const environment = {
  API_URL: 'http://93.190.138.237:8080',
  REST_MONGO: 'http://localhost:9000',
  USER_DRUPAL: 'ballmdr',
  PASS_DRUPAL: 'M3n17v11',
  DISCOURSE_URL: 'https://forums.machiseo.com',
  DISCOURSE_API_KEY: '71696264866640b9a7f1d58c61bdd3046ae3e72ae9664000c2fc8ee94bde7baf'
}

module.exports = {
  env: {
    baseUrl: environment.API_URL,
    restMongoUrl: environment.REST_MONGO,
    userDrupal: environment.USER_DRUPAL,
    passDrupal: environment.PASS_DRUPAL,
    discourseUrl: environment.DISCOURSE_URL,
    discourseAPI: environment.DISCOURSE_API_KEY
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'มาชิสซอ machiseo.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ซีรีส์​เกาหลี ซีรีย์เกาหลี เรื่องย่อซีรีส์เกาหลี ดาราเกาหลี รีวิวซีรีส์เกาหลี พูดคุยซีรีส์เกาหลี เว็บบอร์ดซีรีส์เกาหลี' },
      { name: "google-site-verification", content: "rgWusjEPsoA8fiiuTVzNWFsAVOxl7_Om0OVztVuFnwc" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kanit|Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.4.2/css/all.css' }
    ]
  },
  plugins: [ 
    { src: '~/plugins/vuetify.js' }, 
    { src: '~/plugins/axios-port' },
    { src: '~/plugins/vue-masonry-css', ssr: false },
    { src: '~/plugins/vue-awesome-swiper' }
  ],
  css: [
    { src: '~/assets/style/app.styl' },
    { src: 'swiper/dist/css/swiper.css' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { //color: '#3B8070' 
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
  },
  /*
  ** Build configuration
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'bottom-right',
    duration: 5000
  },
  auth: {
    responseType: 'token id_token',
    params: {
      scope: 'profile email'
    },
    strategies: {
      auth0: {
        domain: 'machiseo2.auth0.com',
        client_id: 'w3hUEZ1Mz7p4IvmNMUeNZt33jYG0bVP7'
      },
      facebook: {
        client_id: '342175946522151',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email']
      },
      google: {
        client_id: '1538451672015'
      },
    },
    redirect: {
      login: '/?login=1',
      logout: '/',
      user: '/profile',
      callback:'/auth/callback'
    }
  },
  axios: {
    baseURL: environment.API_URL,
    
    retry: { retries: 3 }
  },
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js',
      'animate.css',
      'hover.css'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
