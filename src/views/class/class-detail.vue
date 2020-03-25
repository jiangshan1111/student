<template>
  <div>
    <div id="content" class="clear share">
      <!--课程详情信息-->
      <div style="width:75%;margin:0 auto;">
        <div class="crumbs-box">
          <span>课程包：</span>
          <span class="active">{{ class_info.describe }}</span>
        </div>
        <div class="detail-show">
          <div class="buydetail-show-pic" style="width:41.66%;">
            <!-- <img src="http://image.yunduoketang.com/course/34270/20190829/e2386465-dc91-433b-b505-39362d1cb02e.png" alt="" /> -->
            <img :src="class_info.cover" alt="" />
            <p>售后电话：010-60703671</p>
          </div>
          <div class="buydetail-show-content" style="width:58.33%;">
            <div class="top-detail-title">
              <h2>{{ class_info.describe }}</h2>
              <h6>【 阶段{{ class_info.jds }}&nbsp;-&nbsp;课程{{ class_info.kcs }} &nbsp;-&nbsp;学员{{ class_info.rs }}】</h6>
            </div>
            <div class="buy">
              <p class="endtime">课程包有效期至：{{ class_info.effictive_date }}</p>
              <p class="price">
                打包价格<span>￥{{ class_info.favorable_price }}</span>
              </p>
              <div class="immediate-purchase">
                <div class="detail-buy-btn" @click="goOrder">立即购买</div>
                <div class="top-detail-right">
                  <span class="collect"><em class="iconfont"></em><s class="word">收藏 </s></span>
                  <span>分享至</span><b class="iconfont b2 qq-icon"></b>
                  <b class="iconfont b3 weibo-icon"></b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 切换 -->
      <div class="StageChoice" style="width:75%;margin:0 auto;">
        <ul class="clear">
          <li @click="activeIndex(i)" v-for="(item, i) in ['详情', '阶段课程']" :key="i" :class="activeIndexa == i ? 'StateAc' : ''">
            <span class="firstchild">{{ item }}</span>
            <span v-if="i !== ['详情', '阶段课程'].length - 1" class="separator">/</span>
          </li>
        </ul>
      </div>
      <div class="detail-class-content" style="width:75%;margin:0 auto 50px;">
        <detail-content :teachers="teachers" :detailsLeft="class_info.details" v-if="activeIndexa === 0" />
        <class-content :jieduans="jieduans" @changEdit="changEdit" v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      model: 0,
      value2: '',
      stu_id: '',
      kcbRate: 0,
      teachers: [],
      jieduans: [],
      state: 2,
      class_info: {}
    }
  },
  created() {
    let _this = this
    _this.stu_id = _this.$store.state.stu_id
    let obj = {}
    if (_this.stu_id == 0 || _this.stu_id == undefined) {
      obj = {
        course_package_id: this.$route.query.course_package_id
      }
    } else {
      obj = {
        course_package_id: this.$route.query.course_package_id,
        stu_id: _this.stu_id
      }
    }
    this.$axios
      .post('/api/stu/Discovery/queryCoursePackageInfo', obj)
      .then((resp) => {
        let data = resp.data
        _this.class_info = data.kechengbaoxiangqing[0]
        _this.state = data.state
        _this.jieduans = data.jieduan
        for (let i = 0; i < _this.jieduans.length; i++) {
          _this.jieduans[i].kcs = []
          _this.jieduans[i].edit = i === 0 ? true : false
          data.kecheng.map((item) => {
            if (item.stage_id == _this.jieduans[i].stage_id) {
              _this.jieduans[i].kcs.push(item)
            }
          })
        }
        if (_this.class_info.effictive_days_type == '有效天数') {
          _this.class_info.effictive_date = _this.getNowFormatDate(new Date(new Date(_this.class_info.create_time).getTime() + _this.class_info.effictive_days * 24 * 3600 * 1000))
        }
        this.$axios
          .post('/api/stu/Discovery/queryStudentRateOfLearning', {
            course_package_id: this.$route.query.course_package_id,
            stu_id: _this.stu_id
          })
          .then((resp) => {
            let data = resp.data
            _this.kcbRate = Math.floor((data.kcbzjd * 10000) / 100) + '%'
            for (let i = 0; i < _this.jieduans.length; i++) {
              _this.jieduans[i].rate = 0
              for (var k in data.jdzjd) {
                if (k == _this.jieduans[i].stage_id) {
                  _this.jieduans[i].rate = Math.floor((data.jdzjd[k] * 10000) / 100) + '%'
                }
              }
            }
          })
          .catch((err) => {
            _this.$message.error({
              type: 'info',
              message: '服务器错误',
              // position: 'bottom-left',
              duration: '2000'
            })
          })
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
      .post('/api/stu/home/FamousTeacher', {})
      .then((resp) => {
        let data = resp.data
        _this.teachers = data
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
    goOrder() {
      let _this = this
      if (_this.stu_id == 0 || _this.stu_id == undefined) {
        _this.$message.error({
          type: 'info',
          message: '请先登录',
          duration: '2000'
        })
        return
      }
      this.$axios
        .post('/api/order/pay', {
          CPC_id: _this.class_info.course_package_id,
          stu_id: _this.stu_id,
          tf_course: '课程包',
          order_resource: 'PC端'
        })
        .then((resp) => {
          let data = resp.data
          _this.$store.commit('order_update', {
            data: data.data,
            type: '课程包',
            obj: _this.class_info
          })
          _this.$router.push('/orderNext')
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
    change_status(tf_collection) {
      let _this = this
      if (_this.$store.state.stu_id == 0 || _this.$store.state.stu_id == undefined) {
        _this.$message.error({
          type: 'info',
          message: '请先登录',
          // position: 'bottom-left',
          duration: '2000'
        })
        return
      }
      this.$axios
        .post('/api/stu/Discovery/collectionCourse', {
          course_package_id: _this.$route.query.course_package_id,
          stu_id: _this.$store.state.stu_id,
          collection_status: tf_collection == 1 ? 2 : 1
        })
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            _this.class_info.tf_collection = tf_collection == 1 ? 2 : 1
            _this.$message.success({
              type: 'info',
              message: tf_collection == 2 ? '收藏成功' : '取消收藏成功',
              // position: 'bottom-left',
              duration: '2000'
            })
          } else {
            _this.$message.error({
              type: 'info',
              message: '操作失败',
              // position: 'bottom-left',
              duration: '2000'
            })
          }
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
    go_teacher(user_id) {
      window.open('teacherDetail.html?teacher_id=' + user_id)
    },
    activeIndex(num) {
      this.activeIndexa = num
    },
    changEdit(index) {
      console.log(index)
      console.log(this.jieduans[index].edit)
      this.jieduans[index].edit = !this.jieduans[index].edit
      // this.$set(this.jieduans[index], 'edit', !this.jieduans[index])
    }
  },
  mounted() {},
  components: {
    detailContent: () => import('./detail-content.vue'),
    classContent: () => import('./class-content.vue')
  }
}
</script>

<style lang="scss">
.share {
  padding-top: 15px;
  // 头部
  .crumbs-box {
    height: 72px;
    line-height: 72px;
    background: url('../../assets/images/class/titleBg2.png') no-repeat 0 36px;
    span {
      cursor: pointer;
      color: #403b38;
      font-size: 16px;
    }
    span.active {
      color: #007fe1;
    }
  }
  // 中部 课程介绍
  .detail-show {
    padding: 0;
    margin-bottom: 62px;
    display: flex;
    justify-content: space-between;
    .buydetail-show-pic {
      padding-right: 31px !important;
      position: relative;
      height: 235px;
      p {
        color: #a1aab4;
        font-size: 14px;
        position: absolute;
        left: 0;
        bottom: -20px;
      }
      img {
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
    }
    .buydetail-show-content {
      position: relative;
      min-height: 200px;
      height: 235px;
      .top-detail-title {
        color: #474747;
        font-size: 16px;
        h2 {
          font-size: 19px;
          color: #383a40;
          line-height: 29px;
        }
        h6 {
          font-size: 16px;
          color: #767c83;
          line-height: 29px;
        }
      }
      .buy {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .endtime {
          font-size: 14px;
          color: #767c83;
          line-height: 26px;
        }
        .price {
          line-height: 29px;
          font-size: 16px;
          color: #767c83;
          span {
            color: #e95229;
          }
        }
        .immediate-purchase {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .top-detail-right > span {
          font-size: 12px;
          color: #949494;
        }
        .top-detail-right > span em {
          margin-right: 8px;
          color: #f76565;
          cursor: pointer;
        }
        .top-detail-right > span i {
          margin-left: 12px;
          color: #bbb;
        }
        .top-detail-right > s {
          margin: 0 12px;
        }
        .top-detail-right > b {
          margin: 0 7px;
          font-size: 18px;
          color: #c8d8d8;
          cursor: pointer;
          font-weight: inherit;
        }
        .top-detail-right > b.b2:hover {
          color: #00b7ee;
          transition: color 0.3s;
        }
        .top-detail-right > b.b3:hover {
          color: #ff7878;
          transition: color 0.3s;
        }
        .collect {
          margin-right: 20px;
        }
        .collect em.iconfont {
          display: inline-block;
          font-size: 12px;
        }
        .collect s.word {
          display: inline-block;
          text-align: center;
          text-decoration: none;
        }
        .detail-buy-btn {
          width: 118px;
          height: 46px;
          background-color: #359ceb;
          color: #fff;
          font-size: 18px;
          text-align: center;
          line-height: 48px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
}

/* 详情课程切换 */
.StageChoice {
  border-bottom: 1px #e5e5e5 solid;
  ul {
    width: 100%;
    li {
      float: left;
      font-size: 16px;
      color: #767c83;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .separator {
        margin: 0 14px;
      }
    }
    .StateAc {
      .firstchild {
        color: #00b7ee;
        border-bottom: 3px solid #00b7ee;
      }
    }
  }
}
</style>
