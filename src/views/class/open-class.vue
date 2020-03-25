<template>
  <div class="container-fluid no-padding">
    <section class="headerSwiper">
      <el-carousel trigger="click" height="360px">
        <el-carousel-item>
          <img style="width:100%;height:100%" src="http://image.yunduoketang.com/cycllepic/34270/20181119/81b05d5d-5bf5-4a7b-ae46-b099ba524800.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:100%;height:100%" src="http://image.yunduoketang.com/cycllepic/34270/20181119/2d1185fb-2ea4-4ef7-9741-fb9b2d45f4d8.jpg" alt="" />
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="oC-class-today old-home-today" id="todayopenclass" v-if="todayList.length">
      <div class="articleBox" v-for="(today, index) in todayList" :key="index">
        <div class="clear publicBox">
          <div class="fl publicBut public-But">
            <div class="memberzhuan">
              <span class="limit">今日公开课</span>
              <img src="/images/gkk1_img.png" alt="" />
            </div>
          </div>
          <figure class="fr publicCon">
            <div class="fl zhizhen">
              <!-- <img :src="today.pc_cover"> -->
              <img src="http://image.yunduoketang.com/course/34270/20200114/4e7586ff-7e42-4556-9eee-5168ea80e5b4.jpg" alt="" />
            </div>
            <div class="fr">
              <figcaption id="openclassname" class="zhizhen">{{ today.pc_name }}</figcaption>
              <p class="figText"></p>
              <p class="figTime">{{ filterTime(today.begin_time, today.end_time, '全部时间') }}</p>
            </div>
          </figure>
          <ol class="publicList">
            <li class="active">
              <b></b>
              <time>{{ filterTime(today.begin_time, today.end_time, '开始时间') }}</time>
              <time>{{ filterTime(today.begin_time, today.end_time, '结束时间') }}</time>
              <span>{{ today.pc_name }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section class="oC-near-class" id="nearopencourse" v-if="recentlyList.length">
      <div class="open-class-title">
        <h2>近期公开课</h2>
      </div>
      <div class="near-class-box">
        <div class="near-class-box">
          <ul id="ttwonearopenclass">
            <li class="active" v-for="(rec, i) in recentlyList" :key="i">
              <div class="near-left-box wait">
                <img src="http://image.yunduoketang.com/course/34270/20200114/4e7586ff-7e42-4556-9eee-5168ea80e5b4.jpg" style="cursor:pointer" alt="" />
                <!-- <img :src="rec.pc_cover" style="cursor:pointer" alt=""> -->
              </div>
              <div class="near-right-box">
                <h3 style="cursor:pointer">{{ rec.pc_name }}</h3>
                <div class="date-time">
                  <img src="@/assets/images/jiang/dat_smll.png" alt="" />
                  <span>{{ filterTime(rec.begin_time, rec.end_time, '全部时间') }}</span>
                </div>
                <p class="near-class-desc"></p>
                <div class="clear near-class-but mgt45">
                  <div class="fl today-left">
                    <img src="http://image.yunduoketang.com/headpic/34270/20190515/5257de18-159a-46a2-b1b9-7d936878bb74.jpg" alt="" />
                    <span>
                      <small>主讲：</small>
                      <b>{{ rec.true_name }}</b>
                    </span>
                    <span class="timech"
                      >距离上课：
                      <em>{{ rec.hours }}</em>
                      <b>时</b>
                      <em>{{ rec.minutes }}</em>
                      <b>分</b>
                      <em>{{ rec.seconds }}</em>
                      <b>秒</b>
                    </span>
                  </div>
                  <button class="fr class-button">进入教室</button>
                </div>
              </div>
            </li>
          </ul>
          <div class="moreBut" style="display: none;">
            <button>加载更多 <i class="iconRight"></i></button>
          </div>
        </div>
      </div>
    </section>
    <section class="pastclass-one" v-if="pastTimesClass.length">
      <div class="centerClass pastclass-box">
        <h2 class="pastTitle">往期公开课</h2>
        <div>
          <ul class="clear courseList">
            <li class="fl" v-for="(past, index) in pastTimesClass" :key="index" style="cursor: pointer;">
              <div class="picbox">
                <img src="http://image.yunduoketang.com/course/34270/20190107/e3210a57-7cc6-4d93-863e-ac164f6db0de.jpg" alt="" />
                <!-- <img :src="past.pc_cover"
                                    alt=""> -->
                <!-- <a class="picb" href="javascript:return fasle;"></a> -->
              </div>
              <div class="detailbox">
                <h4 style="cursor:pointer">{{ past.pc_name }}</h4>
                <p class="clear live">
                  <span class="fl liveTime">
                    <img src="@/assets/images/jiang/dat_smll.png" alt="" />
                    <em>{{ filterTime(past.begin_time, past.end_time, '全部时间') }}</em>
                  </span>
                  <b class="fr">主讲：{{ past.true_name }}</b>
                </p>
              </div>
            </li>
          </ul>
          <div class="pages pages-find"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pastTimesClass: [], // 往期公开课
      everyWatch: [], // 大家都在看
      todayList: [], // 今日公开课
      recentlyList: [] // 近日公开课
    }
  },
  created() {
    // 往期
    let _this = this
    this.$axios
      .post('/api/stu/publicClass/pastPublicClass', {})
      .then((resp) => {
        let data = resp.data
        this.pastTimesClass = data
      })
      .catch((err) => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
    // 大家都在看
    this.$axios
      .post('/api/stu/publicClass/everyoneSeePublicClass', {})
      .then((resp) => {
        let data = resp.data
        this.everyWatch = data
      })
      .catch((err) => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
    // 今日公开课
    this.$axios
      .post('/api/stu/publicClass/todayPublicClass', {})
      .then((resp) => {
        let data = resp.data
        this.todayList = data
      })
      .catch((err) => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
    // 近日公开课
    this.$axios
      .post('/api/stu/publicClass/nearPublicClass', {})
      .then((resp) => {
        let data = resp.data
        this.recentlyList = data
        this.getCountDown(this.recentlyList)
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
    getCountDown(arr) {
      let nowtime = new Date().getTime()
      let timeD = null
      this.recentlyList = arr.map((item, i) => {
        timeD = new Date(item.begin_time).getTime() - nowtime
        var dayDiff = Math.floor(timeD / (24 * 3600 * 1000)) //计算出相差天数
        var leave1 = timeD % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        hours = dayDiff * 24 + hours
        item.hours = hours.toString().padStart(2, 0)
        item.minutes = minutes.toString().padStart(2, 0)
        item.seconds = seconds.toString().padStart(2, 0)
        return item
      })
    },
    go_course(course_id) {
      window.open('open_classDetail.html?course_id=' + course_id)
    },
    filterTime(s_time, e_time, type) {
      let s = new Date(s_time)
      let e = new Date(e_time)
      let year = s.getFullYear()
      let mounth = (s.getMonth() + 1 + '').padStart(2, 0)
      let day = (s.getDate() + '').padStart(2, 0)
      let s_hours = (s.getHours() + '').padStart(2, 0)
      let e_hours = (e.getHours() + '').padStart(2, 0)
      let s_minutes = (s.getMinutes() + '').padStart(2, 0)
      let e_minutes = (e.getMinutes() + '').padStart(2, 0)
      switch (type) {
        case '全部时间':
          return `${year}-${mounth}-${day}   ${s_hours}:${s_minutes}-${e_hours}:${e_minutes}`
        case '开始时间':
          return `${s_hours}:${s_minutes}`
        case '结束时间':
          return `${e_hours}:${e_minutes}`
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getCountDown(this.recentlyList)
    }, 1000)
  },
  watch: {
    recentlyList: {
      handler(newval, oldval) {
        let timeout = newval.every((el) => (el.hours && el.minutes && el.seconds) === '00')
        if (timeout) {
          clearInterval(this.timer)
        }
      },
      deep: true
    }
  }
}
</script>

<style>
.pastclass-box {
  padding: 50px 0;
}

.pastclass-one {
  background-color: #f8fafc;
}

.centerClass {
  width: 1200px;
  margin: 0 auto;
}

.centerClass .moreBut {
  margin-top: 40px;
  margin-bottom: 0;
}

.pastclass-box .pastTitle {
  font-size: 28px;
  color: #000;
  line-height: 1;
  text-align: center;
}

/* 鍒嗛〉鎸夐挳 start*/

.pages-find {
  margin-top: 50px;
  margin-bottom: 0;
}

.pages-find li:nth-child(1) {
  display: none;
}

.pages-find li {
  color: #707070;
  border-color: #aaa;
}

.pages-find li a {
  padding: 5px 10px;
  color: #707070;
}

.pages-find li span {
  padding-top: 5px;
  padding-bottom: 5px;
}

.pages-find li:hover,
.pages-find li.active {
  color: #fff;
  border-color: #07bbee;
  background-color: #07bbee;
}

.pages-find li.disabled:hover {
  border-color: #d8d8d8;
}

/* 鍒嗛〉鎸夐挳 end*/

/*杩戞湡鍏紑璇� start*/

.pastclass-box .pastList {
  margin-left: -13px;
  margin-right: -13px;
}

.pastclass-box .pastList li {
  position: relative;
  overflow: hidden;
  width: 280px;
  height: 230px;
  box-sizing: border-box;
  margin: 40px 13px 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.pastList .hoverlive:hover,
.pastList .hoverStart:hover {
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.15);
}

.pastList .hoverExpect:hover {
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.15);
}

.pastList .hoverlive:hover .introMove,
.pastList .hoverStart:hover .introMove {
  z-index: 10;
  top: 68px;
}

.pastList .hoverExpect:hover .introMove {
  z-index: 10;
  top: 68px;
}

.pastList .pastPic {
  width: 280px;
  height: 152px;
  /* background-image: url(../../images/home-tem/256_1.jpg); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.pastList li .introMove {
  position: absolute;
  left: 0;
  top: 152px;
  width: 280px;
  box-sizing: border-box;
  padding: 18px 12px 20px;
  text-align: center;
  /* background-image: url(../../images/openClass/tmbg_img.png); */
  background-position: left top;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.pastList .introMove h4 {
  font-size: 14px;
  color: #333;
  line-height: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-word;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
}

.pastList .introMove h4:hover {
  color: #00aaff;
}
.pastclass-box .courseList {
  margin-left: -13px;
  margin-right: -13px;
}

.pastclass-box .courseList li {
  width: 280px;
  margin: 40px 13px 0;
  box-shadow: 0 2px 8px 0 rgba(124, 144, 164, 0.25);
  background-color: #fff;
}

.courseList .picbox {
  position: relative;
  height: 154px;
  overflow: hidden;
}

.courseList .picbox img {
  display: block;
  width: 100%;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.courseList .picbox img:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}

.picbox .picb {
  position: absolute;
  right: 16px;
  bottom: 8px;
  width: 35px;
  height: 35px;
  background-image: url(../../assets/images/jiang/bofang_but1.png);
  background-repeat: no-repeat;
  background-position: center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.picbox .picb:hover {
  background-image: url(../../assets/images/jiang/bofang_but2.png);
}

.courseList .detailbox {
  padding: 14px 10px;
}

.courseList .detailbox h4 {
  font-size: 14px;
  color: #333;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.courseList .detailbox h4:hover {
  color: #00aaff;
}

.detailbox .live {
  font-size: 12px;
  color: #939ca5;
  line-height: 1;
  margin-top: 26px;
}

.live .liveTime {
  height: 22px;
  line-height: 22px;
  display: flex;
  align-items: center;
}

.detailbox .live em {
  margin-right: 5px;
}

.detailbox .live b {
  font-weight: normal;
  padding-top: 5px;
}

.articleBox {
  width: 1200px;
  margin: 0 auto;
}
.publicBox {
  width: 100%;
  -webkit-box-shadow: 0px 2px 12px 2px #edf1f5;
  -moz-box-shadow: 0px 2px 12px 2px #edf1f5;
  box-shadow: 0px 2px 12px 2px #edf1f5;
  overflow: hidden;
  padding: 12px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin-top: 56px;
}

.publicBut {
  position: relative;
  width: 178px;
  height: 178px;
  background-color: #787d82;
  padding-top: 60px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.publicBut:hover button {
  background-color: #fff;
  color: #787d82;
}

.publicCon {
  width: 986px;
  height: 178px;
}

.publicBut button {
  font-size: 12px;
  color: #f6f6f6;
  background-color: transparent;
  line-height: 12px;
  border: 1px solid #fff;
  padding: 4px 7px;
}

.publicBut span {
  font-size: 24px;
  color: #fff;
  line-height: 24px;
  margin-bottom: 14px;
  display: inline-block;
  width: 100%;
}

.publicCon .fl {
  width: 326px;
  height: 100%;
  overflow: hidden;
}

.publicCon .fl img {
  width: 100%;
}

.publicCon .fr {
  width: 638px;
  height: 100%;
}

.publicCon figcaption {
  font-size: 18px;
  color: #14191e;
  line-height: 48px;
  padding-top: 2px;
}

.publicCon .figText {
  font-size: 12px;
  line-height: 16px;
  color: #93999f;
  max-width: 560px;
  height: 50px;
  overflow: hidden;
}
.near-class-box {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 7px;
}
.near-class-box {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 7px;
}

.near-class-box li {
  margin-bottom: 30px;
  position: relative;
  zoom: 1;
}

.near-class-box li:after {
  clear: both;
  display: block;
  content: '';
}

.near-left-box {
  float: left;
  width: 516px;
  height: 282px;
  overflow: hidden;
}

.near-left-box img {
  width: 100%;
}

.near-right-box {
  float: right;
  width: 684px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #e4ecf3;
  border-left: none;
  height: 282px;
  padding: 4px 42px 0 21px;
}
.near-right-box .date-time {
  display: flex;
  align-items: center;
}
.near-right-box h3 {
  font-size: 24px;
  line-height: 55px;
  color: #333;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.teacher-time {
  padding: 10px 14px;
  background-color: #f7fafc;
}

.teacher-time p {
  font-size: 14px;
  color: #939ca5;
  line-height: 26px;
}

.near-class-desc {
  font-size: 14px;
  line-height: 21px;
  color: #939ca5;
  padding: 15px 0 22px;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  display: flex;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
}

.near-class-but p {
  vertical-align: top;
  font-size: 18px;
  line-height: 18px;
  padding-top: 18px;
}

.near-class-but p img {
  position: relative;
  top: -2px;
}

.near-class-but p em {
  color: #fe5151;
  margin: 0 4px;
}

.near-class-but p i {
  color: #999;
  margin: 0 4px;
}

button.class-button {
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  padding: 10px 14px;
  background-color: #00aaff;
  border-radius: 4px;
  border: none;
}

button.class-button:hover {
  background-color: #009eed;
}
.open-class-title,
.open-class-title h2 {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #333;
  line-height: 28px;
}

.open-class-title {
  padding: 40px 0 33px;
}
.figTime {
  height: 50px;
  line-height: 50px;
  /* border: 1px solid #f6f6f6; */
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 30px;
  background-color: #0af;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
}

.figTime time {
  font-size: 14px;
  color: #07bbee;
  line-height: 14px;
  vertical-align: top;
}

.figTime span {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #07bbee;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
}
.today-left {
  display: flex;
  align-items: center;
}
.today-left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid transparent;
  margin-right: 10px;
}
.near-class-desc {
  font-size: 14px;
  line-height: 21px;
  color: #939ca5;
  padding: 15px 0 22px;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  display: flex;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.mgt45 {
  margin-top: 45px;
}
.publicList {
  position: absolute;
  right: -191px;
  top: 12px;
  min-width: 213px;
}

.publicList li {
  min-width: 235px;
  font-size: 0;
  background-color: #f6f6f6;
  padding: 0 10px 0 5px;
  position: relative;
  margin-bottom: 6px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-transition: all ease 0.2s;
  -moz-transition: all ease 0.2s;
  -ms-transition: all ease 0.2s;
  -o-transition: all ease 0.2s;
  transition: all ease 0.2s;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
}
html body .oC-class-today .publicList .active b,
html body .publicBox .publicList .active b {
  position: absolute;
  top: 0;
  left: -31px;
  width: 0;
  height: 0;
  border: 15.5px solid transparent;
  border-right-color: #0af;
  background-image: none;
}
.publicList li time,
.publicList li span {
  font-size: 12px;
  color: #787d82;
  line-height: 31px;
}

.publicList li span {
  display: inline-block;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}

.publicList li time {
  margin-right: 18px;
}

.publicList li b {
  position: absolute;
  width: 14px;
  height: 31px;
  left: -14px;
  top: 0;
}

.publicList .active {
  background-color: #0af;
  padding-left: 0;
}

.publicList .active time,
.publicList .active span {
  color: #fff;
}

.publicList li:hover {
  -webkit-transform: translateX(-190px);
  -moz-transform: translateX(-190px);
  -ms-transform: translateX(-190px);
  -o-transform: translateX(-190px);
  transform: translateX(-190px);
}

.hideTime {
  visibility: hidden;
}

.publicList li:hover .hideTime {
  visibility: visible;
}

.publicList .active:hover {
  -webkit-transform: translateX(-190px);
  -moz-transform: translateX(-190px);
  -ms-transform: translateX(-190px);
  -o-transform: translateX(-190px);
  transform: translateX(-190px);
}

.publicList .on {
  padding-left: 10px;
}

.publicList .on img {
  width: 13px;
  height: 15px;
  vertical-align: top;
  position: relative;
  top: 7px;
  margin-right: 28px;
}
</style>
