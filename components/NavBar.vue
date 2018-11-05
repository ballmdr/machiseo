<template>
<span>
      <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
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
    <v-toolbar light fixed app :clipped-left="clipped" color="warning">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-autocomplete
          flat
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="title"
          item-value="title"
          label="ค้นหาซีรีส์เกาหลี"
          solo
        >
        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-title>
              กรอกชื่อ <strong>ซีรีส์เกาหลี</strong> ที่ต้องการ
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template
          slot="selection"
          slot-scope="{ item, selected }"
        >
          <v-chip
            :selected="selected"
            color="blue-grey"
            class="white--text"
          >
            <v-icon left>mdi-coin</v-icon>
            <span v-text="item.title"></span>
          </v-chip>
        </template>
        <template
          slot="item"
          slot-scope="{ item, tile }"
        >
          <v-img max-width="30" style="margin:5px;border-radius:2px;" :src="baseUrl + item.field_poster[0].url"></v-img>
          <v-list-tile-content @click="$router.push(item.path.alias)">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>แนวซีรีส์​</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-tile-action>
        </template>
        </v-autocomplete>
      <v-spacer></v-spacer>
        <v-btn v-if="!$auth.loggedIn" flat color="primary" round @click="auth0">เข้าสู่ระบบ</v-btn>
        <v-menu v-else offset-y :nudge-width="100" class="pa-0">
          <v-toolbar-title slot="activator">
            <v-avatar size="40" v-if="$auth.$state.user !== null"><v-img :src="$auth.$state.user.picture"></v-img></v-avatar>
            &nbsp;<span v-text="$auth.$state.user.name"></span>
          </v-toolbar-title>
          <v-list>
            <v-list-tile>
              <v-btn flat @click="$auth.logout('auth0')">ออกจากระบบ</v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar>
</span>
</template>

<script>
import { searchSeries } from '~/assets/js/api'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menuItems: [
        { icon: 'apps', title: 'มาชิสซอ', to: '/' },
        { icon: 'bubble_chart', title: 'ซีรีส์เกาหลี', to: '/series' },
        { icon: 'search', title: 'Secretary Kim', to: '/series/what%E2%80%99s-wrong-secretary-kim'},
        { icon: 'search', title: 'While Sleeping', to: '/series/while-you-were-sleeping'},
        { icon: 'search', title: 'Suspicious Partner', to: '/series/suspicious-partner' },
        { icon: 'search', title: 'Emperor Owner Mask', to: '/series/emperor-owner-mask'},
        { icon: 'search', title: 'Moon Lovers', to: '/series/moon-lovers' }        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'มาชิสซอ',
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
      //if (this.model !== null || (typeof(this.model) !== 'undefined') ) return
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
  mounted() {
    console.log('auth', this.$auth)
    console.log('auth state', this.$auth.$state)
  },
  methods: {
    async auth0() {
      const res = await this.$auth.loginWith('auth0')
    }
  }
}
</script>
