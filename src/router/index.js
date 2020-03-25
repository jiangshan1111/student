import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
    // meta: {
    //   keepAlive: true
    // }
  },
  // 发现课程
  {
    path: '/class',
    name: 'class',
    component: () => import('@/views/class/index.vue'),
    redirect: '/class/searchclass',
    children: [
      //全部课程包
      {
        path: '/searchclass',
        name: 'searchclass',
        component: () => import('@/views/class/class-list.vue')
      },
      //课程包详情
      {
        path: '/classDetail',
        name: 'classDetail',
        component: () => import('@/views/class/class-detail.vue')
      }
    ]
  },
  // 公开课 (就一页)
  {
    path: '/openClass',
    name: 'openClass',
    component: () => import('@/views/class/open-class.vue')
  },
  //全部课程 （首页 - 推荐课程 - 查看全部）
  {
    path: '/searchCourse',
    name: 'searchCourse',
    component: () => import('@/views/class/search-course.vue')
  },
  //课程详情
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: () => import('@/views/class/course-detail.vue')
  },
  {
    // 新闻公告
    path: '/news',
    name: 'news',
    component: () => import('@/views/news/index.vue'),
    redirect: '/news/newslist',
    children: [
      {
        path: 'newslist',
        name: 'newslist',
        component: () => import('@/views/news/news-list.vue')
      },
      {
        path: 'newsdetail',
        name: 'newsdetail',
        component: () => import('@/views/news/news-detail.vue')
      }
    ]
  },
  {
    // 讲师专栏
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/views/teacher/index.vue'),
    redirect: '/teacher/teacherlist',
    children: [
      {
        path: 'teacherlist',
        name: 'teacherlist',
        component: () => import('@/views/teacher/teacher-list.vue')
      },
      {
        path: 'teacherdetail',
        name: 'teacherdetail',
        component: () => import('@/views/teacher/teacher-detail.vue')
      }
    ]
  },
  {
    // 题库
    path: '/question',
    name: 'question',
    component: () => import('@/views/question/index.vue'),
    redirect: '/question/questionlist',
    children: [
      {
        path: 'questionlist', // 题库-列表页
        name: 'questionlist',
        component: () => import('@/views/question/question-list.vue')
      },
      {
        path: 'questionpersonal', // 题库-个人题库
        name: 'questionpersonal',
        component: () => import('@/views/question/question-personal.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionfirststart', // 题库-个人新题页 做题页
        name: 'questionfirststart',
        component: () => import('@/views/question/question-first-start.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionhandpapaer', // 题库-交卷
        name: 'questionhandpapaer',
        component: () => import('@/views/question/question-hand-paper.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionrecord', // 题库-记录
        name: 'questionrecord',
        component: () => import('@/views/question/question-record.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionerror', // 题库-错题本
        name: 'questionerror',
        component: () => import('@/views/question/question-error.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questioncontinue', // 题库-继续做题 做题页
        name: 'questioncontinue',
        component: () => import('@/views/question/question-continue.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questioncollect', // 题库-我的收藏
        name: 'questioncollect',
        component: () => import('@/views/question/question-collect.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionanalysis', // 题库-查看解析 做题页
        name: 'questionanalysis',
        component: () => import('@/views/question/question-analysis.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'questionagain', // 题库-再考一遍 做题页
        name: 'questionagain',
        component: () => import('@/views/question/question-again.vue'),
        meta: {
          isLogin: true
        }
      }
    ]
  },
  {
    // 问答社区
    path: '/community',
    name: 'community',
    component: () => import('@/views/community/index.vue'),
    redirect: '/community/communitylist',
    children: [
      {
        path: 'communitylist',
        name: 'communitylist',
        component: () => import('@/views/community/community-list.vue')
      },
      {
        path: 'communitynewask',
        name: 'communitynewask',
        component: () => import('@/views/community/community-new-ask.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'communitydetail',
        name: 'communitydetail',
        component: () => import('@/views/community/community-detail.vue')
      }
    ]
  },
  // 学员心声
  {
    path: '/stuStar',
    name: 'stuStar',
    component: () => import('@/views/students/stu_star.vue')
  },
  // 个人中心
  {
    path: '/usersCenter',
    name: 'usersCenter',
    component: () => import('@/views/user/center/users-center.vue'),
    redirect: '/usersCenter/myCourse',
    children: [
      // 我的课程
      {
        path: 'myCourse',
        name: 'myCourse',
        component: () => import('@/views/user/center/my-course.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的课程表
      {
        path: 'myClassTable',
        name: 'myClassTable',
        component: () => import('@/views/user/center/class_table.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的课程包
      {
        path: 'myClassPackage',
        name: 'myClassPackage',
        component: () => import('@/views/user/center/class_package.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的收藏
      {
        path: 'collectClasses',
        name: 'collectClasses',
        component: () => import('@/views/user/center/collect_classes.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的题库
      {
        path: 'myTiku',
        name: 'myTiku',
        component: () => import('@/views/user/center/my_tiku.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的问答
      {
        path: 'MyQuestion',
        name: 'MyQuestion',
        component: () => import('@/views/user/center/my_question.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的优惠券
      {
        path: 'MyCoupon',
        name: 'MyCoupon',
        component: () => import('@/views/user/center/my_coupon.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的消息
      {
        path: 'MyInfo',
        name: 'MyInfo',
        component: () => import('@/views/user/center/my_info.vue'),
        meta: {
          isLogin: true
        }
      },
      // 我的订单
      {
        path: 'MyOrder',
        name: 'MyOrder',
        component: () => import('@/views/user/center/my_order.vue'),
        meta: {
          isLogin: true
        }
      }
    ]
  },
  // 个人设置
  {
    path: '/usersSettings',
    name: 'usersSettings',
    component: () => import('@/views/user/center/users-center.vue'),
    redirect: '/usersSettings/showInfo',
    children: [
      //我的课程
      {
        path: 'showInfo',
        name: 'showInfo',
        component: () => import('@/views/user/settings/show_info.vue'),
        meta: {
          isLogin: true
        }
      },
      //我的课程表
      {
        path: 'simpleInfo',
        name: 'simpleInfo',
        component: () => import('@/views/user/settings/simple_info.vue'),
        meta: {
          isLogin: true
        }
      },
      //我的课程包
      {
        path: 'toHeadPic',
        name: 'toHeadPic',
        component: () => import('@/views/user/settings/head_pic.vue'),
        meta: {
          isLogin: true
        }
      },
      //我的收藏
      {
        path: 'toUpdatePwd',
        name: 'toUpdatePwd',
        component: () => import('@/views/user/settings/update_pwd.vue'),
        meta: {
          isLogin: true
        }
      }
    ]
  },
  //忘记密码
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: () => import('@/views/user/center/forget_pwd.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/index.vue'),
    redirect: '/order/orderNext',
    children: [
      //订单
      {
        path: 'orderNext',
        name: 'orderNext',
        component: () => import('@/views/order/order_next.vue'),
        meta: {
          isLogin: true
        }
      },
      //订单支付（支付宝/微信）
      {
        path: 'orderType',
        name: 'orderType',
        component: () => import('@/views/order/order_type.vue'),
        meta: {
          isLogin: true
        }
      },
      //订单成功
      {
        path: 'orderSuccess',
        name: 'orderSuccess',
        component: () => import('@/views/order/order_success.vue'),
        meta: {
          isLogin: true
        }
      },
      //订单失败
      {
        path: 'orderError',
        name: 'orderError',
        component: () => import('@/views/order/order_error.vue'),
        meta: {
          isLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable */
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (store.state.stu_id) {
      next()
    } else {
      Message.error({
        message: '请登录后再操作！',
        duration: 2000
      });
      next('/')
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
