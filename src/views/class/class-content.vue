<template>
  <div class="class-content">
    <div class="stage-curriculum">
      <article class="stage" v-for="(item, index) in child" :key="index">
        <div class="title" :class="item.edit ? 'border-none' : ''" @click="change_edit(index)">
          <h5>{{ item.stage_name }}</h5>
          <span class="toggleBtn"><img src="@/assets/images/class/bottombtn.png" :class="item.edit ? 'open' : ''" alt=""/></span>
        </div>
        <div class="stage-list" :style="!item.edit ? 'padding-top: 0' : ''">
          <transition name="draw">
            <ul v-if="item.edit">
              <li v-for="(item1, index1) in item.kcs" :key="index1">
                <div class="stage-img">
                  <img v-if="item1.cover.indexOf('http://') === -1" src="http://image.yunduoketang.com/course/34270/20190829/fc99c3bc-bb0d-45f2-a7a7-0570a357d0eb.png" alt="" width="100%" />
                  <img v-else :src="item1.cover" alt="" width="100%" />
                  <span>{{ item1.course_type == '直播,录播' ? '混合' : item1.course_type }}</span>
                </div>
                <div class="stage-detail">
                  <h6>{{ item1.course_name }}</h6>
                  <div class="money">
                    <b class="people"><i class="iconfont"></i>{{ item1.kechengrs }}</b>
                    <em class="price">￥{{ item1.special_price }}</em>
                  </div>
                </div>
              </li>
              <li style="opacity: 0;cursor: default;" v-for="(num, index) in item.fillNumber" :key="index + 100000"></li>
            </ul>
          </transition>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      child: []
    }
  },
  created() {
    this.child = this.jieduans.map((el) => {
      if (el.kcs.length % 3 === 1) {
        el.fillNumber = 2
      } else if (el.kcs.length % 3 === 2) {
        el.fillNumber = 1
      } else if (el.kcs.length % 3 === 0) {
        el.fillNumber = 0
      }
      return el
    })

    console.log(this.child)
  },
  props: {
    jieduans: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    change_edit(index) {
      let obj = {}
      obj = JSON.parse(JSON.stringify(this.child[index]))
      obj.edit = !obj.edit
      this.$set(this.child, index, obj)
    }
  }
}
</script>

<style lang="scss">
.class-content {
  .stage-curriculum {
    padding: 12px 0 0 23px;
    .stage {
      .title {
        position: relative;
        cursor: pointer;
      }
      .title h5 {
        line-height: 58px;
        height: 58px;
        font-size: 16px;
        color: #767c83;
        border-bottom: 1px #e5e5e5 solid;
      }
      .border-none h5 {
        border-bottom: none;
      }
      .title h5:before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 10px;
        background: #118ceb;
        margin-right: 8px;
      }
      .toggleBtn {
        cursor: pointer;
        display: inline-block;
        height: 20px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
        img {
          transition: all 1s ease;
        }
        img.open {
          transform: rotate(90deg);
        }
      }
    }
    .stage-list {
      overflow: hidden;
      padding-top: 32px;
      ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        position: relative;
        left: 0;
        top: 0;
      }
      li {
        width: 30%;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;
        cursor: pointer;
        .stage-img {
          position: relative;
          span {
            display: inline-block;
            width: 44px;
            height: 24px;
            line-height: 24px;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 13px;
            text-align: center;
            position: absolute;
            right: 10px;
            bottom: 8px;
          }
        }
        .stage-detail {
          padding: 9px 12px 0;
          box-sizing: border-box;
          h6 {
            line-height: 25px;
            padding-bottom: 12px;
            border-bottom: 1px #e5e5e5 solid;
            font-size: 16px;
            color: #403b38;
          }
          .money {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 21px 0;
            .people {
              font-size: 12px;
              color: #acb0b7;
            }
            .price {
              color: #979595;
              font-size: 16px;
            }
          }
        }
      }
      li:hover {
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 0 rgba(0, 0, 0, 0.3);
        transition-duration: 0.5s;
      }
    }
  }
  .draw-enter-active,
  .draw-leave-active {
    transition: all 0.5s;
  }
  .draw-enter,
  .draw-leave-to {
    opacity: 0;
    top: -600px !important;
  }
}
</style>
