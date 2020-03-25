<template>
  <div class="communitynewask">
    <div class="communitynewask-inner">
      <div class="communitynewask-left">
        <h1>发布问题</h1>
        <div class="communitynewask-title">
          <span class="label-name">标题：</span>
          <input type="text" @focus="focusChange" class="title-input" placeholder="请输入问题标题" v-model="titileValue" id="q-title" />
        </div>
        <p class="communitynewask-warning">
          <span v-if="warningTitle"><i class="iconfont"></i> 标题为5-80个字符！</span>
        </p>
        <div class="communitynewask-title">
          <span class="label-name">分类：</span>
          <el-select size="mini" :popper-append-to-body="false" class="communitynewask-select" @focus="focusChange" v-model="typeValue" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="communitynewask-editor">
          <span class="label-name">内容：</span>
          <!-- 编辑器 -->
          <div class="cont-wrap" id="editor_id"></div>
        </div>
        <p class="communitynewask-warning">
          <span v-if="wraningContent"> <i class="iconfont"></i>内容不多于20000个字符！ </span>
        </p>
        <p class="communitynewask-warning">
          <span v-if="wraning"> <i class="iconfont"></i>标题或分类或内容不能为空！ </span>
        </p>
        <div class="communitynewask-uploadImg clearfix">
          <span class="label-name fl">图片：</span>
          <el-upload
            class="avatar-uploader fl"
            action="http://192.168.10.245:8080/Ex/upload1"
            :on-success="handleAvatarSuccess"
            list-type="picture-card"
            :on-remove="handleRemove"
            multiple
            :auto-upload="false"
            :http-request="uploadFile"
            :limit="9"
            ref="upload"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div style="text-align:right;margin-top:17px;">
          <button @click="release" class="release" :class="!noClick ? '' : 'noClick'" :disabled="noClick">发布</button>
        </div>
      </div>
      <div class="communitynewask-right">
        <div class="week-hot-awsner">
          <h3>一周热门问题</h3>
          <ul>
            <li>基金证挂靠的话有风险吗？</li>
            <li>基金证挂靠的话有风险吗？</li>
            <li>基金证挂靠的话有风险吗？</li>
            <li>基金证挂靠的话有风险吗？</li>
            <li>基金证挂靠的话有风险吗？</li>
          </ul>
        </div>
        <article class="ban">
          <h5>问答禁止提问这些</h5>
          <ul class="no">
            <li>1、禁止发布求职、交易、推广、广告类与回答无关信息将一律清理。</li>
            <li>2、尽可能详细描述您的问题，如标题与内容不符，或与问答无关的信息将被关闭。</li>
            <li>3、问答刷屏用户一律冻结账号</li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import wangEditor from '../../assets/js/wangEditor'
