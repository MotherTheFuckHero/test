<template>
    <div class="container">
      <Search></Search>
      <div class="attractionsDetail-content">
        <div class="attractionsDetail-content-taocan">
          <h2>导游列表</h2>
          <div class="attractionsDetail-content-packagelist">
            <p v-if="shopList.length === 0" class="noList">该分公司暂无导游，请切换其他分公司查看~</p>
            <ul v-else>
              <li v-for="(v, i) in shopList" :key="i">
                <div>
                  <img v-if="v.headImgUrl" :src="v.headImgUrl" alt="">
                  <img v-else src="/static/img/glw-logo.7651d3c.png" alt="">
                </div>
                <div>
                  <p>导游名称:{{v.name}}</p>
                  <p>联系电话:{{v.guidePhone}}</p>
                  <p>{{$t("operate.Money")}}<span style="font-size: 25px;font-weight: bold">{{v.price}}</span>/天</p>
                  <p v-if="v.remark">{{'个性签名:'+v.remark}}</p>
                </div>
                <div>
                  <Button @click="goShopDetail(v.id)">立即预定</Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
import { getguideList } from '../api/guide';
export default {
  name: 'AttractionsDetail',
  components: {
    Search
  },
  data () {
    return {
      data: {},
      shopList: []
    };
  },
  created () {
    this.getproduct();
  },
  methods: {
    // 商品详情
    goShopDetail (val) {
      this.$router.push({
        path: '/guideShopDetail',
        query: {guideId: val}
      });
    },
    // 商品列表
    getproduct () {
      let companyId = JSON.parse(localStorage.getItem("companyId"));
      let languageId = 1
      getguideList(companyId, languageId,{}).then(res => {
        this.shopList = res.data;
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
  padding-bottom: 30px;
}
.attractionsDetail-content {
  width: 1008px;
  height: auto;
  margin: 20px auto;
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
  justify-content: center;
  align-items: center;
}
.attractionsDetail-content-headRight>img{
  width: 100%;
}
.attractionsDetail-content-taocan{
  width: 100%;
  margin: 30px 0;
}
.attractionsDetail-content-taocan>h2{
  padding-bottom: 10px;
}
.attractionsDetail-content-packagelist{
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  height: auto;
  overflow: hidden;
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
