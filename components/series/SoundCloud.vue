<template>
    <div style="margin:auto;max-width:700px;">
        <iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" :src="soundSrc"></iframe>
    </div>
</template>

<script>
export default {
    props: ['soundCloudId'],
    data() {
        return {
            soundSrc: ''
        }
    },
    mounted() {
        this.soundSrc = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + this.soundCloudId + '&color=%237952b3&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
    }
}
</script>
