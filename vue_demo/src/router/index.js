import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home.vue'),
      children: [
        {
          path: '/home-data',
          name: '数据视觉',
          component: () => import('@/pages/home-data/home-data.vue')
        },
        {
          path: '/comm-data',
          name: '商品数据',
          component: () => import('@/pages/comm-data/index.vue')
        },
        {
          path: '/user-comm',
          name: '用户管理',
          component: () => import('@/pages/user-comm/index.vue')
        },
        {
          path: '/kehu-manage',
          name: '客户管理',
          component: () => import('@/pages/kehu-manage/index.vue')
        },
        {
          path: '/store-manage',
          name: '门店管理',
          component: () => import('@/pages/store-manage/index.vue')
        },
        {
          path: '/driver-manage',
          name: '司机管理',
          component: () => import('@/pages/driver-manage/index.vue')
        },
        {
          path: '/order-manage',
          name: '订单管理',
          component: () => import('@/pages/order-manage/index.vue')
        },
        {
          path: '/comm-classify-manage',
          name: '商品分类管理',
          component: () => import('@/pages/comm-classify-manage/index.vue')
        },
        {
          path: '/comm-detail-pic',
          name: '商品详情图管理',
          component: () => import('@/pages/comm-detail-pic/index.vue')
        },
        {
          path: '/hot-comm',
          name: '热门位商品管理',
          component: () => import('@/pages/hot-comm/index.vue')
        },
        {
          path: '/home-pic-manage',
          name: '首页轮播图管理',
          component: () => import('@/pages/home-pic-manage/index.vue')
        },
        {
          path: '/user-data',
          name: '个人信息',
          component: () => import('@/pages/user-data/index.vue')
        }
      ]
    }
  ]
})
