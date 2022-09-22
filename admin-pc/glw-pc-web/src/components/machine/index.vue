<template>
  <div class="box">
    <div class="one">
     <a  @click="img1click(1)" style="width: 23.5%;"><img :src="img1" /></a>
     <a @click="img1click(2)"style="width: 23.5%;margin:0 1% 0 2%;"><img :src="img2" /></a>
     <a @click="img1click(3)" style="width: 23.5%;margin:0 2%  0 1%;"><img :src="img3" /></a>
     <a @click="img1click(4)" style="width: 23.5%;"><img  :src="img4" /></a>
    </div>
    <div class="two">
      <img  @click="img1click(5)" style="width: 17%;" :src="img5" />
      <img @click="img1click(6)" style="width: 17%;margin:0 3%;" :src="img6" />
      <img @click="img1click(13)" style="width: 22%;" :src="imger" />
      <img @click="img1click(7)" style="width: 17%;margin:0 3%;" :src="img7" />
      <img @click="img1click(8)" style="width: 17%;" :src="img8" />
    </div>
    <div class="three">
      <img @click="img1click(9)" style="width: 23.5%;" :src="img9" />
      <img @click="img1click(10)" style="width: 23.5%;margin:0 1% 0 2%" :src="img10" />
      <img @click="img1click(11)" style="width: 49%;margin-left: 1%" :src="img11" />
    </div>
    <div class="four">
      <img @click="img1click(12)" :src="img12" />
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    created () {
    },
    data () {
      return {
        img1: '../../../static/img/machine/1.jpg',
        img2: '../../../static/img/machine/2.jpg',
        img3: '../../../static/img/machine/3.jpg',
        img4: '../../../static/img/machine/4.jpg',
        img5: '../../../static/img/machine/5.jpg',
        img6: '../../../static/img/machine/6.jpg',
        img7: '../../../static/img/machine/7.png',
        img8: '../../../static/img/machine/8.jpg',
        imger: '../../../static/img/machine/er.jpg',
        img9: '../../../static/img/machine/9.png',
        img10: '../../../static/img/machine/10.jpg',
        img11: '../../../static/img/machine/11.jpg',
        img12: '../../../static/img/machine/12.png',
      };
    },
    methods: {
      img1click(e){
        var docElm = document.documentElement;
        docElm.webkitRequestFullScreen();
        this.$router.push({
          path: '/machineDetail',
          query: {merchant: e}
        });
      }
    }
  }
</script>

<style scoped>

 .box{
   height: 100%;
   width: 100%;
   margin: 0;
   padding:0.5% 1%;
   background: #0DDFFE;
   display: flex;
   flex-wrap:wrap;
   align-items: center;justify-content: center;
 }
 .box img{
   height:100%;
   width: 100%;
 }
 .box a{
   height:100%;
 }
  .one{
    width: 100%;
    height: 18%;
    flex-basis:100%;
    display: flex;
    margin: 0.5% 0;
    align-items: center;justify-content: center;
  }

  .two{
    width: 100%;
    height: 38%;
    flex-basis:100%;
    display: flex;
    margin: 0.5% 0;
    align-items: center;justify-content: center;
  }
  .three{
    width: 100%;
    height: 18%;
    flex-basis:100%;
    display: flex;
    margin: 0.5% 0;
    align-items: center;justify-content: center;
  }
  .four{
    width: 100%;
    height: 18%;
    flex-basis:100%;
    display: flex;
    margin: 0.5% 0;
    align-items: center;justify-content: center;
  }
  .four img{
    width: 100%;
    height: 100%;
  }
</style>
<style>
  html,body,#app{
    height: 100%;
  }
</style>
