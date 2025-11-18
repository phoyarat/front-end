<template>
  <div class="min-h-screen flex flex-col items-center justify-center  text-center px-4">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-lg text-gray-600 mb-6">
      The page you're looking for doesn't exist.
    </p>
    <button
  @click="goHome"
  style="padding: 0.5rem 1.5rem; background-color: #2563eb; color: white; border-radius: 0.5rem; transition: background-color 0.3s;"
  @mouseover="hover = true"
  @mouseleave="hover = false"
>
  Go to Home
</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
