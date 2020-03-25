<template>
  <div class="community" @click="blurSearchInput">
    <div class="community-inner">
      <div class="community-left">
        <div class="community-left-nav">
          <p class="nav-list">
            <span v-for="(hot, index) in allNav" :key="index" @click="changeBigType(hot, index)" :class="allNavIndex === index ? 'active' : ''">{{ hot }}</span>
          </p>
          <div class="search-ask">
            <div class="search-btn" :class="isSearchFocus ? 'searchFocus' : ''" @click.stop="focusSearchInput">
              <input type="text" placeholder="请输入问题" v-model="searchValue" @focus="focusSearchInput" />
              <img src="@/assets/images/community/search.jpg" class="search-img" alt="" @click="searchFn" />
            </div>
            <button class="ask" :class="isSearchFocus ? 'askFocus' : ''" @click="newQuestion">提问</button>
          </div>
        </div>
        <div class="navigation-group">
          <span v-for="(nav, index) in communityNav" :key="index" :class="communityNavIndex === index ? 'active' : ''" @click="changeCommunityNav(nav, index)">{{ nav.modify_name }}</span>
        </div>
        <ul class="community-left-content">
          <li class="clearfix" v-for="(ans, nasi) in answerData" :key="nasi">
            <div class="contentLeft fl">
              <img v-if="(ans.head + '').indexOf('http://') === -1" src="@/assets/images/community/head.jpg" alt="" />
              <img v-else :src="ans.head" alt="" />
              <p>{{ ans.nicename }}</p>
            </div>
            <div class="contentRight fl">
              <div class="content-right-title">
                <h2 @click="goDetail(ans)">
                  <span class="ding" v-if="ans.state === 1 || ans.state === 3">顶</span><span class="jing" v-if="ans.state === 2 || ans.state === 3">精</span>{{ ans.title }}
                </h2>
                <div class="number">
                  <p class="answer">
                    <span>{{ ans.rs }}</span
                    ><span>回答</span>
                  </p>
                  <p>
                    <span>{{ ans.visit_num }}</span
                    ><span>浏览</span>
                  </p>
                </div>
              </div>
              <h6 class="content-right-answer-detail" v-html="ans.content"></h6>
              <img v-if="(ans.picture + '').indexOf('http://') === -1" src="@/assets/images/community/content.jpg" class="content-img" alt="" />
              <img v-else src="@/assets/images/community/content.jpg" class="content-img" alt="" />
              <p class="teacher-answer" v-if="ans.huida_st_state !== 3">
                <span>【{{ ans.huida_st_state === 2 ? '老师回答' : '最新回答' }}】</span>{{ ans.huida_content }}
              </p>
              <h5 class="answer-type">
                <span>提问时间：{{ getNowFormatDate(ans.creation_time) }}</span>
                <span>最后回答：{{ getNowFormatDate(ans.maxtime) }}</span>
                <span><i class="biaozhi"></i>{{ filterSubjet(ans.subject_id) }}</span>
              </h5>
              <div class="community-border-bottom"></div>
            </div>
          </li>
          <li v-if="!answerData || answerData.length === 0" style="text-align:center;font-size:24px;font-weight:900;margin-top:25px;">
            没有内容
          </li>
        </ul>
      </div>
      <div class="community-right">
        <div class="week-hot-awsner">
          <h3>一周热门问题</h3>
          <ul>
            <li v-for="(week, w) in weekData" :key="w" v-html="week.content" @click="goDetail(week)"></li>
          </ul>
        </div>
        <div class="related-courses">
          <h3>相关课程</h3>
          <ul>
            <li class="clearfix" v-for="(cur, curindex) in curriculum" :key="curindex">
              <img v-if="cur.cover.indexOf('http://') === -1" src="http://image.yunduoketang.com/course/34270/20190829/acafc7f6-a1a7-4d27-b4b3-00910b90d095.png" alt="" class="fl" />
              <img v-else :src="cur.cover" alt="" class="fl" />
              <div class="teacher fl">
                <p class="name">
                  <span>{{ cur.course_name }}</span>
                  <span>讲师：{{ cur.true_name }}</span>
                </p>
                <p class="free">{{ cur.price }}</p>
              </div>
            </li>
            <li v-if="curriculum.length === 0">
              没有相关课程
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="community-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50]"
        :page-size="savePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      stu_id: this.$store.state.stu_id,
      isSearchFocus: false,
      searchValue: '',
      total: 0, // 分页总数
      savePageSize: 10, // 选择每页多少条
      savesmallNavId: '%', // 保存小分类id
      answerData: [], // 问答数据
      curriculum: [], // 相关课程
      weekData: [], // 一周热门
      communityNav: [], // 分类导航
      communityNavIndex: 0, // 分类导航index
      allNav: ['全部', '热门', '精华'], // 大分类切换
      allNavIndex: 0 // 大分类切换index
    }
  },
  created() {
    // 全部分类导航栏
    axios({
      method: 'post',
      url: '/api/stu/Question/queryClassificationName',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.communityNav = res.data
      this.communityNav.unshift({
        modify_name: '全部',
        pse_id: 0
      })
    })
    // 一周热门
    axios({
      method: 'post',
      url: '/api/stu/Question/oneWeekHotTopics',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.weekData = res.data
    })

    this.initCurriculum()
    this.initAnswer()
  },
  methods: {
    focusSearchInput() {
      this.isSearchFocus = true
    },
    blurSearchInput() {
      this.isSearchFocus = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.savePageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      window.scrollTo(0, 0)
      this.initAnswer(this.allNavIndex, this.savesmallNavId, val, this.savePageSize)
    },
    // 切换小分类栏
    changeCommunityNav(nav, index) {
      // if (this.communityNavIndex === index) return
      this.communityNavIndex = index
      this.savesmallNavId = nav.modify_name === '全部' ? '%' : nav.pse_id
      nav.modify_name === '全部' ? this.initCurriculum() : this.initCurriculum(nav.pse_id)
      this.allNavIndex === 0 ? this.initAnswer('', this.savesmallNavId) : this.initAnswer(this.allNavIndex, this.savesmallNavId)
    },
    // 切换大分类
    changeBigType(hot, index) {
      // if (this.allNavIndex === index) return
      this.allNavIndex = index
      hot === '全部' ? this.initAnswer('', this.savesmallNavId) : this.initAnswer(index, this.savesmallNavId)
    },
    // **核心** 获取全部问答信息 ----- id = '%' 表示小分类全部默认值 type = '' 表示大分类全部默认值
    initAnswer(type = '', id = '%', pageNum = 1, pageSize = 10) {
      // 传参必须传null
      this.searchValue = this.searchValue === '' ? null : this.searchValue
      // 全部问答
      axios({
        method: 'post',
        url: '/api/stu/Question/queryQuestion',
        data: JSON.stringify({
          subject_id: id,
          content: this.searchValue,
          state: type,
          pageNum: pageNum,
          pageSize: pageSize
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.answerData = res.data.list
        this.total = res.data.total
        this.searchValue = ''
      })
    },
    // 推荐课程 id=null为默认值全部
    initCurriculum(id = null) {
      axios({
        method: 'post',
        url: '/api/stu/Question/relatedCourses',
        data: JSON.stringify({
          subject_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.curriculum = res.data
      })
    },
    // 搜索
    searchFn() {
      this.savesmallNavId = '%'
      this.allNavIndex = this.communityNavIndex = 0
      this.initCurriculum()
      this.initAnswer()
    },
    // 点击进入详情页
    goDetail(ans) {
      this.$router.push({
        path: '/community/communitydetail',
        query: {
          questions_id: ans.questions_id,
          course_type: ans.course_type
        }
      })
    },
    // 提问
    newQuestion() {
      if (this.stu_id === '') {
        this.$message.error({
          type: 'info',
          message: '请登录！',
          duration: '2000'
        })
        return
      }
      this.$router.push('/community/communitynewask')
    },
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
    filterSubjet(subject_id) {
      let type = ''
      subject_id = subject_id.replace(/;/g, '').split('')
      subject_id.forEach((itm) => {
        this.communityNav.forEach((el) => {
          if (el.pse_id.toString() === itm.toString()) {
            type += el.modify_name + '&'
          }
        })
      })
      type = type[type.length - 1] !== '&' ? type : type.substring(0, type.length - 1)
      return type
    }
  }
}
</script>

<style lang="scss">
.community {
  font-family: siyuanhei;
  min-width: 1361px;
  .community-inner {
    width: 1082px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .community-left {
    width: 750px;
    padding-top: 31px;
    .community-left-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 21px;
      border-bottom: 1px #e5e5e5 solid;
      .nav-list {
        font-size: 17px;
        color: #575e67;
        span {
          margin-right: 31px;
          cursor: pointer;
          font-family: Arial, Helvetica, sans-serif;
        }
        span.active {
          color: #007fe1;
          background: url('../../assets/images/community/titleBg.png') no-repeat 0px bottom;
        }
      }
      .search-ask {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 290px;
        position: relative;
        .search-btn {
          position: relative;
          width: 218px;
          height: 30px;
          border: 1px #d6d6d6 solid;
          border-radius: 5px;
          background-color: #f9f6f6;
          input {
            position: absolute;
            top: 0;
            left: 9px;
            width: 185px;
            height: 28px;
            line-height: 30px;
            transition: all 0.3s ease;
            background-color: #f9f6f6;
            outline: none;
            border: none;
          }
          .search-img {
            position: absolute;
            top: 8px;
            right: 10px;
            cursor: pointer;
          }
        }
        .searchFocus {
          width: 100%;
          input {
            width: 257px;
          }
        }
        .ask {
          width: 60px;
          height: 30px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          background-color: #0888eb;
          border-radius: 5px;
          transition: all 0.3s ease;
          position: absolute;
          top: 0;
          right: 0;
        }
        .askFocus {
          opacity: 0;
          transform: scale(0);
        }
      }
    }
    .navigation-group {
      display: flex;
      align-content: center;
      padding: 20px 0 32px 0;
      span {
        font-size: 12px;
        color: #999999;
        margin-right: 15px;
        cursor: pointer;
      }
      span.active {
        color: #86c1f6;
      }
    }
    .community-left-content {
      border: 1px #ebe9e9 solid;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding-bottom: 18px;
      li {
        .contentLeft {
          width: 101px;
          padding-top: 25px;
          text-align: center;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          p {
            font-size: 12px;
            color: #999999;
            line-height: 29px;
          }
        }
        .contentRight {
          padding-top: 37px;
          padding-right: 25px;
          width: 647px;
          .content-right-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 35px;
            h2 {
              font-size: 17px;
              color: #383940;
              cursor: pointer;
              &:hover {
                color: #00b7ee;
              }
              .ding {
                display: inline-block;
                width: 16px;
                height: 18px;
                color: #fff;
                font-size: 12px;
                background-color: #e95229;
                margin-right: 4px;
                line-height: 16px;
                text-align: center;
                vertical-align: middle;
                border-radius: 2px;
              }
              .jing {
                display: inline-block;
                width: 16px;
                height: 18px;
                color: #fff;
                font-size: 12px;
                background-color: #0783e3;
                margin-right: 9px;
                line-height: 16px;
                text-align: center;
                vertical-align: middle;
                border-radius: 2px;
              }
            }
            .number {
              display: flex;
              justify-content: space-between;
              p {
                color: #a9a9a9;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                align-items: center;
                span {
                  display: block;
                  font-size: 12px;
                }
              }
              p.answer {
                color: #007fe1;
                margin-right: 31px;
              }
            }
          }
          .content-right-answer-detail {
            line-height: 34px;
            font-size: 15px;
            color: #747373;
          }
          .content-img {
            display: block;
            width: 100%;
            margin-bottom: 6px;
          }
          .teacher-answer {
            font-size: 15px;
            color: #5d6166;
            span {
              color: #0080e0;
              margin-right: 7px;
            }
          }
          .answer-type {
            line-height: 27px;
            color: #999999;
            font-size: 12px;
            span {
              margin-right: 37px;
            }
            .biaozhi {
              display: inline-block;
              width: 13px;
              height: 13px;
              background: url('../../assets/images/community/xiaofang.jpg') no-repeat 0 0;
            }
          }
          .community-border-bottom {
            height: 1px;
            width: 100%;
            background-color: #e5e5e5;
            margin-top: 18px;
          }
        }
      }
      li:last-child {
        .community-border-bottom {
          display: none;
        }
      }
    }
  }
  .community-right {
    padding-top: 66px;
    .week-hot-awsner {
      width: 220px;
      margin-bottom: 35px;
      h3 {
        line-height: 43px;
        color: #575e67;
        font-size: 13px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        border-bottom: 1px #e5e5e5 solid;
      }
      li {
        margin-top: 14px;
        color: #575e67;
        font-size: 12px;
        cursor: pointer;
        position: relative;
        padding-left: 7px;
      }
      li::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #007fe1;
        position: absolute;
        top: 50%;
        left: -5px;
        margin-top: -2.5px;
      }
      li:hover {
        color: #0af;
      }
    }
    .related-courses {
      width: 220px;
      h3 {
        line-height: 43px;
        color: #575e67;
        font-size: 13px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        border-bottom: 1px #e5e5e5 solid;
      }
      li {
        width: 100%;
        height: 92px;
        padding-top: 16px;
        cursor: pointer;
        img {
          width: 60%;
          height: 100%;
        }
        .teacher {
          width: 40%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          .name span {
            font-size: 12px;
            color: #676d74;
            margin-bottom: 11px;
            text-align: center;
            display: block;
          }
          .name span:nth-child(2) {
            color: #999999;
          }
          .free {
            width: 100%;
            color: #999999;
            font-size: 12px;
            padding-left: 8px;
          }
        }
      }
    }
  }
  .community-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
}
</style>
