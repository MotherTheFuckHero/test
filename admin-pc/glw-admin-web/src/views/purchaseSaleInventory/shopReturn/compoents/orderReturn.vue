<template>
  <div class="return-order">
    <div class="head-container">
      <el-select
        class="filter-item"
        size="small"
        v-model="useMerchantId"
        clearable
        filterable
        remote
        reserve-keyword
        placeholder="商家"
        :remote-method="merchantRemoteMethod"
        :loading="merchantRemoteLoading"
      >
        <el-option
          v-for="item in merchantList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="supplierId"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择供货商搜索"
        @focus="getSupplier"
      >
        <el-option
          v-for="item in supplierLists"
          :key="item.id"
          :label="item.supplierName"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="shopId"
        clearable
        size="small"
        placeholder="输入退货单号搜索"
        style="width: 200px;"
        class="filter-item"
        @input="numValid('shopId')"
      />
      <el-select
        v-model="type"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择状态"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="startOrderCreatedTime"
        default-time="00:00:00"
        type="datetime"
        size="small"
        class="date-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始日期"
      />
      <el-date-picker
        v-model="endOrderCreatedTime"
        default-time="23:59:59"
        type="datetime"
        size="small"
        class="date-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束日期"
      />
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="returnSearch">搜索
      </el-button>
    </div>
    <el-table ref="table" v-loading="returnLoading" :data="returnData" style="width: 100%;">
      <el-table-column show-overflow-tooltip property="tradeTime" label="制单日期" />
      <el-table-column show-overflow-tooltip property="id" label="退货单号" />
      <el-table-column show-overflow-tooltip property="warehouseDesc" label="仓库" />
      <el-table-column show-overflow-tooltip property="supplierDesc" label="供应商名称" />
      <el-table-column show-overflow-tooltip property="userName" label="负责人" />
      <el-table-column show-overflow-tooltip property="totalPrice" label="退货总价" />
      <el-table-column show-overflow-tooltip property="statusDesc" label="审核状态" />
      <el-table-column align="center" label="操作" width="350px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="primary"
            @click="draftsUpdata(scope.$index, scope.row)"
          >提交审核
          </el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-shopping-cart-2"
            @click="returnDetail(scope.$index, scope.row)"
          >商品详情
          </el-button>
          <el-button
            v-if="scope.row.status === 2 || scope.row.status === 3"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="returnUpdata(scope.$index, scope.row)"
          >审核
          </el-button>
          <el-button
            v-if="scope.row.status===5"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="reviewCancel(scope.$index, scope.row)"
          >作废
          </el-button>
<!--          <el-button-->
<!--            v-else-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--            icon="el-icon-delete"-->
<!--            @click="returnDel(scope.$index, scope.row)"-->
<!--          >删除-->
<!--          </el-button>-->

          <!--          <el-button-->
          <!--            v-if="scope.row.status !== 4"-->
          <!--            size="mini"-->
          <!--            type="danger"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="returnDel(scope.$index, scope.row)"-->
          <!--          >作废-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="returnCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="returnPageSize"
        layout="total, prev, pager, next"
        :total="returnTotal"
        @size-change="returnHandleSizeChange"
        @current-change="returnHandleCurrentChange"
      />
    </div>
    <el-dialog title="采购退货单详情" :visible.sync="dialogShopReviewVisible">
      <el-button :disabled="ShopReviewData.length === 0" style="float: right;" size="mini" type="warning" icon="el-icon-printer" @click="exportPrint">打印</el-button>
      <el-button :disabled="ShopReviewData.length === 0" style="float: right;margin-right: 10px" size="mini" type="warning" icon="el-icon-download" @click="exportExcel">导出</el-button>
      <div ref="print">
        <el-table v-loading="shopReviewLoading" :data="ShopReviewData">
          <el-table-column align="center" property="productName" label="商品名称" />
          <el-table-column align="center" property="specDesc" label="商品规格" />
          <el-table-column show-overflow-tooltip align="center" property="productNum" label="数量" />
          <el-table-column show-overflow-tooltip align="center" property="price" label="单价（元）" />
          <el-table-column show-overflow-tooltip align="center" property="unit" label="单位" />
          <el-table-column align="center" property="totalPrice" label="退货总价" />
          <el-table-column show-overflow-tooltip align="center" property="remarks" label="备注" />
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          :current-page="shopReviewCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="shopReviewPageSize"
          layout="total, prev, pager, next"
          :total="shopReviewTotal"
          @size-change="shopReviewHandleSizeChange"
          @current-change="shopReviewHandleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderReturn, getShopReviewDetail, editShopReview, delShopReview, exportList } from '@/api/purchaseSaleInventory/orderReturn'
