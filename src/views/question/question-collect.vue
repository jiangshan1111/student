<template>
  <!-- 收藏 -->
  <div class="question-collect">
    <header class="inner first-start-header">
      <div class="first-start-header-left">
        <img src="@/assets/images/question/collection.png" alt="" />
        <p>
          我的收藏<span>{{ params.title_one }}</span>
        </p>
      </div>
      <el-button type="info" plain round @click="goback">返回做题</el-button>
    </header>
    <main class="inner first-start-main">
      <nav class="first-start-main-nav">
        <!-- 应该是后台实时请求需要接口 -->
        <div class="title">共{{ params.total ? params.total : 0 }}题</div>
        <div class="questionList" style="padding-left: 0;">
          <ul class="errorList">
            <!-- 单选 -->
            <li @click="changePage(0, '单选')" class="topicIndex clearfix radio" :class="leftIndex === 0 ? 'on' : ''" v-if="single.singleSelection.length">
              <span>单选题</span>
              <b
                ><i>{{ single.singleSelection.length }}</i
                >题</b
              >
            </li>
            <li @click="changePage(1, '多选')" class="topicIndex clearfix radio" :class="leftIndex === 1 ? 'on' : ''" v-if="multiple.multipleSelection.length">
              <span>多选题</span>
              <b
                ><i>{{ multiple.multipleSelection.length }}</i
                >题</b
              >
            </li>
            <li @click="changePage(2, '简答')" class="topicIndex clearfix radio" :class="leftIndex === 2 ? 'on' : ''" v-if="shortAnswer.shortAnswerSelection.length">
              <span>简答题</span>
              <b
                ><i>{{ shortAnswer.shortAnswerSelection.length }}</i
                >题</b
              >
            </li>
            <li @click="changePage(3, '材料')" class="topicIndex clearfix radio" :class="leftIndex === 3 ? 'on' : ''" v-if="materialQus.selection.length">
              <span>材料题</span>
              <b
                ><i>{{ materialQus.selection.length }}</i
                >题</b
              >
            </li>
          </ul>
        </div>
        <!-- <h6 class="tips"><span></span> 已标记</h6> -->
      </nav>
      <div class="first-start-main-right" v-if="!noData">
        <!-- 单选题 -->
        <div class="single-box" v-if="single.singleSelection.length && showLeftNav === 0">
          <article class="title">
            <span class="name">{{ single.title }}</span>
            <span class="signN" v-if="single.singleNow.tf_marked === 2" @click="sign(1, '单选')"><i></i>标记此题</span>
            <span class="signY" v-else @click="sign(2, '单选')"><i></i>已标记</span>
          </article>
          <div class="topic-content">
            <h3 class="content">{{ single.singleNow.serialnumber }}.{{ single.singleNow.question_name }}</h3>
            <div class="single-radio">
              <el-radio-group v-model="single.singleRadio" disabled style="height:25px;">
                <el-radio @change="changeRadio(item.isTrue)" :label="item.title" v-for="(item, i) in single.singleNow.optionanswer" :key="i">{{ item.value }}</el-radio>
              </el-radio-group>
              <!-- <div class="err-or-success">
                <p class="err"></p>
                <p class="success"></p>
              </div> -->
            </div>
            <ul class="analysis">
              <li>
                <span>已选：</span><span style="font-size:12px;color:#96989e;">{{ single.singleRadio }}</span>
              </li>
              <li>
                <span>难易程度：</span><span style="font-size:12px;color:#96989e;">{{ single.singleNow.difficulty | filterLevel }}</span>
              </li>
              <ul>
                <li>
                  <span>您的答案：</span><span style="font-size:12px;color:#e43a36;">{{ single.singleNow.singleRadio }}</span>
                </li>
                <li>
                  <span>正确答案：</span><span style="font-size:12px;color:#4c9cff;">{{ single.singleNow.real }}</span>
                </li>
                <li>
                  <span>文字解析：</span>
                  <div style="font-size:12px;color:#96989e;line-height:22px;display:inline-block" v-html="single.singleNow.question_analysis">我是文字解析</div>
                </li>
                <li>
                  <span>音频解析：</span>
                  <div style="display:inline-block" v-html="single.singleNow.audio_analysis"></div>
                </li>
                <li>
                  <span>视频解析：</span>
                  <div style="display:inline-block" v-html="single.singleNow.video_analysis"></div>
                </li>
              </ul>
            </ul>
          </div>
          <div class="buttonBox">
            <span class="collect" :class="single.singleNow.tf_collection === 1 ? 'active' : ''" @click="joinInCollection(single.singleNow.tf_collection, '单选')">
              <i v-if="single.singleNow.tf_collection === 2" class="el-icon-star-off"></i>
              <i style="color:#ff9900;margin-right:6px;" v-else class="el-icon-star-on"></i>
              <b v-if="single.singleNow.tf_collection === 2">加入收藏</b>
              <b v-else>取消收藏</b>
            </span>
            <!-- <button style="background-color: #0af;" v-if="!single.show" @click="single.show = true">查看解析</button>
            <button style="background-color: #0af;" v-else @click="single.show = false">收起解析</button>
            <button class="submit" @click="submit('单选')">提交</button> -->
            <button class="prev" v-if="single.singleIndex > 1" @click="prevBtn('单选')">上一题</button>
            <button class="next" v-if="single.singleIndex < single.singleSelection.length" @click="nextBtn('单选')">下一题</button>
          </div>
        </div>
        <!-- 多选题 -->
        <div class="single-box" v-if="multiple.multipleSelection.length && showLeftNav === 1">
          <article class="title">
            <span class="name">{{ multiple.title }}</span>
            <span class="signN" v-if="multiple.multipleNow.tf_marked === 2" @click="sign(1, '多选')"><i></i>标记此题</span>
            <span class="signY" v-else @click="sign(2, '多选')"><i></i>已标记</span>
          </article>
          <div class="topic-content">
            <h3 class="content">{{ multiple.multipleNow.serialnumber }}.{{ multiple.multipleNow.question_name }}</h3>
            <div class="multiple-checkbox">
              <el-checkbox-group v-model="multiple.multipleCheckbox" disabled>
                <el-checkbox @change="changeCheckbox" v-for="(item, i) in multiple.multipleNow.optionanswer" :key="i" :label="item.title">{{ item.title + ' ' + item.value }}</el-checkbox>
              </el-checkbox-group>
              <!-- <div class="err-or-success">
                <p class="err"></p>
                <p class="success"></p>
              </div> -->
            </div>
            <ul class="analysis">
              <li>
                <span>已选：</span><span style="font-size:12px;color:#96989e;">{{ multiple.multipleCheckbox.join(',') }}</span>
              </li>
              <li>
                <span>难易程度：</span><span style="font-size:12px;color:#96989e;">{{ multiple.multipleNow.difficulty | filterLevel }}</span>
              </li>
              <ul>
                <li>
                  <span>您的答案：</span><span style="font-size:12px;color:#e43a36;">{{ multiple.multipleCheckbox.join(',') }}</span>
                </li>
                <li>
                  <span>正确答案：</span><span style="font-size:12px;color:#4c9cff;">{{ multiple.multipleNow.real.join(',') }}</span>
                </li>
                <li>
                  <span>文字解析：</span>
                  <div style="display:inline-block;font-size:12px;color:#96989e;line-height:22px;" v-html="multiple.multipleNow.question_analysis"></div>
                </li>
                <li>
                  <span>音频解析：</span>
                  <div v-html="multiple.multipleNow.audio_analysis" style="display:inline-block;"></div>
                </li>
                <li>
                  <span>视频解析：</span>
                  <div v-html="multiple.multipleNow.video_analysis" style="display:inline-block;"></div>
                </li>
              </ul>
            </ul>
          </div>
          <div class="buttonBox">
            <span class="collect" :class="multiple.multipleNow.tf_collection === 1 ? 'active' : ''" @click="joinInCollection(multiple.multipleNow.tf_collection, '多选')">
              <i v-if="multiple.multipleNow.tf_collection === 2" class="el-icon-star-off"></i>
              <i style="color:#ff9900;margin-right:6px;" v-else class="el-icon-star-on"></i>
              <b v-if="multiple.multipleNow.tf_collection === 2">加入收藏</b>
              <b v-else>取消收藏</b>
            </span>
            <!-- <button style="background-color: #0af;" v-if="!multiple.show" @click="multiple.show = true">查看解析</button>
            <button style="background-color: #0af;" v-else @click="multiple.show = false">收起解析</button>
            <button class="submit" @click="submit('多选')">提交</button> -->
            <button class="prev" v-if="multiple.multipleIndex > 1" @click="prevBtn('多选')">上一题</button>
            <button class="next" v-if="multiple.multipleIndex < multiple.multipleSelection.length" @click="nextBtn('多选')">下一题</button>
          </div>
        </div>
        <!-- 简答题 -->
        <div class="single-box" v-if="shortAnswer.shortAnswerSelection.length && showLeftNav === 2">
          <article class="title">
            <span class="name">{{ shortAnswer.title }}</span>
            <span class="signN" v-if="shortAnswer.shortAnswerNow.tf_marked === 2" @click="sign(1, '简答')"><i></i>标记此题</span>
            <span class="signY" v-else @click="sign(2, '简答')"><i></i>已标记</span>
          </article>
          <div class="topic-content">
            <h3 class="content">{{ shortAnswer.shortAnswerNow.serialnumber }}.{{ shortAnswer.shortAnswerNow.question_name }}</h3>
            <textarea name="" readonly @change="changeText()" v-model="shortAnswer.shortAnswerValue" id="" style="width: 100%;" rows="10"></textarea>
            <ul class="analysis">
              <li>
                <span>难易程度：</span><span style="font-size:12px;color:#96989e;">{{ shortAnswer.shortAnswerNow.difficulty | filterLevel }}</span>
              </li>
              <ul>
                <li>
                  <span>正确答案：</span>
                  <div style="display:inline-block;font-size:12px;color:#4c9cff;" v-html="shortAnswer.shortAnswerNow.optionanswer"></div>
                </li>
                <li>
                  <span>文字解析：</span>
                  <div style="display:inline-block;font-size:12px;color:#96989e;line-height:22px;" v-html="shortAnswer.shortAnswerNow.question_analysis"></div>
                </li>
                <li>
                  <span>音频解析：</span>
                  <div v-html="shortAnswer.shortAnswerNow.audio_analysis" style="display:inline-block;"></div>
                </li>
                <li>
                  <span>视频解析：</span>
                  <div v-html="shortAnswer.shortAnswerNow.video_analysis" style="display:inline-block;"></div>
                </li>
              </ul>
            </ul>
          </div>
          <div class="buttonBox">
            <span class="collect" :class="shortAnswer.shortAnswerNow.tf_collection === 1 ? 'active' : ''" @click="joinInCollection(shortAnswer.shortAnswerNow.tf_collection, '简答')">
              <i v-if="shortAnswer.shortAnswerNow.tf_collection === 2" class="el-icon-star-off"></i>
              <i style="color:#ff9900;margin-right:6px;" v-else class="el-icon-star-on"></i>
              <b v-if="shortAnswer.shortAnswerNow.tf_collection === 2">加入收藏</b>
              <b v-else>取消收藏</b>
            </span>
            <!-- <button style="background-color: #0af;" v-if="!shortAnswer.show" @click="shortAnswer.show = true">查看解析</button>
            <button style="background-color: #0af;" v-else @click="shortAnswer.show = false">收起解析</button>
            <button class="submit" @click="submit('简答')">提交</button> -->
            <button class="prev" v-if="shortAnswer.shortAnswerIndex > 1" @click="prevBtn('简答')">上一题</button>
            <button class="next" v-if="shortAnswer.shortAnswerIndex < shortAnswer.shortAnswerSelection.length" @click="nextBtn('简答')">下一题</button>
          </div>
        </div>
        <!-- 材料题 -->
        <div class="single-box" v-if="materialQus.selection.length && showLeftNav === 3">
          <article class="title">
            <span class="name">{{ materialQus.title }}</span>
            <span class="signN" v-if="materialQus.now.tf_marked === 2" @click="sign(1, '材料')"><i></i>标记此题</span>
            <span class="signY" v-else @click="sign(2, '材料')"><i></i>已标记</span>
          </article>
          <div class="topic-content">
            <h3 class="content">
              {{ materialQus.now.serialnumber }}.
              <p v-html="materialQus.now.question_name"></p>
            </h3>
            <textarea name="" readonly @change="changeMQtext()" v-model="materialQus.value" id="" style="width: 100%;" rows="10"></textarea>
            <ul class="analysis">
              <li>
                <span>难易程度：</span><span style="font-size:12px;color:#96989e;">{{ materialQus.now.difficulty | filterLevel }}</span>
              </li>
              <ul>
                <li>
                  <span>正确答案：</span>
                  <div style="display:inline-block;font-size:12px;color:#4c9cff;" v-html="materialQus.now.optionanswer"></div>
                </li>
                <li>
                  <span>文字解析：</span>
                  <div style="display:inline-block;font-size:12px;color:#96989e;line-height:22px;" v-html="materialQus.now.question_analysis"></div>
                </li>
                <li>
                  <span>音频解析：</span>
                  <div v-html="materialQus.now.audio_analysis" style="display:inline-block;"></div>
                </li>
                <li>
                  <span>视频解析：</span>
                  <div v-html="materialQus.now.video_analysis" style="display:inline-block;"></div>
                </li>
              </ul>
            </ul>
          </div>
          <div class="buttonBox">
            <span class="collect" :class="materialQus.now.tf_collection === 1 ? 'active' : ''" @click="joinInCollection(materialQus.now.tf_collection, '材料')">
              <i v-if="materialQus.now.tf_collection === 2" class="el-icon-star-off"></i>
              <i style="color:#ff9900;margin-right:6px;" v-else class="el-icon-star-on"></i>
              <b v-if="materialQus.now.tf_collection === 2">加入收藏</b>
              <b v-else>取消收藏</b>
            </span>
            <!-- <button style="background-color: #0af;" v-if="!materialQus.show" @click="materialQus.show = true">查看解析</button>
            <button style="background-color: #0af;" v-else @click="materialQus.show = false">收起解析</button>
            <button class="submit" @click="submit('材料')">提交</button> -->
            <button class="prev" v-if="materialQus.index > 1" @click="prevBtn('材料')">上一题</button>
            <button class="next" v-if="materialQus.index < materialQus.selection.length" @click="nextBtn('材料')">下一题</button>
          </div>
        </div>
      </div>
      <div class="first-start-main-right" style="text-align:center;font-size:24px;" v-if="noData">
        <h1 style="margin:50px 0;">还有收藏哦！</h1>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      params: {}, //url参数
      checkList: ['选中且禁用'],
      user_id: this.$store.state.stu_id,
      noData: false, // 没有数据
      leftIndex: 0, // 左侧下标
      aId: '', // 保存当前题库记录 数据请求过来的
      allList: '', // 所有题数
      showLeftNav: 1, // 切换右边显示某个题的内容
      single: {
        // 单选题所有数据
        singleSelection: [], // 所有数据
        singleIndex: 1, // 下标
        singleNow: {}, // 当前数据
        title: '单选题',
        singleRadio: '',
        show: false
      },
      multiple: {
        // 多选题所有数据
        multipleSelection: [], // 所有数据
        multipleIndex: 1, // 下标
        multipleNow: {}, // 当前数据
        title: '多选题',
        multipleCheckbox: [],
        show: false
      },
      shortAnswer: {
        // 简答题
        shortAnswerSelection: [], // 所有数据
        shortAnswerIndex: 1, // 下标
        shortAnswerNow: {}, // 当前数据
        title: '简答题',
        shortAnswerValue: '',
        show: false
      },
      materialQus: {
        // 材料题
        selection: [], // 所有数据
        index: 1, // 下标
        now: {}, // 当前数据
        title: '材料题',
        value: '',
        show: false
      }
    }
  },
  created() {
    this.params = {
      title_one: this.$route.query.title_one,
      ibs_id: this.$route.query.ibs_id
    }
    // 初始化 收藏
    axios({
      method: 'post',
      url: '/api/stu/ItemBank/queryErrorCollectionQuestions',
      data: JSON.stringify({
        student_id: this.user_id, // 用户id
        type: 2, // 1 错题 2收藏
        ibs_id: this.params.ibs_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res = res.data
      console.log(res)
      if (!res.length) {
        this.noData = true
        return
      }
      // 题分类
      res.forEach((el) => {
        if (el.question_type === 7) {
          this.materialQus.selection.push(el)
        }
        // 多选题
        if (el.question_type === 4) {
          this.shortAnswer.shortAnswerSelection.push(el)
        }
        // 多选题
        if (el.question_type === 2) {
          this.multiple.multipleSelection.push(el)
        }
        // 单选题
        if (el.question_type === 1) {
          this.single.singleSelection.push(el)
        }
      })
      // 材料
      if (this.materialQus.selection.length) {
        this.materialQus.selection = this.filterData(this.materialQus.selection, '材料')
        this.initData(0, '材料')
        this.showLeftNav = 3
        this.leftIndex = 3
      }
      // 简答
      if (this.shortAnswer.shortAnswerSelection.length) {
        this.shortAnswer.shortAnswerSelection = this.filterData(this.shortAnswer.shortAnswerSelection, '简答')
        this.showLeftNav = 2
        this.leftIndex = 2
        this.initData(0, '简答')
      }
      // 多选
      if (this.multiple.multipleSelection.length) {
        this.multiple.multipleSelection = this.filterData(this.multiple.multipleSelection, '多选')
        this.showLeftNav = 1
        this.leftIndex = 1
        this.initData(0, '多选')
      }
      // 单选
      if (this.single.singleSelection.length) {
        this.single.singleSelection = this.filterData(this.single.singleSelection, '单选')
        this.showLeftNav = 0
        this.leftIndex = 0
        this.initData(0, '单选')
      }
    })
  },
  filters: {
    filterLevel(level) {
      level = level - 0
      switch (level) {
        case 1:
          return '简单'
        case 2:
          return '一般'
        case 3:
          return '困难'
      }
    }
  },
  methods: {
    // 标记（公用）
    sign(i, type) {
      let obj = {
        student_id: this.user_id, // 用户id
        question_id: '',
        tf_collection: null,
        tf_marked: i // 是否标记
      }
      switch (type) {
        case '单选':
          this.single.singleNow.tf_marked = i
          this.single.singleSelection[this.single.singleNow.serialnumber - 1].tf_marked = i
          obj.question_id = this.single.singleNow.question_id
          break
        case '多选':
          this.multiple.multipleNow.tf_marked = i
          this.multiple.multipleSelection[this.multiple.multipleNow.serialnumber - 1].tf_marked = i
          obj.question_id = this.multiple.multipleNow.question_id
          break
        case '简答':
          this.shortAnswer.shortAnswerNow.tf_marked = i
          this.shortAnswer.shortAnswerSelection[this.shortAnswer.shortAnswerNow.serialnumber - 1].tf_marked = i
          obj.question_id = this.shortAnswer.shortAnswerNow.question_id
          break
        case '材料':
          this.materialQus.now.tf_marked = i
          this.materialQus.selection[this.materialQus.now.serialnumber - 1].tf_marked = i
          obj.question_id = this.materialQus.now.question_id
          break
      }
      axios({
        method: 'post',
        data: JSON.stringify(obj),
        url: '/api/stu/ItemBank/AddToCancelCollection',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
      })
    },
    // 关闭解析
    isShow() {
      this.single.show = false
      this.multiple.show = false
      this.shortAnswer.show = false
      this.materialQus.show = false
    },
    // 返回做题
    goback() {
      window.history.go(-1)
    },
    // 收藏（公用）
    joinInCollection(i, type) {
      i = i === 1 ? 2 : 1
      let obj = {
        student_id: this.user_id,
        question_id: '',
        tf_collection: i,
        tf_marked: null
      }
      switch (type) {
        case '单选':
          this.single.singleNow.tf_collection = i
          this.single.singleSelection[this.single.singleNow.serialnumber - 1].tf_collection = i
          obj.question_id = this.single.singleNow.question_id
          break
        case '多选':
          this.multiple.multipleNow.tf_collection = i
          this.multiple.multipleSelection[this.multiple.multipleNow.serialnumber - 1].tf_collection = i
          obj.question_id = this.multiple.multipleNow.question_id
          break
        case '简答':
          this.shortAnswer.shortAnswerNow.tf_collection = i
          this.shortAnswer.shortAnswerSelection[this.shortAnswer.shortAnswerNow.serialnumber - 1].tf_collection = i
          obj.question_id = this.shortAnswer.shortAnswerNow.question_id
          break
        case '材料':
          this.materialQus.now.tf_collection = i
          this.materialQus.selection[this.materialQus.now.serialnumber - 1].tf_collection = i
          obj.question_id = this.materialQus.now.question_id
          break
      }
      axios({
        method: 'post',
        data: JSON.stringify(obj),
        url: '/api/stu/ItemBank/AddToCancelCollection',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
      })
    },
    // 重构数据为需要的的数据结构(公用)
    filterData(arr, type) {
      switch (type) {
        case '多选':
          arr.forEach((item, i) => {
            // 修改答案结构
            arr[i].optionanswer = arr[i].optionanswer
              .split(';')
              .map((el) => {
                el = el.split('#').slice(1)
                return {
                  title: el[0],
                  isTrue: el[1],
                  value: el[2]
                }
              })
              .filter((itm) => itm.title !== undefined)
            // 寻找真正答案
            arr[i].real = arr[i].optionanswer
              .map((itm) => {
                if (itm.isTrue === '是') {
                  return itm.title
                }
              })
              .filter((real) => real !== undefined)
            arr[i].myAnswer = arr[i].wrong_answer ? arr[i].wrong_answer.split(',') : []
            arr[i].isTrue = ''
            arr[i].serialnumber = i + 1
          })
          break
        case '单选':
          arr.forEach((it, i) => {
            arr[i].optionanswer = arr[i].optionanswer
              .split(';')
              .map((el) => {
                el = el.split('#').slice(1)
                return {
                  title: el[0],
                  isTrue: el[1],
                  value: el[2]
                }
              })
              .filter((itm) => itm.title !== undefined)
            arr[i].real = arr[i].optionanswer.find((item) => item.isTrue === '是').title
            arr[i].myAnswer = arr[i].wrong_answer
            arr[i].isTrue = ''
            arr[i].serialnumber = i + 1
          })
          break
        case '简答':
        case '材料':
          arr.forEach((item, i) => {
            arr[i].myAnswer = arr[i].wrong_answer
            arr[i].isTrue = ''
            arr[i].serialnumber = i + 1
          })
          break
        // case '材料':
        //   arr.forEach((item, i) => {
        //     arr[i].myAnswer = arr[i].wrong_answer
        //     arr[i].isTrue = ''
        //     arr[i].serialnumber = i + 1
        //   })
        //   break
      }
      return arr
    },
    // 点击li切换对应题内容（公用）
    changePage(i, type) {
      this.leftIndex = i
      this.showLeftNav = i
      this.isShow()
      this.initData(0, type)
    },
    // 切换右侧对应题种数据（公用）
    initData(i, type) {
      switch (type) {
        case '单选':
          this.single.singleNow = this.single.singleSelection[i]
          this.single.singleRadio = this.single.singleNow.myAnswer ? this.single.singleNow.myAnswer : ''
          break
        case '多选':
          this.multiple.multipleNow = this.multiple.multipleSelection[i]
          this.multiple.multipleCheckbox = this.multiple.multipleNow.myAnswer ? this.multiple.multipleNow.myAnswer : []
          break
        case '简答':
          this.shortAnswer.shortAnswerNow = this.shortAnswer.shortAnswerSelection[i]
          this.shortAnswer.shortAnswerValue = this.shortAnswer.shortAnswerNow.myAnswer ? this.shortAnswer.shortAnswerNow.myAnswer : ''
          break
        case '材料':
          this.materialQus.now = this.materialQus.selection[i]
          this.materialQus.value = this.materialQus.now.myAnswer ? this.materialQus.now.myAnswer : ''
          break
      }
    },
    // 下一题（公用）
    nextBtn(type) {
      let i = 0
      switch (type) {
        case '单选':
          this.single.singleIndex++
          this.single.singleIndex = this.single.singleIndex > this.single.singleSelection.length ? this.single.singleSelection.length : this.single.singleIndex
          this.showLeftNav = 0
          i = this.single.singleIndex - 1
          break
        case '多选':
          this.multiple.multipleIndex++
          this.multiple.multipleIndex = this.multiple.multipleIndex > this.multiple.multipleSelection.length ? this.multiple.multipleSelection.length : this.multiple.multipleIndex
          this.showLeftNav = 1
          i = this.multiple.multipleIndex - 1
          break
        case '简答':
          this.shortAnswer.shortAnswerIndex++
          this.shortAnswer.shortAnswerIndex =
            this.shortAnswer.shortAnswerIndex > this.shortAnswer.shortAnswerSelection.length ? this.shortAnswer.shortAnswerSelection.length : this.shortAnswer.shortAnswerIndex
          this.showLeftNav = 2
          i = this.shortAnswer.shortAnswerIndex - 1
          break
        case '材料':
          this.materialQus.index++
          this.materialQus.index = this.materialQus.index > this.materialQus.selection.length ? this.materialQus.selection.length : this.materialQus.index
          this.showLeftNav = 3
          i = this.materialQus.index - 1
          break
        default:
          break
      }
      this.isShow()
      this.initData(i, type)
    },
    // 上一题（公用）
    prevBtn(type) {
      let i = 0
      switch (type) {
        case '单选':
          this.single.singleIndex--
          this.single.singleIndex = this.single.singleIndex < 1 ? 1 : this.single.singleIndex
          this.showLeftNav = 0
          i = this.single.singleIndex - 1
          break
        case '多选':
          this.multiple.multipleIndex--
          this.multiple.multipleIndex = this.multiple.multipleIndex < 1 ? 1 : this.multiple.multipleIndex
          this.showLeftNav = 1
          i = this.multiple.multipleIndex - 1
          break
        case '简答':
          this.shortAnswer.shortAnswerIndex--
          this.shortAnswer.shortAnswerIndex = this.shortAnswer.shortAnswerIndex < 1 ? 1 : this.shortAnswer.shortAnswerIndex
          this.showLeftNav = 2
          i = this.shortAnswer.shortAnswerIndex - 1
          break
        case '材料':
          this.materialQus.index--
          this.materialQus.index = this.materialQus.index < 1 ? 1 : this.materialQus.index
          this.showLeftNav = 3
          i = this.materialQus.index - 1
          break
        default:
          break
      }
      this.isShow()
      this.initData(i, type)
    },
    // 判断选中是否对错（多选）
    successorerror() {
      return this.multiple.multipleCheckbox.join(',') == this.multiple.multipleNow.real.join(',') ? '对' : '错'
    },
    // radio选择（单选）
    changeRadio(istrue) {
      // 将选择的radio保存到当前数据
      this.single.singleNow.myAnswer = this.single.singleRadio
      // 保存是与否字段
      this.single.singleNow.isTrue = istrue
      // 将当前数据保存到对应单选总数据里
      this.single.singleSelection[this.single.singleNow.serialnumber - 1] = this.single.singleNow
    },
    // 复选框赋值（多选）
    changeCheckbox() {
      this.multiple.multipleNow.myAnswer = this.multiple.multipleCheckbox = this.multiple.multipleCheckbox.sort()
      // 判断是否多选题选择正确
      this.multiple.multipleNow.isTrue = this.successorerror()
      // 将当前数据保存到对应总数据里
      this.multiple.multipleSelection[this.multiple.multipleNow.serialnumber - 1] = this.multiple.multipleNow
    },
    // 简答题答题框（简答）
    changeText() {
      this.shortAnswer.shortAnswerNow.myAnswer = this.shortAnswer.shortAnswerValue
      // 判断是否填写答案正确（只要写就是正确）
      this.shortAnswer.shortAnswerNow.isTrue = this.shortAnswer.shortAnswerValue ? '对' : '错'
      // 将当前数据保存到对应总数据里
      this.shortAnswer.shortAnswerSelection[this.shortAnswer.shortAnswerNow.serialnumber - 1] = this.shortAnswer.shortAnswerNow
    },
    // 材料题答题框（材料）
    changeMQtext() {
      this.materialQus.now.myAnswer = this.materialQus.value
      // 判断是否填写答案正确（只要写就是正确）
      this.materialQus.now.isTrue = this.materialQus.value ? '对' : '错'
      // 将当前数据保存到对应总数据里
      this.materialQus.selection[this.materialQus.now.serialnumber - 1] = this.materialQus.now
    },
    // 小交卷
    submit(type) {
      // 错题提交 选择错误的答案不能提交
      let obj = {
        student_id: this.user_id, // 用户id
        question_id: 1, // 题id
        tf_wrong: 2 //
      }
      switch (type) {
        case '单选':
          if (this.single.singleNow.isTrue === '否') return alert('请选择正确答案提交！')
          obj.question_id = this.single.singleNow.question_id
          break
        case '多选':
          if (this.multiple.multipleNow.isTrue === '否') return alert('请选择正确答案提交！')
          obj.question_id = this.multiple.multipleNow.question_id
          break
        case '简答':
          if (this.shortAnswer.shortAnswerNow.isTrue === '否') return alert('请填写答案再提交！')
          obj.question_id = this.shortAnswer.shortAnswerNow.question_id
          break
        case '材料':
          if (this.materialQus.now.isTrue === '否') return alert('请填写答案再提交！')
          obj.question_id = this.materialQus.now.question_id
      }
      axios({
        method: 'post',
        data: JSON.stringify(obj),
        url: '/api/stu/ItemBank/errorsCommit',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data === 1) alert('交卷成功')
      })
    }
  }
}
</script>

