<template>
  <div class="teacher-detail">
    <div class="inner teacher-msg clearfix">
      <!-- <img src="@/assets/images/teacher/teacher.png" alt="" class="fl teacher-img" /> -->
      <img :src="teacher.head" alt="" class="fl teacher-img" />
      <div class="fr teacher-content">
        <div class="content-name">
          <span class="name">{{ teacher.true_name }}老师</span>
          <el-rate class="teacher-star" style="display:inline-block;" v-model="teachScoe" disabled text-color="#000" score-template="{value}"></el-rate>
        </div>
        <div class="content-number">
          <span
            >课程：<b style="color:#007fe1">{{ teacher.kknum }}</b></span
          >
          <span
            >评论：<b style="color:#007fe1">{{ evaluate }}</b></span
          >
          <span
            >学员：<b style="color:#007fe1">{{ teacher.rs }}</b></span
          >
        </div>
        <p class="content-desc" v-html="teacher.introduction">
          <!-- 简介：火种教育教研组核心成员，课堂诙谐有趣，善于梳理与总结知识点。积极参与：教研活动，善于引导学习，秉承授人以鱼不如授人以渔的理念在教育的征途上前行 -->
        </p>
      </div>
    </div>
    <div class="inner teacher-class">
      <h1>开设课程：</h1>
      <div class="list-content clearfix" v-if="pagedata.datalist1 && pagedata.datalist1.length">
        <div v-for="(course, i) in pagedata.datalist1" @click="goCourse(course)" :key="i" class="list-box" :style="(i + 1) % 3 == 0 ? 'margin-right:0' : ''">
          <img v-if="course.cover.indexOf('E:/') !== -1" src="http://image.yunduoketang.com/course/34270/20190829/acafc7f6-a1a7-4d27-b4b3-00910b90d095.png" alt="" class="list-img" />
          <img v-else :src="course.cover" alt="" class="list-img" />
          <div style="box-sizing:border-box;padding:8px 11px 0;">
            <p class="desc"><span>精品</span>{{ course.course_name }}</p>
            <div class="people-price">
              <div>
                <img src="@/assets/images/index/class-user.png" alt="" />
                <span class="people">
                  {{ course.stu_rs }}
                </span>
              </div>
              <small class="price"> ￥{{ course.special_price }} </small>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="text-align:center;font-size:24px;font-weight:900;padding:10px 0;">
        还未开课
      </div>
    </div>
    <div class="inner teacher-evaluate">
      <h2>学员评价</h2>
      <div class="evaluate-box" v-if="pagedata.datalist2 && pagedata.datalist2.length">
        <ul class="clearfix">
          <li v-for="(eva, i) in pagedata.datalist2" :key="i" class="clearfix stu-msg" :style="(i + 1) % 2 !== 1 ? '' : 'border-right: 1px #f3f3f3 solid;'">
            <img src="@/assets/images/teacher/stuImg.jpg" alt="" class="fl stu-img" />
            <!-- <img :src="eva.head" alt="" class="fl stu-img" /> -->
            <article class="stu-name fr">
              <p class="name">
                <span>{{ eva.tel }}</span
                ><span>{{ getNowFormatDate(eva.creation_time) }}</span>
              </p>
              <p class="tag">{{ eva.content }}</p>
            </article>
          </li>
        </ul>
      </div>
      <div v-else style="text-align:center;font-size:24px;font-weight:900;padding:10px 0;">
        还未评价
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      teachScoe: 5,
      pagedata: [], // 整个页面的数据
      evaluate: 0 // 评价数量
    }
  },
  created() {
    axios({
      method: 'post',
      url: '/api/stu/teacher/queryTeacherById',
      data: JSON.stringify({
        user_id: parseInt(this.teacher.user_id)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.pagedata = res.data
      this.evaluate = res.data.datalist2.length
    })
  },
  computed: {
    ...mapState({
      teacher: (state) => state.teacher.teacher // 获取教师信息
    })
  },
  methods: {
    goCourse(course) {
      this.$router.push({
        name: 'courseDetail',
        query: {
          course_id: course.course_id
        }
      })
    },
    getNowFormatDate(date) {
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
    }
  }
}
</script>

<style lang="scss">
.teacher-detail {
  min-width: 1361px;
  .inner {
    width: 750px;
    margin: 0 auto;
  }
  .teacher-msg {
    margin-top: 51px;
    margin-bottom: 27px;
    .teacher-img {
      max-width: 84px;
      max-height: 95px;
    }
    .teacher-content {
      width: 85%;
      .content-name {
        margin-bottom: 19px;
        span {
          vertical-align: middle;
        }
        .name {
          font-size: 21px;
          font-weight: 600;
          color: #383c40;
          margin-right: 22px;
        }
      }
      .content-number {
        margin-bottom: 14px;
        span {
          font-size: 14px;
          color: #999999;
          margin-right: 28px;
        }
      }
      .content-desc {
        font-size: 14px;
        font-weight: 600;
        color: #999999;
      }
    }
  }
  .teacher-class {
    margin-bottom: 60px;
    h1 {
      line-height: 63px;
      font-size: 19px;
      color: #383c40;
      font-weight: 900;
    }
    .list-content {
      width: 100%;
      .list-box {
        width: 32%;
        box-shadow: 0px 2px 12px 2px #ccc;
        border-radius: 4px;
        cursor: pointer;
        float: left;
        margin-right: 15px;
        margin-bottom: 15px;
      }
      .list-img {
        width: 100%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .desc {
        color: #403b38;
        font-size: 14px;
        line-height: 23px;
        padding-bottom: 10px;
        border-bottom: 1px #ececec solid;
        font-weight: 600;
        span {
          width: 35px;
          height: 17px;
          line-height: 19px;
          background: #e82f27;
          color: #fff;
          font-size: 12px;
          text-align: center;
          display: inline-block;
          margin-right: 8px;
        }
      }
      .people-price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        .people {
          font-size: 12px;
          color: #9fa4ac;
        }
        .price {
          font-size: 14px;
          font-weight: 800;
          color: #e95229;
        }
      }
    }
  }
  .teacher-evaluate {
    border: 1px #e5e5e5 solid;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 15px;
    h2 {
      line-height: 43px;
      font-size: 16px;
      font-weight: 600;
      color: #000;
      border-bottom: 1px #eeeeee solid;
    }
    .evaluate-box {
      width: 100%;
      padding: 15px 0 8px;
      ul {
        width: 100%;
        box-sizing: border-box;
        .stu-msg {
          width: 50%;
          border-bottom: 1px #f3f3f3 solid;
          padding: 10px;
          float: left;
        }
        .stu-msg:last-child {
          border: none;
        }
        .stu-name {
          width: 86%;
          .name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            & > span:first-child {
              color: #776e69;
              font-size: 12px;
            }
            & > span:last-child {
              color: #bab9b9;
              font-size: 12px;
            }
          }
          .tag {
            color: #a1a1a1;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
