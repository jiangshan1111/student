<template>
  <nav class="fire-header clearfix">
    <ul class="fire-nav fl clearfix">
      <li v-for="(nav, index) in navlist" :key="index" :class="$route.path === nav.activePath ? 'active' : ''" @click="change_index(index + ' ' + nav.path)">
        <a>{{ nav.name }}</a>
      </li>
    </ul>
    <ul class="fire-login fr">
      <li v-show="$store.state.stu_id == ''" @click="openDialog('登录')"><a class="no-padding">登录</a></li>
      <li v-show="$store.state.stu_id == ''"><a href="#" class="no-padding">|</a></li>
      <li v-show="$store.state.stu_id == ''" @click="openDialog('注册')"><a class="no-padding">注册</a></li>
      <li v-show="$store.state.stu_id != ''" @click="change_indexto('10 /usersCenter/MyInfo')">
        <img style=" width: 23px;cursor:pointer" src="@/assets/images/jiang/pen_mail.svg" alt="" />
      </li>
      <li class="user-hidden" v-show="$store.state.stu_id != ''" style="margin-left:10px">
        <img style="width: 23px;" src="@/assets/images/jiang/head_top.svg" alt="" />
        <div class="user-item" style="overflow: hidden;">
          <div class="up-content">
            <div class="fl">
              <div class="head-img fl">
                <img src="http://image.yunduoketang.com/headpic/34270/20190919/a0b664f9-50eb-4254-9769-d65952ab54cc.jpg" alt="" />
              </div>
              <div class="fl">
                <h3>{{ stu_info.tel }}</h3>
                <p class="clear"></p>
              </div>
            </div>
          </div>
          <div class="down-content clear">
            <a @click="change_index('10 /usersSettings/showInfo')" class="fl mr30" style="margin-right: 30px;">个人设置</a>
            <a @click="change_index('10 /usersCenter/myCourse')" class="fl">个人中心</a>
            <a href="javascript:;" @click="logout" class="fr">退出</a>
          </div>
        </div>
      </li>
    </ul>
    <!-- 登录弹出框 -->
    <el-dialog title="" class="login-register-dialog" :close-on-click-modal="false" :visible.sync="isDialogShow" :modal-append-to-body="false" width="25%" :before-close="handleClose">
      <div class="login-dialog" v-if="isLogin">
        <div class="login-dialog-title"></div>
        <el-form :model="loginList" label-width="100px" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="loginList.username" @focus="isError = false" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="password">
            <el-input v-model="loginList.password" @focus="isError = false" placeholder="密码" type="password"></el-input>
            <span class="forget-password" @click="forgetPwd">忘记密码</span>
            <!-- <transition name="fade"> -->
            <span class="error" v-if="isError">{{ err }}</span>
            <!-- </transition> -->
          </el-form-item>
          <el-form-item>
            <div class="loginBtn" @click="login">登录</div>
          </el-form-item>
          <el-form-item>
            <div class="register">
              <el-checkbox v-model="isAuto" @change="change_cook">记住密码</el-checkbox>
              <span class="registerBtn" @click="switchType('注册')"><a>立即注册</a></span>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="theThirdParty">
              <span>第三方账号登录</span>
              <span class="registerBtn">
                <img src="@/assets/images/header/WeChat.png" alt="" />
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-dialog" v-else>
        <div class="register-dialog-title"></div>
        <el-form :model="registerlist" label-width="100px" class="demo-ruleForm">
          <el-form-item label="" prop="phone">
            <el-input v-model.number="registerlist.phone" @focus="initCheck" placeholder="请输入手机号"></el-input>
            <span class="error" v-if="checkRegList.phone.show">{{ checkRegList.phone.msg }}</span>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="registerlist.pass" @focus="initCheck" placeholder="请输入密码" autocomplete="off"></el-input>
            <span class="error" v-if="checkRegList.pass.show">{{ checkRegList.pass.msg }}</span>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input type="password" v-model="registerlist.checkPass" @focus="initCheck" placeholder="请确认密码" autocomplete="off"></el-input>
            <span class="error" v-if="checkRegList.checkPass.show">{{ checkRegList.checkPass.msg }}</span>
          </el-form-item>
          <el-form-item label="" prop="code" class="code">
            <el-input class="code-input" placeholder="请输入验证码" @focus="initCheck" v-model="registerlist.code"></el-input>
            <el-button class="code-btn" :disabled="isCode" :class="isCode ? 'noCode' : ''" @click="getCode">{{ codeText }}</el-button>
            <span class="error" v-if="checkRegList.code.show">{{ checkRegList.code.msg }}</span>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isAgreement">我已接受《注册协议》</el-checkbox>
          </el-form-item>
          <el-form-item>
            <div class="registerBtn" @click="register">注册</div>
          </el-form-item>
          <el-form-item>
            <span>已有账号，<a style="color:#589de7" @click="switchType('登录')">立即登录</a></span>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navlist: [
        {
          name: '首页',
          path: '/',
          activePath: '/'
        },
        {
          name: '发现课程',
          path: '/searchclass',
          activePath: '/searchclass'
        },
        {
          name: '实战题库',
          path: '/question',
          activePath: '/question/questionlist'
        },
        {
          name: '问答社区',
          path: '/community',
          activePath: '/community/communitylist'
        },
        {
          name: '公开课',
          path: '/openClass',
          activePath: '/openClass'
        },
        {
          name: '讲师专栏',
          path: '/teacher',
          activePath: '/teacher/teacherlist'
        },
        {
          name: '新闻公告',
          path: '/news',
          activePath: '/news/newslist'
        },
        {
          name: '学员心声',
          path: '/stuStar',
          activePath: '/stuStar'
        }
      ],
      timer: null, // 获取验证码计时器（验证码）
      isDialogShow: false, // 显示弹出框
      isAuto: false, // 是否是记住密码 （登录）
      isError: false, // 账号密码错误显示隐藏（登录）
      err: '', // 账号密码错误提示句（登录）
      isLogin: true, // 切换登录与注册页
      isAgreement: true, // 是否接受注册协议（注册）
      isCode: false, // 获取验证码（注册）
      codeText: '获取验证码', //（注册）
      headerModel: 0, //是否登录
      stu_info: {}, //学员信息
      loginList: {
        // 登录表单 （登录）
        username: '',
        password: ''
      },
      registerlist: {
        // 注册表单（注册）
        pass: '',
        checkPass: '',
        phone: '',
        code: ''
      },
      checkRegList: {
        // 注册表单验证（注册）
        pass: {
          show: false,
          msg: '',
          type: '密码'
        },
        checkPass: {
          show: false,
          msg: '',
          type: '密码'
        },
        phone: {
          show: false,
          msg: '',
          type: '手机号'
        },
        code: {
          show: false,
          msg: '',
          type: '验证码'
        }
      }
    }
  },
  mounted() {
    //从cookie中获取账号密码
    if (this.getCookie('hz_user') && this.getCookie('hz_pswd')) {
      this.loginList.username = this.getCookie('hz_user')
      this.loginList.password = this.getCookie('hz_pswd')
      this.isAuto = true
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log(this.$route)
    // }
  },

  created() {
    switch (this.$route.path.split('/')[1]) {
      case '':
        this.$store.commit('change_headed', '0 /')
        break
      case 'searchclass':
        this.$store.commit('change_headed', '1 /searchclass')
        break
      case 'searchCourse':
        this.$store.commit('change_headed', '1 /searchCourse')
        break
      case 'usersCenter':
        this.$store.commit('change_headed', '10 /usersCenter')
        break
      case 'usersSettings':
        this.$store.commit('change_headed', '10 /usersSettings')
        break
      default:
        break
    }
    if (this.$store.state.stu_id != '') {
      this.get_stuinfo()
    }
  },
  methods: {
    setCookie(name, value, day) {
      var date = new Date()
      date.setDate(date.getDate() + day)
      document.cookie = name + '=' + value + ';expires=' + date
    },
    //获取个人信息
    get_stuinfo() {
      let _this = this
      $.ajax({
        url: '/api/stu/queryStuInfo',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          stu_id: _this.$store.state.stu_id
        }),
        dataType: 'json',
        success: function(data) {
          _this.stu_info = data
        },
        error: function() {}
      })
    },
    change_index(num) {
      if (this.$route.path === num.split(' ')[1]) return
      this.$store.commit('change_headed', num)
      this.$router.push(num.split(' ')[1])
    },
    change_indexto(num) {
      if (this.$route.path === num.split(' ')[1]) return
      this.$store.commit('change_headed', num)
      this.$router.push('/usersCenter/MyInfo')
    },
    getCookie(name) {
      var reg = RegExp(name + '=([^;]+)')
      var arr = document.cookie.match(reg)
      if (arr) {
        return arr[1]
      } else {
        return ''
      }
    },
    init(bool) {
      if (bool) {
        this.isLogin = true
      }
      clearInterval(this.timer)
      this.timer = null
      this.isAuto = false
      this.isError = false
      this.isAgreement = true
      this.isCode = false
      this.codeText = '获取验证码'
      this.loginList = {
        username: '',
        password: ''
      }
      this.registerlist = {
        pass: '',
        checkPass: '',
        phone: '',
        code: ''
      }
      this.checkRegList = {
        pass: {
          show: false,
          msg: '',
          type: '密码'
        },
        checkPass: {
          show: false,
          msg: '',
          type: '密码'
        },
        phone: {
          show: false,
          msg: '',
          type: '手机号'
        },
        code: {
          show: false,
          msg: '',
          type: '验证码'
        }
      }
    },
    // 点击X 关闭弹框
    handleClose(done) {
      this.isDialogShow = false
      // this.init(true)
      done()
    },
    delCookie(name) {
      this.setCookie(name, null, -1)
    },
    change_cook() {
      if (!this.isAuto) {
        this.delCookie('hz_user')
        this.delCookie('hz_pswd')
      }
    },
    //退出
    logout() {
      this.$store.commit('login_stu', '')
      this.change_index('0 /')
    },
    // 点击登录
    login() {
      let _this = this
      if (!this.loginList.username || !this.loginList.password) {
        this.err = '账号和密码不能为空！'
        this.isError = true
        return
      }
      this.isError = false
      this.$axios
        .post('/api/stu/login', {
          tel: this.loginList.username,
          stu_pass: this.loginList.password
        })
        .then((resp) => {
          if (resp.data.code == 200) {
            if (_this.isAuto) {
              _this.setCookie('hz_user', _this.loginList.username, 7) //保存帐号到cookie，有效期7天
              _this.setCookie('hz_pswd', _this.loginList.password, 7) //保存密码到cookie，有效期7天
            }
            this.isDialogShow = false
            this.$store.commit('login_stu', resp.data.stu_id)
            this.$store.commit('saveUserRouterPath', '/usersCenter')
            this.get_stuinfo()
            this.change_index('10 /usersCenter')
          } else {
            _this.$message.error({
              type: 'info',
              message: resp.data.msg,
              // position: 'bottom-left',
              duration: '2000'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 点击注册
    register() {
      let isSave = this.checkReg()
      if (!isSave) return
      let _this = this
      let params = 'tel=' + this.registerlist.phone + '&stu_pass=' + this.registerlist.pass + '&sms_code=' + this.registerlist.code
      this.$axios
        .create({
          baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
          //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          withCredentials: true // 允许携带cookie
        })
        .post('/api/stu/regStu', params)
        .then((resp) => {
          if (resp.data == 1) {
            _this.$message.success({
              type: 'info',
              message: '注册成功,请登录',
              duration: '2000'
            })
            _this.isLogin = true
            _this.loginList = {
              username: _this.registerlist.phone,
              password: ''
            }
          } else {
            _this.$message.error({
              type: 'info',
              message: resp.data,
              duration: '2000'
            })
          }
        })
        .catch((err) => {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            duration: '2000'
          })
        })
    },
    // 注册的表单检验
    checkReg() {
      let registerlist = this.registerlist
      if (!registerlist.pass || !registerlist.checkPass || !registerlist.phone || !registerlist.code) {
        for (const key in registerlist) {
          if (registerlist.hasOwnProperty(key)) {
            if (registerlist[key] === '') {
              let msg = this.checkRegList[key]['type'] + '不能为空！'
              this.$set(this.checkRegList[key], 'show', true)
              this.$set(this.checkRegList[key], 'msg', msg)
            }
          }
        }
        return false
      } else {
        if (!/^1[3456789]\d{9}$/.test(registerlist.phone.toString())) {
          this.$set(this.checkRegList['phone'], 'show', true)
          this.$set(this.checkRegList['phone'], 'msg', '请输入正确手机号！')
          return false
        } else if (registerlist.pass.toString() !== registerlist.checkPass.toString()) {
          this.$set(this.checkRegList['checkPass'], 'show', true)
          this.$set(this.checkRegList['checkPass'], 'msg', '两次密码不一致！')
          return false
        }
        // else if (registerlist.code.toString() !== '1234') {
        //   this.$set(this.checkRegList['code'], 'show', true)
        //   this.$set(this.checkRegList['code'], 'msg', '验证码错误！')
        //   return false
        // }
        else {
          return true
        }
      }
    },
    // 隐藏注册表单检验提示
    initCheck() {
      this.checkRegList = {
        pass: {
          show: false,
          msg: '',
          type: '密码'
        },
        checkPass: {
          show: false,
          msg: '',
          type: '密码'
        },
        phone: {
          show: false,
          msg: '',
          type: '手机号'
        },
        code: {
          show: false,
          msg: '',
          type: '验证码'
        }
      }
    },
    // 头部点击登录注册
    openDialog(type) {
      this.isLogin = type === '登录' ? true : false
      this.isDialogShow = true
    },
    forgetPwd() {
      this.$router.push('/forgetPwd')
      this.isDialogShow = false
    },
    // 弹框内部切换登录注册页
    switchType(type) {
      this.isLogin = type === '登录' ? true : false
      this.init(false)
    },
    // 获取验证码
    getCode() {
      this.$axios
        .create({
          baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
          //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          withCredentials: true // 允许携带cookie
        })
        .post('/api/stu/SendSms', 'tel=' + this.registerlist.phone)
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
      this.isCode = true
      let n = 60
      this.codeText = `(${n}s)后重试`
      this.timer = setInterval(() => {
        if (n === 0) {
          clearInterval(this.timer)
          this.isCode = false
          this.codeText = '获取验证码'
        } else {
          this.isCode = true
          n--
          this.codeText = `(${n}s)后重试`
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.fire-header {
  height: 60px;
  width: 100%;
  min-width: 1360px;
  background: url('../assets/images/header/logo.png') no-repeat 6% 40%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  padding-left: 14%;
  padding-right: 76px;
  font-family: siyuanhei;
  border-bottom: 1px solid #d2d2d2;
  .fire-nav {
    li {
      float: left;
      padding: 0 22px;
      line-height: 60px;
      height: 60px;
      text-align: center;
      cursor: pointer;
      a {
        text-decoration: none;
        font-size: 16px;
        color: #413c36;
      }
    }
    li.active a,
    li:hover a {
      color: #0b85e3;
    }
    li.active {
      border-bottom: 2px solid #0b85e3;
    }
  }
  .fire-login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    li {
      padding: 0 10px;
      height: 60px;
      line-height: 60px;
      a {
        text-decoration: none;
        color: #413c36;
      }
    }
    li:hover a {
      color: #0b85e3;
    }
    .user-item {
      width: 268px;
      height: 124px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
      background: #fff;
      position: absolute;
      z-index: 1000;
      right: 30px;
      top: 60px;
      text-align: left;
      color: #333;
      display: none;
    }
    .user-hidden {
      cursor: pointer;
    }
    .user-hidden:hover {
      .user-item {
        display: block;
      }
    }
    .user-item .head-img img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      margin-right: 10px;
      border: none;
      vertical-align: middle;
    }
    .user-item h3 {
      font-size: 16px;
      line-height: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 176px;
    }
    .user-item p {
      font-size: 12px;
      width: 170px;
      margin-top: 5px;
    }
    .user-item .up-content {
      height: 80px;
      padding-top: 16px;
      background: #f0f0f0;

      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .user-item .down-content {
      height: 40px;
      line-height: 40px;
    }
    .user-item > div {
      padding: 0 20px 10px 12px;
    }
    .user-item .down-content a {
      font-size: 12px;
      color: #949494;
    }
    .user-item .down-content a:hover {
      color: #009ddb;
    }
  }
  // 登录与注册
  .login-register-dialog {
    // 登录框
    .login-dialog {
      .el-form-item .el-form-item__content {
        margin-left: 0 !important;
      }
      .login-dialog-title {
        background: url('../assets/images/header/login.png') no-repeat 0 0;
        width: 100%;
        height: 20px;
        margin-bottom: 24px;
      }
      .password {
        position: relative;
        .forget-password {
          position: absolute;
          top: 0;
          right: 10px;
          color: #589de7;
          font-size: 12px;
          cursor: pointer;
        }
        .error {
          font-size: 12px;
          color: red;
        }
      }
      .loginBtn {
        width: 100%;
        height: 40px;
        background-image: linear-gradient(to right, #359ceb, #007fe1);
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
      .register {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #e9e9e9;
        .registerBtn {
          a {
            font-size: 12px;
            color: #589de7;
          }
        }
      }
      .theThirdParty {
        display: flex;
        justify-content: space-between;
      }
    }
    // 注册
    .register-dialog {
      .el-form-item .el-form-item__content {
        margin-left: 0 !important;
        position: relative;
      }
      .error {
        font-size: 12px;
        color: red;
        position: absolute;
        line-height: normal;
        bottom: -18px;
        left: 0;
      }
      .register-dialog-title {
        background: url('../assets/images/header/register.png') no-repeat 0 0;
        width: 100%;
        height: 20px;
        margin-bottom: 24px;
      }
      .code {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
        }
        .el-form-item__content::before,
        .el-form-item__content::after {
          content: none;
        }
        .code-input {
          width: 60%;
        }
        .code-btn {
          width: 30%;
          padding: 1rem;
          font-size: 1rem;
          background-image: linear-gradient(to right, #359ceb, #007fe1);
          color: #fff;
        }
        .noCode {
          background: #d1d4d9;
        }
      }
      .registerBtn {
        width: 100%;
        height: 40px;
        background-image: linear-gradient(to right, #359ceb, #007fe1);
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
