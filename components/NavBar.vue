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
          v-for="(item, i) in items"
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
    <v-toolbar light fixed app :clipped-left="clipped" color="white">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
</span>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
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
      title: 'มาชิสซอ maChiseo.com'
    }
  }
}
</script>
