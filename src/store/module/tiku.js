const tiku = {
  namespaced: true,
  state: {
    tiku: {}, // 列表页保存点击的题库信息
    listId: 0, // 列表页保存点击的题库id
    tikuPersonal: {}, // 个人页点击开始答题保存题库信息
    switchIndex: 0 // 保存切换章节练习跟模拟真题状态
  },
  mutations: {
    ['SAVETIKU'](state, obj) {
      state.tiku = obj.tiku
      state.listId = obj.listId
    },
    ['SAVETIKUPERSONAL'](state, obj) {
      state.tikuPersonal = obj
    },
    ['MODIFYLISTID'](state, id) {
      state.listId = id
    },
    ['SWITCHINDEX'](state, index) {
      state.switchIndex = index
    }
  }
}
export default tiku
