<template
  ><div class="content-right my-invite" style="overflow: auto; min-height: 594px;">
    <div class="box">
      <div class="mynote-title">我的问答</div>
      <div class="order-right-nav">
        <span @click="change_answer_label('tiwen')" class="active order-state" :style="answer_label == 'tiwen' ? ' color: #0af!important;' : ''"
          >我的提问<i id="alreadyQueBankCount">（{{ tiwen.length }}）</i></span
        >
        <span @click="change_answer_label('huida')" class="active order-state" :style="answer_label == 'huida' ? ' color: #0af!important;' : ''"
          >我的回答<i id="canQueBankCount">（{{ huida.length }}）</i></span
        >
      </div>
      <ul id="ulContent" v-if="answer_label == 'tiwen'" style="min-height:440px;max-height:490px;overflow-y:auto;">
        <li
          class="clear"
          v-for="(item, index) in tiwen"
          :key="index"
          style="padding: 20px 0 13px 0;
                    width: 100%;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 0;"
        >
          <div class="left-content">
            <h2
              class="clear"
              style="    padding-left: 0;
                            font-size: 14px;
                            color: #616161;
                            position: relative;
                            margin-bottom: 20px;"
            >
              <i class="iconfont nofinish"></i>

              <a href="javascript:void(0)" alt="" @click="goAnswer(item)">{{ item.title }}</a>
            </h2>

            <div class="foot">
              <p>
                <em
                  style="color: #939ca5;
                                    margin-right: 20px;
font-size: 12px;"
                  >提问时间：{{ getNowFormatDate(new Date(item.creation_time)) }}</em
                >

                <span
                  class="kanNumber"
                  style="    margin-left: 32px;
                                    color: #939ca5;"
                  ><i class="iconfont"></i><b>{{ item.visit_num }}</b></span
                >

                <span
                  class="messageNumber"
                  style="    margin-left: 32px;
                                    color: #939ca5;"
                  ><i class="iconfont"></i><b>{{ item.wen_rs }}</b></span
                >
              </p>
            </div>
          </div>
        </li>
      </ul>
      <ul id="ulContent" v-if="answer_label == 'huida'" style="min-height:440px;max-height:490px;overflow-y:auto;">
        <li
          class="clear"
          v-for="(item, index) in huida"
          :key="index"
          style="padding: 20px 0 13px 0;
                    width: 100%;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 0;"
        >
          <div class="left-content">
            <h2
              class="clear"
              style="    padding-left: 0;
                            font-size: 14px;
                            color: #616161;
                            position: relative;
                            margin-bottom: 20px;"
            >
              <i class="iconfont nofinish"></i>
              <a href="javascript:void(0)" alt="" @click="goAnswer(item)">{{ item.title }}</a>
            </h2>
            <p
              class="huiDaText"
              style="margin-bottom: 16px;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;"
            >
              <span class="answerMask" style="    color: #00a9ee;">[我的回答]：</span>
              <b><span style="font-size:14px" v-html="item.content"></span></b>
            </p>
            <div class="foot">
              <p>
                <em
                  style="color: #939ca5;
                                        margin-right: 20px;
    font-size: 12px;"
                  >提问时间：{{ getNowFormatDate(new Date(item.creation_time)) }}</em
                >
                <span
                  class="kanNumber"
                  style="    margin-left: 32px;
                                    color: #939ca5;"
                  ><i class="iconfont"></i><b>{{ item.visit_num }}</b></span
                >
                <span
                  class="messageNumber"
                  style="    margin-left: 32px;
                                    color: #939ca5;"
                  ><i class="iconfont"></i><b>{{ item.huida_rs }}</b></span
                >
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      answer_label: 'tiwen',
      tiwen: [
        {
          creation_time: '2019-12-26T10:54:46.000+0800',
          fid: 0,
          wen_rs: 4,
          questions_id: 41,
          title: '啊实打实大师',
          visit_num: 117
        }
      ],
      huida: [
        {
          creation_time: '2019-12-17T16:23:16.000+0800',
          fid: 1,
          questions_id: 1,
          mid: 1,
          huida_rs: '4',
          title: '问题',
          visit_num: 0,
          content: '江山11'
        }
      ]
    }
  },
  created() {
    let _this = this
    //我的问答
    this.$axios
      .post('/api/stu/queryMyQuestion', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.huida = data.huida
        _this.tiwen = data.tiwen
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
    change_answer_label(label) {
      this.answer_label = label
    },
    getNowFormatDate(date) {
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute + seperator2 + second
      return currentdate
    },
    //问答详情
    goAnswer(item) {
      this.$router.push({
        path: '/community/communitydetail',
        query: {
          questions_id: item.questions_id,
          course_type: item.course_type
        }
      })
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
    }
  }
}
</script>
<style scoped>
html body .content-right .box ul .left-content h2 .iconfont.nofinish {
  color: #0af;
}
.kanNumber b,
.messageNumber b {
  font-size: small;
  vertical-align: super;
}
</style>
