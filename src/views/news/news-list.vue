<template>
  <div class="news">
    <header>
      <img src="@/assets/images/news/banner.png" alt="" />
    </header>
    <main>
      <div class="inner all-btn">
        <button :class="activeBtn === 0 ? 'active' : ''" @click="switchArticle(0, '全部分类')">全部类别</button>
        <button :class="activeBtn === i + 1 ? 'active' : ''" @click="switchArticle(i + 1, '其他', btn.public_id)" v-for="(btn, i) in typeBtnList" :key="i">{{ btn.public_name }}</button>
      </div>
      <div class="inner img-list clearfix">
        <div class="fl fl-box" style="cursor: pointer;" v-if="recommended.length" @click="goDetail(recommended[0])">
          <img v-if="recommended[0].news_cover.indexOf('http://') === -1" src="@/assets/images/news/1.png" alt="" />
          <img v-else :src="recommended[0].news_cover" alt="" />
          <p class="desc">{{ recommended[0].news_title }}</p>
        </div>
        <div class="fr fr-box">
          <ul>
            <li>
              <div style="cursor: pointer;" @click="goDetail(rec)" v-for="(rec, index) in recommended" :key="index" :style="index === 0 ? 'display:none' : ''">
                <img v-if="rec.news_cover.indexOf('http://') !== -1" :src="rec.news_cover" alt="" />
                <img v-else src="@/assets/images/news/2.png" alt="" />
                <p class="desc">{{ rec.news_title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="inner article clearfix">
        <article class="fl newest-article">
          <h4>最新文章</h4>
          <div class="newest-article-inner clearfix" v-for="(news, newsi) in newNews" @click="goDetail(news)" :key="newsi">
            <img v-if="news.news_cover.indexOf('http://') === -1" src="@/assets/images/news/2.png" alt="" class="fl new-img" />
            <img v-else :src="news.news_cover" alt="" class="fl new-img" />
            <div class="fl new-desc">
              <h3>{{ news.news_title }}</h3>
              <p>
                <i class="look"></i>
                <span class="people">{{ news.visit_num }}</span>
                <time class="time">{{ news.create_time | formatDate }}</time>
              </p>
            </div>
          </div>
          <div v-if="noData" class="noData" style="text-align: center;color: #ccc;">
            <p style="font-size: 26px;font-weight: 900;">没有啦!</p>
          </div>
        </article>
        <article class="fr hot-article">
          <h4>最热文章</h4>
          <div>
            <ul>
              <li class="hot-article-inner" v-for="(hot, hoti) in hotNews" :key="hoti">
                <h5 @click="goDetail(hot)">{{ hot.news_title }}</h5>
                <p>
                  <i class="look"></i>
                  <span class="people">{{ hot.visit_num }}</span>
                  <time class="time">{{ hot.create_time | formatDate }}</time>
                </p>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="inner moreBtn">
        <button @click="more">点击加载更多</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      typeBtnList: [], // 导航分类按钮
      activeBtn: 0, // 导航分类按钮索引
      hotNews: [], // 热门文章
      newNews: [], // 最新文章
      recommended: [], // 推荐文章
      pageStart: 0, // 分页索引
      endNum: 5, // 分页数量
      nowtypebtnId: '', // 保存当前点击的按钮id
      noData: false // 是否到底
    }
  },
  created() {
    // 初始化文章
    this.initArticle(this.pageStart)
    // 获取分类按钮
    axios({
      method: 'post',
      url: '/api/stu/newInfo/leibie',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.typeBtnList = res.data
    })
    // 热门文章
    axios({
      method: 'post',
      url: '/api/stu/newInfo/hotArticles',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.hotNews = res.data
    })
  },
  methods: {
    // 点击按钮切换文章
    switchArticle(i, type, id) {
      if (this.activeBtn === i) return
      this.activeBtn = i
      this.pageStart = 0
      this.endNum = 5
      this.newNews = []
      this.recommended = []
      this.noData = false
      if (type === '全部分类') {
        this.nowtypebtnId = ''
        this.initArticle(this.pageStart)
      } else {
        this.nowtypebtnId = id
        this.initArticle(this.pageStart, id)
      }
    },
    //  最新文章 （分页）
    initArticle(start, id = '') {
      start = start * this.endNum
      axios({
        method: 'post',
        url: '/api/stu/newInfo/latestArticles',
        data: JSON.stringify({
          start: start,
          end: this.endNum,
          type_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data.length) {
          this.recommended = res.data.slice(0, 5)
          this.newNews = this.newNews.concat(res.data)
        } else {
          this.noData = true
        }
      })
    },
    // 加载更多
    more() {
      this.pageStart++
      this.initArticle(this.pageStart, this.nowtypebtnId)
    },
    // 点击进入详情页
    goDetail(item) {
      this.$router.push({
        path: '/news/newsdetail',
        query: {
          newid: item.news_id
        }
      })
    }
  },
  filters: {
    formatDate(date) {
      date = new Date(date)
      let format = 'yyyy-MM-dd'
      if (!date) return
      if (!format) format = 'yyyy-MM-dd'
      switch (typeof date) {
        case 'string':
          date = new Date(date.replace(/-/, '/'))
          break
        case 'number':
          date = new Date(date)
          break
      }
      if (!(date instanceof Date)) return
      var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ('' + (date.getMonth() + 101)).substr(1),
        dd: ('' + (date.getDate() + 100)).substr(1),
        HH: ('' + (date.getHours() + 100)).substr(1),
        mm: ('' + (date.getMinutes() + 100)).substr(1),
        ss: ('' + (date.getSeconds() + 100)).substr(1)
      }
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]]
      })
    }
  }
}
</script>

