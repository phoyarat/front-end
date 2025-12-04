import { createRouter, createWebHistory } from 'vue-router'
import Main from '../view/main.vue'
import EvaluatorAssignments from '../components/evaluator/evaluatorAssignments.vue'
import NotFound from '../view/notfound.vue'
import Teachers from '../view/teachers.vue'
import TeachersAssignments from '../components/teacher/TeachersAssignments.vue'
import profilepage from '../pages/profilepage.vue'

const routes = [
  
  { path: '/', component: Main },
  { path: '/evaluator', component: EvaluatorAssignments },
  { path: '/evaluator/assignments/:id', name: 'EvalutionForm', component: () => import('../view/teacherForm.vue') ,props: true},
  { path: '/teachers', component: Teachers },
  { path: '/form', component: TeachersAssignments },
  { path: '/profilepage', component: profilepage },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },
  
]

export default createRouter({
  history: createWebHistory(),
  routes,
})