<template>
  <div class="login-container">
    <h2 class="text-xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" placeholder="Enter username" autocomplete="username"
          required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Enter password"
          autocomplete="current-password" required />
      </div>

      <button type="submit">Login</button>
      <p>ยังไม่มีบัญชี? <router-link to="/signup">สมัครสมาชิกที่นี่</router-link></p>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import emitter from '../../eventBus'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async login() {
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })

        const data = await res.json()
        console.log("Response:", data)

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("role", data.user.role)

          emitter.emit("userChanged", data.user)

          // ✅ ใช้ router ที่ inject มา
          if (data.user.role === "admin") {
            this.router.push("/dashboard")
          } else {
            this.router.push("/")
          }
        } else {
          alert(data.error || "Login failed")
        }
      } catch (err) {
        console.error(err)
        alert("Server error")
      }
    }
  }
}
</script>



<style scoped>
.login-container {
  max-width: 400px;
  width: 100%;            
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;      
}



.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #d1d5db; /* เทาอ่อน */
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: #6366f1;   /* สีตอนโฟกัส */
  box-shadow: 0 0 0 1px #6366f1;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0a56ae;
}
p {
  margin-top: 10px;
   
}
</style>