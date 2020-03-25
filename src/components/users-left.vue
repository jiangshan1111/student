<template>
  <div class="content-left" style="min-height:594px;">
    <div class="headpic">
      <div class="pic" @click="$router.push('/usersSettings/toHeadPic')" style="background-image:url('http://image.yunduoketang.com/headpic/34270/20190919/a0b664f9-50eb-4254-9769-d65952ab54cc.jpg')">
        <!-- <div class="setup" onclick="location.href='/usersCenter/userConfig?url=hPic'" style="display: none;">设置</div> -->
        <div class="maskpic" style="display: none;">
          <img src="@/assets/images/jiang/semic.png" alt />
        </div>
      </div>
      <div class="headtit">{{ sub_stu_info.tel }}</div>
      <div class="headlabel static" v-show="write_label == false" style="text-align: center;word-break: break-all;">
        <span class="qm" style="word-break: break-word;max-height: 38px;display: block;overflow: hidden;">{{
          sub_stu_info.autograph == null ? '这家伙很懒，什么都没有留下。。。' : sub_stu_info.autograph
        }}</span>
        <span class="iconfont" id="userEditBtn" style="cursor: pointer;" @click="change_write"></span>
      </div>
      <div class="headlabel2 write" :style="write_label == true ? 'display:block' : ''">
        <textarea ref="usertextarea" id="usertextarea" name cols="30" rows="2" maxlength="40" @blur="submit_infomation" v-model="sub_stu_info.autograph"></textarea>
        <!-- <span class="font-num"><em class="inCount">12</em>/40</span> -->
      </div>
    </div>
    <ul class="rightMenu">
      <div v-if="userRouterPath.indexOf('/usersCenter') > -1">
        <li @click="goCenter('/usersCenter')" :class="userRouterPath == '/usersCenter' || userRouterPath == '/usersCenter/myCourse' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn myCourse">我的课程</span>
        </li>
        <li @click="goCenter('/usersCenter/myClassPackage')" :class="userRouterPath == '/usersCenter/myClassPackage' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="my-class-bag choiceBtn">我的课程包</span>
        </li>
        <li @click="goCenter('/usersCenter/collectClasses')" :class="userRouterPath == '/usersCenter/collectClasses' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的收藏</span>
        </li>
        <div class="dashed"></div>
        <li @click="goCenter('/usersCenter/myTiku')" :class="userRouterPath == '/usersCenter/myTiku' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的题库</span>
        </li>
        <div class="dashed"></div>
        <li @click="goCenter('/usersCenter/MyQuestion')" :class="userRouterPath == '/usersCenter/MyQuestion' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的问答</span>
        </li>
        <div class="dashed"></div>
        <li @click="goCenter('/usersCenter/MyCoupon')" :class="userRouterPath == '/usersCenter/MyCoupon' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的优惠券</span>
        </li>
        <li @click="goCenter('/usersCenter/MyInfo')" :class="userRouterPath == '/usersCenter/MyInfo' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的消息</span>
        </li>
        <li @click="goCenter('/usersCenter/MyOrder')" :class="userRouterPath == '/usersCenter/MyOrder' ? 'uncheck label-active' : 'uncheck'">
          <span class="iconfont"></span>
          <span class="choiceBtn">我的订单</span>
        </li>
      </div>
      <div v-if="userRouterPath.indexOf('/usersSettings') > -1">
        <li
          @click="goCenter('/usersSettings/showInfo')"
          :class="userRouterPath == '/usersSettings/showInfo' || userRouterPath == '/usersSettings' ? 'uncheck label-active' : 'uncheck'"
          data-url="student/showInfo"
          num="1"
        >
          <span class="iconfont" style></span>
          <span class="choiceBtn myCourse" style>账号信息</span>
        </li>
        <div class="dashed"></div>

        <li @click="goCenter('/usersSettings/simpleInfo')" :class="userRouterPath == '/usersSettings/simpleInfo' ? 'uncheck label-active' : 'uncheck'" data-url="student/showVipInfo" num="2">
          <span class="iconfont" style></span>
          <span class="choiceBtn" style>个人资料</span>
        </li>
        <div class="dashed"></div>

        <div class="dashed"></div>
        <li @click="goCenter('/usersSettings/toHeadPic')" :class="userRouterPath == '/usersSettings/toHeadPic' ? 'uncheck label-active' : 'uncheck'" data-url="student/toHeadPic" num="3">
          <span class="iconfont" style></span>
          <span class="choiceBtn" style>设置头像</span>
        </li>
        <div class="dashed"></div>
        <li @click="goCenter('/usersSettings/toUpdatePwd')" :class="userRouterPath == '/usersSettings/toUpdatePwd' ? 'uncheck label-active' : 'uncheck'" data-url="usersFront/toUpdatePwd" num="4">
          <span class="iconfont" style></span>
          <span class="choiceBtn" style>修改密码</span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeIndexa: 2,
      activeIndexb: 0,
      // userRouterPath: '/usersCenter', //跳转的路径
      sub_stu_info: {},
      write_label: false
    }
  },
  created() {
    let _this = this
    //获取学员信息
    this.$axios
      .post('/api/stu/queryStuInfo', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        if (resp.status == 200) {
          _this.sub_stu_info = JSON.parse(JSON.stringify(resp.data))
        }
      })
      .catch(() => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          duration: '2000'
        })
      })
  },
  mounted() {
    $('#userEditBtn').click(function() {
      $('#usertextarea').focus()
    })
  },
  watch: {
    $route() {
      // 保存用户设置的路由路径用来判断显示那个菜单
      this.$store.commit('saveUserRouterPath', this.$route.path)
    }
  },
  computed: {
    ...mapState({
      userRouterPath: (state) => state.userRouterPath
    })
  },
  methods: {
    activeA(num) {
      this.activeIndexa = num
    },
    //提交学员信息
    submit_infomation() {
      let _this = this
      this.$axios
        .post('/api/stu/changePassword', _this.sub_stu_info)
        .then((resp) => {
          if (resp.data == 1) {
            _this.$message.success({
              type: 'info',
              message: '修改成功',
              // position: 'bottom-left',
              duration: '2000'
            })
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
        .catch(() => {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            duration: '2000'
          })
        })
    },
    change_write() {
      this.write_label = true
    },
    goCenter(userRouterPath) {
      this.$store.commit('saveUserRouterPath', userRouterPath)
      this.$router
        .push({
          path: this.userRouterPath
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
