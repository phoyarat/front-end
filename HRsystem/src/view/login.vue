<template>
  <div class="min-h-full flex items-center justify-center  py-16 pb-8">
    <div class="w-full max-w-md bg-white px-10 mt-10 py-2 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">
        Login
      </h2>

      <form @submit.prevent="login">
        <!-- Username -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full border rounded-lg px-2 px-2"
            placeholder="Enter username"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full border rounded-lg px-2 px-2"
            placeholder="Enter password"
            required
          />
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm mb-3">
          {{ error }}
        </p>

        <!-- Button -->
        <button
          type="submit"
          class="px-3 py-1 rounded- font-medium text-white bg-gradient-to-r from-green-400 to-green-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      error: ""
    };
  },

  methods: {
    async login() {
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.form)
        });

        const data = await res.json();

        if (!res.ok) {
          this.error = data.message || "Login failed";
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("username", data.user.username);

        alert("Login success!");
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = "Cannot connect to server";
        console.error(err);
      }
    }
  }
};
</script>
