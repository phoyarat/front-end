<template>
  <Navbar />
  <main >
    <router-view />
  </main>
</template>

<script setup>
  import Navbar from '../pages/frontend/navbar.vue'
</script>

<style scoped>
.content {
  padding-top: 64px; /* กัน navbar ทับ */
}
</style>
