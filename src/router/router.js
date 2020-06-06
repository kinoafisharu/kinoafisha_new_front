import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// Router takes one component defined in views to display the path page
// Роутер берет по компоненту из views для отображения его при соответствующем GET запросе
// Компоненты в папке views выступают в роли главных окон, путь к ним указан в маршрутах
// <router-link-to> принимает значение name определенного пути
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home.vue")

  },
  {
    path: '/films',
    name: 'films',
    component: () => import("@/views/kinoinfo_views/FilmListView.vue")
  },
  {
    path: '/films/:id',
    name: 'filmdetail',
    component: () => import("@/views/kinoinfo_views/FilmDetailView.vue"),
    props: true,
  },
  {
    path: '/stories/:id',
    name: 'story',
    component: () => import('@/views/stories_views/StoryView.vue'),
    props: true,
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
