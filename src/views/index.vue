<template>
  <div class="homePage">
    <!-- 大轮播图 -->
    <section class="introduceBanner">
      <el-carousel trigger="click" height="430px">
        <el-carousel-item v-for="(ban, index) in bannerImgs" :key="index">
          <img style="width:100%;height:100%" :src="ban" alt="" />
        </el-carousel-item>
      </el-carousel>
    </section>
    <!-- 推荐班型 -->
    <section class="inner pub-type">
      <div class="pub-title">
        <div class="rec-title">
          <h4>推荐班型</h4>
          <span>RECOMMEND TYPE</span>
        </div>
        <a class="view-more" @click="more('推荐班型')">查看更多 >></a>
      </div>
      <ul class="classList recommend-class pub-box">
        <li class="recommend-child-left" @click="go_type_detail('推荐班型', recommendedClass[0].course_package_id)" v-if="recommendedClass[0]">
          <h4 class="listImg">
            <img src="http://image.yunduoketang.com/course/34270/20190829/acafc7f6-a1a7-4d27-b4b3-00910b90d095.png" alt />
            <!-- <img :src="recommendedClass[0].cover" alt /> -->
          </h4>
          <div class="left-middle">
            <h4>{{ recommendedClass[0].cp_name }}</h4>
            <h6>
              阶段{{ recommendedClass[0].jds }}
              <span style="display:inline-block;margin:0 5px;width:4px;height:4px;background:#666666;border-radius:50%;vertical-align:middle;"></span>
              课程{{ recommendedClass[0].kcs }}
            </h6>
          </div>
          <div class="left-bottom">
            <div>
              <img src="@/assets/images/index/class-user.png" alt="" />
              &nbsp;
              <span class="user">{{ recommendedClass[0].rs }}</span>
            </div>
            <div class="price">￥{{ recommendedClass[0].favorable_price }}</div>
          </div>
        </li>
        <li class="recommend-child-right">
          <div class="right-box" style="position:absolute;top:0;left:0;" v-if="recommendedClass[1]" @click="go_type_detail('推荐班型', recommendedClass[1].course_package_id)">
            <img :src="recommendedClass[1].cover" alt="" class="right-img" />
            <div class="right-desc">
              <h4>{{ recommendedClass[1].cp_name }}</h4>
              <h6>
                阶段{{ recommendedClass[1].jds }}
                <span style="display:inline-block;margin:0 5px;width:4px;height:4px;background:#666666;border-radius:50%;vertical-align:middle;"></span>
                课程{{ recommendedClass[1].kcs }}
              </h6>
              <div class="right-desc-bottom">
                <div>
                  <img src="@/assets/images/index/class-user.png" alt="" />
                  &nbsp;
                  <span class="user">{{ recommendedClass[1].rs }}</span>
                </div>
                <div class="price">￥{{ recommendedClass[1].favorable_price }}</div>
              </div>
            </div>
          </div>
          <div class="right-box" style="position:absolute;bottom:0;left:0;" v-if="recommendedClass[2]" @click="go_type_detail('推荐班型', recommendedClass[2].course_package_id)">
            <img :src="recommendedClass[2].cover" alt="" class="right-img" />
            <div class="right-desc">
              <h4>{{ recommendedClass[2].cp_name }}</h4>
              <h6>
                阶段{{ recommendedClass[2].jds }}
                <span style="display:inline-block;margin:0 5px;width:4px;height:4px;background:#666666;border-radius:50%;vertical-align:middle;"></span>
                课程{{ recommendedClass[2].kcs }}
              </h6>
              <div class="right-desc-bottom">
                <div>
                  <img src="@/assets/images/index/class-user.png" alt="" />
                  &nbsp;
                  <span class="user">{{ recommendedClass[2].rs }}</span>
                </div>
                <div class="price">￥{{ recommendedClass[2].favorable_price }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- 推荐课程 -->
    <section class="inner pub-type">
      <div class="pub-title">
        <div class="rec-title">
          <h4>推荐课程</h4>
          <span>RECOMMEND CLASS</span>
        </div>
        <a class="view-more" @click="more('推荐课程')">查看更多 >></a>
      </div>
      <ul class="pub-box recommend-curriculum">
        <li @click="go_type_detail('推荐课程', courses.course_id)" v-for="(courses, coursesI) in recommendedCourses" :key="coursesI">
          <h4 class="listImg">
            <!-- <img src="http://image.yunduoketang.com/course/34270/20190829/acafc7f6-a1a7-4d27-b4b3-00910b90d095.png" alt /> -->
            <img :src="courses.cover" alt="" />
            <!-- <span class="people">
              <i class="iconfont"></i>
              <img src="@/assets/images/index/curriculum-user.png" alt="" />
              <span>{{ cour.people }}</span>
            </span> -->
          </h4>
          <div class="listDesc">
            <p>{{ courses.course_name }}</p>
          </div>
          <div class="listCon">
            <div>
              <img src="@/assets/images/index/class-user.png" alt="" />
              <span class="classname">
                {{ courses.rs }}
              </span>
            </div>
            <small class="classmoney"> ￥{{ courses.price }} </small>
          </div>
          <!-- <hr class="hLine" /> -->
        </li>
      </ul>
      <!-- <div class="moreBut">
        <button @click="$router.push('/searchClasses')">查看更多</button>
      </div> -->
    </section>
    <!-- 名师专区 -->
    <section class="inner pub-type famous-teacher">
      <div class="pub-title">
        <div class="rec-title">
          <h4>名师专区</h4>
          <span>ABOUT TEACHER</span>
        </div>
        <a class="view-more" @click="more('名师专区')">查看更多 >></a>
      </div>
      <div class="tea-swiper">
        <el-carousel type="card" height="386px" :autoplay="false" @click.native="go_type_detail('名师专区')" ref="teacarousel">
          <el-carousel-item v-for="(tea, teaI) in famousTeacher" :key="teaI">
            <div class="teacher-desc">
              <img src="@/assets/images/index/teacher.png" v-if="tea.head.indexOf('E:/') !== -1 || tea.head.length < 2" class="teacher-img" alt="" />
              <img :src="tea.head" alt="" class="teacher-img" v-else />
              <h5>{{ tea.true_name }}</h5>
              <div class="ishidden">
                <el-rate class="teacher-star" v-model="teachScoe" disabled show-score text-color="#000" score-template="{value}"></el-rate>
                <!-- <p>火种教育教研组核心成员，课堂诙谐有趣，善于梳理与总结知识点。积极参与教研活动，善于引导学习，秉承“授人以鱼，不如授人以渔的理念在教育的征途上前行</p> -->
                <p>{{ tea.introduction }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <!-- 学员心声 -->
    <section class="inner pub-type students-aspirations">
      <div class="dynamic">
        <div class="pub-title">
          <div class="rec-title">
            <h4>学员心声</h4>
            <span>ABOUT TEACHER</span>
          </div>
          <a class="view-more" @click="more('学员心声')">查看更多 >></a>
        </div>
        <div class="dyheart">
          <ul class="heartshow clearfix">
            <li v-for="(stu, stui) in studentsAspirations" :key="stui">
              <div class="left">
                <img src="http://image.yunduoketang.com/headpic/34270/20190815/7af30d46-05ca-4993-9f6a-5770db5f8b28.png" alt="" />
                <span>{{ stu.stu_name }}</span>
              </div>
              <div class="right">
                <!-- <p>
                  作为火种教育18年的学员，很高兴一次性通过了消防考试，能这么顺利是我自己都没有想到的。非常感谢火种教育，如果没有那么多优秀的老师以及负责任的班主任的话，我是不可能只用半年的时间就通过考试的。在这里我给大家分享一下我自己的备考经验吧，希望能多多少少给大家带去些帮助。1.认真看书。书本是不能丢的，听课前认真看一遍书，等自己再听课的时候就不会什么都听不懂了。2.听课的时候多总结问题。每个学员的问题都不同，自己在听课的时候可以把别人的问题也总结一些，看看自己掌握了没有。3.多做题。不做题是不行的，根本就不知道自己掌握的怎么样，做题可以帮助我们查漏补缺，否则等到了考场，后悔也来不及了。
                </p> -->
                <p>{{ stu.stu_content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 新闻资讯 -->
    <section class="inner pub-type-2">
      <div class="dynamic">
        <div class="dynamicTit clear">
          <h4 class="fl no-margin">新闻资讯</h4>
          <span class="fr seeMore" @click="more('新闻资讯')">查看更多&nbsp;>></span>
        </div>
        <div class="newsArea clear">
          <div class="carousel fl">
            <el-carousel trigger="click" height="308px">
              <el-carousel-item
                class="newlist-left"
                v-for="(newsImg, newsImgI) in newsImgList"
                :key="newsImgI"
                style="background-image: url(http://image.yunduoketang.com/news/34270/20190829/0a896b4a-ccc0-4dda-8798-ce4279e19553.jpg);"
              >
                <p class="pictintro">{{ newsImg.title }}</p>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="newsintro fr">
            <ul>
              <li v-for="(news, newsI) in newsAndInformation" :key="newsI" @click="go_type_detail('新闻资讯', news.news_id)">
                <div class="newlist">
                  <div class="dian"></div>
                  <p class="newlist-title clear">
                    <span class="title fl">{{ news.news_title }}</span>
                    <!-- <span class="time fr 1">2019-12-24</span> -->
                  </p>
                  <!-- <p class="newlist-desc 1">现在，火种交给你们一个10月秘密任务，赢取丰厚奖品！活动详情可在“消防学习中心”10月15日推文可见</p> -->
                  <p class="newlist-desc" v-html="news.news_content">现在，火种交给你们一个10月秘密任务，赢取丰厚奖品！活动详情可在“消防学习中心”10月15日推文可见</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- 问答社区 -->
    <section class="inner pub-type-2 question">
      <div class="question-box">
        <div class="dynamic">
          <div class="dynamicTit clear">
            <h4 class="fl no-margin">问答社区</h4>
            <span class="fr seeMore" @click="more('问答社区')">查看更多&nbsp;>></span>
          </div>
          <div class="dynamicBox clear">
            <ul>
              <li data-id="45727" v-for="(question, questioni) in questionAnsweringCommunity" :key="questioni" @click="go_type_detail('问答社区', question.questions_id)">
                <div class="answerque clear">
                  <p class="fl courque">
                    <i class="ding"></i>
                    <em v-html="question.content"></em>
                  </p>
                  <p class="fr feedback">
                    <span
                      ><i>{{ question.hds }}</i
                      >回答</span
                    >
                    <span
                      ><i>{{ question.visit_num }}</i
                      >浏览</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="dynamic">
          <div class="dynamicTit clear">
            <h4 class="fl">学员动态</h4>
          </div>
          <div class="dynamicBox clear">
            <ul class="fl">
              <li v-for="(stu, stui) in studentDynamics" :key="stui">
                <div class="dynamicNext clear">
                  <p class="portrait fl defaultphoto" v-if="stu.head.indexOf('E:/') !== -1 || stu.head.length < 5" data-uid="1913168"></p>
                  <p class="portrait fl" data-uid="2322504" v-else :style="{ 'background-image': 'url(' + stu.head + ')' }"></p>
                  <div class="studetail fl">
                    <h5>{{ stu.tel }}</h5>
                    <p>
                      <i>{{ stu.ct_name ? '学习课程' : '登录网校' }}</i
                      ><em></em>
                    </p>
                  </div>
                  <b class="fr">{{ getNowFormatDate(stu.last_class_time) }}</b>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      domain: 'http://192.168.10.166:8080',
      bannerImgs: [
        'http://image.yunduoketang.com/cycllepic/34270/20190829/c2881449-2150-4da8-b7de-64ea38c3d2fc.jpg',
        'http://image.yunduoketang.com/cycllepic/34270/20190829/57b13a75-a54e-4c4f-8a6c-00370c157132.jpg',
        'http://image.yunduoketang.com/cycllepic/34270/20190829/0b2127ea-6025-487c-a75c-7d55a0c86479.jpg',
        'http://image.yunduoketang.com/cycllepic/34270/20190829/90629ab8-5b7f-4590-9909-a3ccf4411cbd.jpg',
        'http://image.yunduoketang.com/cycllepic/34270/20190829/c2881449-2150-4da8-b7de-64ea38c3d2fc.jpg',
        'http://image.yunduoketang.com/cycllepic/34270/20190829/57b13a75-a54e-4c4f-8a6c-00370c157132.jpg'
      ],
      recommendedClass: [], // 推荐班型
      recommendedCourses: [], // 推荐课程
      famousTeacher: [], // 名师专区
      studentsAspirations: [], // 学员心声
      newsAndInformation: [], // 新闻资讯
      newsImgList: [], // 新闻资讯轮播图
      questionAnsweringCommunity: [], // 问答社区
      studentDynamics: [], // 学生动态
      teachScoe: 5
    }
  },
  created() {
    console.log(process.env)
    // 推荐班型
    axios.get(this.domain + '/stu/home/RecCoursePackage').then((res) => {
      if (res.status === 200) {
        this.recommendedClass = res.data
      }
    })
    // 推荐课程
    axios.get(this.domain + '/stu/home/RecCourse').then((res) => {
      if (res.status === 200) {
        this.recommendedCourses = res.data.slice(0, 4)
      }
    })
    // 名师专区
    axios.get(this.domain + '/stu/home/FamousTeacher').then((res) => {
      if (res.status === 200) {
        this.famousTeacher = res.data
      }
    })
    // 学员心声
    axios.get(this.domain + '/stu/home/StudentVoice').then((res) => {
      if (res.status === 200) {
        this.studentsAspirations = res.data
      }
    })
    // 新闻资讯
    axios.get(this.domain + '/stu/home/newsInfo').then((res) => {
      if (res.status === 200) {
        // 新闻资讯
        this.newsAndInformation = res.data
          .map((el) => {
            let year = new Date(el.create_time).getFullYear()
            let month = (new Date(el.create_time).getMonth() + 1 + '').padStart(2, '0')
            let day = new Date(el.create_time).getDate()
            el.create_time = [year, month, day]
            return el
          })
          .slice(0, 4)
        // 新闻资讯轮播图
        this.newsImgList = res.data.map((el) => {
          return {
            img: el.news_cover,
            title: el.news_title
          }
        })
      }
    })
    // 问答社区
    axios.get(this.domain + '/stu/home/answer').then((res) => {
      if (res.status === 200) {
        this.questionAnsweringCommunity = res.data.slice(0, 5)
      }
    })
    // 学生动态
    axios.get(this.domain + '/stu/home/studentInfo').then((res) => {
      if (res.status === 200) {
        this.studentDynamics = res.data.slice(0, 4)
      }
    })
  },
  mounted() {
    // 即将开始模块js控制内容高度
    // function beginHeight() {
    //   let pubH = $('#begin .begin-left').outerWidth(true)
    //   $('#begin .begin-middle').height(pubH + 'px')
    //   $('#begin .begin-right').height(pubH + 'px')
    // }
    // beginHeight()
    // $(window).resize(function() {
    //   beginHeight()
    // })
  },
  methods: {
    getNowFormatDate(date) {
      if (!date) {
        return
      }
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
    },
    // 点击各分类的子项进入详情
    go_type_detail(type, id) {
      switch (type) {
        case '推荐班型':
          this.$router.push({
            name: 'classDetail',
            query: {
              course_package_id: id
            }
          })
          break
        case '推荐课程':
          this.$router.push({
            name: 'courseDetail',
            query: {
              course_id: id
            }
          })
          break
        case '名师专区':
          var activeIndex = this.$refs.teacarousel.activeIndex
          this.$store.commit('teacher/SAVETEACHER', this.famousTeacher[activeIndex])
          this.$router.push('/teacher/teacherdetail')
          break
        // case '学员心声':
        //   this.$router.push('/stuStar')
        //   break
        case '新闻资讯':
          this.$router.push({
            path: '/news/newsdetail',
            query: {
              newid: id
            }
          })
          break
        case '问答社区':
          this.$router.push({
            path: '/community/communitydetail',
            query: {
              questions_id: id
            }
          })
          break
      }
    },
    // 查看更多
    more(type) {
      switch (type) {
        case '推荐班型':
          this.$router.push('/searchclass')
          break
        case '推荐课程':
          this.$router.push('/searchCourse')
          break
        case '名师专区':
          this.$router.push('/teacher')
          break
        case '学员心声':
          this.$router.push('/stuStar')
          break
        case '新闻资讯':
          this.$router.push('/news')
          break
        case '问答社区':
          this.$router.push('/community')
          break
      }
    }
  }
}
</script>

<style lang="scss">
.homePage {
  // 头部轮播图
  .introduceBanner {
    width: 100%;
  }
  .inner {
    width: 83.33%;
    margin: 0 auto;
  }
  // 公共模块样式
  .pub-type {
    .pub-title {
      position: relative;
      // border-bottom: 1px solid #ccced0;
      margin-top: 8.2rem;
      .rec-title {
        width: 148px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: -36px;
        margin-left: -74px;
        background: #fff;
        text-align: center;
        background: url('../assets/images/index/titleBg.png') no-repeat 50% 66%;
        background-size: 80%;
        h4 {
          font-size: 33px;
          margin-bottom: 5px;
        }
        span {
          display: block;
          font-size: 12px;
          font-weight: 600;
        }
      }
      .view-more {
        font-size: 18px;
        color: #7d7d7f;
        position: absolute;
        right: 0;
        top: 50%;
      }
    }
    .pub-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        margin-top: 5.75rem;
        box-shadow: 0px 2px 12px 2px #ccc;
        border-radius: 4px;
        cursor: pointer;
        .listImg {
          width: 100%;
          overflow: hidden;
          margin: 0;
          border-radius: 4px;
          img {
            width: 100%;
            display: inline-block;
            transition: 1s all ease 0s;
          }
        }
      }
      .listDesc {
        padding: 14px;
        font-size: 14px;
        line-height: 25px;
        p::before {
          content: '精品';
          width: 38px;
          height: 18px;
          background-color: #e83027;
          color: #fff;
          text-align: center;
          display: inline-block;
          font-size: 12px;
          line-height: 18px;
          margin-right: 10px;
        }
        p {
          border-bottom: 1px #e5e5e5 solid;
          padding-bottom: 5px;
        }
      }
      .listCon {
        display: flex;
        justify-content: space-between;
        padding: 14px;
        .classname {
          font-size: 12px;
        }
        .classmoney {
          font-size: 15px;
          color: #ee1207;
        }
      }
      .stage {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        color: #787d82;
        font-size: 12px;
        padding: 10px 10px;
      }
    }
    // .moreBut {
    //   text-align: center;
    //   margin-top: 3rem;
    //   button {
    //     padding: 12px 46px;
    //     background-color: #fff;
    //     border: 1px solid #eee;
    //     font-size: 14px;
    //     color: #787d82;
    //     box-shadow: 0 0px 12px 2px #edf1f5;
    //   }
    // }
    // .moreBut button:hover {
    //   box-shadow: 0 0px 12px 2px #edf1f5;
    //   background-color: #f8f8f8;
    // }
  }
  // 推荐班型
  .recommend-class {
    li {
      width: 49%;
      position: relative;
      top: 0;
      transition: all 0.5s;
      .listImg img {
        height: 350px;
      }
      // &:hover .listImg img {
      //   transform: scale(1.2);
      // }
      &:hover {
        top: -10px;
        box-shadow: 0px 10px 30px 3px #caced6;
      }
    }
    .recommend-child-left {
      .left-middle {
        box-sizing: border-box;
        padding: 14px 14px 0;
        h4 {
          font-size: 17px;
          color: #000;
          line-height: 30px;
        }
        h6 {
          font-size: 14px;
          color: #989898;
          line-height: 26px;
        }
      }
      .left-bottom {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 14px 10px;
        .user {
          font-size: 12px;
          color: #9fa4ac;
        }
        .price {
          color: #e95229;
          font-size: 15px;
        }
      }
    }
    .recommend-child-right {
      position: relative;
      box-shadow: none !important;
      &:hover {
        top: 0;
        box-shadow: none;
      }
      .right-box {
        height: 49%;
        width: 100%;
        box-shadow: 4px 0px 30px -8px #ccc;
        &:hover {
          box-shadow: 0px 10px 30px 3px #caced6;
        }
        .right-img {
          width: 65%;
          height: 100%;
          float: left;
        }
        .right-desc {
          width: 35%;
          height: 100%;
          float: left;
          box-sizing: border-box;
          padding: 14px;
          position: relative;
          h4 {
            font-size: 17px;
            color: #000;
            line-height: 30px;
          }
          h6 {
            font-size: 14px;
            color: #989898;
            line-height: 26px;
          }
          .right-desc-bottom {
            width: 100%;
            padding: 0 14px 10px;
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            .user {
              font-size: 12px;
              color: #9fa4ac;
            }
            .price {
              color: #e95229;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  // 推荐课程
  .recommend-curriculum li {
    width: 23%;
    position: relative;
    top: 0;
    // .hLine {
    //   width: 0%;
    //   height: 3px;
    //   border-top-color: #383c40;
    //   border-top-width: 3px;
    //   margin: 0;
    //   padding: 0;
    //   position: absolute;
    //   bottom: -6px;
    //   left: 50%;
    //   -webkit-transition: all ease 0.2s;
    //   -moz-transition: all ease 0.2s;
    //   -ms-transition: all ease 0.2s;
    //   -o-transition: all ease 0.2s;
    //   transition: all ease 0.2s;
    //   -webkit-transform-style: preserve-3d;
    //   -webkit-backface-visibility: hidden;
    // }
    // &:hover .hLine {
    //   width: 100%;
    //   transform: translateX(-50%);
    // }
    .listImg {
      position: relative;
      min-height: 159px;
    }
    .listImg .people {
      position: absolute;
      padding: 3px 6px;
      background-color: rgba(0, 0, 0, 0.6);
      font-size: 1rem;
      line-height: 1.2rem;
      top: 10px;
      right: 10px;
      color: #fff;
      * {
        vertical-align: middle;
      }
      img {
        width: 8px;
        margin: 2px;
      }
    }
  }
  // 名师专区
  .famous-teacher {
    .tea-swiper {
      width: 914px;
      margin: 0 auto;
      padding-top: 5rem;
    }
    .teacher-desc {
      width: 100%;
      height: 386px;
      background-color: #fff;
      border: 1px #ccc solid;
      border-radius: 10px;
      padding: 50px;
      box-sizing: border-box;
      text-align: center;
      .teacher-img {
        margin-bottom: 10px;
      }
      h5 {
        font-size: 18px;
        color: #000;
        margin-bottom: 10px;
      }
      .teacher-star {
        margin-bottom: 10px;
      }
      .ishidden p {
        font-size: 16px;
        color: #a9a9a9;
        line-height: 28px;
      }
    }
    // .famousArea {
    //   margin-top: 10.3rem;
    //   display: flex;
    //   justify-content: space-between;
    // }
    // .teachers {
    //   width: 21%;
    //   height: 280px;
    //   background-color: #fff;
    //   background-repeat: no-repeat;
    //   background-position: center;
    //   background-size: cover;
    //   position: relative;
    //   transition: all 0.2s ease;
    //   box-shadow: 0 0 3px 1px rgba(221, 221, 221, 0.75);
    //   border-radius: 4px;
    //   cursor: pointer;
    //   .compr {
    //     position: absolute;
    //     left: 0;
    //     bottom: 0;
    //     width: 100%;
    //     height: 40px;
    //     line-height: 40px;
    //     padding: 0 10px;
    //     border-bottom-left-radius: 4px;
    //     border-bottom-right-radius: 4px;
    //     // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    //     background: rgba(0, 0, 0, 0.5);
    //     strong {
    //       font-weight: normal;
    //       font-size: 16px;
    //       color: #f6f6f6;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //     }
    //     .star {
    //       .teacher-star {
    //         height: 40px;
    //         box-sizing: border-box;
    //         padding-top: 10px;
    //         span {
    //           font-size: 16px;
    //         }
    //       }
    //     }
    //   }
    //   .teacher-img {
    //     width: 155px;
    //     height: 347px;
    //     background: url('../assets/images/index/teacher.png') no-repeat 0 0;
    //     background-size: 100% 100%;
    //     position: absolute;
    //     bottom: -14px;
    //     left: 50%;
    //     margin-left: -85px;
    //   }
    // }
    // .teachers:hover {
    //   z-index: 1;
    //   transform: scale(1.07);
    //   -webkit-transform: scale(1.07);
    //   -moz-transform: scale(1.07);
    //   -ms-transform: scale(1.07);
    //   box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.4);
    // }
  }
  // 学员心声
  .students-aspirations {
    .dynamic {
      background-color: #fff;
      .dyheart {
        width: 100%;
        padding-top: 100px;
      }
      .heartshow {
        width: 100%;
        li {
          width: 50%;
          float: left;
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          .left {
            box-sizing: border-box;
            padding: 10px;
            text-align: center;
            width: 82px;
            img {
              width: 62px;
              height: 62px;
            }
            span {
              font-size: 12px;
              color: #8a9098;
            }
          }
          .right {
            box-sizing: border-box;
            padding: 5px 5px 5px 40px;
            font-size: 12px;
            color: #a29c9a;
            line-height: 26px;
            background: url('../assets/images/index/duihuakuang.png') no-repeat 0 0;
            background-size: 100% 100%;
            width: 716px;
            height: 166px;
          }
        }
      }
    }
  }
  // 公共模块样式2
  .pub-type-2 {
    margin-top: 5rem !important;
    .dynamic {
      box-shadow: 0px 2px 12px 2px #edf1f5;
      .dynamicTit {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 16px;
        h4 {
          font-size: 19px;
          font-weight: 400;
          color: #14191e;
          line-height: 70px;
        }
        .seeMore {
          padding: 0 4rem;
          font-size: 16px;
          color: #787d82;
          cursor: pointer;
          transition: all 0.2s ease;
          // border-left: 1px solid #eee;
        }
      }
    }
  }
  // 问答社区
  .question {
    margin-bottom: 133px;
    .question-box {
      display: flex;
      justify-content: space-between;
      .dynamicNext .portrait {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .dynamicNext .portrait {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .dynamicNext .defaultphoto {
        background-image: url('../assets/images/index/head_top.png');
      }
      .dynamicNext .studetail {
        padding-left: 16px;
        // width: 450px;
        h5 {
          font-size: 14px;
          line-height: 2rem;
          color: #14191e;
        }
        p {
          line-height: 24px;
          font-size: 1rem;
        }
        p i {
          color: #07bbee;
        }
        p em {
          margin-left: 10px;
          cursor: pointer;
          color: #666666;
        }
      }
      .dynamicNext b {
        font-weight: normal;
        color: #b5b9bc;
      }
    }
    .dynamic {
      background-color: #fff;
      width: 49%;
      .dynamicTit .seeMore {
        padding-right: 10px;
      }
    }
    .dynamicBox {
      padding: 6px 14px;
      position: relative;
      & > ul li {
        padding: 10px 0;
        border-bottom: 1px dashed #e5e5e5;
        .answerque .courque {
          height: 32px;
          line-height: 32px;
          font-size: 0;
          position: relative;
          .ding {
            position: absolute;
            top: 8px;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../assets/images/index/ding.png') no-repeat top;
          }
          em {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            margin-left: 25px;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            -ms-transition: all 0.2s;
            cursor: pointer;
            -webkit-transform-style: preserve-3d;
            -webkit-backface-visibility: hidden;
          }
          .iconfont {
            position: absolute;
            top: 8px;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../assets/images/index/wenhao.png') no-repeat top;
          }
        }
        .feedback {
          font-size: 12px;
          color: #bbb;
          line-height: 30px;
          span {
            margin-left: 24px;
          }
        }
      }
      & > ul li:last-child {
        border-bottom: none;
      }
      .cenLine {
        height: 90%;
        width: 1px;
        background: #eee;
        position: absolute;
        top: 5%;
        left: 50%;
      }
    }
  }
  // 新闻资讯
  .newsArea {
    padding: 24px 0;
    .carousel {
      height: 308px;
      position: relative;
      width: 41.66%;
      .newlist-left {
        width: 100%;
        height: 308px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 3px;
        cursor: pointer;
        .pictintro {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 60px;
          padding: 0 10px;
          box-sizing: border-box;
          line-height: 60px;
          font-size: 18px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .newsintro {
      box-sizing: border-box;
      width: 58.33%;
      padding-left: 2rem;
      padding-right: 0;
    }
    .newsintro ul {
      box-sizing: border-box;
      padding-left: 20px;
    }
    .newsintro ul li {
      // width: 648px;
      width: 100%;
      height: 68px;
      margin-bottom: 12px;
      border-bottom: 1px dashed #eaeaea;
      box-sizing: border-box;
      border-radius: 3px;
      cursor: pointer;
      .newlist {
        width: 100%;
        padding: 7px 0;
        position: relative;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dian {
          width: 6px;
          height: 6px;
          background-color: #ff9d02;
          position: absolute;
          top: 20px;
          left: -20px;
          border-radius: 50%;
        }
        .newlist-title {
          line-height: 28px;
          .title {
            font-size: 16px;
            color: #333;
          }
          .time {
            font-size: 12px;
            color: #c6c6c6;
          }
        }
        .newlist-desc {
          color: #999;
          line-height: 2rem;
          font-size: 1rem;
        }
      }
    }
  }
  // 学员动态
  .student-dynamics {
    margin-bottom: 5rem !important;
    .dynamic {
      background-color: #fff;
    }
    .dynamicBox {
      padding: 6px 14px;
      ul li {
        padding: 10px 0;
        border-bottom: 1px dashed #eee;
      }
    }
  }
  // 即将开始
  .begin {
    .box {
      background-color: #fff;
      border-radius: 4px;
      padding: 20px;
      position: relative;
      & > div {
        height: 100%;
      }
      .begin-left,
      .begin-middle,
      .begin-right {
        width: 100%;
        height: 100%;
      }
      .begin-left {
        height: 0;
        padding-bottom: 100%;
        background: url('../assets/images/index/public-class.png') no-repeat 0 0;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .begin-middle {
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .begin-right {
        position: relative;
        h2 {
          font-size: 20px;
          color: #796e6a;
        }
        p {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 16px;
          color: #999999;
          span {
            display: block;
          }
        }
      }
      .begin-img {
        position: absolute;
        top: 0;
        right: 26px;
      }
    }
  }
  @media (max-width: 1366px) {
    .recommend-class li .listImg img {
      height: 272px;
    }
  }
}
</style>
