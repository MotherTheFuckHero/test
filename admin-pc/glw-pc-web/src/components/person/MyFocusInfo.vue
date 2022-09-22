<template>
    <div class="focus-container">
      <div class="focus-tabs">
        <div :class="{ tabActive : i === isActive }" class="tab" v-for="(v, i) in tabList" :key="i" @click="tabClick(i)">{{v.label}}</div>
      </div>
      <div class="focus-tabBody">
        <div class="focus-store" v-show="isActive === 0">
           <div class="favoriteHome" v-if="favoriteList.length>0" v-for="item in favoriteList">
              <img :src="item.valueImage" alt="">
              <span style="float: right;font-size: 18px;font-weight: bold">
                {{item.valueName}}
              </span>
             <span class="gofavorite">
              <a @click="gofavorite(1,item.valueId)">{{$t("personalCenter.Enterthestore")}}</a>
              </span>
           </div>
          <div v-if="favoriteList.length==0" class="not-address-img">
            <img alt="" src="../../images/guanzhu_quesheng_bg.png">
          </div>
        </div>
        <div class="focus-shop" v-show="isActive === 1">
          <div class="favoriteHome" v-if="favoriteList.length>0" v-for="item in favoriteList">
            <img :src="item.valueImage" alt="">
            <span style="float: right;font-size: 18px;font-weight: bold">
                {{item.valueName}}
              </span>
            <span class="gofavorite">
              <a @click="gofavorite(2,item.valueId)">{{$t("personalCenter.Productdetails")}}</a>
              </span>
          </div>
          <div v-if="favoriteList.length==0" class="not-address-img">
            <img alt="" src="../../images/guanzhu_quesheng_bg.png">
          </div>
        </div>
        <!--                      //分页-->
        <Page v-if="favoriteList.length>0"  class="attractionsDetail-content-pageList" :total="shopPageCurrent" style="text-align: center" @on-change="getNewShopList"/>
      </div>
    </div>
</template>

<script>
import { getfavoriteList } from '../../api/merchant'
export default {
  name: 'MyFocusInfo',
  data () {
    return {
      favoriteList: [],
      pageNo: 1,
      shopPageCurrent:1,
      isActive: 0,
      tabList: [
        {
          label: this.$t("personalCenter.Favoritestore"),
          value: 0
        },
        {
          label:this.$t("personalCenter.Favoriteitems"),
          value: 1
        }
      ]
    };
  },
  created () {
    this.getcouponlist();
  },
  methods: {
    tabClick (i) {
        this.isActive = i;
      this.getcouponlist()
    },
    //详情
    gofavorite(type,val){
      if(type===1){
        this.$router.push({
          path: '/attractionsDetail',
          query: {merchantId:val}
        });
      }else {
        this.$router.push({
          path: '/mallShopDetail',
          query: {productId: val}
        });
      }
    },
    // 分页
    getNewShopList (val) {
      this.pageNo = val;
      this.getcouponlist()
    },
    getcouponlist () {
      let favoriteType=''
      if(this.isActive==0){
        favoriteType=1
      }else {
        favoriteType=2
      }
      let data={
        pageNo: this.pageNo,
        favoriteType:favoriteType
      }
      getfavoriteList(data).then(res=>{
        this.favoriteList=res.data.resultList
        this.shopPageCurrent = res.data.totalCount;
      })
    },
  }
};
</script>

<style scoped>
  .favoriteHome{
    width: 100%;height:130px;padding:10px 15px;overflow: hidden;border-radius: 12px;
    border:2px solid #E0E0E0;margin: 10px 0;position: relative
  }
  .favoriteHome img{
    float: left;height:100%;border-radius: 8px;
  }
  .gofavorite{
    font-size: 18px;font-weight: bold;position: absolute;right: 15px;bottom: 10px
  }
  .gofavorite a{
    color:#FC405E;
  }
  .focus-container {
    width: 100%;
    padding: 30px;
    height: 100%;
    overflow-y: scroll;
  }
  .focus-tabs{
    width: 100%;
    display: flex;
    border-bottom: 1px solid #E0E0E0;
  }
  .tab{
    color: #666666;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .tab:nth-of-type(2){
    margin-left: 90px;
  }
  .tab:hover{
    color: #FC405E;
    cursor: pointer;
  }
  .tabActive{
    color: #FC405E;
    border-bottom: 2px solid #FC405E;
  }
  .focus-tabBody{
    width: 100%;
  }
  .focus-store{
    width: 100%;
    padding: 20px 0;
  }
  .focus-shop{
    width: 100%;
    padding: 20px 0;
  }
  .not-address-img{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .not-address-img>img{
    width: 50%;
  }
</style>
