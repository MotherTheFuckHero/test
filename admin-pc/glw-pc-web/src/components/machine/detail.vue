<template>
  <div class="box">
    <i-button style="position: fixed;top:20px;right:2%;z-index: 1111111111" icon="ios-arrow-back" type="success" shape="circle" @click="goindex">返回</i-button>
     <div class="home" v-if="this.merchant==1">
       <img style="width: 25%" :src="img1a" />
       <img style="width: 25%" :src="img1b" />
       <div class="right" id="scroll_right">
         <img  :src="img1c" />
         <img  :src="img1d" />
         <img  :src="img1e" />
         <img  :src="img1f" />
         <img  :src="img1g" />
         <img  :src="img1h" />
         <img  :src="img1i" />
       </div>
      </div>
      <div class="home" v-if="this.merchant==2">
        <img style="width: 25%" :src="img2a" />
        <img style="width: 25%" :src="img2b" />
        <div class="right" id="scroll_right">
          <img  :src="img2c" />
          <img  :src="img2d" />
          <img  :src="img2e" />
          <img  :src="img2f" />
          <img  :src="img2g" />
          <img  :src="img2h" />
          <img  :src="img2i" />
          <img  :src="img2j" />
          <img  :src="img2k" />
          <img  :src="img2l" />
        </div>
      </div>
      <div class="home" v-if="this.merchant==3">
        <img style="width: 25%" :src="img3a" />
        <img style="width: 25%" :src="img3b" />
        <div class="right" id="scroll_right">
          <img  :src="img3c" />
          <img  :src="img3d" />
        </div>
      </div>
      <div class="home" v-if="this.merchant==4">
        <img style="width: 25%" :src="img4a" />
        <img style="width: 25%" :src="img4b" />
        <div class="right" id="scroll_right">
          <img  :src="img4c" />
          <img  :src="img4d" />
        </div>
      </div>
      <div class="home" v-if="this.merchant==5">
        <img style="width: 25%" :src="img5a" />
        <img style="width: 25%" :src="img5b" />
        <div class="right" id="scroll_right">
          <img  :src="img5c" />
          <img  :src="img5d" />
          <img  :src="img5e" />
          <img  :src="img5f" />
        </div>
      </div>
    <div class="home" v-if="this.merchant==6">
        <img style="width: 25%" :src="img6a" />
        <img style="width: 25%" :src="img6b" />
        <div class="right" >
          <img  :src="img6c" />


        </div>
    </div>
    <div class="home" v-if="this.merchant==7">
      <img style="width: 25%" :src="img7a" />
      <img style="width: 25%" :src="img7b" />
      <div class="right" id="scroll_right">
        <img  :src="img7c" />
        <img  :src="img7d" />
      </div>
    </div>
    <div class="home" v-if="this.merchant==8">
      <img style="width: 25%" :src="img8a" />
      <img style="width: 25%" :src="img8b" />
      <div class="right" id="scroll_right">
        <img  :src="img8c" />
        <img  :src="img8d" />
        <img  :src="img8e" />
      </div>
    </div>

    <div class="home" v-if="this.merchant==9">
      <img style="width: 25%" :src="img9a" />
      <img style="width: 25%" :src="img9b" />
      <div class="right" id="scroll_right">
        <img  :src="img9c" />
        <img  :src="img9d" />
        <img  :src="img9e" />
        <img  :src="img9f" />
        <img  :src="img9g" />
        <img  :src="img9h" />
        <img  :src="img9i" />
        <img  :src="img9j" />
        <img  :src="img9k" />
        <img  :src="img9l" />
      </div>
    </div>

    <div class="home" v-if="this.merchant==10">
      <img style="width: 25%" :src="img10a" />
      <img style="width: 25%" :src="img10b" />
      <div class="right" >
        <img  :src="img10c" />
      </div>
    </div>
    <div class="home" v-if="this.merchant==11">
      <img style="width: 25%" :src="img11a" />
      <img style="width: 25%" :src="img11b" />
      <div class="right" id="scroll_right">
        <img  :src="img11c" />
        <img  :src="img11d" />
      </div>
    </div>
    <div class="home" v-if="this.merchant==12">
      <video   width="100%" height="100%" style="object-fit:fill;" autoplay loop="loop" >
        <source src="https://glw-public.oss-cn-beijing.aliyuncs.com/video/select-machine/%E5%96%B5%E5%BD%B1-%E6%88%91%E7%9A%84%E5%BD%B1%E7%89%87.mp4" type="video/mp4">
      </video>
    </div>
    <div class="home"  v-if="this.merchant==13" >
      <video   width="100%" height="100%" style="object-fit:fill;"  autoplay loop="loop" >
        <source src="https://glw-public.oss-cn-beijing.aliyuncs.com/video/select-machine/%E3%80%8A%E5%91%B3%E9%81%93%E3%80%8B20210211%E6%98%A5%E8%8A%82%E6%9C%89%E5%91%B3%E9%81%93%E4%B8%AD%E5%9B%BD%E5%B9%B4%E5%91%B3%C2%B7%E9%81%B5%E5%8C%96.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    created () {
      if(this.$route.query.merchant !=undefined){
        this.merchant=this.$route.query.merchant
      }
    },
    data () {
      return {
        merchant:'',
        timers:'',
        img1a: '../../../static/img/machine/1a.png',
        img1b: '../../../static/img/machine/1b.png',
        img1c: '../../../static/img/machine/1c.png',
        img1d: '../../../static/img/machine/1d.png',
        img1e: '../../../static/img/machine/1e.png',
        img1f: '../../../static/img/machine/1f.png',
        img1g: '../../../static/img/machine/1g.png',
        img1h: '../../../static/img/machine/1h.png',
        img1i: '../../../static/img/machine/1i.png',

        img2a:'../../../static/img/machine/2a.jpg',
        img2b:'../../../static/img/machine/2b.jpg',
        img2c: '../../../static/img/machine/2c.png',
        img2d: '../../../static/img/machine/2d.png',
        img2e: '../../../static/img/machine/2e.png',
        img2f: '../../../static/img/machine/2f.png',
        img2g: '../../../static/img/machine/2g.png',
        img2h: '../../../static/img/machine/2h.png',
        img2i: '../../../static/img/machine/2i.png',
        img2j: '../../../static/img/machine/2j.png',
        img2k: '../../../static/img/machine/2k.png',
        img2l: '../../../static/img/machine/2l.png',


        img3a: '../../../static/img/machine/3a.png',
        img3b: '../../../static/img/machine/3b.png',
        img3c: '../../../static/img/machine/3c.png',
        img3d: '../../../static/img/machine/3d.png',


        img4a: '../../../static/img/machine/4a.png',
        img4b: '../../../static/img/machine/4b.png',
        img4c: '../../../static/img/machine/4c.png',
        img4d: '../../../static/img/machine/4d.png',

        img5a: '../../../static/img/machine/5a.png',
        img5b: '../../../static/img/machine/5b.png',
        img5c: '../../../static/img/machine/5c.png',
        img5d: '../../../static/img/machine/5d.png',
        img5e: '../../../static/img/machine/5e.png',
        img5f: '../../../static/img/machine/5f.png',

        img6a: '../../../static/img/machine/6a.png',
        img6b: '../../../static/img/machine/6b.png',
        img6c: '../../../static/img/machine/6c.png',

        img7a: '../../../static/img/machine/7a.png',
        img7b: '../../../static/img/machine/7b.png',
        img7c: '../../../static/img/machine/7c.png',
        img7d: '../../../static/img/machine/7d.png',

        img8a: '../../../static/img/machine/8a.png',
        img8b: '../../../static/img/machine/8b.png',
        img8c: '../../../static/img/machine/8c.png',
        img8d: '../../../static/img/machine/8d.png',
        img8e: '../../../static/img/machine/8e.png',

        img9a: '../../../static/img/machine/9a.png',
        img9b: '../../../static/img/machine/9b.png',
        img9c: '../../../static/img/machine/9c.png',
        img9d: '../../../static/img/machine/9d.png',
        img9e: '../../../static/img/machine/9e.png',
        img9f: '../../../static/img/machine/9f.png',
        img9g: '../../../static/img/machine/9g.png',
        img9h: '../../../static/img/machine/9h.png',
        img9i: '../../../static/img/machine/9i.png',
        img9j: '../../../static/img/machine/9j.png',
        img9k: '../../../static/img/machine/9k.png',
        img9l: '../../../static/img/machine/9l.png',


        img10a: '../../../static/img/machine/10a.png',
        img10b: '../../../static/img/machine/10b.png',
        img10c: '../../../static/img/machine/10c.png',

        img11a: '../../../static/img/machine/11a.png',
        img11b: '../../../static/img/machine/11b.png',
        img11c: '../../../static/img/machine/11c.png',
        img11d: '../../../static/img/machine/11d.png',
      };
    },
    mounted () {
      this.autoSroll("scroll_right");
    },
    methods: {
      goindex(){
        var _this=this;
        clearInterval(_this.timers);
        this.$router.push({
          path: '/machine'
        });
      },
      autoSroll(Id) {
        // flag 为true时停止滚动
        var flag = false;
        // 定时器
        var _this=this;
        function roll() {
          var h = -1;
          _this.timers = setInterval(function() {
            flag = true;
            //获取当前滚动条高度
            var current = document.getElementById(Id).scrollTop;
            if (current == h) {
              //滚动到底端,返回顶端
              h = 0;
              document.getElementById(Id).scrollTop = h + 1;
            } else {
              //以25ms/3.5px的速度滚动
              h = current;
              document.getElementById(Id).scrollTop = h + 1;
            }
          }, 50);
        }
        // setTimeout(function() {
        //滚动区域内单击鼠标 滚动暂停 再次点击鼠标 继续滚动
        document.getElementById(Id).onclick = () => {
          console.log("点击了", _this.timers, flag);
          if (flag) {
            flag = false;
            clearInterval(_this.timers);
          } else {
            roll();
          }
        };
        roll();
        // }, 2000);
      },
    }
  };
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
}
.home{
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
/*video{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
.right{
  width: 50%;
  overflow-y:scroll
}
.right img{
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar{
  display:none
}
</style>
<style>
  html,body,#app{
    height: 100%;
  }
</style>
