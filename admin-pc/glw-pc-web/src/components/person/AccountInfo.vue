<template>
    <div class="account-container">
      <h2>账号管理</h2>
      <div class="account-body">
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_phone.png" style="width: 48px;height: 64px">
          <p>手机号</p>
          <Button>修改手机号</Button>
        </div>
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_pc.png" style="width: 70px;height: 62px">
          <p>登录密码</p>
          <Button>修改登录密码</Button>
        </div>
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_card.png" style="width: 75px;height: 60px">
          <p>支付密码</p>
          <Button>设置支付密码</Button>
        </div>
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_youxiang.png" style="width: 72px;height: 62px">
          <p>邮箱</p>
          <Button>绑定邮箱</Button>
        </div>
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_baohu.png" style="width: 56px;height: 66px">
          <p>登陆保护</p>
          <Button>实名认证</Button>
        </div>
        <div class="account-model">
          <img alt="" src="../../images/guanli_icon_wenti.png" style="width: 72px;height: 72px">
          <p>密保问题</p>
          <Button>密保问题</Button>
        </div>
        <div class="account-model">
        </div>
        <div class="account-model">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AccountInfo'
};
</script>

<style scoped>
  .account-container {
    width: 100%;
    padding: 30px;
    height: 100%;
    overflow-y: scroll;
  }
  .account-container h2{
    width: 100%;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #E0E0E0;
  }
  .account-body{
    width: 100%;
    padding: 30px;
    display: flex;
    flex-flow: wrap;
  }
  .account-model{
    width: 25%;
    height: 270px;
    text-align: center;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .account-model>button{
    width: 100%;
  }
  .account-model:nth-of-type(1){
    border-bottom: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(2){
    border-left: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(3){
    border-left: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(4){
    border-left: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(5){
    border-right: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(6){
    border-right: 1px solid #E0E0E0;
  }
  .account-model:nth-of-type(7){
    border-right: 1px solid #E0E0E0;
  }
</style>
