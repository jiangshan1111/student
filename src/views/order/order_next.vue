<template>
  <div class="wrap" style="">
    <div class="contUp clear">
      <span class="statusPic"></span>
      <dl class="right">
        <dt>订单提交成功，请尽快支付~</dt>
        <dd class="fenLei">
          <span>商品类别：</span>
          <b>{{ order_type }}</b>
        </dd>
        <dd class="bianHao clear">
          <span
            ><b>订单编号：</b><em>{{ order_num }}</em></span
          >
          <strong
            >应付金额：<em class="money">￥{{ order_type == '课程' ? course_info.special_price : class_info.favorable_price }}</em
            >元</strong
          >
        </dd>
      </dl>
    </div>
    <div class="contDown">
      <p class="choseTitle">
        <span @click="change_youhui" style="cursor: pointer;" class="moreSelect">
          使用优惠券
          <i class="iconfont">{{ youhui_lebel == true ? '' : '' }}</i>
        </span>
      </p>

      <div class="selChose" v-if="youhui_lebel == true" style="display: block;">
        <ul class="choseTable clear">
          <li class="active">优惠券</li>
        </ul>
        <div class="tableCont">
          <div class="tableCont1">
            <ul class="quan clear">
              <li v-for="(item, index) in coupon_info" :key="index" @click="choose_coupon(item)" :class="item.tf_use == 1 ? (item.choose == true ? 'quan active' : 'quan') : 'quan disN'">
                <p class="zheKou" v-if="item.preferential_way == '满减'" name="ticket" typevalue="1" data-val="1.0" code="KHUpXLuwmQX3mCh0" overnum="111.0">
                  <i>￥</i><em>{{ item.dc_denomination.split(',')[1] }}</em
                  ><span>满{{ item.dc_denomination.split(',')[0] }}</span>
                </p>
                <p class="zheKou" v-if="item.preferential_way == '折扣'" name="ticket" typevalue="2" data-val="8.0" code="Y0m73cN4ltlU0fWk">
                  <em>{{ item.dc_denomination }}</em
                  >折
                </p>
                <p class="zheKou" v-if="item.preferential_way == '抵现'" name="ticket" typevalue="0" data-val="12312.0" code="77X33qEj47KnKo01">
                  <i>￥</i><em>{{ item.dc_denomination }}</em>
                </p>
                <p class="term">有效期至：{{ item.service_life_end_time }}</p>
                <div class="fanWei">使用范围：{{ item.preferential_scope }}</div>
                <i class="xuanZhong" :style="item.choose == true ? 'display:inline' : 'display:none'"></i>
              </li>
            </ul>
            <p class="duiHuan youhuiIput">
              <input type="text" id="mcoupon" placeholder="输入优惠码兑换" v-model="dh_coupon_num" />
              <i class=" guanBi" style="display: none;">X</i><a href="javascript:;" @click="dh_coupon" class="uesBtn">兑换</a>
              <strong class="cuoWu" style="display: none;">优惠码输入有误，核对后再输入</strong>
            </p>
          </div>
        </div>
        <p class="quanDetail">
          <span class="dyMoney"
            >金额抵用：<em class="JMPrice">-￥{{ coupon_money }}</em></span
          >
          <span class="quanNumber" style="">优惠券<em class="totalCou">1</em>张；</span>
          <span class="dyQian" style="display: none">余额<em class="rechargeUsed">￥0</em>；</span>
          <span class="dyJf" style="display: none">积分<em class="integralUsed">0</em></span>
        </p>
      </div>

      <div class="zhiFuBox">
        <p class="zhiFuTitle">支付方式</p>
        <div class="bankList clear">
          <ul>
            <li @click="order_pay = 1" :class="order_pay == 1 ? 'bankPic1 active' : 'bankPic1'" paytype="PAY_TYPE_ZFB"><i class="choseBtn"></i></li>
            <li @click="order_pay = 2" :class="order_pay == 2 ? 'bankPic2 active' : 'bankPic2'" paytype="PAY_TYPE_WX_GZH"><i class="choseBtn"></i></li>
          </ul>
        </div>
        <ul class="heJi">
          <li>
            <span
              >金额总计：<em>￥{{ order_type == '课程' ? course_info.special_price : class_info.favorable_price }}</em></span
            >
          </li>
          <li>
            <span
              >减免金额：<em class="JMPrice">-￥{{ coupon_money }}</em></span
            >
          </li>
          <li>
            <span
              >应付金额：<em class="finalPrice payable">￥{{ ((order_type == '课程' ? course_info.special_price : class_info.favorable_price) * 100 - coupon_money * 100) / 100 }}</em></span
            >
          </li>
          <li class="zhiFuBtn"><a href="javascript:;" @click="goPay">支付</a></li>
        </ul>
      </div>
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
      currentPage: 1, //初始页
      activeIndexa: 0,
      activeIndexb: 0,
      stu_id: '',
      pagesize: 10, //    每页的数据
      model: 0,
      youhui_lebel: false,
      value2: '',
      order_num: '',
      order_type: '',
      order_pay: 0,
      cpc: '',

      coupon_info: [],
      dh_coupon_num: '',
      selected_coupon: {},
      class_info: {},
      course_info: {}
    }
  },
  created() {
    let _this = this
    _this.order_num = _this.$store.state.order_num
    _this.order_type = _this.$store.state.order_type
    if (_this.order_type == '课程') {
      _this.course_info = JSON.parse(_this.$store.state.order_info)
      _this.cpc = _this.course_info.course_id
    } else if (_this.order_type == '课程包') {
      _this.class_info = JSON.parse(_this.$store.state.order_info)
      _this.cpc = _this.class_info.course_package_id
    }
    $(document).ready(function() {
      $('#header').load('header.html')
    })
    this.$axios
      .post('/api/stu/Discovery/queryStudentCoupon', {
        product_type: _this.order_type,
        stu_id: _this.$store.state.stu_id,
        cpc: _this.cpc
      })
      .then((resp) => {
        let data = resp.data
        _this.coupon_info = data
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
  computed: {
    coupon_money() {
      let money = this.order_type == '课程' ? this.course_info.special_price : this.class_info.favorable_price
      // money = 500
      let coupon_money = 0
      let _this = this
      if (_this.selected_coupon.dc_denomination == null || _this.selected_coupon.dc_denomination == '' || _this.selected_coupon.dc_denomination == 0) {
        coupon_money = 0
      } else {
        switch (_this.selected_coupon.preferential_way) {
          case '抵现':
            if (_this.selected_coupon.dc_denomination > money) {
              coupon_money = 0
            } else {
              coupon_money = _this.selected_coupon.dc_denomination
            }
            break
          case '满减':
            if (_this.selected_coupon.dc_denomination.split(',')[0] > money) {
              coupon_money = 0
            } else {
              coupon_money = _this.selected_coupon.dc_denomination.split(',')[1]
            }
            break
          case '折扣':
            coupon_money = (money * (10 - _this.selected_coupon.dc_denomination)) / 10
            break
          default:
            break
        }
      }
      return coupon_money
    }
  },
  methods: {
    //提交订单
    goPay() {
      let _this = this
      let obj = {
        outTradeNo: _this.$store.state.order_num,
        stu_id: _this.$store.state.stu_id,
        small_discount_id: _this.selected_coupon.small_discount_id,
        type: _this.order_pay == '1' ? '支付宝网页' : '微信网页',
        price: ((_this.order_type == '课程' ? _this.course_info.special_price : _this.class_info.favorable_price) * 100 - _this.coupon_money * 100) / 100
      }
      if (_this.selected_coupon.small_discount_id == undefined) {
        delete obj.small_discount_id
      }
      localStorage.pay_way_info = JSON.stringify(obj)
      let routeData = this.$router.resolve({ path: '/order/orderType' })
      window.open(routeData.href)
      _this.model = 1
    },
    //查询是否支付成功
    pay_search() {
      let _this = this
      this.$axios
        .post('/api/order/Verification', {
          order_num: _this.$store.state.order_num,
          stu_id: _this.$store.state.stu_id
        })
        .then((resp) => {
          let data = resp.data
          if (data.code == 200) {
            _this.$router.push('/order/orderSuccess')
          } else {
            _this.$router.push('/order/orderError')
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
    dh_coupon() {
      let _this = this
      this.$axios
        .post('/api/stu/Discovery/ExchangeDiscountCode', {
          discount_code_value: _this.dh_coupon_num,
          stu_id: _this.$store.state.stu_id
        })
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            _this.$message.success({
              type: 'info',
              message: '兑换成功',
              // position: 'bottom-left',
              duration: '2000'
            })
            this.$axios
              .post('/api/stu/Discovery/queryStudentCoupon', {
                product_type: _this.order_type,
                stu_id: _this.$store.state.stu_id,
                cpc: _this.cpc
              })
              .then((resp) => {
                let data = resp.data
                _this.coupon_info = data
                _this.choose_coupon(_this.selected_coupon)
              })
              .catch((err) => {
                _this.$message.error({
                  type: 'info',
                  message: '服务器错误',
                  // position: 'bottom-left',
                  duration: '2000'
                })
              })
          } else {
            _this.$message.error({
              type: 'info',
              message: '兑换失败',
              // position: 'bottom-left',
              duration: '2000'
            })
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
    choose_coupon(item) {
      if (item.tf_use == 1) {
        this.selected_coupon = item
        let arr = JSON.parse(JSON.stringify(this.coupon_info))
        arr.map((i) => {
          i.choose = false
          if (i.small_discount_id == item.small_discount_id) {
            i.choose = true
          }
        })
        this.coupon_info = arr
      }
    },
    change_youhui() {
      if (this.youhui_lebel == false) {
        this.youhui_lebel = true
      } else {
        this.youhui_lebel = false
      }
    },
    getNowFormatDate(date) {
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
    activeA(num) {
      this.activeIndexa = num
    },
    activeB(num) {
      this.activeIndexb = num
    },
    goNext() {
      window.open('tiku_detail.html')
    }
  },
  mounted() {}
}
</script>
<style>
/*澶撮儴鏍峰紡*/
.page-container .question_person {
  float: right;
  position: relative;
}
.question_person .ques-message {
  position: relative;
  float: left;
  top: 26px;
  left: 0;
  color: #959494;
}
.ques-message:hover {
  color: #fff;
}
.question_person .ques-message b {
  width: 10px;
  height: 10px;
  background: red;
  position: absolute;
  top: -4px;
  left: 12px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}
.question_person img {
  float: left;
  margin: 4px 12px 0 36px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}
/*鏂版敮浠橀〉闈㈠唴瀹瑰尯*/
b,
strong {
  font-weight: normal;
}
em,
i {
  font-style: normal;
}
.payCont {
  background: #f6f6f6;
  padding: 30px 0 20px 0;
}
.contUp,
.contDown {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  position: relative;
  padding-bottom: 40px;
}
.statusPic {
  width: 55px;
  height: 55px;
  background: url('../../assets/images/jiang/dijiao.png') no-repeat 0 0;
  position: absolute;
  top: 50px;
  left: 52px;
}
/*.contUp .right{width:100%;margin:50px 52px 0 148px;}*/
.contUp .right dt,
dd {
  margin: 0 52px 0 148px;
}
.contUp .right dt {
  padding-top: 45px;
  font-size: 24px;
  color: #333;
}
.contUp .right dd {
  font-size: 14px;
  color: #777;
}
.contUp .right dd.fenLei {
  margin-top: 22px;
}
.contUp .right dd.bianHao {
  margin-top: 12px;
}
dd.bianHao span {
  float: left;
}
dd.bianHao strong {
  float: right;
}
dd.bianHao strong .money {
  font-size: 24px;
  color: #ff6604;
  vertical-align: baseline;
}
.payCont .contDown {
  margin-top: 10px;
} /*height:78px;line-height:78px;*/
.payCont .contDown p.choseTitle {
  font-size: 18px;
  margin: 0 0 0 52px;
  color: #333;
  padding-top: 25px;
}
p.choseTitle .moreSelect {
  margin-left: 8px;
  cursor: pointer;
}
.selChose {
  width: 1094px;
  border: 1px solid #f5f5f5;
  margin-left: 52px;
  display: none;
  margin-top: 28px;
}
.choseTable {
  height: 40px;
  line-height: 40px;
  background: #f6f6f6;
}
.choseTable li {
  width: 142px;
  float: left;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}
.choseTable li.active {
  background: #fff;
  color: #00a9ee;
}

.quan li {
  width: 236px;
  height: 116px;
  background: url('../../assets/images/jiang/quan_pic.png') no-repeat 0 0;
  float: left;
  margin: 30px 0 0 28px;
  position: relative;
  cursor: pointer;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
.quan li.disN {
  background-image: url('../../assets/images/jiang/disablePic.png');
  cursor: default;
}
.quan li.disN:hover {
  border: 0;
}
.quan li.active {
  border: 1px solid #ffb346;
  box-shadow: none;
}
.quan li:hover {
  border: 1px solid #ffb346;
}
.quan li i.xuanZhong {
  width: 26px;
  height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  background: url('../../assets/images/jiang/xuanze_2.png') no-repeat 0 0;
  display: none;
}
.quan .zheKou {
  /*padding-top:13px;*/
  margin-left: 16px;
  color: #fff;
}
.quan .zheKou i {
  font-size: 18px;
}
.quan .zheKou em {
  font-size: 28px;
}
.quan .zheKou span {
  font-size: 16px;
  margin-left: 4px;
  vertical-align: text-bottom;
}
.quan .term {
  color: #fff;
  font-size: 12px;
  margin: -2px 0 0 16px;
}
.quan .fanWei {
  font-size: 12px;
  color: #858c94;
  margin: 20px 0 0 14px;
}
.quan .fanWei p {
  width: 190px;
  padding: 10px;
  line-height: 18px;
  font-size: 12px;
  color: #666;
  position: relative;
  border: 1px solid #f6f6f6;
  background: #fff;
  display: none;
  margin-top: 10px;
  z-index: 1;
  -webkit-box-shadow: 0 0 6px 3px #ccc;
  -moz-box-shadow: 0 0 6px 3px #ccc;
  box-shadow: 0 0 6px 3px #ccc;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.duiHuan {
  margin: 30px 0 0 28px;
  position: relative;
}
.duiHuan input {
  width: 249px;
  height: 34px;
  border-radius: 0;
  padding: 0;
  text-indent: 10px;
  font-size: 14px;
  color: #333;
}

a.uesBtn {
  width: 80px;
  height: 36px;
  background: #00a9ee;
  display: inline-block;
  line-height: 36px;
  text-align: center;
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  vertical-align: bottom;
}
a.uesBtn:hover {
  background: #009eed;
}
strong.cuoWu {
  display: block;
  font-size: 12px;
  color: #fe5151;
  margin-top: 4px;
}
.quanDetail {
  height: 40px;
  line-height: 40px;
  background: #f6f6f6;
  font-size: 14px;
  color: #858c94;
  margin-top: 30px;
}
.quanDetail .dyMoney {
  margin-left: 28px;
  margin-right: 40px;
}
.quanDetail .dyMoney em {
  color: #ff6604;
}
/*.quanDetail .quanNumber{margin-left:40px;}*/
.integral {
  font-size: 14px;
  margin: 23px 0 0 26px;
  color: #666;
}
.integral em {
  color: #ff6604;
}
.syNumber {
  font-size: 12px;
  color: #939ca5;
  margin: 5px 0 0 26px;
}
.useInput {
  margin: 16px 0 0 28px;
  position: relative;
}
.useInput input {
  width: 249px;
  height: 34px;
  border-radius: 0;
  padding: 0;
  text-indent: 10px;
  font-size: 14px;
  color: #333;
}
.yuE .quanDetail {
  margin-top: 10px;
}
.guanBi {
  width: 18px;
  height: 18px;
  border: 1px solid #d2cecb;
  position: absolute;
  top: 8px;
  left: 220px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  color: #d2cecb;
  font-size: 12px;
  display: none;
}

.duiHuan input::-webkit-input-placeholder {
  color: #bbb;
}
.duiHuan input:-moz-placeholder {
  color: #bbb;
}
.duiHuan input::-moz-placeholder {
  color: #bbb;
}
.duiHuan input:-ms-input-placeholder {
  color: #bbb;
}
.useInput input::-webkit-input-placeholder {
  color: #bbb;
}
.useInput input:-moz-placeholder {
  color: #bbb;
}
.useInput input::-moz-placeholder {
  color: #bbb;
}
.useInput input:-ms-input-placeholder {
  color: #bbb;
}

.zhiFuBox {
  margin: 0 52px;
  padding-top: 28px;
}
.zhiFuTitle {
  font-size: 18px;
  color: #333;
}
/*閾惰鏀粯*/
.bankList {
  border-bottom: 1px solid #e0e0e0;
  margin-top: 24px;
  position: relative;
}
.bankList li {
  width: 252px;
  height: 78px;
  float: left;
  border: 1px solid #e5e5e5;
  margin: 0 20px 30px 0;
  background-image: url('../../assets/images/jiang/bank_pic.png');
  cursor: pointer;
  position: relative;
}
.bankList li:nth-child(4n) {
  margin-right: 0;
}
.bankList li:hover {
  border: 1px solid #ff6604;
}
.bankList li.active {
  border: 1px solid #ff6604;
}
.bankList .bankPic1 {
  background-position: 68px 19px;
  background-repeat: no-repeat;
}
.bankList .bankPic2 {
  background-position: -233px 19px;
  background-repeat: no-repeat;
}
.bankList li.bankPic3 {
  background-image: none;
}
.bankList li.cardBtn {
  background-image: none;
}
.bankList .bankPic4 {
  background-position: -953px 20px;
  background-repeat: no-repeat;
}
.bankList .bankPic5 {
  background-position: 12px -107px;
  background-repeat: no-repeat;
}
.bankList .bankPic6 {
  background-position: 26px -204px;
  background-repeat: no-repeat;
}
/* 中信支付宝 */
.bankList .bankPic7 {
  background-position: 70px -387px;
  background-repeat: no-repeat;
}
/* 中信微信 */
.bankList .bankPic8 {
  background-position: 48px -477px;
  background-repeat: no-repeat;
}
.bankList .bankPic3 span {
  width: 100%;
  height: 100%;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
}
/*淇＄敤鍗℃敮浠�*/
.bankList .cardBtn span {
  width: 100%;
  height: 100%;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
}
.bankList .cardBtn .carList {
  background-image: url('../../assets/images/jiang/bank_pic.png');
  background-position: 38px -302px;
}
.moreBankBox {
  width: 690px;
  border: 1px solid #e5e5e5;
  background: #f9f9f9;
  position: absolute;
  top: 100px;
  -webkit-box-shadow: 0 0 10px 4px #f9f9f9;
  -moz-box-shadow: 0 0 10px 4px #f9f9f9;
  box-shadow: 0 0 10px 4px #f9f9f9;
  z-index: 1;
  padding: 20px 6px 5px 20px;
  display: none;
}
.moreBankBox em {
  width: 122px;
  height: 38px;
  float: left;
  border: 1px solid #e5e5e5;
  margin: 0 14px 15px 0;
  background-color: #fff;
  background-image: url('../../assets/images/jiang/bank_pic.png');
  background-repeat: no-repeat;
  cursor: pointer;
}
.zhaoshang,
.credit_CMB {
  background-position: -680px -92px;
}
.gongshang,
.credit_ICBC {
  background-position: -680px -128px;
}
.pingan {
  background-position: -820px -91px;
}
.jianshe,
.credit_CCB {
  background-position: -680px -166px;
}
.nongye,
.credit_ABC {
  background-position: -680px -202px;
}
.zhongguo,
.credit_BOC {
  background-position: -680px -238px;
}
.pufa,
.credit_SPDB {
  background-position: -680px -276px;
}
.xingye,
.credit_CIB {
  background-position: -680px -314px;
}
.guangfa {
  background-position: -680px -350px;
}
.fudian {
  background-position: -680px -386px;
}
.shanghai,
.credit_SHB {
  background-position: -680px -425px;
}
.youzheng {
  background-position: -823px -128px;
}
.minsheng,
.credit_CMBC {
  background-position: -823px -163px;
}
.beijing,
.credit_BCCB {
  background-position: -823px -200px;
}
.huaxia,
.credit_HX {
  background-position: -823px -238px;
}
.jiaotong {
  background-position: -823px -276px;
}
.guangda,
.credit_CEB {
  background-position: -823px -313px;
}
.nongshang {
  background-position: -823px -347px;
}
.bohai {
  background-position: -823px -385px;
}
.zhongxin,
.credit_ECITIC {
  background-position: -823px -426px;
}
.ningbo {
  background-position: -678px -460px;
}
.jiangsu {
  background-position: -826px -463px;
}
.weiMask {
  background-position: -682px -498px;
}
.alipay {
  background-position: -818px -498px;
}
.hangzhou {
  background-position: -680px -534px;
}
.yinlian {
  background-position: -830px -530px;
}

.heJi {
  text-align: right;
  margin-top: 14px;
}
.heJi li {
  line-height: 30px;
  font-size: 14px;
  color: #666;
}
.heJi li .payable {
  color: #ff6604;
}
.heJi li span {
  display: inline-block;
  min-width: 170px;
  text-align: left;
}
.heJi li span.tip {
  float: left;
  font-size: 16px;
  color: red;
}
.heJi li span em {
  float: right;
  margin-left: 36px;
}
.heJi li.zhiFuBtn {
  margin-top: 30px;
}
.heJi li.zhiFuBtn a {
  width: 160px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  display: inline-block;
  background: #ff6604;
}
.heJi li.zhiFuBtn a:hover {
  background: #f76101;
}
.heJi li.xieYiBtn a {
  color: #939ca5;
}
.heJi li.xieYiBtn a:hover {
  color: #00a9ee;
}
/*寰俊寮圭獥*/
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
.payAlertBox {
  width: 466px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -233px;
  z-index: 10000;
}
.weiTitle {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}
.weiTitle span {
  float: left;
  margin-left: 14px;
}
.weiTitle i {
  float: right;
  margin-right: 14px;
  color: #a1a1a1;
  font-size: 18px;
  cursor: pointer;
}

.weiXin {
  height: 660px;
  margin-top: -330px;
  display: none;
}
.receiveName {
  margin: 10px 0 16px 0;
  font-size: 14px;
  color: #333;
  text-align: center;
}
.erweiBox {
  text-align: center;
  width: 90%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
}
.erweiBox img {
  max-width: 284px;
}
.weiXin .introuText {
  margin: 10px 35px 0 35px;
  font-size: 12px;
  color: #939ca5;
  line-height: 18px;
}
.fuKuanBtn {
  margin-top: 25px;
  text-align: center;
}
.fuKuanBtn a {
  width: 78px;
  height: 32px;
  border: 1px solid #e0e0e0;
  display: inline-block;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #999;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.fuKuanBtn a.sure {
  background: #00aaff;
  border: 1px solid #00aaff;
  color: #fff;
  margin-left: 15px;
}
.fuKuanBtn a.sure:hover {
  background: #01aadd;
}
.fuKuanBtn a.close:hover {
  background: #f3f3f3;
}
.payAlertBox.weiXin .introuText {
  margin-top: 12px;
}
.weiXin .payment {
  font-size: 14px;
  color: #333;
  margin: 26px 0 0 0;
  text-align: center;
}
/*鏀粯瀹濆脊绐�*/
.bankAlertBox {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
}
.zhiBao {
  height: 660px;
  position: absolute;
  left: 50%;
  margin-top: -330px;
}
.zhiBao .receiveName {
  margin: 8px 0 0 34px;
  margin-bottom: 10px;
  text-align: left;
}
.baoEmail {
  margin: 8px 0 0 34px;
  text-align: left;
  font-size: 16px;
  color: #333;
}
.baomaBox {
  text-align: center;
  width: 90%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
}
.baomaBox img {
  max-width: 224px;
}
.zhiBao .payment {
  font-size: 14px;
  color: #333;
  margin: 26px 0 0 34px;
  text-align: left;
}
/*缃戦摱鏀粯*/
.bankAlert {
  height: 360px;
  margin-top: -180px;
  display: none;
}
.bankMessage {
  margin-top: 8px;
  font-size: 16px;
  color: #333;
  margin-left: 22px;
}
.personBank {
  margin-top: 10px;
}
.payAlertBox .introuText {
  font-size: 12px;
  color: #939ca5;
  margin: 25px 22px 0 22px;
}
.payAlertBox.bankAlert .introuText {
  margin-top: 12px;
}
.bankAlert .payment {
  font-size: 14px;
  color: #333;
  margin: 20px 0 0 46px;
  text-align: left;
}
/*鏀粯鎻愮ず*/
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
/*ipad 鏍峰紡*/
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .contUp,
  .contDown {
    width: 100%;
  }
}

/*优惠券停用弹窗样式*/
.cengbg1 {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.editprotocol1 {
  width: 200px;
  padding-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  position: fixed;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}
.editprotocol1 p {
  text-align: center;
}
.editprotocol_tit1 {
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  margin-bottom: 20px;
}

.editprotocol_tit1 h3 {
  color: #333;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}

.editprotocol1 p {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  margin-bottom: 20px;
}

.protocolbtn1 {
  width: 80px;
  height: 30px;
  line-height: 18px;
  background: #0099ff;
  border-radius: 4px;
  margin: 0 auto;
  color: #fafafa;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  display: block;
}
</style>
