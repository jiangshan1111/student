<template>
  <div class="content-right my-invite" id="my-order" style="overflow: auto; min-height: 594px;">
    <div class="right-box" v-if="activeIndexa == 1">
      <div class="mynote-title">我的订单</div>
      <div class="order-right-nav">
        <div class="drop-box">
          <div @click="change_orders_label('all')" :class="orders_label == 'all' ? 'order-state fl classify-active' : 'order-state fl'" datavalue="">全部</div>
          <div @click="change_orders_label('al')" :class="orders_label == 'al' ? 'order-state fl classify-active' : 'order-state fl'" datavalue="PAY_SUCCESS">
            支付完成（<span class="successNo">{{ al_orders.length }}</span
            >）
          </div>
          <div @click="change_orders_label('un')" :class="orders_label == 'un' ? 'order-state fl classify-active' : 'order-state fl'" datavalue="PAY_NON">
            未支付（<span class="failNo">{{ un_orders.length }}</span
            >）
          </div>
          <div @click="change_orders_label('timeout')" :class="orders_label == 'timeout' ? 'order-state fl classify-active' : 'order-state fl'" datavalue="PAY_CANCLE">
            已失效（<span class="cancleNo">{{ timeout_orders.length }}</span
            >）
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="indentBox">
        <div class="indentList clear" v-for="(item, index) in orders" :key="index">
          <div class="shopDetail">
            <h3 class="classesName">
              <span>{{ item.product_name }}</span>
            </h3>
            <ul class="clear detailList">
              <li>
                <h4>下单时间</h4>
                <p class="orderTime">
                  <span>{{ getNowFormatDate(new Date(item.order_time)) }}</span>
                </p>
              </li>
              <li>
                <h4>商品价</h4>
                <p class="realPrice">
                  <span>￥</span>
                  <span>{{ item.product_price }}</span>
                </p>
              </li>
              <li>
                <h4>减免金额</h4>
                <p class="JMPrice">
                  <span>￥</span>
                  <span>{{ item.product_price - item.refund_payment_money }}</span>
                </p>
              </li>
              <li>
                <h4>实付款</h4>
                <p class="orderPrice">
                  <span>￥</span>
                  <span>{{ item.refund_payment_money == null ? 0 : item.refund_payment_money }}</span>
                </p>
              </li>
              <li>
                <h4>支付方式</h4>
                <p class="payType">
                  <span>{{ item.budget_way }}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="indentStatus">
            <div class="indentCen">
              <h4>
                <span class="orderNum"
                  >订单号：<b>{{ item.order_num }}</b></span
                >
              </h4>
              <span class="indentTime" :style="item.order_status != '未支付' ? 'display: none;' : 'display: block'"
                ><i></i><em>{{ item.countDownList }}</em></span
              >
              <span v-if="item.order_status != '未支付'" class="status">{{ item.order_status }}</span>
              <span v-if="item.order_status == '未支付'" style="cursor:pointer" class="status" @click="cancel_order(item.order_num)">取消订单</span>
            </div>
          </div>
          <div class="butHor">
            <div class="butHorcen">
              <button class="toPay" @click="go_pay(item, '支付宝网页')" v-if="item.order_status == '未支付'" style="margin-bottom: 0;">支付宝</button>
              <button class="toPay" @click="go_pay(item, '微信网页')" v-if="item.order_status == '未支付'" style="margin-bottom: 0;">微信</button>
              <button class="toDetail" @click="go_order_detail(item)" data-id="8437705">订单详情</button>
            </div>
          </div>
        </div>
      </div>
      <!-- ajax加载中div开始 -->
      <div class="loading lp-units-loading" style="display: none">
        <p><i></i>加载中,请稍后...</p>
      </div>
      <div class="loading-bg lp-units-loading-bg" style="display: none"></div>
      <!-- ajax加载中div结束 -->
    </div>
    <div class="right-box" v-if="activeIndexa == 12">
      <div class="mynote-title clear">
        我的订单<a
          id="back"
          class="fr"
          href="javascript:void(0)"
          style="right:0;background-color: #00aaff; color: #fff; font-size: 14px;text-align: center; padding: 8px 11px; line-height: 1; border-radius: 3px;"
          @click="activeIndexa = 1"
          >返回</a
        >
      </div>
      <div class="indentBox">
        <div class="myIndentCon">
          <h4 class="clear indentTitle">
            <b class="fl">{{ detail_order.product_name }}</b>
            <span class="fr"
              >订单号：<b>{{ detail_order.order_num }}</b></span
            >
          </h4>
          <ul class="oderTime clear">
            <li>
              <h5>下单时间</h5>
              <span>{{ getNowFormatDate(new Date(detail_order.order_time)) }}</span>
            </li>
            <li>
              <h5>商品金额</h5>
              <span>{{ detail_order.product_price }}</span>
            </li>
            <li>
              <h5>支付方式</h5>
              <span>{{ detail_order.budget_way }}</span>
            </li>
            <li>
              <h5>订单状态</h5>
              <span class="paid">{{ detail_order.order_status }}</span>
            </li>
            <li>
              <h5>支付时间</h5>
              <span>{{ detail_order.refund_payment_time == null ? '' : getNowFormatDate(new Date(detail_order.refund_payment_time)) }}</span>
            </li>
          </ul>

          <div class="payDetail clear" v-if="detail_order.order_status == '支付成功'">
            <h3 class="fl">
              支付明细：<span
                >商品价￥<em>{{ detail_order.product_price }}</em></span
              ><b>=</b>
            </h3>
            <p class="fl">
              <span
                >(实付款：￥<b>{{ detail_order.refund_payment_money == null ? 0 : detail_order.refund_payment_money }}</b
                >)</span
              >

              <span
                >+(优惠券折扣：￥<b>{{ detail_order.product_price - detail_order.refund_payment_money }}</b
                >)</span
              >
            </p>
          </div>
        </div>
      </div>

      <div class="pages">
        <ul class="pagination"></ul>
      </div>
      <!-- ajax加载中div开始 -->
      <div class="loading lp-units-loading" style="display: none">
        <p><i></i>加载中,请稍后...</p>
      </div>
      <div class="loading-bg lp-units-loading-bg" style="display: none"></div>
      <!--  ajax加载中div结束 -->
    </div>
    <div class="tishiAlert" v-show="model == 1" style="display: block;">
      <div>
        <i class="iconfont"></i>
      </div>
      <h1>请您在打开的网页中进行支付</h1>
      <p>支付完成前请不要关闭该窗口</p>
      <div class="btns">
        <button class="failBtn" @click="pay_search()">支付遇到问题</button>
        <button class="successBtn" @click="pay_search()">支付成功</button>
      </div>
    </div>
    <div class="opc" v-show="model == 1" style="display: block;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      interval: '',
      model: 0,
      order_num: '',
      //我的订单相关
      orders: [],
      al_orders: [],
      all_orders: [],
      un_orders: [],
      timeout_orders: [],
      orders_label: 'all',
      detail_order: {}
    }
  },
  created() {
    let _this = this
    //我的订单
    this.$axios
      .post('/api/stu/queryMyOrder', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.all_orders = data
        _this.orders = data
        data.map((item) => {
          item['countDownList'] = '00:00:00'
          item['actEndTime'] = new Date(new Date(item.order_time).getTime() + 100 * 24 * 3600 * 1000)
          if (item.order_status == '支付成功') {
            _this.al_orders.push(item)
          } else if (item.order_status == '未支付') {
            _this.un_orders.push(item)
          } else if (item.order_status == '已失效') {
            _this.timeout_orders.push(item)
          }
        })

        _this.interval = setInterval(() => {
          _this.countDown()
        }, 1000)
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
  methods: {
    activeA(num) {
      this.activeIndexa = num
    },
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    //查询是否支付成功
    pay_search() {
      let _this = this
      this.$axios
        .post('/api/order/Verification ', {
          order_num: _this.order_num,
          stu_id: _this.$store.state.stu_id
        })
        .then((resp) => {
          let data = resp.data
          if (data.code == 200) {
            _this.$router.push('/orderSuccess')
          } else {
            _this.$router.push('/orderError')
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
    go_pay(item, way) {
      let _this = this
      let obj = {
        outTradeNo: item.order_num,
        stu_id: _this.$store.state.stu_id,
        // "small_discount_id":item.selected_coupon.small_discount_id,
        type: way,
        price: item.refund_payment_money
      }
      this.order_num = item.order_num
      localStorage.pay_way_info = JSON.stringify(obj)
      let routeData = this.$router.resolve({ path: '/orderType' })
      window.open(routeData.href)
      // this.$router.push('/orderType')

      _this.model = 1
    },
    cancel_order(order_num) {
      console.log(order_num)
    },
    getNowFormatDate(date) {
      let seperator1 = '-'
      let seperator2 = ':'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
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
      let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute + seperator2 + second
      return currentdate
    },
    change_orders_label(label) {
      this.orders_label = label
      clearInterval(this.interval)
      if (label == 'all') {
        this.orders = this.all_orders
        this.interval = setInterval(() => {
          this.countDown()
        }, 1000)
      } else if (label == 'al') {
        this.orders = this.al_orders
      } else if (label == 'un') {
        this.orders = this.un_orders
        this.interval = setInterval(() => {
          this.countDown()
        }, 1000)
      } else if (label == 'timeout') {
        this.orders = this.timeout_orders
      }
    },
    //查看订单详情
    go_order_detail(item) {
      this.detail_order = item
      this.activeIndexa = 12
    },
    //未支付订单倒计时
    countDown() {
      let obj1 = JSON.parse(JSON.stringify(this.orders))
      obj1.map((item) => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(item.actEndTime).getTime()
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          let hou = parseInt((time % (60 * 60 * 24)) / 3600)
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
          obj = {
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else {
          // 活动已结束，全部设置为'00'
          obj = {
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        item.countDownList = obj.hou + ':' + obj.min + ':' + obj.sec
      })
      this.orders = obj1
    },
    goNext(router) {
      this.$router
        .push({
          path: router
        })
        .catch((err) => {
          console.log(err)
        })
    },
    activeB(num) {
      this.activeIndexb = num
    }
  }
}
</script>
<style lang="scss">
#my-order {
  .tishiAlert {
    width: 540px;
    height: 380px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -190px;
    margin-left: -270px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: #fff;
    z-index: 10000;
    text-align: center;
    padding-top: 40px;
    display: none;
  }
  .tishiAlert .iconfont {
    font-size: 60px;
    color: #fe5151;
  }
  .tishiAlert h1 {
    font-size: 18px;
    color: #474747;
    margin-top: 30px;
  }
  .tishiAlert p {
    font-size: 14px;
    color: #949494;
    margin-top: 20px;
  }
  .tishiAlert .btns button {
    width: 130px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    margin: 0 15px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 40px;
  }
  .tishiAlert .failBtn {
    background: #ccc;
  }
  .tishiAlert .successBtn {
    background: #ff6604;
  }
  .opc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: none;
  }
  .indentBox,
  .indentList {
    width: 100%;
  }
  .indentBox {
    max-height: 480px;
    overflow-y: auto;
  }
  .indentList {
    position: relative;
    padding-right: 313px;
    margin-top: 30px;
    border: 1px solid #ececec;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fbfbfb;
  }
  .shopDetail {
    min-width: 565px;
    border-right: 1px solid #ececec;
  }
  .detailList li {
    float: left;
    border-right: 1px solid #f0f0f0;
    min-width: 95px;
    padding-right: 10px;
    padding-left: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .detailList li:last-child {
    border: none;
  }
  .detailList {
    padding-bottom: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .detailList li h4 {
    font-size: 12px;
    color: #939ca5;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .detailList li p {
    font-size: 12px;
    color: #333;
    line-height: 24px;
  }
  .classesName {
    font-size: 16px;
    line-height: 20px;
    color: #333;
    padding: 18px 14px 21px;
  }
  .indentStatus {
    position: absolute;
    top: 50%;
    right: 126px;
    width: 186px;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    padding-top: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .indentStatus h4,
  .indentStatus p {
    font-size: 12px;
    text-align: center;
  }
  .indentStatus h4 {
    font-size: 12px;
    color: #939ca5;
    line-height: 18px;
  }
  .indentTime,
  span.status {
    font-size: 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 14px;
  }
  span.status {
    font-size: 12px;
    color: #858c94;
  }
  span.status b {
    cursor: pointer;
  }
  .indentTime i {
    font-family: iconfont !important;
    font-size: 12px;
    color: #fe2525;
    line-height: 14px;
    margin-right: 6px;
    vertical-align: top;
  }
  .indentTime em {
    font-size: 12px;
    color: #fe2525;
    line-height: 14px;
  }
  .butHor {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    width: 126px;
    height: 100%;
    border-left: 1px solid #ececec;
  }
  .butHor .butHorcen {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .butHor button {
    width: 70px;
    height: 30px;
    margin: 8px 0;
    border: 1px solid transparent;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size: 12px;
    padding: 0;
    text-align: center;
    line-height: 28px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .butHor .toPay {
    border-color: #ff6604;
    color: #ff6604;
  }
  .butHor .toPay:hover {
    background-color: #ff6604;
    color: #fff;
  }
  .butHor .toDetail {
    border-color: #00aaff;
    color: #00aaff;
  }
  .butHor .toDetail:hover {
    background-color: #00aaff;
    color: #fff;
  }
  .status .noDefult {
    color: #333;
    font-size: 14px;
  }
  .myIndentCon {
    width: 100%;
    margin-top: 30px;
    border: 1px solid #ececec;
  }
  .indentTitle {
    font-size: 14px;
    line-height: 40px;
    background-color: #f0f0f0;
    padding: 0 20px 0px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .indentTitle span {
    color: #999;
  }
  .indentTitle b {
    color: #333;
    width: 70%;
    word-break: break-all;
    margin-top: 8px;
    line-height: 24px;
  }
  .oderTime li {
    float: left;
    width: 20%;
    text-align: center;
    padding-top: 20px;
    min-height: 88px;
    border-right: 1px solid #ececec;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .oderTime li:last-child {
    border: none;
  }
  .oderTime li h5 {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-bottom: 12px;
  }
  .oderTime li span {
    font-size: 14px;
    color: #333;
    line-height: 20px;
    margin: 0 5px;
  }
  .oderTime li .paid {
    color: #00aaff;
  }
  .oderTime li .paid {
    color: #00aaff;
  }
  .oderTime li .paid {
    color: #00aaff;
  }
  .oderTime li .error {
    color: #fb4d55;
  }
  .payDetail {
    border-top: 1px solid #ececec;
    padding: 0 16px;
  }
  .payDetail h3,
  .payDetail p {
    font-size: 14px;
    line-height: 20px;
    padding: 12px 0;
  }
  .payDetail h3 {
    color: #999;
    max-width: 23%;
  }
  .payDetail h3 span {
    color: #fe5151;
  }
  .payDetail h3 b {
    color: #333;
  }
  .payDetail p {
    color: #333;
    max-width: 77%;
  }
}
</style>
