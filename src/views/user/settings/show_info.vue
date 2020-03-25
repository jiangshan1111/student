<template>
  <div class="content-right" style="overflow: hidden;min-height: 594px;padding-top:20px">
    <form id="addFormOne" method="post" novalidate="novalidate" enctype="multipart/form-data"></form>
    <div class="wrap user-main">
      <div style="margin-left: 30px;font-size: 18px;color: #474746;">账号信息</div>
      <div class="line" style="margin-left: 30px;width: 920px;"></div>
    </div>
    <div class="L-account">
      <!--普通账号-->
      <dl class="L-general-account">
        <dt>普通账号</dt>

        <dd class="L-info">
          <h4>
            <i class="iconfont L-phone L-active"></i>
          </h4>
          <div class="clear L-clear to_b_mobile">
            <div class="L-aLeft">
              <h3>
                <i>手机号</i>

                <span>{{ stu_info.md_tel }}</span
                ><em>已绑定</em>
              </h3>
              <p>可用手机号加密码登录在线网校，可用手机号找回密码</p>
            </div>
          </div>
        </dd>

        <dd class="L-info">
          <h4>
            <i class="iconfont L-acinfo L-active"></i>
          </h4>
          <div class="clear L-clear to_b_email">
            <div class="L-aLeft">
              <h3>
                <i>邮箱</i>

                <span>{{ stu_info.email }}</span
                ><em>{{ stu_info.email == null ? '未绑定' : '已绑定' }}</em>
              </h3>
              <p>
                可用邮箱加密码登录在线网校
                <!-- ，可用邮箱找回密码 -->
              </p>
            </div>
            <a href="javascript:;" @click="model = 1" data-type="email">
              {{ stu_info.email == null ? '绑定邮箱' : '更改' }}
            </a>
          </div>
        </dd>
      </dl>

      <!--社交账号-->

      <dl class="L-social-account">
        <dt>社交账号</dt>

        <dd class="">
          <img src="/images/bind/weixin-def.png" alt="" />
          <span>未绑定</span>
          <a href="javascript:;" data-type="weixin">立即绑定</a>
        </dd>
      </dl>
    </div>
    <div class="L-layer" v-show="model == 1" style=""></div>
    <div class="L-content" v-show="model == 1">
      <a href="javascript:;" class="iconfont L-delete" @click="model = 0"></a>
      <form>
        <h2>绑定邮箱</h2>
        <ul>
          <li><label for="phone-L">邮箱账号</label> <input type="text" name="" id="phone-L" v-model="sub_stu_info.email" placeholder="请输入邮箱账号" class="L-phone email_input" /></li>
        </ul>
        <input type="button" value="确定" @click="submit_infomation" class="L-sub bindEmail" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      activeIndexa: 1,
      activeIndexb: 0,
      pagesize: 10, //    每页的数据
      model: 0,
      value2: '',
      stu_id: '',
      old_stu_pass: '',
      stu_pass: '',
      qr_stu_pass: '',
      write_label: false,
      infomation1: false,
      infomation2: false,
      stu_info: {},
      sub_stu_info: {},
      imgSrc: ''
    }
  },
  created() {
    this.stu_id = this.$store.state.stu_id
    let _this = this
    this.$axios
      .post('/api/stu/queryStuInfo', {
        stu_id: _this.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.stu_info = data
        _this.sub_stu_info = JSON.parse(JSON.stringify(data))
        _this.imgSrc = _this.stu_info.head
        _this.stu_info.md_tel = data.tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
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
    //修改个人签名
    change_write() {
      this.write_label = true
      this.$refs.textarea.focus()
    },
    //提交个人信息
    submit_infomation() {
      let _this = this
      this.$axios
        .post('/api/stu/changePassword', _this.sub_stu_info)
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            _this.$message.success({
              type: 'info',
              message: '修改成功',
              // position: 'bottom-left',
              duration: '2000'
            })
            _this.stu_info = JSON.parse(JSON.stringify(_this.sub_stu_info))
            _this.stu_info.md_tel = _this.stu_info.tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            _this.infomation1 = false
            _this.infomation2 = false
            _this.model = 0
            _this.write_label = false
          } else {
            _this.$message.error({
              type: 'info',
              message: '修改失败',
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
    }
  }
}
</script>
<style scoped>
.L-account {
  width: 100%;
  padding: 0 20px;
  font-family: '微软雅黑';
}
.L-account dt {
  font-size: 16px;
  line-height: 18px;
  color: #333;
  border-left: 3px solid #00b7ee;
  padding-left: 10px;
}
.L-general-account .L-info {
  width: 910px;
  height: 98px;
  min-width: 910px;
  border-bottom: 1px #f0f0f0 solid;
  padding: 30px 0px 17px 0px;
  box-sizing: border-box;
  margin-left: 10px;
}
.L-info h4 {
  display: inline-block;
  width: 44px;
  height: 36px;
  line-height: 36px;
  margin-right: 13px;
  text-align: center;
}
i.L-phone {
  font-size: 44px;
  color: #999;
  position: relative;
  bottom: 2px;
  left: -2px;
}
i.L-person {
  font-size: 43px;
  line-height: 36px;
  color: #999;
  position: relative;
  bottom: 7px;
  left: -2px;
}
i.L-acinfo {
  font-size: 40px;
  line-height: 36px;
  position: relative;
  color: #999;
  bottom: 5px;
}
i.L-active {
  color: #00b7ee;
}

.L-clear {
  display: inline-block;
  width: 840px;
}
.L-clear .L-aLeft {
  float: left;
}
.L-aLeft i,
.L-aLeft span,
.L-aLeft em {
  display: inline-block;
}
.L-clear .L-aLeft h3 {
  font-size: 16px;
  line-height: 16px;
  color: #333;
  margin-bottom: 9px;
  text-align: left;
  height: 15px;
}
.L-clear .L-aLeft em {
  font-size: 12px;
}
.L-clear .L-aLeft i {
  width: 60px;
  font-style: normal;
}
.L-clear .L-aLeft span {
  font-size: 12px;
  color: #00b7ee;
  margin-right: 6px;
}
.L-clear .L-aLeft p {
  font-size: 12px;
  line-height: 12px;
  color: #999;
}
.L-clear a {
  float: right;
  width: 72px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #e0e0e0;
  color: #999;
  text-align: center;
  border-radius: 3px;
  text-decoration: none;
}
.L-clear a:hover {
  background: #f0f0f0;
  border-color: #ccc;
}
.L-social-account dt {
  margin: 20px 0;
}
.L-social-account .L-attach a {
  background: #999;
}
.L-social-account dd {
  display: inline-block;
  width: 236px;
  height: 260px;
  margin-right: 18px;
  margin-left: 12px;
  background: #f0f0f0;
  position: relative;
  text-align: center;
}
i.L-qq {
  width: 92px;
  height: 92px;
  font-size: 92px;
  /*line-height: 40px;*/
  color: #999;
  position: absolute;
  left: 50%;
  /*top: 50%;*/
  margin-top: 30px;
  margin-left: -46px;
}
i.L-sina {
  font-size: 46px;
  line-height: 46px;
  color: #999;
  position: absolute;
  left: 55px;
  top: 24px;
}
i.L-weibo {
  font-size: 48px;
  line-height: 48px;
  color: #999;
  position: absolute;
  left: 54px;
  top: 22px;
}
i.L-active {
  color: #00b7ee;
}

.L-layer {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#14000000,endColorstr=#14000000);
  position: fixed;
  left: 0;
  top: 0;
}
.L-content {
  width: 300px;
  padding: 25px 20px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -170px;
  margin-top: -120px;
  z-index: 10;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.L-content.slider {
  width: 390px;
}

a.L-delete {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  line-height: 14px;
  color: #c2c2c2;
  text-decoration: none;
}
.L-content h2 {
  font-size: 18px;
  line-height: 18px;
  color: #00b7ee;
  margin-bottom: 20px;
}
.L-content ul {
  margin-bottom: 10px;
}
.L-content.slider ul {
  padding-top: 20px;
}
.L-content li {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  height: 40px;
}
.L-content.slider li {
  margin-bottom: 30px;
}
.L-content li label {
  width: 60px;
  font-size: 12px;
  line-height: 40px;
  color: #666;
  text-align: right;
  margin-right: 10px;
  display: inline-block;
}
.L-content li input {
  display: inline-block;
  width: 96px;
  height: 13px;
  border: 1px solid #e5e5e5;
  padding: 11px 6px 14px 8px;
  font-size: 12px;
  line-height: 12px;
  color: #b2b2b2;
}

.L-content.slider li input {
  width: 120px;
}

.L-content li .L-phone {
  width: 210px;
}
.L-content.slider li .L-phone {
  width: 260px;
}

.L-code {
  width: 65px;
  height: 22px;
  margin: 10px 10px;
  display: inline-block;
  vertical-align: middle;
}
.L-code img {
  width: 65px;
  height: 22px;
}
i.iref {
  font-size: 20px;
  line-height: 40px;
  color: #c4c4c4;
  display: inline-block;
  cursor: pointer;
}
a.L-free-code {
  font-size: 14px;
  line-height: 14px;
  color: #00b7ee;
  display: inline-block;
  margin: 13px 0 13px 12px;
  text-align: center;
  border-bottom: 1px #00b7ee solid;
  text-decoration: none;
}
.L-content .L-sub {
  width: 300px;
  height: 40px;
  border: none;
  outline: none;
  background: #00b7ee;
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
  border-radius: 3px;
}
.L-content.slider .L-sub {
  margin: 0 auto;
  display: block;
}
.L-relieve dt {
  font-size: 16px;
  line-height: 36px;
  color: #b2b2b2;
  width: 100%;
  text-align: center;
  margin-bottom: 6px;
}
.L-relieve dd {
  width: 100%;
  height: 40px;
  line-height: 38px;
  position: relative;
  margin-bottom: 22px;
}
strong.L-istr {
  width: 15px;
  height: 20px;
  position: absolute;
  border-right: 1px solid #e5e5e5;
  background: #f5f5f5;
  padding: 9px 14px;
  left: 1px;
  top: 2px;
  font-size: 20px;
  line-height: 20px;
  color: #a7a7a7;
  border-radius: 3px 0 0 3px;
}
.L-relieve dd input {
  width: 244px;
  height: 38px;
  border: 1px solid #e5e5e5;
  padding: 0;
  padding-left: 54px;
  color: #b2b2b2;
}
.L-relieve p {
  font-size: 12px;
  line-height: 38px;
  text-align: center;
  width: 100%;
  color: #999;
}
.L-relieve h3 {
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  color: #333;
}
.L-relieve img {
  width: 67px;
  height: 67px;
  margin: 14px 0 10px 116px;
}
.L-relieve b {
  font-weight: normal;
  color: #00b7ee;
}
.L-no-native {
  width: 100%;
  height: 10px;
  display: block;
}
.L-H {
  height: 6px;
}
.L-content-box .user-main {
  padding: 26px 0 10px;
}
.L-content-box .line {
  margin: 13px 0 20px;
}
.L-content-box .user-main div {
  margin-left: 20px;
  font-size: 18px;
  color: #333;
}
.L-content-box .line {
  margin: 13px 0 20px 20px;
  width: 940px;
}
.L-line {
  width: 910px;
  border-bottom: 1px #f0f0f0 solid;
  padding-top: 20px;
  min-width: 594px;
  margin-left: 10px;
}
.L-social-account img {
  width: 92px;
  height: 92px;
  margin: 30px 0 20px;
}
.L-social-account a,
.L-social-account span,
.L-social-account img {
  display: inline-block;
  vertical-align: top;
}
.L-social-account span {
  width: 100%;
}
.L-social-account a {
  width: 118px;
  height: 36px;
  border: none;
  text-align: center;
  font-size: 12px;
  line-height: 36px;
  color: #fff;
  border-radius: 3px;
  background: #00b7ee;
  text-decoration: none;
  margin-top: 42px;
}
.L-social-account {
  margin-bottom: 36px;
}
</style>
