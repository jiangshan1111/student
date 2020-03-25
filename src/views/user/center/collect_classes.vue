<template>
  <div class="content-right my-invite" style="overflow: auto; min-height: 594px;">
    <div class="right-box">
      <div class="mynote-title">
        我的收藏
        <div class="tab">
          <a href="javascript:;" @click="activeB(1)" :class="activeIndexb == 1 ? 'active' : ''" data-type="class">课程</a>

          <a href="javascript:;" @click="activeB(2)" :class="activeIndexb == 2 ? 'active' : ''" data-type="classPackage">
            课程包
          </a>
        </div>
      </div>
      <div id="content-wrap" class="content-wrap" style="overflow: hidden;" v-if="activeIndexb == 1">
        <div class="order-right-nav">
          <div class="drop-box">
            <div @click="chenge_sc_course(0)" :class="sc_course_lebel == 0 ? 'classify-active order-state fl' : 'order-state fl'" datavalue="all">全部</div>
            <div @click="chenge_sc_course(1)" :class="sc_course_lebel == 1 ? 'classify-active order-state fl' : 'order-state fl'" datavalue="TEACH_METHOD_LIVE">
              直播{{ sc_courses_zb.length == 0 ? '' : '（' + sc_courses_zb.length + '）' }}
            </div>
            <div @click="chenge_sc_course(2)" :class="sc_course_lebel == 2 ? 'classify-active order-state fl' : 'order-state fl'" datavalue="TEACH_METHOD_VIDEO">
              录播{{ sc_courses_lb.length == 0 ? '' : '（' + sc_courses_lb.length + '）' }}
            </div>
            <div @click="chenge_sc_course(3)" :class="sc_course_lebel == 3 ? 'classify-active order-state fl' : 'order-state fl'" datavalue="TEACH_METHOD_FACE">
              混合{{ sc_courses_hh.length == 0 ? '' : '（' + sc_courses_hh.length + '）' }}
            </div>
          </div>
        </div>
        <div class="transline"></div>
        <div class="clear"></div>
        <ul id="info" style="min-height: 480px;margin-top: 0" class="content">
          <li class="fl" style="margin-top: 0" v-for="(item, index) in sc_courses" :key="index">
            <div class="coures-box">
              <div class="cancel-btn" @click="cancel_collection('course', item.course_id)" style="">
                取消收藏
              </div>
              <input class="comStatus" value="1" type="hidden" />
              <input value="1401614" type="hidden" class="ucId" />
              <div class="pic-box">
                <a href="javascript:void(0)" @click="goCourse(item)">
                  <img :src="item.cover" width="100%" height="100%" />
                </a>
              </div>
              <div class="coures-title">
                <a href="javascript:void(0)" @click="goCourse(item)">
                  {{ item.course_name }}
                </a>
              </div>
              <div class="state-btn">{{ item.course_type == '直播,录播' ? '混合' : item.course_type }}</div>
              <div class="clear"></div>
              <div class="coures-bottom">
                <span class="free-course fl">
                  <span class="price">{{ item.special_price == 0 ? '免费' : '￥' + item.special_price + '元' }}</span>
                </span>
                <span class="coures-font fr" style="margin-top: 2px;">
                  {{ item.rs }}

                  人</span
                >
                <span class="iconfont fr"></span>
              </div>
            </div>
          </li>

          <input type="hidden" value="" id="countCondition" />
        </ul>
      </div>
      <div class="content-wrap" v-if="activeIndexb == 2">
        <ul class="content clear">
          <li v-for="(item, index) in sc_course_packages" :key="index">
            <div class="cancel-btn" @click="cancel_collection('courseP', item.course_package_id)" data-id="1401613">取消收藏</div>
            <div class="class-item-bg">
              <a href="javascript:void(0)" @click="goDetail(item.course_package_id)">
                <img :src="item.cover" alt="" />
              </a>

              <h1>
                <a href="javascript:void(0)" @click="goDetail(item.course_package_id)">
                  {{ item.cp_name }}
                </a>
              </h1>

              <p>
                {{ item.describe }}
              </p>

              <div class="info-wrap clear">
                <ul class="left-info fl">
                  <li>
                    阶段<i>{{ item.jds }}</i>
                    <em class="border">|</em>
                  </li>
                  <li>
                    课程<i>{{ item.kcs }}</i>
                  </li>
                </ul>
                <div class="people-num fr">
                  <i class="iconfont"></i>
                  <span>{{ item.rs }}</span>
                </div>
              </div>

              <div class="price">￥{{ item.total_price }}</div>
            </div>
            <div class="class-bg-layer"></div>
          </li>
        </ul>
      </div>
      <div id="rightClassPackageContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 1,
      sc_courses: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_courses_zb: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_courses_lb: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_courses_qb: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_courses_hh: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_course_packages: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      sc_course_lebel: '',
      stu_id: ''
    }
  },
  created() {
    let _this = this //我的收藏
    _this.stu_id = _this.$store.state.stu_id
    this.$axios
      .post('/api/stu/queryMyCourse', {
        stu_id: _this.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.sc_courses = data
        _this.sc_courses_qb = data
        _this.sc_courses_zb = []
        _this.sc_courses_lb = []
        _this.sc_courses_hh = []
        _this.sc_courses.map((item) => {
          if (item.course_type == '直播') {
            _this.sc_courses_zb.push(item)
          } else if (item.course_type == '录播') {
            _this.sc_courses_lb.push(item)
          } else if (item.course_type == '直播,录播') {
            _this.sc_courses_hh.push(item)
          }
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
      .post('/api/stu/queryMyCoursePackage', {
        stu_id: _this.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.sc_course_packages = data
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
    //取消收藏
    cancel_collection(type, id) {
      let _this = this
      // this.$axios
      //   .post('api/stu/cancelFavoriteCourse', {
      //     //这里将axios.get 改为this.$axios.get
      //     // params: {
      //     name: 'aa',
      //     age: 22
      //     // }
      //     // params: JSON.stringify({})
      //   })
      //   .then((resp) => {
      //     console.log(resp)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      if (type == 'course') {
        this.$axios
          .post('/api/stu/cancelFavoriteCourse', {
            stu_id: _this.stu_id,
            course_id: id
          })
          .then((resp) => {
            let data = resp.data
            if (data == 1) {
              _this.$message.success({
                type: 'info',
                message: '取消成功',
                // position: 'bottom-left',
                duration: '2000'
              })
              this.$axios
                .post('/api/stu/queryMyCourse', {
                  stu_id: _this.stu_id
                })
                .then((resp) => {
                  let data = resp.data
                  _this.sc_courses = data
                  _this.sc_courses_qb = data
                  _this.sc_courses_zb = []
                  _this.sc_courses_lb = []
                  _this.sc_courses_hh = []
                  _this.sc_courses.map((item) => {
                    if (item.course_type == '直播') {
                      _this.sc_courses_zb.push(item)
                    } else if (item.course_type == '录播') {
                      _this.sc_courses_lb.push(item)
                    } else if (item.course_type == '直播,录播') {
                      _this.sc_courses_hh.push(item)
                    }
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
            } else {
              _this.$message.error({
                type: 'info',
                message: '取消失败',
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
      } else {
        this.$axios
          .post('/api/stu/cancelFavoriteCoursePackage', {
            stu_id: _this.stu_id,
            course_package_id: id
          })
          .then((resp) => {
            let data = resp.data
            if (data == 1) {
              _this.$message.success({
                type: 'info',
                message: '取消成功',
                // position: 'bottom-left',
                duration: '2000'
              })
              this.$axios
                .post('/api/stu/queryMyCoursePackage', {
                  stu_id: _this.stu_id
                })
                .then((resp) => {
                  let data = resp.data
                  _this.sc_course_packages = data
                })
                .catch((err) => {
                  _this.$message.error({
                    type: 'info',
                    message: '服务器错误',
                    // position: 'bottom-left',
                    duration: '2000'
                  })
                })
            } else {
              _this.$message.error({
                type: 'info',
                message: '取消失败',
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
      }
    },
    //改变收藏课程标签
    chenge_sc_course(num) {
      let _this = this
      _this.sc_course_lebel = num
      switch (_this.sc_course_lebel) {
        case 0:
          _this.sc_courses = _this.sc_courses_qb
          break
        case 1:
          _this.sc_courses = _this.sc_courses_zb
          break
        case 2:
          _this.sc_courses = _this.sc_courses_lb
          break
        case 3:
          _this.sc_courses = _this.sc_courses_hh
          break
        default:
          break
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
    goCourse(item) {
      this.$router.push({
        name: 'courseDetail',
        query: {
          course_id: item.course_id
        }
      })
    },
    goDetail(course_package_id) {
      this.$router.push({
        path: '/classDetail',
        query: {
          course_package_id: course_package_id
        }
      })
    },
    activeB(num) {
      this.activeIndexb = num
    }
  }
}
</script>
