<template>
  <div class="community-detail">
    <div class="community-detail-box">
      <div class="community-detail-left">
        <h1>
          <span class="all" @click="$router.push('/community/communitylist')">全部问答</span>>><span>{{ question.title }}</span>
        </h1>
        <div class="community-detail-left-content">
          <div class="questioner">
            <div class="questioner-name">
              <img v-if="(question.head + '').indexOf('http://') === -1" src="@/assets/images/community/head.jpg" alt="" />
              <img v-else src="@/assets/images/community/head.jpg" alt="" />
              <span>{{ question.nicename ? question.nicename : '匿名用户' }}</span>
            </div>
            <div class="questioner-title">
              <h2>
                <span class="ding" v-if="question.state === 1 || question.state === 3">顶</span><span class="jing" v-if="question.state === 2 || question.state === 3">精</span>{{ question.title }}
              </h2>
              <div class="number">
                <p class="answer">
                  <span>{{ question.rs }}</span
                  ><span>回答</span>
                </p>
                <p>
                  <span>{{ question.visit_num }}</span
                  ><span>浏览</span>
                </p>
              </div>
            </div>
            <h6 class="questioner-answer-detail" v-html="question.content"></h6>
            <img v-if="question.picture" src="@/assets/images/community/content.jpg" class="questioner-img" alt="" />
            <h5 class="questioner-type">
              <span>提问时间：{{ getNowFormatDate(question.creation_time) }}</span>
              <span>最后回答：{{ getNowFormatDate(question.maxtime) }}</span>
              <span><i class="biaozhi"></i>{{ filterSubjet(question.subject_id) }}</span>
            </h5>
          </div>
          <ul class="respondent" v-if="answerList.length">
            <li v-for="(ans, index) in answerList" :key="index">
              <div class="respondent-name">
                <div class="left">
                  <img v-if="(ans.head + '').indexOf('http://') === -1" src="@/assets/images/community/head02.jpg" alt="" />
                  <img v-else :src="ans.head" alt="" />
                  <span>{{ ans.nicename ? ans.nicename : '匿名用户' }}</span>
                  <span style="margin-left:20px;" v-if="ans.fidname">您对用户 {{ ans.fidname }} 的评论：</span>
                </div>
                <p class="respondent-time">{{ getNowFormatDate(ans.creation_time) }}</p>
              </div>
              <h6 class="respondent-sentence" v-html="ans.content"></h6>
              <p class="huifu" v-if="!ans.isShow"><i @click="replyChild(ans, index, true)"></i><span @click="replyChild(ans, index, true)">回复</span></p>
              <p class="huifu nohuifu" v-else><i @click="replyChild(ans, index, false)"></i><span @click="replyChild(ans, index, false)">取消回复</span></p>
              <div class="huifu-input" v-if="ans.isShow">
                <textarea v-model="ans.value"></textarea>
                <button @click="replySend(ans, index)">回复层主</button>
              </div>
            </li>
          </ul>
          <h2 style="font-size:24px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;border-top: 1px #ebe9e9 solid;padding-top:15px;">回复主楼：</h2>
          <div class="huifu-main-input">
            <textarea v-model="mainValue"></textarea>
            <button @click="replyBtnFn">回复楼主</button>
          </div>
        </div>
      </div>
      <div class="community-detail-right">
        <button class="release" @click="newQuestion">发布新问题</button>
        <article class="ask-about">
          <h5 class="title">相关问题</h5>
          <ol>
            <li class="ask-about-question" v-for="(rel, relindex) in relatedIssues" :key="relindex">{{ rel.title }}</li>
          </ol>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      huifuMainShow: true, // 主问题回复按钮显示
      mainValue: '', // 回复主问题
      questions_id: this.$route.query.questions_id,
      stu_id: this.$store.state.stu_id,
      course_type: this.$route.query.course_type,
      question: {}, // 主问题
      answerList: [], // 回复主问题
      classification: [],
      relatedIssues: []
    }
  },
  created() {
    // 获取问题大类
    axios({
      method: 'post',
      url: '/api/stu/Question/queryClassificationName',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.classification = res.data
    })
    this.initPage()
  },
  methods: {
    // 点击回复
    replyChild(ans, index, bool) {
      this.answerList = this.answerList.map((el) => {
        el.isShow = false
        return el
      })
      this.answerList[index].isShow = bool
      this.answerList[index].value = ''
    },
    // 初始化页面
    initPage() {
      axios({
        method: 'post',
        url: '/api/stu/Question/queryOneQuestion',
        data: JSON.stringify({
          course_type: this.course_type,
          questions_id: this.questions_id,
          pageNum: 1,
          pageSize: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        this.question = res.data.datalist1[0]
        this.answerList = res.data.datalist2.map((el) => {
          el.isShow = false
          el.value = ''
          return el
        })
        // 子回复检查是否是某个人的评论
        this.answerList.forEach((itm, index) => {
          res.data.datalist2.forEach((im, i) => {
            if (itm.fid === im.questions_id) {
              this.answerList[index]['fidname'] = im.nicename ? im.nicename : '匿名用户'
            }
          })
        })
        this.relatedIssues = res.data.datalist3
      })
    },
    // 初始化回复
    initReply(fid, index = '') {
      axios({
        method: 'post',
        url: '/api/stu/Question/ReplyQuestion',
        data: JSON.stringify({
          mid: this.question.mid,
          fid: fid, // 回复哪个人的 questions_id  如果回复的是最主问题 取 datalist1的 回复某个人取 datalist2的
          publisher: this.stu_id, // 账号id
          content: index === '' ? this.mainValue : this.answerList[index].value,
          picture: ''
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res) {
          this.initPage()
          window.scrollTo(0, 0)
        } else {
          alert('回复失败！')
        }
        this.mainValue = ''
      })
    },
    // 点击主回复
    replyBtnFn() {
      if (this.stu_id === '') {
        this.$message.error({
          type: 'info',
          message: '请登录！',
          duration: '2000'
        })
        return
      }
      if (!this.mainValue) return alert('不能为空')
      this.initReply(this.question.questions_id)
    },
    // 回复 子回复
    replySend(ans, index) {
      if (this.stu_id === '') {
        this.$message.error({
          type: 'info',
          message: '请登录！',
          duration: '2000'
        })
        return
      }
      if (ans.value.length) {
        this.initReply(ans.questions_id, index)
      }
      this.answerList[index].isShow = false
      this.answerList[index].value = ''
    },
    // 发布新问题
    newQuestion() {
      if (this.stu_id === '') {
        this.$message.error({
          type: 'info',
          message: '请登录！',
          duration: '2000'
        })
        return
      }
      this.$router.push('/community/communitynewask')
    },
    getNowFormatDate(date) {
      if (!date) {
        return
      }
      date = new Date(date)
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
    filterSubjet(subject_id) {
      let type = ''
      if (!subject_id) return
      subject_id = subject_id.replace(/;/g, '').split('')
      subject_id.forEach((itm) => {
        this.classification.forEach((el) => {
          if (el.pse_id.toString() === itm.toString()) {
            type += el.modify_name + '&'
          }
        })
      })
      type = type[type.length - 1] !== '&' ? type : type.substring(0, type.length - 1)
      return type
    }
  }
}
</script>

<style lang="scss">
.community-detail {
  font-family: siyuanhei;
  min-width: 1361px;
  .community-detail-box {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .community-detail-left {
    padding-top: 14px;
    width: 750px;
    h1 {
      font-size: 17px;
      line-height: 67px;
      color: #999999;
      border-bottom: 1px #e5e5e5 solid;
      margin-bottom: 29px;
      span {
        color: #007fe1;
        margin-left: 9px;
      }
      .all {
        color: #999999;
        cursor: pointer;
        margin-right: 8px;
        margin-left: 0;
      }
      .all:hover {
        text-decoration: underline;
      }
    }
    .community-detail-left-content {
      border: 1px #ebe9e9 solid;
      width: 100%;
      padding: 26px 27px 0;
      .questioner {
        border-bottom: 1px #e5e5e5 solid;
        .questioner-name {
          display: flex;
          align-items: center;
          img {
            margin-right: 14px;
          }
          span {
            font-size: 12px;
            color: #a9a9a9;
          }
        }
        .questioner-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 35px;
          h2 {
            font-size: 17px;
            color: #383940;
            .ding {
              display: inline-block;
              width: 16px;
              height: 18px;
              color: #fff;
              font-size: 12px;
              background-color: #e95229;
              margin-right: 4px;
              line-height: 16px;
              text-align: center;
              vertical-align: middle;
              border-radius: 2px;
            }
            .jing {
              display: inline-block;
              width: 16px;
              height: 18px;
              color: #fff;
              font-size: 12px;
              background-color: #0783e3;
              margin-right: 9px;
              line-height: 16px;
              text-align: center;
              vertical-align: middle;
              border-radius: 2px;
            }
          }
          .number {
            display: flex;
            justify-content: space-between;
            p {
              color: #a9a9a9;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              align-items: center;
              span {
                display: block;
                font-size: 12px;
              }
            }
            p.answer {
              color: #007fe1;
              margin-right: 31px;
            }
          }
        }
        .questioner-answer-detail {
          line-height: 34px;
          font-size: 15px;
          color: #747373;
        }
        .questioner-img {
          display: block;
          width: 100%;
          margin-bottom: 6px;
        }
        .questioner-type {
          line-height: 27px;
          color: #999999;
          font-size: 12px;
          span {
            margin-right: 37px;
          }
          .biaozhi {
            display: inline-block;
            width: 13px;
            height: 13px;
            background: url('../../assets/images/community/xiaofang.jpg') no-repeat 0 0;
          }
        }
      }
      .respondent {
        max-height: 600px;
        overflow-y: auto;
      }
      .respondent li {
        padding: 20px 3px 0 0;
        .respondent-name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 9px;
          .left {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .respondent-time,
          span {
            color: #999999;
            font-size: 12px;
          }
        }
        .respondent-sentence {
          line-height: 25px;
          font-size: 15px;
          color: #747373;
          font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
          margin-bottom: 9px;
        }
        .huifu {
          text-align: right;
          font-size: 14px;
          color: #a1a1a1;
          font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
          margin-bottom: 17px;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../../assets/images/community/news.jpg') no-repeat 0 0;
            vertical-align: middle;
            margin-right: 9px;
            cursor: pointer;
          }
          span {
            cursor: pointer;
          }
        }
        .nohuifu span {
          color: #3099eb;
        }
        .nohuifu i {
          background: url('../../assets/images/community/cancel.jpg') no-repeat 0 0;
        }
        .huifu-input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgb(240, 240, 240);
          border-bottom: 1px solid rgb(240, 240, 240);
          padding: 20px 0;
          textarea {
            width: 600px;
            height: 40px;
            border: 1px #a5a2a2 solid;
            border-radius: 3px;
          }
          button {
            width: 84px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #3099eb;
            color: #fff;
            border-radius: 3px;
            font-size: 16px;
          }
        }
      }
      li:last-child {
        .huifu-input {
          border-bottom: none;
        }
      }
      .huifu-main-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        textarea {
          width: 600px;
          height: 40px;
          border: 1px #a5a2a2 solid;
          border-radius: 3px;
        }
        button {
          font-family: Arial, Helvetica, sans-serif;
          width: 84px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #3099eb;
          color: #fff;
          border-radius: 3px;
          font-size: 16px;
        }
      }
    }
  }
  .community-detail-right {
    padding-top: 80px;
    .release {
      width: 240px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-image: linear-gradient(to right, #359ceb, #0285eb);
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 12px;
    }
    .ask-about .title {
      line-height: 44px;
      border-bottom: 1px #e5e5e5 solid;
      font-size: 14px;
      color: #575e67;
    }
    .ask-about .ask-about-question {
      padding-top: 14px;
      font-size: 13px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #0af;
      }
    }
  }
}
</style>
