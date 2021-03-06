import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Feed from "../views/Feed.vue"
import Profile from "../views/Profile.vue"
import List from "../views/List.vue"
// Components (Remove all when you're done prototyping)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/feed',
    name: "Feed",
    component: Feed
  },
  {
    path: '/profile/:userId',
    name: "Profile",
    component: Profile
  },
  {
    path: '/list',
    name: "List",
    component: List
  },
  
  // COMPONENT PROTOTYPING
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
