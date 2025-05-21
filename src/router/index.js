// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue'; // Register page import
import WelcomePage from './views/WelcomePage.vue';
import ProtectedPage from './views/ProtectedPage.vue';

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage }, // Ensure this is included
  { path: "/protected", component: ProtectedPage },
  { path: "/welcome", component: WelcomePage },
];

const router = new VueRouter({
  routes,
});

export default router;

