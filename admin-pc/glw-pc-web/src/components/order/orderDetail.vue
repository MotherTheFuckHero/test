<template>
  <div>
    <Search></Search>
    <div class="body">
      <div class="detailInfo">
       <div :class="classA">
         <div v-if="data.orderType == 2 || data.orderType ==4 || data.orderType ==8">
           <p class="titles">旅客信息</p>
           <ul v-for="(item,index) in data.orderProductTicketResponses" v-if="index<1" :key="index">
             <li>收货人：{{item.userName}}</li>
             <li>联系电话：{{item.phone}}</li>
             <li>身份证号：{{item.userCardNo}}</li>
             <li>门票码:</li>
             <li>
               <div id="qrcode" ref="qrCodeUrl"></div>
             </li>
           </ul>
         </div>
         <div v-else-if="data.orderType == 9">
           <p class="titles">导游信息</p>
           <ul v-for="(item,index) in data.orderGuideUserList" v-if="index<1" :key="index">
             <li>联系人：{{item.guideUser.name}}</li>
             <li>联系电话：{{item.guideUser.guidePhone}}</li>
             <li>导游证件号：{{item.guideUser.certificateNo}}</li>
             <li>门票码:</li>
             <li>
               <div id="qrcode" ref="qrCodeUrl"></div>
             </li>
           </ul>
         </div>
         <div v-else>
           <p class="titles">{{this.$t("personalCenter.Consigneeinformation")}}</p>
           <ul>
             <li>{{this.$t("personalCenter.consignee")}}：{{Address.receiverName}}</li>
             <li>{{this.$t("personalCenter.address")}}：{{Address.receiverAddress}}</li>
             <li>{{this.$t("personalCenter.phone")}}：{{Address.receiverPhone}}</li>
           </ul>
         </div>
       </div>
        <div :class="classA" style="border-left:1px solid #E0E0E0;border-right:1px solid #E0E0E0;">
          <div >
            <p class="titles">{{this.$t("personalCenter.Deliveryinformation")}}</p>
            <ul>
              <li>{{this.$t("personalCenter.Deliverymethod")}}：{{this.$t("personalCenter.Pickitupatthestore")}}</li>
<!--              <li>运费：xxxxx</li> 接口没这参数  配送方式同理暂时写死-->
              <li>{{this.$t("personalCenter.Responsiblemerchants")}}：{{data.merchantName}}</li>
              <li>{{this.$t("personalCenter.orderType")}}：{{data.orderTypeDesc}}</li>
              <li>{{this.$t("personalCenter.remarks")}}：{{data.remarks}}</li>
            </ul>
          </div>
        </div>
