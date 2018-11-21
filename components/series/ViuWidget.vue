<template>
  <div style="margin:auto;max-width:600px;">
    <iframe :src="widgetSrc" frameborder="0" width="80%" height="300"></iframe>
  </div>
</template>

<script>
export default {
  props: ['vid_id', 'serie_title'],
  data () {
    return {
      widgetSrc: '',
      widget: ''
    }
  },
  mounted () {
    this.widgetSrc = 'https://www.viu.com/ott/misc/widget/index.php?product_id=' + this.vid_id + '&event=th30&utm_source=machiseo&utm_campaign=widget&utm_medium=vdowidget&utm_content=' + this.serie_title
  }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  iframe {
    height:220px;
  }
} 
</style>
