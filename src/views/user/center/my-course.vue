<template>
  <div class="content-right my-invite" style="overflow: auto; min-height: 594px;">
    <div class="right-box">
      <div class="my_course">
        <div class="mynote-title">
          我的课程
          <div class="tab"><a href="javascript:void(0)" @click="goNext('/usersCenter/myClassTable')" class="active btn-myclatab">课程表</a></div>
        </div>
        <div class="clear"></div>
        <ul id="info" class="clear" style="min-height: 480px; width: 930px;">
          <li class="fl" style="height: 260px;" v-for="(item, index) in courses" :key="index">
            <div class="coures-box">
              <div class="pic-box">
                <a :href="'/courseDetail?course_id=' + item.course_id" target="_blank">
                  <img alt="" :src="item.cover" />
                </a>
              </div>
              <div class="coures-title">
                <a :href="'/courseDetail?course_id=' + item.course_id" target="_blank">
                  1223（勿选）
                </a>
              </div>

              <div class="state-btn">直播</div>

              <div class="clear"></div>
              <div class="coures-bottom">
                <span class="coures-font fr">3人</span>
                <span class="iconfont fr"></span>
              </div>
            </div>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <input type="hidden" id="userid" value="2338779" />
      <div class="layerContent layerAssignment" style="display: none; z-index: 29891015;"><p style="width: 80%; margin: 0px auto; padding: 10px;">您的个人资料还不完善，完善后才能上课哦。</p></div>
    </div>
    <div class="mask-bg" style="display: none;"></div>
    <div id="bbit-cal-buddle" class="bubble" style="display: none;">
      <div class="alert-cont">
        <div class="alert-title">
          <span>课表</span> <span id="bbit-cal-buddle-timeshow"></span>
          <div id="bubbleClose1" class="bubble-closebutton"></div>
        </div>
        <div class="alert-word"><ul></ul></div>
      </div>
    </div>
    <div class="msg-layer none" style="left: 50%; display: none;">
      <i class="close"></i>
      <div class="msg-title"><h2 class="h5 detailTitle"></h2></div>
      <div class="msg-content"><p class="detailContent"></p></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      courses: []
    }
  },
  created() {
    let _this = this
    this.$axios
      .post('/api/stu/myCourse', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.courses = data.datalist1
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
    activeB(num) {
      this.activeIndexb = num
    }
  }
}
</script>
