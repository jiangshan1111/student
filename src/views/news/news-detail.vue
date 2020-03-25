<template>
  <div class="news-detail">
    <main>
      <div class="inner article clearfix">
        <div style="margin-bottom:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-back" plain circle @click="$router.go(-1)"></el-button>
        </div>
        <article class="fl news-content">
          <h1>{{ news.news_title }}</h1>
          <p>
            <time class="time">{{ news.create_time | formatDate }}</time>
            <i class="look"></i>
            <span class="people">{{ news.visit_num }}</span>
          </p>
          <div class="content" v-html="news.news_content"></div>
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
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      news: {},
      hotNews: []
    }
  },
  created() {
    let newid = this.$route.query.newid
    axios({
      method: 'post',
      url: '/api/stu/newInfo/oneArticles',
      data: JSON.stringify({
        news_id: newid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      this.news = res.data
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
    // 点击进入详情页
    goDetail(item) {
      axios({
        method: 'post',
        url: '/api/stu/newInfo/oneArticles',
        data: JSON.stringify({
          news_id: item.news_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.news = res.data
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
.news-detail {
  min-width: 1361px;
  padding-top: 50px;
  main,
  header,
  main .inner {
    width: 1300px;
    margin: 0 auto;
  }
  main .article {
    .news-content {
      width: 64%;
      h1 {
        font-size: 36px;
        line-height: 56px;
        color: #14191e;
      }
      .look {
        display: inline-block;
        width: 19px;
        height: 12px;
        background: url('../../assets/images/news/look.jpg') no-repeat 0 0;
        vertical-align: middle;
        margin-left: 14px;
        margin-right: 3px;
      }
      .people,
      .time {
        font-size: 12px;
        color: #90989e;
        vertical-align: middle;
      }
      .content {
        width: 100%;
        text-align: center;
        padding-top: 26px;
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
        }
        h5:hover {
          text-decoration: underline;
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
}
</style>
