<template>
 <span>
       <v-navigation-drawer
       :mini-variant.sync="miniVariant"
       v-model="drawer"
       fixed
       app
     >
       <v-list>
         <v-list-tile
           router
           :to="item.to"
           :key="i"
           v-for="(item, i) in menuItems"
           exact
         >
           <v-list-tile-action>
             <v-icon v-html="item.icon"></v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title v-text="item.title"></v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>
     </v-navigation-drawer>
     <v-toolbar dense fixed app color="primary">
       <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
       <v-btn
         icon
         @click.stop="miniVariant = !miniVariant"
       >
         <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
       </v-btn>
       <v-toolbar-title>{{ title }}</v-toolbar-title>
       <v-spacer></v-spacer><v-icon>fas fa-flask</v-icon> <small>อยู่ในระหว่างทดลองระบบ</small>
     </v-toolbar>
 </span>
 </template>

<script>
import { searchSeries } from '~/assets/js/api'

export default {
  data () {
    return {
      drawer: false,
      menuItems: [
        { icon: 'fas fa-home', title: 'หน้าแรก', to: '/' },
        { icon: 'fas fa-film', title: 'ซีรีส์เกาหลี', to: '/series' },
        { icon: 'fas fa-book-reader', title: 'สปอยด์รายตอน', to: '/episodes' },
        { icon: 'fas fa-scroll', title: 'ผลโหวตซีรีส์ปี 2018', to: '/vote/2018-result' }
      ],
      miniVariant: true,
      title: 'มาชิสซอ Machiseo.com',
      isLoading: false,
      items: [],
      model: null,
      search: null,
      baseUrl: process.env.baseUrl
    }
  },
  watch: {
    model () {
      if (typeof (this.model) === 'undefined') {
        this.items = []
      }
    },
    search (val) {
      // Items have already been loaded
      if (this.items.length > 0) return
      // if (this.model !== null || (typeof(this.model) !== 'undefined') ) return
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      searchSeries(this.search)
        .then(res => {
          this.items = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout('auth0')
    },
    async auth0 () {
      await this.$auth.loginWith('auth0')
    }
  }
}
</script>
