<template>
    <form @submit.prevent="submitForm">
        <input class="signup-form" v-model="username" placeholder="Username"><br/>
        <input class="signup-form"v-model="email" placeholder="Email"><br/>
        <input class="signup-form"v-model="password" placeholder="password"><br/>
        <button
          class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 
          hover:to-green-500 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Sing Up
        </button>
        <p>{{ message }}</p>
    </form>
</template>
<style scoped>
.signup-form {
  border: 2px solid #007BFF; 
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  width: 100%;
}
</style>
<script>
export default {
 data(){
    return{
        username:'',
        email:'',
        password:'',
        message:'',
    };
 },
methods:{
    async submitForm() {
        try{
            const response = await fetch('http://localhost:3000/signup',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        username:this.username,
                        email:this.email,
                        password:this.password
                    }),
                });
                const data = await response.json();
        this.message = data.message || 'Sign up successful!';
      } catch (error) {
        this.message = 'Error: ' + error.message;
        }
    },
},
};
</script>