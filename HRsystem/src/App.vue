<script setup>
import MyBar from './view/mybar.vue'
import Backend from './view/signup.vue'
</script>

<template>
  <MyBar />
    <router-view />
    <Backend />
 
</template>

<style scoped></style>