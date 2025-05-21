<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Make the POST request using axios
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });

        // Check if the response contains the token
        if (response.data.token) {
          // Save the token in localStorage
          localStorage.setItem('token', response.data.token);
          
          // Redirect to protected page
          this.$router.push('/protected');
        } else {
          alert('Invalid credentials!');
        }
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>
