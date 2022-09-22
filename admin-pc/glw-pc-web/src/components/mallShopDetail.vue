<template>
    <div class="container">
      <Search></Search>
      <div class="mallShopDetail-content">
        <div class="mallShopDetail-content-head">
          <div class="mallShopDetail-content-headLeft">
            <div v-if="shopDetailImgList.length !== 0" class="mallShopDetail-content-headLeft-left">
              <div class="mallShopDetail-content-headLeft-showImg">
                <img alt="" :src="shopDetailImgList[imgIndex].imageUrl">
              </div>
              <div class="mallShopDetail-content-headLeft-imgList">
                <div :class="{ shopDetailActive : imgIndex === index }" class="mallShopDetail-content-headLeft-imgSmall" v-for="(item, index) in shopDetailImgList" :key="index" @mouseover="showBigImg(index)">
                  <img alt="" :src="item.imageUrl">
                </div>
              </div>
            </div>
            <div v-if="shopDetailObj !== null"  class="mallShopDetail-content-headLeft-right">
              <div>
                <p>
                  <span>{{shopDetailObj.title}}</span>
                  <span v-if="isFavoriteProduct ==false" @click="postFavoriteProduct"><a style="color:#FC405E ">{{$t("product.favorite")}}</a></span>
                  <span v-else @click="putFavoriteProduct"><a style="color:#FC405E ">{{$t("product.collected")}}</a></span>
                </p>
              </div>
              <div>
                <div>
                  <p>{{$t("product.price")}}：<span>{{$t("operate.Money")}} {{shopDetailObj.platFormPrice.toFixed(2)}}</span></p>
                  <p style="color: #999999;font-size: 12px;text-decoration:line-through">{{$t("operate.Money")}} {{shopDetailObj.storePrice.toFixed(2)}}</p>
                </div>
              </div>
              <div v-if="shopDetailObj.productSpecResponseList[0].secKillStatu == 0 && shopDetailObj.productType != 8">
                {{$t("product.quantity")}}
                <InputNumber :min="1" v-model="count" size="small"></InputNumber>
                <p >{{$t("product.stock")}}{{shopDetailObj.stockCount}}{{$t("product.jian")}}</p>
              </div>
<!--              秒杀-->
              <div v-else-if="shopDetailObj.productSpecResponseList[0].secKillStatu !== 0">
                限购数量
                <InputNumber :min="1" :max="shopDetailObj.productSpecResponseList[0].productSeckill.timesLimitNum" v-model="count" size="small"></InputNumber>
                <p>库存{{shopDetailObj.productSpecResponseList[0].productSeckill.secKillNum}}件</p>
              </div>
              <div v-else></div>

              <div v-show="shopSpecList.length !== 0">
                <div>规格</div>
                <div>
                  <p :class="{ selectSpec : checkSpec === index }" v-for="(item, index) in shopSpecList" :key="index" @click="selectSpec(item, index)">{{item.productSpecs}}</p>
                </div>
              </div>
              <div v-if="shopDetailObj.productType === 2" style="margin-top: 10px">
                <p>（注：售票时间为{{shopDetailObj.productTicket.startDate}}至{{shopDetailObj.productTicket.endDate}}）</p>
              </div>
              <div v-else>
              </div>
              <div style="overflow: hidden">
                <button @click="buysecKill"  v-if="shopDetailObj.productSpecResponseList[0].secKillStatu == 1 && shopDetailObj.productSpecResponseList[0].productSeckill.secKillNum>=1">
                  去抢购({{$t("operate.Money")}}{{shopDetailObj.productSpecResponseList[0].productSeckill.secKillPrice}})
                </button>

                <button  v-else-if="shopDetailObj.productType === 8" @click="goLine">
                  购买线路
                </button>
                <button @click="buyShop" v-else>{{$t("product.three")}}</button>
                <button v-if="shopDetailObj.productType !== 2 && shopDetailObj.productType !== 8" @click="addShopCar">{{$t("product.addCar")}}</button>
<!--            多规格商品拼团-->
                <button v-if="shopDetailObj.multiSpec && shopISGroup" style="background: #ffffff;color: #FC405E;border: 1px solid #FC405E;" @click="buySpecFight">发起拼团</button>
<!--            单规格商品拼团-->
                <button v-else-if="shopDetailObj.multiSpec === false && shopDetailObj.productSpecResponseList[0].isGroup" style="background: #ffffff;color: #FC405E;border: 1px solid #FC405E;" @click="buySingleFight">发起拼团</button>
              </div>
