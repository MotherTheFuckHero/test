<template>
    <div class="container">
      <Search></Search>
      <div class="attractionsDetail-content" style="width: 1010px;text-align: center;margin: 0 auto">
        <template>
          <Tabs>
            <TabPane :label="item.typeDesc" v-for="(item,index) in seckillList" :key="index">
              <!--              秒杀倒计时-->
              <homeClock :endTime="item.seconds" :prices="0" :secKillStatus="item.status"></homeClock>
              <p style="clear: both"></p>
               <div v-for="(items) in item.productSeckillList" style="width: 46%;float: left;margin: 30px 2%;padding-bottom:10px;border-bottom: 1px solid #DDDEE1">
                  <img :src="items.imgUrl" alt="" style="width:25%;float: left;border-radius: 6px;margin: 0 2.5%;" />
                 <div class="seckillproduct" style="">
                   <ul>
                     <li>{{items.productName}}</li>
                     <li>限购<span style="color:#FF3A2B;">{{items.secKillNum+items.specName}}</span></li>
                     <li><Progress :percent="(items.saleAmt/items.secKillNum)*100" stroke-color="#FF3A2B" status="active" /></li>
                     <li><span style="color:#FF3A2B;font-weight: bold">{{$t("operate.Money")}}{{items.secKillPrice}}</span><Button type="error" shape="circle" style="float: right;margin-right:50px;" @click="goShopDetail(items.productId)">抢购秒杀</Button></li>
                   </ul>
                 </div>
               </div>
            </TabPane>
          </Tabs>
        </template>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
import { getseckill } from '../api/header'
import homeClock from '@/components/homeClock';
export default {
  name: 'AttractionsDetail',
  components: {
    Search,
    homeClock
  },
  data () {
    return {
      seckillList: []
    };
  },
  created () {
    this.getseckill();
  },
  methods: {
    // 商品详情
    goShopDetail (val) {
      this.$router.push({
        path: '/mallShopDetail',
        query: {productId: val}
      });
    },
    // 秒杀活动列表
    getseckill () {
      let companyId = JSON.parse(localStorage.getItem("companyId"));
      getseckill(companyId).then(res=>{
        this.seckillList=res.data
        console.log(this.seckillList)
      })
    },
  }
};
</script>

<style scoped>
/deep/ .ivu-tabs-nav .ivu-tabs-tab-active{
  color: #FF3A2B;
  font-weight: bold;
  font-size: 25px;
}
/deep/ .ivu-tabs-ink-bar{
  background:  #FF3A2B;
  height: 3px;
}
/deep/ .ivu-tabs-nav-scroll{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center
}
.ivu-tabs{
  padding-bottom:200px ;
}
.seckillproduct{
  float: right;
  width:63%;
  margin: 0 3%;
  text-align: left;
  font-size: 20px;
}
.seckillproduct ul li{
  line-height: 29px;
  list-style: none;
}

</style>