<style lang="scss">
.news {
  min-width: 1361px;
  .fr-box ul,
  main .img-list,
  header,
  main,
  header img {
    width: 100%;
  }
  main .inner {
    width: 1300px;
    margin: 0 auto;
  }
  main .all-btn {
    margin: 40px auto;
    button {
      width: 130px;
      height: 46px;
      line-height: 46px;
      font-size: 23px;
      text-align: center;
      border-radius: 5px;
      overflow: hidden;
    }
    .active {
      background-color: #2c98eb;
      color: #fff;
    }
  }
  main .img-list {
    height: 360px;
    margin-bottom: 50px;
    .fl,
    .fr {
      width: 49%;
      height: 100%;
    }
    .fl-box {
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .desc {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: rgba(#000000, 0.3);
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 22px;
        color: #fff;
        box-sizing: border-box;
        padding-left: 26px;
      }
    }
    .fr-box {
      ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      li {
        width: 100%;
        height: 360px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        & > div {
          width: 49%;
          height: 49%;
          position: relative;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .desc {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: rgba(#000000, 0.3);
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 16px;
          color: #fff;
          box-sizing: border-box;
          padding-left: 17px;
        }
      }
    }
  }
  main .article {
    .newest-article {
      width: 64%;
      h4 {
        width: 100%;
        height: 62px;
        line-height: 62px;
        font-size: 22px;
        color: #787879;
        border-bottom: 1px #b5b3b3 solid;
      }
      .newest-article-inner {
        width: 100%;
        height: 256px;
        border-bottom: 1px #dedede solid;
        box-sizing: border-box;
        padding: 30px 0 49px 0;
        cursor: pointer;
        &:hover .new-desc h3 {
          color: #0b85e3;
        }
        .new-img {
          width: 40%;
          height: 186px;
        }
        .new-desc {
          width: 60%;
          height: 186px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          padding-left: 22px;
          padding-right: 19px;
          h3 {
            font-size: 21px;
            color: #6d7275;
            line-height: 30px;
            font-weight: 500;
          }
          .look {
            display: inline-block;
            width: 19px;
            height: 12px;
            background: url('../../assets/images/news/look.jpg') no-repeat 0 0;
            margin-right: 10px;
            vertical-align: middle;
          }
          .people,
          .time {
            font-size: 12px;
            color: #90989e;
            vertical-align: middle;
          }
          .people {
            margin-right: 42px;
          }
        }
      }
    }
    .hot-article {
      width: 34%;
      h4 {
        width: 100%;
        height: 62px;
        line-height: 62px;
        font-size: 22px;
        color: #787879;
        border-bottom: 1px #b5b3b3 solid;
      }
      .hot-article-inner {
        width: 100%;
        height: 96px;
        border-bottom: 1px #ebeaed solid;
        box-sizing: border-box;
        padding: 26px 0 17px 0;
        h5 {
          font-size: 16px;
          line-height: 29px;
          color: #82888c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 7px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .look {
          display: inline-block;
          width: 19px;
          height: 12px;
          background: url('../../assets/images/news/look.jpg') no-repeat 0 0;
          margin-right: 10px;
          vertical-align: middle;
        }
        .people,
        .time {
          font-size: 12px;
          color: #90989e;
          vertical-align: middle;
        }
        .people {
          margin-right: 42px;
        }
      }
    }
  }
  main .moreBtn {
    text-align: center;
    button {
      width: 244px;
      height: 60px;
      line-height: 60px;
      border: 1px #c6c6c6 solid;
      font-size: 24px;
      font-weight: 500;
      color: #787879;
    }
    button:hover {
      border: 1px #000000 solid;
    }
    margin: 120px auto;
  }
}
</style>
