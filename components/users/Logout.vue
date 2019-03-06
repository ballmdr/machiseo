<template>
    <div><v-btn @click="logout()">Logout</v-btn></div>
</template>

<script>
export default {
    methods: {
        logout () {
            localStorage.setItem("ori_url", window.location.pathname)
            this.$auth.logout()
        }
    }
}
</script>
