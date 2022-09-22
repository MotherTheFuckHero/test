<template>
    <div class="service-container">
      <h2>{{$t("personalCenter.TourguideCenter")}}</h2>
      <div class="service-body">
        <p><h3 style="margin-top: 30px;text-align: right;float: right" @click="getmodalclick"> &#160;&#160;&#160;{{$t("personalCenter.Restrecord")}} </h3><h3 style="margin-top: 30px;text-align: right;float: right" @click="modalclick">{{$t("personalCenter.Attendancemanagement")}}</h3></p>
        <div class="attractionsDetail-content-packagelist">
          <ul>
            <li>
              <div>
                <img v-if="guideData.headImgUrl" :src="guideData.headImgUrl" alt="">
                <img v-else src="/static/img/glw-logo.7651d3c.png" alt="">
              </div>
              <div class="nave">
                <p>{{$t("personalCenter.Nameoftourguide")}}:{{guideData.name}}</p>
                <p>{{$t("personalCenter.phone")}}:{{guideData.guidePhone}}</p>
                <p v-if="guideData.remark">{{$t("personalCenter.Personalsignature")+':'+guideData.remark}}</p>
                <p>{{$t("personalCenter.Totalorderquantity")}}:<span class="red">{{guideData.totalAmt}}</span> {{$t("personalCenter.Totaltransactionamount")}}:<span class="red">{{guideData.totalPrice}}</span> {{$t("personalCenter.Amounttobesettled")}}:<span class="red">{{guideData.income}}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="width: 100%;text-align: center;margin: 0 auto">
        <template>
          <Tabs>
            <TabPane :label="$t('personalCenter.Tourguideorderlist')" name="name1">
              <p v-if="guideOrderList.length==0">{{$t("personalCenter.Notourguideorderyet")}}</p>
              <div v-else >
                <div v-for="item in guideOrderList" style="text-align: left;border-bottom: 1px dashed;margin: 10px 0;line-height:30px; ">
                  <p style="margin: 10px 0">
                    {{$t("personalCenter.orderId")}}: {{item.orderId}}
                    <span style="margin-left: 20%">{{$t("personalCenter.Orderamount")}} : {{item.price}}</span>
                    <span style="margin-left: 20%">{{$t("personalCenter.Checkorderornot")}} : {{item.qrCodeStatus==1?$t('personalCenter.Unverifiedorder'):$t('personalCenter.Checkedlist')}}</span>
                  </p>
                </div>
                <!--            //分页-->
                <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrents" @on-change="getguideOrderList"/>
              </div>
            </TabPane>
            <TabPane :label="$t('personalCenter.Tourguidesettlementlist')"  name="name2">
              <p v-if="guidesettlementList.length==0">{{$t("personalCenter.notourguide")}}</p>
              <div v-else >
                <div v-for="item in guidesettlementList" style="text-align: left;border-bottom: 1px dashed;margin: 10px 0;line-height:30px; ">
                  <p style="margin: 10px 0">
                    {{$t("personalCenter.SettlementNo")}} : {{item.id}}
                    <span style="margin-left: 20%">{{$t("personalCenter.Settlementperiod")}} : {{item.settlementPeriod}}</span>
                    <span style="margin-left: 20%">{{$t("personalCenter.Settlementamount")}} : {{item.totalReturnAmount}}</span>
                  </p>
                  <p class="caozuo" style="margin: 10px 0">
                    {{$t("personalCenter.Settlementstatus")}} : {{item.statusDesc}}
                    <Button  type="success" size="small"  @click="settlementinfo(item.id)">{{$t("personalCenter.Settlementdetails")}}</Button>
                    <Button v-if="item.status == 1|| item.status == 4" type="info" size="small"  @click="confirmStatus(item.id,2, `确认本期结算没有问题`)">{{$t("personalCenter.noproblem")}}</Button>
                    <Button v-if="item.status == 1|| item.status == 4" type="warning" size="small"  @click="confirmStatus(item.id,3, `确认本期结算有问题`)">{{$t("personalCenter.somethingthematter")}}</Button>
                    <Button v-if="item.status == 6" type="error" size="small"  @click="confirmStatus(item.id,7, `确认本期结算已收款`)">{{$t("personalCenter.Confirmreceipt")}}</Button>
                  </p>
                </div>
                <!--            //分页-->
                <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrentse" @on-change="getguidesettlementList"/>
              </div>
            </TabPane>
          </Tabs>
        </template>
      </div>
      <Modal
        title="设置休假日期"
        v-model="modal"
        @on-ok="modalsclick"
        class-name="vertical-center-modal">
        <el-date-picker
          ref="datesRef"
          v-model="guideBookDate"
          style="width:100%;"
          size="small"
          :editable="false"
          :picker-options="options3"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="不可选中的日期为已经被预定或以经设置休假"
        />
      </Modal>
      <Modal
        title="休假记录"
        v-model="getmodal"
        class-name="vertical-center-modal">
        <p v-if="guiderest.length==0">暂无休息记录</p>
        <div v-else v-for="item in guiderest" style="text-align: left;border-bottom: 1px dashed;margin: 10px 0;line-height:30px; ">
          <p>
            日期 : {{item.restDate}}
            <span style="margin-left: 20%">状态 : {{item.statusDesc}}</span>
            <Button v-if="item.status==1" type="info" size="small" style="float: right" @click="putrest(item)">取消休假</Button>
          </p>
        </div>
        <!--            //分页-->
        <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrent" @on-change="getNewShopList"/>
      </Modal>
      <Modal
        title="结算明细"
        v-model="getsettl"
        class-name="vertical-center-modal">
        <p v-if="guidesettlementInfo.length==0">暂无结算明细</p>
        <div v-else v-for="item in guidesettlementInfo" style="text-align: left;border-bottom: 1px dashed;margin: 10px 0;line-height:30px; ">
          <p>
            订单号 : {{item.orderId}}
            <span style="float: right">下单时间 : {{item.createdTime}}</span>
          </p>
          <p>
            <span>订单金额 : {{item.totalAmount}}</span>
            <span style="float: right">订单返还金额 : {{item.returnAmount}}</span>
          </p>

        </div>
      </Modal>
  </div>
