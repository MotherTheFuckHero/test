<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="stockInfoId" label="出库单号" />
      <el-table-column prop="orderId" label="销售单号" />
      <el-table-column prop="buyuserName" label="下单用户" />
      <el-table-column prop="productName" label="商品" />
      <el-table-column prop="productNum" label="出库数量" />
      <el-table-column prop="price" label="出库商品价格" />
      <el-table-column prop="totalPrice" label="出库总价" />
      <el-table-column prop="warehouseDesc" label="出库仓库" />
      <el-table-column prop="stockTypeDesc" label="处理结果" />
<!--      <el-table-column label="创建人" prop="createdUserName" width="200" />-->
<!--      <el-table-column label="创建时间" prop="createdTime" width="200" />-->
      <!--   编辑与删除   -->
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="orderDetails(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible" width="1200px" :close-on-click-modal="false">
      <div v-if="resultLists.orderType===16" style="padding-bottom:20px;">
        <p>订单编号：{{ resultLists.id }} &#12288;下单用户：{{ resultLists.userName }} &#12288;下单时间：{{ resultLists.orderTime }} &#12288;配送时间：{{ resultLists.orderEnterpriseUser.sendDate }} &#12288;   </p>
        <p ><span>销售员:{{resultLists.orderEnterpriseUser.merchantSalesName}}</span>&#12288;企业户名称:{{ resultLists.orderEnterpriseUser.enterpriseName }} &#12288;企业户联系人:{{ resultLists.orderEnterpriseUser.receiverName }} &#12288;企业户联系方式:{{ resultLists.orderEnterpriseUser.receiverPhone }} &#12288;企业户地址:{{ resultLists.orderEnterpriseUser.receiverAddress }} &#12288;</p>
      </div>
      <el-table :data="tableLists">
        <el-table-column property="id" label="编号" width="100" />
        <el-table-column property="orderId" label="订单编号" width="150" />
        <el-table-column property="merchantName" label="商家名称" width="100" />
        <el-table-column property="productName" label="商品名称" width="100" />
        <el-table-column property="statusDesc" label="订单状态" width="100" />
        <el-table-column property="productNum" label="商品数量" width="100" />
        <el-table-column property="refundNum" label="出库数量" width="100" />
        <el-table-column property="price" label="商品价格" width="100" />
        <el-table-column property="totalPrice" label="订单总价格" width="100" />
        <el-table-column label="创建时间" prop="createdTime" width="150" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { stockPut, getorderdetail } from '@/api/order/order'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '销售退货',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '销售出库',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      params: { stockType: 4 },
      url: 'admin/stock_product/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogTableVisible: false,
      resultLists: [],
      tableLists: [],
      permission: {
        add: ['stock_product_add'],
        edit: ['stock_product_update'],
        del: ['stock_product_delete']
      }
    }
  },
  methods: {
    orderDetails(index, row){
        this.resultLists = []
        this.tableLists = []
        getorderdetail(row.orderId).then(res => {
            if (res.code === '0'){
                this.dialogTableVisible = true
                this.resultLists = res.data
                this.tableLists = res.data.orderProducts
            }
        })
    },
    // 审核
    stockEdit(index, row) {
      this.$prompt('报损/销售退货，审核原因(非必填)', '审核结果', {
        distinguishCancelAndClose: true,
        confirmButtonText: '报损', // 2
        cancelButtonText: '销售退货', // 6
        center: true
      }).then(({ value }) => {
        // 报损
        const data = row
        data.stockType = 2
        data.remarks = value
        stockPut(row.id, data).then(res => {
          if (res.code === '0') {
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 销售退货
          const data = row
          data.stockType = 6
          stockPut(row.id, data).then(res => {
            if (res.code === '0') {
              this.$message({
                type: 'success',
                message: res.msg
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        }
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
