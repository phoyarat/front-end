<script setup>
import MyBar from './view/mybar.vue'
</script>

<template>
  <MyBar />
  <div class="pt-24">
    <router-view />
  </div>
  <footer></footer>
</template>

<style scoped></style>