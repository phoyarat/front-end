<script setup>
import { ref, onMounted } from "vue";
import MyCard from "./mycard.vue";

const items = ref([]);

onMounted(async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  items.value = await res.json();
});
</script>

<template>
  <main>
    <h1>Products</h1>

    <div class="grid-container">
      <MyCard
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image="item.image"
        :price="item.price"
      />
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

main {
  padding: 1rem;
  padding-top: 50px; 
  padding-bottom: 80px;
  min-height: 100vh;
  background: linear-gradient(to right, #4facfe, #00f2fe);

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title */
h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

/* Grid */
.grid-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* Card */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 650px;
  text-align: center;
}

</style>
