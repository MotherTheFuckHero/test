<template>
  <div>
    <!-- 首页、景点、商城 -->
    <div class="nav">
      <div class="navContent">
        <!-- 全部商品分类 -->
        <div class="commodity">
          <div class="commodity_center" @click="classifyShow">
            <!-- 分类图标 -->
            <div class="feiLeiIcon">
              <img src="../../images/1_0_icon_fenlei.png" alt />
            </div>
            <span class="commodity_title">{{$t("nav.classification")}}</span>
          </div>
        </div>
        <!-- 首页、品牌中心、积分商城... -->
        <div class="homePage_Option">
          <ul v-if="optionList" class="option-list">
            <li
              v-for="(item, i) in optionList"
              :key="i"
              :class="currentIndex == i ? 'line' : ''"
              @click="switchover(item, i)"
            >
              <span v-if="i != 6">{{ item.name }}</span>
              <span v-else>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-body" >
      <!-- 侧边导航 -->
      <div class="nav-side" ref="navSide" v-show="flag">
        <ul  >
          <li v-for="(item, index) in panelsList" :key="index" @mouseenter="showDetail(item.id)"  @mouseleave="hideDetail()" v-show="item.style !== 'ZONE'">
            <span class="nav-side-item" @click="goSectorDetail(item)">{{item.name}} <img alt="" style="height: 20px;float: right;margin-top:2px;" src="../../images/right.png"/></span>
          </li>
        </ul>
      </div>
      <div class="nav-content">
        <!-- 幻灯片 -->
        <Carousel autoplay loop :autoplay-speed="6000" :height="600">
          <CarouselItem  v-for="(item, index) in bannerList" :key="index">
            <img alt="" class="navImg" :src="item.imgUrl" @click="imgUrls(item)">
          </CarouselItem>
        </Carousel>
      </div>
      <transition name="fade">
        <div class="detail-item-panel panel-1" :duration="{ enter: 100, leave: 100 }" v-show="panel1" ref="itemPanel1"  @mouseenter="showDetails(1)" @mouseleave="hideDetail(1)">
          <ul style="width: 600px;padding: 20px 0">
            <li v-for="(items, index) in CategoryList" :key="index" class="detail-item-row">
              <span class="detail-item-title" @click="goSectorDetails(items)">{{items.name}}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="videoHome" style="position: fixed;right: 50px;bottom: 50px" v-if="this.currentIndex==0">
      <video width="270" height="270" controls loop>
        <source src="https://glw-public.oss-cn-beijing.aliyuncs.com/video/%E2%80%9C%E8%BF%87%E6%9D%A5%E7%8E%A9%E2%80%9D%E5%AE%A3%E4%BC%A0%E7%89%87.mp4" type="video/mp4">
        <source src="https://glw-public.oss-cn-beijing.aliyuncs.com/video/%E2%80%9C%E8%BF%87%E6%9D%A5%E7%8E%A9%E2%80%9D%E5%AE%A3%E4%BC%A0%E7%89%87.mp4" type="video/ogg">
        您的浏览器不支持 video 标签。
      </video>
    </div>
  </div>
</template>

<script>
    import { getbanner,getpanels,getCategoryPanel } from '../../api/header'
    export default {
        name: 'HomeNav',
        data () {
            return {
                panel1: false,
                flag: true,
                bannerList:[],
                panelsList:[],
                CategoryList:[],
                optionList: [
                    // "首页",
                    // "景点",
                    // "商城",
                    // // "海外直邮",
                    // "关于我们",
                ],
                currentIndex: 0, //当前下划线索引
            };
        },
        props: {
            parentPanelList: {
                type: Array
            }
        },
        methods: {
            //   点击每个首页等选项进行切换
            switchover(v, i) {
                this.optionList = this.parentPanelList;
                this.currentIndex = i;
                sessionStorage.setItem("head_nav", i);
                if (v.id === 998) {
                    this.$router.push({path: "/"});
                }else  if(v.id === 997) {
                    this.$router.push({ path: "/news" });
                }else  if(v.id === 999) {
                    this.$router.push({ path: "/aboutUs" });
                }else{
                    this.$router.push({
                        path: "/attractions",
                        query: {
                            panelId: v.id
                        }
                    });
                }
            },
            // 点击全部分类 选择框显示
            classifyShow() {
                this.flag = !this.flag;
            },
            showDetail (index) {
                getCategoryPanel(index).then(res=>{
                    this.CategoryList=res.data
                    this.panel1 = true
                })
            },
            showDetails (index) {
                this.panel1 = true
            },
            hideDetail (index) {
                this.panel1 = false
            },

            //进分类筛选(不携带子板块id)
            goSectorDetail(val){
              if(val.style=='GUIDE'){
                this.$router.push({
                  path:'/guideList',
                });
              }else {
                this.$router.push({
                  path:'/sectorDetails',
                  query:{panelsId:val.id,panelId:null}
                });
              }
            },

            //进分类筛选(携带子板块id)
            goSectorDetails(val){
                this.$router.push({
                    path:'/sectorDetails',
                    query:{panelsId:val.panelId,panelId:val.id}
                });
            },
          //优惠券列表
          imgUrls(val){
             console.log(val)
             //优惠券
              if(val.type==9){
                this.$router.push({
                  path:'/couponList',
                });
              }
            },
        },
        created() {
            let companyId = JSON.parse(localStorage.getItem("companyId"));
          localStorage.removeItem("panelsList");
            getpanels(companyId).then(res=>{
                for (let i in res.data){
                    if (res.data[i].name !== '生鲜'){
                        this.panelsList.push(res.data[i])
                    }
                }
                localStorage.setItem("panelsList", JSON.stringify(this.panelsList));
            })
            getbanner(companyId).then(res=>{

                this.bannerList=res.data
            })
            if (sessionStorage.getItem("head_nav") != null) {
                this.currentIndex = sessionStorage.getItem("head_nav");
            }
            if (this.parentPanelList){
                this.optionList = this.parentPanelList
            }
            // window.addEventListener('setItem',() => {
            //     JSON.parse(localStorage.getItem("newPanelList")).forEach(item => {
            //         this.optionList.push(item.name)
            //     })
            //     console.log(this.optionList)
            // })
        },
        mounted () {
            this.$refs.itemPanel1.style.left =
                this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
            this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + 'px';
        },
        updated () {
            this.$refs.itemPanel1.style.left =
                this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
            this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + 'px';
        },
    };
