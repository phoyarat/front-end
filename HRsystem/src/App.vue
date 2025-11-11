<script setup>
import mybar from "./view/mybar.vue"
import MainContent from "./view/main.vue"
import evaluationform from "./view/evaluationform.vue";

// import signup from "./pages/signup.vue"
</script>
<template>
  <mybar />
  <router-view />
  <footer></footer>
</template>

<script>
export default {
  name: 'App',
  components: {
    mybar
  },
};
</script>
|
<style scoped></style>