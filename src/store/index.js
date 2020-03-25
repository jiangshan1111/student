import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import teacher from './module/teacher'
import tiku from './module/tiku'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    stu_id: '',
    headed_index: '0 /',
    order_num: '',
    order_type: '',
    order_info: '',
    pay_way_info: '',
    userRouterPath: '' // 保存用户路由信息path
  },
  mutations: {
    //登录
    login_stu(state, stu_id) {
      state.stu_id = stu_id
    },
    //订单信息更新
    order_update(state, data) {
      state.order_num = data.data
      state.order_type = data.type
      state.order_info = JSON.stringify(data.obj)
    },
    //支付信息更新
    pay_update(state, data) {
      state.pay_way_info = data
    },
    //改变导航栏上状态
    change_headed(state, headed_index) {
      state.headed_index = headed_index
    },
    saveUserRouterPath(state, path) {
      state.userRouterPath = path
    }
  },
  actions: {},
  modules: {
    teacher,
    tiku
  },
  plugins: [persistedState({ storage: window.sessionStorage })]
})
