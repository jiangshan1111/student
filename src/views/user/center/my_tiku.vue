<template>
  <div class="content-right my-invite" style="min-height: 594px;max-height: 594px;" v-loading="loading">
    <div class="right-box">
      <div class="mynote-title">我的题库</div>
      <!--6.6.0版本改版 添加已做题库和可做题库  hxs  2019-08-12-->
      <div class="order-right-nav">
        <span @click="change_tikus_label('al')" class="active order-state" :style="tikus_label == 'al' ? ' color: #0af!important;' : ''"
          >已做题库<i id="alreadyQueBankCount">（{{ already_tikus.length }}）</i></span
        >
        <span @click="change_tikus_label('not_al')" class="active order-state" :style="tikus_label == 'not_al' ? ' color: #0af!important;' : ''"
          >可做题库<i id="canQueBankCount">（{{ not_already_tikus.length }}）</i></span
        >
      </div>
      <div class="bank-box">
        <div class="question-item" v-for="(item, index) in tikus" :key="index">
          <div class="quest-title">{{ item.item_bank_name }}</div>
          <div class="secondtit" v-html="item.brief_introduction"></div>
          <div style="min-height:415px;max-height:415px;overflow-y:auto;">
            <div v-for="(item1, index1) in item.datalist" :key="index1" class="fl">
              <div
                class="course-ball"
                subid="22522"
                :style="
                  index1 % 5 == 0
                    ? 'border: 2px solid rgb(0, 183, 238)'
                    : index1 % 5 == 1
                    ? 'border: 2px solid rgb(245, 125, 110)'
                    : index1 % 5 == 2
                    ? 'border: 2px solid rgb(47, 196, 143)'
                    : index1 % 5 == 3
                    ? 'border: 2px solid rgb(196, 144, 191)'
                    : 'border: 2px solid rgb(241, 148, 77)'
                "
              >
                <div class="quest-title" @click="goTiku(item1.ibs_id, item)" :title="item1.ibs_name">{{ item1.ibs_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="pages">
        <ul class="pagination"></ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      loading: true,
      tikus: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      tikus_label: 'al',
      already_tikus: [{ datalist: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      not_already_tikus: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  created() {
    let _this = this
    this.$axios
      .post('/api/stu/queryMyItemBank', {
        stu_id: _this.$store.state.stu_id,
        DND: 'Done'
      })
      .then((resp) => {
        let data = resp.data
        _this.loading = false
        _this.already_tikus = data
        _this.tikus = data
      })
      .catch((err) => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
    this.$axios
      .post('/api/stu/queryMyItemBank', {
        stu_id: _this.$store.state.stu_id,
        DND: 'Do1ne'
      })
      .then((resp) => {
        let data = resp.data
        _this.not_already_tikus = data
      })
      .catch((err) => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
  },
  methods: {
    activeA(num) {
      this.activeIndexa = num
    },
    change_tikus_label(label) {
      this.tikus_label = label
      if (label == 'al') {
        this.tikus = this.already_tikus
      } else {
        this.tikus = this.not_already_tikus
      }
    },
    goNext(router) {
      this.$router
        .push({
          path: router
        })
        .catch((err) => {
          console.log(err)
        })
    },
    activeB(num) {
      this.activeIndexb = num
    },
    goTiku(id, tiku) {
      tiku.sub_library = tiku.datalist
      delete tiku.datalist
      this.$store.commit('tiku/SAVETIKU', {
        tiku: tiku,
        listId: id
      })
      this.$router.push({
        path: '/question/questionpersonal'
      })
    }
  }
}
</script>
