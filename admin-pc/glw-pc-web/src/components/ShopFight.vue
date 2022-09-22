<template>
  <div class="container">
    <Search></Search>
    <div class="to-shop-pay-content">
      <div v-if="shopDetailObjPay.productType !== 2 && shopDetailObjPay.productType !== 3" class="to-pay-head">
        <h2>选择收货地址</h2>
        <div class="to-pay-head-content">
          <div :class="{ addressActive : index === isActive }" v-for="(item, index) in filteraddressModelList" :key="index" class="to-pay-head-content-model" @click="checkAddress(index)">
            <h3>收货人：{{item.receiverName}}<span>{{item.isDefault === 1 ? '默认地址' : ''}}</span></h3>
            <div>
              {{item.receiverStateName}}&nbsp;{{item.receiverCityName}}&nbsp;{{item.receiverDistrictName}}&nbsp;{{item.receiverAddress}}&nbsp;{{item.receiverMobile}}
            </div>
          </div>
        </div>
        <p class="go-general" @click="goGeneral">管理收货地址</p>
      </div>
      <div v-else class="to-pay-head">
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
      <div class="to-pay-confirm">
        <h2>确认订单信息</h2>
        <div class="to-pay-confirm-head">
          <p>商品</p>
          <p>商品规格</p>
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
            <p>{{shopSpecListPay.productSpecGroup.groupPrice}}</p>
          </div>
          <div>
            <p>{{this.shopCountPay}}</p>
          </div>
          <div>
            <p>{{(shopSpecListPay.productSpecGroup.groupPrice * shopCountPay).toFixed(2)}}</p>
          </div>
        </div>
        <button @click="confirmOrder">确认付款</button>
      </div>
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
    import { getAddressList, getOrderdetail,getcontactsList} from '../api/order'
    import { buyShopSubmit, getPay } from '../api/shop';
    import Search from '@/components/Search';
    import QRCode from "qrcodejs2"
    export default {
        name: "ShopFight",
        components: {
            Search
        },
        data() {
            return {
                payNative: false,
                isActive: 0,
                userAddressId:'',
                addressModelList: [],
                usercontacts:{},
                contactsModelList: [],
                shopDetailObjPay: {},
                shopSpecListPay: null,
                shopCountPay: null,
                shopParentId: null,
                qrcodeUrl: null,
                watchStatus: null
            }
        },
        computed: {
            filteraddressModelList () {
                // 取出相关数据
                const { addressModelList } = this;
                // 最终需要显示的数组
                let faddressModelList = addressModelList;
                faddressModelList.sort(function (p1, p2) { // 返回负数p1在前
                    // 1升序，2降序
                    return p2.isDefault - p1.isDefault;
                });
                return faddressModelList;
            },
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
            let fightShop = JSON.parse(localStorage.getItem("fightShop"));
            this.shopDetailObjPay = fightShop.shopDetailObj;
            this.shopSpecListPay = fightShop.shopSpecList;
            this.shopCountPay = Number(fightShop.shopCount);
            this.shopParentId = fightShop.parentId;
            getAddressList(1, 1000, {}).then(res => {
                if (res.code === '0'){
                    let newList = res.data.resultList;
                    for (let i in newList) {
                        if (newList[i].isDefault === true) {
                            newList[i].isDefault = 1;
                            this.userAddressId=newList[i].id
                        }else{
                            newList[i].isDefault = 0;
                        }
                    }
                    this.addressModelList = newList;
                }else{
                    this.$Notice.warning({title: '警告', desc: res.msg});
                }
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
            checkAddress(i) {
                this.isActive = i;
                this.userAddressId=this.addressModelList[i].id
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
                var bookDate=new Date().getFullYear() + '-' +
                    ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' +
                    (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' +
                    (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' +
                    (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds())

                let specRequests = [{
                    price:this.shopSpecListPay.productSpecGroup.groupPrice,
                    specId:this.shopSpecListPay.id,
                    productNum: this.shopCountPay,
                    secKillId:this.shopSpecListPay.productSpecGroup.id,
                }]
                let data = {
                    source: 2,
                    orderType:this.shopDetailObjPay.productType,
                    orderScene:6,
                    merchantId:this.shopDetailObjPay.merchantId,
                    parentId:this.shopParentId,
                    uniqueKey:unique,
                    specRequests: specRequests
                }
                if(this.shopDetailObjPay.productType===2 || this.shopDetailObjPay.productType===3){
                    data.specRequests[0].bookingDate=bookDate
                    data.specRequests[0].contactsRequests=[{
                        'id':this.usercontacts.id,
                        'name':this.usercontacts.name,
                        'phone':this.usercontacts.phone,
                        'idCardNo':this.usercontacts.idCardNo,
                        'identityType':this.usercontacts.identityType,
                    }]
                }else {
                    data.userAddressId=this.userAddressId
                }
                buyShopSubmit(data).then(res => {
                    if (res.code === '0'){
                        let payData = {
                            payType: 'wechat_pay',
                            tradeType: 'NATIVE',
                            orderId: res.data.orderId,
                            currency: 'CNY',
                            productName: this.shopDetailObjPay.title,
                            totalPrice: res.data.payPrice,
                            payPrice: res.data.payPrice
                        }
                        getPay(payData).then(respones => {
                            if (respones.code === '0'){
                                this.payNative = true;
                                this.qrcodeUrl = respones.data.codeUrl;
                                this.createQrcode();
                                this.setIntelValFunction(res.data.orderId);
                            }else{
                                this.$Notice.warning({title: '警告', desc: respones.msg});
                            }
                        })
                    }else{
                        this.$Notice.warning({title: '警告', desc: res.msg});
                    }
                })
            },
            setIntelValFunction(id) {
                let _this = this;
                _this.watchStatus = setInterval(function (){
                    getOrderdetail(id).then(res => {
                        if (res.data.orderStatusDesc === '拼团中(支付成功)') {
                            clearInterval(_this.watchStatus);
                            _this.$Notice.success({title: '支付成功', desc: ''});
                            _this.payNative = false;
                            _this.$router.push({
                                path:'/orderDetail',
                                query:{orderId: id, productId:_this.shopDetailObjPay.id, specId: _this.shopDetailObjPay.specId}
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
            }
        }
    }
</script>

<style scoped>
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
  .to-pay-confirm-content>div:nth-of-type(4){
    justify-content: center;
  }
  .to-pay-confirm-content>div:nth-of-type(5)>p{
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
  #qrcode + p{
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 30px;
  }
</style>
