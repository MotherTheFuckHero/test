<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="merchantName" label="分销商" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column prop="settlementTypeDesc" label="结算方式" width="150px" />
      <el-table-column prop="settlementPeriod" label="结算期间" width="200px" />
      <el-table-column prop="settlementDate" label="结算日期" width="200px">
        <template slot-scope="scope">
          {{ new Date(+new Date(new Date(scope.row.settlementDate).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}
        </template>
      </el-table-column>
      <el-table-column prop="orderCount" label="订单总数量" width="150px" />
      <el-table-column prop="totalAmount" label="订单总金额" width="150px" />
      <el-table-column prop="totalReturnAmount" label="总返还金额" width="150px" />
      <el-table-column prop="totalRoyaltyAmount" label="总提成金额" width="150px" />
      <el-table-column prop="totalPartProductRefundAmount" label="总部分商品退款金额" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['distribut_settlement_info_update','distribut_settlement_info_delete']"
        label="操作"
        width="430px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-permission="['distribut_settlement_info_select']" size="mini" type="primary" plain @click="detailsEdit(scope.$index, scope.row)">查看详情</el-button>
          <el-button v-permission="['distribut_settlement_info_update']" size="mini" type="success" plain @click="exportDetail(scope.$index, scope.row)">导出结算详情</el-button>
          <el-button v-show="scope.row.status === 3? true:false " v-permission="['distribut_settlement_info_update']" size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">修改完毕</el-button>
          <el-button v-show="scope.row.status === 2? true:false " v-permission="['distribut_settlement_info_update']" size="mini" type="primary" plain @click="paymentEdit(scope.$index, scope.row)">确认完毕准备打款</el-button>
          <el-button v-show="scope.row.status === 5? true:false " v-permission="['distribut_settlement_info_update']" size="mini" type="primary" plain @click="completeEdit(scope.$index, scope.row)">打款完毕</el-button>
          <el-button v-show="scope.row.status === 6? true:false " v-permission="['distribut_settlement_info_update']" size="mini" type="primary" plain @click="collectionEdit(scope.$index, scope.row)">商户确认收款</el-button>
          <el-button v-show="scope.row.status !== 10? true:false " v-permission="['distribut_settlement_info_update']" size="mini" type="primary" plain @click="closeEdit(scope.$index, scope.row)">关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />

    <el-dialog title="结算详情" :visible.sync="dialogTableVisible">
      <el-table :data="resultList">
        <el-table-column property="id" label="编号" width="150" />
        <el-table-column property="merchantName" label="分销商" width="150" />
        <el-table-column property="orderId" label="订单编号" width="150" />
        <el-table-column property="totalAmount" label="总金额" width="150" />
        <el-table-column property="royaltyRatio" label="提成比例" width="150" />
        <el-table-column property="royaltyAmount" label="提成金额" width="150" />
        <el-table-column property="returnAmount" label="返还金额" width="200" />
        <el-table-column property="partProductRefundAmount" label="部分商品退款金额" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import crudJob from '@/api/order/settlement'
import { exportDetails, settlementdetailList, closePut } from '@/api/order/settlement'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { downloadFile } from '@/utils/index'
export default {
  name: '分销商结算管理',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '分销商结算管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: true,
        reset: false
      },
      exportUrl: process.env.VUE_APP_cashier_API + 'api/settlement_info/export_distributor',
      url: process.env.VUE_APP_cashier_API + 'api/settlement_info/distributor_page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      resultList: [],
      dialogTableVisible: false,
      permission: {
        add: ['distribut_settlement_info_add'],
        edit: ['distribut_settlement_info_update'],
        del: ['distribut_settlement_info_delete'],
        export: ['distribut_settlement_info_export']
      }
    }
  },
  methods: {
    exportDetail(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = urlId
      this.$confirm('确认导出此结算详情吗？', '提示', {}).then(() => {
        exportDetails(data).then(result => {
          this.$message({
            message: '导出成功',
            type: 'success'
          })
          downloadFile(result, this.crud.title + '数据', 'xlsx')
        }).catch(() => {
          this.crud.downloadLoading = false
        })
      })
    },
    detailsEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = {
        settlementId: urlId,
        merchantId: obj.merchantId
      }
      var params = {
        pageNo: 1,
        pageSize: 999
      }
      settlementdetailList(data, params).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultList = res.data.resultList
          this.dialogTableVisible = true
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    // 修改完毕
    handleEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = 4
      this.$confirm('确认修改完毕吗？', '提示', {}).then(() => {
        closePut(urlId, data).then(res => {
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
    // 确认完毕准备打款
    paymentEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = 5
      this.$confirm('确认完毕准备打款吗？', '提示', {}).then(() => {
        closePut(urlId, data).then(res => {
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
    // 打款完毕
    completeEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = 6
      this.$confirm('确认打款完毕吗？', '提示', {}).then(() => {
        closePut(urlId, data).then(res => {
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
    // 商户确认收款
    collectionEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = 7
      this.$confirm('确认商户确认收款吗？', '提示', {}).then(() => {
        closePut(urlId, data).then(res => {
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
    // 关闭
    closeEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = 10
      this.$confirm('确认关闭该商户结算吗？', '提示', {}).then(() => {
        closePut(urlId, data).then(res => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
