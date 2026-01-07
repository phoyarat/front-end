<template>
  <div style="font-family: 'Prompt', sans-serif">
    <!-- Navbar (fixed) -->
    <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div class="w-full flex justify-between items-center px-10 py-4">
        <a href="#" class="flex items-center">
          <img
            :src="logo"
            alt="Logo"
            class="h-10 w-10 object-contain"
          />
          <span class="text-2x1 font-bold text-blue-700 pl-5">
            ระบบประเมินบุคลากร
          </span>
        </a>

        <!-- เมนู -->
        <ul
          class="hidden md:flex space-x-4 text-blue-900 bg-white/80 backdrop-blur-md border border-blue-200 rounded-2xl shadow-sm px-4 py-2"
        >
          <li>
            <router-link
              to="/"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
            >
              หน้าแรก
            </router-link>
          </li>

          <li>
            <router-link
              to="/form"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
            >
              แบบประเมิน
            </router-link>
          </li>

          <!-- ✅ แสดงเฉพาะ admin -->
          <li v-if="isAdmin">
            <router-link
              to="/dashboard"
              class="px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
            >
              Dashboard
            </router-link>
          </li>

          <li class="group relative">
            <a
              href="#"
              class="px-4 py-2 hover:bg-blue-200 rounded-lg font-semibold transition-colors duration-200"
            >
              ผู้ใช้
            </a>

            <ul
              class="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 rounded-lg w-48"
            >
              <li class="border-b border-gray-300 py-3 px-4 hover:bg-blue-100">
                <router-link
                  to="/evaluator"
                  class="block text-blue-900 font-medium hover:text-blue-700"
                >
                  กรรมการ
                </router-link>
              </li>

              <li class="py-3 px-4 hover:bg-blue-100">
                <router-link
                  to="/teachers"
                  class="block text-blue-900 font-medium hover:text-blue-700"
                >
                  ครูผู้ถูกประเมิน
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <!-- 🔐 ส่วนผู้ใช้ -->
        <div class="hidden md:flex items-center">

          <!-- 🔎 ถ้ายังไม่ login -->
          <template v-if="!user">
            <a
              href="/login"
              class="mr-3 px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              style="text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6)"
            >
              Sign In
            </a>

            <a
              href="/signup"
              class="px-6 py-2 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-yellow-400 hover:to-amber-300 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </a>
          </template>

          <!-- 👤 ถ้า login แล้ว -->
          <template v-else>
            <div class="flex items-center mr-4">
              <img
                :src="avatarUrl"
                class="h-10 w-10 rounded-full border mr-2"
              />
              <span class="font-semibold text-blue-900">
                {{ user.username }}
              </span>
            </div>

            <button
              @click="logout"
              class="px-6 py-2 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-amber-300 to-red-400 hover:from-red-400 hover:to-amber-300 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import logo from "../../assets/icon.jpg";
import emitter from "../../eventBus";


export default {
  name: "Mybar",

  data() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    return {
      logo,
      user: token ? user : null,
    };
  },

  computed: {
    isAdmin() {
      return this.user?.role === "admin";
    },
    avatarUrl() {
      return this.user?.avatar
        ? `http://localhost:3000/uploads/${this.user.avatar}`
        : "https://dummyimage.com/40x40/cccccc/000000.png&text=Avatar";
    },
  },

  created() {
    emitter.on("userChanged", this.onUserChanged);
    window.addEventListener("storage", this.syncUser);
  },

  beforeUnmount() {
    emitter.off("userChanged", this.onUserChanged);
    window.removeEventListener("storage", this.syncUser);
  },

  methods: {
    onUserChanged(user) {
      this.user = user;
    },

    syncUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    logout() {
      localStorage.clear();
      this.user = null;
      emitter.emit("userChanged", null);
      this.$router.push("/login");
    },
  },
};
</script>