<!--              秒杀倒计时-->
              <homeClock v-if="shopDetailObj.productSpecResponseList[0].secKillStatu != 0" :endTime="shopDetailObj.productSpecResponseList[0].productSeckill.seconds" :prices="shopDetailObj.productSpecResponseList[0].productSeckill.secKillPrice" :secKillStatus="shopDetailObj.productSpecResponseList[0].secKillStatu"></homeClock>
              <el-calendar v-if="shopDetailObj.productType === 8">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template
                  slot="dateCell"
                  slot-scope="{date, data}">
                  <div @click="calendarOnClick(data)"  style="height: 100%;width: 100%;">
                    <p :class="data.isSelected ? 'is-selected' : ''"  >
                      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                      <span  v-if="dealMyDate(data.day).content && dealMyDate(data.day).contents">
                      <br /> <span>{{$t("operate.Money")+dealMyDate(data.day).content}}</span>
                      <br /> <span>{{'库存:'+dealMyDate(data.day).contents}}</span>
                    </span>
                    </p>
                  </div>
                </template>
              </el-calendar>
            </div>
          </div>
          <div v-if="shopDetailObj !== null && attractionsData !== null" class="mallShopDetail-content-headRight">
            <img alt="" :src="attractionsData.headImgUrl">
            <h3>{{shopDetailObj.merchantName}}</h3>
            <p>{{$t("product.name")}}：{{shopDetailObj.merchantName}}</p>
            <p>{{$t("product.address")}}：{{attractionsData.address}}</p>
            <p>{{$t("product.lianxi")}}：{{attractionsData.linkPhone}}</p>
            <div style="overflow: hidden">
              <button @click="goAttractionsDetail">{{$t("product.merchant")}}</button>
              <button v-if="isFavorite==false"  @click="postFavorite">{{$t("product.scdp")}}</button>
              <button v-else @click="putFavorite">{{$t("product.collected")}}</button>
            </div>
          </div>
        </div>

<!--    去拼团-->
        <div v-if="shopISGroup && fightOrderList.templateId !== 0" class="mallShopDetail-group-div">
          <p v-if="fightOrderList.templateId === 2"><span style="color: #e4393c">{{fightOrderList.orderList.length}}</span>人刚刚拼单成功，可发起拼团</p>
          <p v-else-if="fightOrderList.templateId === 1"><span style="color: #e4393c">{{fightOrderList.orderList.length}}</span>人正在拼单，可直接参与</p>
          <div class="group-seamless" :data="fightOrderList.orderList">
            <vue-seamless-scroll :data="fightOrderList.orderList" class="seamless-warp" :class-option="classOption">
              <ul>
                <li v-for="(item, index) in fightOrderList.orderList" :key="index">
                  <div>
                    <img :src="item.users[0].imgUrl" alt="">
                    <span>{{item.users[0].nickName}}</span>
                  </div>
                  <div v-if="fightOrderList.templateId === 1" style="display: flex;flex-direction: column;text-align: right">
                    <p>还差<span style="color: #e4393c">{{fightOrderList.limitPeos - item.users.length}}</span>人拼单成功</p>
                    <count-down
                      v-on:start_callback="countDownS_cb(1)"
                      v-on:end_callback="countDownE_cb(1)"
                      :currentTime="new Date().getTime()"
                      :startTime="(new Date(item.orderTime.replace(new RegExp('-','gm'),'/'))).getTime()"
                      :endTime="((new Date(item.orderTime.replace(new RegExp('-','gm'),'/'))).getTime() + fightOrderList.duration*60*1000)"
                      :tipText="''"
                      :tipTextEnd="'距结束还有'"
                      :endText="''"
                      :dayTxt="''"
                      :hourTxt="'时'"
                      :minutesTxt="'分'"
                      :secondsTxt="'秒'"
                    >
                    </count-down>
                  </div>
                  <div v-else-if="fightOrderList.templateId === 2">
                    <p>刚刚拼单成功</p>
                  </div>
                  <div v-if="fightOrderList.templateId === 1">
                    <Button type="error" shape="circle" @click="goFightOrder(item)">去拼单</Button>
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="mallShopDetail-content-div">
          <div class="mallShopDetail-content-divtab">
            <div :class="{ tabActive : i === isActive }" class="tab" v-for="(v, i) in tabList" :key="i" @click="tabClick(i)">{{v.label}}</div>
          </div>
          <div v-if="shopDetailObj !== null" class="mallShopDetail-content-divtabbody">
            <div v-show="isActive === 0" v-html="shopDetailObj.productDesc"></div>
            <div v-show="isActive === 1">
              <div v-if="commentList.length === 0" class="mallShopDetail-noComment">{{$t("product.evaluationList")}}</div>
              <div v-else class="mallShopDetail-comment">
                <div v-for="(item, index) in commentList" :key="index" class="mallShopDetail-comment-model">
                  <div>
                    <p>{{item.userName?item.userName:item.userId}}：</p>
                    <Rate disabled show-text v-model="item.star"></Rate>
                  </div>
                  <p>商品规格：{{item.specName}}</p>
                  <p style="margin-top: 10px">{{item.content}}</p>
                  <img style="margin-top: 15px" v-if="item.hasPicture" :src="item.pictureUrls" alt="评价图片">
                </div>
              </div>
              <Page v-if="commentList.length !== 0" class="attractionsDetail-content-pageList" :total="commentListCurrent" @on-change="getNewProductCommentList"/>
            </div>
            <div v-show="isActive === 2">
              <shopQA :shopInfo="shopDetailObj" :specList="shopSpecList" :checkSpec="checkSpec" ref="shopQA"></shopQA>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getShopInfo, getShopImg, addShopCared, getGroupOrder } from '../api/shop';
