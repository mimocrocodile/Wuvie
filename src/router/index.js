import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviePage from "../views/MoviePage.vue"
import PersonalPage from "../views/PersonalPage.vue"
import ContactView from "../views/ContactView.vue"
import Search from "../views/Search.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/movie-page/:id',
    name: 'mpage',
    props: true,
    component: MoviePage
  },
  {
    path: '/personal-page/:id',
    name: 'personalpage',
    props: true,
    component: PersonalPage
  },
  {
    path: '/search/:name',
    name: 'searchPage',
    props: true,
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
