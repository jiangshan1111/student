<template>
  <div class="content-right my-invite" style="overflow: auto; min-height: 594px;">
    <div class="right-box">
      <div class="my_course">
        <div class="mynote-title">
          我的课程表
          <div class="tab"><a href="javascript:void(0)" @click="goNext('/usersCenter')" data-url="usersCenter/usersCenter/myClassTable" class="active btn-myclatab">课程</a></div>
        </div>
        <div class="clear"></div>
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{
                data.day
                  .split('-')
                  .slice(1)
                  .join('-')
              }}
              <span
                style="overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;display:block "
                @click="go_course(Cltimes[getNowFormatDate(date).split(' ')[0]][0].course_id)"
                :title="
                  Cltimes[getNowFormatDate(date).split(' ')[0]] == undefined
                    ? ''
                    : getNowFormatDate(new Date(Cltimes[getNowFormatDate(date).split(' ')[0]][0].begin_class_date)).split(' ')[1] +
                      '-' +
                      getNowFormatDate(new Date(Cltimes[getNowFormatDate(date).split(' ')[0]][0].end_time_datess)).split(' ')[1] +
                      '  ' +
                      Cltimes[getNowFormatDate(date).split(' ')[0]][0].ct_name
                "
              >
                {{ Cltimes[getNowFormatDate(date).split(' ')[0]] == undefined ? '' : Cltimes[getNowFormatDate(date).split(' ')[0]][0].ct_name }}
              </span>
              <span
                @click="viewMore(getNowFormatDate(date).split(' ')[0])"
                v-if="Cltimes[getNowFormatDate(date).split(' ')[0]] != undefined && Cltimes[getNowFormatDate(date).split(' ')[0]].length > 1"
                style="
                                color:rgb(210,210,210);display:block"
                >查看更多
              </span>
            </p>
          </template>
        </el-calendar>
        <div class="clear"></div>
      </div>
      <input type="hidden" id="userid" value="2338779" />
      <div class="layerContent layerAssignment" style="display: none; z-index: 29891015;"><p style="width: 80%; margin: 0px auto; padding: 10px;">您的个人资料还不完善，完善后才能上课哦。</p></div>
    </div>

    <div class="mask-bg" :style="model != 0 ? 'display: block' : 'display: none;'"></div>
    <div id="bbit-cal-buddle" class="bubble" :style="model == 1 ? 'display: block' : 'display: none;'">
      <div class="alert-cont">
        <div class="alert-title">
          <span>课表</span>
          <span id="bbit-cal-buddle-timeshow">{{ selected_time }}</span>

          <div id="bubbleClose1" class="bubble-closebutton" @click="model = 0"></div>
        </div>
        <div class="alert-word">
          <ul>
            <li v-for="(item, index) in selected_Cltimes" :key="index" @click="go_course(item.course_id)" style="cursor: pointer" commid="655195">
              <em> {{ getNowFormatDate(new Date(item.begin_class_date)).split(' ')[1] }} - {{ getNowFormatDate(new Date(item.end_time_datess)).split(' ')[1] }}</em>
              <i>&nbsp;&nbsp;</i><i>{{ item.ct_name }}</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      Cltimes: [],
      selected_Cltimes: [],
      selected_time: '',
      model: 0
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
        let obj = {}
        data.datalist2.map((item) => {
          let time = _this.getNowFormatDate(new Date(item.begin_class_date)).split(' ')[0]
          if (obj[time] == undefined) {
            obj[time] = []
            obj[time].push(item)
          } else {
            obj[time].push(item)
          }
        })
        _this.Cltimes = obj
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
    //查看课程表里课次详细信息
    viewMore(date) {
      let _this = this
      _this.selected_time = date
      _this.selected_Cltimes = _this.Cltimes[date]
      _this.model = 1
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
.mask-bg {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000);
  z-index: 999;
}
#bbit-cal-buddle {
  display: none;
  width: 430px;
  height: 220px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -215px;
  margin-top: -110px;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 1000;
  visibility: visible;
  -webkit-box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.3);
}
.alert-title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.alert-word {
  height: 150px;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 10px;
}
.alert-title span {
  margin-right: 10px;
}
.bubble-closebutton {
  position: absolute;
  width: 15px;
  background: url(../../../assets/images/jiang/combined_v40_vr.png) -228px -48px;
  height: 15px;
  top: 15px;
  cursor: pointer;
  right: 10px;
}
.alert-word ul {
  height: 100%;
  overflow: auto;
}
.alert-word ul li {
  line-height: 30px;
  word-break: break-all;
}
</style>
