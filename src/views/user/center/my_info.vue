<template>
  <div class="content-right my-invite" style="overflow: auto; min-height: 594px;">
    <div>
      <div class="wrap user-main" style="padding: 20px 0 0px;width: 970px;">
        <div class="contents" style="margin-top: -10px;">
          <span style="padding-left: 30px;font-size: 18px;position: relative;">我的消息</span>
          <div class="line" style="width: 920px;margin-left: 30px;"></div>
          <div class="types" style="padding: 0px;border: 0px;margin-left: 30px;width: 920px;background-color: #f3f3f3;">
            <ul>
              <li @click="change_news_label('all')" :class="news_label == 'all' ? 'notice xz' : 'notice'" status="" style="border-bottom: none;">全部</li>
              <li @click="change_news_label('un')" :class="news_label == 'un' ? 'notice xz' : 'notice'" status="noRead" style="border-bottom: none;">
                未读通知&nbsp;&nbsp;&nbsp;(<span class="wd">{{ un_news.length }}</span
                >)
              </li>
              <li @click="change_news_label('al')" :class="news_label == 'al' ? 'notice xz' : 'notice'" status="read" style="border-bottom: none;">
                已读通知&nbsp;&nbsp;&nbsp;(<span class="yd">{{ al_news.length }}</span
                >)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input type="hidden" id="userId" value="2338779" />
      <div class="wrap message-content nospace" style="padding: 0px 30px;min-height: 440px;max-height: 440px;width: 950px;overflow-y:auto;">
        <div class="message-list">
          <ul id="info" style="min-height: 480px;">
            <li v-for="(item, index) in news" :key="index">
              <h3 class="h6 lookContent" read="2440991">
                <span class="lookTitle" style="color: #474747;">{{ item.title }}</span>

                <span v-if="item.tf_read == 2" style="color: red;font-size: small;">
                  未读
                </span>
              </h3>

              <div class="msg-content" style="min-height: 44px;overflow:hidden">
                <!-- <p class="content"></p> -->
                <div
                  class="content"
                  style="min-height: 28px;line-height: 21px;width: auto;margin: 0;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;"
                  v-html="item.content"
                ></div>
                <div class="btnMenu">
                  <a
                    href="javascript:;"
                    class="btn btn-sm btn-primary lookContentS"
                    read="2440991"
                    style="top: 34px;right:85px;color:white;background-color: #00baee;border-color: #00baee;"
                    @click="view_news(item)"
                    >查看</a
                  >
                  <a href="javascript:;" class="btn btn-sm btn-default delMessage" delid_c="1171457" delid_u="2440991" readflag="0" style="top: 34px;" @click="delete_news(item)">删除</a>
                </div>
              </div>
              <div class="message-time">{{ getNowFormatDate(new Date(item.time)) }}</div>
            </li>

            <input id="yd" type="hidden" value="3" />
            <input id="wd" type="hidden" value="1" />
          </ul>
        </div>
        <div class="pages" style="margin-top: 40px;">
          <ul class="pagination"></ul>
        </div>
      </div>
      <input id="status" type="hidden" />
      <div class="prompt-box">
        <div class="prompt">
          <div class="prompt-text">你是否确定删除此条消息？</div>
          <div class="prompt-btn">
            <a href="javascript:void(0)" class="prompt-yes">确认</a>
            <a href="javascript:void(0)" class="prompt-cancel">取消</a>
          </div>
        </div>
      </div>

      <!-- content end -->
      <div class="msg-layer" :style="model == 2 ? 'z-index: 9999;left: 50%;display: block' : 'left: 50%;display: none;'">
        <i class="close" @click="model = 0"></i>
        <div class="msg-title">
          <h2 class="h5 detailTitle">{{ news_selected.title }}</h2>
        </div>
        <div class="msg-content">
          <p class="detailContent" v-html="news_selected.content"><span>江山</span><br /></p>
        </div>
      </div>
      <div class="mask-bg" :style="model == 2 ? 'display: block' : 'display: none;'"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 1,
      activeIndexb: 0,
      news: [],
      al_news: [],
      all_news: [],
      un_news: [],
      news_label: 'all',
      model: 1,
      news_selected: {}
    }
  },
  created() {
    let _this = this
    //我的消息
    this.$axios
      .post('/api/stu/queryMyNews', {
        stu_id: _this.$store.state.stu_id
      })
      .then((resp) => {
        let data = resp.data
        _this.news = data
        _this.al_news = []
        _this.all_news = data
        _this.un_news = []
        data.map((item) => {
          if (item.tf_read == 2) {
            _this.un_news.push(item)
          } else {
            _this.al_news.push(item)
          }
        })
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
    change_news_label(label) {
      this.news_label = label
      if (label == 'al') {
        this.news = this.al_news
      } else if (label == 'un') {
        this.news = this.un_news
      } else {
        this.news = this.all_news
      }
    },
    //查看消息
    view_news(item) {
      let _this = this
      this.model = 2
      this.news_selected = item
      if (item.tf_read == 1) {
        return
      }
      this.$axios
        .post('/api/stu/readMyNews', {
          student_information_id: item.student_information_id,
          tf_read: 1
        })
        .then((resp) => {
          let data = resp.data
          if (data == 1) {
            this.$axios
              .post('/api/stu/queryMyNews', {
                stu_id: _this.$store.state.stu_id
              })
              .then((resp) => {
                let data = resp.data
                _this.news = data
                _this.al_news = []
                _this.all_news = data
                _this.un_news = []
                data.map((item) => {
                  if (item.tf_read == 2) {
                    _this.un_news.push(item)
                  } else {
                    _this.al_news.push(item)
                  }
                })
              })
              .catch((err) => {
                _this.$message.error({
                  type: 'info',
                  message: '服务器错误',
                  // position: 'bottom-left',
                  duration: '2000'
                })
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
<style scoped>
.user-main .contents .types li {
  font-size: 14px;
  float: left;
  margin-left: 10px;
  padding: 10px;
  text-align: center;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.msg-layer {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: #fff;
  border: 1px solid #ddd;
  width: 760px;
  height: 360px;
  padding: 20px;
  margin-left: -400px;
  margin-top: -200px;
  z-index: 100;
}
.msg-layer .msg-title {
  margin-bottom: 15px;
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dddddd;
}
.msg-layer .msg-title .h5 {
  font-size: 18px;
  font-size: 1.8rem;
  margin: 0;
}
.mask-bg {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000);
  z-index: 999;
}
.msg-layer .msg-content {
  width: 96%;
  height: 320px;
  padding: 0 2%;
  overflow: hidden;
  overflow-y: auto;
}
.msg-layer .msg-content p {
  line-height: 1.7;
  font-size: 14px;
  font-size: 1.4rem;
  word-break: break-all;
}
.msg-layer .close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  background-image: url(../../../assets/images/jiang/close.png);
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 9;
  opacity: 1;
}
html body .content-right .types li.xz,
html body .content-right .types li:hover {
  color: #0af;
}
.user-main .contents .types ul {
  overflow: hidden;
}
.message-content .message-list ul li .msg-content {
  position: relative;
  padding: 10px 150px 10px 0;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.message-content .message-list ul li {
  padding: 10px 15px;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
}
.message-content .message-list ul li .h6 {
  font-size: 16px;
  margin: 0;
}
.user-main .contents {
  position: relative;
  margin: 20px 0 10px;
  background-color: #ffffff;
}
.message-content .message-list ul li .btnMenu {
  display: none;
}
.message-content .message-list ul li:hover {
  background-color: #fafafa;
}
.message-content .message-list ul li:hover .btnMenu {
  display: block;
}

.message-content .message-list ul li .msg-content a.btn {
  position: absolute;
  top: 30px;
  right: 10px;
}
.btn.btn-sm,
input.btn-sm {
  padding: 7px 17px;
  font-size: 12px;
  font-size: 1.2rem;
  line-height: 1;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
</style>
