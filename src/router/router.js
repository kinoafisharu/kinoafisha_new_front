import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// Router takes one component defined in views to display the path page
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home.vue")

  },
  {
    path: '/films',
    name: 'films',
    component: () => import("@/views/FilmListView.vue")
  },
  {
    path: '/films/:id',
    name: 'filmdetail',
    component: () => import("@/views/FilmDetailView.vue"),
    props: true,
  },
  {
    path: '/stories/',
    name: 'story',
    component: () => import('@/views/stories_views/StoryView.vue'),
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
