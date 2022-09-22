<template>
    <div class="container">
      <Search></Search>
      <div class="attractionsDetail-content">
        <div class="attractionsDetail-content-head">
          <div class="attractionsDetail-content-headLeft">
            <div>
              <h1>{{data.name}}</h1>
              <Rate disabled allow-half show-text v-model="data.starScore">
                <span>{{ data.starScore }}{{$t("operate.xing")}}</span>
              </Rate>
            </div>
            <div>
              <p>{{$t("operate.address")}}：{{data.address}}</p>
              <p>{{data.bizDate}}</p>
            </div>
            <div style="text-indent:2em;">
              {{data.introduction}}
            </div>
          </div>
          <div class="attractionsDetail-content-headRight">
            <div style="flex-basis:100%;text-align: center;display: flex; align-items: center;  justify-content: center;">{{$t("operate.qualifications")}}：
              <a>
                <img @click="qualifications"  src="https://assets.alicdn.com/app/marketing/xfile/national_emblem_light.png"/>
            </a>
            </div>
            <img :src="data.headImgUrl" alt="">
          </div>
        </div>
        <div class="attractionsDetail-content-taocan">
          <h2>{{this.$t("product.one")}}</h2>
          <div class="attractionsDetail-content-packagelist">
            <p v-if="shopList.length === 0" class="noList">{{$t("product.two")}}</p>
            <ul v-else>
              <li v-for="(v, i) in shopList" :key="i">
                <div>
                  <img :src="v.imageUrl" alt="">
                </div>
                <div>
                  <p>{{v.title}}</p>
                  <p>{{$t("operate.sold")}}:{{(v.id%99+123) * (v.id%99) * (v.id%10)+v.saleCount}}</p>    <!-- 刘总需求添加随机数 -->
                  <p>{{$t("operate.Money")}} {{v.platFormPrice}}</p>
                </div>
                <div>
                  <Button @click="goShopDetail(v.id)">{{$t("product.three")}}</Button>
                </div>
              </li>
            </ul>
          </div>
<!--            //分页-->
          <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrent" @on-change="getNewShopList"/>
        </div>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
import { getmerchantInfo } from '../api/merchant';
import { getproductpageList } from '../api/product';
export default {
  name: 'AttractionsDetail',
  components: {
    Search
  },
  data () {
    return {
      data: {},
      valueCustomText: 3.8,
      shopPageCurrent: 1,
      pageNo: 1,
      shopList: []
    };
  },
  created () {
    this.getmerchant();
  },
  methods: {
    // 分页
    getNewShopList (val) {
      this.pageNo = val;
      this.getproduct();
    },
    //商家资质
    qualifications(){
      this.$router.push({
        path: '/qualifications',
        query: {merchantId: this.$router.history.current.query.merchantId}
      });
    },
    // 商品详情
    goShopDetail (val) {
      this.$router.push({
        path: '/mallShopDetail',
        query: {productId: val, attractionsData: this.data}
      });
    },
    // 商家详情
    getmerchant () {
      var merchantId = this.$router.history.current.query.merchantId
      getmerchantInfo(merchantId).then(res => {
        res.data.introduction = res.data.introduction.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '')
        this.data = res.data;
        this.getproduct();
      });
    },
    // 商品列表
    getproduct () {
      let id = this.data.id;
      let params = {
        pageNo: this.pageNo,
        pageSize: 10
      };
      getproductpageList(id, params).then(res => {
        this.shopPageCurrent = res.data.totalCount;
        this.shopList = res.data.resultList;
      });
    }
  }
};
</script>

<style scoped>
ul,li {
  padding:0;
  margin:0;
  list-style:none
}
.container{
  background-color: #F5F5F5;
}
.attractionsDetail-content {
  width: 1008px;
  height: auto;
  margin: 0px auto;
}
.attractionsDetail-content-head{
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 27px 0px rgba(48, 49, 49, 0.15);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.attractionsDetail-content-headLeft{
  width: 68%;
}
.attractionsDetail-content-headLeft>div:nth-of-type(1){
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #E0E0E0;
}
.attractionsDetail-content-headLeft>div:nth-of-type(1)>h1{
  color: #333333;
}
.attractionsDetail-content-headLeft>div:nth-of-type(2){
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #E0E0E0;
}
.attractionsDetail-content-headLeft>div:nth-of-type(2)>p{
  color: #666666;
  line-height: 30px;
}
.attractionsDetail-content-headLeft>div:nth-of-type(3){
  width: 100%;
  padding-top: 20px;
}
.attractionsDetail-content-headLeft>div:nth-of-type(3)>p{
  color: #666666;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.attractionsDetail-content-headRight{
  width: 30%;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
}
.attractionsDetail-content-headRight>img{
  width: 100%;
}
.attractionsDetail-content-taocan{
  width: 100%;
  margin-top: 30px;
}
.attractionsDetail-content-taocan>h2{
  padding-bottom: 10px;
}
.attractionsDetail-content-packagelist{
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
}
.attractionsDetail-content-packagelist>ul{
  width: 100%;
  padding: 30px;
}
.attractionsDetail-content-packagelist>ul>li{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:20px 0;
  border-top: 1px solid #E0E0E0;
  cursor: pointer;
}
.attractionsDetail-content-packagelist>ul>li:nth-of-type(1){
  border-top: 1px solid #ffffff;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(1){
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(1)>img{
  width: 100%;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(2){
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(2)>p:nth-of-type(1){
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(2)>p:nth-of-type(2){
  font-size: 14px;
  font-weight: 400;
  color: #999999;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(2)>p:nth-of-type(3){
  font-size: 14px;
  font-weight: bold;
  color: #F92C58;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(3){
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.attractionsDetail-content-packagelist>ul>li>div:nth-of-type(3)>button{
  background: #F92C58;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
  padding: 5px 20px;
}
.attractionsDetail-content-pageList{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
.noList{
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 20px;
}
</style>
