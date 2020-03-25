<template>
  <div class="wrap pay-content" style="">
    <div class="pay-page pay-weixin">
      <div class="pay-info clear">
        <h1>请您及时付款，以便订单尽快处理！</h1>
        <h2>
          订单号：<em>{{ pay_way_info.outTradeNo }}</em>
        </h2>
        <div class="clear word">
          <p class="fl">
            请您提交订单后尽快完成支付
          </p>
          <span class="fr"
            >应付金额 :<em>{{ pay_way_info.price }}</em
            >元
          </span>
        </div>
      </div>
      <div class="pay-weixin-style">
        <div class="l-ewm-wrap bg_gray">
          <p>请使用<em>微信</em><img src="@/assets/images/jiang/rewei.png" alt="" /><em>扫一扫</em></p>
          <p>扫描图片中的二维码进行支付</p>
          <div class="ewm-cont">
            <img id="img" :src="wexinImg" style="width:240px;height:240px;display:block" />
            <span class="word-wrap used"
              >二维码过期还剩 <em id="times">{{ time_top }}</em
              >秒，过期后<br />请刷新页面重新获取二维码</span
            >
            <span class="word-wrap noused" style="display: none;">二维码已过期<br />请<em style="cursor: pointer;" onclick="javascript:location.reload();">刷新</em>页面重新获获取二维码</span>
          </div>
        </div>
        <div>
          <img src="@/assets/images/jiang/scan_wx.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      currentPage: 1, //初始页
      activeIndexa: 0,
      activeIndexb: 0,
      pagesize: 10, //    每页的数据
      model: 0,
      value2: '',
      time_top: 290,
      pay_way_info: {},
      wexinImg: ''
    }
  },
  created() {
    let _this = this
    setInterval(() => {
      _this.time_top -= 1
    }, 1000)
    _this.pay_way_info = JSON.parse(localStorage.pay_way_info)
    let obj = JSON.parse(localStorage.pay_way_info)
    if (obj.type == '支付宝网页') {
      obj.returnUrl = 'http://localhost:8080/usersCenter'
    }
    delete obj.price
    this.$axios
      .post('/api/order/paySend', obj)
      .then((resp) => {
        if (obj.type == '支付宝网页') {
          $('body').html(resp.data)
        } else {
          setTimeout(() => {
            QRCode.toDataURL(resp.data.data)
              .then((url) => {
                setTimeout(() => {
                  this.wexinImg = url
                }, 20)
              })
              .catch((err) => {
                console.error(err)
              })
          }, 20)
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
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style>
.pay-page {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
}
.pay-weixin .pay-info {
  height: 160px;
  padding: 30px 30px 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.pay-weixin .pay-info h2 {
  font-size: 14px;
  color: #474747;
  margin-bottom: 5px;
}

.pay-weixin .pay-info h1 {
  font-size: 18px;
  color: #474747;
  margin-bottom: 40px;
}

.pay-weixin .pay-info .word {
  font-size: 14px;
  color: #949494;
}

.pay-weixin .pay-info p em {
  color: #fe5151;
}

.pay-weixin .pay-info span {
  font-size: 16px;
  color: #949494;
}

.pay-weixin .pay-info span em {
  font-size: 24px;
  color: #ff6604;
  margin: 0 8px;
  font-weight: bold;
}

.pay-weixin-style {
  width: 100%;
  background: #f7f7f7;
  padding: 75px 0 60px;
  text-align: center;
}
.pay-weixin .pay-info {
  background: #fff;
}
.pay-weixin-style {
  background: #fff;
}
.pay-weixin-style {
  margin-top: 10px;
}

.pay-weixin-style > div {
  display: inline-block;
  vertical-align: top;
  margin-right: 60px;
}
</style>
