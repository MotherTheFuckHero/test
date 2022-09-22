<template>
  <div class="box">
    <a  @click="img1click()" style="width: 100%;height:100%"><img :src="img1" /></a>
  </div>
</template>

<script>
  export default {
    name: '',
    created () {
    },
    data () {
      return {
        img1: '../../../static/img/machine/jh.png',
      };
    },
    methods: {
      img1click(){
        var docElm = document.documentElement;
        docElm.webkitRequestFullScreen();
        this.$router.push({
          path: '/jhResidenceDetail',
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
   padding: 0;
   background: #0DDFFE;
   overflow: hidden;
 }
 .box img{
   height:100%;
   width: 100%;
 }
 .box a{
   height:100%;
 }
</style>
<style>
  html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
