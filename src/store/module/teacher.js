const teacher = {
  namespaced: true,
  state: {
    // 教师详情页-个人详情数据
    teacher: []
  },
  mutations: {
    ['SAVETEACHER'](state, data) {
      state.teacher = data
    }
  },
  actions: {}
}
export default teacher
