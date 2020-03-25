<template>
  <!-- 模拟真题 -->
  <div class="mnzt">
    <ol class="mnzt-content" v-if="simulationlist.length">
      <li v-for="(simulation, index) in simulationlist" :key="index">
        <div class="mnzt-content-left">
          <div class="mnzt-content-left-name">
            <img src="@/assets/images/question/book.jpg" alt="" />
            <span class="name">{{ simulation.test_paper_name }} </span>
          </div>
          <div class="percentage">
            <b :style="{ width: (parseInt(simulation.jindu) / parseInt(simulation.zongshu)) * 100 + '%' }"></b>
          </div>
          <span class="percentage-num" style="color: #a1a1a1;"
            ><b style="color:#007fe1;">{{ simulation.jindu }}</b
            >/{{ simulation.zongshu }}</span
          >
        </div>
        <div class="mnzt-content-right">
          <span>总分：{{ simulation.total_score }}分</span>
          <span>时间：{{ simulation.answer_time }}分钟</span>
          <button v-if="parseInt(simulation.state) === 1" class="checkBtn" @click="realStart(simulation, '查看解析')">查看解析</button>
          <button v-if="parseInt(simulation.state) === 1" class="againBtn" @click="realStart(simulation, '再考一遍')">再考一遍</button>
          <button v-if="parseInt(simulation.state) === 0" class="startBtn" @click="realStart(simulation, '开始做题')">开始做题</button>
          <button v-if="parseInt(simulation.state) === 2" class="goonBtn" @click="realStart(simulation, '继续做题')">继续做题</button>
        </div>
      </li>
    </ol>
    <div class="noData" v-else>
      <img src="@/assets/images/question/noRecord.png" alt="" />
      <p>目前还没有模拟题可做哦～</p>
    </div>
  </div>
</template>

<script>
// 模拟真题
export default {
  data() {
    return {}
  },
  methods: {
    // 模拟真题开始做题
    realStart(simulation, type) {
      let url = ''
      let query = {}
      switch (type) {
        case '开始做题':
          url = '/question/questionfirststart'
          query.test_paper_id = simulation.test_paper_id
          break
        case '继续做题':
          url = '/question/questioncontinue'
          query.answer_id = simulation.answer_id
          query.title_two = this.title_two
          break
        case '再考一遍':
          url = '/question/questionagain'
          query.answer_id = simulation.answer_id
          query.title_two = this.title_two
          break
        case '查看解析':
          url = '/question/questionanalysis'
          query.answerid = simulation.answer_id
          query.title_two = this.title_two
          query.title_zero = this.title_zero
          break
        default:
          break
      }
      this.$router.push({
        path: url,
        query: query
      })
    }
  },
  props: {
    simulationlist: {
      type: Array,
      default: function() {
        return []
      }
    },
    title_two: {
      type: String,
      default: ''
    },
    title_zero: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.mnzt {
  padding-top: 31px;
  font-family: siyuanhei;
  .mnzt-content li {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    padding: 0 13px;
    border: 1px #e5e5e5 solid;
    margin-bottom: 8px;
    .mnzt-content-left {
      display: flex;
      align-items: center;
      .mnzt-content-left-name {
        min-width: 284px;
      }
      img {
        width: 18px;
        height: 17px;
        margin-right: 14px;
      }
      .name {
        font-size: 16px;
        font-weight: 500;
        margin-right: 26px;
        color: #646363;
      }
      .percentage {
        width: 190px;
        height: 7px;
        background: #ebedf0;
        border-radius: 3px;
        margin-right: 14px;
        b {
          background-color: #208fe5;
          border-radius: 3px;
          display: block;
          height: 7px;
        }
      }
    }
    .mnzt-content-right {
      display: flex;
      align-items: center;
      span {
        font-size: 13px;
        color: #a1a1a1;
        margin-right: 25px;
        letter-spacing: 1px;
        min-width: 94px;
      }
      button {
        width: 78px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        box-sizing: content-box;
        border-radius: 3px;
        margin-left: 10px;
      }
      button:nth-child(3) {
        margin-left: 0;
      }
      .startBtn {
        border: 1px #007fe1 solid;
        color: #007fe1;
      }
      .againBtn:hover,
      .checkBtn:hover,
      .startBtn:hover {
        border-color: blue;
        color: blue;
      }
      .goonBtn {
        border: 1px #ff9601 solid;
        color: #ff9601;
      }
      .goonBtn:hover {
        border-color: #ff6700;
        color: #ff6700;
      }
      .againBtn,
      .checkBtn {
        border: 1px #0af solid;
        color: #0af;
      }
    }
  }
  .noData {
    text-align: center;
    font-size: 26px;
    color: #8c8c8c;
  }
}
</style>
