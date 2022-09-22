<template>
    <div class="container">
      <Search></Search>
       <div class="home">
         <div class="attractionsDetail-content-taocan">
           <div class="attractionsDetail-content-packagelist">
             <ul>
               <li>
                 <div>
                   <img v-if="guideDate.headImgUrl" :src="guideDate.headImgUrl" alt="">
                   <img v-else src="/static/img/glw-logo.7651d3c.png" alt="">
                 </div>
                 <div>
                   <p>导游名称:{{guideDate.name}}  带团年限:{{guideDate.workYear}}年</p>
                   <p>联系电话:{{guideDate.guidePhone}}</p>
                   <p>{{$t("operate.Money")}}<span style="font-size: 25px;font-weight: bold">{{guideDate.price}}</span>/天     (级别:{{guideDate.levelName}})</p>
                   <p v-if="guideDate.remark">{{'个性签名:'+guideDate.remark}}</p>
                 </div>
               </li>
             </ul>
             <div style="margin-top: 20px;width:100%;text-align: left;padding: 10px 0;">
               <p style="margin:0 0 20px 0;font-size: 20px;font-weight: bold">导游标签</p>
               <span v-for="item in guideDate.userCategories" style="margin-right:5px;">
               <el-tag v-if="item.type==1">{{item.typeName}}:{{item.name}}</el-tag>
               <el-tag v-if="item.type==2" type="success">{{item.typeName}}:{{item.name}}</el-tag>
               <el-tag v-if="item.type==4" type="warning">{{item.typeName}}:{{item.name}}</el-tag>
               </span>
             </div>
             <div style="margin: 20px 0;width:100%;text-align: left;padding: 10px 0;">
               <p style="margin:0 0 20px 0;font-size: 20px;font-weight: bold">预定日期</p>
                 <el-date-picker
                   ref="datesRef"
                   v-model="guideBookDate"
                   style="width:80%;"
                   size="small"
                   type="dates"
                   :editable="false"
                   :picker-options="options3"
                   format="yyyy-MM-dd"
                   value-format="yyyy-MM-dd"
                   placeholder="选择一个或多个日期(不可选中的日期为已经被预定)"
                 />
               <Button type="error" @click="goSubmint">立即预定</Button>
             </div>
           </div>
       </div>
      </div>
    </div>
</template>

<script>

import { getguide } from '../api/guide';
import Search from '@/components/Search';
export default {
  name: 'mallShopDetail',
  components: {
    Search,
  },
  data () {
    return {
      guideDate:{},
      guideBookDate:[],
      options3: {
        disabledDate:this.disabledDate
      },
    };
  },
  created () {
    let id=this.$route.query.guideId
    getguide(id,1).then(res=>{
      this.guideDate=res.data
    })
  },
  methods:{
    disabledDate (date) {
      var time=this.$moment(date).format('YYYY-MM-DD')
      var newuserRests=[]
      if(this.guideDate.userRests.length > 0){
        for(var s=0;s<this.guideDate.userRests.length;s++){
          newuserRests.push(this.guideDate.userRests[s].restDate)
        }
        if(this.guideDate.orderDates != null){
          var newuserOrderRests = newuserRests.concat(this.guideDate.orderDates)
          if(newuserOrderRests.indexOf(time) >=0){
            return true
          }
          return false || date.valueOf() < Date.now() - 86400000;
        }else {
          if(newuserRests.indexOf(time) >=0){
            return true
          }
          return false || date.valueOf() < Date.now() - 86400000;
        }
      } else {
        if(this.guideDate.orderDates != null){
          if(this.guideDate.orderDates.indexOf(time) >=0){
            return true
          }
          return false || date.valueOf() < Date.now() - 86400000;
        }else {
          return date.valueOf() < Date.now() - 86400000;
        }
      }
    },
    goSubmint(){
      if(this.guideBookDate.length<1){
        this.$Notice.warning({title: '请选择预定日期',desc: ''});
      }else if(this.guideBookDate.length >10){
        this.$Notice.warning({title: '预定日期不能超过十天',desc: ''});
      }else {
        let guideData={
          guide: this.guideDate,guideBookDate:this.guideBookDate
        }
        localStorage.setItem("guideData", JSON.stringify(guideData));
        this.$router.push({
          path: '/guideSubmit',
        });
      }
    }
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
.home{
  width: 60%;
  height: auto;
  margin: 22px auto;
  background: #FFFFFF;
  border-radius: 10px;
  text-align: center;
}
  .attractionsDetail-content-packagelist{
    width: 100%;
    padding: 0px 10%;
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
</style>
