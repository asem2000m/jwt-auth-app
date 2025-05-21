import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import WelcomePage from './views/WelcomePage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ProtectedPage from './views/ProtectedPage.vue';

// Define your routes
const routes = [
  { path: '/login', component: LoginPage },
  { path: '/welcome', component: WelcomePage },
  { path: '/register', component: RegisterPage },
  { path: '/protected', component: ProtectedPage },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // use createWebHistory for history mode
  routes,
});

// Create and mount the Vue app
const app = createApp(App);
app.use(router); // use the router
app.mount('#app');