import { statusListss } from '@/api/order/order'
import { getShop } from '@/api/purchaseSaleInventory/shopPurchase'
import { getmerchantLists } from '@/api/purchaseSaleInventory/warehouseManage'
export default {
  name: 'OrderReturn',
  data() {
    return {
      useMerchantId: '',
      merchantRemoteLoading: false,
      supplierId: '',
      shopId: '',
      startOrderCreatedTime: '',
      endOrderCreatedTime: '',
      nowTime: new Date().getFullYear() + '-' +
          ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
          (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 23:59:59',
      pretermitTime: new Date().getFullYear() + '-' +
          ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
          (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 00:00:00',
      type: null,
      returnLoading: false,
      returnData: [],
      returnCurrentPage: 1,
      returnPageSize: 10,
      returnTotal: 0,
      dialogShopReviewVisible: false,
      shopReviewLoading: false,
      ShopReviewData: [],
      shopReviewCurrentPage: 1,
      shopReviewPageSize: 10,
      shopReviewTotal: 0,
      typeOptions: [],
      supplierLists: [],
      afterMerchantList: [],
      merchantList: [],
    }
  },
  created() {
    this.startOrderCreatedTime = this.pretermitTime
    this.endOrderCreatedTime = this.nowTime
    statusListss({}).then(res => {
      this.typeOptions = res.data
    })
  },
    mounted() {
        this.initData()
    },
  methods: {
    //根据选择商家得到供应商列表
    getSupplier(){
        if (this.useMerchantId){
            getShop({merchantId:this.useMerchantId}).then(res => {
                this.supplierLists = res.data
            })
        }else{
            this.$message.warning('请先选择商家')
        }
    },
    // 得到使用仓库商家的列表
    initData() {
        // 远程搜索机构
        let allOrds = []
        getmerchantLists({ status: 3 }).then(res => {
            if (res.code === '0') {
                allOrds = res.data
                this.afterMerchantList = allOrds.map(item => {
                    return { value: item.id, label: item.name }
                })
            } else {
                this.$notify({
                    title: '警告',
                    message: res.msg,
                    type: 'warning'
                })
            }
        })
    },
    // 使用仓库的商家远程搜索
    merchantRemoteMethod(query) {
        if (query !== '') {
            this.merchantRemoteLoading = true
            setTimeout(() => {
                this.merchantRemoteLoading = false
                this.merchantList = this.afterMerchantList.filter(item => {
                    return item.label.indexOf(query) > -1
                })
            }, 200)
        } else {
            this.merchantList = []
        }
    },
    exportExcel() {
      var data = {
        stockInfoId: this.tableRowId
      }
      exportList(data).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel,charset=utf-8' })
        const fileName = '退货单.xlsx'
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = window.URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      }).catch(err => {
        this.$notify.error({
          title: '导出失败',
          message: err.response.data.message
        })
      })
    },
    exportPrint() {
      this.$print(this.$refs.print)
    },
    getReturn(n1, n2) {
      this.returnLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        supplierId: this.supplierId,
        status: this.type,
        stockType: 3,
        id: parseInt(this.shopId),
        startCreatedTime: this.startOrderCreatedTime,
        endCreatedTime: this.endOrderCreatedTime
      }
      getOrderReturn(pageNo, pageSize, data).then(res => {
        this.returnData = res.data.resultList
        this.returnTotal = res.data.totalCount
        this.returnLoading = false
      }).catch(err => {
        console.log(err.message)
      })
    },
    returnSearch() {
      this.getReturn(10, 1)
    },
    //  提交审核
    draftsUpdata(index, row) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 2).then(res => {
          if (res.code === '0') {
            this.getReturn(10, 1)
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          } else {
            this.$notify({
              title: '警告',
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    // 商品详情
    returnDetail(index, row) {
      this.dialogShopReviewVisible = true
      this.shopReviewLoading = true
      this.tableRowId = row.id
      this.getShopReviewDetail(10, 1, row.id)
    },
    // 审核
    returnUpdata(index, row) {
      this.$confirm('审核是否通过?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是，审核通过',
        cancelButtonText: '否，审核未通过',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 4).then(res => {
          this.getReturn(10, 1)
          if (res.code === '0') {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          } else {
            this.$message({
              title: '警告',
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$notify({
            title: '警告',
            message: err.msg,
            type: 'warning'
          })
        })
      }).catch(action => {
        if (action === 'cancel') {
          editShopReview(row.id, 3).then(res => {
            this.getReturn(10, 1)
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }).catch(err => {
            this.$notify({
              title: '警告',
              message: err.msg,
              type: 'warning'
            })
          })
        } else {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        }
      })
    },
    reviewCancel(index, row) {
      this.$confirm('此操作将作废该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 6).then(res => {
          if (res.code === '0') {
            this.getReturn(10, 1)
            this.$message.success('操作成功')
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$notify({
            title: '警告',
            message: err.msg,
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除
    returnDel(index, row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delShopReview(row.id).then(res => {
          if (res.code === '0') {
            this.getReturn(10, 1)
          }
        }).catch(err => {
          console.log(err.message)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 商品详情
    getShopReviewDetail(n1, n2, Id) {
      var pageSize = n1
      var pageNo = n2
      const data = {
        stockInfoId: Id
      }
      getShopReviewDetail(pageNo, pageSize, data).then(res => {
        this.ShopReviewData = res.data.resultList
        this.shopReviewTotal = res.data.totalCount
        this.shopReviewLoading = false
      }).catch(err => {
        console.log(err.message)
      })
    },
    returnHandleSizeChange(val) {
      this.returnPageSize = val
      this.getReturn(val, 1)
      console.log(`每页 ${val} 条`)
      this.returnCurrentPage = 1
    },
    returnHandleCurrentChange(val) {
      this.returnCurrentPage = val
      this.getReturn(10, val)
      console.log(`当前页: ${val}`)
    },
    shopReviewHandleSizeChange(val) {
      this.shopReviewLoading = true
      this.shopReviewPageSize = val
      this.getShopReviewDetail(val, 1, this.tableRowId)
      console.log(`每页 ${val} 条`)
      this.shopReviewCurrentPage = 1
    },
    shopReviewHandleCurrentChange(val) {
      this.shopReviewLoading = true
      this.shopReviewCurrentPage = val
      this.getShopReviewDetail(10, val, this.tableRowId)
      console.log(`当前页: ${val}`)
    },
    numValid(val) {
      // 只能输入数字
      this[val] = this[val].replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style scoped>

</style>
