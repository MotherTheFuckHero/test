<template>
    <div class="container">
      <Search @input="searchValueGet"></Search>
      <div class="sectorDetails-content">
        <div class="sectorDetails-content-head">
          <div class="sectorDetails-content-headDad">
            <p>{{this.$t("shopCar.panel")}}：</p>
            <div>
              <p :class="{ sectorActive : isActive === i }" v-for="(v, i) in headDadList" :key="i" @click="getChildList(v, i)">{{v.name}}</p>
            </div>
          </div>
          <div class="sectorDetails-content-headSon" v-if="isActive !== 0 && headSonList.length !== 0">
            <p>{{this.$t("shopCar.classification")}}：</p>
            <div>
              <p :class="{ sectorSonActive : isSonActive === i }" v-for="(v, i) in headSonList" :key="i" @click="getChildSectorList(v, i)">{{v.name}}</p>
            </div>
          </div>
        </div>
        <div class="sectorDetails-content-div">
          <div v-for="(v, i) in contentPanelList" :key="i" @click="goShopDetail(v.id)">
            <div :style="{backgroundImage: 'url(' + v.headImgUrl + ')'}"></div>
            <p>{{v.name}}</p>
          </div>
          <p v-if="contentPanelList.length === 0" class="sectorDetails-content-divquesheng">
            <img alt="" src="../images/fenlei-qusheng.png">
          </p>
          <p v-if="contentPanelList.length === 0" class="sectorDetails-content-divquesheng">
            {{this.$t("shopCar.personal")}}
          </p>
        </div>
        <Page class="sectorDetails-content-pageList" :total="shopPageCurrent" @on-change="getNewShopList"/>
      </div>
    </div>
</template>

<script>
import { getCategoryPanel, getpanelMerchant, getpanelMerchantLike } from '../api/header';
import Search from '@/components/Search';
export default {
  name: 'SectorDetails',
  components: {
    Search
  },
  data () {
    return {
      isActive: 0,
      isSonActive: 0,
      headDadList: [],
      headSonList: [],
      contentPanelList: [],
      panelsId: '',
      panelId: '',
      lang: '',
      searchValue: '',
      shopPageCurrent: 1,
      pageNo: 1
    };
  },
  created () {
    this.lang=localStorage.getItem('lang')
    let companyList = JSON.parse(localStorage.getItem('panelsList'));
    if(this.lang=='zh'){
      companyList.unshift({id: 0, name: '全部'});
    }else if(this.lang=='en'){
      companyList.unshift({id: 0, name: 'whole'});
    }else{
      companyList.unshift({id: 0, name: 'все'});
    }
    this.headDadList = companyList;
    this.panelsId = this.$route.query.panelsId;
    this.panelId = this.$route.query.panelId;
    this.getIsSource();
  },
  methods: {
    // 分页
    getNewShopList (val) {
      if (this.isActive === 0) {
        this.$Loading.start();
        this.pageNo = val;
        this.getAllMerchantList();
      } else {
        if (this.headSonList.length !== 0) {
          this.$Loading.start();
          this.pageNo = val;
          this.getAllMerchantList(this.headDadList[this.isActive].id, this.headSonList[this.isSonActive].id, this.searchValue);
        } else {
          this.$Loading.start();
          this.pageNo = val;
          this.getAllMerchantList(this.headDadList[this.isActive].id, '', this.searchValue);
        }
      }
    },
    getAllMerchantList (parentId, id, name) {
      this.shopPageCurrent = 0;
      let pageNo = this.pageNo;
      let pageSize = 10;
      let data = {
        categoryId: id,
        panelId: parentId,
        merchantName: name
      };
      getpanelMerchantLike(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.$Loading.finish();
          this.shopPageCurrent = res.data.totalCount;
          this.contentPanelList = res.data.resultList;
        } else {
          this.$Loading.error();
        }
      });
    },
    // 处理首页传过来的父子板块id
    getIsSource () {
      let _this = this;
      // 判断父子板块id来源，父板块id有值代表从除去首页搜索框进入
      if (_this.panelsId !== undefined) {
        _this.$Loading.start();
        _this.headDadList.forEach((item, index) => {
          if (Number(_this.panelsId) === item.id) {
            _this.isActive = index;
            if (_this.panelId !== null) {
              getCategoryPanel(_this.panelsId).then(res => {
                if (res.code === '0') {
                  _this.headSonList = res.data;
                  _this.headSonList.forEach((x, y) => {
                    if (Number(_this.panelId) === x.id) {
                      _this.isSonActive = y;
                      _this.getAllMerchantList(Number(_this.panelsId), _this.headSonList[_this.isSonActive].id, _this.searchValue);
                      // getpanelMerchant(_this.panelId).then(res => {
                      //   if (res.code === '0') {
                      //     _this.$Loading.finish();
                      //     _this.contentPanelList = res.data.resultList;
                      //   } else {
                      //     _this.$Loading.error();
                      //   }
                      // });
                    }
                  });
                }
              });
            } else {
              _this.getAllMerchantList(Number(_this.panelsId), '', _this.searchValue);
            }
          }
        });
      // 判断父子板块id来源，父板块id无值代表从首页搜索框进入,板块panelId默认为“全部”传空
      } else {
        _this.$Loading.start();
        _this.getAllMerchantList();
      }
    },
    // 父版块点击事件
    getChildList (item, index) {
      this.isActive = index;
      this.$Loading.start();
      if (index === 0) {
        this.getAllMerchantList('', '', this.searchValue);
      } else {
        getCategoryPanel(item.id).then(res => {
          if (res.code === '0') {
            this.headSonList = res.data;
            if (this.headSonList.length !== 0) {
              this.getAllMerchantList(item.id, this.headSonList[0].id, this.searchValue);
            } else {
              this.getAllMerchantList(item.id, '', this.searchValue);
            }
          }
        });
      }
    },
    // 子版块点击事件
    getChildSectorList (item, index) {
      this.isSonActive = index;
      this.$Loading.start();
      this.getAllMerchantList(this.headDadList[this.isActive].id, item.id, this.searchValue);
    },
    searchValueGet (data) {
      this.searchValue = data;
      this.$Loading.start();
      this.getAllMerchantList(this.headDadList.length !== 0?this.headDadList[this.isActive].id:'', this.headSonList.length !== 0?this.headSonList[this.isSonActive].id:'', this.searchValue);
    },
    goShopDetail (id) {
      this.$router.push({
        path: '/attractionsDetail',
        query: {merchantId: id}
      });
    }
  }
};
</script>

