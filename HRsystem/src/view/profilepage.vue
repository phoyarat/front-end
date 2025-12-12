<template>
  <div class=" mx-5 px-5  py-5  bg-white rounded-xl" 
    style="margin-top:70px ; ">
    <div class="flex items-center space-x-4 mb-6 ">
      <div class="w-20 h-20 mr-5 rounded-2xl border-2 border-gray-300 overflow-hidden shadow-md">
        <img :src="getAvatar(user.avatar)" alt="Avatar" />
      </div>
      <div>
        <h1 class="text-2xl font-bold">{{ user.name }}</h1>
        <p class="text-gray-500 capitalize text-left pl-3">{{ user.role }}</p>
      </div>
    </div>

    <div class="mb-6 flex gap-2">
      <input
        v-model="newTaskTitle"
        placeholder="Add new task"
        class="flex-1 border rounded px-2"
      />
      <button
        @click="addTask"
        class="px-6 py-2 rounded- font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Add
      </button>
    </div>

    <h2 class="text-2xl font-semibold mb-2 text-left">
      งานที่มาใหม่
    </h2>
    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between border-b py-2"
      >
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTaskStatus(task)"
          />
          <span
            :class="{ 'line-through text-gray-400': task.completed }"
          >
            {{ task.title }}
          </span>
        </div>
        <button
          @click="deleteTask(task.id)"
          class="px-3 py-1 rounded- font-medium text-white bg-gradient-to-r from-red-400 to-red-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'โพธิ์ยราช คำนันทร์',
        role: 'เจ้าหน้าที่',
        avatar: 'Screenshot 2025-07-04 182616.png',
      },
      newTaskTitle: '',
      tasks: [
        { id: 1, title: 'ทำรายงานสรุปประจำเดือน', completed: false },
        { id: 2, title: 'เตรียมนำเสนอแผนงาน', completed: false },
        { id: 3, title: 'ส่งแบบฟอร์มประเมิน', completed: false },
        { id: 4, title: 'เป้าหมายที่ 1 (เช่น เรียนจบหลักสูตร)', completed: false },
        { id: 5, title: 'เป้าหมายที่ 2 (เช่น ออมเงินให้ได้ตามเป้า)', completed: false },
        { id: 6, title: 'เป้าหมายที่ 3 (เช่น อ่านหนังสือให้ครบ 12 เล่ม)', completed: false },
      ],
    };
  },
  methods: {
    getAvatar(filename) {
      // ถ้า filename ว่างหรือ null ให้ return ''
      return filename ? `/uploads/${filename}` : '';
    },
    addTask() {
      if (this.newTaskTitle.trim() === '') return;

      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false,
      });

      this.newTaskTitle = '';
    },
    updateTaskStatus(task) {
      // อัปเดตสถานะงาน (ในตัวอย่างยังไม่เชื่อม backend)
      console.log(`Task ${task.id} status: ${task.completed}`);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    },
  },
};
</script>