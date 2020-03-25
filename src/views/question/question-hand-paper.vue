<template>
  <!-- 交卷 -->
  <div class="hand-paper">
    <header class="inner hand-paper-header">
      <div class="hand-paper-header-left">
        <img src="@/assets/images/question/lianxi.png" alt="" />
        <p>
          {{ title_zero }}<span> {{ title_two }}</span>
        </p>
      </div>
    </header>
    <main class="inner hand-paper-main">
      <div class="hand-paper-main-top">
        <div class="time">
          <h6>您共用时:</h6>
          <div class="minutes-seconds">
            <span>1</span>
            时
            <span>20</span>
            分
            <span>30</span>
            秒
          </div>
        </div>
        <div class="statistics">
          <table class="statistics-table">
            <thead>
              <th>题型</th>
              <th>正确</th>
              <th>错误</th>
            </thead>
            <tbody>
              <tr>
                <td class="name">单选题</td>
                <td class="choice-true">0</td>
                <td class="choice-false">4</td>
              </tr>
              <tr>
                <td class="name">多选题</td>
                <td class="choice-true">0</td>
                <td class="choice-false">6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="hand-paper-main-bottom">
        <!-- <button class="check">查看解析</button> -->
        <button class="goback" @click="$router.push({ path: '/question/questionpersonal', query: { ibs_id: listId } })">返回做题</button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title_two: this.$route.query.title_two,
      title_zero: this.$store.state.tiku.tiku.item_bank_name
    }
  },
  created() {},
  methods: {
    // 暂时没有answerId功能暂停
    view() {
      // this.$router.push({
      //   path: '/question/questionanalysis',
      //   query: {
      //     answerId: item.answer_id,
      //     smalltitle: item.name,
      //     bigtitle: this.$route.query.bigtype
      //   }
      // })
    }
  },
  computed: {
    ...mapState({
      listId: (state) => state.tiku.listId
    })
  }
}
</script>

<style lang="scss">
.hand-paper {
  font-family: siyuanhei;
  min-width: 1361px;
  .inner {
    width: 1080px;
    margin: 0 auto;
  }
  .hand-paper-header {
    margin-top: 58px;
    height: 83px;
    border: 1px #e5e5e5 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 29px;
    margin-bottom: 30px;
    .hand-paper-header-left {
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 21px;
        margin-right: 10px;
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
  .hand-paper-main {
    border: 1px #e5e5e5 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding-top: 42px;
    padding: 42px 68px 37px 42px;
    .hand-paper-main-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 240px;
      .time {
        padding-top: 21px;
        h6 {
          line-height: 73px;
          font-size: 17px;
          color: #999999;
        }
        .minutes-seconds {
          font-size: 37px;
          font-weight: bold;
          color: #007fe1;
          span {
            display: inline-block;
            width: 64px;
            height: 64px;
            border: 1px #d0e0ed solid;
            line-height: 62px;
            text-align: center;
            box-shadow: 0 5px 7px 0 #ced9e2;
          }
        }
      }
      .statistics {
        width: 430px;
        .statistics-table {
          text-align: center;
          width: 100%;
          th {
            width: 33.3%;
            text-align: center;
            height: 34px;
            background-color: #f6f6f6;
            line-height: 34px;
            font-size: 12px;
            color: #333333;
          }
          tr {
            line-height: 36px;
            td {
              font-size: 12px;
              color: #666666;
            }
            .choice-true {
              color: #07c1f2;
            }
            .choice-false {
              color: #dd0000;
            }
          }
        }
      }
    }
    .hand-paper-main-bottom {
      text-align: center;
      button {
        width: 110px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
      }
      button.check {
        color: #f5f9fe;
        margin-right: 50px;
        background-image: linear-gradient(to right, #359ceb, #0285eb);
      }
      button.goback {
        color: #999999;
        border: 1px #e5e5e5 solid;
        line-height: 38px;
      }
    }
  }
}
@media (max-width: 1366px) {
  .hand-paper .hand-paper-main .hand-paper-main-top {
    margin-bottom: 140px;
  }
}
</style>