<style scoped>
.container{
  background-color: #F5F5F5;
  padding-bottom: 30px;
}
.sectorDetails-content{
  width: 1008px;
  height: auto;
  margin: 0px auto;
}
.sectorDetails-content-head{
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
}
.sectorDetails-content-headDad{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
.sectorDetails-content-headDad>p:nth-of-type(1){
  width: 5%;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
  font-size: 16px;
}
.sectorDetails-content-headDad>div{
  width: 95%;
  display: flex;
  flex-wrap: wrap;
}
.sectorDetails-content-headDad>div>p{
  margin-left: 20px;
  cursor: pointer;
  width: 80px;
  font-size: 16px;
  color: #999999;
  margin-top: 20px;
  text-align: center;
}
.sectorDetails-content-headDad>div>p:hover{
  color: #46B035;
}
.sectorActive{
  color: #46B035 !important;
}
.sectorDetails-content-headSon{
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #E0E0E0;
}
.sectorDetails-content-headSon>p:nth-of-type(1){
  width: 5%;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
  font-size: 16px;
}
.sectorDetails-content-headSon>div{
  width: 95%;
  display: flex;
  flex-wrap: wrap;
}
.sectorDetails-content-headSon>div>p{
  margin-left: 20px;
  cursor: pointer;
  width: 100px;
  font-size: 16px;
  color: #999999;
  margin-top: 20px;
  text-align: center;
}
.sectorDetails-content-headSon>div>p:hover{
  color: #46B035;
}
.sectorSonActive{
  color: #46B035 !important;
}
.sectorDetails-content-div{
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  padding-bottom: 25px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.sectorDetails-content-div>div{
  width: 22%;
  margin-left: 25px;
  margin-top: 25px;
  cursor: pointer;
}
.sectorDetails-content-div>div>div{
  width: 100%;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-left: 1px solid #E0E0E0;
  border-top: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.sectorDetails-content-div>div>p{
  width: 100%;
  height: 55px;
  text-align: center;
  margin-top: -5px;
  padding-top: 15px;
  border-left: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
}
.sectorDetails-content-divquesheng{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 16px;
}
.sectorDetails-content-pageList{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
</style>
