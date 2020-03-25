<template>
  <div class="question-record">
    <header class="inner question-record-header">
      <div class="question-record-header-left">
        <img src="@/assets/images/question/record.png" alt="" />
        <p>
          做题记录<span>{{ title_one }}</span>
        </p>
      </div>
      <el-button type="info" plain round @click="goback">返回做题</el-button>
    </header>
    <main class="inner question-record-main" v-if="!noData">
      <ul style="min-height:483px;">
        <li class="one-record" v-for="(item, index) in recordList" :key="index">
          <div class="one-record-left">
            <i class="dian"></i>
            <p class="name">
              {{ item.type | filterType }} - <span>{{ item.name }}</span>
            </p>
            <p class="number">
              共{{ item.question_num }}题<span class="correct">正确：{{ item.dui }}</span
              ><span class="error">错误{{ item.cuo }}</span
              ><span class="score">得分：{{ item.score ? item.score : 0 }}</span>
            </p>
            <p class="time">
              <span>{{ item.time | formatDate }}</span
              >{{ item.used_answer_time | formatSeconds }}
            </p>
          </div>
          <div class="one-record-right">
            <button v-if="item.state === 1" @click="again(item)">再来一遍</button>
            <button v-if="item.state === 1" @click="view(item)">查看解析</button>
            <button v-else class="goon" @click="goonti(item)">继续做题</button>
          </div>
        </li>
      </ul>
      <div class="myPagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next" :total="pageTotal">
        </el-pagination>
      </div>
    </main>
    <main class="inner question-record-main" style="text-align:center;font-size:24px;" v-if="noData">
      <h1 style="margin:50px 0;">没有记录!</h1>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      title_one: this.$route.query.title_one,
      activeIndexa: 0,
      currentPage1: 1,
      pageTotal: 0,
      ibs_id: this.$route.query.ibs_id, // 科目id
      recordList: [],
      user_id: this.$store.state.stu_id,
      noData: false
    }
  },
  created() {
    this.init()
  },
  filters: {
    filterType(type) {
      switch (type) {
        case 1:
          return '快速做题'
        case 2:
          return '章节练习'
        case 3:
          return '模拟题'
        case 4:
          return '课后练习'
        case 5:
          return '章节检测'
        case 6:
          return '课后作业'
        case 7:
          return '每日一练'
        case 8:
          return '智能组卷'
        case 9:
          return '快速15道'
      }
    },
    formatDate(date) {
      date = new Date(date)
      let format = 'yyyy-MM-dd'
      if (!date) return
      if (!format) format = 'yyyy-MM-dd'
      switch (typeof date) {
        case 'string':
          date = new Date(date.replace(/-/, '/'))
          break
        case 'number':
          date = new Date(date)
          break
      }
      if (!(date instanceof Date)) return
      var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ('' + (date.getMonth() + 101)).substr(1),
        dd: ('' + (date.getDate() + 100)).substr(1),
        HH: ('' + (date.getHours() + 100)).substr(1),
        mm: ('' + (date.getMinutes() + 100)).substr(1),
        ss: ('' + (date.getSeconds() + 100)).substr(1)
      }
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]]
      })
    },
    formatSeconds(value) {
      if (!value) return '0秒'
      var theTime = parseInt(value) // 需要转换的时间秒
      var theTime1 = 0 // 分
      var theTime2 = 0 // 小时
      var theTime3 = 0 // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
          if (theTime2 > 24) {
            //大于24小时
            theTime3 = parseInt(theTime2 / 24)
            theTime2 = parseInt(theTime2 % 24)
          }
        }
      }
      var result = ''
      if (theTime > 0) {
        result = '' + parseInt(theTime) + '秒'
      }
      if (theTime1 > 0) {
        result = '' + parseInt(theTime1) + '分钟' + result
      }
      if (theTime2 > 0) {
        result = '' + parseInt(theTime2) + '小时' + result
      }
      if (theTime3 > 0) {
        result = '' + parseInt(theTime3) + '天' + result
      }
      return result
    }
  },
  methods: {
    // 返回做题
    goback() {
      window.history.go(-1)
    },
    again(item) {
      this.$router.push({
        path: '/question/questionagain',
        query: {
          answer_id: item.answer_id,
          smalltitle: item.name
        }
      })
    },
    view(item) {
      this.$router.push({
        path: '/question/questionanalysis',
        query: {
          answerId: item.answer_id,
          smalltitle: item.name,
          bigtitle: this.$route.query.bigtype
        }
      })
    },
    init(pageNum = 1) {
      // 查询做题记录
      axios({
        method: 'post',
        url: '/api/stu/ItemBank/queryDoRecord',
        data: JSON.stringify({
          student_id: this.user_id,
          ibs_id: this.ibs_id,
          pageNum: pageNum,
          pageSize: 10
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data.total === 0) {
          this.noData = true
          return
        }
        this.pageTotal = res.data.total
        this.recordList = res.data.list
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.init(val - 0)
    },
    activeA(num) {
      this.activeIndexa = num
    },
    goonti(item) {
      this.$router.push({
        path: '/question/questioncontinue',
        query: {
          answer_id: item.answer_id,
          smalltitle: this.navname[0]
        }
      })
    }
  }
}
</script>

<style lang="scss">
.question-record {
  font-family: siyuanhei;
  min-width: 1361px;
  .inner {
    width: 1080px;
    margin: 0 auto;
  }
  .question-record-header {
    margin-top: 58px;
    height: 83px;
    border: 1px #e5e5e5 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 29px;
    margin-bottom: 30px;
    .question-record-header-left {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 22px;
        margin-right: 6px;
        display: inline-block;
      }
      p {
        font-size: 23px;
        font-weight: bold;
        color: #383940;
        display: inline-block;
        span {
          color: #999999;
          font-size: 13px;
          font-weight: normal;
          margin-left: 10px;
        }
      }
    }
  }
  .question-record-main {
    border: 1px #e5e5e5 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 39px 20px 50px 34px;
    .one-record {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 17px;
      .one-record-left {
        display: flex;
        align-items: center;
        .dian {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #05c091;
          margin-right: 9px;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
          color: #636161;
          margin-right: 79px;
          min-width: 173px;
          span {
            color: #999999;
            font-weight: normal;
          }
        }
        .number {
          font-size: 14px;
          color: #716f6f;
          margin-right: 59px;
          span {
            margin-left: 27px;
          }
          span.correct {
            color: #4db565;
          }
          span.error {
            color: #ee4e30;
          }
          span.score {
            color: #268ae3;
          }
        }
        .time {
          font-size: 14px;
          color: #999999;
          span {
            margin-right: 14px;
          }
        }
      }
      .one-record-right {
        button {
          width: 80px;
          height: 30px;
          line-height: 28px;
          color: #fff;
          background: #3099e9;
          border-radius: 5px;
          text-align: center;
          margin-left: 14px;
          font-size: 12px;
        }
        .goon {
          background: #fff;
          color: #ff9601;
          line-height: 26px;
          border: 1px #ff9601 solid;
        }
      }
    }
  }
  .myPagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
