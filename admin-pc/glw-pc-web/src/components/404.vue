<template>
  <div>
    <div class="pay-container">
       <img src="../images/404.png" alt="">
       <p>您访问的页面消失了</p>
      <span>
        <button @click="gohome" style="width: 169px;height: 50px;background: #ABACC4;border-radius: 25px;color: #FFFFFF;">返回首页</button>
        <button @click="loding" style="width: 169px;height: 50px;border: 1px solid #ABACC4;border-radius: 25px;color: #ABACC4;">刷新页面</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  methods:{
    gohome(){
      this.$router.push('/');
    },
    loding(){
      location.reload()
    }
  }
};
</script>

<style scoped>
.pay-container {
  width: 100%;
  margin:100px auto 50px;
  text-align: center;
}
.pay-container img{
  width: 800px;
}
.pay-container p{
  height: 100px;
  font-size: 20px;
  font-weight: bold;
  color: #ABACC4;
  line-height: 100px;
}
.pay-container span{
  font-size: 20px;
}
.pay-container span button{
  border: none;
  outline: none;
  margin: 0  80px;
}
</style>
