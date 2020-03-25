<template>
  <!-- 章节练习 -->
  <div class="zjlx">
    <div v-if="chapterlist.length" style="max-height:360px;overflow-y:auto;">
      <div class="content" v-for="(chapter, i) in chapterlist" :key="i">
        <div class="title">
          <div class="title-left">
            <p class="openImg" :class="chapter.show ? '' : 'closeImg'" @click="changeSubject(i)"></p>
            <span>{{ chapter.name }}</span>
          </div>
          <div class="title-right">
            <span>共{{ chapter.num }}道</span>
            <button @click="fatherOnOff(chapter)">开始做题</button>
          </div>
        </div>
        <transition name="fade">
          <ul class="list-box" v-show="chapter.show">
            <li v-for="(j, jindex) in chapter.jie" :key="jindex">
              <span class="list-box-left"> {{ j.name }}</span>
              <p class="list-box-right">
                <span>共{{ j.num }}道</span>
                <i class="edit" @click="fatherOnOff(j)"></i>
              </p>
            </li>
          </ul>
        </transition>
      </div>
    </div>

    <div class="noData" v-else>
      <img src="@/assets/images/question/noRecord.png" alt="" />
      <p>目前还没有章节可做哦～</p>
    </div>
  </div>
</template>

<script>
// 章节练习
export default {
  data() {
    return {}
  },
  props: {
    chapterlist: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  created() {},
  methods: {
    changeSubject(i) {
      this.$set(this.chapterlist[i], 'show', !this.chapterlist[i].show)
    },
    fatherOnOff(chapter) {
      if (!chapter.num) {
        this.$message({
          message: '没有题目可作！',
          type: 'warning'
        })
        return
      }
      let obj = {
        onoff: true,
        chapter: chapter
      }
      this.$emit('child-on-off', obj)
    }
    // 子触发父 sync语法糖
    // fatherOnOff() {
    //   this.$emit('update:child-on-off', true)
    // }
  }
}
</script>

<style lang="scss">
.zjlx {
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: siyuanhei;
  min-height: 290px;
  max-height: 420px;
  overflow-y: hidden;
  .content {
    border: 1px #e5e5e5 solid;
    border-top: none;
    .title {
      height: 48px;
      border-bottom: 1px #e5e5e5 solid;
      display: flex;
      justify-content: space-between;
      align-content: center;
      box-sizing: border-box;
      padding: 0 13px;
      .title-left {
        display: flex;
        align-items: center;
        .openImg {
          background: url('../../assets/images/question/open.png') no-repeat 0 0;
          width: 22px;
          height: 22px;
          margin-right: 12px;
          cursor: pointer;
        }
        .closeImg {
          background: url('../../assets/images/question/close.png') no-repeat 0 0;
        }
        span {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .title-right {
        display: flex;
        align-items: center;
        span {
          font-size: 13px;
          color: #999999;
          margin-right: 16px;
        }
        button {
          width: 78px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          color: #007fe1;
          border: 1px #007fe1 solid;
          border-radius: 3px;
          box-sizing: content-box;
          padding: 0;
        }
        button:hover {
          border-color: blue;
          color: blue;
        }
      }
    }
    .list-box {
      background-color: #f8f8f8;
      box-sizing: border-box;
      padding: 19px 13px 14px 46px;
      min-height: 50px;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        .list-box-left,
        .list-box-right {
          font-size: 13px;
          color: #999999;
        }
        .list-box-right .edit {
          display: inline-block;
          width: 13px;
          height: 16px;
          margin-left: 21px;
          background: url('../../assets/images/question/edit.png') no-repeat 0 0;
          cursor: pointer;
        }
        .list-box-right .edit,
        .list-box-right span {
          vertical-align: middle;
        }
      }
    }
  }
  .content:nth-child(1) {
    border-top: 1px #e5e5e5 solid;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .noData {
    text-align: center;
    font-size: 26px;
    color: #8c8c8c;
  }
}
</style>
