<template>
  <div class="wrap pay-content" style="">
    <div class="pay-title">
      <h1 class="h5">
        <i></i>您已成功购买商品，请到个人中心课程表中查看相关课程安排！
        <!-- <p>课程信息：消防工程师定金班</p> -->
      </h1>
    </div>
    <p class="view-btn">
      <a href="javascript:void(0)" @click="goNext" class="btn btn-default btn-bigger">查看课程安排</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stu: []
    }
  },
  created() {},
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style>
.pay-content {
  width: 960px;
  min-height: 500px;
  margin: 20px auto;
  padding: 60px 120px 20px;
  background-color: #fff;
  border: 1px solid #dee1e5;
}

.pay-content .pay-title {
  position: relative;
  height: 50px;
}

.pay-content .pay-title .h4 {
  text-indent: 70px;
  line-height: 50px;
}

.pay-content .pay-title .h4 i {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-image: url(../../assets/images/jiang/pay-icons.png);
  background-repeat: no-repeat;
  background-position: 0 0;
}

.pay-content .pay-title .h4 i.fail {
  background-image: url(../../assets/images/jiang/pay-icons.png);
  background-repeat: no-repeat;
  background-position: 0 -50px;
}

.pay-content .pay-title .h5 {
  text-indent: 70px;
  line-height: 30px;
}

.pay-content .pay-title .h5 i {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-image: url(../../assets/images/jiang/pay-icons.png);
  background-repeat: no-repeat;
  background-position: 0 0;
}

.pay-content .pay-title .h5 i.fail {
  background-image: url(../../assets/images/jiang/pay-icons.png);
  background-repeat: no-repeat;
  background-position: 0 -50px;
}

.pay-content .pay-title .h5 a {
  color: #45abdb;
}

.pay-content .view-btn {
  margin: 50px 0 30px;
  padding-left: 70px;
}

.pay-content .view-btn .btn {
  padding: 0 30px;
  line-height: 50px;
  font-size: 14px;
  font-size: 1.4rem;
}

.pay-content .ps {
  margin: 30px auto;
  padding: 20px 70px 10px;
  border-top: 1px solid #ededed;
}

.pay-content .ps p {
  margin-bottom: 0;
  line-height: 2;
  font-size: 12px;
  font-size: 1.2rem;
  color: #7f7f7f;
}

.pay-content .pay-infos {
  margin: 30px auto 15px;
  padding: 26px 30px 16px;
  border: 1px solid #dfe1e5;
}

.pay-content .pay-infos p {
  margin-bottom: 0.5em;
  color: #7f7f7f;
}

.pay-content .pay-infos em {
  color: #45abdb;
}

.pay-content .pay-infos i {
  color: #f21919;
  font-style: normal;
}

.pay-content .infos {
  color: #7f7f7f;
  font-size: 12px;
  font-size: 1.2rem;
}

.pay-content .infos a {
  color: #45abdb;
}

.pay-content .pay-type {
  margin: 30px auto 20px;
}

.pay-content .pay-type .h6 {
  font-size: 14px;
  font-size: 1.4rem;
  color: #b2b2b2;
}

.pay-content .pay-type .pay-type-infos {
  position: relative;
  margin: 80px auto 20px;
  padding: 20px 20px;
  border: 1px solid #45abdb;
  background-color: #fdf8f2;
}

.pay-content .pay-type .pay-type-infos .pay-type-tab {
  position: absolute;
  top: -39px;
  left: -1px;
  height: 38px;
  border: 1px solid #b2b2b2;
  border-bottom: none;
  border-right: none;
}

.pay-content .pay-type .pay-type-infos .pay-type-tab a {
  display: block;
  float: left;
  width: 96px;
  line-height: 37px;
  background-color: #f7f7f7;
  text-align: center;
}

.pay-content .pay-type .pay-type-infos .pay-type-tab a.active {
  background-color: #45abdb;
  border: 1px solid #45abdb;
  color: #fff;
}

.pay-content .pay-type .pay-type-infos .pay-type-tab a:hover {
  text-decoration: none;
}

.pay-content .pay-type .pay-type-infos .banks ul {
  overflow: hidden;
}

.pay-content .pay-type .pay-type-infos .banks li {
  float: left;
  margin: 0 20px 10px 0;
}

.pay-content .pay-type .pay-type-infos .banks li input {
  float: left;
  margin: 10px 5px;
  vertical-align: middle;
}

.pay-content .pay-type .pay-type-infos .pay-alis {
  display: none;
}

.pay-content .pay-type .text-align {
  text-align: right;
}

.pay-content .pay-type .text-align em {
  font-size: 32px;
  font-size: 3.2rem;
  color: #f21919;
}

.pay-content .layer {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 110px;
  margin-left: -225px;
  margin-top: -105px;
  padding: 50px 60px 40px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 2;
}

.pay-content .layer .text {
  margin-bottom: 3em;
  font-size: 12px;
  font-size: 1.2rem;
}

.pay-content .layer .btns {
  overflow: hidden;
  text-align: center;
}

.pay-content .layer .btn-gray {
  float: left;
  color: #fff;
}

.pay-content .layer .btn-warning {
  float: right;
}

.pay-content .layer a.btn {
  height: 50px;
  line-height: 50px;
  padding: 0 40px;
  font-size: 14px;
  font-size: 1.4rem;
}

.pay-content .layer-bg {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.pay-content .pay-title .h5 p {
  margin-left: 70px;
  text-indent: 0;
}
.layui-layer-btn .layui-layer-btn1 {
  background: #788186 !important;
}

/*ipad 样式*/
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .pay-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
