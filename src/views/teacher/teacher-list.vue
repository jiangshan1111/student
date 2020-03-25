<template>
  <div class="teacher-list">
    <div class="inner nav clearfix">
      <span class="fl">全部老师</span>
      <ul class="fl clearfix">
        <li v-for="(nav, navi) in navlist" :key="navi" :class="nav === teacher_label ? 'active' : ''" @click="changeType(nav)">{{ nav }}</li>
      </ul>
    </div>
    <div class="inner list clearfix">
      <div class="teacher-msg" :style="(index + 1) % 3 == 0 ? 'margin-right:0' : ''" v-for="(item, index) in teachers" :key="index">
        <div class="top">
          <img src="@/assets/images/teacher/teacher.png" alt="" class="teacher-img" />
          <h6 class="teacher-name">{{ item.true_name }}老师</h6>
          <div><el-rate class="teacher-star" style="display:inline-block;" v-model="teachScoe" disabled show-score text-color="#000" score-template="{value}"></el-rate>分</div>
          <p class="number">
            <span>开课：{{ item.kknum }}</span>
            <span>招生：{{ item.rs }}</span>
          </p>
        </div>
        <div class="bottom">
          <p>{{ item.introduction }}</p>
          <!-- <p>火种教育教研组核心成员火种教育教研组核心成员火种教育教研组核心成员火种教育教研组核心成员火种教育教研组核心成员火种教育教研组核心成员</p> -->
          <button @click="openTdetail(item)">访问主页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      teachScoe: 5,
      teachers: [],
      teacher_label: '全部',
      navlist: ['全部', '人气', '好评']
    }
  },
  created() {
    this.init('全部')
  },
  mounted() {},
  methods: {
    init(type) {
      switch (type) {
        case '全部':
          axios({
            method: 'post',
            url: '/api/stu/teacher/queryAllTeacher',
            data: JSON.stringify({}),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            this.teachers = res.data
          })
          break
        case '人气':
          axios({
            method: 'post',
            url: '/api/stu/teacher/queryAllTeacherByRs',
            data: JSON.stringify({}),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            this.teachers = res.data
          })
          break
        case '好评':
          axios({
            method: 'post',
            url: '/api/stu/teacher/queryAllTeacherByHp',
            data: JSON.stringify({}),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            this.teachers = res.data
          })
          break
        default:
          break
      }
    },
    changeType(nav) {
      this.teacher_label = nav
      this.init(nav)
    },
    openTdetail(item) {
      this.$store.commit('teacher/SAVETEACHER', item)
      this.$router.push('/teacher/teacherdetail')
    }
  }
}
</script>

<style lang="scss">
.teacher-list {
  min-width: 1361px;
  .inner {
    width: 760px;
    margin: 0 auto;
  }
  .nav {
    margin-top: 25px;
    margin-bottom: 31px;
    span {
      font-size: 17px;
      font-weight: 600;
      color: #605f61;
      margin-right: 57px;
    }
    ul li {
      float: left;
      width: 44px;
      height: 22px;
      margin-left: 15px;
      border: 1px #a3a3a3 solid;
      border-radius: 3px;
      line-height: 20px;
      text-align: center;
      color: #747373;
      cursor: pointer;
    }
    ul li.active {
      background-color: #2a96ea;
      border-color: #2a96ea;
      color: #fff;
    }
  }
  .list {
    .teacher-msg {
      width: 32%;
      height: 269px;
      border: 1px #e5e5e5 solid;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px 16px 0;
      margin-bottom: 15px;
      margin-right: 15px;
      float: left;
      cursor: default;
      .top {
        text-align: center;
        .teacher-img {
          width: 60px;
          height: 69px;
          margin-bottom: 12px;
        }
        .teacher-name {
          color: #403b38;
          font-size: 13px;
        }
        .number {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 11px 0;
          span {
            font-size: 12px;
            color: #a0a0a0;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px #e5e5e5 solid;
        box-sizing: border-box;
        padding-top: 8px;
        min-height: 102px;
        button {
          display: none;
          width: 80px;
          height: 30px;
          background-color: #198de6;
          color: #fff;
          line-height: 28px;
          text-align: center;
          border-radius: 5px;
        }
        p {
          font-size: 12px;
          color: #7d7c7c;
          line-height: 17px;
        }
      }
    }
    .teacher-msg:hover {
      .bottom {
        padding-top: 0;
        button {
          display: block;
        }
        p {
          display: none;
        }
      }
    }
  }
}
</style>
