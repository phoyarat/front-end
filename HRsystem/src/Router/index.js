import { createRouter, createWebHistory } from 'vue-router'

// layouts
import MainLayout from '../layouts/MainLayout.vue'

// public pages
import Login from '../pages/frontend/login.vue'
import Signup from '../pages/frontend/signup.vue'
import NotFound from '../view/notfound.vue'

// protected pages (ของเดิม)
import productdetail from '../pages/frontend/productdetail.vue'
import Main from '../view/main.vue'
import Dashboard from '../pages/backend/dashboard.vue'
import Teachers from '../view/teachers.vue'
import ProfilePage from '../view/profilepage.vue'
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignments.vue'
import TeachersAssignments from '../components/teacher/TeachersAssignments.vue'

const routes = [
  // 🔓 Public
  // 🔐 Protected (มี Navbar)
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/login', component: Login },
      { path: '/signup', component: Signup },
      { path: '',name: 'Home',component: () => import('../view/main.vue')},
      { path: 'dashboard',component: Dashboard,meta: {requiresAuth: true,role: 'admin'}},
      { path: 'teachers', component: Teachers },
      { path: 'profilepage', component: ProfilePage },
      { path: 'evaluator', component: EvaluatorAssignments },
      { path: 'form', component: TeachersAssignments },
      {
  path: 'products',
  name: 'Products',
  component: () => import('../pages/frontend/products.vue')
},
{
  path: 'products/:id',
  name: 'ProductDetail',
  component: () => import('../pages/frontend/productdetail.vue')
},

      {
        path: 'evaluator/assignments/:id',
        name: 'EvalutionForm',
        component: () => import('../view/teacherForm.vue'),
        props: true
      }
    ]
  },

  { path: '/:catchAll(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Auth Guard (แก้ key ให้ตรง)
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiredRole = to.meta.role

  if (requiresAuth && !user) {
    return next('/login')
  }

  if (requiredRole && user.role !== requiredRole) {
    return next('/') // ❌ ไม่ใช่ admin → กลับหน้าแรก
  }

  next()
})

export default router
