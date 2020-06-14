import Vue from 'vue'
import VueRouter from 'vue-router'
import StorySlider from '@/components/stories_components/story_listing/StorySlider'
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
    name: 'stories',
    component: () => import('@/views/stories_views/StoryView.vue'),
    props: true,
  },
  {
    path: '/slide',
    component: () => import('@/views/global_views/SlideView.vue'),
    name: 'stories-slide',
  },
  {
    path: '/filmslide',
    component: () => import('@/components/kinoinfo_components/film_listing/FilmSlider.vue'),
    props: {defaultapiaction: 'getval'},
    name: 'film-slide',
  },
  {
    path: '/storyslide/',
    component: StorySlider,
    props: {defaultapiaction: 'getval'},
  },
  {
    path: '/filmslide/popular',
    component: () => import('@/components/kinoinfo_components/film_listing/FilmSlider.vue'),
    props: {defaultapiaction: 'getval', defaultordering: '-imdb_rate'},
    root: true,
  },
  {
    path: '/filmslide/new',
    component: () => import('@/components/kinoinfo_components/film_listing/FilmSlider.vue'),
    props: {defaultapiaction: 'getval', defaultordering: '-year'},
    root: true,
  },


]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
