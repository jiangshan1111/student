<template>
  <div class="student-star">
    <div class="headerImg">
      <div class="headerImgCon"></div>
    </div>
    <nav class="headerNav">
      <h2>学员心声</h2>
    </nav>
    <div
      class="stu-star clear"
      style="width: 1000px;
    margin: 0 auto;"
    >
      <div style="width:50%;float:left" v-for="(item, index) in stu" :key="index">
        <div class="stu_head" :style="'background-image:url(' + item.stu_head + ')'">
          <p>{{ item.stu_name }}</p>
        </div>
        <div class="stu_sound" v-html="item.stu_content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stu: []
    }
  },
  created() {
    this.$axios.post('api/stu/newInfo/studentVoice', {}).then((resp) => {
      if (resp.status == 200) {
        this.stu = resp.data
      } else {
        this.$message.error({
          type: 'info',
          message: '获取数据失败'
        })
      }
    })
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>

<style lang="scss">
/*学员心声*/
.student-star {
  .stu-star > div {
    height: 200px;
    padding: 10px 20px;
    display: flex;
  }
  .stu-star > div div {
    float: left;
  }
  .stu_head {
    width: 60px;
    background: url(../../assets/images/jiang/stu_head.png) no-repeat;
    background-size: contain;
    height: 90px;
    margin-right: 10px;
    position: relative;
  }
  .stu_head p {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .stu_sound {
    flex: 1;
    background: url(../../assets/images/jiang/mask.png) no-repeat;
    background-size: 100% 100%;
    height: 160px;
    padding: 10px 10px 10px 28px;
    line-height: 24px;
    letter-spacing: 2px;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b5 {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .background {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .box {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .transition {
    transition: all ease-in 0.3s;
  }
  .c3 {
    color: #333;
  }
  .headerImg,
  .headerImgCon {
    width: 100%;
    height: 340px;
  }
  .headerImg .headerImgCon {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .headerImgCon {
    background-image: url('../../assets/images/jiang/banner.png');
  }
  .headerNav {
    width: 100%;
    height: 72px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 3px 2px #eff2f7;
    -moz-box-shadow: 0 2px 3px 2px #eff2f7;
    box-shadow: 0 2px 3px 2px #eff2f7;
    margin-bottom: 34px;
  }
  .headerNav h2 {
    font-size: 24px;
    color: #333;
    margin: 0 auto;
    line-height: 72px;
    font-weight: normal;
    text-align: center;
  }
  .sectionList {
    width: 100%;
    position: relative;
  }
  .sectionList ul {
    float: left;
  }
  .sectionList li {
    padding: 10px;
    width: 285px;
    background-color: #fff;
    float: left;
    transition: all ease-in 0.3s;
  }
  .sectionList li:hover {
    -webkit-box-shadow: 0 -1px 6px 4px #eff2f7;
    -moz-box-shadow: 0 -1px 6px 4px #eff2f7;
    box-shadow: 0 -1px 6px 4px #eff2f7;
  }
  .listHeadImg {
    width: 100%;
    min-height: 40px;
  }
  .listHeadImg img {
    width: 100%;
  }
  .listUserCon {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 0;
    top: -30px;
    height: 79px;
  }
  .listUserCon img {
    width: 60px;
    height: 60px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 3px solid #fff;
    background-color: #fff;
  }
  .listUserCon p,
  .listUserCon .line {
    display: inline-block;
  }
  .listUserCon p {
    font-size: 14px;
    color: #333;
    line-height: 14px;
    padding: 10px 20px 8px;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .listUserCon .line {
    width: 15px;
    height: 2px;
    border-top: 2px solid #07bbee;
  }
  .contentExp {
    font-size: 12px;
    color: #666;
    line-height: 18px;
    padding-bottom: 34px;
    padding-top: 7px;
    word-break: break-all;
  }
  .noContent {
    font-size: 12px;
    color: #999;
    line-height: 12px;
    padding: 50px 0 60px;
    width: 100%;
    text-align: center;
  }
  .sectionList ul {
    position: relative;
  }
  .listBox {
    width: 100%;
  }
  #parenteList {
    width: 100%;
    position: relative;
    margin: 0 auto;
  }
  .noStudentWish {
    font-size: 14px;
    color: #666;
    width: 100%;
    text-align: center;
    padding-top: 26px;
  }
}
</style>