<style lang="scss">
.question-collect {
  font-family: siyuanhei;
  min-width: 1361px;
  .inner {
    width: 1080px;
    margin: 0 auto;
  }
  .first-start-header {
    margin-top: 58px;
    height: 83px;
    border: 1px #e5e5e5 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 29px;
    margin-bottom: 30px;
    .first-start-header-left {
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 21px;
        margin-right: 10px;
        display: inline-block;
      }
      p {
        font-size: 23px;
        font-weight: bold;
        color: #383940;
        display: inline-block;
        span {
          color: #999999;
          font-size: 13px;
          font-weight: normal;
          margin-left: 10px;
        }
      }
    }
    .first-start-header-middle {
      font-size: 19px;
      color: #007fe1;
      font-weight: bold;
    }
    .first-start-header-right {
      .over,
      .suspend {
        width: 83px;
        height: 40px;
        line-height: 38px;
        border: 1px #e5e5e5 solid;
        color: #999999;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
        font-size: 16px;
      }
      .next {
        width: 110px;
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
        border-radius: 5px;
        font-size: 16px;
        background: #2f99eb;
      }
    }
  }
  .first-start-main {
    display: flex;
    justify-content: space-between;
    .first-start-main-nav {
      width: 27%;
      border: 1px #e5e5e5 solid;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .title {
        line-height: 54px;
        border-bottom: 1px #e5e5e5 solid;
        color: #646363;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        letter-spacing: 1px;
        span {
          color: #007fe1;
        }
      }
      .questionList {
        padding: 16px 0 24px 0;
        .errorList {
          padding-bottom: 22px;
          li {
            font-size: 12px;
            line-height: 48px;
            cursor: pointer;
            span {
              width: 129px;
              float: left;
              text-align: right;
            }
            b {
              width: 124px;
              float: right;
              text-align: left;
            }
          }
          .on {
            background-color: #07bbee;
            color: #fff;
          }
        }
      }
      .tips {
        line-height: 31px;
        font-size: 12px;
        color: #8c8b8b;
        text-align: right;
        padding-right: 20px;
        span {
          width: 4px;
          height: 4px;
          background: #ef0606;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .first-start-main-right {
      width: 72%;
      border: 1px #e5e5e5 solid;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 0 19px;
      .title {
        height: 59px;
        border-bottom: 1px #e5e5e5 solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 19px;
          font-weight: bold;
          color: #383940;
        }
        .signN {
          font-size: 13px;
          color: #999999;
          cursor: pointer;
          i {
            display: inline-block;
            width: 13px;
            height: 13px;
            background: url('../../assets/images/question/signN.png') no-repeat 0 0;
            margin-right: 8px;
          }
        }
        .signY {
          font-size: 13px;
          color: #ef0606;
          cursor: pointer;
          i {
            display: inline-block;
            width: 13px;
            height: 13px;
            background: url('../../assets/images/question/signY.png') no-repeat 0 0;
            margin-right: 8px;
          }
        }
      }
      .topic-content {
        padding-top: 14px;
        .content {
          line-height: 31px;
          font-size: 17px;
          color: #61646a;
          margin-bottom: 25px;
        }
        // 单选题
        .single-radio {
          width: 100%;
          padding-left: 42px;
          padding-bottom: 26px;
          border-bottom: 1px #e5e5e5 solid;
          position: relative;
          .el-radio {
            margin-bottom: 14px;
          }
          .err-or-success {
            p {
              width: 53px;
              height: 53px;
              position: absolute;
              bottom: -26.5px;
              left: 167px;
            }
            .err {
              background: url('../../assets/images/question/err.png') no-repeat 0 0;
              background-size: 100% 100%;
            }
            .success {
              background: url('../../assets/images/question/success.png') no-repeat 0 0;
              background-size: 100% 100%;
              left: 272px;
            }
          }
        }
        // 多选题
        .multiple-checkbox {
          width: 100%;
          padding-left: 42px;
          padding-bottom: 26px;
          border-bottom: 1px #e5e5e5 solid;
          position: relative;
          .err-or-success {
            p {
              width: 53px;
              height: 53px;
              position: absolute;
              bottom: -26.5px;
              left: 167px;
            }
            .err {
              background: url('../../assets/images/question/err.png') no-repeat 0 0;
              background-size: 100% 100%;
            }
            .success {
              background: url('../../assets/images/question/success.png') no-repeat 0 0;
              background-size: 100% 100%;
              left: 272px;
            }
          }
        }
        .analysis {
          padding-top: 36px;
          li {
            margin-bottom: 16px;
          }
          li span:nth-child(1) {
            font-size: 12px;
            font-weight: bold;
            color: #5e5c57;
          }
        }
      }
      .buttonBox {
        width: 100%;
        box-sizing: border-box;
        padding: 25px 30px 40px;
        text-align: right;
        span {
          margin-left: 16px;
          color: #999;
          cursor: pointer;
        }
        span,
        button {
          font-size: 12px;
          line-height: 26px;
        }
        button {
          padding: 0 17px;
          min-width: 72px;
          color: #fff;
          margin-left: 18px;
          border: none;
          outline: none;
        }
        .submit {
          background-color: #ff6666;
        }
        .prev,
        .next {
          background-color: #07bbee;
        }
      }
    }
  }
}
</style>
