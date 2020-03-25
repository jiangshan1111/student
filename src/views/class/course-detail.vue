<template>
  <div v-cloak>
    <div class="w" style="overflow: visible;">
      <div class="top-tit">
        <ul class="top-titU">
          <li><a href="./search_classes.html">全部课程</a> \</li>
          <li class="titSelect">{{ course_info.course_name }}</li>
        </ul>
      </div>
      <input id="packageFlag" type="hidden" value="buy" />
      <div class="top-con clear">
        <div
          class="top-conL fl"
          data-ctid="780395"
          data-ctbf="true"
          data-cpbf="buy"
          data-ct="ClassType [name=2019技术实务, typeCode=CLASS_TYPE_NOMAL, originalPrice=2960.0, realPrice=2960.0, schoolsId=, itemOneId=128040, itemSecondId=254487, description=2019年技术实务课程, publishStatus=CLASS_ON_SALE, publishTime=Mon Nov 11 19:29:10 CST 2019, isSale=1, cover=course/34270/20190829/fc99c3bc-bb0d-45f2-a7a7-0570a357d0eb.png, subTitle=null, detailDesc=%3Cp%3E%3Cstrong%3E%3Cimg%20alt=%22%22%20src=%22http://image.yunduoketang.com/editor/34270/20190902/df619236-84d2-4ec3-bc17-965bfe4d3506.png%22%20style=%22height:5669px;%20width:2268px%22%20/%3E%E5%94%AE%E5%90%8E%E7%94%B5%E8%AF%9D%EF%BC%9A010-60703671%3C/strong%3E%3C/p%3E%0A, createTime=Wed May 29 21:45:41 CST 2019, creator=43761, updateTime=Wed Nov 20 08:48:25 CST 2019, updator=43979, delFlag=0, companyId=34270, baseNum=6532, lableType=null, teacherId=90968, faceFlag=0,liveFlag=1,videoFlag=1,remoteFlag=0]"
          data-oneitem="注册消防工程师"
          data-protocolconfig
          data-protocolid="2631"
          data-courseprotocolused
          data-agree
        >
          <p class="topconL-n" :style="'background-image: url(' + course_info.cover + ')'"></p>
        </div>
        <dl class="top-conC fl">
          <dt class="coursename">
            <span class="codezhi">
              {{ course_info.course_name }}
              <span class="code-box">
                <i class="iconfont"></i>
              </span>
            </span>
          </dt>
          <dd class="detmod">
            <p class="fl detmodP" id="otherFalg" mark="0" data-live="1" data-face="0" data-video="1" data-meet="0">
              <span>教学模式 :</span>
              <span>{{ course_info.course_type }}</span>
            </p>
            <p class="fl detmodP">
              <span>学习人数 :</span>
              <span>{{ course_info.rs }}</span>
            </p>

            <div class="fl">
              <p class="detmodP">
                <span>课程有效期至 :</span>
                <span>{{ course_info.effictive_date }}</span>
              </p>
            </div>
          </dd>

          <dd class="detpri checkout-date" v-if="state == 1">
            <p class="detmodP">
              <span class="monred">已购买</span>
            </p>
          </dd>
          <dd class="stuProgress clear" v-if="state == 1">
            <div class="joinstudy fl continue-study none" style="display: none;">
              <button class="btn">继续学习</button>
            </div>

            <div class="progress fl">
              <div class="exp-txt">
                <span class="exp-per">{{ rate.zongshu == 0 || rate.zongshu == undefined ? '0' : Math.floor((rate.yixuexi / rate.zongshu) * 100) }}%</span>
                <span class="exp-time">
                  共学习
                  <i>{{ rate.yixuexi }}</i
                  >节
                </span>
              </div>
              <div class="exp-bar">
                <span class="progress-inner" :style="'width:' + Math.floor((rate.yixuexi / rate.zongshu) * 100) + '%'"></span>
              </div>
            </div>
          </dd>

          <dd class="detpri" v-if="state == 2">
            <p class="detmodP">
              <span class="monred">￥{{ course_info.special_price }}</span>
              <!--V6.7 添加隐藏定价，isHideOriginalPrice=1，则隐藏定价-->

              <s class="monlast">￥{{ course_info.price }}</s>
            </p>
          </dd>
          <dd class="stuProgress clear" v-if="state == 2">
            <!--V6.7 如果售卖类型为不对外售卖，则购买课程改为 联系客服购买并不可以点击   未登录-->

            <div class="joinstudy fl">
              <button class="btn" @click="goOrder">点击购买</button>
            </div>
          </dd>
        </dl>
        <div class="top-conR fr clear top-detail-right">
          <span class="collect top-conRL fl">
            <em
              class="iconfont"
              style="    margin-right: 8px;
                        color: #f76565;
                        cursor: pointer;"
              @click="change_status(course_info.collection_status)"
              >{{ course_info.collection_status == 1 ? '' : '' }}</em
            >
            <i
              style="    display: inline-block;
                               width: 44px;
                               text-align: center;"
              class="word"
              >{{ course_info.collection_status == 1 ? '已收藏' : '收藏' }}</i
            >
            <i class="collect-value">{{ course_info.shoucangrs }}</i>
          </span>
          <div class="top-conRR fl">
            <div class="hoverbox">
              <i class="iconfont"></i>
              <span class="sharen">分享</span>
              <div class="sharebox clear">
                <p class="shaboxp sharebox1 fl weixin-icon"></p>
                <p class="shaboxp sharebox2 fl qq-icon"></p>
                <p class="shaboxp sharebox3 fr weibo-icon"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w main clear">
      <!-- leftstart-->
      <div class="left left-conti left-content div-content">
        <ul class="tab-menu tab-menuConti">
          <li @click="activeA(0)" :class="activeIndexa == 0 ? 'detail active' : 'detail'" mark="detail">课程介绍</li>

          <li @click="activeA(1)" :class="activeIndexa == 1 ? 'live_flag active' : 'live_flag'" mark="live">直播目录</li>

          <li @click="activeA(2)" :class="activeIndexa == 2 ? 'video_flag active' : 'video_flag'" mark="video">录播目录</li>

          <li @click="activeA(3)" :class="activeIndexa == 3 ? 'pinlun active' : 'pinlun'" mark="pinlun">评论</li>

          <li @click="activeA(4)" v-if="state == 2" :class="activeIndexa == 4 ? 'wenda active' : 'wenda'" mark="wenda">问答</li>

          <li @click="activeA(5)" v-if="state == 2" :class="activeIndexa == 5 ? 'detail active' : 'detail'" mark="classRe">课程资料</li>
        </ul>

        <div style="clear: both;"></div>
        <!-- 课程介绍-->
        <div class="introduce detailComentss" v-show="activeIndexa == 0" id="courseDetailContents" style="display: none;" v-html="course_info.details"></div>
        <!-- 直播目录-->
        <div class="live live_contents div-live" v-show="activeIndexa == 1" style="display: block;">
          <div v-for="(item, index) in units" :key="index">
            <div class="new-title clear">
              <p>{{ item.cu_name }}</p>
              <i class="iconfont up" @click="change_unit_edit(item)">{{ item.edit == false ? '' : '' }}</i>
            </div>
            <div class="live-cont" v-if="item.edit == true">
              <ol id="course_366777">
                <div class="live-cont">
                  <ol id="todaycourse_366777">
                    <li
                      class="clear livestudy"
                      v-for="(item1, index1) in item.section"
                      :key="index1"
                      provide="ht"
                      name="2018年实务精讲第一轮-第一讲"
                      stime="19:00"
                      etime="22:00"
                      data-url="null"
                      data-id="188994"
                      data-status="2"
                      data-free="0"
                    >
                      <div class="fl number">{{ index1 + 1 }}</div>
                      <div class="fl live-course">
                        <p>{{ item1.ct_name }}</p>
                        <p class="start-time">
                          <span class>{{ item1.ct_pattern }}</span>
                          <span class="time">
                            {{ getNowFormatDate(new Date(item1.begin_class_date)).split(' ')[0] }}&nbsp;&nbsp;{{
                              new Date(item1.begin_class_date).getDay() == 0
                                ? '周日'
                                : new Date(item1.begin_class_date).getDay() == 1
                                ? '周一'
                                : new Date(item1.begin_class_date).getDay() == 2
                                ? '周二'
                                : new Date(item1.begin_class_date).getDay() == 3
                                ? '周三'
                                : new Date(item1.begin_class_date).getDay() == 4
                                ? '周四'
                                : new Date(item1.begin_class_date).getDay() == 5
                                ? '周五'
                                : '周六'
                            }}&nbsp;&nbsp;{{ getNowFormatDate(new Date(item1.begin_class_date)).split(' ')[1] + '-' + getNowFormatDate(new Date(item1.end_time_datess)).split(' ')[1] }}
                          </span>
                          <span class="teacher">{{ item1.user_name }}</span>
                        </p>
                      </div>
                      <div class="fr handle-course"></div>
                    </li>
                  </ol>
                </div>
              </ol>
            </div>
          </div>
        </div>
        <!-- 录播目录-->
        <div class="L-content content video" v-show="activeIndexa == 2" id="videoContents" style="display: block;">
          <div class="chapter" v-for="(item, index) in chapters" :key="index">
            <a href="javascript:void(0);" class="chapter-btitle" ids="2309877" cid="780395" mid="796999">
              <span class="clear word" style="width: 94%">
                <i class="chapter-bicon"></i>
                <i class="chapterNew" title="第一科：" style="width: 94%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">第一科：19年第二轮直播回放</i>
              </span>
              <i class="sub-icon iconfont" @click="change_edit(item)">{{ item.edit == false ? '' : '' }}</i>
            </a>
            <ul v-if="item.edit == true" class="chapter-stitle chapter_lecContent2309877" style="height: auto;">
              <li style="position: relative" class="studylecture" v-for="(item1, index1) in item.section" :key="index1" chapterid="796999" lecid="3153585" coursetype="0" freeflag="2">
                <a href="javascript:checkVideo(796999,3153585,0,2,2309877);">
                  <span :title="item1.section_name" class="left L-left no">
                    <em class="iconfont L-ivedio"></em>
                    {{ item1.section_name }}
                  </span>
                  <span class="right">
                    <i class="time">00:50:17</i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 评论-->
        <div class="comment stu_comments" v-show="activeIndexa == 3" style="display: block;">
          <div class="comment-frame" style="display:block" v-show="pl_label == true">
            <div class="textarea-wrap">
              <textarea name id="stuCourseComments" v-model="answer_content" @keyup="key_content" placeholder="这输入对课程的评论"></textarea>
              <span class="num">{{ answer_content.length }}/120</span>
            </div>
            <div class="block-bottom clear">
              <div class="relComment clear">
                <ul class="relcomList fl clear" style="width:70%;">
                  <li class="fl">
                    <em>课程评分</em>
                    <el-rate style="float:right" v-model="value1"></el-rate>
                  </li>
                </ul>
                <div class="fr relchoArea">
                  <span>
                    <input type="checkbox" v-model="tf_anonymous" id="checHideUser" />
                    <label for="checHideUser">匿名发布</label>
                  </span>

                  <button class="publish" style="padding:0" @click="submit_pl()">发布</button>
                  <button class="delete" style="padding:0" @click="pl_label = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <button class="button-btn" v-if="state == 2" v-show="pl_label == false" @click="pl_label = true">发布评论</button>
          <ul class="allcomment" id="commentContents">
            <li class="row clear" v-for="(item, index) in pingluns" :key="index" style="margin:0">
              <div class="head" data-uid="2754058" data-hideuser="0">
                <img src="@/assets/images/jiang/teachers.png" alt width="100%" height="100%" />
              </div>

              <div class="cnt">
                <div class="word">
                  <span>{{ item.stu_name }}：</span>
                  {{ item.content }}
                </div>
                <div class="foot">
                  <span>{{ getNowFormatDate(new Date(item.creation_time)) }}</span>
                  <span>源自{{ item.ct_name }}</span>
                  <span>
                    <i class="noChose">
                      <i :class="item.score >= 10 ? 'nochoseStar' : ''"></i>
                    </i>
                    <i class="noChose">
                      <i :class="item.score >= 20 ? 'nochoseStar' : ''"></i>
                    </i>
                    <i class="noChose">
                      <i :class="item.score >= 30 ? 'nochoseStar' : ''"></i>
                    </i>
                    <i class="noChose">
                      <i :class="item.score >= 40 ? 'nochoseStar' : ''"></i>
                    </i>
                    <i class="noChose">
                      <i :class="item.score >= 50 ? 'nochoseStar' : ''"></i>
                    </i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <!-- <div class="pages paginationcomment">
                        <li class="disabled prev"><a>上一页</a></li>
                        <li class="active"><a>1</a></li>
                        <li><a href="javascript:void(0)">2</a></li>
                        <li><a href="javascript:void(0)">3</a></li>
                        <li><a href="javascript:void(0)">4</a></li>
                        <li><a href="javascript:void(0)">5</a></li>
                        <li><a href="javascript:void(0)">6</a></li>
                        <li><a href="javascript:void(0)">7</a></li>
                        <li><a href="javascript:void(0)">8</a></li><span>...</span>
                        <li><a href="javascript:void(0)">14</a></li>
                        <li class="next"><a href="javascript:void(0)">下一页</a></li>
                        <li><span>共84条</span></li>
          </div>-->
        </div>
        <!-- 课程资料-->
        <div class="class-data classRe" v-show="activeIndexa == 5" id="classReList" style="display: block;">
          <div class="data-label">
            <button @click="activeC('')" :class="activeIndexc == '' ? 'choice active' : 'choice'">全部</button>
            <button @click="activeC('其他')" :class="activeIndexc == '其他' ? 'choice active' : 'choice'" type="COURSE_RESOURCE_OTHER">其他</button>
            <button @click="activeC('教辅')" :class="activeIndexc == '教辅' ? 'choice active' : 'choice'" type="COURSE_RESOURCE_SUPPLY">教辅</button>
            <button @click="activeC('教材')" :class="activeIndexc == '教材' ? 'choice active' : 'choice'" type="COURSE_RESOURCE_TEACHING">教材</button>
          </div>

          <div class="data-title" v-if="ziliaos.length > 0">
            <ul class="clear">
              <li class="data1">资料名称</li>
              <li class="data2">文件大小</li>
              <li class="data3">上传时间</li>
              <li class="data4">下载资料</li>
              <!-- <li class="data4">下载/浏览 资料</li> -->
            </ul>
          </div>
          <div class="data-list">
            <ul>
              <li v-for="(item, index) in ziliaos" :key="index">
                <ul class="clear">
                  <li class="data1">
                    <img :src="item.suffix_type == 'pdf' ? './image/pdf.png' : item.suffix_type == 'zip' ? './image/zip.png' : './image/word.png'" />
                    {{ item.fileName }}
                  </li>
                  <li class="data2 fs12">{{ item.c_recourses_size }}</li>
                  <li class="data3 fs12">{{ getNowFormatDate(new Date(item.create_time)) }}</li>
                  <li class="data4 load">
                    <i class="iconfont downLoad" data-ids="265774"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="pages">
            <!-- <ul class="paginationZL">
                            <li class="disabled prev"><a>上一页</a></li>
                            <li class="active"><a>1</a></li>
                            <li><a href="javascript:void(0)">2</a></li>
                            <li><a href="javascript:void(0)">3</a></li>
                            <li><a href="javascript:void(0)">4</a></li>
                            <li><a href="javascript:void(0)">5</a></li>
                            <li><a href="javascript:void(0)">6</a></li>
                            <li><a href="javascript:void(0)">7</a></li>
                            <li><a href="javascript:void(0)">8</a></li><span>...</span>
                            <li><a href="javascript:void(0)">17</a></li>
                            <li class="next"><a href="javascript:void(0)">下一页</a></li>
                            <li><span>共100条</span></li>
            </ul>-->
          </div>
        </div>
        <!-- 问答-->
        <div class="ask clear" v-show="activeIndexa == 4" style="display: block;">
          <button class="button-btn" v-show="answer_label == false" @click="answer_label = true">我要提问</button>
          <div class="inner">
            <div class="inner-top" style="display: block" v-show="answer_label == true">
              <div class="title">
                <span class="label">标题：</span>
                <input type="text" v-model="answer_title" id="q-title" class="frame" placeholder="请输入问题标题" maxlength="20" />
                <p class="pro">
                  <span class="hid-pro title-hint" style="display: none;"> <i class="iconfont"></i>标题不能少于5-20个字符！ </span>
                </p>
              </div>
              <div class="sub">
                <span class="label">内容：</span>
                <div class="cont-wrap" style="width:99%;margin:0 0 10px 0">
                  <textarea id="editor_id" style="width:100%;height:300px;"></textarea>
                </div>
              </div>
              <div class="button-box">
                <button class="sub" @click="submit_answer()">发布</button>
                <button class="delete" @click="answer_label = false">取消</button>
              </div>
            </div>
            <div class="inner-botton">
              <h1>
                <span class="selcont active" data-types="0">全部问答</span>
                <!-- <span class="selcont" data-types="1">精华问答</span> -->
              </h1>
              <div class="all-answer" style>
                <div class="r-answer" v-for="(item, index) in answers" :key="index">
                  <div class="row clear">
                    <div class="r-left" data-uid="2188865">
                      <img class="headpic" :src="item.head" width="40" height="40" alt />

                      <p>{{ item.publisher }}</p>
                    </div>
                    <div class="r-middle">
                      <h2 class="clear">
                        <i class="iconfont nofinish"></i>

                        <a href="javascript:void(0)" @click="goAnswer(item)" v-html="item.title == null ? item.content : item.title">每个疏散门宽度计算？</a>
                      </h2>
                      <div class="cont-answer">
                        <i class="iconfont"></i>

                        <span class="replysign new">[最新答案]</span>

                        <span class="user" style="padding:0;">
                          <i>{{ item.daan == undefined ? '' : item.daan[0].publisher }}老师：</i>
                        </span>
                        <span v-html="item.daan == undefined ? '' : item.daan[0].content"></span>
                      </div>
                      <div class="foot">
                        <em>提问时间：{{ getNowFormatDate(new Date(item.creation_time)) }}</em>

                        <em>最后回答：{{ JSON.stringify(item.daan) == '[{}]' ? '' : getNowFormatDate(new Date(item.daan[0].creation_time)) }}</em>
                      </div>
                    </div>
                    <div class="r-right">
                      <span class="static-item">
                        <b class="val">{{ item.visit_num }}</b>
                        <span class="key">浏览</span>
                      </span>

                      <span class="static-item answer">
                        <b class="val">1</b>
                        <span class="key">回答</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- leftend-->
      <!-- rightstart-->
      <div class="right right-conti">
        <div class="teacher">
          <div class="title-wrap clear">
            <span class="title" style="margin-top: 0px;">名师</span>
            <!-- <span class="page"><i class="now">1</i><i class="split-line">/</i><i class="page-num">2</i><img
                                src="./image/jiantou_01.png" class="prev" alt=""><img src="./image/jiantou_02.png"
            class="next" alt=""></span>-->
          </div>
          <div class="wrap-box clear" style="width: 246px;">
            <div class="teacher-introduce-wrap">
              <div class="teacher-introduce">
                <div v-for="(item, index) in teachers" :key="index" @click="go_teacher(item)">
                  <div class="name clear" data-id="89730">
                    <span class="headpic">
                      <img class="goDetails" data-id="89730" :src="item.head" alt width="100%" height="100%" />
                    </span>
                    <span class="goDetails" data-id="89730">{{ item.true_name }}</span>
                  </div>
                  <p class="content" v-html="item.introduction"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--rightend-->
    </div>
    <div class="w footer" id="recommendCourse">
      <div class="else-course elsejoin-course">其他课程推荐</div>
      <ul class="content clear courserecommend">
        <li ids="911091">
          <div class="img-box">
            <div class="img" style="overflow: hidden; height: 124px; width: 220px; margin: 0px;">
              <img src="http://image.yunduoketang.com/course/34270/20190829/11c506e7-d6f2-47c6-831c-9d19fa0b5c13.png" alt width="100%" height="100%" />
            </div>
          </div>
          <a href="/sysConfigItem/selectDetail/911091" class="title">消防工程师精品试听课</a>
          <a href="javascript:;" class="teacher clear">
            <span class="name"></span>
            <span class="people">
              <i class="iconfont"></i>
              <span>13166</span>
            </span>
          </a>
        </li>
        <li ids="795658">
          <div class="img-box">
            <div class="img" style="overflow: hidden; height: 124px; width: 220px; margin: 0px;">
              <img src="http://image.yunduoketang.com/course/34270/20190829/fc99c3bc-bb0d-45f2-a7a7-0570a357d0eb.png" alt width="100%" height="100%" />
            </div>
          </div>
          <a href="/sysConfigItem/selectDetail/795658" class="title">2019技术实务</a>
          <a href="javascript:;" class="teacher clear">
            <span class="name">
              <i>主讲：</i>
              <span>朱磊老师</span>
            </span>
            <span class="people">
              <i class="iconfont"></i>
              <span>6533</span>
            </span>
          </a>
        </li>
        <li ids="795659">
          <div class="img-box">
            <div class="img" style="height: 124px; width: 220px; margin: 0px; overflow: hidden;">
              <img src="http://image.yunduoketang.com/course/34270/20190829/9f4581be-428d-4c15-a559-585f2aa89a4c.png" alt width="100%" height="100%" />
            </div>
          </div>
          <a href="/sysConfigItem/selectDetail/795659" class="title">2019综合能力</a>
          <a href="javascript:;" class="teacher clear">
            <span class="name">
              <i>主讲：</i>
              <span>张旭东老师</span>
            </span>
            <span class="people">
              <i class="iconfont"></i>
              <span>6533</span>
            </span>
          </a>
        </li>
        <li ids="795661">
          <div class="img-box">
            <div class="img">
              <img src="http://image.yunduoketang.com/course/34270/20190829/df1e3234-5ac5-4c51-8378-c88c3480b8d9.png" alt width="100%" height="100%" />
            </div>
          </div>
          <a href="/sysConfigItem/selectDetail/795661" class="title">2019案例分析</a>
          <a href="javascript:;" class="teacher clear">
            <span class="name">
              <i>主讲：</i>
              <span>紫陌老师</span>
            </span>
            <span class="people">
              <i class="iconfont"></i>
              <span>6532</span>
            </span>
          </a>
        </li>
        <li ids="735157">
          <div class="img-box">
            <div class="img">
              <img src="http://image.yunduoketang.com/course/34270/20190829/11c506e7-d6f2-47c6-831c-9d19fa0b5c13.png" alt width="100%" height="100%" />
            </div>
          </div>
          <a href="/sysConfigItem/selectDetail/735157" class="title">《技术实务》体验课-朱磊...</a>
          <a href="javascript:;" class="teacher clear">
            <span class="name">
              <i>主讲：</i>
              <span>朱磊老师</span>
            </span>
            <span class="people">
              <i class="iconfont"></i>
              <span>4832</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      activeIndexa: 0,
      activeIndexb: 0,
      activeIndexc: '',
      pagesize: 10, //    每页的数据
      model: 0,
      teachers: [],
      value1: 0,
      stu_id: 0,
      state: 2,
      tf_anonymous: false,
      value2: '',
      chapters: [],
      units: [],
      pingluns: [],
      ziliaos: [],
      answers: [],
      answer_content: '',
      answer_title: '',
      copy_ziliaos: [],
      pl_label: false,
      answer_label: false,
      rate: {},
      course_info: {}
    }
  },
  created() {
    let _this = this
    this.stu_id = this.$store.state.stu_id
    // KindEditor.ready(function(K) {
    //   window.editor = K.create('#editor_id', {
    //     items: [
    //       'source',
    //       '|',
    //       'undo',
    //       'redo',
    //       '|',
    //       'preview',
    //       'bold',
    //       'italic',
    //       'strikethrough',
    //       'table',
    //       'justifyleft',
    //       'justifycenter',
    //       'justifyright',
    //       'justifyfull',
    //       'insertorderedlist',
    //       'insertunorderedlist'
    //     ]
    //   })
    // })
    //获取名师
    this.$axios
      .post('/api/stu/home/FamousTeacher', {})
      .then((resp) => {
        if (resp.status == 200) {
          this.teachers = resp.data
        } else {
          _this.$message.error({
            type: 'info',
            message: '请求名师内容错误',
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
    let obj = {}
    if (_this.stu_id != 0 && _this.stu_id != undefined) {
      //判断是否登录
      obj = {
        course_id: this.$route.query.course_id,
        stu_id: _this.stu_id
      }
      //如果登录获取学习进度
      this.$axios
        .post('/api/stu/Discovery/queryStudentLerning', {
          course_id: this.$route.query.course_id,
          stu_id: _this.stu_id
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.rate = resp.data
          } else {
            _this.$message.error({
              type: 'info',
              message: '请求学习进度失败',
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
      obj = {
        course_id: this.$route.query.course_id
      }
    }
    //获取课程内容
    this.$axios
      .post('/api/stu/Discovery/queryCourse', obj)
      .then((resp) => {
        if (resp.status == 200) {
          _this.course_info = resp.data[0]
          _this.state = resp.data[0].state
          if (_this.course_info.effictive_days_type == '有效天数') {
            _this.course_info.effictive_date = _this.getNowFormatDate(new Date(new Date(_this.course_info.create_time).getTime() + _this.course_info.effictive_days * 24 * 3600 * 1000))
          }
        } else {
          _this.$message.error({
            type: 'info',
            message: '获取课程内容失败',
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
  methods: {
    goOrder() {
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
      this.$axios
        .post('/api/order/pay', {
          CPC_id: this.$route.query.course_id,
          stu_id: _this.stu_id,
          tf_course: '课程',
          order_resource: 'PC端'
        })
        .then((resp) => {
          if (resp.status == 200) {
            _this.$store.commit('order_update', {
              data: resp.data.data,
              type: '课程',
              obj: _this.course_info
            })
            _this.$router.push('/order')
          } else {
            _this.$message.error({
              type: 'info',
              message: '生成订单失败',
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
    change_status(tf_collection) {
      let _this = this
      if (_this.stu_id == 0 || _this.stu_id == undefined) {
        _this.$message.error({
          type: 'info',
          message: '请先登录',
          duration: '2000'
        })
        return
      }
      this.$axios
        .post('/api/stu/Discovery/collectionCourseStu', {
          course_id: this.$route.query.course_id,
          stu_id: _this.stu_id,
          collection_status: tf_collection == 1 ? 2 : 1
        })
        .then((resp) => {
          if (resp.status == 200) {
            _this.$message.success({
              type: 'info',
              message: tf_collection == 2 ? '收藏成功' : '取消收藏成功',
              duration: '2000'
            })
            _this.course_info.collection_status = tf_collection == 1 ? 2 : 1
          } else {
            _this.$message.error({
              type: 'info',
              message: '操作失败',
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
    submit_answer() {
      let _this = this
      if (_this.stu_id == 0 || _this.stu_id == undefined) {
        _this.$message.error({
          type: 'info',
          message: '请先登录',
          duration: '2000'
        })
        return
      }
      // editor.sync()
      // html = document.getElementById('editor_id').value // 原生API
      // // html = K('#editor_id').val(); // KindEditor Node API
      // html = $('#editor_id').val() // jQuery
      let obj = {
        subject_id: _this.course_info.subject_id,
        course_id: this.$route.query.course_id,
        fid: 0,
        // content: html,
        st_state: 1,
        project_id: _this.course_info.project_id,
        publisher: _this.stu_id,
        title: _this.answer_title
      }
      this.$axios
        .post('/api/stu/Discovery/insertCourseQuestions', obj)
        .then((resp) => {
          if (resp.data == 1) {
            _this.$message.success({
              type: 'info',
              message: '添加问答成功',
              // position: 'bottom-left',
              duration: '2000'
            })
            _this.activeA(4)
            _this.answer_label = false
          } else {
            _this.$message.info({
              type: 'info',
              message: '添加问答失败',
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
    submit_pl() {
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
      let obj = {
        course_id: this.$route.query.course_id,
        score: _this.value1 * 10,
        teacher_id: _this.course_info.user_id,
        publisher: _this.stu_id,
        content: this.answer_content,
        tf_anonymous: _this.tf_anonymous == true ? 1 : 2
      }
      this.$axios
        .post('/api/stu/Discovery/insertCourseComment', obj)
        .then((resp) => {
          if (resp.data == 1) {
            _this.$message.success({
              type: 'info',
              message: '评论审核中',
              duration: '2000'
            })
          } else {
            _this.$message.info({
              type: 'info',
              message: '添加评论失败',
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
    key_content() {
      if (this.answer_content.length > 120) {
        this.answer_content = this.answer_content.substring(0, 120)
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
    change_unit_edit(item) {
      if (item.edit == false) {
        item.edit = true
      } else {
        item.edit = false
      }
    },
    change_edit(item) {
      if (item.edit == false) {
        item.edit = true
      } else {
        item.edit = false
      }
    },
    activeA(num) {
      let _this = this
      this.activeIndexa = num
      switch (_this.activeIndexa) {
        case 1:
          this.$axios
            .post('/api/stu/Discovery/queryCourseLive', {
              course_id: this.$route.query.course_id
            })
            .then((resp) => {
              let arr = []
              let obj = {}
              for (let i = 0; i < resp.data.length; i++) {
                if (!obj[resp.data[i].course_unit_id]) {
                  let obj1 = {
                    course_unit_id: resp.data[i].course_unit_id,
                    cu_name: resp.data[i].cu_name
                  }
                  arr.push(obj1)
                  obj[resp.data[i].course_unit_id] = true
                }
              }
              arr.map((item) => {
                item.edit = true
                item.section = []
                for (let i = 0; i < resp.data.length; i++) {
                  if (resp.data[i].course_unit_id == item.course_unit_id) {
                    item.section.push(resp.data[i])
                  }
                }
              })
              _this.units = arr
            })
            .catch((err) => {
              _this.$message.error({
                type: 'info',
                message: '服务器错误',
                duration: '2000'
              })
            })
          break
        case 2:
          this.$axios
            .post('/api/stu/Discovery/queryCourseREC', {
              course_id: this.$route.query.course_id
            })
            .then((resp) => {
              let arr = []
              let obj = {}
              for (let i = 0; i < resp.data.length; i++) {
                if (!obj[resp.data[i].chapter_id]) {
                  let obj1 = {
                    chapter_id: resp.data[i].chapter_id
                  }
                  arr.push(obj1)
                  obj[resp.data[i].chapter_id] = true
                }
              }
              arr.map((item) => {
                item.edit = true
                item.section = []
                for (let i = 0; i < resp.data.length; i++) {
                  if (resp.data[i].chapter_id == item.chapter_id) {
                    item.section.push(resp.data[i])
                  }
                }
              })
              _this.chapters = arr
            })
            .catch((err) => {
              _this.$message.error({
                type: 'info',
                message: '服务器错误',
                duration: '2000'
              })
            })
          break
        case 3:
          this.$axios
            .post('/api/stu/Discovery/queryCourseComment', {
              course_id: this.$route.query.course_id
            })
            .then((resp) => {
              _this.pingluns = resp.data
            })
            .catch((err) => {
              _this.$message.error({
                type: 'info',
                message: '服务器错误',
                duration: '2000'
              })
            })
          break
        case 4:
          this.$axios
            .post('/api/stu/Discovery/queryCourseQuestions', {
              course_id: this.$route.query.course_id
            })
            .then((resp) => {
              _this.answers = resp.data
            })
            .catch((err) => {
              _this.$message.error({
                type: 'info',
                message: '服务器错误',
                duration: '2000'
              })
            })
          break
        case 5:
          this.$axios
            .post('/api/stu/Discovery/queryCourseResData', {
              course_id: this.$route.query.course_id
            })
            .then((resp) => {
              _this.ziliaos = resp.data
              _this.copy_ziliaos = resp.data
            })
            .catch((err) => {
              _this.$message.error({
                type: 'info',
                message: '服务器错误',
                duration: '2000'
              })
            })
          break
        default:
          break
      }
    },
    activeB(num) {
      this.activeIndexb = num
    },
    go_teacher(item) {
      this.$store.commit('teacher/SAVETEACHER', item)
      this.$router.push('/teacher/teacherdetail')
    },
    //问答详情
    goAnswer(item) {
      console.log(item)
      this.$router.push({
        path: '/community/communitydetail',
        query: {
          questions_id: item.questions_id,
          course_type: item.course_type
        }
      })
    },
    activeC(num) {
      this.activeIndexc = num
      this.ziliaos = this.copy_ziliaos.filter((item) => {
        return item.c_recourses_type == num
      })
      if (num == '') {
        this.ziliaos = this.copy_ziliaos
      }
    }
  }
}
</script>

<style>
@import '../../assets/css/classDetail.css';
</style>
<style scoped>
/*
* @Author: baocheng
* @Date:   2017-02-20 13:55:47
* @Last Modified by:   baocheng
* @Last Modified time: 2017-09-25 11:29:33
*/

.top-tit {
  padding: 28px 0 24px 0;
}

.top-titU li {
  font-size: 12px;
  color: #333;
  line-height: 1;
  display: inline-block;
}

.top-titU .titSelect {
  color: #a1a1a1;
}
.top-con {
  position: relative;
}
.top-conL {
  width: 368px;
  height: 207px;
  padding: 4px;
  border: 1px solid #eee;
  border-radius: 3px;
}

.top-conC {
  margin-left: 36px;
  max-width: 550px;
}

.topconL-n {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  /* background: url('../../images/zhifu.png') no-repeat center; */
  background-size: cover;
  border-radius: 3px;
}

.coursename span {
  font-size: 28px;
  display: inline-block;
  line-height: 1;
  word-break: break-all;
}

.coursename .codezhi {
  font-weight: bold;
  color: #333;
}

.coursename i {
  font-size: 20px;
  position: relative;
  top: -5px;
  margin-left: 14px;
  color: #666;
}

.coursename i:hover {
  cursor: pointer;
}

.detmod {
  position: relative;
  padding-top: 16px;
}

.detmod .detmodP {
  /*display: inline-block;*/
  line-height: 1;
  color: #999;
  margin-right: 34px;
}
.detmod .detmodP em {
  color: #dd0000;
}
.detmod .detmodnew {
  margin-bottom: 10px;
}
/*.detmodP span {
    display: inline-block;
    line-height: 1;
    font-size: 12px;
    color: #999;
    margin-right: 11px;
}*/

.detpri {
  padding-top: 24px;
}

.detmodP .monred {
  display: inline-block;
  line-height: 1;
  color: #ee1207;
  font-size: 24px;
  margin-right: 11px;
  font-weight: bold;
}

.detmodP .monlast {
  display: inline-block;
  line-height: 1;
  color: #666666;
  font-size: 16px;
  margin-right: 11px;
}

.detmodP .baba {
  display: inline-block;
  line-height: 1;
  font-size: 12px;
  color: #999;
}

.vipmod .vipmodP {
  display: inline-block;
  line-height: 1;
  font-size: 12px;
}

.vipmod .vipmodPL {
  padding-left: 14px;
  padding-bottom: 10px;
}

.vipmod .vipmodP-img {
  width: 44px;
  height: 12px;
  /* background-image: url('../../images/vip_yellow.png'); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% auto;
  position: relative;
  top: 2px;
}

.vipmodP .vipmodP-per {
  color: #fcb326;
}

.vipmodP .vipmodP-mon {
  color: #999999;
}

.stuProgress {
  padding-top: 10px;
}

.stuProgress .joinstudy {
  margin-right: 25px;
}

.stuProgress .joinstudy .btn {
  display: block;
  width: 148px;
  height: 48px;
  padding: 0px;
  line-height: 48px;
  text-align: center;
  border: 0px;
  border-radius: 4px;
  color: #ffffff;
  background: #07bbee;
  font-size: 18px;
  margin-top: 20px;
}

.stuProgress .joinstudy .btn:hover {
  background-color: #01aadd;
}

/*V6.7 添加不可以点击购买的按钮   */
.stuProgress .joinstudy .disableBtn {
  background-color: #f3f3f3 !important;
  color: #999;
  cursor: default !important;
}
.stuProgress .joinstudy .disableBtn:hover {
  background-color: #f3f3f3;
}

.stuProgress .joinstudy-full .btn {
  background-color: #b5b9bc;
  cursor: default;
}

.stuProgress .joinstudy-full .btn:hover {
  background-color: #b5b9bc;
}

.stuProgress .progress {
  width: 350px;
  position: relative;
  top: 2px;
}
.progress {
  height: 20px;
  margin-bottom: inherit;
  overflow: inherit;
  /* line-height: 2; */
  background-color: inherit;
  border-radius: 0;
  -webkit-box-shadow: inherit;
  box-shadow: inherit;
}
s {
  text-decoration: line-through;
}
html body .detmodP .monred {
  color: #0af;
}
html body .progress .exp-txt .exp-per {
  color: #0af;
}
.stuProgress .exp-txt .exp-per {
  font-size: 18px;
  color: #ee1207;
  font-weight: normal;
}

.stuProgress .exp-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.stuProgress .progress-inner {
  background-color: #07bbee;
  border-radius: 5px;
}

.top-conR {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  color: #999;
}

.top-conR .top-conRR {
  padding-left: 25px;
}

.top-conR .conrimg {
  margin-right: 7px;
}

.top-conRL i {
  margin-right: 6px;
}

.top-conRL .iconfont {
  cursor: pointer;
  color: #bbb;
}

.top-conRL .ired {
  color: #d80a25;
}

.top-conRL .iconfont:hover {
  color: #d80a25;
}

.top-conRR {
  position: relative;
}

/*.top-conRR .conrimg {
    display: inline-block;
    width: 16px;
    height: 17px;
    background: url("../../images/share.png") no-repeat center;
    background-size: 100% auto;
    color: #cecece;
}*/

.top-conRR .iconfont {
  color: #bbb;
}

.top-conRR .sharen {
  display: inline-block;
  /*    position: relative;
        top: -3px;*/
}

.top-conRR .sharebox {
  width: 100px;
  height: 30px;
  padding: 5px 11px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  left: -12px;
  top: 4px;
  cursor: pointer;
  display: none;
}

.top-conRR .hoverbox {
  width: 100px;
  height: 50px;
}

.top-conRR .hoverbox:hover .sharebox {
  display: block;
}

.sharebox .shaboxp {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}

.top-conRR .sharebox1 {
  /* background-image: url(../../images/weixin-front.png); */
}

.top-conRR .sharebox2 {
  /* background-image: url(../../images/qq-front.png); */
  background-size: auto 100%;
  margin-left: 9px;
}

.top-conRR .sharebox3 {
  /* background-image: url(../../images/weibo-front.png); */
}

.code-box .code {
  position: absolute;
  left: -25px;
  top: 40px;
  width: 100px;
  padding: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/*约课记录开始*/
.abclassBox .abclassList li {
  margin-bottom: 12px;
}

.abclassList .abclassTit {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background-color: #f5f7f9;
}

.abclassList .abclassTit i {
  display: inline-block;
  width: 16px;
  height: 16px;
  /* background-image: url(../../../images/5.2/abclass_01.png); */
  background-repeat: no-repeat;
  background-position: 0 0;

  vertical-align: sub;
  margin-right: 6px;
}

.abclassList .abclassTit .drop {
  background-position: 0 -60px;
}
.abclassList .abclassTit strong {
  font-size: 16px;
  color: #666;
}

.abclassList .abclassRec {
  display: none;
}
.abclassList .abclassRec dd {
  height: 49px;
  line-height: 49px;
  padding-left: 47px;
  padding-right: 20px;
  font-size: 14px;
  color: #333;
}
.abclassList .abclassRec .hr {
  width: 100%;
  height: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid #f5f7f9;
}
.abclassRec dd .fr {
  font-size: 14px;
}
.abclassRec dd b {
  display: inline-block;
  width: 45px;
  margin-right: 45px;
  font-weight: normal;
}

.abclassRec dd em {
  margin-right: 45px;
}

.abclassRec dd a {
  display: inline-block;
  padding: 7px 9px;
  font-size: 12px;
  color: #fff;
  line-height: 1;
  background-color: #07bbee;
  text-decoration: none;
}
.abclassRec dd a:hover {
  background-color: #01aadd;
}

.abclassRec dd i {
  font-size: 20px;
  color: #07bbee;
  margin: 2px 22px;
  cursor: pointer;
}
/*约课记录结束*/

/*修改开始*/
/*.meta-n span {
    display: inline-block;
    line-height: 12px;
    margin-right: 10px;
}*/
.memberMore {
  position: relative;
}

.memberMore:hover .othermemBox {
  display: block;
}
.memberMore i {
  cursor: pointer;
  padding-bottom: 20px;
  padding-right: 20px;
}
.goldcol {
  color: #fcb200;
}
.memberMore .othermemBox {
  display: none;
  position: absolute;
  left: -51px;
  top: 26px;
  z-index: 2;
  width: 128px;
  padding: 7px 10px;
  border-radius: 2px;
  box-shadow: 0 2px 6px 2px rgba(221, 221, 221, 0.75);
  background-color: #fff;
}

.memberMore .othermemBox h4 {
  position: relative;
  font-size: 12px;
  color: #fcb200;
  padding: 5px 0 8px;
}

.othermemBox h4:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 16px;
  height: 2px;
  background-color: #fcb200;
}
.othermemBox .memberList {
  padding-top: 8px;
  font-size: 12px;
  line-height: 28px;
}

.othermemBox .memberList em {
  color: #666;
}

.othermemBox .memberList b {
  color: #999;
  font-weight: normal;
}
/*修改结束*/
.top-titU li a:hover {
  color: #07bbee;
}

/*ipad 样式*/
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .top-conC {
    width: 58%;
  }
  .top-conL {
    width: 34%;
  }
  .coursename .codezhi {
    width: 58%;
  }
  .left .content .chapter a.chapter-btitle span.word {
    width: 90% !important;
  }
  .left .content .chapter a.chapter-btitle span.word i.chapterNew {
    width: 90% !important;
  }
  .top-tit {
    padding: 28px 20px 24px 20px;
  }
}
.div-content {
  font-family: 'PingFang SC';
}
.div-content .new-title {
  margin-top: 20px;
  border-bottom: 1px solid #f0f3f6;
  padding-bottom: 10px;
}
.div-content .new-title p {
  float: left;
  width: 80%;
  font-size: 16px;
}
.div-content .new-title .iconfont {
  color: #93999f;
  font-size: 14px;
  float: right;
  margin: 5px 10px 0 0;
  cursor: pointer;
}
.div-content ol li {
  margin-left: 16px;
  padding: 10px 0;
  height: 46px;
  line-height: 23px;
  border-bottom: 1px solid #f0f3f6;
  font-size: 13px;
  cursor: pointer;
  box-sizing: content-box;
}
.div-content ol li:hover {
  background: -webkit-linear-gradient(left, rgba(240, 243, 246, 0.76), rgba(255, 255, 255, 0.76)); /* Safari 5.1 - 6 */
  background: -o-linear-gradient(right, rgba(240, 243, 246, 0.76), rgba(255, 255, 255, 0.76)); /* Opera 11.1 - 12*/
  background: -moz-linear-gradient(right, rgba(240, 243, 246, 0.76), rgba(255, 255, 255, 0.76)); /* Firefox 3.6 - 15*/
  background: linear-gradient(to right, rgba(240, 243, 246, 0.76), rgba(255, 255, 255, 0.76));
}
.div-content ol li .number {
  line-height: 25px;
  padding: 0 15px;
  font-size: 14px;
}
.div-content ol li .play {
  /*width: 16px;
  height: 16px;
  border-radius: 100%;
  background: #0099ff;
  line-height: 16px;*/
  cursor: pointer;
  padding: 0;
  margin: 0px 15px 0;
  background: inherit !important;
}
.div-content ol li .play .iconfont {
  color: #0099ff;
  display: inline-block;
}
.div-content ol li .live-course {
  margin-left: 0px;
}
.div-content ol li .live-course p {
  font-size: 14px;
  color: #333;
}
.div-content ol li .live-course p .live-free {
  display: inline-block;
  width: 44px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background: #0099ff;
  color: #fff;
  font-size: 12px;
  border-radius: 18px;
  border-bottom-right-radius: 0;
  font-style: normal;
  margin-right: 10px;
}
.div-content ol li .live-course .start-time {
  color: #93999f;
  margin-top: 1px;
  font-size: 12px;
}
.div-content ol li .live-course .start-time .live-now {
  color: #0099ff;
}
.div-content ol li .live-course .start-time .time {
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid #e0e0e0;
  display: inline-block;
  line-height: 14px;
}
/*添加教师  hxs 2019-08-20*/
.div-content ol li .live-course .start-time .teacher {
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid #e0e0e0;
  display: inline-block;
  line-height: 14px;
}
.div-content ol li .handle-course {
  margin-right: 10px;
}
.div-content ol li .handle-course a {
  color: #93999f;
  padding: 0 14px;
  border-right: 1px solid #e0e0e0;
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
}
.div-content ol li .handle-course a:last-child {
  padding-right: 0;
  border-right: 0;
}
.div-content ol li .handle-course a:hover,
.div-content ol li .handle-course a:visited,
.div-content ol li .handle-course a:focus {
  text-decoration: none;
}
.div-content .live_contents .live-cont .load-more {
  text-align: center;
  font-size: 12px;
  /*color: #93999f!important;*/
  line-height: 38px;
  cursor: pointer;
  padding: 0;
}
/*添加直播课程单元目录样式*/
.div-content .live_contents .live-cont .load-more-live {
  text-align: center;
  font-size: 12px;
  /*color: #93999f!important;*/
  line-height: 38px;
  cursor: pointer;
  padding: 0;
  color: #0af;
}
</style>
