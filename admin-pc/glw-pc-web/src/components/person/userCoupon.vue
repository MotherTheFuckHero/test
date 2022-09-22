<template>
    <div class="service-container">
      <h2>{{$t("personalCenter.Mycoupons")}} </h2>
      <div class="service-body">
        <template v-if="couponList.length>0">
          <Tabs v-model="names" @on-click="tabclick">
          <TabPane :label="$t('personalCenter.whole')"  name="name1">
          <div  style="width: 100%;padding-bottom:10px;border-bottom: 1px solid #DDDEE1;height: auto;overflow: hidden;margin-bottom: 10px;">
            <div v-for="(items) in couponList" style="width: 46%;margin: 30px 2%;padding-bottom:10px;display: inline-block;float:left">
              <div class="seckillproduct">
                <span class="tag">{{items.tag}}</span>
                <p style="height: 34px;"></p>
                <ul>
                  <li><span style="font-weight: bold;color: black;margin-left:5%;">{{items.couponName}}</span><span style="float: right;width: 40%;text-align: center;font-size: 30px;color:#FF3A2B;font-weight: bold"><span style="font-size: 12px;">{{$t("operate.Money")}}</span>{{items.discount}}</span></li>
                  <li style="overflow: hidden;border-bottom:2px dashed rgb(221, 222, 225);padding-bottom: 10px;">
                    <span style="color:#D17B1A;background:#FEC6C6;font-size: 12px;padding:5px;border-radius: 6px;">{{$t("personalCenter.termofvalidity")}}{{items.startTime}}-{{items.endTime}}</span>
                    <span style="color:#C95D27;font-weight: bold;float: right;font-size: 15px;">{{$t("personalCenter.full")}}{{items.min}}{{$t("operate.Money")}}{{$t("personalCenter.Couponsavailable")}}</span>
                  </li>
                  <li>
                    <span style="color:#979797;font-size: 16px;margin-left:5px;">{{items.desc}}</span>
                    <Button v-if="items.status==1"  type="error" shape="circle" style="float: right;margin-right:20px;" @click="gohome">{{$t("personalCenter.Touse")}} </Button>
                    <Button v-else type="error" shape="circle" disabled style="float: right;margin-right:20px;" >{{items.statusDesc}}</Button>
                  </li>
                </ul>
              </div>
            </div>
           </div>
          </TabPane>
          <TabPane :label="$t('personalCenter.Received')"  name="name2">
            <div  style="width: 100%;padding-bottom:10px;border-bottom: 1px solid #DDDEE1;height: auto;overflow: hidden;margin-bottom: 10px;">
              <div v-for="(items) in couponList" style="width: 46%;margin: 30px 2%;padding-bottom:10px;display: inline-block;float:left">
                <div class="seckillproduct">
                  <span class="tag">{{items.tag}}</span>
                  <p style="height: 34px;"></p>
                  <ul>
                    <li><span style="font-weight: bold;color: black;margin-left:5%;">{{items.couponName}}</span><span style="float: right;width: 40%;text-align: center;font-size: 30px;color:#FF3A2B;font-weight: bold"><span style="font-size: 12px;">{{$t("operate.Money")}}</span>{{items.discount}}</span></li>
                    <li style="overflow: hidden;border-bottom:2px dashed rgb(221, 222, 225);padding-bottom: 10px;">
                      <span style="color:#D17B1A;background:#FEC6C6;font-size: 12px;padding:5px;border-radius: 6px;">{{$t("personalCenter.termofvalidity")}}:{{items.startTime}}-{{items.endTime}}</span>
                      <span style="color:#C95D27;font-weight: bold;float: right;font-size: 15px;">{{$t("personalCenter.full")}}{{items.min}}{{$t("operate.Money")}}{{$t("personalCenter.Couponsavailable")}}</span>
                    </li>
                    <li>
                      <span style="color:#979797;font-size: 16px;margin-left:5px;">{{items.desc}}</span>
                      <Button v-if="items.status==1"  type="error" shape="circle" style="float: right;margin-right:20px;" @click="gohome">>{{$t("personalCenter.Touse")}}</Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane :label="$t('personalCenter.Used')"   name="name3">
            <div  style="width: 100%;padding-bottom:10px;border-bottom: 1px solid #DDDEE1;height: auto;overflow: hidden;margin-bottom: 10px;">
              <div v-for="(items) in couponList" style="width: 46%;margin: 30px 2%;padding-bottom:10px;display: inline-block;float:left">
                <div class="seckillproduct">
                  <span class="tag">{{items.tag}}</span>
                  <p style="height: 34px;"></p>
                  <ul>
                    <li><span style="font-weight: bold;color: black;margin-left:5%;">{{items.couponName}}</span><span style="float: right;width: 40%;text-align: center;font-size: 30px;color:#FF3A2B;font-weight: bold"><span style="font-size: 12px;">{{$t("operate.Money")}}</span>{{items.discount}}</span></li>
                    <li style="overflow: hidden;border-bottom:2px dashed rgb(221, 222, 225);padding-bottom: 10px;">
                      <span style="color:#D17B1A;background:#FEC6C6;font-size: 12px;padding:5px;border-radius: 6px;">{{$t("personalCenter.termofvalidity")}}:{{items.startTime}}-{{items.endTime}}</span>
                      <span style="color:#C95D27;font-weight: bold;float: right;font-size: 15px;">{{$t("personalCenter.full")}}{{items.min}}{{$t("operate.Money")}}{{$t("personalCenter.Couponsavailable")}}</span>
                    </li>
                    <li>
                      <span style="color:#979797;font-size: 16px;margin-left:5px;">{{items.desc}}</span>
                      <Button v-if="items.status==2" type="error" shape="circle" disabled style="float: right;margin-right:20px;" >{{items.statusDesc}}</Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
          <!--                      //分页-->
          <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrent" style="text-align: center" @on-change="getNewShopList"/>
        </template>
        <p v-if="couponList.length==0" style="margin: 30% 0 0 0;text-align: center;font-size: 20px;font-weight: bold"> {{$t("personalCenter.nocoupons")}}！</p>
      </div>
    </div>
