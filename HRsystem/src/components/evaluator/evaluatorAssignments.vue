<template>
  <div class="h-dvh w-full  flex flex-col mt-15" style="font-family: 'Prompt', sans-serif;">
    <main class="flex-1 p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        รายการครูผู้สอนในแต่ละภาคเรียน
      </h2>
      <div class="flex flex-wrap gap-4 mb-8 justify-center">
        <select v-model="selectedPeriod" class="border rounded-lg px-4 py-2 shadow-sm">
          <option value="">รวมทุกภาคเรียน</option>
          <option v-for="p in periods" :key="p">{{ p }}</option>
        </select>

        <select v-model="selectedDept" class="border rounded-lg px-4 py-2 shadow-sm">
          <option value="">ทุกภาควิชา</option>
          <option v-for="d in departments" :key="d">{{ d }}</option>
        </select>

        <input
          v-model="search"
          type="text"
          placeholder="🔍 ค้นหาครูผู้สอน..."
          class="border rounded-lg px-4 py-2 w-64 shadow-sm"
        />
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="a in filteredAssignments" :key="a.id"
          class="bg-blue-100 rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ a.teacher }}</h3>
          <p class="text-gray-500 text-sm mb-2">{{ a.department }}</p>
          <span class="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-md">
            {{ a.period }}
          </span>

          <div class="mt-4 flex justify-end">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition">
              จัดการข้อมูล
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white text-center py-4 text-gray-500 text-sm mt-8">
      © 2025 วิทยาลัยเทคโนโลยีลพบุรี - ระบบบริหารบุคลากร
    </footer>
  </div>
</template>

<script>
import data from '../../resource/assignments.json';

export default {
  data() {
    return {
      assignments: data,
      selectedPeriod: '',
      selectedDept: '',
      search: '',
      periods: ['ภาคเรียนที่ 1/2568', 'ภาคเรียนที่ 2/2568'],
      departments: ['แผนกคอมพิวเตอร์', 'แผนกไฟฟ้า', 'แผนกอิเล็กทรอนิกส์'],
    };
  },
  computed: {
    filteredAssignments() {
      return this.assignments.filter(a => {
        return (
          (!this.selectedPeriod || a.period === this.selectedPeriod) &&
          (!this.selectedDept || a.department === this.selectedDept) &&
          (!this.search || a.teacher.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap');
</style>
