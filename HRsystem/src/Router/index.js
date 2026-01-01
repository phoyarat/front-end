import { createRouter, createWebHistory } from 'vue-router'

import Main from '../view/main.vue'
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignments.vue'
import NotFound from '../view/notfound.vue'
import Teachers from '../view/teachers.vue'
import TeachersAssignments from '../components/teacher/TeachersAssignments.vue'
import profilepage from '../view/profilepage.vue'
import dashboard from '../view/dashboard.vue'
import signup from '../view/signup.vue'
import Login from "../view/login.vue";

const routes = [
  { path: '/', component: Main },
  { path: '/evaluator', component: EvaluatorAssignments },
  { path: '/evaluator/assignments/:id', name: 'EvalutionForm', component: () => import('../view/teacherForm.vue'), props: true },
  { path: '/teachers', component: Teachers },
  { path: '/form', component: TeachersAssignments },
  { path: '/profilepage', component: profilepage },
  { path: '/dashboard', component: dashboard, meta: { requiresAuth: true } },
  { path: '/signup', component: signup },
  { path: '/login', component: Login }, // 👈 ใช้ตัวเล็ก
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 Auth Guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
