<template>
    <div class="container">
      <Search></Search>
      <HomeNav :parentPanelList="panelList"></HomeNav>
      <div class="attractions-content">
        <!--冰雪世界-->
        <div v-if="item.modelList.length !== 0" v-for="(item, index) in modelArr" :key="index" class="ice-world-content">
          <div class="ice-world-head">
            <h2>{{item.modelName}}</h2>
            <p @click="goSectorMore(item)">{{$t("operate.see")}}</p>
          </div>
          <div class="ice-world-body">
            <div v-for="(v, i) in item.modelList" :key="i" @click="goShopModelDetail(v)"  class="ice-world-body-model">
              <img :src="v.headImgUrl" alt="">
              <p>{{v.name}}</p>
              <p>
                <Rate v-model="v.starScore"></Rate>
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
  name: 'Attractions',
  components: {
    Search,
    HomeNav
  },
  data () {
    return {
        modelArr:[],
        panelList: JSON.parse(localStorage.getItem("newPanelList")),
    };
  },
  watch:{
      "$route" (newval, oldval){
          console.log(newval.query.panelId)
          getCategoryPanel(newval.query.panelId).then(res => {
              if (res.code === '0') {
                  let categoryArr = [];
                  for (let i in res.data) {
                      let data = {
                          categoryId: res.data[i].id,
                          panelId: newval.query.panelId,
                          merchantName: ''
                      };
                      getpanelMerchantLike(1, 5, data).then(response => {
                          if (response.code === '0') {
                              let newShopModel = {
                                  parentModelId: newval.query.panelId,
                                  modelId: res.data[i].id,
                                  modelName: res.data[i].name,
                                  modelList: response.data.resultList
                              };
                              categoryArr.push(newShopModel);
                              this.modelArr = categoryArr;
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
      }
  },
  created() {
    this.$Loading.start();
    let newPanelId = this.$route.query.panelId
    // let panelsList = JSON.parse(localStorage.getItem('panelsList'));
    // let panelObj = {};
    // panelsList.forEach((item) => {
    //   if (item.name === "景区景点"){
    //     panelObj = item;
    //   }
    // });
    getCategoryPanel(newPanelId).then(res => {
      if (res.code === '0') {
        let categoryArr = [];
        for (let i in res.data) {
          let data = {
              categoryId: res.data[i].id,
              panelId: newPanelId,
              merchantName: ''
          };
          getpanelMerchantLike(1, 5, data).then(response => {
            if (response.code === '0') {
              let newShopModel = {
                parentModelId: newPanelId,
                modelId: res.data[i].id,
                modelName: res.data[i].name,
                modelList: response.data.resultList
              };
              categoryArr.push(newShopModel);
              this.modelArr = categoryArr;
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
  },
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
.attractions-content {
  width: 1008px;
  height: auto;
  margin: 0px auto;
  padding-bottom: 30px;
}
.ice-world-content{
  width: 100%;
  margin-top: 30px;
  background: #ffffff;
  padding: 20px;
}
.ice-world-head{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(70, 177, 53, 1);
}
.ice-world-head>p{
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
.ice-world-body{
  width: 100%;
  display: flex;
  justify-content: left;
  margin-top: 22px;
}
.ice-world-body-model{
  width: 18%;
  height: 230px;
  box-shadow: 0px 7px 16px 0px rgba(86, 86, 86, 0.12);
  transition: all 0.3s;
  cursor: pointer;
  margin-left: 20px;
}
.ice-world-body-model:hover{
  box-shadow: 0px 7px 16px 0px rgba(86, 86, 86, 0.3);
}
.ice-world-body-model>img{
  width: 100%;
  height: 70%;
}
.ice-world-body-model>p:nth-of-type(1){
  width: 100%;
  padding: 0 10px;
  font-size: 14px;
  color: #666666;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.ice-world-body-model>p:nth-of-type(2){
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 5px;
}
.ice-world-body-model>p:nth-of-type(2)>span{
  display: inline-block;
}
.ice-world-body-model>p:nth-of-type(2)>span:nth-of-type(1){
  color: #FC405E;
  font-size: 16px;
  text-align: left;
  line-height: 20px;
}
.ice-world-body-model>p:nth-of-type(2)>span:nth-of-type(2){
  color: #999999;
  font-size: 12px;
  text-align: right;
  line-height: 20px;
}
</style>
