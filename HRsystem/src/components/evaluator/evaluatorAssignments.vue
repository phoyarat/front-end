<template>
  <div
    class="flex flex-col"
    style="font-family: 'Prompt', sans-serif; margin-top: 75px"
  >
    <main class="flex-1 p-6 overflow-auto bg-blue-50">
      <h2 class="text-3xl font-bold mb-6 text-center text-blue-900">
        รายการครูผู้สอนในแต่ละภาคเรียน
      </h2>

      <div class="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          v-model="selectedPeriod"
          class="border border-blue-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">รวมทุกภาคเรียน</option>
          <option v-for="p in periods" :key="p">{{ p }}</option>
        </select>

        <select
          v-model="selectedDept"
          class="border border-blue-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">ทุกภาควิชา</option>
          <option v-for="d in departments" :key="d">{{ d }}</option>
        </select>

        <input
          v-model="search"
          type="text"
          placeholder="🔍 ค้นหาครูผู้สอน..."
          class="border border-blue-300 rounded-lg px-4 py-2 w-64 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        style="padding: 0px 50px 30px 50px"
      >
        <div
          v-for="a in filteredAssignments"
          :key="a.id"
          class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between h-full w-full border-t-4 border-blue-400"
        >
          <div>
            <h3 class="text-lg font-semibold text-blue-900 mb-1">
              {{ a.teacher }}
            </h3>
            <p class="text-blue-700 text-sm mb-2">{{ a.department }}</p>
            <span
              class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md"
              >{{ a.period }}</span
            >
          </div>

          <div class="my-4 flex justify-center">
            <router-link
              :to="`/evaluator/assignments/${a.id}`"
              class="px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              เริ่มประเมิน
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <footer class="text-center py-4 text-sm">
      © 2025 วิทยาลัยเทคโนโลยีลพบุรี - ระบบบริหารบุคลากร
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

// state
const assignments = ref([])
const selectedPeriod = ref("")
const selectedDept = ref("")
const search = ref("")

// เรียก REST API
onMounted(async () => {
  const res = await fetch("https://dummyjson.com/users?limit=12")
  const data = await res.json()

  assignments.value = data.users.map(u => ({
    id: u.id,
    teacher: `${u.firstName} ${u.lastName}`,
    department: u.company?.department || "ไม่ระบุ",
    period: u.id % 2 === 0 ? "รอบที่ 1/2568" : "รอบที่ 2/2568"
  }))
})

// ภาควิชาไม่ซ้ำ
const departments = computed(() => {
  return [...new Set(assignments.value.map(a => a.department))]
})

// filter (ชื่อเดียวกับ template!)
const filteredAssignments = computed(() => {
  return assignments.value.filter(a => {
    return (
      (!selectedPeriod.value || a.period === selectedPeriod.value) &&
      (!selectedDept.value || a.department === selectedDept.value) &&
      (!search.value ||
        a.teacher.toLowerCase().includes(search.value.toLowerCase()))
    )
  })
})
</script>