<!--        物流信息显示暂时隐藏 后台数据写死等后台对接完在显示-->
<!--        <div v-if="(data.orderType==1 || data.orderType== 31) && (data.orderStatus !==1 && data.orderStatus !== 6 && data.orderStatus !== 12 && data.orderStatus !== 13 && data.orderStatus !== 20)" :class="classA" style="border-right:1px solid #E0E0E0;padding: 0 10px !important;">-->
<!--          <p class="titles">物流信息</p>-->
<!--          <div class="scroll" style="height: 100%;overflow: scroll;width: 100%;">-->
<!--            <Timeline>-->
<!--              <TimelineItem v-for="(item, index) in searchList" :key="index">-->
<!--                <p class="time">{{item.AcceptTime}}<span style="font-size:0.5rem;color: #666666;font-weight:400" v-if="item.Remark">{{'  ('+ item.Remark +')'}}</span></p>-->
<!--                <p class="content">{{item.AcceptStation}}</p>-->
<!--              </TimelineItem>-->
<!--            </Timeline>-->
<!--          </div>-->
<!--        </div>-->
        <div :class="classA">
          <div>
            <p class="titles">{{this.$t("personalCenter.Paymentinformation")}}</p>
            <ul>
              <li v-if="data.payment">{{this.$t("personalCenter.paymentmethod")}}：{{data.payment}}</li>
              <li v-if="data.orderTime">{{this.$t("personalCenter.orderTime")}}：{{data.orderTime}}</li>
              <li v-if="data.totalPrice">{{this.$t("personalCenter.Totalgoods")}}：{{data.totalPrice}}</li>
              <li v-if="data.discountPrice">{{this.$t("personalCenter.Preferentialamount")}}：{{data.discountPrice}}</li>
              <li v-if="data.payPrice">{{this.$t("personalCenter.Amountpayable")}}：{{data.payPrice}}</li>
              <li v-if="data.orderStatusDesc">{{this.$t("personalCenter.Orderstatus")}}：{{data.orderStatusDesc}}</li>
              <li>
                <button  v-if="data.orderStatus==1" class="gobutton" @click="agains">{{this.$t("personalCenter.cancellationoforder")}}</button>
                <button  v-if="data.orderStatus==2 && data.payPrice>0" class="gobutton" @click="refund">{{this.$t("personalCenter.Applyforrefund")}}</button>
                <button  v-if="data.orderStatus==3" class="gobutton" @click="refunds">{{this.$t("personalCenter.Confirmreceipt")}}</button>
                <button  v-if="data.orderStatus==6 || data.orderStatus==4" class="gobutton" @click="delorder">{{this.$t("personalCenter.Deleteorder")}}</button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <p style="line-height: 50px;width: 1200px;margin: 0 auto;font-size: 16px;font-weight: bold">{{data.merchantName}}</p>
      <div class="detailProduct">
        <div>
          <ul style="border-bottom: 1px solid #E0E0E0;width: 100%;height: auto;">
            <li style="width:34.5%;">{{this.$t("pay.one")}}</li>
            <li>{{this.$t("personalCenter.orderId")}}</li>
            <li>{{this.$t("product.price")}}</li>
            <li>{{this.$t("product.quantity")}}</li>
            <div style="clear: both"></div>
          </ul>
          <div v-for="(item,index) in data.orderProductResponses" :key="index" class="productList">
            <ul style="border-bottom: 1px solid #E0E0E0;width: 100%;height: auto;">
              <li style="width:12.5%;text-align: right"><img alt="" :src="item.picUrl" style="width: 90px;height:90px;" /></li>
              <li style="width:22.5%;text-align: left;padding-left: 5px;">{{item.productName}}</li>
              <li>{{item.orderId}}</li>
              <li>{{item.price}}</li>
              <li>{{item.productNum}}</li>
              <div style="clear: both"></div>
            </ul>
          </div>
          <div style="width: 100%;height: auto;overflow:hidden;margin-top: 50px;position: relative;">
            <div style="float: left;width: 50%;" class="price">
              <ul>
                <li>{{$t("personalCenter.Totalgoods")}}：{{$t("operate.Money")}}{{data.totalPrice}}</li>
                <li>{{$t("personalCenter.Commoditydiscount")}}：{{$t("operate.Money")}}{{data.discountPrice}}</li>
                <li>{{$t("personalCenter.Couponoffset")}}：{{$t("operate.Money")}}{{data.couponPrice}}</li>
                <li>{{$t("personalCenter.Amountpayable")}}：{{$t("operate.Money")}}{{data.payPrice}}</li>
              </ul>
            </div>
            <p class="Pay" v-if="data.orderStatus==2">{{$t("personalCenter.Paid")}}:<span>{{$t("operate.Money")}}{{data.payPrice}}</span></p>
            <button  v-else-if="data.orderStatus==1" class="goPay" @click="gotoPay">{{$t("personalCenter.Immediatepayment")}}</button>
          </div>
        </div>
      </div>
      <div v-if="data.orderStatus===4" class="comment-form">
        <h2>填写评价</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="comment-form-content">
          <Form-item label="评分" prop="star">
            <Rate allow-half show-text v-model="formValidate.star" @on-change="changeRate"></Rate>
          </Form-item>
          <Form-item label="评价" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入255字以下的评论"></Input>
          </Form-item>
          <Form-item label="上传图片" prop="productImg">
            <Upload
              action="/"
              :before-upload="handleUploadicon"
              :multiple="false"
              :format="['jpg', 'png']"
              :on-format-error="handleFormatError">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          </Form-item>
        </Form>
      </div>
<!--  拼团列表、邀请好友-->
      <div v-if="fightOrderList.length !== 0" class="fightOrder-invite">
        <div>
          <img v-for="(item, index) in fightOrderList" :key="index" :src="item.imgUrl" :title="item.nickName" :alt="item.nickName">
        </div>
        <div>
          <p>
            还差<span style="color: #FF0036">{{limitPeos - fightOrderList.length}}</span>人拼团成功，快去邀请好友参与拼团吧~
          </p>
        </div>
        <div>
          <button @click="copy">邀请好友</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import { getOrderdetail,getOrderaddress,getOrdercancel,getOrderDel,getOrderreceipt,getOrderrefund,addComment,getsearch } from '../../api/order'
