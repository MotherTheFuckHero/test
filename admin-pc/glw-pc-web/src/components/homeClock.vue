<template>
  <div class="meClocker">
    <div class="txt-price" v-if="price>0">秒杀价{{$t("operate.Money")}}<span style="color:#FC405E;font-weight: bold;font-size: 25px;">{{price}}</span></div>
    <div class="txt-price" v-else>100+人疯抢中</div>
    <div class="run-time" v-if="timeobj.hours || timeobj.minutes || timeobj.seconds">
      <span class="timing" v-if="timeobj.days">{{timeobj.days + '天'}}</span>
      <span class="timing">{{timeobj.hours | add0}}</span>
      <span class="flag-time">:</span>
      <span class="timing">{{timeobj.minutes | add0}}</span>
      <span class="flag-time">:</span>
      <span class="timing">{{timeobj.seconds | add0}}</span>
    </div>
    <div class="txt-time">{{msg}}</div>
  </div>
</template>
<script>
  export default {
    name: 'home-clock',
    inject:['reload'],
    data() {
      return {
        clocker: "", //显示倒计时
        timeobj: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        msg: '',
        price:''
      };
    },
    filters: {
      add0: function (num) {
        return num < 10 ? "0" + num : num;
      }
    },
    props: ["endTime","secKillStatus",'prices'],
    methods:{
      timeStatus(){
        clearInterval(this.go);
        this.price=this.prices
        if(this.secKillStatus==1){
          this.msg = '距结束';
        }else if(this.secKillStatus==2){
          this.msg = '距开始';
        }else {
          this.msg = '暂无秒杀';
        }
        var endTime = this.endTime
        let timeFunction = () => {
          let leftTime = endTime--
            if (leftTime >= 0) {
            this.timeobj = {
              days: Math.floor(leftTime  / 60 / 60 / 24),
              hours: Math.floor(leftTime  / 60 / 60 % 24),
              minutes: Math.floor(leftTime  / 60 % 60),
              seconds: Math.floor(leftTime  % 60)
            };
          } else {
            this.msg = "已结束";
            this.reload();
            clearInterval(go);
          }
        };
        timeFunction();
        let go = setInterval(function () {
          timeFunction();
        }, 1000);
      }
    },
    created() {
      this.timeStatus()
    }
  };
</script>
<style scoped>
  .meClocker{
    align-items:center;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-size: 20px;
    margin: 20px 0;
    line-height: 40px;
  }
  .run-time{
    float: right;
  }
  .txt-time{
    float: right;
  }
  .txt-price{
    float: left;
  }
  .timing{
    color:#FC405E;
    font-weight: bold;
  }

</style>
