<template>
  <div class="box">
    <i-button style="position: fixed;top:20px;right:2%;z-index: 1111111111" icon="ios-arrow-back" type="success" shape="circle" @click="goindex">返回</i-button>
    <div class="home"   >
      <video   width="100%" height="100%" style="object-fit:fill;"  autoplay loop="loop" >
        <source src="//mp4.vjshi.com/2022-07-28/551bfbe32901494bbed9e960ac39f625.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
      };
    },
    methods: {
      goindex(){
        this.$router.push({
          path: '/jhResidence'
        });
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
