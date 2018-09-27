import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  
  providers: {
    facebook: {
      clientId: '342175946522151',
      redirectUri: 'http://localhost:3000/example/reviews',
    }
  }
})