import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviePage from "../views/MoviePage.vue"
import PersonalPage from "../views/PersonalPage.vue"
import Search from "../views/Search.vue"
import Trailer from "../views/Trailers.vue"
// import ActorsPage from "../views/ActorsPage.vue"
import Actor from "../views/Actor.vue"
import Movie from "../views/Movie.vue"
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

  // {
  //   path: '/contact',
  //   name: 'contact',
  //   component: ContactView
  // },
  // {
  //   path: '/movie-page/:id',
  //   name: 'mpage',
  //   props: true,
  //   component: MoviePage
  // },
  // {
  //   path: '/personal-page/:id',
  //   name: 'personalpage',
  //   props: true,
  //   component: PersonalPage
  // },
  {
    path: '/search/:name',
    name: 'searchPage',
    props: true,
    component: Search
  },
  {
    path:'/trailers/:ginfo',
    name: 'TrailerPage',
    props: true,
    component: Trailer
  },
  {
    path: '/actors',
    name: 'ActorsPage',
    props: true,
    component: () => import(/* webpackChunkName: "ActorsPage" */ '../views/ActorsPage.vue')
    // component: ActorsPage
  },
  {
    path: '/actor/:id',
    name: 'ActorPage',
    props: true,
    component: Actor
  },
  {
    path: '/movie/:id',
    name: 'MoviePage',
    props: true,
    component: Movie,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
