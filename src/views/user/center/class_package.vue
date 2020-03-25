<template>
  <div class="content-right class-package">
    <div class="box">
      <div class="today-class">
        <div class="mynote-title">今日课程</div>
        <ul class="chapter-stitle">
          <li class="clear now" @click="go_course(item.course_id)" v-for="(item, index) in jinri" @mouseover="hover_index(index)" @mouseout="w_hover_index(index)" :key="index" style="cursor:pointer">
            <span class="left">{{ item.cp_name }}-{{ item.course_name }}-{{ item.ct_name }}</span>
            <span class="right">
              <i class="time"
                >{{
                  getNowFormatDate(new Date(item.begin_class_date))
                    .split(' ')[1]
                    .substring(0, 5)
                }}-{{
                  getNowFormatDate(new Date(item.end_time_datess))
                    .split(' ')[1]
                    .substring(0, 5)
                }}</i
              >
              <span class="state now clear" v-if="item.edit == false">
                <button>进入教室</button>
              </span>
              <span class="state soon" v-if="item.edit == true">
                <i class="icon">&nbsp;</i>
                <i>
                  {{ new Date(item.begin_class_date) > new Date() ? '即将开始' : new Date(item.end_time_datess) > new Date() ? '正在进行' : '已经结束' }}
                </i>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="class-bag class-bag-my">
        <div class="mynote-title">我的课程包</div>
        <div id="loadData">
          <ul class="list">
            <li class="clear cpdLi" v-for="(item, index) in coursePackages" :key="index" id="14644">
              <a :href="'/classDetail?course_package_id=' + item.course_package_id" class="pic-wrap">
                <img :src="item.cover" alt />
              </a>
              <div class="word">
                <h1>
                  <a :href="'/classDetail?course_package_id=' + item.course_package_id">{{ item.cp_name }}</a>
                </h1>

                <p v-html="item.details"></p>
                <div class="progress clear">
                  <div class="exp-txt fl">
                    <span>学习进度</span>
                  </div>
                  <span class="exp-per">{{ Math.floor(item.kcbzjd * 10000) / 100 }}%</span>
                  <div class="exp-bar fl">
                    <span class="progress-inner exp-bar14644" :style="'width:' + Math.floor(item.kcbzjd * 10000) / 100 + '%;'"></span>
                  </div>
                </div>
                <div class="info clear">
                  <ul class="clear">
                    <li>
                      阶段
                      <i>{{ item.stage_num }}</i>
                    </li>
                    <li>
                      课程
                      <i>{{ item.course_num }}</i>
                    </li>
                    <li>
                      学员
                      <i>{{ item.rs }}</i>
                    </li>
                  </ul>

                  <div v-if="item.mingri == true" class="label">明日有课</div>
                  <div v-if="item.jinri == true" class="label today">今日有课</div>
                </div>
                <button class="leancp" data-id="14644" @click="goDetail(item.course_package_id)">进入学习</button>
              </div>
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
      activeIndexa: 2,
      activeIndexb: 0,
      //我的课程包相关
      today_course: {},
      jinri: [],
      mingri: [],
      //我的课程包
      coursePackages: [],
      //今日课程
      todays: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        }
      ]
    }
  },
  created() {
    this.todays.map((item) => {
      item.edit = true
    })
    let _this = this
    this.$axios
      .post('/api/stu/myCoursePackage', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.coursePackages = data
        _this.jinri = data[data.length - 1].jinri
        _this.mingri = data[data.length - 1].mingri

        _this.coursePackages.length = _this.coursePackages.length - 1
        _this.coursePackages.map((item1) => {
          item1.jinri = false
          item1.mingri = false
          _this.jinri.map((item) => {
            if (item1.course_package_id == item.course_package_id) {
              item1.jinri = true
              item.edit = true
            }
          })
          _this.mingri.map((item) => {
            if (item1.course_package_id == item.course_package_id) {
              item1.mingri = true
            }
          })
        })
      })
  },
  methods: {
    activeA(num) {
      this.activeIndexa = num
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
    //今日课程移入移出
    hover_index(index) {
      let arr = JSON.parse(JSON.stringify(this.jinri))
      arr.map((item, i) => {
        if (index == i) {
          item.edit = false
        }
      })
      this.jinri = arr
    },
    //今日课程移入移出
    w_hover_index(index) {
      let arr = JSON.parse(JSON.stringify(this.jinri))
      arr.map((item, i) => {
        if (index == i) {
          item.edit = true
        }
      })
      this.jinri = arr
    },
    activeB(num) {
      this.activeIndexb = num
    },
    goDetail(course_package_id) {
      this.$router.push({
        path: '/classDetail',
        query: {
          course_package_id: course_package_id
        }
      })
    }
  }
}
</script>
<style lang="scss">
.class-package {
  font-family: 'Microsoft Yahei';
  font-size: 14px;
  min-height: 0 !important;
  padding-bottom: 10px;
  .content-box {
    margin-top: 20px;
  }

  .content-right .box {
    margin-left: 40px;
    width: 860px;
    height: auto;
  }

  .content-right .mynote-title {
    margin-top: 10px;
    line-height: 35px;
    font-size: 18px;
    color: #474746;
    border-bottom: 1px solid #e2e2e4;
  }

  .chapter-stitle {
    padding: 10px 0 0;
  }

  .chapter-stitle li {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #474747;
    font-size: 14px;
    padding: 0 26px 0 4px;
    cursor: pointer;
    -webkit-transition: background 0.5s ease;
    -moz-transition: background 0.5s ease;
    -o-transition: background 0.5s ease;
    transition: background 0.5s ease;
  }
  #loadData {
    max-height: 402px;
    overflow-y: auto;
  }
  .chapter-stitle li:last-child {
    margin-bottom: 10px;
  }

  .chapter-stitle li:hover {
    background: #f4f4f4;
    cursor: default;
  }

  .chapter-stitle .left {
    float: left;
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chapter-stitle .coursname {
    margin-left: 10px;
  }

  .chapter-stitle .right {
    float: right;
    font-size: 0;
  }

  .chapter-stitle .right i {
    float: left;
    color: #adadad;
    font-size: 12px;
  }

  .chapter-stitle .right i.time {
    margin-left: 20px;
    height: auto;
    line-height: 40px;
  }

  .chapter-stitle li a {
    padding: 0 20px 0 12px;
    font-size: 14px;
    cursor: default;
  }

  .chapter-stitle li.point a {
    padding: 0 20px 0 12px;
    font-size: 14px;
    cursor: pointer;
  }

  .chapter-stitle li .state {
    display: inline-block;
    vertical-align: middle;
  }

  .chapter-stitle li .state i {
    margin-left: 12px;
    font-size: 14px;
  }

  .chapter-stitle li .state i.icon {
    padding: 0 8px;
  }

  .chapter-stitle li .state.now i {
    color: #00b7ee;
  }

  .chapter-stitle li .state.soon i {
    color: #ff4e00;
  }

  .chapter-stitle li .state.begin i {
    color: #39cd9c;
  }

  .chapter-stitle li .state.end i {
    color: #949494;
  }

  .chapter-stitle button {
    width: 78px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    font-size: 14px;
    margin-left: 20px;
    border-radius: 3px;
    padding: 0;
    border: 0;
    vertical-align: middle;
    background: #00b7ee;
  }

  .list > li {
    padding: 30px 0;
    border-bottom: 1px solid #f3f3f3;
  }

  .list > li:last-child {
    border-bottom: 0;
  }

  .list a.pic-wrap {
    display: block;
    float: left;
    width: 240px;
    height: 132px;
  }

  .list a.pic-wrap img {
    width: 100%;
    height: 100%;
  }

  .word {
    width: 620px;
    height: 132px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px;
    float: left;
    position: relative;
    cursor: default;
  }

  .word h1 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .word h1 a {
    font-size: 14px;
    color: #474747;
    word-wrap: break-word;
  }

  .word p {
    color: #bbb;
    font-size: 12px;
    line-height: 24px;
  }

  .info {
    position: absolute;
    left: 15px;
    bottom: 0;
  }

  .info ul {
    float: left;
    margin-top: 5px;
  }

  .info li {
    float: left;
    font-size: 12px;
    line-height: 12px;
    color: #949494;
    margin-right: 10px;
    border-right: 1px solid #d8d8d8;
  }

  .info li:last-child {
    border-right: 0;
  }

  .info li.next-class {
    color: #bbb;
  }

  .info li i {
    color: #fe5151;
    margin: 0 10px;
  }
  html body .content-right .info li i {
    color: #0af;
  }
  html body .content-right .word .progress .exp-per {
    color: #0af;
  }
  html body .content-right .word .progress .progress-inner {
    background-color: #0af;
  }
  .info .label {
    float: left;
    width: 70px;
    height: 20px;
    line-height: 17px;
    background: #ff9f16;
    color: #fff;
    text-align: center;
    margin-right: 20px;
  }

  .info .label.today {
    background: #f76565;
  }

  .word button {
    position: absolute;
    right: 15px;
    bottom: 0;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    padding: 0;
    border: 0;
    background: #00b7ee;
    color: #fff;
  }

  .progress {
    height: 28px;
    margin-top: 15px;
    width: 215px;
    position: absolute;
    left: 15px;
    bottom: 15px;
  }
  .progress {
    height: 20px;
    margin-bottom: inherit;
    overflow: inherit;
    /* line-height: 2; */
    background-color: inherit;
    border-radius: 0;
    -webkit-box-shadow: inherit;
    box-shadow: inherit;
  }
  .progress .exp-txt {
    margin-top: -7px;
    margin-right: 20px;
    color: #949494;
  }

  .progress .exp-per {
    color: #f76565;
    position: absolute;
    bottom: 30px;
    left: 68px;
  }

  .progress .exp-time {
    font-size: 14px;
    color: #949494;
  }

  .progress .exp-bar {
    height: 5px;
    width: 134px;
    border-radius: 5px;
    background: #f2f1f1;
    position: relative;
    overflow: hidden;
  }

  .progress-inner {
    display: inline-block;
    height: 100%;
    border-radius: 5px 0 0 5px;
    -moz-border-radius: 5px 0 0 5px;
    -webkit-border-radius: 5px 0 0 5px;
    background: #f76565;
    position: absolute;
    left: 0;
    top: 0;
  }

  .info .details {
    background-color: #fff;
    color: #00b7ee;
    cursor: pointer;
  }

  .info .details a {
    background-color: #fff;
    color: #00b7ee;
  }

  .progress .exp-bar {
    height: 7px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    position: relative;
    background: #f2f1f1;
    overflow: hidden;
  }
}
</style>
