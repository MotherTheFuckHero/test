<template>
    <div class="container">
      <Search></Search>
      <HomeNav></HomeNav>
      <div class="mallShop-content">
        <!--茶叶饮品-->
        <div v-if="item.modelList.length !== 0" v-for="(item, index) in modelArr" :key="index" class="teadrinks-content">
          <div class="teadrinks-head">
            <h2>{{item.modelName}}</h2>
            <p @click="goSectorMore(item)">更多</p>
          </div>
          <div class="teadrinks-body">
            <div v-for="(v, i) in item.modelList" :key="i" @click="goShopModelDetail(v)" class="teadrinks-body-content">
              <img :src="v.headImgUrl" alt="">
              <p>
                {{v.name}}
                <br>
                <Rate show-text disabled allow-half v-model="v.starScore">
                  <span style="color: #f5a623">{{v.starScore}}星</span>
                </Rate>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
import HomeNav from '@/components/nav/HomeNav';
import { getCategoryPanel, getpanelMerchantLike } from '../api/header';
export default {
  name: 'MallShop',
  components: {
    Search,
    HomeNav
  },
  data () {
    return {
      modelArr: []
    }
  },
  created() {
    this.$Loading.start();
    let panelsList = JSON.parse(localStorage.getItem('panelsList'));
    let panelObj = {};
    panelsList.forEach((item) => {
      if (item.name === "商城"){
        panelObj = item;
      }
    });
    getCategoryPanel(panelObj.id).then(res => {
      if (res.code === '0') {
        let categoryArr = [];
        for (let i in res.data) {
          let data = {
            categoryId: res.data[i].id,
            panelId: panelObj.id,
            merchantName: ''
          };
          getpanelMerchantLike(1, 5, data).then(response => {
            if (response.code === '0') {
              let newShopModel = {
                parentModelId: panelObj.id,
                modelId: res.data[i].id,
                modelName: res.data[i].name,
                modelList: response.data.resultList
              };
              categoryArr.push(newShopModel);
              this.modelArr = categoryArr;
              console.log(this.modelArr)
              this.$Loading.finish();
            }else{
              this.$Loading.error();
              this.$Notice.warning({title: '警告', desc: response.msg});
            }
          })
        }
      }else{
        this.$Loading.error();
        this.$Notice.warning({title: '警告', desc: res.msg});
      }
    });
  },
  methods: {
    goSectorMore(v) {
      this.$router.push({
        path: '/sectorDetails',
        query: {panelsId: v.parentModelId, panelId: v.modelId}
      });
    },
    goShopModelDetail(v) {
      this.$router.push({
        path: '/attractionsDetail',
        query: {merchantId: v.id}
      });
    },
  }
};
</script>

<style scoped>
  .container{
    background-color: #F5F5F5;
  }
  .mallShop-content {
    width: 1008px;
    height: auto;
    margin: 0px auto;
    padding-bottom: 30px;
  }
  .teadrinks-content{
    width: 100%;
    margin-top: 30px;
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0px 8px 21px 0px rgba(49, 49, 49, 0.05);
  }
  .teadrinks-head{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .teadrinks-head>p{
    font-size: 14px;
    color: #999999;
    cursor: pointer;
  }
  .teadrinks-body{
    width: 100%;
    display: flex;
    justify-content: left;
  }
  .teadrinks-body-content{
    width: 18%;
    height: 160px;
    margin-top: 20px;
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    margin-left: 20px;
  }
  .teadrinks-body-content:hover>p{
    width: 100%;
    height: 100%;
    padding-top: 40%;
    opacity: 0.8;
  }
  .teadrinks-body-content>img{
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .teadrinks-body-content>p{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    color: #ffffff;
    background: #000000;
    opacity: 0;
    text-align: center;
    padding: 5px 0;
    border-radius: 8px;
    transition: all 0.3s;
  }
  .teadrinks-body-content>p>span{
    font-size: 12px;
  }
</style>
