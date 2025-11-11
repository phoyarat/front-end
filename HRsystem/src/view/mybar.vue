<template>
  <div style="font-family: 'Prompt', sans-serif">
    <!-- Navbar (fixed) -->
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div class="w-full flex justify-between items-center px-10 py-4">
        <a href="#" class="flex items-center space-x-3">
          <img src="../assets/icon.jpg" alt="Logo" class="h-10 w-10 object-contain" />
          <span class="text-2x1 font-bold text-blue-700">ระบบประเมินบุคลากร</span>
        </a>
        <!-- เมนู -->
        <ul
          class="hidden md:flex space-x-4 text-blue-900 bg-white/80 backdrop-blur-md border border-blue-200 rounded-2xl shadow-sm px-4 py-2">
          <li>
            <router-link to="/"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
              หน้าแรก

            </router-link>
          </li>
          <li>
            <router-link to="/form"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
              แบบประเมิน
            </router-link>
          </li>
          <li>
            <router-link to="/evaluator"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
              กรรมการ
            </router-link>
          </li>
          <li>
            <router-link to="/users"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
              ผู้ใช้
            </router-link>
          </li>
        </ul>
        <!-- ปุ่ม Sign In Sign Up -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Sign In -->
          <a href="#"
            class="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style="text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6)">
            Sign In</a>
          <!-- Sign Up -->
          <a href="#"
            class="px-6 py-2.5 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-yellow-400 hover:to-amber-300 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Sign Up</a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import logo from "../assets/icon.jpg";
export default {
  name: "mybar",
  data() {
    return logo;
  },
};
</script>