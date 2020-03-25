<template>
  <div class="class-list">
    <div>
      <div style="width: 66.66%;margin:0 auto;">
        <div class="head">
          <h1>全部课程包</h1>
          <div class="search">
            <input type="text" id="classPackageName" @keyup.13="inita(1)" v-model="search_cp_name" placeholder="输入课程包名称" />
            <i class="iconfont" id="searchBtn" @click="inita(1)"></i>
          </div>
        </div>
        <div class="nav-list">
          <div class="nav-left">
            <label>一级分类：</label>
            <ul>
              <li>
                <span @click="activeA('')" :class="activeIndexa == '' ? 'active' : ''">全部</span>
              </li>
              <li v-for="(nav, i) in projects" :key="i">
                <span @click="activeA(nav.pse_id)" :class="activeIndexa === nav.pse_id ? 'active' : ''">{{ nav.pse_name }}</span>
              </li>
            </ul>
          </div>
          <div class="nav-right">
            <ol>
              <li v-for="(hot, i) in ['最新', '最热']" :key="i">
                <div class="hot" @click="activeB(i)" :class="activeIndexb === i ? 'active' : ''">
                  <span class="class-checked"></span>
                  <span>{{ hot }}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div class="content">
          <article class="content-box" v-for="(item, i) in kcbs" :key="i" @click="goDetail(item.course_package_id)">
            <!-- <img src="http://image.yunduoketang.com/course/34270/20190829/e2386465-dc91-433b-b505-39362d1cb02e.png" alt="" /> -->
            <img :src="item.cover" alt="" />
            <div class="detail">
              <h2>{{ item.cp_name }}</h2>
              <div class="people-price">
                <span class="people"><i class="iconfont"></i>{{ item.buying_base_number }}</span>
                <span class="price">￥{{ item.total_price }}</span>
              </div>
            </div>
          </article>
          <!-- 填充空格 -->
          <article class="content-box" style="opacity: 0;cursor: default;" v-for="(num, index) in fillNumber" :key="index + 100000"></article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndexa: 0, //学科id
      activeIndexb: 0, //最热（最新）
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      model: 0,
      value2: '',
      //学科数组
      projects: [],
      //搜索课程包名称
      search_cp_name: '',
      //课程包数组
      kcbs: [],
      fillNumber: 0 // 填充空余数据让列表按序排序
    }
  },
  created() {
    let _this = this
    //获取所有学科
    this.$axios
      .get('/api/pse/queryAllProjectInfo', '')
      .then((resp) => {
        if (resp.status == 200) {
          this.projects = resp.data
          this.inita()
        } else {
          _this.$message.error({
            type: 'info',
            message: '学科内容获取失败' + resp.status,
            // position: 'bottom-left',
            duration: '2000'
          })
        }
      })
      .catch(() => {
        _this.$message.error({
          type: 'info',
          message: '服务器错误',
          // position: 'bottom-left',
          duration: '2000'
        })
      })
  },
  methods: {
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
      this.inita()
    },
    activeB(num) {
      this.activeIndexb = num
      this.inita()
    },
    //查询课程包
    inita(num) {
      let _this = this
      let obj = {}
      if (num == undefined) {
        //不搜索课程包名称
        if (this.activeIndexa == '') {
          //学科按全部来搜索
          obj = {
            paixu: _this.activeIndexb
          }
        } else {
          //学科按单个来搜索
          obj = {
            project_id: _this.activeIndexa,
            paixu: _this.activeIndexb
          }
        }
      } else {
        //搜索课程包名称
        obj = {
          cp_name: _this.search_cp_name
        }
      }
      this.$axios
        .post('/api/stu/Discovery/queryCoursePackage', obj)
        .then((resp) => {
          if (resp.status == 200) {
            _this.kcbs = resp.data
            if (_this.kcbs.length % 4 === 1) {
              this.fillNumber = 3
            } else if (_this.kcbs.length % 4 === 2) {
              this.fillNumber = 2
            } else if (_this.kcbs.length % 4 === 3) {
              this.fillNumber = 1
            } else if (_this.kcbs.length % 4 === 0) {
              this.fillNumber = 0
            }
          } else {
            _this.$message.error({
              type: 'info',
              message: '获取课程包内容失败' + resp.status,
              duration: '2000'
            })
          }
        })
        .catch(() => {
          _this.$message.error({
            type: 'info',
            message: '服务器错误',
            // position: 'bottom-left',
            duration: '2000'
          })
        })
    },
    goDetail(course_package_id) {
      this.$router.push({
        name: 'classDetail',
        query: {
          course_package_id: course_package_id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.class-list {
  .head {
    height: 62px;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 16px;
      color: #403b38;
      line-height: 62px;
      background: url('../../assets/images/class/titleBg.png') no-repeat 0 32px;
    }
    .search {
      width: 240px;
      height: 28px;
      position: relative;
      border: 1px #e5e5e5 solid;
      border-radius: 5px;
      padding-bottom: 1px;
      input {
        width: 100%;
        height: 26px;
        padding: 0 24px 0 10px;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
      }
      i {
        display: block;
        height: 23px;
        position: absolute;
        right: 6px;
        bottom: 0px;
        cursor: pointer;
      }
    }
  }
  .nav-list {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    .nav-left {
      width: 83.33%;
      label {
        margin: 0;
        color: #999999;
        font-size: 14px;
        white-space: nowrap;
        float: left;
      }
      ul {
        float: left;
        display: flex;
        justify-content: flex-start;
        li {
          margin-right: 5px;
          cursor: pointer;
          span {
            padding: 3px 8px;
            color: #807f7f;
            font-size: 14px;
            white-space: nowrap;
          }
          span.active {
            background: #2c97ea;
            color: #fff;
            border-radius: 5px;
          }
        }
      }
    }
    .nav-right {
      width: 16.66%;
      ol {
        display: flex;
        justify-content: space-around;
        li .hot {
          font-size: 14px;
          color: #747474;
          cursor: pointer;
          span {
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
            margin-right: 5px;
          }
          .class-checked {
            background: url('../../assets/images/class/checkFalse.png') no-repeat 0 0;
            background-size: cover;
            width: 12px;
            height: 12px;
          }
        }
        li .active {
          color: #268ae3;
          .class-checked {
            background: url('../../assets/images/class/checkTrue.png') no-repeat 0 0;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
    min-height: 200px;
    .content-box {
      width: 23%;
      cursor: pointer;
      box-shadow: 0px 2px 12px 2px #ccc;
      border-radius: 4px;
      margin-bottom: 20px;
      img {
        width: 100%;
      }
      .detail {
        box-sizing: border-box;
        padding: 7px;
        h2 {
          color: #403b38;
          line-height: 18px;
          padding-bottom: 8px;
          border-bottom: 2px #f5f5f5 solid;
          margin-bottom: 13px;
        }
        h2::before {
          content: '精品';
          width: 25px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          padding: 1px 2px;
          background-color: #e83027;
          font-size: 12px;
          color: #fff;
          margin-right: 10px;
        }
        .people-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .people {
            font-size: 12px;
            color: #acb0b7;
          }
          .price {
            color: #e95229;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
