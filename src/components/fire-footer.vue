<template>
  <div class="fire-footer" id="footerContents">
    <div style="width:83.33%;margin-left:8.33%;" class="clear">
      <div class="footer-left fl" style="width:50%;">
        <div class="centerbox">
          <p class="desc-detail">火种教育</p>
          <p class="desc-detail">服务热线：010-60703671 010-81705189 <br />服务时间：9：00 21：00</p>
          <p id="copyrightList">
            Copyright@2017&nbsp;北京智汇火种教育科技有限公司&nbsp;版权所有<br /><a class="footer_beian" href="http://www.beian.miit.gov.cn/" target="_blank">京ICP备16043550号-1</a>
          </p>
        </div>
      </div>
      <div class="footer-middle fl" style="width:16.66%;">
        <a href="http://ketang.huozhongedu.com/sysPageHeadFoot/showDetail/422013" target="_blank">关于我们</a
        ><a href="http://ketang.huozhongedu.com/sysPageHeadFoot/showDetail/422014" target="_blank">联系我们</a>
      </div>
      <div class="footer-right clear fr" style="width:33.33%;">
        <div>
          <div class="followMe">
            <p class="followText">在这里关注我们的动向</p>
            <p class="followIcon">
              <span id="tengxuns" style="cursor: pointer;display: none;">
                <i class="iconfont"></i>
              </span>
              <span id="wbUrl" style="">
                <i class="iconfont"></i>
              </span>
              <span id="txUrl" style="cursor: pointer;" class="weixin-logo">
                <i class="iconfont"></i>
              </span>
            </p>
          </div>
          <div class="followImg">
            <img class="img-responsive" src="http://image.yunduoketang.com/company/34270/20190829/a3fd3283-dfaa-44ad-9b6e-d01e56062338.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.fire-footer {
  background: #24252a;
  height: 194px;
  padding-top: 2.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 1360px;
  font-family: siyuanhei;
  .footer-left {
    .desc-detail {
      color: #e0e0e0;
      font-size: 20px;
    }
    #copyrightList {
      color: #a1a4b3;
      font-size: 12px;
    }
  }
  .footer-middle {
    border-left: 1px solid #46474c;
    border-right: 1px solid #46474c;
    display: flex;
    justify-content: space-around;
    a {
      display: inline-block;
      text-align: center;
      padding: 3px;
      font-size: 12px;
      color: #a1a4b3;
    }
  }
  .footer-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    .followMe,
    .followImg {
      display: inline-block;
      vertical-align: middle;
    }
    .followMe {
      p {
        color: rgb(153, 153, 153);
      }
      .followText {
        // margin-top: 3.3rem;
        margin-right: 16px;
      }
      .followIcon {
        span {
          margin-right: 10px;
          cursor: pointer;
        }
        i {
          font-size: 30px;
        }
      }
    }
    .followImg {
      width: 85px;
      height: 85px;
      img {
        width: 100%;
        display: inline-block;
      }
    }
  }
}
</style>
