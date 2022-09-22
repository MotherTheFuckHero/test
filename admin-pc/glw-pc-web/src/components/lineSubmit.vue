<template>
  <div class="container">
    <Search></Search>
    <div class="to-shop-pay-content">
      <div class="to-pay-head">
        <h2>选择游客信息</h2>
        <div class="to-pay-head-content">
          <div :class="{ addressActive : index === isActive }"  style="width: 28%;" v-for="(item, index) in filtercontactsModelList" :key="index" class="to-pay-head-content-model" @click="checkcontacts(index)">
            <h3>游客：{{item.name}} {{item.phone}}<span>{{item.isDefault === 1 ? '默认游客' : ''}}</span></h3>
            <div>
              身份证号：{{item.idCardNo}}&nbsp;
            </div>
          </div>
        </div>
        <p class="go-general" @click="goGeneral">管理游客信息</p>
      </div>
      <div v-if="couponlist.length>0" class="to-pay-head" style="padding: 20px !important;">
        <h2>可用优惠券</h2>
        <div class="to-pay-head-content" >
          <el-checkbox-group v-model="couponUserId">
            <el-checkbox-button v-for="item in couponlist" :label="item.id" :key="item.id">
              <div class="seckillproduct">
                <span class="tag">{{item.tag}}</span>
                <p style="height: 34px;"></p>
                <ul>
                  <li><span style="font-weight: bold;color: black;margin-left:5%;">{{item.couponName}}</span><span style="float: right;width: 40%;text-align: center;font-size: 30px;color:#FF3A2B;font-weight: bold"><span style="font-size: 12px;">￥</span>{{item.discount}}</span></li>
                  <li style="overflow: hidden;border-bottom:2px dashed rgb(221, 222, 225);padding-bottom: 10px;">
                    <span style="color:#D17B1A;background:#FEC6C6;font-size: 12px;padding:5px;border-radius: 6px;">有效期:{{item.startTime}}-{{item.endTime}}</span>
                    <span style="color:#C95D27;font-weight: bold;float: right;font-size: 15px;">满{{item.min}}元可使用优惠券</span>
                  </li>
                  <li>
                    <span style="color:#979797;font-size: 16px;margin-left:5px;">{{item.desc}}</span>
                  </li>
                </ul>
              </div>
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="to-pay-head" style="padding: 20px !important;">
        <h2>支付方式</h2>
        <div class="to-pay-head-content" >
          <RadioGroup v-model="payment" >
            <Radio style="margin:10px 20px;display: flex;align-items: center;justify-content: center;float: left" :label="item.code" v-for="item in paymentList" :value="item.code" :key="item.code">
              <div v-if="item.code=='ali_pay'" style="text-align: center;">
                <img src="../images/ali.png" alt="">
                <p>{{item.desc}}</p>
              </div>
              <div v-if="item.code=='wechat_pay'" style="text-align: center;">
                <img src="../images/wx.png" alt="">
                <p>{{item.desc}}</p>
              </div>
              <div v-if="item.code=='wallet_pay'" style="text-align: center;">
                <img src="../images/wall.png" alt="">
                <p>{{item.desc}}</p>
              </div>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="to-pay-confirm">
        <h2>确认订单信息</h2>
        <div class="to-pay-confirm-head">
          <p>商品</p>
          <p>商品规格</p>
          <p>游玩日期</p>
          <p>单价</p>
          <p>数量</p>
          <p>小计</p>
        </div>
        <div class="to-pay-confirm-content">
          <div>
            <img :src="shopDetailObjPay.imageUrl" alt="">
            <p>{{shopDetailObjPay.title}}</p>
          </div>
          <div>
            <p>{{shopSpecListPay.productSpecs}}</p>
          </div>
          <div>
            <p>{{lineDate.saleDate}}</p>
          </div>
          <div>
            <p>{{lineDate.price}}</p>
          </div>
          <div>
            <p>{{this.shopCountPay}}</p>
          </div>
          <div>
            <p>{{(lineDate.price * shopCountPay).toFixed(2)}}</p>
          </div>
        </div>
        <button @click="confirmOrder">确认付款</button>
      </div>
    </div>
    <Modal
      v-model="payNative"
      title="扫码支付"
      :closable="false"
      :mask-closable="false"
    >
      <div id="qrcode" ref="qrCodeUrl"></div>
      <p class="cp">
        总价格<span style="color:red;font-weight: bold;">{{$t("operate.Money")}}{{this.calculation.totalPrice}}</span>
        <span v-if="this.calculation.couponPrice>0">优惠金额<span style="color:red;font-weight: bold;">{{$t("operate.Money")}}{{this.calculation.couponPrice}}</span></span>
        实际支付<span style="color:red;font-weight: bold;">{{$t("operate.Money")}}{{this.calculation.payPrice}}</span>
      </p>
      <div slot="footer">
        <Button size="large" long @click="cancelPay">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import { getOrderdetail,getcontactsList,getorderpayment,postcouponlist,postcalculation} from '../api/order'
    import { buyShopSubmit, getPay } from '../api/shop';
    import Search from '@/components/Search';
    import QRCode from "qrcodejs2"
    export default {
        name: "ToShopPay",
        components: {
            Search
        },
        data() {
            return {
              calculation: {},
              couponlist: [],
              orderId:'',
              couponUserId: [],  //优惠券集合
                payNative: false,
                isActive: 0,
                usercontacts:{},
                contactsModelList: [],
                payment:"ali_pay",
                paymentList: [],
                shopDetailObjPay: {},
                lineDate: {},
                shopSpecListPay: null,
                shopCountPay: null,
                qrcodeUrl: null,
                watchStatus: null
            }
        },
        computed: {
            //游客信息
            filtercontactsModelList () {
              // 取出相关数据
              const { contactsModelList } = this;
              // 最终需要显示的数组
              let fcontactsModelList = contactsModelList;
              fcontactsModelList.sort(function (p1, p2) { // 返回负数p1在前
                // 1升序，2降序
                return p2.isDefault - p1.isDefault;
              });
              return fcontactsModelList;
            }
        },
        created() {
          getorderpayment().then(res=>{
            this.paymentList=res.data
          })
           let lineData = JSON.parse(localStorage.getItem("lineData"));
            this.shopDetailObjPay = lineData.shopDetailObj;
            this.shopSpecListPay = lineData.shopSpecList;
            this.lineDate = lineData.lineDate;
            this.shopCountPay = Number(lineData.shopCount);
            let data={
              merchantId:this.shopDetailObjPay.merchantId,
              specAndCounts:[{
                productNum:this.shopCountPay,
                specId:this.shopDetailObjPay.specId
              }]
            }
          postcouponlist(data).then(res=>{
            this.couponlist=res.data
          })
          //游客信息
          getcontactsList(1, 1000, {}).then(res => {
            if (res.code === '0'){
              let newList = res.data.resultList;
              for (let i in newList) {
                if (newList[i].isDefault === true) {
                  newList[i].isDefault = 1;
                  this.usercontacts=newList[i]
                }else{
                  newList[i].isDefault = 0;
                }
              }
              this.contactsModelList = newList;
            }else{
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          })
        },
        methods: {
            goGeneral() {
                this.$router.push({
                    path:'/personalCenter',
                    query: {currentTab: 'general'}
                });
            },
           checkcontacts(i) {
              this.isActive = i;
              this.usercontacts=this.contactsModelList[i]
            },
            confirmOrder() {
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
                var maxPos = $chars.length
                var unique = ''
                for (var i = 0; i < 32; i++) {
                  unique += $chars.charAt(Math.floor(Math.random() * maxPos))
                }
                let specRequests = [{
                    price:this.lineDate.price,
                    specId:this.shopSpecListPay.id,
                    productNum: this.shopCountPay,
                    bookingDate:this.lineDate.saleDate,
                  contactsRequests:[{
                      'id':this.usercontacts.id,
                      'name':this.usercontacts.name,
                      'phone':this.usercontacts.phone,
                      'idCardNo':this.usercontacts.idCardNo,
                      'identityType':this.usercontacts.identityType,
                    }]
                }]
                let data = {
                    couponUserIds:this.couponUserId,
                    source: 2,
                    orderType:8,
                    orderScene:1,
                    merchantId:this.shopDetailObjPay.merchantId,
                    uniqueKey:unique,
                    specRequests: specRequests
                }
              postcalculation(data).then(res => {
                this.calculation=res.data
              })
                buyShopSubmit(data).then(res => {
                    if (res.code === '0'){
                      this.orderId=res.data.orderId
                        let payData = {
                            payType: this.payment,
                            tradeType: 'NATIVE',
                            orderId: res.data.orderId,
                            currency: 'CNY',
                            productName: this.shopDetailObjPay.title,
                          totalPrice:this.calculation.payPrice,
                          payPrice: this.calculation.payPrice
                        }
                      if(this.calculation.payPrice==0){
                        this.$router.push({
                          path:'/orderDetail',
                          query:{orderId: res.data.orderId}
                        });
                      }else {
                        getPay(payData).then(respones => {
                          if (respones.code === '0') {
                            if (this.payment == "ali_pay") {
                              this.qrcodeUrl = respones.data.htmlStr;
                            } else if (this.payment == "wallet_pay") {
                              this.setIntelValFunction(res.data.orderId);
                              return
                            } else {
                              this.qrcodeUrl = respones.data.codeUrl;
                            }
                            this.payNative = true;
                            this.createQrcode();
                            this.setIntelValFunction(res.data.orderId);
                          } else {
                            if (this.payment == "wallet_pay") {
                              this.$Notice.warning({title: '警告', desc: '钱包余额不足'});
                            } else {
                              this.$Notice.warning({title: '警告', desc: respones.msg});
                            }
                          }
                        })
                      }
                    }else{
                        this.$Notice.warning({title: '警告', desc: res.msg});
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
              this.$router.push({
                path:'/orderDetail',
                query:{orderId: this.orderId}
              });
            }
        }
    }
</script>

<style scoped>
  .seckillproduct{
    width:100%;
    margin: 0;
    text-align: left;
    font-size: 20px;
    background:#F2F2F2 ;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .seckillproduct ul li{
    width: 100%;
    line-height:30px;
    margin: 5px 0;
    list-style: none;
    padding: 0 5px;
  }
  .tag{
    font-size: 12px;
    color: #FFFFFF;
    position: absolute;
    left: 0;padding: 5px;
    border-bottom-right-radius:10px;
    background: linear-gradient(100deg,#FE7C3E,#D93138);
  }
  /deep/ .el-checkbox-button__inner{
    padding: 2px !important;
  }
.addressActive{
  border: 1px solid #FC405E !important;
}
.container{
  background-color: #F5F5F5;
  padding-bottom: 30px;
}
.to-shop-pay-content{
  width: 1008px;
  height: auto;
  margin: 0px auto;
}
.to-pay-head{
  width: 100%;
  padding: 20px 20px 40px 20px;
  background-color: #ffffff;
  margin-top: 30px;
  border-radius: 8px;
  position: relative;
}
.to-pay-head-content{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.to-pay-head-content-model{
  width: 22%;
  border: 1px solid #E0E0E0;
  margin-left: 25px;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}
.to-pay-head-content-model:hover {
  border: 1px solid #FC405E;
}
.to-pay-head-content-model>h3{
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #E0E0E0;
  position: relative;
}
.to-pay-head-content-model>h3>span{
  display: inline-block;
  position: absolute;
  right: 5px;
  background: #ccc;
  color: #fff;
  font-size: 12px;
  padding: 0 5px;
}
.to-pay-head-content-model>div{
  width: 100%;
  padding: 5px;
}
.go-general{
  position: absolute;
  right: 20px;
  bottom: 10px;
  color: #c97;
  cursor: pointer;
}
.go-general:hover{
  color: #ff0036;
}
.to-pay-confirm{
  width: 100%;
  padding: 20px 20px 40px 20px;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 30px;
  position: relative;
}
.to-pay-confirm-head{
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.to-pay-confirm-head>p{
  width: 19%;
  text-align: center;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 10px;
}
.to-pay-confirm-content{
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.to-pay-confirm-content>div{
  width: 18%;
  display: flex;
}
.to-pay-confirm-content>div:nth-of-type(1)>img{
  width: 50%;
}
.to-pay-confirm-content>div:nth-of-type(1)>p{
  width: 50%;
  margin-left: 10px;
  text-align: center;
}
.to-pay-confirm-content>div:nth-of-type(2)>p{
  width: 100%;
  text-align: center;
}
.to-pay-confirm-content>div:nth-of-type(3)>p{
  width: 100%;
  text-align: center;
}
.to-pay-confirm-content>div:nth-of-type(4)>p{
  width: 100%;
  text-align: center;
}
.to-pay-confirm-content>div:nth-of-type(5)>p{
  width: 100%;
  text-align: center;
}
.to-pay-confirm-content>div:nth-of-type(6)>p{
  width: 100%;
  text-align: center;
}
.to-pay-confirm>button{
  width: 120px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-style: none;
  outline: none;
  background-color: rgb(255, 0, 54);
  color: #ffffff;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
#qrcode{
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .cp{
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin:10px;
  }
</style>