import { getGroupOrder } from '../../api/shop';
import { fileAdd } from '../../api/file'
import QRCode from "qrcodejs2"
export default {
  name: 'orderDetail',
  inject:['reload'],
  data () {
    return {
      data:{},
      Address:{},
      commentModal: false,
      reason:'', //退款原因
      licenseList: [],
      classA:'bodyin',
      formValidate: {
          star: 0,
          desc: ''
      },
      ruleValidate: {
        star: [
          { required: true, message: '请选择满意度', trigger: 'change',type:'number' ,min:0.5 }
        ],
        desc: [
          { required: true, message: '评价不能为空', trigger: 'blur' }
        ],
      },
      fightOrderList: [],
      searchList: [],
      limitPeos: ''
    };
  },

  created () {
     this.getorderdetail()
     this.getFightList()
  },
  methods: {
    changeRate(val) {
        this.formValidate.star = val;
    },
    getorderdetail(){
      var orderId = this.$router.history.current.query.orderId
      getOrderdetail(orderId).then(res=>{
        this.data=res.data
        if((res.data.orderType==1 || res.data.orderType== 31) && (res.data.orderStatus !==1 && res.data.orderStatus !== 6 && res.data.orderStatus !== 12 && res.data.orderStatus !== 13 && res.data.orderStatus !== 20)){
          this.classA='bodyins'
          let data={
            orderId:orderId
          }
          getsearch(data).then(res=>{
           var newsearchData=JSON.parse(res.data);
            this.searchList=newsearchData.Traces
          })
        }else {
          this.classA='bodyin'
        }
        if(res.data.orderType==2 ||res.data.orderType==4 ||res.data.orderType==8 ||res.data.orderType==9){    //2住宿 3服务  8线路  9导游 景区类型
          this.qrCode()
        }else {    //其他商城类型获取收货地址
          getOrderaddress(orderId).then(res=>{
            this.Address=res.data
          })
        }
      })
    },
    getFightList(){
        var specId = this.$route.query.specId
        getGroupOrder(specId).then(res => {
            if (res.code === '0'){
                this.limitPeos = res.data.limitPeos;
                res.data.orderList.forEach(item => {
                    this.$route.query.orderId == item.orderId ? this.fightOrderList = item.users : this.fightOrderList = [];
                })
                console.log(this.fightOrderList)
            }
        })
    },
    ///二维码
    ////////////////////////////
    qrCode() {
      console.log(this.data)
      console.log(this.data.orderGuideUserList[0].qrCode)
      this.$nextTick(function () {
        document.getElementById("qrcode").innerHTML = "";
        var _this=this
        var t = setTimeout(function () {
          _this.creatQrCode();
        }, 1000);
      });
    },
    creatQrCode() {
      let elQrCode = document.getElementById("qrcode");
      let qrcode =  new QRCode(elQrCode, {
        width: 100,
        height: 100,
        correctLevel: QRCode.CorrectLevel.H,
      });
      if(this.data.orderType==9){
        qrcode.makeCode(this.data.orderGuideUserList[0].qrCode)
      }else {
        qrcode.makeCode(this.data.orderProductTicketResponses[0].qrCode)
      }
    },

    //去支付
    gotoPay(){
      let orderId = this.data.id.toString()
      this.$router.push({
        path:'/orderDetail',   //支付页面还没有暂时放着
        query:{orderId:orderId}
      });
    },
    //取消订单
    agains(){
      let orderId =this.data.id
      getOrdercancel(orderId).then(res=>{
        this.$Message.success(res.msg);
      })
    },
    //删除订单
    delorder(){
      let orderId =this.data.id
      getOrderDel(orderId).then(res=>{
        this.$Message.success(res.msg);
      })
    },
    //确认收货
    refunds(){
      let orderId =this.data.id
      getOrderreceipt(orderId).then(res=>{
        this.$Message.success(res.msg);
      })
    },
    //申请退款
    refund(){
      let orderId =this.data.id
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.reason,
              autofocus: true,
              placeholder: '退款原因-.-'
            },
            on: {
              input: (val) => {
                this.reason = val;
              }
            }
          })
        },
        onOk: () => {
          console.log(this.reason)
          if(this.reason==''){
            this.$Message.info('请输入退款原因-.-');
          }else {
            getOrderrefund(orderId,this.reason).then(res=>{
              this.reason=''
              this.$Message.success(res.msg);
              this.reload();
            })
          }
        }
      })
    },
    handleUploadicon(file) {
      let splic = file.name.split(".");
      if (
          splic[splic.length - 1] === "png" ||
          splic[splic.length - 1] === "jpg"
      ) {
        let formData = new FormData();
        formData.append("file", file);
        let _this = this;
        fileAdd(formData).then(response => {
            let license = {
            'type': 2,
            'name': response.data.fileName,
            'key': response.data.key,
            'size': response.data.size,
            'url': response.data.url
          };
          _this.licenseList.push(license)
        })
      }
    },
    handleFormatError(file) {
      this.$Message.error("图片格式不正确,请上传正确的图片格式");
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            orderId: this.data.orderProductResponses[0].orderId,
            productId: this.data.orderProductResponses[0].productId,
            specId: this.data.orderProductResponses[0].specId,
            star: this.formValidate.star,
            content: this.formValidate.desc,
            hasPicture: this.licenseList.length !== 0 ,
            pictures: this.licenseList.length !== 0 ? this.licenseList[0].key : null,
            languageId: 1,
            status: 1
          };
          addComment(data).then(res => {
            if (res.code === '0') {
                this.$Message.success('提交评价成功!');
                this.$refs[name].resetFields();
                this.getorderdetail();
                this.licenseList = [];
            }else {
                this.$Message.error(res.msg);
            }
          })
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    copy(){
        let invitelink = location.href.replace(this.$route.path,'/mallShopDetail').split('?')[0] + '?productId=' + this.$route.query.productId;
        this.$copyText(invitelink).then(
            res => {
                this.$Notice.success({
                    title: '已成功复制到剪切板',
                    desc: ''
                });
            },
            err => {
                console.log(err)
            }
        )
    }
  },
  components: {
    Search,
  },
};
</script>

