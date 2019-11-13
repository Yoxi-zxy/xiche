export default [
  //  首页
  {
    path: '/',
    component: () => import('../views/index/index.vue'),
    meta: { hidden: true },
    children: [
      //  详情
      {
        path: 'details',
        component: () => import('../views/index/details.vue'),
        meta: { hidden: false, hiddens: true },
        children: [
          //  预约
          {
            path: 'subscribe',
            component: () => import('../views/index/subscribe.vue'),
            meta: { hidden: false }
          }
        ]
      }
    ]
  },
  //  预约成功
  {
    path: '/successful',
    component: () => import('../views/index/successful.vue')
  },
  //  用户中心
  {
    path: '/user',
    component: () => import('../views/user/index.vue'),
    meta: { hidden: true },
    children: [
      //  订单详情
      {
        path: 'order',
        component: () => import('../views/user/order.vue'),
        meta: { hidden: false }
      },
    ]
  },
  //  404
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]
