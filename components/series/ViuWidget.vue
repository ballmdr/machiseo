<template>
  <iframe 
  :src="'https://www.viu.com/ott/misc/widget/index.php?product_id=' + vid_id + '&event=th30&utm_source=machiseo&utm_campaign=widget&utm_medium=vdowidget&utm_content=' + serie_title" 
  width="70%" style="max-width:600px" height="400" frameborder="0" allowfullscreen="true" scrolling="no" 
  ><p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
export default {
  props: ['vid_id', 'serie_title']
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  iframe {
    height:200px;
  }
} 
</style>