<style scoped>
  li{
    list-style: none;
    font-weight: 400;
    color: #666666;
  }
  .body{
  width:100%;
  background:#F5F5F5;
  padding: 20px 0;
  margin:0 auto;
  }
.detailInfo{
  width: 1200px;
  height: 400px;
  background: #FFFFFF;
  border-radius: 16px;
  margin:0 auto;
  padding: 30px 0;
}
.goPay{
  height: 40px;
  width:171px;
  background: #FC405E;
  color: #FFFFFF;
  font-size: 18px;
  border: none;
  outline: none;
  float: right;
  position: absolute;
  right: 0;bottom: 0
}
.gobutton{
  height: 40px;
  width:171px;
  background: #FC405E;
  color: #FFFFFF;
  font-size: 18px;
  border: none;
  outline: none;
}
.Pay{
  position: absolute;
  right: 40px;
  bottom: 0
}
.Pay span{
  color: #FC405E;
  font-weight: bold;
  font-size: 18px;
}
.bodyin{
  width: 32.5%;
  height: 100%;
  padding: 0 30px;
  display: inline-block;
  overflow: hidden;
}
.bodyins{
  width: 24.5%;
  height: 100%;
  padding: 0 30px;
  display: inline-block;
  overflow: hidden;
}
.bodyin p{
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
.bodyin div{
  height: 100%;
}
.bodyin div ul{
  margin-top: 20px;
}
.bodyin div ul li{
  line-height:30px;
}
.bodyins p{
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
.bodyins div{
  height: 100%;
}
.bodyins div ul{
  margin-top: 20px;
}
.bodyins div ul li{
  line-height:30px;
}
.titles{
  font-weight: bold !important;
}
/deep/ .ivu-timeline-item-content{
  top:-9px;
}
.scroll::-webkit-scrollbar {display:none}
.time{
  font-size: 14px !important;
  font-weight: bold !important;
}
.content{
  font-size: 12px !important;
}
.detailProduct{
  width: 1200px;
  height: auto;
  background: #FFFFFF;
  border-radius: 16px;
  margin:0 auto;
  padding: 30px 20px;
  overflow: hidden;
}
.detailProduct ul li{
  float: left;
  line-height: 45px;
  width: 20%;
  text-align: center;
}
.price ul li{
  width: 30%;
}
.productList ul li{
  height: 100px;
  line-height: 100px;
  padding: 5px 0;
}
  .price{
    padding: 0 40px;
  }
  .price ul li{
    clear:both;
    text-align: left !important;
  }
.comment-form{
  width: 1200px;
  height: auto;
  background: #FFFFFF;
  border-radius: 16px;
  margin:50px auto;
  padding: 30px 20px;
}
.comment-form>h2{
  width: 100%;
  margin-bottom: 20px;
}
.comment-form-content{
  width: 600px;
  margin: 0 auto;
}
.fightOrder-invite{
  width: 1200px;
  height: auto;
  background: #FFFFFF;
  border-radius: 16px;
  margin:20px auto;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
}
.fightOrder-invite>div{
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fightOrder-invite>div:nth-of-type(1){
  justify-content: center;
}
.fightOrder-invite>div:nth-of-type(1)>img{
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.fightOrder-invite>div:nth-of-type(2)>p{
  font-size: 16px;
  color: #333333;
}
.fightOrder-invite>div:nth-of-type(3)>button{
  justify-content: space-between;
  width: 120px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-style: none;
  outline: none;
  background-color: rgb(255, 0, 54);
  color: #ffffff;
}

</style>
