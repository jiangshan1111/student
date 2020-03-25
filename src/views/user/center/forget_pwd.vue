<template>
  <div class="wrap space white forget" style="min-height: 450px; height: auto;    margin-top: 40px;">
    <div class="page-2" v-if="activeIndexa == 1">
      <div class="title">
        <h1 class="h4">通过手机号找回密码</h1>
      </div>
      <form id="phoneForm" name="phoneForm" action="/login/toResetPassword" method="post" novalidate="novalidate">
        <input type="hidden" id="mobileError" value="" />
        <input type="hidden" id="codeErro" value="" />
        <input type="hidden" id="smsErro" value="" />
        <input type="hidden" id="time" value="" />
        <ul>
          <li><label for="mobile">手机号：</label><input type="text" id="mobile" name="mobile" v-model="forget_info.tel" /></li>
          <li>
            <label for="code">验证码：</label>
            <input type="text" id="code" name="code" v-model="forget_info.img_code" class="code" />
            <span
              ><img id="register_img" src="/api/stu/verifyImg" height="40" width="100" alt="点击更换验证码" />
              <a href="javascript:;" class="txt" onclick="document.querySelector('#register_img').src='/api/stu/verifyImg?'+new Date().getTime();" id="btn-captcha">换一张</a></span
            >
          </li>
          <li>
            <label for="code">短信验证：</label>
            <input type="text" id="smsCode" name="smsCode" v-model="forget_info.sms_code" class="code" />
            <span id="phoneCode">
              <!-- <a href="javascript:;" id="send" class="btn btn-success btn-code">免费获取验证码</a> -->
              <input
                id="btn-sms"
                v-if="disabled_label == true"
                style="background:#00b7ee;
                            height: 45px;    padding: 8px 19px;    width: 130px;border:none"
                type="button"
                class="btn btn-primary btn-gray"
                value="免费获得验证码"
                @click="getMsgcode"
              />
              <input
                id="btn-sms"
                v-if="disabled_label == false"
                type="button"
                class="sendBtn"
                :value="'(' + time_top + 's)后重试'"
                style="background-color: rgb(0, 168, 255);
                                height: 45px;    padding: 8px 19px;    width: 130px;"
                disabled="disabled"
              />
              <!-- <a href="javascript:;" id="wait" style="display:none" class="btn btn-gray btn-success btn-code">重新发送验证码（60s）</a> -->
            </span>
          </li>
          <li><input type="button" @click="nextStep" id="nextStep" class="btn btn-sky btn-bigger btn-block btn-padding" value="下一步" /></li>
        </ul>
      </form>
    </div>
    <div class="page-2" v-if="activeIndexa == 2">
      <div class="title">
        <h1 class="h4">重置密码</h1>
      </div>
      <form action="/login/resetPassword" method="post" id="resetPassword">
        <input type="hidden" name="mobile" value="13437259576" />
        <input type="hidden" name="email" value="" />
        <input type="hidden" name="code" value="y4my" />
        <input type="hidden" name="smsCode" value="572531" />
        <input type="hidden" id="pwdOpen" value="" />
        <input type="hidden" name="redisKey" value="" />
        <input type="hidden" name="type" value="1" />
        <ul>
          <li>
            <label for="password" style="cursor: default">新密码：</label><input type="password" id="password" v-model="reset_info.stu_pass" class="input-ctrol" name="password" maxlength="32" />
            <p class="tips none" id="errmsg" style="padding-left: 0px;">请输入6-32位密码</p>
          </li>
          <li>
            <label for="repassword" style="cursor: default">确认密码：</label><input type="password" id="repassword" v-model="qr_stu_pass" class="input-ctrol" name="repassword" />
            <p class="tips" style="display:none;padding-left: 0px;">输入的密码不一致</p>
          </li>
          <li><input type="button" class="btn btn-sky btn-bigger btn-block btn-padding" value="确定" @click="reset_pwd" /></li>
        </ul>
      </form>
    </div>
    <div class="page-2" v-if="activeIndexa == 3">
      <div class="title">
        <h1 class="h4">重置密码</h1>
      </div>
      <div class="forget-success">
        <i class="icons"></i>
        <h1 class="h4">重置密码成功</h1>
        <p>
          <span id="time">{{ time_return }}</span
          >s后自动跳转到首页
        </p>
      </div>
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
      time_top: 60,
      time_return: 5,
      value2: '',
      disabled_label: true,
      forget_info: {
        tel: '',
        img_code: '',
        sms_code: ''
      },
      reset_info: {
        stu_id: '',
        tel: '',
        stu_pass: ''
      },
      qr_stu_pass: ''
    }
  },
  created() {},
  methods: {
    setTime() {
      let _this = this
      this.time_top = 60
      let timer = setInterval(() => {
        if (this.time_top == 1) {
          clearInterval(timer)
          _this.disabled_label = true
        } else {
          this.time_top -= 1
        }
      }, 1000)
    },
    retrun_index() {
      let _this = this
      this.time_return = 5
      let timer = setInterval(() => {
        if (this.time_return == 1) {
          clearInterval(timer)
          this.$router.push({
            path: '/'
          })
        } else {
          this.time_return -= 1
        }
      }, 1000)
    },
    reset_pwd() {
      let _this = this
      if (_this.reset_info.stu_pass != _this.qr_stu_pass) {
        _this.$message.error({
          type: 'info',
          message: '两次输入的密码不一致',
          // position: 'bottom-left',
          duration: '2000'
        })
        return
      }
      if (_this.reset_info.stu_pass == '' || _this.qr_stu_pass == '') {
        _this.$message.error({
          type: 'info',
          message: '有内容为空，无法提交',
          // position: 'bottom-left',
          duration: '2000'
        })
        return
      }
      this.$axios
        .post('api/stu/resetPassword', 'stu_id=' + _this.reset_info.stu_id + '&tel=' + _this.reset_info.tel + '&stu_pass=' + _this.reset_info.stu_pass, {
          xhrFields: { withCredentials: true },
          crossDomain: true
        })
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            _this.time_return = 5
            _this.activeIndexa = 3
            _this.retrun_index()
          } else {
            _this.$message.error({
              type: 'info',
              message: '密码重置失败',
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
      // $.ajax({
      //   url: 'http://192.168.10.166:8080/stu/resetPassword',
      //   type: 'post',
      //   // contentType: 'application/json',
      //   data: _this.reset_info,
      //   // dataType: 'json',
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   success: function(data) {
      //     if (data == 1) {
      //       _this.time_return = 5
      //       _this.activeIndexa = 3
      //       _this.retrun_index()
      //     } else {
      //       _this.$message.error({
      //         type: 'info',
      //         message: '密码重置失败',
      //         // position: 'bottom-left',
      //         duration: '2000'
      //       })
      //     }
      //   },
      //   error: function() {
      //     _this.$message.error({
      //       type: 'info',
      //       message: '服务器错误',
      //       // position: 'bottom-left',
      //       duration: '2000'
      //     })
      //   }
      // })
    },
    nextStep() {
      let _this = this
      this.$axios
        .post('api/stu/retrievePassword', 'tel=' + _this.forget_info.tel + '&img_code=' + _this.forget_info.img_code + '&sms_code=' + _this.forget_info.sms_code, {
          xhrFields: { withCredentials: true },
          crossDomain: true
        })
        .then((resp) => {
          let data = resp.data
          if (data > 0) {
            _this.reset_info.stu_id = data
            _this.reset_info.tel = _this.forget_info.tel
            _this.reset_info.stu_pass = ''
            _this.activeIndexa = 2
          } else {
            _this.$message.error({
              type: 'info',
              message: data,
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
      // $.ajax({
      //   url: 'http://192.168.10.166:8080/stu/retrievePassword',
      //   type: 'post',
      //   // contentType: 'application/json',
      //   data: _this.forget_info,
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   // dataType: 'json',
      //   success: function(data) {
      //     if (data > 0) {
      //       _this.reset_info.stu_id = data
      //       _this.reset_info.tel = _this.forget_info.tel
      //       _this.reset_info.stu_pass = ''
      //       _this.activeIndexa = 2
      //     } else {
      //       _this.$message.error({
      //         type: 'info',
      //         message: data,
      //         // position: 'bottom-left',
      //         duration: '2000'
      //       })
      //     }
      //   },
      //   error: function() {
      //     _this.$message.error({
      //       type: 'info',
      //       message: '服务器错误',
      //       // position: 'bottom-left',
      //       duration: '2000'
      //     })
      //   }
      // })
    },
    getMsgcode() {
      let _this = this
      _this.disabled_label = false
      _this.setTime()
      this.$axios
        .post('api/stu/SendSms', 'tel=' + _this.forget_info.tel, { xhrFields: { withCredentials: true }, crossDomain: true })
        .then((resp) => {
          let data = resp.data
        })
        .catch((err) => {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            duration: '2000'
          })
        })
      // $.ajax({
      //   url: 'http://192.168.10.166:8080/stu/SendSms',
      //   type: 'post',
      //   // contentType: 'application/json',
      //   data: {
      //     tel: _this.forget_info.tel
      //   },
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   dataType: 'json',
      //   success: function(data) {
      //   },
      //   error: function() {}
      // })
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
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style scoped>
.forget .none {
  display: none;
}
.forget .space {
  margin: 0 auto;
}
.forget .wrap {
  position: relative;
  width: 1140px;
}
.forget .title {
  margin-bottom: 50px;
  padding: 10px 0;
  border-bottom: 1px solid #dfe1e6;
}
.forget label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 100;
}
.forget .page-1 {
  width: 535px;
  margin: 0 auto 30px;
  padding: 20px 0;
  overflow: hidden;
}
.forget .page-1 ul {
  width: 555px;
  overflow: hidden;
}
.forget .page-1 li {
  position: relative;
  float: left;
  width: 255px;
  height: 97px;
  margin-right: 20px;
  line-height: 97px;
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  text-align: center;
}
.forget .page-1 li a {
  position: relative;
  left: 25px;
  font-size: 18px;
  font-size: 1.8rem;
  text-decoration: none;
  color: #666;
}
.forget .page-1 li a:hover {
  color: #333;
  text-decoration: none;
}
.forget .page-1 li .icon {
  position: absolute;
  top: -5px;
  left: -35px;
  width: 25px;
  height: 25px;
}
.forget .page-1 li .icon.email {
  top: 4px;
  width: 20px;
  height: 13px;
  background-image: url('../../../assets/images/jiang/index-icons.png');
  background-repeat: no-repeat;
  background-position: 0 -20px;
}
.forget .page-1 li .icon.tel {
  left: -25px;
  top: 0;
  width: 14px;
  height: 20px;
  background-image: url('../../../assets/images/jiang/index-icons.png');
  background-repeat: no-repeat;
  background-position: -35px -20px;
}
.forget .page-2 {
  width: 655px;
  padding: 20px 0;
  margin-left: 210px;
  margin-right: -210px;
}
.forget .page-2 ul {
  width: 360px;
  overflow: hidden;
}
.forget .page-2 li {
  position: relative;
  margin-bottom: 20px;
  clear: both;
}
.forget .page-2 li p.tips {
  position: relative;
  font-size: 12px;
  font-size: 1.2rem;
  color: #f00;
  padding-left: 90px;
}
.forget .page-2 li p.tips i.icons {
  position: absolute;
  top: 4px;
  left: 70px;
  width: 14px;
  height: 14px;
  background-image: url('../../../assets/images/jiang/index-icons.png');
  background-repeat: no-repeat;
  background-position: -85px -65px;
}
.forget .page-2 li input {
  width: 260px;
}
.forget .page-2 li input[type='text'],
.forget .page-2 li input[type='password'] {
  height: 32px;
  box-sizing: content-box;
  padding: 0.45em 8px 0.35em;
  border: 1px solid #ddd;
  border-radius: 3px;
  vertical-align: middle;
}
.forget .page-2 li input.code {
  width: 120px;
}
.forget .page-2 li span {
  position: absolute;
  top: 0;
  right: 10px;
}
.forget .page-2 li span a {
  color: #45abdb;
  line-height: 30px;
  font-size: 12px;
}
.forget .page-2 li span a.txt {
  line-height: 45px;
}
.forget .page-2 li span .btn.btn-code {
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  width: 130px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-size: 1.2rem;
}
.forget .page-2 li label {
  display: block;
  float: left;
  width: 70px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.forget .page-2 .forget-success {
  position: relative;
  padding-left: 65px;
  padding-bottom: 50px;
}
.forget .page-2 .forget-success i.icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-image: url('../../../assets/images/jiang/index-icons.png');
  background-repeat: no-repeat;
  background-position: -125px -60px;
}
.forget .page-2 .forget-success i.icons.wrong {
  background-image: url('../../../assets/images/jiang/index-icons.png');
  background-repeat: no-repeat;
  background-position: -300px -60px;
}
.forget .page-2 .forget-success .h4 {
  margin-bottom: 10px;
  color: #4db565;
}
.forget .page-2 .forget-success p {
  color: #7f7f7f;
  font-size: 12px;
  font-size: 1.2rem;
}
.forget .page-2 .btn-padding {
  margin-left: 70px;
  width: 280px;
  color: white;
}
.forget .page-2 #btn-sms {
  color: white;
}
.forget .page-2 .sendBtn {
  border: none;
  background-color: #ccc !important;
  border: 1px solid #ccc;
  cursor: not-allowed;
}
.forget .page-2 .btn-sky {
  background-color: #00abed;
  background-image: none;
  border: 1px solid #00abed;
  line-height: 42px;
  font-size: 25px;
  cursor: pointer;
}
.forget .page-2 .btn-currtom {
  width: 280px;
  padding: 16px 0;
  text-align: center;
  font-size: 14px;
  font-size: 1.4rem;
}
</style>
