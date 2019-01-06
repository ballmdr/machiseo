<template>
<div class="container animated slideInDown">
  <v-card color="primary" class="card u-clearfix hvr-grow-shadow"
      style="cursor:pointer;width:350px;"
      @click.native="$router.push(serie.path.alias)">
    <v-card-text class="card-media">
      <v-img :src="baseUrl + serie.field_poster[0].url" class="card-media-img"></v-img>
    </v-card-text>
    <v-card-title style="height:150px">
      <nuxt-link :to="serie.path.alias"><strong>{{ serie.title }}</strong></nuxt-link>
      <div><span v-for="type in serie.field_series_type" :key="type.id">{{ type.name }}&nbsp;</span></div>
    </v-card-title>
    <v-card-actions v-if="serie.field_episode_series.length !== 0"><v-spacer></v-spacer><v-icon color="warning">fas fa-book-reader</v-icon>&nbsp;มีสปอยด์</v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  props: ['serie'],
  data: () => ({
    baseUrl: process.env.baseUrl,
    poster: ''
  })
}
</script>

<style scoped>

.u-float-right {
  float: right;
}

.u-clearfix:before,
.u-clearfix:after {
  content: " ";
  display: table;
}

.u-clearfix:after {
  clear: both;
}

.u-clearfix {
  *zoom: 1;
}

.u-flex-center {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}

.container {
  margin: 25px auto;
  width: 100%;
}


.card-media {
  float: left;
  padding: 0 0 25px 25px;
  position: relative;
  width: 145px;
}

.card-media-img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
  float: left;
  margin-top: -25px;
  position: relative;
  width: 100%;
}

.card-media-preview {
  background-color: #00AEA2;
  border-radius: 50%;
  bottom: 11px;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  cursor: pointer;
  height: 30px;
  opacity: 0;
  position: absolute;
  left: 70px;
  transform: translateY(5px);
  transition: all 300ms ease-out;
  width: 30px;
  z-index: 3;
}


.card-body {
  float: left;
  padding: 25px 25px 25px 20px;
  width: 415px;
}

</style>