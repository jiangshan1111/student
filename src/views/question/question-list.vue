<template>
  <div class="question-list">
    <header class="question-header">
      <img src="@/assets/images/question/tiku.png" alt="" />
    </header>
    <main class="question-main inner">
      <h1 class="title">全部题库</h1>
      <ul class="question-main-list">
        <li v-for="(tiku, tikuI) in tikuList" :key="tikuI">
          <div class="left-content">
            <h4>{{ tiku.item_bank_name }}</h4>
            <p>{{ tiku.brief_introduction }}</p>
          </div>
          <div class="right-content clearfix">
            <span v-for="(sub, subi) in tiku.sub_library" :key="subi" @click="godetail(sub.ibs_id, tiku)">{{ sub.ibs_name }}</span>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tikuList: []
    }
  },
  created() {
    axios.get('/api/stu/ItemBank/queryItemBank').then((res) => {
      this.tikuList = res.data
    })
  },
  methods: {
    godetail(id, tiku) {
      if (this.$store.state.stu_id === '') {
        this.$message({
          message: '请登录后再查看题库！',
          type: 'warning'
        })
        return
      }
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

<style lang="scss">
.question-list {
  min-width: 1361px;
  .inner {
    width: 1310px;
    margin: 0 auto;
  }
  .question-header {
    width: 100%;
    height: 298px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .question-main {
    .title {
      height: 100%;
      line-height: 103px;
      font-size: 26px;
      text-align: center;
    }
    .question-main-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48%;
        height: 110px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .left-content {
          width: 100%;
          height: 100%;
          text-align: center;
          transition: all 0.7s ease;
          box-sizing: border-box;
          padding-top: 28px;
          h4 {
            font-size: 18px;
            font-weight: 900;
            color: #000;
            margin-bottom: 23px;
            font-family: siyuanhei;
          }
          p {
            font-size: 13px;
            color: #999999;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right-content {
          display: none;
          opacity: 0;
          width: 0%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 34px;
          padding-top: 16px;
          transition: all 0.5s ease;
          overflow: hidden;
          overflow-y: auto;
          span {
            width: 126px;
            height: 30px;
            color: #999999;
            line-height: 28px;
            font-size: 15px;
            display: block;
            box-sizing: border-box;
            padding: 0 14px;
            border: 1px #e5e5e5 solid;
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
            overflow: hidden;
          }
          span:hover {
            background-color: #319aeb;
            border-color: #319aeb;
            color: #fff;
          }
        }
      }
      li:hover {
        .left-content {
          width: 40%;
          background-color: #3b9de8;
          border-radius: 5px;
          padding-left: 10px;
          padding-right: 10px;
          h4,
          p {
            color: #fff;
          }
        }
        .right-content {
          width: 60%;
          display: block;
          opacity: 1;
        }
      }
    }
  }
}
</style>
