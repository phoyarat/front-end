import { createRouter, createWebHistory } from 'vue-router'
import Main from '../view/main.vue'
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignments.vue'
import NotFound from '../view/notfound.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/evaluator', component: EvaluatorAssignments },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})