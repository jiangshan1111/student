<template>
  <div class="content-right" style="overflow: hidden;min-height: 594px;padding-top:20px">
    <div class="wrap user-main">
      <div style="margin-left: 30px;font-size: 18px;color: #474746;">设置密码</div>
      <div class="line" style="margin-left: 30px;width: 920px;"></div>
    </div>
    <div class="wrap edit-content nospace">
      <input type="hidden" id="userId" value="2338779" />
      <input type="hidden" id="pwdOpen" value="" />
      <input type="hidden" id="upPwdToken" value="5e00d5b3b2e24c53aa5b2355835f1e0b" />
      <div class="edit-main" style="position: relative;">
        <div class="edit-password">
          <p class="c">
            <span class="c-title">旧密码</span>
            <span class="c-content">
              <input type="password" v-model="old_stu_pass" placeholder="输入你的旧密码" id="oldPwd" />
              <i class="iconfont">*</i>
            </span>
            <span class="tips old"></span>
          </p>
          <p class="c">
            <span class="c-title">新密码</span>
            <span class="c-content">
              <input type="password" v-model="stu_pass" placeholder="输入新密码" id="newPwd" />
              <i class="iconfont">*</i>
            </span>
            <span class="tips new"></span>
          </p>
          <p class="c">
            <span class="c-title">重复一遍</span>
            <span class="c-content">
              <input type="password" v-model="qr_stu_pass" placeholder="再次输入新密码" id="nextPwd" />
              <i class="iconfont">*</i>
            </span>
            <span class="tips next"></span>
          </p>
          <p class="c">
            <a href="javascript:;" @click="change_pass" class="btn btn-sm btn-primary save" style="color:white;background-color: #00baee;border-color: #00baee;">保存</a>
          </p>
        </div>
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
    //修改密码
    change_pass() {
      let _this = this
      if (_this.stu_id == 0 || _this.stu_id == undefined) {
        _this.$message.error({
          type: 'info',
          message: '请先登录',
          // position: 'bottom-left',
          duration: '2000'
        })
        return
      }
      if ((_this.stu_pass || _this.qr_stu_pass || _this.old_stu_pass) !== '') {
        if (_this.stu_pass == _this.qr_stu_pass) {
          this.$axios
            .post('/api/stu/changePassword', {
              stu_id: _this.stu_id,
              old_stu_pass: _this.old_stu_pass,
              stu_pass: _this.stu_pass
            })
            .then((resp) => {
              let data = resp.data
              if (data == 1) {
                _this.$message.success({
                  type: 'info',
                  message: '修改密码成功',
                  // position: 'bottom-left',
                  duration: '2000'
                })
              } else {
                _this.$message.error({
                  type: 'info',
                  message: '修改密码失败',
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
        } else {
          _this.$message.error({
            type: 'info',
            message: '请确认两次密码一致',
            // position: 'bottom-left',
            duration: '2000'
          })
        }
      } else {
        _this.$message.error({
          type: 'info',
          message: '标红为必填',
          // position: 'bottom-left',
          duration: '2000'
        })
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
    }
  }
}
</script>
<style scoped>
.edit-content .edit-main .edit-password {
  width: 330px;
  margin: 0 auto;
  font-size: 14px;
}
.edit-content .edit-main .edit-password p.c {
  position: relative;
  margin-bottom: 15px;
}
.edit-content .edit-main .edit-password p.c span.c-title {
  width: 100%;
  margin-bottom: 5px;
}
.edit-content .edit-main .edit-password p.c span {
  display: inline-block;
}
.edit-content .edit-main .edit-password p.c span.c-content {
  width: 100%;
}
.edit-content .edit-main .edit-password p.c span.c-content input {
  width: 90%;
  float: left;
}
select,
textarea,
input[type='text'],
input[type='password'],
input[type='datetime'],
input[type='datetime-local'],
input[type='date'],
input[type='month'],
input[type='time'],
input[type='week'],
input[type='number'],
input[type='email'],
input[type='url'],
input[type='search'],
input[type='tel'],
input[type='color'] {
  padding: 0.45em 8px 0.35em;
  border: 1px solid #ddd;
  border-radius: 3px;
  vertical-align: middle;
}
.edit-content .edit-main .edit-password p.c span.c-content i {
  float: right;
  width: 2%;
  line-height: 32px;
  font-size: 12px;
  font-size: 1.2rem;
  color: #ff0000;
}
</style>
