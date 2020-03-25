<template>
  <div class="detail-content">
    <!-- <div v-html="detailsLeft" style="width:75%;">
      <img src="http://image.yunduoketang.com/editor/34270/20191016/46188844-71f1-48c1-b709-cb94891df286.png" alt="" width="100%" />
    </div> -->
    <div style="width:70%;">
      <img src="http://image.yunduoketang.com/editor/34270/20191016/46188844-71f1-48c1-b709-cb94891df286.png" alt="" width="100%" />
    </div>
    <div class="cright-box" style="width:25%;">
      <article>
        <header class="teachers-right-header">
          <span class="left">名师</span>
        </header>
        <main class="teachers-right-main">
          <ol>
            <li class="teacher clear" v-for="(tea, i) in teachers" :key="i">
              <img :src="tea.head" alt="" />
              <div class="name">
                <span>{{ tea.true_name }}</span>
                <p class="desc" v-html="tea.introduction"></p>
              </div>
            </li>
          </ol>
          <el-pagination small layout="prev, pager, next" class="teacher-pagination" :total="8" :page-size="4"> </el-pagination>
        </main>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    teachers: {
      type: Array,
      default: function() {
        return []
      }
    },
    detailsLeft: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.detail-content {
  width: 100%;
  padding-top: 23px;
  display: flex;
  justify-content: space-between;
  .right-box {
    padding-left: 30px;
    padding-right: 0;
  }
  .teachers-right-header {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    .left {
      color: #474747;
      font-size: 16px;
    }
  }
  .teachers-right-main {
    .teacher {
      padding: 20px 0 10px 0;
      height: 89px;
      overflow: hidden;
      margin-bottom: 11px;
      img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;
      }
      .name {
        float: left;
        width: 60%;
        span {
          font-size: 15px;
          color: #656a70;
        }
        .desc {
          font-size: 12px;
          color: #bbbfc4;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .teacher-pagination {
      text-align: right;
    }
  }
}
</style>
