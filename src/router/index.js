import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/film/:id',
    name: 'film',
    props: castIdRouteParamForFilmComponent,
    component: () => import(/* webpackChunkName: "film" */ '../views/Film.vue')
  },
]

function castIdRouteParamForFilmComponent(route) {
  return {
    id: Number(route.params.id),
  };
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
