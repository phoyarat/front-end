<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6" elevation="12" width="400">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          dense
          required
        ></v-text-field>

                <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          required
        ></v-text-field>
        
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
          required
        ></v-text-field>



        <v-btn type="submit" color="primary" class="mt-4" block>
          Sign Up
        </v-btn>

        <v-alert
          v-if="message"
          type="info"
          class="mt-4"
          dense
          border="left"
        >
          {{ message }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        const result = await response.json();
        this.message = result.message;
      } catch (error) {
        this.message = 'Error: ' + error.message;
      }
    },
  },
};
</script>
