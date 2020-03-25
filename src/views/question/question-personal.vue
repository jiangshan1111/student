<template>
  <!-- 个人题库页 -->
  <div class="question-personal">
    <section class="inner">
      <header class="question-personal-header">
        <el-select v-model="navValue" placeholder="请选择" class="my-question-ti" size="mini" @change="changeNav">
          <el-option v-for="item in navOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <ul class="question-personal-record">
          <li @click="$router.push({ path: '/question/questionerror', query: { title_one: nowNavData.label, ibs_id: nowNavData.value, total: errorTotal } })">
            <img src="@/assets/images/question/error.png" alt="" />
            <p>错题本（{{ errorTotal }}）</p>
          </li>
          <li @click="$router.push({ path: '/question/questioncollect', query: { title_one: nowNavData.label, ibs_id: nowNavData.value } })">
            <img src="@/assets/images/question/collection.png" alt="" />
            <p>收藏（{{ collectionTotal }}）</p>
          </li>
          <li @click="$router.push({ path: '/question/questionrecord', query: { title_one: nowNavData.label, ibs_id: nowNavData.value } })">
            <img src="@/assets/images/question/record.png" alt="" />
            <p>记录（{{ recordTotal }}）</p>
          </li>
        </ul>
        <!-- <button class="quick-task-btn" @click="setUpShow = true">快速做题</button> -->
      </header>
      <div class="question-personal-goon">
        <div class="goon-box">
          <p>最近做题记录：2015年注册消防工程师 已做 0/28</p>
          <a>继续做题</a>
        </div>
      </div>
      <main class="question-personal-main">
        <div class="switch-btnGroups">
          <p :class="switchIndex === 0 ? 'active' : ''" @click="switchQuestion(0)">章节练习</p>
          <p :class="switchIndex === 1 ? 'active' : ''" @click="switchQuestion(1)">模拟真题</p>
        </div>
        <transition name="component-fade" mode="out-in">
          <!-- <zjlx v-if="switchIndex === 0" :child-on-off.sync="setUpShow" /> -->
          <zjlx :chapterlist="chapterlist" v-if="switchIndex === 0" @child-on-off="childOnOff" v-loading="fullscreenLoading" />
          <mnzt v-else v-loading="fullscreenLoading" :title_two="title_two" :title_zero="title_zero" :simulationlist="simulationlist" />
        </transition>
      </main>
    </section>
    <el-dialog :visible.sync="setUpShow" width="550px" custom-class="topic-dialog" center :close-on-click-modal="false">
      <div class="topic-setting" v-if="subjectData.total">
        <div class="topic-setting-title">
          做题设置<span>共({{ subjectData.total }})道题</span>
        </div>
        <article class="topic-setting-type">
          <h2>题型</h2>
          <ul class="topic-setting-buttons">
            <!-- <li class="default active">单选题（10）</li>
            <li class="default active">多选题（10）</li>
            <li class="default">填空题（10）</li>
            <li class="default active">不定项题（10）</li>
            <li class="default active">判断题（10）</li>
            <li class="default">简答题（10）</li> -->
            <li class="default" @click="sujectBtnFn(1, subjectData.danXuan)" :class="{ active: sujectCheckbox.some((el) => el === 1), disChose: !subjectData.danXuan }">
              单选题（<span id="radio">{{ subjectData.danXuan.zongShu }}</span
              >）
            </li>
            <li class="default" @click="sujectBtnFn(2, subjectData.duoXuan)" :class="{ active: sujectCheckbox.some((el) => el === 2), disChose: !subjectData.duoXuan }">
              多选题（<span id="multiple">{{ subjectData.duoXuan.zongShu }}</span
              >）
            </li>
            <li class="default" @click="sujectBtnFn(3, subjectData.tianKong)" :class="{ active: sujectCheckbox.some((el) => el === 3), disChose: !subjectData.tianKong }">
              填空题（<span id="fill">0</span>）
            </li>
            <li class="default" @click="sujectBtnFn(7, subjectData.buDingXuanZei)" :class="{ active: sujectCheckbox.some((el) => el === 7), disChose: !subjectData.buDingXuanZei }">
              不定选择题（<span id="undefined">0</span>）
            </li>
            <li class="default" @click="sujectBtnFn(5, subjectData.panDuan)" :class="{ active: sujectCheckbox.some((el) => el === 5), disChose: !subjectData.panDuan }">
              判断题（<span id="judge">0</span>）
            </li>
            <li class="default" @click="sujectBtnFn(4, subjectData.jianDa)" :class="{ active: sujectCheckbox.some((el) => el === 4), disChose: !subjectData.jianDa }">
              简答题（<span id="answer">{{ subjectData.jianDa.zongShu }}</span
              >）
            </li>
          </ul>
        </article>
        <article class="topic-setting-type">
          <h2>分类</h2>
          <ul class="topic-setting-buttons">
            <!-- <li class="default active2">全部题（10）</li>
            <li class="default active2">未做题（10）</li>
            <li class="default">错题（10）</li> -->
            <li class="default" @click="typeBtnFn(1, subjectData.total)" :class="typeBtnIndex === 1 ? 'active2' : ''">
              全部题（<span id="allTopic">{{ subjectData.total }}</span
              >）
            </li>
            <li
              class="default"
              @click="typeBtnFn(2, subjectData.danXuan.weiZuo + subjectData.duoXuan.weiZuo + subjectData.jianDa.weiZuo)"
              :class="{ active2: typeBtnIndex === 2, disChose: subjectData.danXuan.weiZuo + subjectData.duoXuan.weiZuo + subjectData.jianDa.weiZuo === 0 }"
            >
              未做题（<span id="noDoTopic">{{ subjectData.danXuan.weiZuo + subjectData.duoXuan.weiZuo + subjectData.jianDa.weiZuo }}</span
              >）
            </li>
            <li
              class="default"
              @click="typeBtnFn(3, subjectData.danXuan.cuoTi + subjectData.duoXuan.cuoTi + subjectData.jianDa.cuoTi)"
              :class="{ active2: typeBtnIndex === 3, disChose: subjectData.danXuan.cuoTi + subjectData.duoXuan.cuoTi + subjectData.jianDa.cuoTi === 0 }"
            >
              错题（<span id="errTopic">{{ subjectData.danXuan.cuoTi + subjectData.duoXuan.cuoTi + subjectData.jianDa.cuoTi }}</span
              >）
            </li>
          </ul>
        </article>
        <article class="topic-setting-type">
          <h2>题量</h2>
          <ul class="topic-setting-buttons">
            <li class="default" @click="subjectNum = 10" :class="subjectNum === 10 ? 'active2' : ''"><span>10</span>道题</li>
            <li class="default" @click="subjectNum = 20" :class="subjectNum === 20 ? 'active2' : ''"><span>20</span>道题</li>
            <li class="default" @click="subjectNum = 100" :class="subjectNum === 100 ? 'active2' : ''"><span>100</span>道题</li>
          </ul>
        </article>
        <article class="topic-setting-type">
          <h2>做题模式</h2>
          <ul class="topic-setting-buttons">
            <li class="mode" @click="gofirst(1)">
              <img src="@/assets/images/question/topictype1.jpg" alt="" />
            </li>
            <li class="mode" @click="gofirst(2)">
              <img src="@/assets/images/question/topictype2.jpg" alt="" />
            </li>
          </ul>
        </article>
      </div>
    </el-dialog>
    <div class="goOnModel" v-if="goonshow">
      <div class="testAlertContent">
        <div class="alertContentTitle">
          <h3>继续做题 <i class="deleBut el-icon-close" @click="goonshow = false"></i></h3>
        </div>
        <div class="alertContent">
          <div class="progress-box">
            <p class="step-pro" :style="{ width: (goonNum / goonTotal) * 100 + '%' }">
              <span
                >做题进度：<b>{{ goonNum }}</b
                ><em>/{{ goonTotal }}</em></span
              >
            </p>
          </div>
        </div>
        <div class="actionBut">
          <button class="success" @click="goon">继续上次未完成</button>
        </div>
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
      // 导航组
      navOptions: [
        {
          value: '选项1',
          label: '2015年技术实务真题'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 导航组绑定的初始值
      navValue: '',
      user_id: this.$store.state.stu_id,
      title_zero: '', // 父标题
      chapter_id: null, // 点击章节练习父子做题 chapter_test_point_id
      errorTotal: 0, // 错题总数
      collectionTotal: 0, //收藏总数
      recordTotal: 0, // 记录总数
      // switchIndex: 0, // 切换章节练习与模拟真题
      ibs_id: '', // 获取列表页点击进来的题库子分类id
      chapterlist: [], // 章节数据
      simulationlist: [], // 模拟真题
      fullscreenLoading: false, // loading加载
      nowNavData: {}, // 保存当且选择的题库名字与id
      subjectData: {}, // 新题-题目弹出框数据
      setUpShow: false, // 新题-开始做题新题弹框
      sujectCheckbox: [1], // 新题 - 选中题库
      typeBtnIndex: 1, // 新题- 分类切换class
      subjectNum: 10, // 新题-题量切换class
      answer_id: '', // 保存继续做题-的题目id
      goonTotal: 0, // 继续做题-总数
      goonNum: 0, // 继续做题-余数
      title_two: '', // 继续做题-保存做题题名字
      goonshow: false // 继续做题-显示框
    }
  },
  created() {
    // 获取导航组数据
    this.navOptions = this.tiku.sub_library.map((el) => {
      return {
        value: el.ibs_id,
        label: el.ibs_name
      }
    })
    this.ibs_id = this.listId
    this.title_zero = this.tiku.item_bank_name
    // 保存当且选择的题库名字与id
    this.nowNavData = this.navOptions.find((el) => el.value.toString() === this.ibs_id.toString())
    // 导航组绑定的初始值
    this.navValue = this.nowNavData.value
    // 个人题库页数据
    this.subjectAjax(this.ibs_id)
  },
  methods: {
    switchQuestion(index) {
      this.$store.commit('tiku/SWITCHINDEX', index)
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    },
    // 章节练习触发父组件事件
    childOnOff(obj) {
      // this.setUpShow = obj.onoff
      this.pubStart(obj.chapter)
    },
    // 公用请求题库
    subjectAjax(id) {
      this.fullscreenLoading = true
      axios({
        method: 'post',
        url: '/api/stu/ItemBank/queryCTP',
        data: JSON.stringify({
          ibs_id: id,
          stu_id: this.user_id // 用户id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setTimeout(() => {
          this.fullscreenLoading = false
          this.errorTotal = res.data.err_num
          this.collectionTotal = res.data.coll_num
          this.recordTotal = res.data.jilu_num
          this.chapterlist =
            res.data.zhangjiekey.length === 0
              ? []
              : res.data.zhangjiekey.map((el, i) => {
                  el.show = i === 0 ? true : false
                  return el
                })
          this.simulationlist = res.data.monizhentikey
        }, 1000)
      })
    },
    // 切换导航组数据 回显题库
    changeNav() {
      this.$store.commit('tiku/MODIFYLISTID', this.navValue)
      this.nowNavData = this.navOptions.find((el) => el.value.toString() === this.navValue.toString())
      this.subjectAjax(this.navValue)
    },
    pubStart(chapter) {
      axios({
        method: 'post',
        url: '/api/stu/ItemBank/StuTfContinue',
        data: JSON.stringify({
          chapter_test_point_id: chapter.chapter_test_point_id,
          stu_id: this.user_id // 用户id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        res = res.data
        if (res.code === 211) {
          this.goonshow = true
          this.answer_id = res.answer_id
          this.goonTotal = res.zongshu
          this.goonNum = res.jindu
        } else {
          this.subjectData.total = chapter.num
          this.chapter_id = chapter.chapter_test_point_id
          axios({
            method: 'post',
            url: '/api/stu/ItemBank/queryChapter',
            data: JSON.stringify({
              ibs_id: this.ibs_id,
              chapter_test_point_id: chapter.chapter_test_point_id,
              stu_id: this.user_id // 用户id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            res = res.data
            this.subjectData = Object.assign(this.subjectData, res)
            this.setUpShow = true
          })
        }
        // 保存小标题
        this.title_two = chapter.name
      })
    },
    // 选择新题-题型
    sujectBtnFn(subjectId, item) {
      if (item === undefined) return
      if (this.sujectCheckbox.some((el) => el === subjectId)) {
        if (this.sujectCheckbox.length === 1) return
        let i = this.sujectCheckbox.findIndex((itm) => itm === subjectId)
        this.sujectCheckbox.splice(i, 1)
      } else {
        this.sujectCheckbox.push(subjectId)
      }
    },
    // 选择新题-分类
    typeBtnFn(index, total) {
      if (!total) return
      this.typeBtnIndex = index
    },
    // 继续上一次点击事件
    goon() {
      this.$router.push({
        path: '/question/questioncontinue',
        query: {
          answer_id: this.answer_id,
          title_two: this.title_two
        }
      })
    },
    // 跳转新题页面
    gofirst(type) {
      let exercisesParams = {
        stu_id: this.user_id, // 用户id
        chapter_test_point_id: this.chapter_id,
        question_type_group: this.sujectCheckbox.join(';'),
        classification: this.typeBtnIndex,
        questionNum: this.subjectNum,
        tf_Practice: type
      }
      this.$store.commit('tiku/SAVETIKUPERSONAL', exercisesParams)
      this.$router.push({
        path: '/question/questionfirststart',
        query: {
          title_two: this.title_two
        }
      })
    }
  },
  computed: {
    ...mapState({
      tiku: (state) => state.tiku.tiku,
      listId: (state) => state.tiku.listId,
      switchIndex: (state) => state.tiku.switchIndex
    })
  },
  components: {
    zjlx: () => import('../../components/question/zjlx.vue'),
    mnzt: () => import('../../components/question/mnzt.vue')
  }
}
</script>

<style lang="scss">
.question-personal {
  padding-top: 52px;
  min-width: 1361px;
  font-family: siyuanhei;
  .inner {
    width: 1078px;
    min-height: 600px;
    margin: 0 auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px #ebe9e9 solid;
  }
  .question-personal-header {
    position: relative;
    padding-top: 106px;
    .my-question-ti {
      position: absolute;
      top: 28px;
      left: 29px;
      .el-input__inner {
        border: none;
        font-family: siyuanhei;
        font-weight: 900;
        font-size: 16px;
        width: 195px;
      }
    }
    .question-personal-record {
      position: absolute;
      top: 20px;
      left: 263px;
      width: 221px;
      display: flex;
      justify-content: space-between;
      li {
        width: 33%;
        text-align: center;
        cursor: pointer;
        img {
          margin-bottom: 11px;
        }
        p {
          font-size: 12px;
          color: #999999;
          white-space: nowrap;
        }
      }
      li:nth-child(1) img {
        margin-bottom: 9px;
      }
    }
    .quick-task-btn {
      width: 125px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #fff;
      background-image: linear-gradient(to right, #359ceb, #0285eb);
      border-radius: 5px;
      position: absolute;
      top: 30px;
      right: 29px;
    }
  }
  .question-personal-goon {
    padding: 0 19px;
    margin-bottom: 26px;
    .goon-box {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      background-color: #f4f6f9;
      p,
      a {
        font-size: 11px;
        color: #999999;
      }
      a {
        color: #fea541;
        font-weight: 600;
      }
    }
  }
  .question-personal-main {
    width: 100%;
    box-sizing: border-box;
    padding: 0 19px;
    .switch-btnGroups {
      width: 100%;
      height: 51px;
      border-bottom: 1px #e5e5e5 solid;
      position: relative;
      p {
        line-height: 51px;
        font-size: 19px;
        width: 76px;
        cursor: pointer;
      }
      p.active {
        color: #007fe1;
        border-bottom: 2px #007fe1 solid;
      }
      p:first-child {
        position: absolute;
        top: -2px;
        left: 50%;
        margin-left: -10%;
      }
      p:last-child {
        position: absolute;
        top: -2px;
        right: 50%;
        margin-right: -10%;
      }
    }
  }
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }
  .topic-setting {
    .topic-setting-title {
      text-align: center;
      font-size: 22px;
      color: #2f3032;
      margin-bottom: 9px;
      font-weight: bold;
      span {
        font-size: 14px;
        color: #a1a1a1;
        margin-left: 10px;
        font-weight: normal;
      }
    }
    .topic-setting-type {
      h2 {
        line-height: 56px;
        font-size: 15px;
        color: #2f3032;
      }
      .topic-setting-buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .default {
          width: 30%;
          height: 44px;
          line-height: 42px;
          text-align: center;
          border-radius: 5px;
          border: 1px #cdd2d4 solid;
          color: #999999;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .disChose {
          color: #b5b9bc;
          border-color: #e5e5e5;
          cursor: not-allowed;
        }
        .active {
          border: none;
          color: #ebf3fc;
          line-height: 44px;
          background-image: linear-gradient(to right, #359ceb, #0285eb);
        }
        .active2 {
          border-color: #007fe1;
          color: #007fe1;
        }
        .mode {
          cursor: pointer;
        }
      }
    }
  }
  .topic-dialog {
    margin-top: 9vh;
    .el-dialog__body {
      padding: 0 30px 28px;
    }
  }

  // 继续弹出框
  .goOnModel {
    z-index: 20000;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    .testAlertContent {
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #fff;
      width: 640px;
      margin: -162px 0 0 -320px;
      h3 {
        font-size: 24px;
        line-height: 24px;
        color: #333;
        text-align: center;
        padding-top: 40px;
        position: relative;
        .deleBut {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #999;
          cursor: pointer;
          font-size: 14px;
        }
      }
      .alertContent {
        padding-top: 108px;
        .progress-box {
          width: 360px;
          margin: 0 auto;
          background-color: #eee;
          border-radius: 5px;
          height: 10px;
          position: relative;
          .step-pro {
            height: 10px;
            background-color: #07bbee;
            border-radius: 5px;
          }
          span {
            position: absolute;
            left: -73px;
            top: -50px;
            box-shadow: 0 1px 4px 0 rgba(3, 3, 3, 0.3);
            width: 145px;
            height: 35px;
            border: 1px solid #f3f3f3;
            border-radius: 4px;
            line-height: 35px;
            text-align: center;
            font-size: 14px;
            color: #333;
            b {
              color: #07bbee;
            }
          }
          span:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-top: 6px solid #f3f3f3;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            position: absolute;
            bottom: -6px;
            left: 50%;
            margin-left: -3px;
          }
        }
      }
      .actionBut {
        margin: 50px 0;
        text-align: center;
        button {
          background-color: #07bbee;
          color: #fff;
          line-height: 36px;
          padding: 0 36px;
        }
      }
    }
  }
}
</style>