</template>

<script>
import { getusercouponList } from '../../api/order'
export default {
  name: 'AfterService',
  data(){
    return{
      couponList: [],
      names:'name1',
      pageNo: 1,
      shopPageCurrent:1,
    }
  },
  created () {
    this.getcouponlist();
  },
  methods: {

    // 分页
    getNewShopList (val) {
      this.pageNo = val;
      this.getcouponlist()
    },
    tabclick(){
      this.getcouponlist()
    },
    // 优惠券列表
    getcouponlist () {
      let status=''
      if(this.names=='name2'){
        status=1
      }else if(this.names=='name3'){
        status=2
      }else {
       status=''
      }
      let data={
        pageNo: this.pageNo,
        status:status
      }
      getusercouponList(data).then(res=>{
        this.couponList=res.data.resultList
        this.shopPageCurrent = res.data.totalCount;
      })
    },
    // 板块查询
    gohome (val) {
      this.$router.push({
        path: '/sectorDetails',
      });
    },
  }
};
</script>

<style scoped>
  /deep/ .ivu-tabs-nav-scroll{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center
  }
  /deep/ .ivu-tabs-nav{
    width: 100%;
  }
  /deep/ .ivu-tabs-tab{
    width: 33%;
    text-align: center;
  }
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
.seckillproduct{
  width:100%;
  margin: 0;
  text-align: left;
  font-size: 20px;
  background:#F2F2F2 ;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.seckillproduct ul li{
  width: 100%;
  line-height:30px;
  margin: 5px 0;
  list-style: none;
  padding: 0 5px;
}
.tag{
  font-size: 12px;
  color: #FFFFFF;
  position: absolute;
  left: 0;padding: 5px;
  border-bottom-right-radius:10px;
  background: linear-gradient(100deg,#FE7C3E,#D93138);
}
</style>
