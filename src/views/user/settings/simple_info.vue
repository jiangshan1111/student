<template>
  <div class="content-right" style="overflow: hidden;min-height: 594px;padding-top:20px">
    <div class="wrap user-main">
      <div class="clear" style="margin-left: 30px;font-size: 18px;color: #474746;width: 920px;">
        <p class="fl" style="font-size: 16px">个人资料<span style="font-size: 12px;color: #666;margin-left: 14px;">(信息的真实性会涉及到您的权益,为保护您的权益,请输入真实有效信息。)</span></p>
      </div>
      <div class="line" style="margin-left: 30px;width: 920px;"></div>
    </div>
    <div class="wrap edit-content nospace"></div>
    <div class="wrap user-infos L-user-infos" style="margin-top: -40px">
      <div class="view-infos">
        <div class="contents">
          <h2 class="h6">
            基本信息
            <span style="color: red;font-size: 12px;">标注*的为必填项</span>
            <a v-if="infomation1 == false" href="javascript:;" class="btn btn-sm edit" id="editBaseInfo" style="" @click="infomation1 = true">编辑</a>
            <a v-if="infomation1 == true" href="javascript:;" class="btn btn-sm edit" id="editBaseInfo" style="    right: 70px;" @click="submit_infomation">保存</a>
            <a v-if="infomation1 == true" href="javascript:;" class="btn btn-sm edit" id="baseCancle" style="text-decoration: none;color: #474747;" @click="infomation1 = false">取消</a>
          </h2>
          <!-- 学生学历code和证件类型code和证件号码 -->
          <div class="box L-box">
            <ul class="list infos view" id="baseInfoView" v-if="infomation1 == false" style="display: block;">
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">*</span>姓名：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.stu_name }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>昵称：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.nickname }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>证件类型：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.ID_type }} </em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>证件号码：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.ID_number }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>性别：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.sex }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>最高学历：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.education }} </em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>年龄：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{
                  stu_info.birthday == null ? '' : new Date().getFullYear() - new Date(stu_info.birthday).getFullYear()
                }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>出生日期：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.birthday }}</em>
              </li>
              <li class="hkAddress" style="height: 29px">
                <span style="width: 113px;margin-left: -48px;"><span class="BT" style="width: 18px;margin-top: 2px;color: red;">&nbsp;</span>户口所在地：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.hukou_address }}</em>
              </li>
              <li class="L-posR" style="height: 29px">
                <span style="width: 72px;margin-left: -7px;"><span class="BT" style="width: 4px;margin-top: 2px;color: red;position: absolute">&nbsp;</span>签名：</span
                ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.autograph }}</em>
              </li>
            </ul>
            <form action="" id="baseForm">
              <input type="hidden" name="id" value="2406045" id="stuId" />
              <ul class="list infos edit" id="baseInfoEdit" v-if="infomation1 == true" style="display: block;">
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;"><span style=" width: 4px;margin-top: 2px;color: red;position: absolute;">*</span>姓名：</span>
                  <em><input type="text" maxlength="100" v-model="sub_stu_info.stu_name" name="name" id="stuNames"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;"> <span class="BT" style=" width: 18px;margin-top: 2px;color: red;">&nbsp;</span>昵称：</span>
                  <em><input type="text" maxlength="10" v-model="sub_stu_info.nickname" name="nickName" id="nickName"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">证件类型：</span>
                  <em>
                    <select name="identityTypeCode" v-model="sub_stu_info.ID_type" id="idenType">
                      <option value="">请选择</option>

                      <option value="身份证" id="ID_IDCARD">身份证</option>

                      <option value="护照" id="ID_PASSPORT">护照</option>

                      <option value="港澳通行证" id="ID_HMP">港澳通行证</option>

                      <option value="台胞证" id="ID_TCP">台胞证</option>

                      <option value="军官证" id="ID_OFFICERS">军官证</option>

                      <option value="士官证" id="ID_SERGEANTS">士官证</option>

                      <option value="未确定证件" id="ID_UNCONFM_ID">未确定证件</option>
                    </select>
                  </em>
                </li>
                <li class="L-posR">
                  <span style="width: 86px;margin-left: -21px;"> <span class="BT" style=" width: 18px;margin-top: 2px;color: red;">&nbsp;</span>证件号码：</span>
                  <em><input type="text" v-model="sub_stu_info.ID_number" name="identityId" id="identityId" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">性别：</span>
                  <em class="L-check"> <input type="radio" v-model="sub_stu_info.sex" value="男" name="sex" />男 <input type="radio" v-model="sub_stu_info.sex" value="女" name="sex" />女 </em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">最高学历：</span>
                  <em>
                    <select name="educationCode" v-model="sub_stu_info.education" id="dicEducationCode">
                      <option value="">请选择</option>

                      <option value="小学" id="primary_school">小学</option>

                      <option value="初中" id="juniorHigh_school">初中</option>

                      <option value="高中" id="seniorHigh_school">高中</option>

                      <option value="大专以下" id="UNDER_JUNIOR">大专以下</option>

                      <option value="大专" id="JUNIOR">大专</option>

                      <option value="本科" id="BECHELOR">本科</option>

                      <option value="研究生" id="POSTGRADUATE">研究生</option>

                      <option value="博士生及以上" id="DOCTOR">博士生及以上</option>
                    </select>
                  </em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">年龄：</span>
                  <em>
                    {{ new Date().getFullYear() - new Date(sub_stu_info.birthday).getFullYear() }}
                  </em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">出生日期：</span>
                  <em><input type="text" name="birthday" id="datetimepicker" v-model="sub_stu_info.birthday"/></em>
                </li>
                <li class="hkAddress">
                  <span style="width: 103px;margin-left: -38px;">户口所在地：</span>
                  <em><input type="text" v-model="sub_stu_info.hukou_address" name="hkAddress" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">签名：</span>
                  <em>
                    <input type="text" maxlength="20" v-model="sub_stu_info.autograph" name="userSign" id="userSign" />
                  </em>
                </li>
              </ul>
            </form>
          </div>
          <h2 class="h6">
            联系信息
            <span style="color: red;font-size: 12px;">标注*的为必填项</span>
            <a v-if="infomation2 == false" href="javascript:;" class="btn btn-sm edit" id="editBaseInfo" style="" @click="infomation2 = true">编辑</a>
            <a v-if="infomation2 == true" href="javascript:;" class="btn btn-sm edit" id="editBaseInfo" style="    right: 70px;" @click="submit_infomation">保存</a>
            <a v-if="infomation2 == true" href="javascript:;" class="btn btn-sm edit" id="baseCancle" style="text-decoration: none;color: #474747;" @click="infomation2 = false">取消</a>
          </h2>
          <div class="box L-box">
            <ul class="list infos view" id="conInfoView" v-if="infomation2 == false" style="display: block;">
              <div id="lxColumn">
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">手机号：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.tel }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">办公电话：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.office_tel }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 88px;margin-left: -23px;">紧急联系人：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.urgent_people }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 115px;margin-left: -49px;">紧急联系人电话：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.urgent_people_tel }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">邮箱：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.email }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">微信：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.wechat }}</em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">QQ号：</span
                  ><em style="width: 68%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;">{{ stu_info.qq }}</em>
                </li>
              </div>
            </ul>
            <form action="" id="conForm">
              <input type="hidden" name="id" value="2406045" id="stuId" />
              <ul class="list infos view" id="conInfoEdit" selector="" v-if="infomation2 == true" style="display: block;">
                <li class="L-posR" style="height:27px">
                  <span style="width: 72px;margin-left: -7px;">手机号：</span>
                  <em><input type="text" v-model="sub_stu_info.tel" name="mobile" id="mobile" disabled="disabled" style="border:  0;background: white;" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">办公电话：</span>
                  <em><input type="text" v-model="sub_stu_info.office_tel" name="officePhone" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 82px;margin-left: -18px;">紧急联系人：</span>
                  <em><input type="text" v-model="sub_stu_info.urgent_people" name="emergencyContact" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 108px;margin-left: -43px;">紧急联系人电话：</span>
                  <em><input type="text" v-model="sub_stu_info.urgent_people_tel" name="emergencyPhone" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">邮箱：</span>

                  <em><input type="text" v-model="sub_stu_info.email" name="email" id="email" maxlength="20"/></em>
                </li>
                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">微信：</span>
                  <em><input type="text" v-model="sub_stu_info.wechat" name="weixinId" maxlength="20"/></em>
                </li>

                <li class="L-posR">
                  <span style="width: 72px;margin-left: -7px;">QQ号：</span>
                  <em><input type="text" v-model="sub_stu_info.qq" name="qq" maxlength="20"/></em>
                </li>
              </ul>
            </form>
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
html body .content-right .L-user-infos .view-infos .contents .h6 .edit {
  color: #fff !important;
  border-color: #0af !important;
  background-color: #0af !important;
}
.L-user-infos .view-infos .contents .h6 .edit {
  padding: 7px 12px;
  background-color: #00b7ee;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  top: -10px;
}
.user-main {
  padding: 20px 0 10px;
}
.L-user-infos .view-infos li input {
  width: 163px;
}
.user-infos .view-infos .contents .box .list.infos li em {
  color: #4c4c4c;
  margin-left: 10px;
  line-height: 27px;
  position: relative;
}
.L-user-infos .view-infos li .L-check input {
  width: auto;
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
  border: 1px solid #ddd;
  border-radius: 3px;
  vertical-align: middle;
}
.L-user-infos .view-infos li select {
  padding: 3px 8px;
  width: 164px;
  box-sizing: border-box;
}
.L-user-infos .view-infos .contents .box .list.infos .hkAddress {
  width: 100%;
}
.L-user-infos .view-infos .hkAddress input {
  width: 534px;
  box-sizing: border-box;
  outline: none;
}
.user-main .place {
  font-size: 12px;
  font-size: 1.2rem;
  clear: both;
  overflow: hidden;
}
.user-main .place a {
  color: #45abdb;
}
.user-main .contents {
  position: relative;
  margin: 20px 0 10px;
  background-color: #ffffff;
}
.user-main .contents.spa {
  margin-top: 20px;
}
.user-main .contents .space {
  position: relative;
  padding: 30px 50px 5px 95px;
}
.user-infos {
  padding: 20px 0;
}
.user-infos .view-infos {
  background-color: #ffffff;
}
.user-infos .view-infos .space {
  padding: 20px 30px;
  border-bottom: 1px solid #dfe1e6;
}
.user-infos .view-infos .contents {
  padding: 20px 30px;
}
.user-infos .view-infos .contents .h6 {
  position: relative;
  color: #4c4c4c;
}
.user-infos .view-infos .contents .h6 i {
  font-style: normal;
  color: #45abdb;
}
.user-infos .view-infos .contents .h6 .edit {
  position: absolute;
  right: 0;
  padding: 5px 12px;
  background-color: #ededed;
  font-size: 12px;
  font-size: 1.2rem;
  cursor: pointer;
}
.user-infos .view-infos .contents .h6 .edit.save {
  background-color: #45abdb;
  color: #ffffff;
}
.user-infos .view-infos .contents .box {
  margin: 15px 0 30px;
  padding: 20px 30px 10px;
  border: 1px solid #dfe1e5;
}
.user-infos .view-infos .contents .box .list {
  zoom: 1;
  clear: both;
  overflow: hidden;
}
.user-infos .view-infos .contents .box .list li {
  float: left;
  width: 10%;
  margin: 0 20% 0.5em;
}
.user-infos .view-infos .contents .box .list li i {
  position: relative;
  top: 3px;
  display: inline-block;
  float: left;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  font-style: normal;
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-size: 1.2rem;
  /* background-image: url('../images/user-icons.png'); */
  background-repeat: no-repeat;
  background-position: -30px -525px;
  line-height: 1;
}
.user-infos .view-infos .contents .box .list.infos li {
  width: 30%;
  margin: 0 10% 1.4em;
  font-size: 12px;
  font-size: 1.2rem;
}
.user-infos .view-infos .contents .box .list.infos li span {
  display: inline-block;
  width: 96px;
  text-align: right;
  float: left;
  color: #999;
  line-height: 27px;
  margin-left: -7px;
}
.user-infos .view-infos .contents .box .list.infos li em {
  color: #4c4c4c;
  margin-left: 10px;
  line-height: 27px;
  position: relative;
}
.infos li strong {
  position: absolute;
  z-index: 111;
  left: 0;
  bottom: -20px;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  color: #bbb;
  white-space: nowrap;
}
.user-infos .view-infos .contents .box .list.infos li em.sex {
  position: relative;
  top: 3px;
}
.user-infos .view-infos .contents .box .list.infos.edit {
  display: none;
}
.c-list-main {
  position: relative;
  margin-bottom: 20px;
}
.c-list-main .rows {
  width: 1120px;
}
</style>
