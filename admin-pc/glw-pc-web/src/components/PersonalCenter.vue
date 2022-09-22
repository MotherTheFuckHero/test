<template>
  <div class="container">
    <Search></Search>
    <div class="content">
      <Row>
        <Col :md="{ span: 3 }" :lg="{ span: 3 }">
          <div class="content-navbar">
            <ul>
              <h2>{{this.$t("personalCenter.personal")}}</h2>
              <li :class="{ active : i === isActive }" v-for="(v, i) in liLabel" :key="i" @click="goLiDetail(v, i)">
                {{v.label}}
              </li>
            </ul>
          </div>
        </Col>
        <Col :md="{ span: 19, offset: 1 }" :lg="{ span: 19, offset: 1 }">
          <div class="content-body">
            <person :is="currentTab" :userInfo="userInfo" keep-alive></person>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import person from './person/PersonInfo';
import order from './person/MyOrderInfo';
import general from './person/GeneralInfo';
import focus from './person/MyFocusInfo';
import guide from './person/guide';
import toguide from './person/toguide';
import wallet from './person/userWallet';
import coupon from './person/userCoupon';
// import account from './person/AccountInfo';
import service from './person/AfterService';
import Search from '@/components/Search';
import store from '@/vuex/store';
import {getisguide} from '../api/guide';
import { mapState } from 'vuex';
export default {
  name: 'PersonalCenter',
  inject:['reload'],
  components: {
    Search,
    person,
    order,
    general,
    focus,
    wallet,
    guide,
    toguide,
    coupon,
    // account,
    service
  },
  data () {
    return {
      currentTab: 'person',
      isActive: 0,
      liLabel: [
        {
          label: this.$t("personalCenter.personalInformation"),
          value: 'person'
        },
        {
          label: this.$t("personalCenter.myOrder"),
          value: 'order'
        },
        {
          label: this.$t("personalCenter.commonInformation"),
          value: 'general'
        },
        {
          label: this.$t("personalCenter.myCollection"),
          value: 'focus'
        },
        {
          label: this.$t("personalCenter.AfterSalesService"),
          value: 'service'
        },
        {
          label: this.$t("personalCenter.myAccount"),
          value: 'wallet'
        },
        {
          label: this.$t("personalCenter.coupon"),
          value: 'coupon'
        }
      ]
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    goLiDetail (v, i) {
      this.isActive = i;
      this.currentTab = v.value;
    }
  },
  created () {
    getisguide().then(res=>{
      if(res.data !=null && res.data.status ===1){
        this.liLabel.push({
          label: this.$t("personalCenter.guideCenter"),
          value: 'guide'
        })
      }else {
        this.liLabel.push({
          label: this.$t("personalCenter.guideApplication"),
          value: 'toguide'
        })
      }
    })
    if (this.$route.query.currentTab) {
      this.currentTab = this.$route.query.currentTab;
      this.isActive = 2;
    }else{
      this.currentTab = 'person'
    }
  },
  mounted () {
  },
  store
};
</script>

<style scoped>
  .container {
    background-color: #F5F5F5;
    padding-bottom: 20px;
  }
  .content {
    width: 1008px;
    margin: 0px auto;
  }
  .content-navbar{
    height: 600px;
    background: #ffffff;
    margin: 40px 0 20px 0;
    border-radius: 16px;
  }
  .content-navbar h2{
    padding: 30px 0 10px 0;
    margin:0 20px 0 20px;
    border-bottom: 1px solid #E0E0E0;
    text-align: center;
  }
  .content-navbar>ul,li{
    list-style:none
  }
  .content-navbar li{
    width: 100%;
    /*padding: 0 28px;*/
    text-align: center;
    font-size: 16px;
    margin-top: 25px;
    border-left: 4px solid #ffffff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    cursor: pointer;
  }
  .content-navbar li:hover{
    color: #FC405E;
  }
  .content-body{
    height: 600px;
    background: #FFFFFF;
    margin: 40px 0 20px 0;
    border-radius: 16px;
  }
</style>
<style>
  .active{
    border-left: 4px solid #FC405E !important;
    color: #FC405E;
  }
</style>
