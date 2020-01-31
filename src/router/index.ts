import Vue from 'vue'
import VueRouter, {Route, RouteConfig, RouterOptions} from 'vue-router'
import Home from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/film/:id',
    name: 'FilmView',
    props: castIdRouteParamForFilmComponent, // id кастится к целочисленному,
    // т.к. это требуется компонентом.
    component: () => import('@/views/FilmView.vue')
  },
]

// Приводит параметр к целочисленному виду.
function castIdRouteParamForFilmComponent(route: Route) {
  return {
    id: Number(route.params.id),
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
} as RouterOptions)

export default router
