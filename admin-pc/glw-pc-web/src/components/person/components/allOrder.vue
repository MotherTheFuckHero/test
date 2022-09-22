<template>
    <div class="allorder">
      <div v-if="orderList.length === 0" class="not-order-img">
        <img alt="" src="../../../images/dingdna_quesheng_bg.png">
        <p>{{$t("personalCenter.Noorderbeing")}}</p>
      </div>
      <div class="allorder-body">
        <div v-for="(item, index) in orderList" :key="index" class="allorder-body-model">
          <div class="allorder-body-model-head">
            <p>
              <span v-if="item.orderType !=9">{{item.merchantName}}</span>
              <span v-else>{{item.orderTypeDesc}}</span>
              <span>{{item.orderTime}}</span>
            </p>
            <p>{{$t("personalCenter.amount")}}</p>
            <p>{{$t("personalCenter.status")}}</p>
            <p>{{$t("personalCenter.operation")}}</p>
          </div>
          <div v-if="item.orderType == 9" class="allorder-body-model-content">
            <div class="allorder-body-model-content-shop">
              <div>
                <img v-if="item.orderGuideUserList[0].guideUser.headImgUrl != null" :src="item.orderGuideUserList[0].guideUser.headImgUrl" alt="">
                <img v-else src="/static/img/glw-logo.7651d3c.png" alt="">
              </div>
              <div>
                <p>{{item.orderGuideUserList[0].guideUser.name}}</p>
              </div>
              <div>
                x {{item.orderGuideUserList.length}}天
              </div>
              <div>
                {{$t("personalCenter.orderId")}}：{{item.id}}
              </div>
            </div>
            <div class="allorder-body-model-content-price">
              <p>{{$t("personalCenter.copewith")}}</p>
              <p>{{$t("operate.Money")}}{{item.orderGuideUserList[0].guideUser.price * item.orderGuideUserList.length }}</p>
              <p>{{$t("personalCenter.Onlinepayment")}}</p>
            </div>
            <div class="allorder-body-model-content-status">
              <p>{{item.orderStatusDesc}}</p>
              <p @click="goOrderdetails(item)">{{$t("personalCenter.orderDetail")}}</p>
            </div>
            <div class="allorder-body-model-content-operat">
              <p v-if="item.orderStatus === 1 || item.orderStatus === 12" class="allorder-body-model-content-operatfirst" @click="orderGoPays(item)">{{$t("personalCenter.Topay")}}</p>
              <p v-if="item.orderStatus === 1" class="allorder-body-model-content-operatsecond" @click="cancelOrder(item.id)">{{$t("personalCenter.cancellationoforder")}}</p>
              <p v-if="item.orderStatus === 6" class="allorder-body-model-content-operatsecond" @click="delOrder(item.id)">{{$t("personalCenter.Deleteorder")}}</p>
            </div>
          </div>
          <div v-else v-for="(v, i) in item.orderProductResponses" :key="i" class="allorder-body-model-content">
            <div class="allorder-body-model-content-shop">
              <div>
                <img :src="v.picUrl" alt="">
              </div>
              <div>
                <p>{{v.productName}}</p>
                <p>{{v.specName}}</p>
              </div>
              <div>
                x {{v.productNum}}
              </div>
              <div>
                {{$t("personalCenter.orderId")}}：{{v.orderId}}
              </div>
            </div>
            <div class="allorder-body-model-content-price">
              <p>{{$t("personalCenter.copewith")}}</p>
              <p>{{$t("operate.Money")}}{{v.price}}</p>
              <p>{{$t("personalCenter.Onlinepayment")}}</p>
            </div>
            <div class="allorder-body-model-content-status">
              <p>{{item.orderStatusDesc}}</p>
              <p @click="goOrderdetail(v)">{{$t("personalCenter.orderDetail")}}</p>
            </div>
            <div class="allorder-body-model-content-operat">
              <p v-if="item.orderStatus === 1 || item.orderStatus === 12" class="allorder-body-model-content-operatfirst" @click="orderGoPay(item)">{{$t("personalCenter.Topay")}}</p>
              <p v-if="item.orderStatus === 1" class="allorder-body-model-content-operatsecond" @click="cancelOrder(item.id)">{{$t("personalCenter.cancellationoforder")}}</p>
              <p v-if="item.orderStatus === 6" class="allorder-body-model-content-operatsecond" @click="delOrder(item.id)">{{$t("personalCenter.Deleteorder")}}</p>
            </div>
          </div>
        </div>
        <Page v-if="orderList.length !== 0" class="attractionsDetail-content-pageList" :total="orderListCurrent" @on-change="getNewOrderList"/>
      </div>
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
import { getOrderList, getOrderdetail, getOrdercancel, getOrderDel } from '../../../api/order'
import { getPay } from '../../../api/shop'
import QRCode from "qrcodejs2"
export default {
  name: 'allOrder',
  data () {
    return {
      orderId: null,
      orderList: [],
      orderListCurrent: 1,
      pageNo: 1,
      payNative: false,
      qrcodeUrl: null,
      watchStatus: null
    };
  },
  created() {
    this.getOrderList(1, 10)
  },
  methods:{
    getNewOrderList(val) {
      this.pageNo = val;
      this.getOrderList(val, 10)
    },
    getOrderList(pageNo, pageSize) {
      getOrderList(pageNo, pageSize, {source: '2'}).then(res => {
        if (res.code === '0') {
          this.orderList = res.data.resultList;
          this.orderListCurrent = res.data.totalCount;
        }else{
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },
    //订单详情 没接口数据暂时写死
    goOrderdetail (v) {
      this.$router.push({
        path:'/orderDetail',
        query:{orderId: v.orderId}
      });
    },
    goOrderdetails (v) {
      this.$router.push({
        path:'/orderDetail',
        query:{orderId: v.id}
      });
    },
    orderGoPay(item) {
      let payData = {
        payType: 'wechat_pay',
        tradeType: 'NATIVE',
        orderId: item.orderProductResponses[0].orderId,
        currency: 'CNY',
        productName: item.orderProductResponses[0].productNum,
        totalPrice: item.totalPrice,
        payPrice: item.payPrice
      };
      getPay(payData).then(respones => {
          if (respones.code === '0'){
              this.payNative = true;
              this.qrcodeUrl = respones.data.codeUrl;
              this.createQrcode();
              this.setIntelValFunction(item.orderProductResponses[0].orderId);
          }else{
              this.$Notice.warning({title: '警告', desc: respones.msg});
          }
      })
    },
    orderGoPays(item) {
      let payData = {
        payType: 'wechat_pay',
        tradeType: 'NATIVE',
        orderId: item.id,
        currency: 'CNY',
        productName: item.orderGuideUserList.length,
        totalPrice: item.totalPrice,
        payPrice: item.payPrice
      };
      getPay(payData).then(respones => {
        if (respones.code === '0'){
          this.payNative = true;
          this.qrcodeUrl = respones.data.codeUrl;
          this.createQrcode();
          this.setIntelValFunction(item.orderProductResponses[0].orderId);
        }else{
          this.$Notice.warning({title: '警告', desc: respones.msg});
        }
      })
    },
    setIntelValFunction(id) {
      let _this = this;
      _this.watchStatus = setInterval(function (){
        getOrderdetail(id).then(res => {
          if (res.data.orderStatus === 2) {
            clearInterval(_this.watchStatus);
            _this.$Notice.success({title: '支付成功', desc: ''});
            _this.payNative = false;
            _this.$router.push({
              path:'/orderDetail',
              query:{orderId: id}
            });
          }else if (res.data.orderStatus === 6) {
            clearInterval(_this.watchStatus);
            _this.$Notice.warning({title: '警告', desc: '订单已取消'});
            _this.payNative = false;
          }
        })
      },2000)
    },
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
    cancelPay() {
      clearInterval(this.watchStatus);
      this.payNative = false;
      this.$Notice.info({title: '提示', desc: '已取消支付'});
    },
    cancelOrder (id) {
      this.$Modal.confirm({
        title: '取消订单',
        content: '确认取消该订单吗？',
        onOk: () => {
          getOrdercancel(id).then(res => {
            if (res.code === '0') {
              this.$Notice.success({title: '订单取消成功', desc: ''});
              this.getOrderList(1, 10)
            }else {
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          })
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        }
      });
    },
    delOrder (id) {
      this.$Modal.confirm({
        title: '删除订单',
        content: '确认删除该订单吗？',
        onOk: () => {
          getOrderDel(id).then(res => {
            if (res.code === '0') {
              this.$Notice.success({title: '订单删除成功', desc: ''});
              this.getOrderList(1, 10)
            }else {
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          })
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        }
      });
    },
  }
};
</script>

<style scoped>
.allorder{
  width: 100%;
}
.allorder-body{
  width: 100%;
}
.allorder-body-model{
  width: 100%;
  margin-top: 20px;
}
.allorder-body-model-head{
  width: 100%;
  background: #E0E0E0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  padding: 20px 0px 20px 20px;
  font-weight: bold;
}
.allorder-body-model-head>p:nth-of-type(1){
  width: 55%;
  display: flex;
  justify-content: space-between;
}
.allorder-body-model-head>p:nth-of-type(1)>span:nth-of-type(1){
  display: inline-block;
  width: 30%;
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.allorder-body-model-head>p:nth-of-type(1)>span:nth-of-type(2){
  display: inline-block;
  width: 70%;
  text-align: center;
}
.allorder-body-model-head>p:nth-of-type(2){
  width: 15%;
  text-align: center;
}
.allorder-body-model-head>p:nth-of-type(3){
  width: 15%;
  text-align: center;
}
.allorder-body-model-head>p:nth-of-type(4){
  width: 15%;
  text-align: center;
}
.allorder-body-model-content{
  width: 100%;
  border: 1px solid #E0E0E0;
  display: flex;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.allorder-body-model-content-shop{
  width: 55%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
.allorder-body-model-content-shop>div:nth-of-type(1){
  width: 20%;
  position: relative;
}
.allorder-body-model-content-shop>div:nth-of-type(1)>img{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.allorder-body-model-content-shop>div:nth-of-type(2){
  width: 60%;
  padding: 10px 20px;
}
.allorder-body-model-content-shop>div:nth-of-type(2)>p:nth-of-type(1){
  font-size: 16px;
  color: #666666;
}
.allorder-body-model-content-shop>div:nth-of-type(2)>p:nth-of-type(2){
  font-size: 12px;
  color: #999999;
}
.allorder-body-model-content-shop>div:nth-of-type(3){
  width: 20%;
  text-align: center;
  padding: 10px 20px;
}
.allorder-body-model-content-shop>div:nth-of-type(4){
  margin-top: 20px;
}
.allorder-body-model-content-name{
  width: 12.5%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #666666;
  font-size: 16px;
  border-left: 1px solid #E0E0E0;
}
.allorder-body-model-content-price{
  width: 15%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 1px solid #E0E0E0;
}
.allorder-body-model-content-price>p:nth-of-type(1){
  color: #666666;
  font-size: 14px;
  font-weight: bold;
}
.allorder-body-model-content-price>p:nth-of-type(2){
  color: #FC405E;
  font-size: 14px;
  font-weight: bold;
}
.allorder-body-model-content-price>p:nth-of-type(3){
  color: #999999;
  font-size: 14px;
}
.allorder-body-model-content-status{
  width: 15%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 1px solid #E0E0E0;
}
.allorder-body-model-content-status>p:nth-of-type(1){
  color: #999999;
  font-size: 14px;
}
.allorder-body-model-content-status>p:nth-of-type(2){
  color: #666666;
  font-size: 14px;
  cursor: pointer;
}
.allorder-body-model-content-operat{
  width: 15%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 1px solid #E0E0E0;
}
.allorder-body-model-content-operatfirst{
  width: 80%;
  margin-left: 10px;
  border: 1px solid #FC405E;
  padding: 2px 5px;
  color: #FC405E;
  font-size: 14px;
  cursor: pointer;
}
.allorder-body-model-content-operatfirst:hover{
  background: #FC405E;
  color: #ffffff;
}
.allorder-body-model-content-operatsecond{
  color: #999999;
  font-size: 14px;
  cursor: pointer;
}
.not-order-img{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.not-order-img>img{
  width: 50%;
}
.not-order-img>p{
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #999999;
}
.attractionsDetail-content-pageList{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
#qrcode{
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#qrcode + p{
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 30px;
}
</style>
