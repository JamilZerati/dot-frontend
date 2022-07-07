
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CardFilms.vue') }
    ]
  },
  {
    path: '/FinishItem',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FinishItem.vue') }
    ]
  }
]

export default routes
