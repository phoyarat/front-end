<template>
  <div class="w-full px-10 py-10 bg-white mt-6 rounded-none shadow-none pt-24" style="font-family: 'Prompt', sans-serif;">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">รายชื่อครูผู้ถูกประเมิน</h2>


    <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow">
      <thead class="bg-blue-100">
        <tr>
          <th class="border px-4 py-2 text-left">ลำดับ</th>
          <th class="border px-4 py-2 text-left">ชื่อครู</th>
          <th class="border px-4 py-2 text-left">แผนก</th>
          <th class="border px-4 py-2 text-left">รอบประเมิน</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers" :key="teacher.id" class="hover:bg-gray-100">
          <td class="border px-4 py-2">{{ teacher.id }}</td>
          <td class="border px-4 py-2">{{ teacher.teacher }}</td>
          <td class="border px-4 py-2">{{ teacher.department }}</td>
          <td class="border px-4 py-2">{{ teacher.period }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: "Teachers",
  data() {
    return {
      teachers: [
        { id: 1, teacher: "นายพงศ์ภพ มั่นคง", department: "แผนกคอมพิวเตอร์", period: "รอบที่ 1/2568" },
        { id: 2, teacher: "นางสาวอาทิยา ตะวันนา", department: "แผนกไฟฟ้า", period: "รอบที่ 1/2568" },
        { id: 3, teacher: "นางศรารัตน์ วัฒนกิจ", department: "แผนกคอมพิวเตอร์", period: "รอบที่ 1/2568" },
      ],
    };
  },
};
</script>
