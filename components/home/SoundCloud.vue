<template>
    <div style="margin:auto;max-width:700px;">
        <iframe width="80%" height="360" scrolling="no" frameborder="no" allow="autoplay" :src="soundSrc"></iframe>
    </div>
</template>

<script>
export default {
  props: ['soundCloudId'],
  data () {
    return {
      soundSrc: ''
    }
  },
  mounted () {
    this.soundSrc = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + this.soundCloudId + '&color=%237952b3&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true'
  }
}
</script>
