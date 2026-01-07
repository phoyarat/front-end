<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100" style="font-family: 'Prompt', sans-serif">
    <main class="w-fit mx-auto px-5 py-10 bg-white rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        ยินดีต้อนรับเข้าสู่ระบบประเมินบุคลากร
      </h2>

      <p class="text-gray-600">
        ระบบนี้ถูกออกแบบมาเพื่อให้ผู้บริหารและบุคลากรสามารถประเมินผลการปฏิบัติงานได้อย่างสะดวก
        สามารถกรอกแบบประเมิน<br>
        ดูรายงาน และสรุปผลคะแนนได้ในที่เดียว
      </p>

      <div class="mt-6">
        <a
          href="/profilepage"
          class="mr-3 px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          style="text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6)"
        >
          ไปหน้า Profilepage
        </a>
      </div>
    </main>
  </div>
</template>

<script>
import logo from "../assets/icon.jpg";

export default {
  name: "Main",
  data() {
    return {
      logo,
    };
  },
};
</script>
