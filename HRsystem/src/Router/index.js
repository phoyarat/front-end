import { createRouter, createWebHistory } from 'vue-router';
import Main from '../view/main.vue';
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignments.vue';
import Teachers from '../view/teachers.vue';
import NotFound from '../view/notfound.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/evaluator',
    component: EvaluatorAssignments,
  },
  {
    path: '/teachers',
    component: Teachers,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
