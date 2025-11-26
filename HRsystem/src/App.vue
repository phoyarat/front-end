<script setup>
import MyBar from './view/mybar.vue'
import Backend from './view/signup.vue'
import profilepage from './pages/profilepage.vue'
</script>

<template>
  <MyBar />
    <router-view />
    <Backend />
    <!-- <profilepage /> -->
</template>

<style scoped></style>