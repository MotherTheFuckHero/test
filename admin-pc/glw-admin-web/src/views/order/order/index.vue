<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="订单编号" width="150" />
      <el-table-column prop="merchantName" label="商家名称" width="150px" />
      <el-table-column prop="createdTime" label="下单时间" width="150px" />
      <el-table-column prop="orderTypeDesc" label="订单类型" width="100px" />
      <el-table-column prop="orderStatusDesc" label="订单状态" width="120px" />
      <el-table-column prop="refundPrice" label="退款金额" width="120px" />
      <el-table-column prop="refundApplyNum" label="待退货数量" width="120px" />
      <el-table-column prop="paymentDesc" label="支付方式" width="100px" />
      <el-table-column prop="userName" label="下单用户名称" width="150px" />
      <el-table-column prop="userId" label="下单用户编号" width="100px" />
      <el-table-column prop="settlementStatusDesc" label="商家结算状态" width="100px" />
      <el-table-column label="订单总价格" prop="" width="100px">
        <template slot-scope="scope">
          {{ scope.row.totalPrice.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="orderTime" width="200" />
      <el-table-column label="优惠价格" prop="discountPrice" width="100px">
        <template slot-scope="scope">
          {{ scope.row.discountPrice.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="优惠券抵扣金额" prop="couponPrice" width="120px">
        <template slot-scope="scope">
          {{ scope.row.couponPrice.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="实际支付价格" prop="payPrice" width="100px">
        <template slot-scope="scope">
          {{ scope.row.payPrice.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="currency" label="币别" width="100px" />

      <el-table-column label="是否拆单" prop="demolished" width="100">
        <template slot-scope="scope">
          {{ scope.row.demolished === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="printStatusDesc" label="打印状态" width="150px">
        <template slot-scope="scope" align="center">
          <span v-if="scope.row.printStatus===1" style="color: red">{{ scope.row.printStatusDesc }}</span>
          <span v-else>{{ scope.row.printStatusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="150px" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['order_info_update','order_info_delete']"
        label="操作"
        width="380px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-permission="['order_info_select']" size="mini" type="primary" @click="detailsEdit(scope.$index, scope.row)">查看详情</el-button>
          <el-button v-show="scope.row.orderStatus === 7? true:false " v-permission="['order_info_update']" size="mini" type="primary" plain @click="Edit(scope.$index, scope.row)">同意退款</el-button>
          <el-button v-show="scope.row.orderStatus === 7? true:false " v-permission="['order_info_update']" size="mini" type="danger" plain @click="refuse(scope.$index, scope.row)">拒绝退款</el-button>
          <el-button v-show="scope.row.orderStatus === 1? true:false " v-permission="['order_info_update']" size="mini" type="success" plain @click="Tobepaid(scope.$index, scope.row)">付款</el-button>
          <el-button v-if="scope.row.orderStatus === 1 || scope.row.orderStatus === 12 " v-permission="['order_info_update']" size="mini" type="success" plain @click="cancel(scope.$index, scope.row)">取消</el-button>
          <el-button v-if="scope.row.orderStatus === 2 && (scope.row.orderType === 1 || scope.row.orderType === 31)" v-permission="['order_info_update']" size="mini" type="success" plain @click="Paids(scope.$index, scope.row)">已发货</el-button>
          <el-button v-if="(scope.row.orderStatus === 2 && scope.row.orderType !== 1) && (scope.row.orderStatus === 2 && scope.row.orderType !== 31)" v-permission="['order_info_update']" size="mini" type="success" plain @click="Paid(scope.$index, scope.row)">已发货</el-button>
          <el-button v-if="scope.row.orderType !== 9 && (scope.row.orderStatus === 2 || scope.row.orderStatus === 3||scope.row.orderStatus === 4||scope.row.orderStatus === 5) && scope.row.payment !=='credit_pay'" v-permission="['order_info_update']" size="mini" type="success" plain @click="reasons(scope.$index, scope.row)">发起退款</el-button>
          <el-button v-if="scope.row.orderType !== 6 && scope.row.orderStatus === 3 " v-permission="['order_info_update']" size="mini" type="success" plain @click="Receivedgoods(scope.$index, scope.row)">已收货</el-button>
          <el-button v-if="scope.row.orderType === 6 && scope.row.orderStatus === 20 " v-permission="['order_info_update']" size="mini" type="success" plain @click="Receivedgoods(scope.$index, scope.row)">已收货</el-button>
          <el-button v-if="scope.row.orderType === 6 && ( scope.row.orderStatus === 2 || scope.row.orderStatus === 3 || scope.row.orderStatus === 4 )" v-permission="['order_info_update']" size="mini" type="primary" @click="orderPrints(scope.$index, scope.row)">打印订单</el-button>
          <el-button v-if="scope.row.orderType === 16 && ( scope.row.orderStatus === 2 || scope.row.orderStatus === 3 || scope.row.orderStatus === 4 )" v-permission="['order_info_update']" size="mini" type="primary" @click="orderEnterprisePrints(scope.$index, scope.row)">打印订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />

    <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
      <div v-if="ProductsVisible" style="padding-bottom:20px;">
        <p>订单编号：{{ resultListss.id }} &#12288;下单用户：{{ resultListss.userName }} &#12288;下单时间：{{ resultListss.createdTime }} &#12288;备注：{{ resultListss.remarks }} &#12288;    </p>
        <p v-if="orderCommunityHeaders.deliverType===1"><span style="font-weight: bold;font-size: 18px;">自提:</span>&#12288;联系人:{{ orderCommunityHeaders.contactsName }} &#12288;联系电话:{{ orderCommunityHeaders.contactsPhone }} &#12288;</p>
        <p v-if="orderCommunityHeaders.deliverType===2"><span style="font-weight: bold;font-size: 18px;">送货上门:</span>&#12288;联系人:{{ resultListss.orderAddress.receiverName }} &#12288;联系电话:{{ resultListss.orderAddress.receiverPhone }} &#12288;地址:{{ resultListss.orderAddress.receiverAddress }} &#12288;</p>
      </div>
      <div v-if="resultListss.orderType===16" style="padding-bottom:20px;">
        <p>订单编号：{{ resultListss.id }} &#12288;下单用户：{{ resultListss.userName }} &#12288;下单时间：{{ resultListss.orderTime }} &#12288;配送时间：{{ resultListss.orderEnterpriseUser.sendDate }} &#12288;   </p>
        <p ><span>销售员:{{resultListss.orderEnterpriseUser.merchantSalesName}}</span>&#12288;企业户名称:{{ resultListss.orderEnterpriseUser.enterpriseName }} &#12288;企业户联系人:{{ resultListss.orderEnterpriseUser.receiverName }} &#12288;企业户联系方式:{{ resultListss.orderEnterpriseUser.receiverPhone }} &#12288;企业户地址:{{ resultListss.orderEnterpriseUser.receiverAddress }} &#12288;</p>
      </div>
      <div v-if="ProductsVisible===false && resultListss.orderType !==16">
        <el-table :data="resultLists">
          <el-table-column property="id" label="订单编号" width="150" />
          <el-table-column property="userName" label="下单用户" width="150" />
          <el-table-column property="orderAddress.receiverName" label="联系人" width="100" />
          <el-table-column property="orderAddress.receiverPhone" label="联系电话" width="100" />
          <el-table-column property="orderAddress.receiverAddress" label="地址" width="200" />
          <el-table-column property="createdTime" label="下单时间" width="150" />
          <el-table-column property="remarks" label="评价" width="170" />
        </el-table>
      </div>
      <div v-if="orderProductTicketVisible">
        <p>购票人信息</p>
        <el-table :data="orderProductTickets">
          <el-table-column property="id" label="编号" width="100" />
          <el-table-column property="userName" label="下单用户" width="150" />
          <el-table-column property="orderId" label="订单编号" width="150" />
          <el-table-column property="phone" label="手机号" width="150" />
          <el-table-column property="userCardNo" label="身份证号" width="150" />
          <el-table-column label="创建时间" prop="createdTime" width="250" />
        </el-table>
      </div>
      <div v-if="ProductsVisibles">
        <p v-if="ProductsVisible">配送商品信息   配送团长：{{ communityHeaderName }} &#12288;   手机号：{{ phone }}  &#12288; 预计到达时间：{{ arriveTime }} &#12288;  地址：{{ address }}</p>
        <p v-if="ProductsVisibles" style="margin: 30px 0">订单价格信息:   订单总金额：{{ resultListss.totalPrice }} &#12288;   优惠金额：{{ resultListss.discountPrice }}  &#12288; 优惠券抵扣金额：{{ resultListss.couponPrice }} &#12288;  实际支付金额：{{ resultListss.payPrice }}</p>
        <el-table :data="orderProductsList">
          <el-table-column property="id" label="编号" width="100" />
          <el-table-column property="orderId" label="订单编号" width="150" />
          <el-table-column property="merchantName" label="商家名称" width="100" />
          <el-table-column property="productName" label="商品名称" width="100" />
          <el-table-column property="statusDesc" label="订单状态" width="100" />
          <el-table-column property="productNum" label="商品数量" width="100" />
          <el-table-column property="refundNum" label="退款数量" width="100" />
          <el-table-column property="refundReason" label="退款原因" width="200" />
          <el-table-column property="price" label="商品价格" width="100" />
          <el-table-column property="totalPrice" label="订单总价格" width="100" />
          <el-table-column label="创建时间" prop="createdTime" width="150" />
          <el-table-column
            v-permission="['order_info_update']"
            label="操作"
            width="200px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 3" v-permission="['order_info_update']" size="mini" type="primary" plain @click="newreasonsY(scope.$index, scope.row)">同意退款</el-button>
              <el-button v-if="scope.row.status === 3" v-permission="['order_info_update']" size="mini" type="danger" plain @click="newreasonsN(scope.$index, scope.row)">拒绝退款</el-button>
              <el-button v-if="scope.row.status===1||scope.row.status===4" v-permission="['order_info_update']" size="mini" type="success" plain @click="newreasons(scope.$index, scope.row)">发起退款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="parkingRenewList.length>0">
        <p style="margin: 10px 0">停车续费单信息</p>
        <el-table :data="parkingRenewList">
          <el-table-column property="id" label="续费编号" />
          <el-table-column property="orderParkingId" label="停车订单编号" />
          <el-table-column property="renewHours" label="续费时长" />
          <el-table-column property="renewTime" label="续费开始时间" width="150" />
          <el-table-column property="price" label="价格" />
          <el-table-column property="payPrice" label="支付价格" />
          <el-table-column property="statusDesc" label="订单状态" />
        </el-table>
      </div>
      <div v-if="orderGuideUserList.length>0">
        <p style="margin: 10px 0">游玩详情</p>
        <el-table :data="orderGuideUserList">
          <el-table-column property="id" label="编号" />
          <el-table-column property="bookingDate" label="游玩日期" />
          <el-table-column property="price" label="价格" />
          <el-table-column property="statusDesc" label="订单状态" />
          <el-table-column
            v-permission="['order_info_update']"
            label="操作"
            width="200px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 3" v-permission="['order_info_update']" size="mini" type="primary" plain @click="guidereasonsY(scope.$index, scope.row)">同意退款</el-button>
              <el-button v-if="scope.row.status === 3" v-permission="['order_info_update']" size="mini" type="danger" plain @click="guidereasonsN(scope.$index, scope.row)">拒绝退款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="主动发起退款" :visible.sync="dialogFormVisiblereason" width="600px">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px" class="demo-addForm">
        <el-form-item label="退款原因" prop="reason">
          <el-input v-model="addForm.reason" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="商品退款数量" :visible.sync="dialogFormVisiblereasonNmb" width="600px">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px" class="demo-addForm">
        <el-form-item label="退款数量" prop="number">
          <el-input v-model="number" type="number" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" @click="newreasonsNmb">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="输入快递信息" :visible.sync="dialogFormVisiblelogistic" width="670px">
      <el-form ref="logisticsForm" :model="logisticsForm" label-width="100px" class="demo-addForm">
        <el-form-item label="物流单号" prop="logisticsNo" style="display: inline-block">
          <el-input v-model="logisticsForm.logisticsNo" style="width: 200px" />
        </el-form-item>
        <el-form-item label="物流快递" prop="logisticsCode" style="display: inline-block">
          <el-select v-model="logisticsForm.logisticsCode" style="width: 200px">
            <el-option
              v-for="item in logisticsNameList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" @click="submitlogistics">确认发货</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import crudJob from '@/api/order/order'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { agreeRefund, refuse, getorderdetail, reason, orderPrint, cancel, getproductId, getproductIds, getparkingRenew, guiderefund, postlogistic, LogisticsCode } from '@/api/order/order'
import { getheadselect } from '@/api/groupon/communityHead'
import {  orderEnterprisePrint } from '@/api/enterprise/enterpriseOrderList'
export default {
  name: '订单列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '订单管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: true,
        reset: false
      },
      url: 'admin/order_info/page_list',
      exportUrl: 'admin/order_info/export',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      orderProductTicketVisible: true,
      communityHeaderName: '',
      arriveTime: '',
      phone: '',
      address: '',
      ProductsVisible: false,
      resultLists: [],
      resultListss: '',
      orderCommunityHeaders: '',
      orderProductsList: [],
      orderProductTickets: [],
      orderGuideUserList: [],
      ProductsVisibles: false,
      dialogTableVisible: false,
      dialogFormVisiblelogistic: false,
      permission: {
        add: ['order_info_add'],
        edit: ['order_info_update'],
        del: ['order_info_delete'],
        export: ['order_info_export']
      },
      dialogFormVisiblereason: false,
      dialogFormVisiblereasonNmb: false,
      orderId: '',
      count: '',
      number: 1,
      reasonID: '',
      parkingRenewList: [],
      logisticsNameList: [],
      addForm: {
        reason: ''
      },
      logisticsForm: {
        orderId: '',
        logisticsNo: '',
        logisticsCode: 1,
        logisticsName: '',
        freight: '',
        insuredFee: '',
        grossWeight: ''
      },
      rules: {
        reason: [
          {
            required: true,
            message: '请输入退款原因',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    /* 发起退款*/
    reasons(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      this.reasonID = orderId
      this.dialogFormVisiblereason = true
    },
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          const orderId = this.reasonID
          const data = this.addForm.reason
          this.$confirm('确认退款吗？', '提示', {}).then(() => {
            reason(orderId, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.dialogFormVisiblereason = false
                this.addForm.reason = ''
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },

    /* 详情*/
    detailsEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      getorderdetail(urlId).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultLists = []
          this.resultListss = res.data
          this.orderCommunityHeaders = res.data.orderCommunityHeader
          this.resultLists.push(res.data)
          this.orderProductTickets = res.data.orderProductTickets
          this.dialogTableVisible = true
          if (res.data.orderType === 2 || res.data.orderType === 3 || res.data.orderType === 5) {
            this.orderProductTicketVisible = true
          } else {
            this.orderProductTicketVisible = false
          }
          if (res.data.orderType === 9) {
            this.orderGuideUserList = res.data.orderGuideUserList
          }
          if (res.data.orderType === 6) {
            this.orderProductsList = res.data.orderProducts
            const id = res.data.orderCommunityHeader.communityHeaderId
            this.arriveTime = res.data.orderCommunityHeader.arriveTime
            getheadselect(id).then(res => {
              this.communityHeaderName = res.data.name
              this.phone = res.data.phone
              this.address = res.data.communityHeadAddress.address
            })
            this.ProductsVisible = true
            this.ProductsVisibles = true
          } else if (res.data.orderType === 1 || res.data.orderType === 16) {
            this.orderProductsList = res.data.orderProducts
            this.ProductsVisibles = true
            this.ProductsVisible = false
          } else {
            this.ProductsVisible = false
            this.ProductsVisibles = false
          }
          if (res.data.orderType === 7) {
            this.parkingRenewList = []
            getparkingRenew(urlId).then(res => {
              console.log(res)
              if (res.code === '0') {
                this.parkingRenewList = res.data
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            })
          }
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },

    // 退款
    Edit(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      this.$confirm('确认退款吗？', '提示', {}).then(() => {
        agreeRefund(orderId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    /* 拒绝退款*/
    refuse(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      const data = 11
      this.$confirm('确认拒绝退款吗？', '提示', {}).then(() => {
        refuse(orderId, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    /* 已付款*/
    Tobepaid(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      const data = 2
      this.$confirm('确认已付款吗？', '提示', {}).then(() => {
        refuse(orderId, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },

    /* 取消*/
    cancel(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      this.$confirm('确认取消吗？', '提示', {}).then(() => {
        cancel(orderId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    // 快递发货
    Paids(index, row) {
      var obj = Object.assign({}, row)
      this.logisticsForm.orderId = obj.id
      this.dialogFormVisiblelogistic = true
      const data = {}
      LogisticsCode(data).then(res => {
        this.logisticsNameList = res.data
      })
    },
    submitlogistics() {
      const data = 3
      const datas = {
        orderId: this.logisticsForm.orderId,
        logisticsNo: this.logisticsForm.logisticsNo,
        logisticsCode: this.logisticsForm.logisticsCode,
        logisticsName: this.logisticsNameList[this.logisticsForm.logisticsCode - 1].name,
        freight: this.logisticsForm.freight,
        insuredFee: this.logisticsForm.insuredFee,
        grossWeight: this.logisticsForm.grossWeight
      }
      refuse(this.logisticsForm.orderId, data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          postlogistic(datas).then(res => {
            var codes = res.code
            var msgs = res.msg
            if (codes === '0') {
              this.$message({
                message: msgs,
                type: 'success'
              })
              this.dialogFormVisiblelogistic = false
              this.crud.refresh()
            } else {
              this.$message({
                message: msgs,
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    /* 已发货*/
    Paid(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      const data = 3
      this.$confirm('确认已发货吗？', '提示', {}).then(() => {
        refuse(orderId, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    /* 已收货*/
    Receivedgoods(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      const data = 4
      this.$confirm('确认已收货吗？', '提示', {}).then(() => {
        refuse(orderId, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },

    /* 打印订单*/
    orderPrints(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      this.$confirm('确认打印订单吗？', '提示', {}).then(() => {
        orderPrint(orderId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
      // 企业打印小票
      orderEnterprisePrints(index, row) {
          var obj = Object.assign({}, row)
          var orderId = obj.id
          this.$confirm('确认打印订单吗？', '提示', {}).then(() => {
              orderEnterprisePrint(orderId).then(res => {
                  var code = res.code
                  var msg = res.msg
                  if (code === '0') {
                      this.$message({
                          message: msg,
                          type: 'success'
                      })
                      this.crud.refresh()
                  } else {
                      this.$message({
                          message: msg,
                          type: 'warning'
                      })
                  }
              })
          })
      },

    newreasons(index, row) {
      var obj = Object.assign({}, row)
      this.orderId = obj.id
      this.count = obj.productNum
      this.number = 1
      this.dialogFormVisiblereasonNmb = true
    },
    newreasonsNmb() {
      if (this.number > this.count) {
        this.$message({
          message: '退款数量必须小于等于商品数量',
          type: 'warning'
        })
      } else {
        this.$confirm('确认将该商品退款吗？', '提示', {}).then(() => {
          getproductId(this.orderId, this.number).then(res => {
            var code = res.code
            var msg = res.msg
            if (code === '0') {
              this.$message({
                message: msg,
                type: 'success'
              })
              this.dialogTableVisible = false
              this.dialogFormVisiblereasonNmb = false
              this.crud.refresh()
            } else {
              this.$message({
                message: msg,
                type: 'warning'
              })
            }
          })
        })
      }
    },
    // 单独商品同意退款
    newreasonsY(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      var num = obj.refundNum
      var type = 1
      this.$confirm('确认退款吗？', '提示', {}).then(() => {
        getproductIds(orderId, num, type).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.dialogTableVisible = false
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    // 单独商品拒绝退款
    newreasonsN(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      var num = obj.refundNum
      var type = 2
      this.$confirm('确认拒绝退款吗？', '提示', {}).then(() => {
        getproductIds(orderId, num, type).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.dialogTableVisible = false
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    // 单独商品同意退款
    guidereasonsY(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      var type = 1
      this.$confirm('确认退款吗？', '提示', {}).then(() => {
        guiderefund(orderId, type).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.dialogTableVisible = false
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    // 单独商品拒绝退款
    guidereasonsN(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      var type = 2
      this.$confirm('确认拒绝退款吗？', '提示', {}).then(() => {
        guiderefund(orderId, type).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.dialogTableVisible = false
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
