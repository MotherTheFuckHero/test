<template>
  <div class="container"  ref="obtain">
    <Search></Search>
    <HomeNav :parentPanelList="panelList"></HomeNav>
    <!-- 商品显示区域 -->
    <div class="content">
      <!-- 秒杀 -->
      <div class="content">
        <!-- 秒杀 -->
        <div class="seckill" v-if="seckillList.length>=1">
          <!-- 头部 -->
          <div class="seckill-head">
            <div class="seckill-icon">
              <img src="../images/clock.png" alt="">
            </div>
            <div class="seckill-text">
              <span class="seckill-title">{{seckillList[0].status==1 ? '限时秒杀中':'即将秒杀'}}</span>
              <span class="seckill-remarks">总有你意想不到的价格</span>
            </div>
            <div class="count-down">
             <span > <router-link  to="/skillmore" style="color: #FFFFFF">{{$t("operate.see")}}</router-link></span>
            </div>
          </div>
          <!-- 内容 -->
          <div class="seckill-content">
            <div class="seckill-item" v-for="(item, index) in seckillList[0].productSeckillList" v-if="index<5" :key="index">
              <div class="seckill-item-img"  @click="goProudct(item.productId)">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="seckill-item-info" >
                <p style="height: 35px;">{{item.productName}}</p>
                <p>
                  <span class="seckill-price text-danger" style="color: rgb(252, 64, 94)"><Icon type="social-yen"></Icon>{{item.secKillPrice}}</span>
                  <span class="seckill-old-price">/{{item.specName}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div>
        <!-- 热卖 -->
        <div class="seckill-content" v-if="extensionList.length>0">
          <img style="width: 183px;height: 250px;float: left;margin: 15px 0 0 15px" src="../images/Best.png" alt="">
          <div class="seckill-item" v-for="(item, index) in extensionList" v-if="index < 4" :key="index">
            <div class="seckill-item-img" @click="goProudct(item.productResponse.id)">
             <img :src="item.productResponse.imageUrl" alt="">
            </div>
            <div class="seckill-item-info">
              <p style="height: 35px">{{item.productResponse.title}}</p>
              <p>
                <span class="seckill-price text-danger" style="color: rgb(252, 64, 94)"><Icon type="social-yen"></Icon>{{item.productResponse.platFormPrice}}</span>
                <span class="seckill-old-price" style="color:rgba(153, 153, 153, 1)"><s>{{item.productResponse.storePrice}}</s></span>
                <span class="seckill-old-price">销量:{{(123+item.productResponse.id%99) * (item.productResponse.id%99)*(item.productResponse.id%10) + item.productResponse.saleCount}}</span>    <!-- 刘总需求添加随机数 -->
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 景区 -->
      <div class="item-class">
        <div class="item-class-content" v-for="(item, index) in panelsList" :key="index" v-if="index<2" >
          <div class="bannerHeader" style="position: relative">
            <img :src="item.iconUrl" style="float: left;height: 24px;align-items: center;margin: 0 5px 0 0" alt=""/>
            <span @click="goSectorDetail(item)" style="font-size: 20px;font-weight: bold; color: #FC405E;margin-right: 5px;">{{item.name}}</span>
            <ul v-for="(items, index) in item.panelContentResponse" v-if="index<5">
             <li @click="goSectorDetails(items)">{{items.name}}</li>
            </ul>
            <span @click="goSectorDetail(item)" v-if="item.panelContentResponse.length>5" style="position: absolute;right: 2px">{{$t("operate.see")}}</span>
          </div>
          <div class="item-four-img">
              <div class="item-four-detail" v-for="(subItem, index) in item.merchantResponseList" v-if="index<6" :key="index">
                <div class="item-four-detail-img" @click="goMerchant(subItem.id)">
                    <img :src="subItem.headImgUrl" alt="">
                </div>
                <div class="item-four-detail-text">
                  <ul style="list-style: none">
                    <li>{{subItem.name}}</li>
                    <li>
                      <i-col span="12" style="width: 100%;">
                      <Rate show-text v-model="subItem.starScore" disabled allow-half style="font-size: 12px;color: rgba(255, 200, 69, 1)">
                        <span style="font-size: 12px;">{{subItem.starScore*20}}%{{$t("operate.praise")}}</span>
                      </Rate>
                    </i-col>
                    </li>
                    <li style="color:#FC405E;">{{$t("operate.Money")}}<span style="font-size: 16px;font-weight: bold;margin: 0 5px;">{{subItem.lowPrice}}</span>{{$t("operate.begin")}}</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!--线路 -->
      <div class="item-classT" v-for="(item, index) in panelsList" :key="index" v-if="index>1 && index<3">
        <div class="bannerHeader">
          <img :src="item.iconUrl"  style="float: left;height: 24px;align-items: center;margin: 0 5px 0 0" alt=""/>
          <span @click="goSectorDetail(item)" style="font-size: 20px;font-weight: bold; color: #FC405E;margin-right: 5px;">{{item.name}}</span>
          <ul v-for="(items, index) in item.panelContentResponse" v-if="index<10">
            <li @click="goSectorDetails(items)">{{items.name}}</li>
          </ul>
          <span @click="goSectorDetail(item)" v-if="item.panelContentResponse.length>10" style="position: absolute;right: 2px">{{$t("operate.see")}}</span>
        </div>
          <div class="item-four-img">
            <div class="item-four-details" v-for="(subItem, index) in item.merchantResponseList" v-if="index<3" :key="index">
              <div class="item-four-detail-imgs" @click="goMerchant(subItem.id)">
                  <img :src="subItem.headImgUrl" alt="" >
              </div>
              <div class="item-four-detail-text">
                <ul style="list-style: none;padding: 0 10px;">
                  <li style="line-height: 40px !important;">{{subItem.name}} <p style="color:#FC405E;float: right">{{$t("operate.Money")}}<span style="font-size: 16px;font-weight: bold;margin: 0 5px;">{{subItem.lowPrice}}</span>{{$t("operate.begin")}}</p></li>
                  <li>
                    <i-col span="12" style="width: 100%;">
                      <Rate show-text v-model="subItem.starScore" disabled allow-half style="font-size: 12px;color: rgba(255, 200, 69, 1)">
                        <span style="font-size: 12px;">{{subItem.starScore*20}}%{{$t("operate.praise")}}</span>
                      </Rate>
                    </i-col>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
      <!-- 地方特产 -->
      <div class="item-class" v-if="panelsList.length>3" >
        <div class="item-class-content" v-for="(item, index) in panelsList" :key="index" v-if="index>2 && index<5" >
          <div class="bannerHeader" style="position: relative">
            <img :src="item.iconUrl" style="float: left;height: 24px;align-items: center;margin: 0 5px 0 0" alt=""/>
            <span @click="goSectorDetail(item)" style="font-size: 20px;font-weight: bold; color: #FC405E;margin-right: 5px;">{{item.name}}</span>
            <ul v-for="(items, index) in item.panelContentResponse" v-if="index<5">
              <li @click="goSectorDetails(items)">{{items.name}}</li>
            </ul>
            <span @click="goSectorDetail(item)" v-if="item.panelContentResponse.length>5" style="position: absolute;right: 2px">{{$t("operate.see")}}</span>
          </div>
          <div class="item-four-img">
            <div class="item-four-detail" v-for="(subItem, index) in item.merchantResponseList" v-if="index<6" :key="index">
              <div class="item-four-detail-img" @click="goMerchant(subItem.id)">
                  <img :src="subItem.headImgUrl" alt="">
              </div>
              <div class="item-four-detail-text">
                <ul style="list-style: none">
                  <li>{{subItem.name}}</li>
                  <li>
                    <i-col span="12" style="width: 100%;">
                      <Rate show-text v-model="subItem.starScore" disabled allow-half style="font-size: 12px;color: rgba(255, 200, 69, 1)">
                        <span style="font-size: 12px;">{{subItem.starScore*20}}%</span>
                      </Rate>
                    </i-col>
                  </li>
                 <li style="color:#FC405E;">{{$t("operate.Money")}}<span style="font-size: 16px;font-weight: bold;margin: 0 5px;">{{subItem.lowPrice}}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--地方美食 -->
      <div class="item-classT" v-for="(item, index) in panelsList" :key="index" v-if="index>4 && index<6" >
        <div class="bannerHeader">
          <img :src="item.iconUrl" style="float: left;height: 24px;align-items: center;margin: 0 5px 0 0" alt=""/>
          <span @click="goSectorDetail(item)" style="font-size: 20px;font-weight: bold; color: #FC405E;margin-right: 5px;">{{item.name}}</span>
          <ul v-for="(items, index) in item.panelContentResponse" v-if="index<5">
            <li @click="goSectorDetails(items)">{{items.name}}</li>
          </ul>
          <span @click="goSectorDetail(item)" v-if="item.panelContentResponse.length>5" style="position: absolute;right: 2px">{{$t("operate.see")}}</span>
        </div>
        <div class="item-four-img">
          <div class="item-four-detailss"  v-for="(subItem, index) in item.merchantResponseList" v-if="index<5" :key="index">
            <div class="item-four-detail-imgss" @click="goMerchant(subItem.id)">
                <img :src="subItem.headImgUrl" alt="" >
            </div>
            <div class="item-four-detail-text">
              <ul style="line-height: 30px;list-style: none;padding: 0 10px;">
                <li>{{subItem.name}} </li>
                <li>
                  <p style="color:#FC405E;">{{$t("operate.Money")}}<span style="font-size: 16px;font-weight: bold;margin: 0 5px;">{{subItem.lowPrice}}</span>{{$t("operate.begin")}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--生活服务 -->
    <div class="item-classT" style="margin-bottom:20px; " v-for="(item, index) in panelsList" :key="index" v-if="index>6 && index<8">
        <div class="bannerHeader">
          <img :src="item.iconUrl"  style="float: left;height: 24px;align-items: center;margin: 0 5px 0 0" alt=""/>
          <span @click="goSectorDetail(item)" style="font-size: 20px;font-weight: bold; color: #FC405E;margin-right: 5px;">{{item.name}}</span>
          <ul v-for="(items, index) in item.panelContentResponse" v-if="index<5">
            <li @click="goSectorDetails(items)">{{items.name}}</li>
          </ul>
          <span @click="goSectorDetail(item)" v-if="item.panelContentResponse.length>5" style="position: absolute;right: 2px">{{$t("operate.see")}}</span>
        </div>
        <div class="item-footer">
          <div  style="width: 69%;display: inline-block">
              <div class="item-footerIn"  v-for="(subItem, index) in item.merchantResponseList" v-if="index<4" :key="index">
                <img :src="subItem.headImgUrl" style="width: 100%;height: 100%" alt="" >
                <p @click="goMerchant(subItem.id)">{{subItem.name}}<br><span>{{$t("operate.Money")}} <span style="font-size: 20px;font-weight: bold;" >{{subItem.lowPrice}}</span> {{$t("operate.begin")}}</span><br><span>{{$t("operate.praise")}}：98%</span></p>
              </div>
          </div>
          <div class="item-footerIns" v-for="(subItem, index) in item.merchantResponseList" v-if="index>3 && index<5" :key="index">
              <img :src="subItem.headImgUrl" style="width: 100%;height: 100%;" alt="" >
              <p @click="goMerchant(subItem.id)">{{subItem.name}}<br><span>{{$t("operate.Money")}} <span style="font-size: 20px;font-weight: bold;" >{{subItem.lowPrice}}</span> {{$t("operate.begin")}}</span><br><span>{{$t("operate.praise")}}：98%</span></p>
          </div>
        </div>
      </div>

    </div>
    <div style="clear: both"></div>
    <div class="ivu-modal-wrap" v-if="modal1" @click="modals">
      <img v-if="lang == 'en'" src="../images/popupEnglish.png" alt=""/>
      <img v-else src="../images/popup.png" alt=""/>
    </div>
    <div class="scrolls" v-if="scrollTop>=550">
      <a @click="modal1show">
        <img v-if="lang == 'en'" src="../images/jindian@3xenglish.png" alt="">
        <img v-else src="../images/jindian@3x.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import HomeNav from '@/components/nav/HomeNav';
import { getextension,getCategoryPanel,getpanelMerchant,getseckill } from '../api/header'
export default {
  name: 'Index',
  created () {
    let lang = localStorage.getItem('lang')
    this.lang = lang
    let companyId = JSON.parse(localStorage.getItem("companyId"));
    getextension(companyId).then(res=>{
      this.extensionList=res.data
    })
    getseckill(companyId).then(res=>{
      this.seckillList=res.data
    })

    let _this=this
    setTimeout(function () {
      _this.getPanel()
    }, 1000);
  },
  mounted () {
    // 滚动条的获取
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错  必须带第三个参数true，否则销毁不成功
    window.removeEventListener('scroll', this.handleScrollx, true);
  },
  data () {
    return {
      modal1: false,
      lang: 'en',
      scrollTop:0,
      extensionList:[],
      seckillList:[],
      panelsList:[],
      panelList: JSON.parse(localStorage.getItem("newPanelList")),
    };
  },
  methods: {
    modals(){
      this.modal1=false
    },
    modal1show(){
      this.modal1=true
    },
    handleScrollx() {
      this.scrollTop=Math.abs(this.$refs.obtain.getBoundingClientRect().top)
    },
    getPanel(){
    var _this=this
    this.panelsList = JSON.parse(localStorage.getItem("panelsList"));
     var panelsListLength=this.panelsList.length
      for(var s=0;s<this.panelsList.length;s++){
        this.panelsList[s].panelContentResponse=[]
        this.panelsList[s].merchantResponseList=[]
        getCategoryPanel(_this.panelsList[s].id).then(res=>{
          for(var i=0;i<res.data.length;i++){
            if(i<panelsListLength){
              if(this.panelsList[i].id==res.data[i].panelId){
                this.panelsList[i].panelContentResponse=res.data
              }
            }
          }
        })
        let panelsIndex=s
        getpanelMerchant(_this.panelsList[s].id).then(res=>{
          this.panelsList[panelsIndex].merchantResponseList=res.data.resultList
        })
      }
    },
    //商家详情
    goMerchant(val){
      this.$router.push({
        path:'/attractionsDetail',
        query:{merchantId:val}
      });
    },
    //商品详情
    goProudct(val){
      this.$router.push({
        path:'/mallShopDetail',
        query:{productId:val}
      });
    },
    //进分类筛选(不携带子板块id)
    goSectorDetail(val){
      this.$router.push({
        path:'/sectorDetails',
        query:{panelsId:val.id,panelId:null}
      });
    },

    //进分类筛选(携带子板块id)
    goSectorDetails(val){
      this.$router.push({
        path:'/sectorDetails',
        query:{panelsId:val.panelId,panelId:val.id}
      });
    },

},
  components: {
    Search,
    HomeNav
  },
};
</script>

<style scoped>
.container {
  background-color: #F5F5F5;
}
.content {
  width: 1008px;
  height: auto;
  margin: 0px auto;
}
/*****************************秒杀专栏开始*****************************/
/*秒杀专栏*/
.count-down{
  color: #FFFFFF;
  float: right;
  line-height: 50px;
  font-size: 18px;
  margin-right: 15px;
}

.seckill {
  width: 100%;
  height: 330px;
  margin: 15px auto;
  background-color: #fff;
}
.seckill-head {
  width: 100%;
  height: 50px;
  background-color: #e01222;
}
.seckill-icon {
  width: 68px;
  height: 100%;
  float: left;
}
.seckill-icon img {
  width: 35px;
  height: 35px;
  margin-top: 6px;
  margin-left: 15px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite; /*设置无线循环*/
}
/*定义闹钟震动动画关键帧*/
@keyframes shake-clock {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left;
}
.seckill-text .seckill-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
.seckill-content {
  width: 100%;
  height: 280px;
}
.seckill-item {
  width: 183px;
  height: 250px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.seckill-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #009688;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
/*****************************秒杀专栏结束*****************************/

/*****************************商品专栏开始*****************************/
.item-class {
  width: 100%;
  height: 430px;
  margin-top: 15px;
  background-color: #fff;
  padding: 10px 0;
}
.item-classT {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 15px;
  background-color: #fff;
  padding: 10px 0.9%;
}
.item-class-head ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}
.item-class-eat-head a {
  background-color: #eeb955;
  border: 1px solid #eeb955;
}
.item-class-head a:hover {
  border: 1px solid #fff;
}
.item-class-head li {
  float: left;
}
.item-class-content {
  width: 49%;
  height: 100%;
  cursor: pointer;
  margin-left: 0.9%;
  /*background-color: #cff;*/
  float: left;
}
.item-class-content:nth-child(odd) {
  border: none;
}

.item-big-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-big-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
.item-four-img {
  height: 100%;
  width: 100%;
  margin-left: 8px;
  float: left;
}
.item-four-detail img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-four-detail:hover img {
  margin-left: -6px;
  transition: margin-left 0.3s;
}
.item-four-detail {
  width:33%;
  padding: 0 10px;
  height: 47%;
  float: left;
}
.item-four-details {
  width:30%;
  padding: 0 10px;
  height: 100%;
  float: left;
  border-radius:16px;
  box-shadow: 0px 5px 21px 0px rgba(102, 102, 102, 0.12);
  margin: 10px 1.5%;
}
.item-footer {
  width:100%;
  padding: 0 10px;
  height: 100%;
}

.item-four-detailss {
  width:18%;
  height: 100%;
  float: left;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  margin: 0 0.5%;
  overflow: hidden;
}
.item-four-detail-text {
  width: 100%;
}
.item-four-detail-text ul li{
  overflow: hidden;
  line-height: 20px;
}
.item-four-detail-text ul li:first-child{
  height: 40px !important;
}
.item-four-detail-img {
  width:100%;
  overflow: hidden;
  height:100px;
  border-radius:6px;
}
.item-four-detail-img img {
  width:100%;
  height:100%;
}
.item-four-detail-imgs {
  width:100%;
  overflow: hidden;
  height: 225px;
}
.item-four-detail-imgs img {
  width:100%;
  height:100%;
}
.item-four-detail-imgss {
  width:100%;
  overflow: hidden;
  height: 175px;
}
.item-four-detail-imgss img {
  width:100%;
  height:100%;
}
.item-content-bottom-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-content-bottom-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
/deep/  .ivu-rate-star{
  margin-right: 2px !important;
}
/*/deep/  .ivu-modal-content{*/
/*  display: none;*/
/*}*/
.bannerHeader{
  height: 35px;
  line-height: 35px;
  width: 100%;
  display: flex;align-items: center;
  position: relative;
}
.bannerHeader ul{
  list-style: none;
}
.bannerHeader ul li{
  float: left;
  margin: 0 10px 0 0;
}
/*.bannerHeader ul li:first-child{*/
/*  font-size: 20px;*/
/*  font-family: HelloFont WenYiHei;*/
/*  font-weight: bold;*/
/*  color: #FC405E;*/
/*}*/
/*****************************商品专栏结束*****************************/
.ivu-modal-wrap{
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  display: flex;

}
.ivu-modal-wrap img{
  margin: 0 auto;
}
.scrolls{
  position: fixed;
  right:10%;
  top:220px;
}
.scrolls img{
  width: 100px;
}
.item-footerIn{
  width: 46%;
  height: 187px;
  display: inline-block;
  border-radius:16px;
  overflow: hidden;
  margin: 0 20px 20px 0;
  position: relative;
}

.item-footerIn p{
  position: absolute;
  top:-100%;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background:rgba(0, 0, 0, 0.6);
  text-align: center;
  padding-top:15%;
  border-radius: 8px;
  transition: all 0.3s;
  line-height: 30px;
}
.item-footerIn:hover>p{
  width: 100%;
  height: 100%;
  top:0;
}
.item-footerIns{
  width: 29%;
  height:394px;
  display: inline-block;
  border-radius:16px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}
.item-footerIns p{
  position: absolute;
  top:-100%;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background:rgba(0, 0, 0, 0.6);
  text-align: center;
  padding-top:50%;
  border-radius: 8px;
  transition: all 0.3s;
  line-height: 30px;
}
.item-footerIns:hover>p{
  width: 100%;
  height: 100%;
  top:0;
}
</style>
