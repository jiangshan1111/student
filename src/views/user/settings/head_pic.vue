<template>
  <div class="content-right" style="overflow: hidden;min-height: 594px;padding-top:20px">
    <form id="addFormOne" method="post" novalidate="novalidate" enctype="multipart/form-data"></form>
    <div class="wrap user-main">
      <div style="margin-left: 30px;font-size: 18px;color: #474746;">设置头像</div>
      <div class="line" style="margin-left: 30px;width: 920px;"></div>
    </div>
    <div class="wrap edit-content user-main nospace" style="width: 920px;">
      <div class="edit-main">
        <div class="edit-picture clear">
          <div class="picture-left" style="width: 100%;">
            <div
              class="upload"
              style="    text-align: center;
                                padding-left: 0;"
            >
              <label class="control-label btn" for="uploadform-excelfiles" style="    border: 1px solid rgb(200,200,200);">上传头像</label
              ><input type="file" id="uploadform-excelfiles" @change="file" multiple class="attachment-upload" style="left:-9999px;position:absolute;" />
            </div>

            <div class="upload-div pic" style="    margin: 0 auto;">
              <img
                id="target"
                style="    width: 100%;
                                    height: 100%;"
                :src="imgSrc"
              />
            </div>
          </div>
        </div>
        <div class="btns" style="padding-left: 0;width: 100%;">
          <p style="text-align: center;">
            <a href="javascript:void(0);" id="saveTP" @click="submit_image" class="btn btn-sm btn-primary" style="background-color: #00baee;border-color: #00baee;color:white">完成</a>
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
    $.ajax({
      url: 'http://192.168.10.166:8080/stu/queryStuInfo',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
        stu_id: _this.stu_id
      }),
      dataType: 'json',
      success: function(data) {
        _this.stu_info = data
        _this.sub_stu_info = JSON.parse(JSON.stringify(data))
        _this.imgSrc = _this.stu_info.head
        _this.stu_info.md_tel = data.tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
      error: function() {}
    })
  },
  methods: {
    //修改个人签名
    change_write() {
      this.write_label = true
      this.$refs.textarea.focus()
    },
    //提交头像
    submit_image() {
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
      $.ajax({
        url: 'http://192.168.10.166:8080/stu/settingHead',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          stu_id: _this.stu_id,
          head: _this.imgSrc
        }),
        dataType: 'json',
        success: function(data) {
          if (data == 1) {
            _this.$message.success({
              type: 'info',
              message: '上传头像成功',
              // position: 'bottom-left',
              duration: '2000'
            })
            _this.stu_info.head = _this.imgSrc
            _this.sub_stu_info.head = _this.imgSrc
          } else {
            _this.$message.error({
              type: 'info',
              message: '上传头像失败',
              // position: 'bottom-left',
              duration: '2000'
            })
          }
        },
        error: function() {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            // position: 'bottom-left',
            duration: '2000'
          })
        }
      })
    },
    //图片上传
    file(e) {
      // var allFile = [];
      var fileError = 0
      let fileList = e.currentTarget.files
      let _this = this
      $.each(fileList, function(index, item) {
        index = 0 // $(itme).setAttribute('type','file');
        var fileName = item.name
        var fileEnd = fileName.substring(fileName.indexOf('.'))
        //上传文件格式判断
        let type = item.type
        var maxsize = 2 * 1024 * 1024
        if (type.indexOf('image/') < 0) {
          _this.$notify.error({
            title: '错误',
            message: '请选择图片上传',
            duration: 2000
          })
        } else if (item.size > maxsize) {
          _this.$notify.error({
            title: '错误',
            message: '图片尺寸不能超过2MB',
            duration: 2000
          })
        } else if (window.FileReader) {
          var form = document.getElementById('addFormOne')
          var formData = new FormData(form)
          formData.set('multipartFile', item)
          $.ajax({
            url: 'http://192.168.10.166:8080/pse/uploadFile',
            type: 'post',
            // contentType: 'application/json',
            data: formData,
            processData: false,
            contentType: false,
            // dataType: 'json',
            success: function(data) {
              _this.imgSrc = data
            },
            error: function() {}
          })
        }
        //
      })
      $(e.target).val('')
    },
    //提交个人信息
    submit_infomation() {
      let _this = this
      $.ajax({
        url: 'http://192.168.10.166:8080/stu/changePassword',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(_this.sub_stu_info),
        dataType: 'json',
        success: function(data) {
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
        },
        error: function() {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            // position: 'bottom-left',
            duration: '2000'
          })
        }
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
.edit-content .edit-main .edit-picture .picture-left .upload-div {
  position: relative;
  width: 300px;
  height: 300px;
  margin-left: 50px;
  background-color: #f1f1f1;
  color: #666;
  background-image: url(../../../assets/images/jiang/up.png);
  background-repeat: no-repeat;
  background-size: contain;
}
.edit-content .edit-main .edit-picture .upload {
  position: relative;
  padding-bottom: 15px;
  padding-left: 50px;
}
.user-main {
  padding: 20px 0 10px;
}
.edit-content .edit-main .edit-picture {
  margin-bottom: 20px;
  overflow: hidden;
}
</style>
