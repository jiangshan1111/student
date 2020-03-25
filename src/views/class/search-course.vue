<template>
  <div>
    <div class="wraper" style="width:83.33%;margin:0 auto">
      <div class="head">
        <h1>全部课程</h1>
        <div class="search">
          <input type="text" id="classPackageName" @keyup.13="searchClass(1)" v-model="course_name" placeholder="输入课程名称" />
          <i class="iconfont" id="searchBtn" @click="searchClass(1)"></i>
        </div>
      </div>
      <div class="list-wrap">
        <div class="list">
          <div class="label">
            学科 ：
          </div>
          <ul class="itm-wrap clear" id="oneLevel">
            <li @click="activea(item.pse_id)" v-for="(item, i) in projects" :key="i" :class="activeIndexa == item.pse_id ? 'active' : ''">{{ item.pse_name }}</li>
          </ul>
        </div>
        <div class="list">
          <div class="label">
            课程 ：
          </div>
          <ul class="itm-wrap clear" id="oneLevel">
            <li @click="activeb('')" :class="activeIndexb == '' ? 'active' : ''">全部</li>
            <li @click="activeb(item.pse_id)" v-for="(item, i) in kemus" :key="i" :class="activeIndexb == item.pse_id ? 'active' : ''">{{ item.pse_name }}</li>
          </ul>
        </div>
        <div class="list">
          <div class="label">
            授课方式 ：
          </div>
          <ul class="itm-wrap clear" id="oneLevel">
            <li @click="activec('')" :class="activeIndexc == '' ? 'titPtop active' : 'titPtop'" ids="all">全部</li>

            <li @click="activec('直播')" :class="activeIndexc == '直播' ? 'titPtop active' : 'titPtop'" ids="live">直播</li>
            <li @click="activec('录播')" :class="activeIndexc == '录播' ? 'titPtop active' : 'titPtop'" ids="video">录播</li>
            <li @click="activec('直播,录播')" :class="activeIndexc == '直播,录播' ? 'titPtop active' : 'titPtop'" ids="face">混合</li>
          </ul>
        </div>
      </div>

      <div class="class li-defind">
        <div class="title orderBy" style="display:flex;align-items:center;padding-left:10px;">
          <ul class="clear">
            <li @click="actived(1)" :class="activeIndexd == 1 ? 'active order-by' : 'order-by'" data-type="b.create_time">最新</li>
            <li @click="actived(2)" :class="activeIndexd == 2 ? 'active order-by' : 'order-by'" data-type="total_count">最热</li>
            <li @click="actived(3)" :class="activeIndexd == 3 ? 'active order-by' : 'order-by'" data-type="total_count">综合</li>
          </ul>
        </div>

        <div id="loadData" class="row">
          <div class="content-wrap">
            <ul class="class-list classfind-list clear">
              <li class="col-lg-3" style="padding:0" v-for="(item, index) in kcs" :key="index" @click="goCourse(item)">
                <div class="parcel-box">
                  <div class="picture" :style="'background-image:url(' + item.cover + ')'"></div>
                  <div>
                    <div class="stageMove">
                      <h5>{{ item.course_name }}</h5>
                      <p class="stage-con">{{ item.course_describe }}</p>
                    </div>

                    <div class="stage-price">
                      <div class="allsta-bot">
                        <div class="clear">
                          <span class="rmb fl">
                            <!--V6.7 添加隐藏定价和不对外售卖-->

                            <strong>{{ item.special_price == 0 ? '免费' : '￥' + item.special_price }}</strong>
                          </span>

                          <span class="people fr"
                            ><i class="iconfont"></i><em>{{ item.rs }}</em></span
                          >
                        </div>
                        <p class="pattern">
                          授课模式：

                          {{ item.course_type }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="pages">
            <ul class="pagination"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      activeIndexa: 0,
      activeIndexb: '',
      activeIndexc: '',
      activeIndexd: 1,
      pagesize: 10, //    每页的数据
      model: 0,
      value2: '',
      course_name: '',
      projects: [],
      kemus: [],
      kcs: [
        {
          //     "cover": 封面,
          // "course_id": 课程id,
          // "course_describe":课程描述
          // "course_type": 课程类型（直播、录播……）
          // "course_name": 课程名称
          // "special_price": 课程优惠价
          //course_status: "未上架",
          // "price": 课程定价
          // "stu_num": 多少人学习,
          // "course_status":课程状态（招生中、未上架……）
          // "tf_recommended": 是否被推荐（1代表是，2代表否）
        }
      ]
    }
  },
  created() {
    let _this = this
    $(document).ready(function() {
      $('#header').load('header.html')
    })
    this.$axios
      .get('/api/pse/queryAllProjectInfo', '')
      .then((resp) => {
        if (resp.status == 200) {
          this.projects = resp.data
          _this.activeIndexa = _this.projects[0].pse_id
          _this.inita()
          _this.searchClass()
        } else {
          _this.$message.error({
            type: 'info',
            message: '学科内容获取失败' + resp.status,
            // position: 'bottom-left',
            duration: '2000'
          })
        }
      })
      .catch(() => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
  },
  methods: {
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
    searchClass(num) {
      let _this = this
      let obj = {}
      if (num == 1) {
        obj = {
          course_name: _this.course_name
        }
      } else {
        obj = {
          project_id: _this.activeIndexa,
          subject_id: _this.activeIndexb,
          course_type: _this.activeIndexc,
          paixu: _this.activeIndexd
        }
        for (var k in obj) {
          if (obj[k] === '') {
            delete obj[k]
          }
        }
      }
      this.$axios
        .post('/api/stu/Discovery/queryCourse', obj)
        .then((resp) => {
          let data = resp.data
          _this.kcs = data
          for (let k = 0; k < _this.kcs.length; k++) {
            _this.kcs[k].mouse_status = 'false'
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
    goCourse(item) {
      this.$router.push({
        name: 'courseDetail',
        query: {
          course_id: item.course_id
        }
      })
    },
    inita() {
      let _this = this
      this.$axios
        .get('/api/pse/selectSubjectByProject?project_id=' + _this.activeIndexa)
        .then((resp) => {
          console.log(resp)
          let data = resp.data
          _this.kemus = data
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
    activea(num) {
      this.activeIndexa = num
      this.activeIndexb = ''
      this.inita()
      this.searchClass()
    },
    activec(jj) {
      this.activeIndexc = jj
      this.searchClass()
    },
    actived(jj) {
      this.activeIndexd = jj
      this.searchClass()
    },
    activeb(num) {
      this.activeIndexb = num
      this.searchClass()
    }
  }
}
</script>

<style>
.wraper {
  padding-bottom: 50px;
  background: #fff;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
/*头部*/
.head {
  height: 66px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.head h1 {
  position: absolute;
  font-size: 16px;
  color: #474747;
  left: 0;
  bottom: 0;
  line-height: 66px;
}

.search {
  width: 240px;
  height: 28px;
  line-height: 28px;
  position: relative;
  position: absolute;
  right: 0;
  bottom: 15px;
}

.search input {
  width: 100%;
  height: 100%;
  padding: 0 24px 0 10px;
  border-radius: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.search i {
  display: block;
  height: 100%;
  position: absolute;
  right: 6px;
  bottom: 0px;
  cursor: pointer;
}

/*课程列表*/
.list-wrap {
  margin: 20px 0 8px;
}

.list {
  padding-left: 70px;
  position: relative;
  font-size: 12px;
}

.list .label {
  position: absolute;
  width: 70px;
  text-align: right;
  left: 0;
  top: 0;
  color: #949494;
}

.itm-wrap {
  margin-left: 15px;
  color: #666;
}

.itm-wrap li {
  float: left;
  margin: 0px 15px 20px;
}

.itm-wrap li {
  padding: 3px 6px;
  cursor: pointer;
}

.itm-wrap li.active {
  background: #00b7ee;
  color: #fff;
}

.itm-wrap a:link {
  text-decoration: none;
  color: #666;
}

.itm-wrap :hover {
  color: #00b7ee;
  transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
}

.itm-wrap .active:hover {
  background: #00b7ee;
  color: #fff;
}

/*课程内容*/
.class .title {
  height: 40px;
  line-height: 40px;
  color: #616161;
  background: #f9f9f9;
}

.class .title li {
  float: left;
  padding: 0 20px;
  cursor: pointer;
}

.class .title li.active {
  background: #00b7ee;
  color: #fff;
}

.content-wrap .content {
  width: 100%;
}

.content-wrap .content > li {
  margin-top: 20px;
  border-radius: 3px;
  position: relative;
  background: #fff;
  z-index: 1;
  float: left;
  cursor: default;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.class-bg-layer {
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  height: 100%;
  background-color: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  z-index: -1;
}

.class-item-bg {
  width: 100%;
  height: 276px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: #fff;
  padding: 10px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.content-wrap .content > li:hover .class-bg-layer {
  transform: translateY(-6px);
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.4s 0.05s ease;
  -moz-transition: all 0.4s 0.05s ease;
  transition: all 0.4s 0.05s ease;
}

.content-wrap .content > li:hover .class-item-bg {
  transform: translateY(-8px);
  -webkit-transform: translateY(-8px);
  -moz-transform: translateY(-8px);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.content-wrap li .class-item-bg > a {
  display: block;
  width: 100%;
  height: 144px;
}

.content-wrap li img {
  width: 100%;
  height: 144px;
}

.content-wrap li h1 a {
  font-size: 14px;
  line-height: 30px;
  color: #474747;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 260px;
  display: inline-block;
}

.content-wrap li h1 a:hover {
  text-decoration: none;
  color: #00aaff;
}

.content-wrap li p {
  font-size: 12px;
  color: #bbb;
  height: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.info-wrap {
  margin: 10px 0;
}

.left-info li {
  float: left;
  font-size: 12px;
  color: #949494;
  padding-left: 10px;
}

.left-info li:first-child {
  padding-left: 0;
}

.left-info li i {
  margin: 0 10px;
}
.left-info li .border {
  position: relative;
  top: -1px;
}
.people-num {
  color: #bbb;
  font-size: 12px;
}

.price {
  font-size: 14px;
  color: #fe5151;
}

.price.free {
  color: #00b7ee;
}

.list {
  height: 52px;
}
.list-wrap > .list {
  height: auto;
}
.pages {
  margin: 30px 0 0 0;
}
.class .title {
  height: 40px;
  line-height: 40px;
  color: #616161;
}

.class .title li {
  position: relative;
  padding: 0 10px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d9dde1;
  color: #93999f;
  margin: 0 14px 0 0;
  border-radius: 3px;
  float: left;
}
.class .title li.active {
  background: #00b7ee;
  color: #fff;
  border: 1px solid #00b7ee;
}
.class .title li i.active {
  color: #00b7ee;
}
/*显示划线价格的样式*/
.class-item-bg s {
  color: #949494;
}
.class-list {
  /* width: 1200px; */
  margin: 0 auto;
  overflow: hidden;
}

.class-list ul {
  margin: 0 auto;
  margin-right: -20px;
  overflow: hidden;
}

.class-list li {
  position: relative;
  float: left;
  /* width: 285px;
  margin: 9px 20px 11px 0; */
  background-color: #fff;
}
.class-list li:nth-child(4n + 0) {
  margin-right: 0;
}

.class-list li:hover .picture .cancel {
  display: block;
}

.class-list li .c-mark {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px 10px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.8);
  opacity: 0.8 \9;
  filter: alpha(opacity = 80);
}

.class-list li .c-mark a {
  position: relative;
  z-index: 10;
}

.class-list li .c-mark a.oa {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}

.class-list li .c-mark .h3 {
  padding: 10px 0;
  margin-bottom: 10px;
  text-align: center;
  overflow: hidden;
}

.class-list li .c-mark .m-content {
  height: 212px;
  overflow: hidden;
}

.class-list li .c-mark .m-content p {
  color: #333;
  line-height: 1.5;
  font-size: 12px;
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.class-list li .picture {
  position: relative;
  height: 145px;
  overflow: hidden;
}

.class-list li .picture .img {
  width: 100%;
}

.class-list li .picture .cancel {
  display: none;
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px 9px;
  background-color: #000;
  opacity: 0.5 \9;
  filter: alpha(opacity = 50);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  z-index: 99;
}

.class-list .col-3 {
  background-color: #fff;
}

.class-list .picture p {
  margin-bottom: 0;
}

.class-list .infos {
  padding: 2px 0px 10px;
}

.class-list .infos .h5 {
  position: relative;
  height: 32px;
  padding-top: 5px;
  font-size: 14px;
  font-size: 1.4rem;
}

.class-list .infos .h5 a {
  position: relative;
  top: 5px;
  color: #474747;
  font-size: 14px;
}

.class-list .infos .h5 a:hover {
  text-decoration: none;
}

.class-list .infos .h5 .type {
  position: absolute;
  top: 6px;
  right: 0;
  padding: 3px 5px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-size: 12px;
  font-size: 1.2rem;
  font-style: normal;
  color: #949494;
}

.class-list .infos .h5 .type.t1 {
  right: 0;
}

.class-list .infos .h5 .type.t2 {
  right: 40px;
}

.class-list .infos .h5 .type.t3 {
  right: 80px;
}

.class-list .infos p {
  position: relative;
  height: 46px;
  color: #949494;
  line-height: 1.8;
  font-size: 12px;
  font-size: 1.2rem;
  overflow: hidden;
}
.class-list .infos p .vip-pic {
  position: absolute;
  display: inline-block;
  width: 46px;
  height: 46px;
  top: 0;
  right: 0;
  /* background-image: url('../images/leagure/vip_img.png'); */
  background-size: cover;
}

.class-list .class-infos {
  margin-bottom: 0;
}

.class-list .class-infos.class-infos {
  height: 24px;
  padding-top: 2px;
}

.class-list ul li .class-infos .price {
  font-size: 16px;
  color: #fe5151;
}
.class-list .class-infos .price b {
  font-size: 16px;
  color: #fe5151;
  font-weight: normal;
}

.class-list .class-infos .price.free {
  color: #00b7ee;
  font-size: 16px;
  font-size: 1.6rem;
}

.class-list .class-infos .peo {
  position: relative;
  top: 6px;
  float: right;
  color: #bbb;
  font-size: 12px;
  font-size: 1.2rem;
  background-repeat: no-repeat;
  background-position: 0 -314px;
  line-height: 16px;
}
.classfind-list {
  overflow: visible;
}

.classfind-list ul {
  overflow: visible;
}

.classfind-list li {
  float: left;
  /* width: 279px; */
  height: 284px;
  box-sizing: border-box;
  /* margin: 9px 28px 29px 0; */
  position: relative;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(221, 221, 221, 0.7);
}

.classfind-list li:hover {
  -webkit-transform: translateY(0);
  -o-transform: translateY(0);
  -moz-transform: translateY(0);
  transform: translateY(0);

  box-shadow: 0 0 8px 0 rgba(221, 221, 221, 0.7);
}
.classfind-list .col-lg-3 {
  width: 24%;
  margin-right: 1%;
  margin-top: 20px;
}
.classfind-list li:hover .stage-con {
  height: 40px;
  /*padding-top: 5px;*/
}
.classfind-list li:hover .stageMove {
  top: 113px;
}

.classfind-list .mb-none {
  margin-bottom: 0;
}

.classfind-list li .picture {
  height: 154px;
  /*position: relative;*/
  /*overflow:hidden; */
  border-radius: 3px 3px 0 0;
  /* background-image: url('../../../images/overview_demo.jpg'); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.classfind-list .infos .h5 {
  height: auto;
  padding-top: 3px;
}

.classfind-list .class-infos.class-infos {
  padding-top: 0;
  margin-top: 4px;
}

.classfind-list .infos .h5 a {
  top: 0;
}

.classfind-list .infos .h5 .type {
  top: 0;
}

.classfind-list .parcel-box {
  /* width: 279px; */
  height: 284px;
  box-sizing: border-box;
  padding: 0;
  padding-bottom: 20px;
  border: none;
}

.classfind-list .infos {
  padding: 16px 10px 20px;
}

.classfind-list .infos .h5 a {
  color: #14191e;
}

.classfind-list .class-infos .peo .iconfont {
  color: #93999f;
}

.class-list .class-infos .free b {
  color: #07bbee;
}

.classfind-list .infos .h5 .type {
  color: #93999f;
  border-color: #d9dde1;
}

.classfind-list .infos .curintro {
  color: #93999f;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.classfind-list .infos p {
  height: 40px;
  line-height: 1.6;
  margin-top: 9px;
}

.classfind-list ul li .class-infos .price {
  color: #ee1207;
}

.classfind-list .class-infos .peo {
  color: #93999f;
}

.classfind-list .class-infos .showsta {
  color: #07bbee;
  font-size: 16px;
}
.class-list .class-infos .peo .iconfont {
  color: #bbb;
  margin-right: 5px;
}
.class-list img {
  width: 100%;
}
.stage {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
}

.stageMove {
  position: absolute;
  top: 154px;
  left: 0;
  width: 100%;
  height: 110px;
  padding: 0 12px;
  box-sizing: border-box;
  background-image: url(../../assets/images/jiang/gradient.png);
  background-repeat: no-repeat;
  background-position: -1px top;
  background-size: 110% auto;
  transition: top 0.3s ease-in-out;
  cursor: pointer;
}

.stage-price {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 76px;
  padding: 0 12px;
  box-sizing: border-box;
  cursor: pointer;
}

.stageMove h5 {
  margin: 14px 0 0;
  line-height: 21px;
  color: #14191e;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 41px;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -ms-transition: all 0.2s linear;
}
.stageMove h5:hover {
  color: #07bbee;
}
.stageMove .stage-con {
  height: 0;
  padding-top: 5px;
  line-height: 18px;
  color: #93999f;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: all 0.5s ease;
}

.stage .stage-price {
  font-size: 0;
  padding-top: 18px;
}

.stage-price .allsta-bot {
  position: absolute;
  left: 12px;
  bottom: 20px;
  width: 92%;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.stage-price .rmb strong {
  display: inline-block;
  line-height: 16px;
  font-size: 16px;
  color: #07bbee;
  font-weight: normal;
}
.stage-price .rmb b {
  position: relative;
  left: -3px;
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  color: #fe5151;
  font-weight: normal;
}

.stage-price .rmb s {
  display: inline-block;
  font-size: 12px;
  line-height: 12px;
  color: #949494;
  margin-left: 4px;
}

.stage-price .people i {
  position: relative;
  top: 2px;
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  color: #93999f;
}

.stage-price .people em {
  display: inline-block;
  position: relative;
  top: 2px;
  font-size: 12px;
  line-height: 12px;
  margin-left: 7px;
  color: #93999f;
}

.stage-price .pattern {
  font-size: 12px;
  color: #93999f;
  line-height: 1;
  padding-top: 7px;
}
</style>
