<template>
    <div class="container">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-if="error.statusCode === 500">error 500</h1>
      <h1 v-else>เกิดข้อผิดพลาด</h1>
      <nuxt-link to="/">ไปหน้าแรก</nuxt-link>
      <nuxt-link to="/series">หน้ารวมซีรีส์</nuxt-link>
      <nuxt-link to="/episodes">สปอยล์ล่าสุด รวมทุกเรื่อง</nuxt-link>
    </div>
  </template>

  <script>
  export default {
    props: ['error'],
    layout: 'default' // you can set a custom layout for the error page
  }
  </script>
