<template>
  <div>
    <h1>Welcome to the Protected Page!</h1>
    <p>This page is only visible to authenticated users.</p>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios

export default {
  name: "ProtectedPage",
  async created() {
    // When the page is created, check for a valid JWT token
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      // If there's no token, redirect to the login page
      this.$router.push('/login');
      return;
    }

    try {
      // Make a request to the protected route to check if the token is valid
      const response = await axios.get('http://localhost:3000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // If the request is successful, it means the token is valid
      console.log('Protected content:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);

      // If the token is invalid or expired, redirect to login
      if (error.response && error.response.status === 401) {
        this.$router.push('/login'); // Redirect to login page
      } else {
        alert('Something went wrong! Please try again later.');
      }
    }
  }
};
</script>
