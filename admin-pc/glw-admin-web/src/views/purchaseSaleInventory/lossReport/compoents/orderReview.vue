<template>
  <div class="order-review">
    <div class="head-container">
      <el-input
        v-model="shopId"
        clearable
        size="small"
        placeholder="输入报损单号搜索"
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
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="reviewSearch">搜索
      </el-button>
    </div>
    <el-table ref="table" v-loading="reviewLoading" :data="reviewData" style="width: 100%;">
      <el-table-column show-overflow-tooltip align="center" property="id" label="报损单号" />
      <el-table-column align="center" property="warehouseDesc" label="仓库名称" />
      <el-table-column show-overflow-tooltip align="center" property="userName" label="负责人" />
      <el-table-column show-overflow-tooltip align="center" property="totalPrice" label="报损金额" />
      <el-table-column show-overflow-tooltip align="center" property="statusDesc" label="审核进度">
        <template slot-scope="scope">
          <span v-if="scope.row.status===3" class="errorcolor">{{ scope.row.statusDesc }}</span>
          <span v-else-if="scope.row.status===5" class="successcolor">{{ scope.row.statusDesc }}</span>
          <span v-else>{{ scope.row.statusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column align="center" label="操作" width="300px" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-shopping-cart-2"
            @click="reviewDetail(scope.$index, scope.row)"
          >商品详情
          </el-button>
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="draftsUpdata(scope.$index, scope.row)"
          >提交
          </el-button>
          <el-button
            v-if="scope.row.status === 2 || scope.row.status === 3"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="reviewUpdata(scope.$index, scope.row)"
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
          <el-button
            v-else
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="reviewDel(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="reviewCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="reviewPageSize"
        layout="total, prev, pager, next"
        :total="reviewTotal"
        @size-change="reviewHandleSizeChange"
        @current-change="reviewHandleCurrentChange"
      />
    </div>
    <el-dialog title="报损商品详情" :visible.sync="dialogShopReviewVisible">
      <el-table v-loading="shopReviewLoading" :data="ShopReviewData">
        <el-table-column align="center" property="productName" label="商品名称" />
        <el-table-column align="center" property="specDesc" label="商品规格" />

        <el-table-column align="center" property="price" label="单价" />
        <el-table-column align="center" property="unit" label="单位" />
        <el-table-column align="center" property="productNum" label="报损数量" />
        <el-table-column align="center" property="totalPrice" label="合计" />
      </el-table>
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
import { getOrderReview, editShopReview, getShopReviewDetail, delShopReview } from '@/api/purchaseSaleInventory/orderReview'

import { statusListss } from '@/api/order/order'

export default {
  name: 'OrderReview',
  data() {
    return {
      reviewLoading: false,
      reviewData: [],
      reviewCurrentPage: 1,
      reviewPageSize: 10,
      reviewTotal: 0,
      shopId: '',
      startOrderCreatedTime: '',
      endOrderCreatedTime: '',
      nowTime: new Date().getFullYear() + '-' +
          ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
          (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 23:59:59',
      pretermitTime: new Date().getFullYear() + '-' +
          ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
          (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 00:00:00',
      typeOptions: [],
      type: null,
      stockType: 2,
      dialogShopReviewVisible: false,
      shopReviewLoading: false,
      ShopReviewData: [],
      shopReviewCurrentPage: 1,
      shopReviewPageSize: 10,
      shopReviewTotal: 0,
      licenseList: [],
      rules: {
        payPrice: [{ required: true, message: '请输入付款金额', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入摘要内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.reviewLoading = true
    this.startOrderCreatedTime = this.pretermitTime
    this.endOrderCreatedTime = this.nowTime

    // 审核状态枚举
    const data = {}
    statusListss(data).then(res => {
      this.typeOptions = res.data
    })
  },
  methods: {
    getReview(n1, n2) {
      this.reviewLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        status: this.type,
        stockType: this.stockType,
        id: parseInt(this.shopId),
        startCreatedTime: this.startOrderCreatedTime !== '' ? this.startOrderCreatedTime : this.pretermitTime,
        endCreatedTime: this.endOrderCreatedTime !== '' ? this.endOrderCreatedTime : this.nowTime
      }
      getOrderReview(pageNo, pageSize, data).then(res => {
        this.reviewData = res.data.resultList
        this.reviewTotal = res.data.totalCount
        this.reviewLoading = false
      }).catch(err => {
        console.log(err.message)
      })
    },
    // 搜索
    reviewSearch() {
      this.getReview(10, 1)
    },
    // 商品详情
    reviewDetail(index, row) {
      this.dialogShopReviewVisible = true
      this.shopReviewLoading = true
      this.tableRowId = row.id
      this.getShopReviewDetail(10, 1, row.id)
    },
    // 提交
    draftsUpdata(index, row) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 2).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
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
    // 审核
    reviewUpdata(index, row) {
      this.$confirm('审核是否通过?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是，审核通过',
        cancelButtonText: '否，审核未通过',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 4).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
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
      }).catch(action => {
        if (action === 'cancel') {
          editShopReview(row.id, 3).then(res => {
            if (res.code === '0') {
              this.getReview(10, 1)
              this.$message({
                type: 'success',
                message: '提交成功!'
              })
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
            this.getReview(10, 1)
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
    reviewDel(index, row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delShopReview(row.id).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        }).catch(err => {
          console.log(err.message)
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
    reviewHandleSizeChange(val) {
      this.reviewPageSize = val
      this.getReview(val, 1)
      console.log(`每页 ${val} 条`)
      this.reviewCurrentPage = 1
    },
    reviewHandleCurrentChange(val) {
      this.reviewCurrentPage = val
      this.getReview(10, val)
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

<style lang="scss" scoped>

</style>
