export default [
  {
    path: '/',
    component: () => import('../views/news_center/index.vue'),
    meta: { title: '新闻公告' }
  },
  //  登录页
  {
    path: '/login',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  登录
        path: 'index',
        name: 'login',
        component: () => import('../views/log_in/index.vue'),
        meta: { isToken: false }
      },
      {
        //  完善信息
        path: 'info',
        component: () => import('../views/log_in/info.vue'),
        meta: { isToken: false }
      },
      {
        //  注册
        path: 'register',
        component: () => import('../views/log_in/register.vue'),
        meta: { isToken: false }
      },
      {
        //  忘记密码
        path: 'retrieve',
        component: () => import('../views/log_in/retrieve.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  用户中心
  {
    path: '/user',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  用户中心
        path: 'index',
        component: () => import('../views/user_center/index.vue'),
        meta: { isToken: true }
      },
      {
        //  修改绑定手机
        path: 'editPhone',
        component: () => import('../views/user_center/editPhone.vue'),
        meta: { isToken: true }
      },
      {
        //  修改密码
        path: 'editPassword',
        component: () => import('../views/user_center/editPassword.vue'),
        meta: { isToken: true }
      },
      {
        //  我的个人办事/预约
        path: 'personal',
        component: () => import('../views/user_center/personal.vue'),
        meta: { isToken: true }
      },
      {
        //  查看审核状态
        path: 'curStatus',
        component: () => import('../views/user_center/currentStatus.vue'),
        meta: { isToken: true }
      },
      {
        //  我的培训
        path: 'training',
        component: () => import('../views/user_center/training.vue'),
        meta: { isToken: true }
      },
      {
        //  用户中心-我要创业
        path: 'business',
        component: () => import('../views/user_center/business/business.vue'),
        meta: { isToken: true, hidden: true },
        children: [
          {
            //  用户中心-我要创业-详情
            path: 'details',
            component: () => import('../views/user_center/business/details.vue'),
            meta: { isToken: true }
          }
        ]
      }
    ]
  },
  //  新闻中心
  {
    path: '/news',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  列表页
        path: 'index',
        component: () => import('../views/news_center/index.vue'),
        meta: { isToken: false, keepAlive: true, title: '新闻公告' }
      },
      {
        //  详情页
        path: 'item/:id',
        component: () => import('../views/news_center/item.vue'),
        meta: { isToken: false }
      },
      {
        //  搜索页
        path: 'search',
        component: () => import('../views/news_center/search.vue'),
        meta: { isToken: false, keepAlive: true }
      }
    ]
  },
  //  就业政策
  {
    path: '/policy',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  列表页
        path: 'index',
        component: () => import('../views/employment_policy/index.vue'),
        meta: { isToken: false, keepAlive: true, title: '政策&指南&清单' }
      },
      {
        //  详情页
        path: 'item/:id',
        component: () => import('../views/employment_policy/item.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  问题回答
  {
    path: '/answer',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  列表页
        path: 'index',
        component: () => import('../views/problem_solving/index.vue'),
        meta: { isToken: false, keepAlive: true, title: '问题回答' }
      },
      {
        //  详情页
        path: 'item/:id',
        component: () => import('../views/problem_solving/item.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  我要招聘
  {
    path: '/hr',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  添加状态
        path: 'addInfo',
        component: () => import('../views/my_recruitment/addInfo.vue'),
        meta: { isToken: true }
      },
      {
        //  状态页
        path: 'statusPage',
        component: () => import('../views/my_recruitment/statusQuery.vue'),
        meta: { isToken: true }
      },
      {
        //  职位列表页
        path: 'myRelease',
        component: () => import('../views/my_recruitment/myRelease.vue'),
        meta: { isToken: true, keepAlive: true, title: '我要招聘' }
      },
      {
        //  职位详情
        path: 'jobDetails',
        component: () => import('../views/my_recruitment/jobDetails.vue'),
        meta: { isToken: true }
      },
      {
        //  新增/修改职位
        path: 'editJob',
        component: () => import('../views/my_recruitment/editJob.vue'),
        meta: { isToken: true }
      }
    ]
  },
  //  我要求职
  {
    path: '/job',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  选择县内县外页
        path: 'select',
        component: () => import('../views/job_hunting/selectPage.vue'),
        meta: { isToken: false, title: '我要求职' }
      },
      {
        //  查看所有职位
        path: 'index',
        component: () => import('../views/job_hunting/index.vue'),
        meta: { isToken: false, title: '我要求职' }
      },
      {
        //  编辑查询意向
        path: 'intent',
        component: () => import('../views/job_hunting/editIntent.vue'),
        meta: { isToken: true, title: '我要求职' }
      },
      {
        //  职位详情
        path: 'item',
        component: () => import('../views/job_hunting/jobDetails.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  我要培训
  {
    path: '/train',
    component: () => import('../views/layout.vue'),
    children: [
      //  培训列表
      {
        path: 'index',
        component: () => import('../views/training/index.vue'),
        meta: { isToken: false, title: '我要培训' }
      },
      //  培训详情
      {
        path: 'item',
        component: () => import('../views/training/item.vue'),
        meta: { isToken: false }
      },
      //  提出培训需求
      {
        path: 'add',
        component: () => import('../views/training/add.vue'),
        meta: { isToken: true }
      }
    ]
  },
  //  办事大厅
  {
    path: '/hall',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  首页-选择科室
        path: 'index',
        component: () => import('../views/service_center/index.vue'),
        meta: { isToken: false, title: '办事大厅' }
      },
      {
        //  办事流程
        path: 'process',
        component: () => import('../views/service_center/process.vue'),
        meta: { isToken: false }
      },
      {
        //  预约办事
        path: 'addOdds',
        component: () => import('../views/service_center/addOdds.vue'),
        meta: { isToken: true }
      },
      {
        //  编辑审核信息
        path: 'editInfo',
        component: () => import('../views/service_center/editInfo.vue'),
        meta: { isToken: true }
      },
      {
        //  预约成功
        path: 'subscribe',
        component: () => import('../views/service_center/subscribe.vue'),
        meta: { isToken: true }
      },
      {
        //  审核状态
        path: 'auditState',
        component: () => import('../views/service_center/auditState.vue'),
        meta: { isToken: true }
      }
    ]
  },
  //  就业服务网点
  {
    path: '/net',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/service_outlet/index.vue'),
        meta: { isToken: false, title: '就业服务网点' }
      }
    ]
  },
  //  培训机构
  {
    path: '/agency',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/training_institution/index.vue'),
        meta: { isToken: false, title: '培训机构' }
      },
      {
        path: 'item',
        component: () => import('../views/training_institution/item.vue'),
        meta: { isToken: false }
      },
      {
        path: 'jump',
        component: () => import('../views/training_institution/jump.vue'),
        meta: { isToken: false, title: '三峡职业技工学校' }
      },
      {
        path: 'details',
        component: () => import('../views/training_institution/details.vue'),
        meta: { isToken: false, title: '三峡职业技工学校' }
      }
    ]
  },
  //  我要创业
  {
    path: '/business',
    component: () => import('../views/layout.vue'),
    children: [
      {
        //  我要创业-首页
        path: 'index',
        component: () => import('../views/want_start_business/index.vue'),
        meta: { isToken: false, title: '我要创业' }
      },
      {
        //  我要创业-申请文案
        path: 'apply',
        component: () => import('../views/want_start_business/apply.vue'),
        meta: { isToken: false }
      },
      {
        //  我要创业-申请文案-填表
        path: 'form',
        component: () => import('../views/want_start_business/apply_form.vue'),
        meta: { isToken: true }
      },
      {
        //  我要创业-创业导师
        path: 'tutor',
        component: () => import('../views/want_start_business/tutor/tutor.vue'),
        meta: { isToken: false, hidden: true },
        children: [
          {
            //  我要创业-创业导师-详情
            path: 'item',
            component: () => import('../views/want_start_business/tutor/tutor_details.vue'),
            meta: { isToken: false }
          },
          {
            //  我要创业-创业导师-申请指导
            path: 'apply',
            component: () => import('../views/want_start_business/tutor/tutor_apply.vue'),
            meta: { isToken: true }
          }
        ]
      },
      {
        //  我要创业-创业活动
        path: 'activity',
        component: () => import('../views/want_start_business/activity/activity_list.vue'),
        meta: { isToken: false, hidden: true },
        children: [
          {
            //  我要创业-创业活动-详情
            path: 'item',
            component: () => import('../views/want_start_business/activity/activity_details.vue'),
            meta: { isToken: false }
          },
          {
            //  我要创业-创业活动-申请报名
            path: 'apply',
            component: () => import('../views/want_start_business/activity/activity_apply.vue'),
            meta: { isToken: true }
          }
        ]
      }
    ]
  },
  //  办事指南
  {
    path: '/guide',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/guide/index.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  中小企业孵化中心
  {
    path: '/incubation',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/incubation/index.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  市外维权服务
  {
    path: '/protection',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/rights_protection/index.vue'),
        meta: { isToken: false, title: '市外维权服务' }
      },
      {
        path: 'item',
        component: () => import('../views/rights_protection/item.vue'),
        meta: { isToken: false }
      }
    ]
  },
  //  404
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]
