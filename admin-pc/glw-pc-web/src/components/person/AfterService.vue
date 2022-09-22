<template>
    <div class="service-container">
      <h2>{{$t("personalCenter.after-saleservice")}}</h2>
      <div class="service-body">
        <p style="margin-top: 30px">{{$t("personalCenter.contactinformation")}}</p>
        <div style="display: flex;margin-top: 30px">
          <img alt="" src="../../images/shouhou_icon_qq.png" style="width: 16px;height: 18px">
          <p style="margin-left: 10px">QQ：3416450150</p>
        </div>
        <div style="display: flex;margin-top: 30px">
          <img alt="" src="../../images/shouhou_icon_phone.png" style="width: 16px;height: 18px">
          <p style="margin-left: 10px">
            {{$t("personalCenter.phone")}}：0315-6681288
            &ensp;&ensp;&ensp;&ensp;
            0315-6686299
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AfterService'
};
</script>

<style scoped>
.service-container{
  width: 100%;
  padding: 30px;
  height: 100%;
  overflow-y: scroll;
}
.service-container h2{
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.service-body{
  width: 100%;
}
</style>
