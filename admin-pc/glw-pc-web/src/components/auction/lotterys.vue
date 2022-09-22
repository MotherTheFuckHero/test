<template>
    <div class="lottery-div">
      <img src="../../images/newy.png" />
      <div class="nav">
       <div class="nav_on">
        <img style="height: 85%;" src="../../images/liu.png"/>
         <h1 style="height: 10%;">刘建江</h1>
       </div>
        <div class="nav_on">
          <img style="height: 85%;" src="../../images/liu.png"/>
          <h1 style="height: 10%;">刘建江</h1>
        </div>
        <div class="nav_on">
          <img style="height: 85%;" src="../../images/liu.png"/>
          <h1 style="height: 10%;">刘建江</h1>
        </div>
        <div class="nav_on">
          <img style="height: 85%;" src="../../images/liu.png"/>
          <h1 style="height: 10%;">刘建江</h1>
        </div>
        <div class="nav_on">
          <img style="height: 85%;" src="../../images/liu.png"/>
          <h1 style="height: 10%;">刘建江</h1>
        </div>
        <div class="nav_on">
          <img style="height: 85%;" src="../../images/liu.png"/>
          <h1 style="height: 10%;">刘建江</h1>
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
    width: 100%;
    height: auto;
    margin: 0 auto;
    position: relative;
  }
  .lottery-div>img{
    width: 100%;
    position: absolute;
    top:0;
    z-index: 11;
  }
.nav{
  position: absolute;
  top:390px;
  z-index: 22;
  width: 100%;
  height: auto;
  text-align: center;
  margin: 0 auto;
  padding-left: 18%;
}
.nav_on{
  width: 20%;
  height: 280px;
  margin: 20px 3%;
  background: #FFFFFF;
  text-align: center;
  float: left;
}
</style>
