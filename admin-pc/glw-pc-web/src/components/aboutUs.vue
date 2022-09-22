<template>
  <div>
    <Search></Search>
    <HomeNav :parentPanelList="panelList"></HomeNav>
      <div class="main" style="text-align:center;position: relative;margin-bottom: 30px;">
        <p style="color:black;font-size:36px;margin:40px 0;">{{this.$t("aboutUs.companyProfile")}}</p>
        <img alt="" class="hs" style="width:40%;border-radius:10px;" src="../images/gongsi.jpg"/>
        <div style="font-size:16px;width:40%;height:auto;float:right;padding-right:10%;text-align: left;display: inline-block;line-height:33px;">
          <p style=" text-indent:2em;">{{this.$t("aboutUs.companyProfileOne")}}</p>
          <p style=" text-indent:2em;">{{this.$t("aboutUs.companyProfileTwo")}}</p>
        </div>
      </div>
    <div class="beijing1" style="width:100%;height:300px;overflow: hidden;text-align: center">
      <span class="biao1" style="vertical-align: inherit;">{{this.$t("aboutUs.companyHonor")}}</span>
    </div>
    <div  class="rongyu">
      <div v-for="(item,index) in rongList" :key="index">
        <img alt="" :src="item"/>
      </div>
    </div>
    <div class="hehuo" >
      <p>{{this.$t("aboutUs.companyPartner")}}</p>
      <div v-for="(item,index) in hehuoList" :key="index">
        <img alt="" :src="item.img"/>
        <h1>{{item.titel}}</h1>
        <p>{{item.content}}</p>
      </div>
    </div>
    <div style="text-align:center;margin:60px 0 0 0;">
      <p style="color:black;font-size:36px;margin:40px 0;">{{this.$t("aboutUs.joinUs")}}</p>
      <div style="width:40%;display: inline-block;margin-top:50px;">

        <h1 style="color:black;font-size:24px;">{{this.$t("aboutUs.joinUsOne")}}</h1>
        <ul style="font-size:16px;line-height:40px;">
          <li><span>{{this.$t("aboutUs.joinUsTwo")}}</span></li>
          <li><span>{{this.$t("aboutUs.joinUsThree")}}</span></li>
          <li><img alt="" style=" vertical-align: middle;height:30px;" src="../images/zhi1.png"/><span style="margin:0 10px;font-weight: bold;"><a style="color:red;" href="https://mp.weixin.qq.com/s/fQfDxZILdrZACvmTRXawmA">{{this.$t("aboutUs.joinUsFour")}}</a></span><img  alt="" style=" vertical-align: middle;height:30px;" src="../images/zhi2.png"/></li>
        </ul>
      </div>
      <div style="width:40%;display: inline-block;">
        <h1 style="color:black;font-size:24px;">{{this.$t("aboutUs.contactInformation")}}</h1>
        <ul style="font-size:16px;line-height:40px;">
          <li>{{this.$t("aboutUs.contactInformationOne")}}</li>
          <li>{{this.$t("aboutUs.contactInformationTwo")}}</li>
          <li>{{this.$t("aboutUs.contactInformationThree")}}</li>
        </ul>
      </div>

      <p class="liaojie" style="text-align:right;font-size:14px;margin:50px 350px 0 0;font-weight: bold;">{{this.$t("aboutUs.contactInformationFour")}}<span style="color:red;font-weight: bold;">⬇⬇⬇ </span></p>

    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import HomeNav from '@/components/nav/HomeNav';
export default {
  name: 'aboutUs',
  data () {
    return {
      panelList: JSON.parse(localStorage.getItem("newPanelList")),
      rongList:[
        require("../images/rong1.jpg"),
        require("../images/rong2.jpg"),
        require("../images/rong3.jpg"),
        require("../images/rong6.jpg"),
        require("../images/rong5.jpg"),
        require("../images/rong1.jpg"),
      ],
      hehuoList:[
        {
          img:require("../images/he11.jpg"),
          titel:this.$t("aboutUs.companyPartnerOne"),
          content:this.$t("aboutUs.companyPartnerOneContent"),
        },
        {
          img:require("../images/he2.jpg"),
          titel:this.$t("aboutUs.companyPartnerTwo"),
          content:this.$t("aboutUs.companyPartnerTwoContent"),
        },
        {
          img:require("../images/he3.jpg"),
          titel:this.$t("aboutUs.companyPartnerThree"),
          content:this.$t("aboutUs.companyPartnerThreeContent"),
        },
        {
          img:require("../images/he4.jpg"),
          titel:this.$t("aboutUs.companyPartnerFour"),
          content:this.$t("aboutUs.companyPartnerFourContent"),
        },
        {
          img:require("../images/he5.jpg"),
          titel:this.$t("aboutUs.companyPartnerFive"),
          content:this.$t("aboutUs.companyPartnerFiveContent"),
        },
        {
          img:require("../images/he6.jpg"),
          titel:this.$t("aboutUs.companyPartnerSix"),
          content:this.$t("aboutUs.companyPartnerSixContent"),
        },
        {
          img:require("../images/he7.png"),
          titel:this.$t("aboutUs.companyPartnerSeven"),
          content:this.$t("aboutUs.companyPartnerSevenContent"),
        },
        {
          img:require("../images/he8.jpg"),
          titel:this.$t("aboutUs.companyPartnerEight"),
          content:this.$t("aboutUs.companyPartnerEightContent")
        }
      ]
    };
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
  components: {
    Search,
    HomeNav,
  },
};
</script>

<style scoped>
.biao1{
    display: inline-block;
    color: #fff;
    font-weight: 300;
    font-size: 170px;
    line-height: 60px;
    font-family: "Just Another Hand",cursive;
    text-transform: uppercase;
    margin: 100px auto;
  }
  .beijing1{
    background: url("../images/pchome.jpg") no-repeat;
    background-size:100% 100%;
    background-attachment: fixed;
  }
  .liaojie:hover{
    color:#2BAD00 !important;
  }
  ul li{
    list-style: none;
  }
  .rongyu{
    width:100%;
    margin:40px auto;
    text-align: center;
  }
  .rongyu div{
    width:25%;
    height:300px;
    background:#E9E9E5;
    margin:20px 20px;
    border-radius:10px;
    display: inline-block;
  }
.rongyu div img{
  width:100%;
  height:100%;
  border-radius:10px;
}
  .hehuo{
    text-align:center;
    margin:60px 0;
  }
  .hehuo p{
    color:black;
    font-size:36px;
    margin:40px 0;
  }
  .hehuo div{
    width:18%;
    height:400px;
    background:#fff;
    margin:20px 20px;
    border-radius:10px;
    display: inline-block;
    overflow: hidden;
  }
.hehuo div img{
  width:100%;
  height:200px;
  }
.hehuo div h1{
  font-size:20px;
  color:black;
  line-height:50px;
}
.hehuo div p{
  font-size:14px;
  line-height:30px;
  margin: 0;
}
</style>
