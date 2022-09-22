<template>
    <div class="service-container">
      <h2>{{$t("personalCenter.Mywallet")}}</h2>
      <div class="service-body">
        <h3 style="margin-top: 30px;text-align: right" @click="modalclick">{{$t("personalCenter.Walletlog")}}</h3>
        <div style="margin-top: 30px;text-align: center">
          <img alt="" src="../../images/wallet.png" style="width: 100px;">
          <p style="margin-top: 10px;font-size: 20px;">{{$t("personalCenter.Mychange")}}</p>
          <p style="margin-top: 20px;font-size: 28px;font-weight: bold; letter-spacing: 2px;">{{$t("operate.Money")}}{{walletData.wallet}}</p>
          <p><Button type="success" size="large" @click="handleRender" style="padding: 5px 80px;font-size: 20px;font-weight: bold;margin:80px 0 30px 0;">{{$t("personalCenter.Recharge")}}</Button></p>
          <Button v-if="walletData.wallet>0" @click="tRender" type="success" ghost size="large" style="padding: 5px 80px;font-size: 20px;font-weight: bold;color: #19be6b;background:#E0E0E0;border: none ">{{$t("personalCenter.Withdrawal")}}</Button>
        </div>
      </div>
      <Modal
        :title="$t('personalCenter.Walletlog')"
        v-model="modal"
        class-name="vertical-center-modal">
         <p v-if="walletList.length==0" style="margin: 20px 0">{{$t("personalCenter.Norechargerecordtemporarily")}}</p>
        <div v-else >
          <div v-for="item in walletList" style="text-align: left;border-bottom: 1px dashed;margin: 10px 0;line-height:25px; ">
            <p>{{item.changeTypeDesc}}金额:{{$t("operate.Money")}}{{item.changeWallet}}</p>
            <p>{{item.changeTypeDesc}}时间:{{item.createdTime}}</p>
          </div>
          <!--            //分页-->
          <Page  class="attractionsDetail-content-pageList" :total="shopPageCurrent" @on-change="getNewShopList"/>
        </div>

      </Modal>
      <Modal
        title="充值金额"
        v-model="modalw"
        @on-ok="modalsclick"
        class-name="vertical-center-modal">
        <InputNumber v-model.number="totalPrice"  :min="0.01" number placeholder="请输入充值金额" style="width:80%" /> 元
      </Modal>
      <Modal
        :title="title"
        v-model="modalt"
        @on-ok="modaltclick"
        class-name="vertical-center-modal">
        <InputNumber v-model.number="tPrice"  :min="0.01" :max="walletData.wallet" number placeholder="请输入提现金额" style="width:80%" /> 元
      </Modal>
      <Modal
        v-model="payNative"
        title="微信扫码支付"
        :closable="false"
        :mask-closable="false"
      >
        <div id="qrcode" ref="qrCodeUrl"></div>
        <p>请在十分钟之内完成支付，否则订单自动取消</p>
        <div slot="footer">
          <Button size="large" long @click="cancelPay">取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import {getwallet,getwalletList,getpayment,addwallet} from  '../../api/order'
import { getPay } from '../../api/shop'
import QRCode from "qrcodejs2"
export default {
  name: 'AfterService',
  data(){
    return{
      shopPageCurrent: 1,
      pageNo: 1,
      walletData:{
        wallet:0
      },
      walletList:[],
      modal:false,
      modalw:false,
      modalt:false,
      payNative:false,
      totalPrice:1,
      tPrice:'',
      title:'钱包余额',
    }
  },
  created () {
   this.getwallet()
  },
  methods:{
    getwalletList(){
      let data={
        pageNo: this.pageNo,
      }
      getwalletList(data).then(res=>{
        this.walletList=res.data.resultList
        this.shopPageCurrent = res.data.totalCount;
      })
      this.modal=true
    },
    // 分页
    getNewShopList (val) {
      this.pageNo = val;
      this.getwalletList()
    },
    getwallet(){
      getwallet().then(res=>{
        if(res.data !=null){
          this.walletData=res.data
        }
      })
    },
    modalclick(){
    this.getwalletList()
    },
    cancelPay() {
      clearInterval(this.watchStatus);
      this.payNative = false;
      this.$Notice.info({title: '提示', desc: '已取消支付'});
    },
    handleRender () {
      this.modalw=true

    },
    tRender() {
     this.tPrice=this.walletData.wallet
     this.title='钱包余额  '+this.walletData.wallet+'元'
     this.modalt=true
    },
    modalsclick(){
      let payData = {
        payType: 'wechat_pay',
        tradeType: 'NATIVE',
        type: 2,
        orderId: 0,
        currency: 'CNY',
        productName: '钱包充值',
        totalPrice: this.totalPrice,
        payPrice: this.totalPrice
      };
      getPay(payData).then(respones => {
        if (respones.code === '0'){
          this.payNative = true;
          this.modalw = false;
          this.qrcodeUrl = respones.data.codeUrl;
          this.createQrcode();
          this.setIntelValFunction(respones.data.paymentId);
        }else{
          this.$Notice.warning({title: '警告', desc: respones.msg});
        }
      })
    },
    modaltclick(){
      let _this = this;
      let data={
        changeWallet:this.tPrice
      }
      if(this.tPrice<0.01){
        _this.$Notice.warning({title: '警告', desc: '请输入有效的提现金额'});
      }else {
        addwallet(data).then(res => {
          if(res.data){
            _this.$Notice.success({title: '提现成功', desc: ''});
            _this.getwallet()
          }else {
            _this.$Notice.warning({title: '警告', desc: '提现失败'});
          }
        })
      }
    },
    setIntelValFunction(id) {
      let _this = this;
      _this.watchStatus = setInterval(function (){
        getpayment(id).then(res => {
          if (res.data.payStatus === 3) {
            clearInterval(_this.watchStatus);
            _this.$Notice.success({title: '支付成功', desc: ''});
            _this.payNative = false;
            _this.getwallet()
          }
        })
      },2000)
    },
    ///二维码
    ////////////////////////////
    createQrcode() {
      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = "";
        let elQrCode = document.getElementById("qrcode");
        let qrcode = new QRCode(elQrCode, {
          width: 150,
          height: 150
        })
        qrcode.makeCode(this.qrcodeUrl)
      })
    },
  }
};
</script>

<style scoped>
.service-container{
  width: 100%;
  padding: 30px;
  height: 100%;
  overflow-y: scroll;
}
.service-container h2{
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.service-body{
  width: 100%;
}
/deep/ .ivu-modal-body{
  text-align: center;

}
/deep/ .ivu-modal-body img{
display: inline !important;
}
</style>