</template>

<script>
import {getisguide,getguiderest,postguiderest,putguiderest,getguideorderlist,getguidesettlementlist,putsettlement,settlementdetail} from  '../../api/guide'
export default {
  name: 'guide',
  data(){
    return{
      shopPageCurrent: 1,
      shopPageCurrents: 1,
      shopPageCurrentse: 1,
      pageNo: 1,
      pageNos: 1,
      pageNose: 1,
      guideData:{},
      guiderest:[],
      guideOrderList:[],
      guidesettlementList:[],
      guidesettlementInfo:[],
      guideBookDate:'',
      options3: {
        disabledDate:this.disabledDate
      },
      modal:false,
      getmodal:false,
      getsettl:false,
    }
  },
  created () {
   this.getguide()
   this.getOrder()
   this.getsettlement()
  },
  methods:{
    // 分页
    getNewShopList (val) {
      this.pageNo = val;
      this.getguide()
    },
    // 分页
    getguideOrderList (val) {
      this.pageNos = val;
      this.getOrder()
    },
    getOrder(){
      let data={
        pageNo:this.pageNos,
        pageSize:10,
      }
      getguideorderlist(data).then(res=>{
        this.guideOrderList=res.data.resultList
        this.shopPageCurrents = res.data.totalCount;
      })
    },
    // 分页
    getguidesettlementList (val) {
      this.pageNose = val;
      this.getsettlement()
    },
    getsettlement(){
      let data={
        pageNo:this.pageNose,
        pageSize:10,
      }
      getguidesettlementlist(data).then(res=>{
        this.guidesettlementList=res.data.resultList
        this.shopPageCurrentse = res.data.totalCount;
      })
    },

    getguide(){
      getisguide().then(res=>{
        this.guideData=res.data
      })
      let data={
        pageNo:this.pageNo,
        pageSize:10,
      }
      getguiderest(data).then(res=>{
        this.guiderest=res.data.resultList
        this.shopPageCurrent = res.data.totalCount;
      })
    },
    modalclick(){
      this.modal=true
    },
    getmodalclick(){
      this.getmodal=true
    },
    disabledDate (date) {
      var time=this.$moment(date).format('YYYY-MM-DD')
      var newuserRests=[]
      if(this.guiderest.length>0){
        for(var s=0;s<this.guiderest.length;s++){
          newuserRests.push(this.guiderest[s].restDate)
        }
        if(newuserRests.indexOf(time) >=0){
          return true
        }
        return false || date.valueOf() < Date.now() - 86400000;
      } else {
        return date.valueOf() < Date.now() - 86400000;
      }
    },
    modalsclick(){
      let data={
        restDate:this.guideBookDate,
        status: 0,
        type: 1,
      }
      postguiderest(data).then(res=>{
        if(res.code==0){
          this.$Notice.success({title: '设置成功',desc: ''});
          this.guideBookDate=''
          this.getguide()
        }else {
          this.$Notice.warning({title: '设置失败',desc: res.msg});
          this.guideBookDate=''
        }
      })
    },
    putrest(val){
      let data={
        restDate:val.restDate,
        userId:val.userId,
        id:val.id,
        status: 0,
        type: 1,
      }
      putguiderest(data).then(res=>{
        if(res.code==0){
          this.$Notice.success({title: '修改成功',desc: ''});
          this.getguide()
        }else {
          this.$Notice.warning({title: '修改失败',desc: res.msg});
        }
      })
    },
    settlementinfo(val){
      let data={
        settlementId:val
      }
      settlementdetail(data).then(res => {
        if(res.code==0){
          this.guidesettlementInfo=res.data
          this.getsettl=true
        }
      })
    },
    confirmStatus(id, status, msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putsettlement(id, status).then(res => {
          if(res.code==0){
            this.$Notice.success({title: '确定成功',desc: ''});
            this.getsettlement()
          }else {
            this.$Notice.warning({title: '确定失败',desc: res.msg});
          }
        })
      })
    }
  }
};
</script>

<style scoped>
.service-container{
  width: 100%;
  padding: 10px;

}
/deep/ .ivu-tabs-nav-scroll{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center
}
/deep/ .ivu-tabs-nav{
  width: 100%;
}
/deep/ .ivu-tabs-tab{
  width: 50%;
}
.red{
  color: red;
  font-weight: bold;
}
.service-container h2{
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.service-body{
  width: 100%;
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
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.attractionsDetail-content-packagelist>ul>li{
  font-size: 16px;
  font-weight: 400;
  color: #333333;
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
/deep/ .ivu-modal-body{
  text-align: center;

}
/deep/ .ivu-modal-body img{
display: inline !important;
}
.nave p{
  font-size: 14px;
}
.caozuo button{
  float: right;margin:0 2%;
}
</style>