</script>

<style scoped>

  .navImg{
    width: 100%;
    height:100%;
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
    image-rendering: crisp-edges;    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }
  /*大的导航信息，包含导航，幻灯片等*/
  .nav-body {
    width: 100%;
    height:600px;
    margin: 0px auto;
    position:relative;
  }
  .nav-side {
    width: 200px;
    height: 100%;
    padding: 0px;
    color: #fff;
    background-color:rgba(51, 51, 51, 0.7);
    position: absolute;
    top:0;
    z-index: 111;
    left:350px;
  }
  .nav-side ul {
    width: 100%;
    padding: 0px;
    padding-top: 15px;
    list-style: none;
  }
  .nav-side li {
    padding: 7.5px 15px;
    font-size: 14px;
    line-height:20px;
    text-align: center;
  }
  .nav-side li:hover {
    background: #999395;
  }
  .nav-side-item:hover {
    cursor: pointer;
    color: #c81623;
  }

  /*导航内容*/
  .nav-content {
    width: 60%;
    height: 600px;
    overflow: hidden;
    float: left;
    position: absolute;
    left: 350px;
  }

  /*导航图片*/
  .nav-show-img {
    margin-top: 10px;
    float: left;
  }
  .nav-show-img:nth-child(2) {
    margin-left: 12px;
  }
  /*显示商品*/
  .content {
    width: 100%;
  }
  /*显示商品详细信息*/
  .detail-item-panel {
    /*width: 815px;*/
    height: 600px;
    background-color: #fff;
    position: absolute;
    /*top: 168px;*/
    /*left: 389px;*/
    z-index: 999;
  }
  .nav-detail-item {
    margin-left: 26px;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    color: #eee;
  }
  .nav-detail-item span {
    padding: 6px;
    padding-left: 12px;
    margin-left: 15px;
    font-size: 12px;
    background-color: #6e6568;
  }
  .nav-detail-item span:hover {
    margin-left: 15px;
    background-color: #f44336;
  }
  .detail-item-panel ul {
    list-style: none;
  }
  .detail-item-panel li {
    line-height: 38px;
    margin-left: 40px;
  }
  .detail-item-title {
    padding-right: 6px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    color: #555555;
  }
  .detail-item-title:hover {
    color: #d9534f;
  }
  .detail-item-row {
    float: left;
  }
  .detail-item-row a {
    color: #555555;
  }
  .detail-item{
    font-size: 14px;
    padding-left: 12px;
    padding-right: 8px;
    cursor: pointer;
    border-left: 1px solid #ccc;
  }
  .detail-item:hover {
    color: #d9534f;
  }

  /*// 首页、品牌中心、积分商城*/
  .nav {
    width: 100%;
    height: 50px;
    background: #FFFFFF;

  }
  .navContent {
    /*width: 1030px;*/
    height: 100%;
    margin: 0 auto;
    /*display: flex;*/
    justify-content: space-between;
    font-size: 16px;

  }
  /*// 全部商品分类*/
  .commodity {
    width: 200px!important;
    background:rgba(70, 177, 53, 1);
    /*display: flex;*/
    margin-left:350px;
    text-align: center;
    position: absolute;
  }
  .commodity_center {
    width: 100%;
    height: 100%;
    /*margin: 0 auto;*/
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    cursor: pointer;
    text-align: center;
  }
  /*// 全部分类小图片*/
  .feiLeiIcon {
    width: 22px;
    height: 18px;
    margin: 16px 0;
  }
  /*//    全部分类文字*/
  .commodity_title {
    line-height: 50px;
    color: #ffff;
  }
  /*// 首页、品牌中心、积分商城...*/
  .homePage_Option {
    width: 100%;
    height: 100%;
    padding:0 300px 0 560px;
  }
  .option-list {
    width: 100%;
    height: 95%;
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    line-height: 50px;
  }
  .option-list li {
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
    font-weight: 400;
  }
  /*// 选项下标线*/
  .line {
    color: rgba(70, 177, 53, 1) !important;
    border-bottom: 2px solid rgba(70, 177, 53, 1);
  }
</style>
