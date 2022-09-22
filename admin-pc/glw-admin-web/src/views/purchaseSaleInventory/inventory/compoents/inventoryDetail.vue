<template>
  <div class="inventory-detail">
    <div class="head-container">
      <el-input
        v-model="shopId"
        clearable
        size="small"
        placeholder="输入盘点单搜索"
        style="width: 200px;"
        class="filter-item"
        @input="numValid('shopId')"
      />
      <el-select
        v-model="type"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择状态搜索"
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
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="inventorySearch">搜索</el-button>
    </div>
    <el-table ref="table" v-loading="inventoryLoading" :data="inventoryData" style="width: 100%;">
      <el-table-column width="160px" property="id" label="盘点单号" />
      <el-table-column show-overflow-tooltip property="warehouseDesc" label="盘点仓库" />
      <el-table-column show-overflow-tooltip property="checkMoreAmt" label="盘赢数量" />
      <el-table-column show-overflow-tooltip property="checkMorePrice" label="盘赢金额" />
      <el-table-column show-overflow-tooltip property="checkLessAmt" label="盘损数量" />
      <el-table-column show-overflow-tooltip property="checkLessPrice" label="盘损金额" />
      <el-table-column width="140px" property="createdTime" label="盘点时间" />
      <el-table-column show-overflow-tooltip property="employName" label="负责人" />
      <el-table-column show-overflow-tooltip property="statusDesc" label="审核状态" />
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" size="mini" type="primary" @click="draftsUpdata(scope.$index, scope.row)">提交审核</el-button>
          <el-button size="mini" type="info" @click="inventoryDetail(scope.$index, scope.row)">商品详情</el-button>
          <el-button v-if="scope.row.status === 2 || scope.row.status === 3" size="mini" type="primary" @click="inventoryUpdata(scope.$index, scope.row)">审核</el-button>
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
          <!--          <el-button v-if="scope.row.status === 1 || scope.row.status === 2 || scope.row.status === 3" size="mini" type="danger" @click="reviewDel(scope.$index, scope.row)">作废</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="inventoryCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="inventoryPageSize"
        layout="total, prev, pager, next"
        :total="inventoryTotal"
        @size-change="inventoryHandleSizeChange"
        @current-change="inventoryHandleCurrentChange"
      />
    </div>
    <!--商品详情-->
    <el-dialog title="商品详情" :visible.sync="dialogShopInventoryVisible" :close-on-click-modal="false">
      <el-table v-loading="shopInventoryLoading" :data="ShopInventoryData">
        <el-table-column align="center" property="productDesc" label="商品名称" />
        <el-table-column align="center" property="specDesc" label="商品规格" />
        <el-table-column align="center" property="stockPrice" label="上次进价" />
        <el-table-column align="center" property="stockNum" label="库存数" />
        <el-table-column align="center" property="checkNum" label="盘点数" />
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="shopInventoryCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="shopInventoryPageSize"
          layout="total, prev, pager, next"
          :total="shopInventoryTotal"
          @size-change="shopInventoryHandleSizeChange"
          @current-change="shopInventoryHandleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInventoryDetail, getInventoryDetailList, edit, del } from '@/api/purchaseSaleInventory/inventory'
import { statusListss } from '@/api/order/order'
export default {
  name: 'InventoryDetail',
  data() {
    return {
      shopId: '',
      type: null,
      typeOptions: [],
      startOrderCreatedTime: '',
      endOrderCreatedTime: '',
      nowTime: new Date().getFullYear() + '-' +
                    ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 23:59:59',
      pretermitTime: new Date().getFullYear() + '-' +
                    ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 00:00:00',
      inventoryLoading: false,
      inventoryData: [],
      inventoryCurrentPage: 1,
      inventoryPageSize: 10,
      inventoryTotal: 0,
      dialogShopInventoryVisible: false,
      shopInventoryLoading: false,
      ShopInventoryData: [],
      shopInventoryCurrentPage: 1,
      shopInventoryPageSize: 10,
      shopInventoryTotal: 0,
      tableRowId: ''
    }
  },
  created() {
    this.startOrderCreatedTime = this.pretermitTime
    this.endOrderCreatedTime = this.nowTime
    statusListss({}).then(res => {
      if (res.code === '0') {
        const newArr = []
        for (const i in res.data) {
          if (res.data[i].name !== '入库' && res.data[i].name !== '作废') {
            newArr.push(res.data[i])
          }
        }
        this.typeOptions = newArr
      }
    })
  },
  methods: {
    inventorySearch() {
      this.getInventory(10, 1)
    },
    getInventory(n1, n2) {
      this.inventoryLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        status: this.type,
        id: parseInt(this.shopId),
        startCreatedTime: this.startOrderCreatedTime !== '' ? this.startOrderCreatedTime : this.pretermitTime,
        endCreatedTime: this.endOrderCreatedTime !== '' ? this.endOrderCreatedTime : this.nowTime
      }
      getInventoryDetail(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.inventoryData = res.data.resultList
          this.inventoryTotal = res.data.totalCount
          this.inventoryLoading = false
        } else {
          this.$notify.error({
            title: '请求失败',
            message: res.msg
          })
        }
      })
    },
    //  提交审核
    draftsUpdata(index, row) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        edit(row.id, 2).then(res => {
          if (res.code === '0') {
            this.getInventory(10, 1)
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
    inventoryUpdata(index, row) {
      this.$confirm('审核是否通过?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是，审核通过',
        cancelButtonText: '否，审核未通过',
        type: 'warning',
        center: true
      }).then(() => {
        edit(row.id, 4).then(res => {
          if (res.code === '0') {
            this.getInventory(10, 1)
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
      }).catch(action => {
        if (action === 'cancel') {
          edit(row.id, 3).then(res => {
            this.getInventory(10, 1)
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
        edit(row.id, 6).then(res => {
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
    // 作废
    reviewDel(index, row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        del(row.id).then(res => {
          if (res.code === '0') {
            this.getInventory(10, 1)
            this.$message.success('操作成功')
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 商品详情
    inventoryDetail(index, row) {
      this.dialogShopInventoryVisible = true
      this.tableRowId = row.id
      this.getShopInventoryDetail(10, 1, row.id)
    },
    // 商品详情
    getShopInventoryDetail(n1, n2, Id) {
      this.shopInventoryLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        stockcheckId: Id
      }
      getInventoryDetailList(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.ShopInventoryData = res.data.resultList
          this.shopInventoryTotal = res.data.totalCount
          this.shopInventoryLoading = false
        } else {
          this.$notify.error({
            title: '请求失败',
            message: res.msg
          })
        }
      })
    },
    inventoryHandleSizeChange(val) {
      this.inventoryPageSize = val
      this.getInventory(val, 1)
      console.log(`每页 ${val} 条`)
      this.inventoryCurrentPage = 1
    },
    inventoryHandleCurrentChange(val) {
      this.inventoryCurrentPage = val
      this.getInventory(10, val)
      console.log(`当前页: ${val}`)
    },
    shopInventoryHandleSizeChange(val) {
      this.shopInventoryPageSize = val
      this.getShopInventoryDetail(val, 1, this.tableRowId)
      console.log(`每页 ${val} 条`)
      this.shopInventoryCurrentPage = 1
    },
    shopInventoryHandleCurrentChange(val) {
      this.shopInventoryCurrentPage = val
      this.getShopInventoryDetail(10, val, this.tableRowId)
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
