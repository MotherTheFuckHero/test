<template>
    <div class="container">
      <Search></Search>
      <div class="attractionsDetail-content" style="width: 1010px;text-align: center;margin: 0 auto">
        <template>
             <div  style="width: 100%;padding-bottom:10px;border-bottom: 1px solid #DDDEE1;height: auto;overflow: hidden;margin-bottom: 10px;">
               <div v-for="(items) in couponList" style="width: 46%;margin: 30px 2%;padding-bottom:10px;display: inline-block;float:left">
                 <div class="seckillproduct">
                   <span class="tag">{{items.tag}}</span>
                   <p style="height: 34px;"></p>
                   <ul>
                     <li><span style="font-weight: bold;color: black;margin-left:5%;">{{items.name}}</span><span style="float: right;width: 40%;text-align: center;font-size: 30px;color:#FF3A2B;font-weight: bold"><span style="font-size: 12px;">{{$t("operate.Money")}}</span>{{items.discount}}</span></li>
                     <li style="overflow: hidden;border-bottom:2px dashed rgb(221, 222, 225);padding-bottom: 10px;">
                       <span v-if="items.timeType==1" style="color:#D17B1A;background:#FEC6C6;font-size: 18px;padding:5px;border-radius: 6px;">领取后{{items.days}}日内有效</span>
                       <span v-else style="color:#D17B1A;background:#FEC6C6;font-size: 12px;padding:5px;border-radius: 6px;">有效期:{{items.startUseTime}}-{{items.endUseTime}}</span>
                       <span style="color:#C95D27;font-weight: bold;float: right;font-size: 18px;">满{{items.min}}元可使用优惠券</span>
                     </li>
                     <li>
                       <span style="color:#979797;font-size: 16px;margin-left:5px;">{{items.desc}}</span>
                       <Button v-if="items.isReceive" type="error" shape="circle" style="float: right;margin-right:20px;" @click="gohome">去使用</Button>
                       <Button v-else type="error" shape="circle" style="float: right;margin-right:20px;" @click="getcoupon(items.id)">领取优惠券</Button>
                     </li>
                   </ul>
                 </div>
               </div>
             </div>
<!--                      //分页-->
          <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrent" @on-change="getNewShopList"/>
        </template>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
import { getcouponList,postcoupon } from '../api/order'
import homeClock from '@/components/homeClock';
export default {
  name: 'AttractionsDetail',
  components: {
    Search,
    homeClock
  },
  data () {
    return {
      couponList: [],
      pageNo: 1,
      shopPageCurrent:1,
    };
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
    // 优惠券列表
    getcouponlist () {
      let data={
        pageNo: this.pageNo,
      }
      getcouponList(data).then(res=>{
        this.couponList=res.data.resultList
        this.shopPageCurrent = res.data.totalCount;
      })
    },
    getcoupon(val){
      let data={
        couponId:val
      }
      postcoupon(data).then(res => {
            var code = res.code
            var msg = res.msg
            if (code === '0') {
              this.$message({
                message: '领取成功,快去使用吧！',
                type: 'success'
              })
              this.getcouponlist();
            } else {
              this.$message({
                message: msg,
                type: 'warning'
              })
            }
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
