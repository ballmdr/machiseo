<template>
  <span>
    <div style="font-size:26px;">ดูซับไทยที่</div>
    <a :href="link" target="_blank" rel="nofollow">
      <img style="max-width:170px;margin-top:-20px;margin-left:30px;" :src="baseUrl + '/sites/default/files/viu_logo_new.png'" />
    </a>
  </span>
</template>

<script>
export default {
  props: ['link'],
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  }
}
</script>
