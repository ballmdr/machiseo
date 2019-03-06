<template>
      <v-card
      color="red lighten-2"
      dark
    >
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="กรอกชื่อซีรีส์เกาหลี"
          solo
        >
        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-title>
              ค้นหา <strong>ซีรีส์เกาหลี</strong> ที่ต้องการ
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
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>แนวซีรีส์​</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-tile-action>
        </template>
        </v-autocomplete>
      </v-card-text>
    </v-card>
</template>

<script>
import { searchSeries } from '~/assets/js/api'

export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    baseUrl: process.env.baseUrl
  }),

  watch: {
    search (val) {
      // Items have already been loaded
      // if (this.items.length > 0) return
      if (this.model !== null || (typeof (this.model) !== 'undefined')) return
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      searchSeries(this.search)
        .then(res => {
          console.log('res', res)
          this.items = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
