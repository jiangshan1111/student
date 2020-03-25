<template>
  <div class="content-right my-invite" id="my-coupon" style="overflow: auto; min-height: 594px;">
    <div class="box">
      <div class="mynote-title">
        我的优惠券
        <div class="title-tab">
          <button @click="change_ex_change(false)" :class="ex_change == false ? 'active' : ''" mark="my-coupon">我的优惠券</button>
          <button @click="change_ex_change(true)" :class="ex_change == true ? 'active' : ''" mark="change-coupon">换取优惠券</button>
        </div>
      </div>
      <div class="coupon-cont my-coupon" :style="ex_change == false ? 'display:block' : 'display:none'">
        <div class="tap-chose">
          <span @click="change_coupon_label('all')" :class="coupon_label == 'all' ? 'active' : ''" data-type="0">全部</span>
          <span @click="change_coupon_label('use_is')" :class="coupon_label == 'use_is' ? 'active' : ''" data-type="1"
            >已使用（<i>{{ coupon.use_num }}</i
            >）</span
          >
          <span @click="change_coupon_label('un_use_is')" :class="coupon_label == 'un_use_is' ? 'active' : ''" data-type="2"
            >未使用（<i>{{ coupon.un_use_num }}</i
            >）</span
          >
          <span @click="change_coupon_label('die_is')" :class="coupon_label == 'die_is' ? 'active' : ''" data-type="3"
            >已失效（<i>{{ coupon.die_num }}</i
            >）</span
          >
        </div>
        <div id="loadData" class="coupon-tiket-wrap">
          <ul class="clear ticket-cont">
            <li class="coupon-tiket-h out-used invalid" v-show="coupon_label == 'all' || coupon_label == 'die_is'" v-for="(item, index1) in coupon.die_is" :key="index1">
              <div class="coupon-tiket used">
                <h2>优惠券</h2>
                <h3 v-if="item.preferential_way == '抵现'">
                  ￥<i>{{ item.dc_denomination }}</i>
                </h3>
                <h3 v-if="item.preferential_way == '满减'">
                  ￥<i>{{ item.dc_denomination.split(',')[1] }}</i
                  ><b>满{{ item.dc_denomination.split(',')[0] }}元可用</b>
                </h3>
                <h3 v-if="item.preferential_way == '折扣'">
                  <i>{{ item.dc_denomination }}</i
                  >折
                </h3>
                <p>
                  有效期截止：<i>{{ item.service_life_end_time }}</i>
                </p>
                <div class="use-range">
                  <a title=""> 使用范围:{{ item.preferential_scope }}</a>
                </div>
                <div class="used-icon"></div>
              </div>
              <div class="delete-icon" @click="delete_coupon(item)"><i class="iconfont" data-id="248577"></i></div>
            </li>
          </ul>
          <ul class="clear ticket-cont">
            <li class="coupon-tiket-h out-used" v-show="coupon_label == 'all' || coupon_label == 'use_is'" v-for="(item, index2) in coupon.use_is" :key="index2">
              <div class="coupon-tiket used">
                <h2>优惠券</h2>
                <h3 v-if="item.preferential_way == '抵现'">
                  ￥<i>{{ item.dc_denomination }}</i>
                </h3>
                <h3 v-if="item.preferential_way == '满减'">
                  ￥<i>{{ item.dc_denomination.split(',')[1] }}</i
                  ><b>满{{ item.dc_denomination.split(',')[0] }}元可用</b>
                </h3>
                <h3 v-if="item.preferential_way == '折扣'">
                  <i>{{ item.dc_denomination }}</i
                  >折
                </h3>
                <p>
                  有效期截止：<i>{{ item.service_life_end_time }}</i>
                </p>
                <div class="use-range">
                  <a title=""> 使用范围:{{ item.preferential_scope }}</a>
                </div>
                <div class="used-icon"></div>
              </div>
            </li>
          </ul>
          <ul class="clear ticket-cont">
            <!-- :style="{ 'margin-right': (index + 1) % 3 === 0 ? '0px' : '' }" -->
            <li class="coupon-tiket-h" v-for="(item, index) in coupon.un_use_is" :key="index" v-show="coupon_label == 'all' || coupon_label == 'un_use_is'">
              <div class="coupon-tiket used">
                <h2>优惠券111</h2>
                <h3 v-if="item.preferential_way == '抵现'">
                  ￥<i>{{ item.dc_denomination }}</i>
                </h3>
                <h3 v-if="item.preferential_way == '满减'">
                  ￥<i>{{ item.dc_denomination.split(',')[1] }}</i
                  ><b>满{{ item.dc_denomination.split(',')[0] }}元可用</b>
                </h3>
                <h3 v-if="item.preferential_way == '折扣'">
                  <i>{{ item.dc_denomination }}</i
                  >折
                </h3>
                <p>
                  有效期截止：<i>{{ item.service_life_end_time }}</i>
                </p>
                <div class="use-range">
                  <a title=""> 使用范围:{{ item.preferential_scope }}</a>
                </div>
                <div class="used-icon"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pages"></div>
      </div>
      <div class="coupon-cont change-coupon" :style="ex_change == true ? 'display:block' : 'display:none'">
        <img src="@/assets/images/jiang/ticket.png" class="ticket-img" alt="" />
        <div class="fl">输入您的优惠码：</div>
        <div class="fl">
          <input type="text" id="code" v-model="dh_coupon_num" />
          <div>
            <button id="cansle" class="sure-btn" @click="change_ex_change(false)">取消</button>
            <button class="sure-btn" @click="dh_coupon">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      coupons: [],
      coupon: {},
      coupon_label: 'all',
      ex_change: false,
      dh_coupon_num: ''
    }
  },
  created() {
    let _this = this
    //我的优惠
    this.$axios
      .post('/api/stu/queryMyCoupon', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.coupon = data
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
    //删除优惠券
    delete_coupon(item) {
      let _this = this
      this.$axios
        .post('/api/stu/stuDeleteCoupons', {
          stu_id: _this.$store.state.stu_id,
          small_discount_id: item.small_discount_id
        })
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            _this.$message.success({
              type: 'info',
              message: '删除成功',
              // position: 'bottom-left',
              duration: '2000'
            })
            _this.coupon.die_is = _this.coupon.die_is.filter((i) => {
              return i.small_discount_id != item.small_discount_id
            })
            _this.coupon.die_num -= 1
          } else {
            _this.$message.error({
              type: 'info',
              message: '删除失败',
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
    //兑换优惠码
    dh_coupon() {
      let _this = this
      this.$axios
        .post('/api/stu/RedeemCoupons', {
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
              .post('/api/stu/queryMyCoupon', {
                stu_id: _this.$store.state.stu_id
              })
              .then((resp) => {
                let data = resp.data
                _this.coupon = data
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
    change_ex_change(label) {
      this.ex_change = label
    },
    change_coupon_label(label) {
      this.coupon_label = label
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
#my-coupon {
  .title-tab {
    position: absolute;
    right: 0;
    top: 0;
  }
  .title-tab button {
    width: 80px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #dcdcdc;
    background: #f3f3f3;
    border-radius: 3px;
    padding: 0;
    color: #616161;
    font-size: 12px;
    margin-left: 10px;
  }
  .title-tab button.active {
    color: #fff;
    background: #00b7ee;
    border-color: #00b7ee;
  }
  .tap-chose {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #f2f3f4;
    margin-top: 5px;
  }
  .tap-chose span.active {
    color: #00b7ee;
  }
  .tap-chose span {
    font-size: 14px;
    color: #787878;
    // display: inline-block;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
  }
  .tap-chose span:hover {
    color: #00b7ee;
    transition: color 0.3s;
    -moz-transition: color 0.3s;
    -webkit-transition: color 0.3s;
    -o-transition: color 0.3s;
  }
  .coupon-cont .coupon-tiket-wrap {
    max-height: 468px;
    overflow-y: auto;
  }
  .coupon-cont ul.ticket-cont {
    margin-top: 30px;
  }
  .coupon-cont .ticket-cont li {
    float: left;
    position: relative;
    margin-right: 43px;
    margin-bottom: 20px;
    padding-bottom: 30px;
  }
  .coupon-cont .ticket-cont li.coupon-tiket-h .coupon-tiket,
  .coupon-cont .ticket-cont li.money-tiket-h .money-tiket {
    width: 252px;
    height: 229px;
    background: url('../../../assets/images/jiang/quan_yes.png') center no-repeat;
    position: relative;
  }

  .coupon-cont .ticket-cont li.out-time div.used,
  .coupon-cont .ticket-cont li.out-used div.used {
    width: 252px;
    height: 229px;
    position: relative;
    box-shadow: none;

    background: url('../../../assets/images/jiang/arch_no.png') center no-repeat;
  }
  .coupon-cont .ticket-cont li.invalid div.used,
  .coupon-cont .ticket-cont li.out-used div.used {
    width: 252px;
    height: 229px;
    position: relative;
    box-shadow: none;

    background: url('../../../assets/images/jiang/arch_no.png') center no-repeat;
  }
  .coupon-cont .ticket-cont li h3,
  .coupon-cont .ticket-cont li p {
    color: #fff;
    text-align: center;
  }
  .coupon-cont .ticket-cont li h2 {
    padding-top: 30px;
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
  .coupon-cont .ticket-cont li h3 {
    font-style: normal;
    font-size: 36px;
    padding-top: 5px;
    position: relative;
  }
  .coupon-cont .ticket-cont li h3 b {
    display: block;
    width: 100%;
    margin-top: 4px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    position: absolute;
  }
  .coupon-cont .ticket-cont li p {
    font-size: 12px;
    margin-top: 20px;
  }
  .coupon-cont .ticket-cont li div.use-range {
    margin-top: 35px;
    font-size: 12px;
    line-height: 16px;
    color: #949494;
    padding: 0 10px 0 15px;
    max-height: 48px;
    overflow: hidden;
  }
  .coupon-cont .ticket-cont li.out-used .used-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 0;
    right: 4px;
    bottom: 40px;
    background: url('../../../assets/images/jiang/use.png') center no-repeat;
    z-index: 10;
  }

  .coupon-cont .ticket-cont li.out-time .used-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 0;
    right: 4px;
    bottom: 40px;
    z-index: 10;

    background: url('../../../assets/images/jiang/due.png') center no-repeat;
  }

  .coupon-cont .ticket-cont li.invalid .used-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 0;
    right: 4px;
    bottom: 40px;
    z-index: 10;

    background: url('../../../assets/images/jiang/invalid.png') center no-repeat;
  }

  .coupon-cont .ticket-cont li.out-time:hover .used {
    -webkit-box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    transform: translateY(-6px);
    -webkit-transform: translateY(-6px);
    -moz-transform: translateY(-6px);
  }
  .coupon-cont .ticket-cont li.invalid:hover .used {
    -webkit-box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    transform: translateY(-6px);
    -webkit-transform: translateY(-6px);
    -moz-transform: translateY(-6px);
  }
  .coupon-cont .ticket-cont li.coupon-tiket-h .coupon-tiket {
    -webkit-box-shadow: 0 2px 5px 0px rgba(255, 197, 74, 0.3);
    -moz-box-shadow: 0 2px 5px 0px rgba(255, 197, 74, 0.3);
    box-shadow: 0 2px 5px 0px rgba(255, 197, 74, 0.3);
  }
  .coupon-cont .ticket-cont li.money-tiket-h .money-tiket {
    -webkit-box-shadow: 0 2px 5px 0px rgba(67, 200, 185, 0.3);
    -moz-box-shadow: 0 2px 5px 0px rgba(67, 200, 185, 0.3);
    box-shadow: 0 2px 5px 0px rgba(67, 200, 185, 0.3);
  }
  .coupon-cont .ticket-cont li.out-time:hover .delete-icon .iconfont {
    display: block;
  }
  .coupon-cont .ticket-cont li.invalid:hover .delete-icon .iconfont {
    display: block;
  }
  .coupon-cont .ticket-cont li .delete-icon .iconfont {
    position: absolute;
    padding: 0;
    bottom: 5px;
    width: 100%;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    color: #ccc;
    display: none;
  }
  /*优惠码*/
  .change-coupon {
    display: none;
    margin-top: 50px;
    position: relative;
  }
  .change-coupon div {
    font-size: 14px;
    color: #474747;
    line-height: 30px;
  }
  .change-coupon input {
    width: 210px;
    height: 30px;
    border-radius: 0;
    vertical-align: middle;
    padding: 0 5px;
  }
  .change-coupon button {
    width: 68px;
    height: 30px;
    padding: 0;
    text-align: center;
    line-height: 30px;
    color: #ffff;
    background: #dcdcdc;
    font-size: 14px;
    border-radius: 2px;
    margin: 30px 10px 0 0;
    border: 0;
  }
  .change-coupon button.sure-btn {
    background: #00b7ee;
    color: #fff;
  }
  /*优惠券飞入*/
  .ticket-img {
    position: absolute;
    top: -20px;
    left: 320px;
    display: none;
    z-index: 100;
  }
}
</style>