import { getCommentList } from '../api/order';
import { getmerchantInfo,isfavorite,favorite,deletefavorite } from '../api/merchant';
import vueSeamlessScroll from 'vue-seamless-scroll'
import CountDown from './vue2-countdown'
import shopQA from './shopQA/shopQA';
import Search from '@/components/Search';
import homeClock from '@/components/homeClock';
export default {
  name: 'mallShopDetail',
  components: {
    Search,
    homeClock,
    shopQA,
    vueSeamlessScroll,
    CountDown
  },
  data () {
    return {
      isFavorite:false,
      isFavoriteProduct:false,
      favoriteId:'',
      favoriteIdProduct:'',
      lineDate:{},
      shopISGroup: false,//是否为拼团
      commentListCurrent: 1,
      pageNo: 1,
      commentList: [],
      imgIndex: 0,
      checkSpec: 0,
      isActive: 0,
      count: 1,
      shopDetailObj: null,
      shopDetailImgList: [],
      shopSpecList: [],
      attractionsData: null,
      shopSpecIdPost: null,
      tabList: [
        {
          label: this.$t("product.details"),
          value: 1
        },
        {
          label: this.$t("product.evaluation"),
          value: 2
        },
        {
          label: this.$t("product.Q&A"),
          value: 3
        }
      ],
      fightOrderList: []
    };
  },
  created () {
    if(this.$route.query.attractionsData !=undefined){
      this.attractionsData = this.$route.query.attractionsData;
      let data={
        favoriteType:1,
        valueId:this.attractionsData.id
      }
      isfavorite(data).then(reS=>{
        this.isFavorite=reS.data.isFavorite
        this.favoriteId=reS.data.favoriteId
      })
    }
    this.getShop();
    this.getProductCommentList(1, 10);

  },
  computed: {
      classOption () {
          return {
              step: 0.2, // 数值越大速度滚动越快
              limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
              hoverStop: true, // 是否开启鼠标悬停stop
              direction: 1, // 0向下 1向上 2向左 3向右
              openWatch: true, // 开启数据实时监控刷新dom
              singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
              singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
              waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
          }
      }
  },
  methods: {
    getProductfavorite(val){
      let data={
        favoriteType:2,
        valueId:val
      }
      isfavorite(data).then(reS=>{
        this.isFavoriteProduct=reS.data.isFavorite
        this.favoriteIdProduct=reS.data.favoriteId
      })
    },
    postFavoriteProduct(){
      var thisId=this.$route.query.productId;
      let data={
        favoriteType:2,
        valueId:thisId
      }
      favorite(data).then(res=>{
        if (res.code === '0') {
          let data={
            favoriteType:2,
            valueId:thisId
          }
          isfavorite(data).then(reS=>{
            this.isFavoriteProduct=reS.data.isFavorite
            this.favoriteIdProduct=reS.data.favoriteId
          })
          this.$Notice.success({
            title: '收藏成功',
            desc: ''
          });
        } else {
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },
    putFavoriteProduct(){
      deletefavorite(this.favoriteIdProduct).then(res=>{
        if (res.code === '0') {
          this.isFavoriteProduct=false
          this.$Notice.success({
            title: '已取消',
            desc: ''
          });
        } else {
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },
    postFavorite(){
      let data={
        favoriteType:1,
        valueId:this.attractionsData.id
      }
      favorite(data).then(res=>{
        if (res.code === '0') {
          let data={
            favoriteType:1,
            valueId:this.attractionsData.id
          }
          isfavorite(data).then(reS=>{
            this.isFavorite=reS.data.isFavorite
            this.favoriteId=reS.data.favoriteId
          })
          this.$Notice.success({
            title: '收藏成功',
            desc: ''
          });
        } else {
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },
    putFavorite(){
      deletefavorite(this.favoriteId).then(res=>{
        if (res.code === '0') {
          this.isFavorite=false
          this.$Notice.success({
            title: '已取消',
            desc: ''
          });
        } else {
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },

    handleClose(done) {
      this.$confirm('确认取消购买吗？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    dealMyDate(v) {
      let len = this.shopDetailObj.productSpecResponseList[0].productSpecLineList
      let res = ""
      for(let i=0; i<len.length; i++){
        if(len[i].saleDate == v) {
          res ={
            content:len[i].price,
            contents:len[i].stockCount,
          }
          break
        }
      }
      return res
    },
    calendarOnClick(e) {
      this.lineDate={}
      let len = this.shopDetailObj.productSpecResponseList[0].productSpecLineList
      for(var s=0;s<len.length;s++){
        if(len[s].saleDate == e.day) {
          var data={
            saleDate:e.day,
            price:len[s].price,
            stockCount:len[s].stockCount,
          }
          this.lineDate=data
        }
      }
    },
    goLine(){
      let nowDate = new Date()
      let datee = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      var date = new Date(datee.year + '-' + datee.month + '-' + datee.date).getTime()
      var dates = new Date(this.lineDate.saleDate).getTime()
      if(this.lineDate.saleDate !== undefined && (date<=dates)){
         if(this.lineDate.stockCount<=0){
           this.$notify.warning({
             title: "提示",
             message: '该日期暂无库存，请选择其他日期',
             position: "top-right"
           });
         }else {
           //多规格
           if(this.shopDetailObj.multiSpec) {
             //  如果为多规格商品，判断有没有选择规格信息
             if (this.shopSpecIdPost === null) {
               this.$Notice.warning({title: '请选择商品规格',desc: ''});
             } else {
               // 判断多规格商品，是属于哪种商品类型，productTicket有值代表商品为“票”类型的商品
                 let data={
                   shopDetailObj: this.shopDetailObj,
                   shopSpecList: this.shopSpecList[this.checkSpec],
                   shopCount: this.count,
                   lineDate:this.lineDate
                 }
                 localStorage.setItem("lineData", JSON.stringify(data));
                 this.$router.push({path:'/lineSubmit'});
             }
           }else{
             //单规格
               let data={
                 shopDetailObj: this.shopDetailObj,
                 shopSpecList: this.shopDetailObj.productSpecResponseList[0],
                 shopCount: this.count,
                 lineDate:this.lineDate
               }
               localStorage.setItem("lineData", JSON.stringify(data));
               this.$router.push({path:'/lineSubmit'});
           }

         }
      }else {
        this.$notify.warning({
          title: "提示",
          message: '请选择有效的线路游玩日期',
          position: "top-right"
        });
      }
    },
    getShop () {
      let shopId = this.$route.query.productId;
      this.getProductfavorite(shopId)
      getShopInfo(shopId).then(res => {
        this.$Loading.start();
        if (res.code === '0') {
          if (res.data.productImgList.length <= 4) {
            this.shopDetailImgList = res.data.productImgList;
          }else {
            for (let i=0;i<4;i++) {
              this.shopDetailImgList.push(res.data.productImgList[i])
            }
          }
          res.data.productDesc = res.data.productDesc.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '');
          this.shopDetailObj = res.data;
          this.shopDetailObj.imageUrl=res.data.productImgList[0].imageUrl
          if (this.$route.query.attractionsData === undefined) {
            getmerchantInfo(res.data.merchantId).then(Res => {
              Res.data.introduction = Res.data.introduction.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '')
              this.attractionsData = Res.data;
              let data={
                favoriteType:1,
                valueId:Res.data.id
              }
              isfavorite(data).then(reS=>{
                this.isFavorite=reS.data.isFavorite
                this.favoriteId=reS.data.favoriteId
              })
            });
          }
          if (res.data.multiSpec !== false) {
            this.$Loading.finish();
            this.shopSpecList = res.data.productSpecResponseList;
            this.shopISGroup = !!this.shopSpecList[0].isGroup;
            getGroupOrder(this.shopSpecList[0].id).then(GroupRes => {
              if (GroupRes.code === '0'){
                this.fightOrderList = GroupRes.data;
              }
            })
          } else {
            this.$Loading.finish();
            this.shopISGroup = !!this.shopDetailObj.productSpecResponseList[0].isGroup;
            this.shopSpecList = [];
            getGroupOrder(this.shopDetailObj.productSpecResponseList[0].id).then(GroupRes => {
              if (GroupRes.code === '0'){
                this.fightOrderList = GroupRes.data;
              }
            })
          }
        } else {
          this.$Loading.error();
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      });
    },
    showBigImg (index) {
      this.imgIndex = index;
    },
    goAttractionsDetail () {
      this.$router.push({
        path: '/attractionsDetail',
        query: {merchantId: this.attractionsData.id}
      });
    },
    tabClick (i) {
      this.isActive = i;
    },
    addShopCar () {
      //  判断是否为多规格商品

      //  是多规格商品，判断该商品是否为“票”类型商品
      //  是多规格商品是“票”类型商品，判断该多规格“票”类型商品的当前预定时间在不在售票期间内
      //  在售票期间内并且是多规格商品是“票”类型商品，加入购物车

      //  是多规格商品，判断该商品是否为“票”类型商品
      //  是多规格商品不是“票”类型商品，直接加入购物车

      //  不是多规格商品，判断该商品是否为“票”类型商品
      //  不是多规格商品是“票”类型商品，判断该多规格“票”类型商品的当前预定时间在不在售票期间内
      //  在售票期间内并且是多规格商品是“票”类型商品，加入购物车

      //  不是多规格商品，判断该商品是否为“票”类型商品
      //  不是多规格商品不是“票”类型商品，直接加入购物车
      if (this.shopSpecList.length === 0) {
        if (this.shopDetailObj.productTicket === null){
          let data = {
            productId: this.shopDetailObj.id,
            specId: this.shopDetailObj.specId,
            price: this.shopDetailObj.platFormPrice,
            productNum: this.count,
            checked: false
          };
          addShopCared(data).then(res => {
            if (res.code === '0') {
              this.$Notice.success({
                title: '成功加入购物车',
                desc: ''
              });
            } else {
              this.$Notice.warning({
                title: '加入购物车失败，请稍候再试',
                desc: res.msg
              });
            }
          });
        }else{
          let currentTime = new Date();
          if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/'))) {
            let data = {
              productId: this.shopDetailObj.id,
              specId: this.shopDetailObj.specId,
              price: this.shopDetailObj.platFormPrice,
              productNum: this.count,
              checked: false
            };
            addShopCared(data).then(res => {
              if (res.code === '0') {
                this.$Notice.success({
                  title: '成功加入购物车',
                  desc: ''
                });
              } else {
                this.$Notice.warning({
                  title: '加入购物车失败，请稍候再试',
                  desc: res.msg
                });
              }
            });
          }else{
            this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
          }
        }
      } else {
        if (this.shopSpecIdPost === null) {
          this.$Notice.warning({title: '请选择商品规格', desc: ''});
        } else {
          if (this.shopDetailObj.productTicket === null) {
            let data = {
              productId: this.shopDetailObj.id,
              specId: this.shopSpecIdPost,
              price: this.shopDetailObj.platFormPrice,
              productNum: this.count,
              checked: false
            };
            addShopCared(data).then(res => {
              if (res.code === '0') {
                this.$Notice.success({
                  title: '成功加入购物车',
                  desc: ''
                });
              } else {
                this.$Notice.warning({
                  title: '加入购物车失败，请稍候再试',
                  desc: ''
                });
              }
            });
          }else{
            let currentTime = new Date();
            if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/'))) {
              let data = {
                productId: this.shopDetailObj.id,
                specId: this.shopSpecIdPost,
                price: this.shopDetailObj.platFormPrice,
                productNum: this.count,
                checked: false
              };
              addShopCared(data).then(res => {
                if (res.code === '0') {
                  this.$Notice.success({
                    title: '成功加入购物车',
                    desc: ''
                  });
                } else {
                  this.$Notice.warning({
                    title: '加入购物车失败，请稍候再试',
                    desc: ''
                  });
                }
              });
            }else{
              this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
            }
          }
        }
      }
    },
    selectSpec (v, i) {
      this.checkSpec = i;
      this.shopSpecIdPost = v.id;
      this.shopISGroup = !!v.isGroup;
      if (this.shopISGroup){
        getGroupOrder(v.id).then(res => {
          if (res.code === '0'){
            this.fightOrderList = res.data;
          }
        })
      }
      this.$nextTick(() => {
        this.$refs.shopQA.getSpecShopQAList(1, 10);
      })
    },
    buyShop() {
      //  先判断是否为多规格商品，true为多规格，false为单规格
      if (this.shopDetailObj.multiSpec === true) {
        //  如果为多规格商品，判断有没有选择规格信息
        if (this.shopSpecIdPost === null) {
            this.$Notice.warning({title: '请选择商品规格',desc: ''});
        } else {
          let currentTime = new Date();
          // 判断多规格商品，是属于哪种商品类型，productTicket有值代表商品为“票”类型的商品
          if (this.shopDetailObj.productTicket === null) {
            this.$router.push({
              path:'/toShopPay',
              query: {
                shopDetailObj: this.shopDetailObj,
                shopSpecList: this.shopSpecList[this.checkSpec],
                shopCount: this.count
              }
            });
          }else {
            //  判断当前购买时间在不在该“票”类型商品的售票期间内
            if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
              this.$router.push({
                path:'/toShopPay',
                query: {
                  shopDetailObj: this.shopDetailObj,
                  shopSpecList: this.shopSpecList[this.checkSpec],
                  shopCount: this.count
                }
              });
            }else{
              this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
            }
          }
        }
      } else {
        //  商品为单规格，判断商品是否为“票”类型商品
        //  是的话，判断当前购买时间在不在该“票”类型商品的售票期间内
        //  在，跳订单确认页面
        //  不在报错
        //  否，跳订单确认页面
        if (this.shopDetailObj.productTicket === null) {
          this.$router.push({
            path:'/toShopPay',
            query: {
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopSpecList[this.checkSpec],
              shopCount: this.count
            }
          });
        }else{
          let currentTime = new Date();
          if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
            this.$router.push({
              path:'/toShopPay',
              query: {
                shopDetailObj: this.shopDetailObj,
                shopSpecList: this.shopSpecList[this.checkSpec],
                shopCount: this.count
              }
            });
          }else{
            this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
          }
        }
      }
    },
    getNewProductCommentList(val) {
      this.pageNo = val;
      this.getProductCommentList(val, 10)
    },
    getProductCommentList(pageNo, pageSize){
      getCommentList(pageNo, pageSize,{productId:this.$route.query.productId}).then(res => {
        if (res.code === '0') {
          this.commentList = res.data.resultList;
          this.commentListCurrent = res.data.totalCount;
        }else{
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },

    //秒杀下单
    buysecKill(){
      //多规格
      if(this.shopDetailObj.multiSpec) {
        //  如果为多规格商品，判断有没有选择规格信息
        if (this.shopSpecIdPost === null) {
          this.$Notice.warning({title: '请选择商品规格',desc: ''});
        } else {
          let currentTime = new Date();
          // 判断多规格商品，是属于哪种商品类型，productTicket有值代表商品为“票”类型的商品
          if (this.shopDetailObj.productTicket === null) {
            let data={
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopSpecList[this.checkSpec],
              shopCount: this.count
            }
            localStorage.setItem("secKillData", JSON.stringify(data));
            this.$router.push({path:'/secKillSubmit'});
          }else {
            //  判断当前购买时间在不在该“票”类型商品的售票期间内
            if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
              let data={
                shopDetailObj: this.shopDetailObj,
                shopSpecList: this.shopSpecList[this.checkSpec],
                shopCount: this.count
              }
              localStorage.setItem("secKillData", JSON.stringify(data));
              this.$router.push({path:'/secKillSubmit'});
            }else{
              this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
            }
          }
        }
      }else{
        //单规格
        if (this.shopDetailObj.productTicket === null) {
          let data={
            shopDetailObj: this.shopDetailObj,
            shopSpecList: this.shopDetailObj.productSpecResponseList[0],
            shopCount: this.count
          }
          localStorage.setItem("secKillData", JSON.stringify(data));
          this.$router.push({path:'/secKillSubmit'});
        }else{
          let currentTime = new Date();
          if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
            let data={
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopDetailObj.productSpecResponseList[0],
              shopCount: this.count
            }
            localStorage.setItem("secKillData", JSON.stringify(data));
            this.$router.push({path:'/secKillSubmit'});
          }else{
            this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
          }
        }
      }
    },

  //  多规格商品发起拼团
    buySpecFight(){
      //  如果为多规格商品，判断有没有选择规格信息
      if (this.shopSpecIdPost === null) {
        this.$Notice.warning({title: '请选择商品规格',desc: ''});
      } else {
        let currentTime = new Date();
        // 判断多规格商品，是属于哪种商品类型，productTicket有值代表商品为“票”类型的商品
        if (this.shopDetailObj.productTicket === null) {
          let data={
            shopDetailObj: this.shopDetailObj,
            shopSpecList: this.shopSpecList[this.checkSpec],
            shopCount: this.count,
            parentId: '0'
          }
          localStorage.setItem("fightShop", JSON.stringify(data));
          this.$router.push({path:'/shopFight'});
        }else {
          //  判断当前购买时间在不在该“票”类型商品的售票期间内
          if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
            let data={
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopSpecList[this.checkSpec],
              shopCount: this.count,
              parentId: '0'
            }
            localStorage.setItem("fightShop", JSON.stringify(data));
            this.$router.push({path:'/shopFight'});
          }else{
            this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
          }
        }
      }
    },
    //  单规格商品发起拼团
    buySingleFight(){
      if (this.shopDetailObj.productTicket === null) {
        let data={
          shopDetailObj: this.shopDetailObj,
          shopSpecList: this.shopDetailObj.productSpecResponseList[0],
          shopCount: this.count,
          parentId: '0'
        }
        localStorage.setItem("fightShop", JSON.stringify(data));
        this.$router.push({path:'/shopFight'});
      }else{
        let currentTime = new Date();
        if (currentTime >= new Date(this.shopDetailObj.productTicket.startDate.replace('/-/g', '/')) && currentTime <= new Date(this.shopDetailObj.productTicket.endDate.replace('/-/g', '/'))) {
          let data={
            shopDetailObj: this.shopDetailObj,
            shopSpecList: this.shopDetailObj.productSpecResponseList[0],
            shopCount: this.count,
            parentId: '0'
          }
          localStorage.setItem("fightShop", JSON.stringify(data));
          this.$router.push({path:'/shopFight'});
        }else{
          this.$Notice.warning({title: '警告', desc: '请在售票期间内购买！'});
        }
      }
    },
    goFightOrder(v){
      if(this.shopDetailObj.multiSpec) {
          let data={
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopSpecList[this.checkSpec],
              shopCount: this.count,
              parentId: v.orderId
          }
          localStorage.setItem("fightShop", JSON.stringify(data));
          this.$router.push({path:'/shopFight'});
      }else {
          let data={
              shopDetailObj: this.shopDetailObj,
              shopSpecList: this.shopDetailObj.productSpecResponseList[0],
              shopCount: this.count,
              parentId: v.orderId
          }
          localStorage.setItem("fightShop", JSON.stringify(data));
          this.$router.push({path:'/shopFight'});
      }
    },
    countDownS_cb: function (x) {},
    countDownE_cb: function (x) {}
  }
};
</script>

<style scoped>
  .is-selected {
    color: #1989FA;
  }
ul,li {
  padding:0;
  margin:0;
  list-style:none
}
.container{
  background-color: #F5F5F5;
  padding-bottom: 30px;
}
.shopDetailActive{
  border: 1px solid #FC405E;
  border-radius: 5px;
}
.mallShopDetail-content{
  width: 1008px;
  height: auto;
  margin: 0px auto;
}
.mallShopDetail-content-head{
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.mallShopDetail-content-headLeft{
  width: 80%;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
}
.mallShopDetail-content-headLeft-left{
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mallShopDetail-content-headLeft-right{
  width: 52%;
  position: relative;
}
.mallShopDetail-content-headLeft-right>div{
  width: 100%;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(1)>p{
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #666666;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(1)>p>span:nth-of-type(1){
  width: 70%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(1)>p>span:nth-of-type(2){
  width: 20%;
  font-size: 14px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2){
  width: 100%;
  margin-top: 20px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2)>div{
  width: 100%;
  background: #F5F5F5;
  border-radius: 8px;
  padding: 10px;
  display: flex;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2)>div>p:nth-of-type(1){
  width: 40%;
  line-height: 40px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2)>div>p:nth-of-type(1)>span{
  display: inline-block;
  color: #FC405E;
  font-weight: bold;
  font-size: 16px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2)>div>p:nth-of-type(2){
  width: 40%;
  line-height: 40px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(2)>p{
  font-size: 12px;
  margin-top: 20px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(3){
  width: 100%;
  display: flex;
  margin-top: 20px;
  line-height: 25px;
  justify-content: space-between;
  font-size: 16px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(4){
  width: 100%;
  display: flex;
  font-size: 16px;
  margin-top: 30px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(4)>div:nth-of-type(1){
  width: 12%;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(4)>div:nth-of-type(2){
  width: 88%;
  display: flex;
  flex-wrap: wrap;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(4)>div:nth-of-type(2)>p{
  width: 90px;
  height: 30px;
  border: 1px solid #E0E0E0;
  font-size: 12px;
  padding: 5px;
  border-radius: 4px;
  margin-left: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(4)>div:nth-of-type(2)>p:hover{
  background: #FC405E;
  color: #ffffff;
}
.selectSpec{
  background: #FC405E;
  color: #ffffff;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(6){
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(6)>button{
  width: 100px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-style: none;
  outline: none;
  border-radius: 6px;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(6)>button:nth-of-type(1){
  background: #FC405E;
  color: #ffffff;
}
.mallShopDetail-content-headLeft-right>div:nth-of-type(6)>button:nth-of-type(2){
  background: #ffffff;
  color: #FC405E;
  border: 1px solid #FC405E;
}
.mallShopDetail-content-headLeft-showImg{
  width: 100%;
  height: 350px;
  cursor: pointer;
}
.mallShopDetail-content-headLeft-showImg img{
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.mallShopDetail-content-headLeft-imgList{
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.mallShopDetail-content-headLeft-imgSmall {
  width: 68px;
  height: 68px;
  border-radius: 5px;
  cursor: pointer;
}
.mallShopDetail-content-headLeft-imgSmall img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.mallShopDetail-content-headRight{
  width: 18%;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
}
.mallShopDetail-content-headRight>img{
  width: 100%;
  border-radius: 8px;
}
.mallShopDetail-content-headRight>h3{
  width: 100%;
  margin-top: 10px;
}
.mallShopDetail-content-headRight>p{
  width: 100%;
  margin-top: 20px;
}
.mallShopDetail-content-headRight>div{
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.mallShopDetail-content-headRight>div>button{
  border-style: none;
  outline: none;
  width: 60px;
  height: 24px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
}
.mallShopDetail-content-headRight>div>button:nth-of-type(1){
  border: 1px solid #E0E0E0;
  color: #999999
}
.mallShopDetail-content-headRight>div>button:nth-of-type(2){
  border: 1px solid #FC405E;
  background: #FCCBD2;
  color: #FC405E
}
.mallShopDetail-content-headRight>div>button:nth-of-type(1):hover{
  border: 1px solid #FC405E;
  color: #FC405E;
  background: #ffffff;
}
.mallShopDetail-content-headRight>div>button:nth-of-type(2):hover{
  background: #FC405E;
  color: #ffffff;
}
.mallShopDetail-content-div{
  width: 80%;
  padding: 20px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 12px;
}
.mallShopDetail-content-divtab{
  width: 40%;
  display: flex;
  justify-content: space-around;
}
.tab{
  color: #999999;
  font-size: 14px;
}
.tab:hover{
  color: #FC405E;
  cursor: pointer;
}
.tabActive{
  color: #FC405E;
  border-bottom: 2px solid #FC405E;
}
.mallShopDetail-content-divtabbody{
  width: 100%;
  padding: 20px;
}
.mallShopDetail-content-divtabbody>div{
  width: 100%;
}
.mallShopDetail-content-divtabbody>div:nth-of-type(1){
  color: #999999;
  font-size: 16px;
  line-height: 30px;
}
.mallShopDetail-noComment{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
  color: #666666;
}
.mallShopDetail-comment{
  width: 100%;
}
.mallShopDetail-comment-model{
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 20px;
  border-bottom: 1px solid #E0E0E0;
}
.mallShopDetail-comment-model:nth-last-of-type(1) {
  border-bottom: 1px solid #ffffff;
}
.mallShopDetail-comment-model>div:nth-of-type(1) {
  width: 100%;
  display: flex;
  justify-content: left;
}
.mallShopDetail-comment-model>div:nth-of-type(1)>p{
  line-height: 30px;
  margin-right: 20px;
}
.mallShopDetail-comment-model>img{
  width: 50px;
  height: 50px;
}
.attractionsDetail-content-pageList{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
.mallShopDetail-group-div{
  width: 80%;
  padding: 20px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 12px;
}
.group-seamless{
  width: 100%;
  max-height: 200px;
  overflow: hidden;
}
.mallShopDetail-group-div>p:first-child{
  font-size: 18px;
  padding-bottom: 10px;
  color: #333333;
}
.mallShopDetail-group-div ul{
  width: 100%;
}
.mallShopDetail-group-div ul>li{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.mallShopDetail-group-div ul>li>div{
  width: 33%;
  display: flex;
  align-items: center;
}
.mallShopDetail-group-div ul>li>div:nth-of-type(1){
  justify-content: left;
}
.mallShopDetail-group-div ul>li>div:nth-of-type(1)>img{
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.mallShopDetail-group-div ul>li>div:nth-of-type(1)>span{
  margin-left: 15px;
  font-size: 16px;
  color: #333333;
}
.mallShopDetail-group-div ul>li>div:nth-of-type(2){
  justify-content: center;
  color: #999999;
  font-size: 16px;
}
.mallShopDetail-group-div ul>li>div:nth-of-type(3){
  justify-content: flex-end;
}
.seamless-warp{
  height: 100%;
  overflow: hidden;
}
.el-calendar{
  font-size: 10px !important;
  width: 417px;
  font-weight: bold;
}
  /deep/ .el-calendar-table .el-calendar-day{
  padding: 3px !important;
  height: 50px !important;
  line-height: 15px;
}
  /deep/ .el-calendar__body{
    padding: 12px 0px 35px !important
  }
    /deep/ .el-calendar__header{
    padding: 0 !important
  }

</style>
