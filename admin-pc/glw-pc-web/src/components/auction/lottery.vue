<template>
    <div class="lottery-div">
      <img style="width: 100%;height: 100%" src="../../images/lottery_bg.png" alt="">
      <div class="lottery-div-content-one">
        <img src="../../images/lottery_div.png" alt="">
        <div class="lottery-div-content-child">
          <p style="text-align: center;font-size: 18px;color: #FFFFFF;line-height:35px;font-weight: bolder">一 等 奖</p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 40px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
          <img style="width: 10px;position: absolute;bottom: -20px;left: 40px;z-index: 99" src="../../images/lottery_line.png" alt="">
          <img style="width: 10px;position: absolute;bottom: -20px;right: 40px;z-index: 99" src="../../images/lottery_line.png" alt="">
        </div>
      </div>
      <div class="lottery-div-content-two">
        <img src="../../images/lottery_div.png" alt="">
        <div class="lottery-div-content-child">
          <p style="text-align: center;font-size: 18px;color: #FFFFFF;line-height:35px;font-weight: bolder">二 等 奖</p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 15px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 15px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
          <img style="width: 10px;position: absolute;bottom: -20px;left: 40px;z-index: 99" src="../../images/lottery_line.png" alt="">
          <img style="width: 10px;position: absolute;bottom: -20px;right: 40px;z-index: 99" src="../../images/lottery_line.png" alt="">
        </div>
      </div>
      <div class="lottery-div-content-three">
        <img src="../../images/lottery_div.png" alt="">
        <div class="lottery-div-content-child">
          <p style="text-align: center;font-size: 18px;color: #FFFFFF;line-height:35px;font-weight: bolder">三 等 奖</p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 6px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 6px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
          <p style="color: #ff022c;font-size: 24px;font-weight: bolder;margin-top: 6px;display: flex;justify-content: space-around">
            <span style="display: inline-block">刘建江</span>
            <span style="display: inline-block;color: #333333">138****6550</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "lottery"
    }
</script>

<style scoped>
  .lottery-div{
    width: 556px;
    height: auto;
    margin: 0 auto;
    position: relative;
  }
  .lottery-div>img{
    object-fit: cover;
    width:100%;
    height: 100%;
  }
  .lottery-div-content-one{
    position: absolute;
    top: 370px;
  }
  .lottery-div-content-one>img{
    width: 100%;
  }
  .lottery-div-content-child{
    width: 100%;
    height: 100%;
    padding: 5px 20px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .lottery-div-content-two{
    position: absolute;
    top: 557px;
  }
  .lottery-div-content-two>img{
    width: 100%;
  }
  .lottery-div-content-three{
    position: absolute;
    top: 742px;
  }
  .lottery-div-content-three>img{
    width: 100%;
  }
</style>