export default {
  data() {
    return {
      stu_id: this.$store.state.stu_id,
      imageUrl: '',
      options: [],
      editor: null,
      titileValue: '', // 标题
      typeValue: [], // 分类
      weekData: [], // 一周热门
      wraning: false,
      warningTitle: false,
      wraningContent: false,
      formDate: null,
      noClick: false
    }
  },
  created() {
    // 全部分类导航栏
    axios({
      method: 'post',
      url: '/api/stu/Question/queryClassificationName',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.options = res.data.map((el) => {
        return {
          label: el.modify_name,
          value: el.pse_id
        }
      })
    })
  },
  methods: {
    focusChange() {
      this.wraningContent = false
      this.warningTitle = false
      this.wraning = false
    },
    handleAvatarSuccess(res, file) {
      console.log('成功回调')
    },
    beforeAvatarUpload(file) {
      console.log('拦截回调')
      const isJPG = file.type === ('image/jpeg' && 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isJPG) {
        alert('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log('删除文件')
    },
    // submit事件保存图片
    uploadFile(file) {
      this.formDate.append('file', file.file)
    },
    // 提交问题
    release() {
      this.wraning = this.warningTitle = this.wraningContent = false
      if (this.titileValue === '' || this.typeValue.length === 0 || this.editor.txt.text() === '') {
        this.$message({
          message: '标题或分类或内容不能为空！',
          type: 'warning'
        })
        this.wraning = true
        return
      } else if (!/^.{5,80}$/.test(this.titileValue)) {
        this.$message({
          message: '标题为5-80个字符！',
          type: 'warning'
        })
        this.warningTitle = true
        return
      } else if (!/^[\u4e00-\u9fffa-zA-Z0-9]{0,20000}$/.test(this.editor.txt.text())) {
        this.$message({
          message: '内容不多于20000个字符！',
          type: 'warning'
        })
        this.wraningContent = true
        return
      }
      this.noClick = true
      this.formDate = new FormData()
      this.$refs.upload.submit()
      $.ajax({
        url: '/api/Ex/upload1',
        type: 'post',
        data: this.formDate,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        cache: false,
        success: (data) => {
          axios({
            method: 'post',
            url: '/api/stu/Question/askQuestions',
            data: JSON.stringify({
              subject_id: ';' + this.typeValue.join(';') + ';', // 分类id
              publisher: this.stu_id, // 学生id
              content: this.editor.txt.html(),
              picture: data.data.length ? data.data.join(';') : '',
              title: this.titileValue
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((res) => {
              if (res) {
                this.titileValue = ''
                this.typeValue = []
                this.editor.txt.html('<p><br></p>')
                this.formDate = null
                this.$refs.upload.clearFiles()
                this.noClick = false
                alert('发布成功！')
              } else {
                this.noClick = false
                alert('发布失败，请重试！')
              }
            })
            .catch((err) => {
              this.noClick = false
              alert('网络连接失败！请重试！')
            })
        },
        error: function() {
          this.noClick = false
          alert('图片上传错误请重新上传')
        }
      })
    }
  },
  mounted() {
    var E = wangEditor
    this.editor = new E('#editor_id')
    this.editor.customConfig.onfocus = this.focusChange
    this.editor.customConfig.debug = true
    // this.editor.customConfig.uploadImgShowBase64 = true
    // this.editor.customConfig.showLinkImg = false
    // this.editor.customConfig.uploadImgServer = 'http://192.168.10.245:8080/Ex/upload'//配置上传到服务器地址
    // this.editor.customConfig.customUploadImg = function (files, insert) {//对上传的图片进行处理，图片上传的方式
    //     var data = new FormData()
    //     // var boundary = 'hhh'
    //     for(var i =0; i<files.length;i++) {
    //         // console.log(files[i].name = 'ddddd')
    //         // files[i].name = '2.png'
    //         // files[i].name = i + '#' + files[i].name
    //         data.append("file", files[i])
    //     }
    //     $.ajax({
    //         url: "http://192.168.10.245:8080/Ex/upload1",
    //         type: "post",
    //         data: data,
    //         processData:false,
    //         contentType:false,
    //         dataType: 'JSON',
    //         cache: false,
    //         success: function (data) {
    //             insert(data[0])
    //             // var imgUrl=data.newName
    //             //这里是对图片格式进行处理，我这里因为是要保存到本地服务器上，将图片前缀修改
    //             // editor.cmd.do('insertHTML', '<img style="width: 200px;height: 200px;" src="http://localhost/ScTradeInSta/public/resource/image/'+ imgUrl+'" alt="">')
    //         },
    //         error: function () {
    //             alert("图片上传错误")
    //         }
    //     })
    // }
    this.editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'italic', // 斜体
      'underline', // 下划线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'image',  // 插入图片
      // 'table',  // 表格
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.create()
  }
}
</script>

<style lang="scss">
.communitynewask {
  font-family: siyuanhei;
  min-width: 1361px;
  .communitynewask-inner {
    width: 1082px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .communitynewask-left {
    width: 750px;
    padding-top: 14px;
    h1 {
      line-height: 67px;
      font-size: 16px;
      color: #999999;
      border-bottom: 1px #e5e5e5 solid;
    }
    .communitynewask-title {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-input {
        width: 698px;
        height: 30px;
        border: 1px #d6d6d6 solid;
        padding-left: 14px;
      }
      .communitynewask-select {
        width: 698px;
      }
    }
    .communitynewask-warning {
      color: red;
      margin: 10px 0;
    }
    .communitynewask-editor {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .cont-wrap {
        width: 698px;
      }
    }
    .communitynewask-title .label-name,
    .communitynewask-editor .label-name,
    .communitynewask-uploadImg .label-name {
      font-size: 16px;
      color: #747373;
    }
    .communitynewask-uploadImg {
      margin-top: 30px;
    }
    .release {
      width: 84px;
      height: 40px;
      line-height: 40px;
      background-image: linear-gradient(to right, #359ceb, #0285eb);
      border-radius: 5px;
      text-align: center;
      color: #fff;
    }
    .noClick {
      background: #ccc;
    }
    .el-select-dropdown {
      z-index: 20000 !important;
    }
    input[type='file'] {
      display: none;
    }
  }
  .communitynewask-right {
    padding-top: 66px;
    .week-hot-awsner {
      width: 220px;
      margin-bottom: 35px;
      h3 {
        line-height: 43px;
        color: #575e67;
        font-size: 13px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        border-bottom: 1px #e5e5e5 solid;
      }
      li {
        margin-top: 14px;
        color: #575e67;
        font-size: 12px;
        cursor: pointer;
      }
      li::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #007fe1;
        margin-right: 7px;
        vertical-align: middle;
      }
    }
    .ban {
      width: 220px;
      margin-top: 80px;
      h5 {
        font-size: 15px;
        color: #575e67;
        margin-bottom: 9px;
      }
      li {
        font-size: 13px;
        color: #999999;
        line-height: 25px;
      }
    }
  }
}
</style>
