<template>
  <div class="wrap pay-content" style="">
    <div class="pay-title">
      <h1 class="h5"><i class="fail"></i>付款失败！您可以到个人中心中查看未完成订单，以继续支付。</h1>
    </div>
    <p class="view-btn"><el-button type="info" round>查看未完成订单</el-button></p>
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
  methods: {
    goNext() {}
  },
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

.pay-content .pay-title .h5 {
  text-indent: 70px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-content .pay-title .h5 i {
  width: 50px;
  height: 50px;
  background-image: url(../../assets/images/jiang/pay-icons.png);
  background-repeat: no-repeat;
  background-position: 0 0;
  margin-right: 10px;
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
  margin-top: 50px;
  text-align: center;
}
</style>
