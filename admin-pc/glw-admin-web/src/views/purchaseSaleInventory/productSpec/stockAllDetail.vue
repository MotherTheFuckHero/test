<template>
  <el-dialog width="70%" title="库存明细" :visible.sync="dialogStockVisible" :close-on-click-modal="false" @close="stockDialogUnShow">
    <div class="head-container">
      <el-select
        v-model="stockType"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择库存类型"
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
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="stockSearch">搜索</el-button>
    </div>
    <el-table ref="table" v-loading="stockLoading" :data="stockData" style="width: 100%;">
      <el-table-column type="index" label="序号" />
      <el-table-column width="140px" align="center" property="createdTime" label="日期" />
      <el-table-column show-overflow-tooltip align="center" property="id" label="单据编号" />
      <el-table-column show-overflow-tooltip align="center" property="stockTypeDesc" label="单据类型" />
      <el-table-column show-overflow-tooltip align="center" property="productId" label="商品编号" />
      <el-table-column show-overflow-tooltip align="center" property="productName" label="商品名称" />
      <el-table-column show-overflow-tooltip align="center" property="supplierId" label="供应商" />
<!--      <el-table-column show-overflow-tooltip align="center" property="userName" label="客户" />-->
      <el-table-column show-overflow-tooltip align="center" property="productNum" label="数量" />
      <el-table-column show-overflow-tooltip align="center" property="price" label="单价（元）" />
      <el-table-column show-overflow-tooltip align="center" property="unit" label="总价" />
      <el-table-column show-overflow-tooltip align="center" property="remarks" label="备注" />
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="stockCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="stockPageSize"
        layout="total, prev, pager, next"
        :total="stockTotal"
        @size-change="stockHandleSizeChange"
        @current-change="stockHandleCurrentChange"
      />
    </div>
  </el-dialog>
</template>

<script>
import { getProductIdLists, statusListss } from '@/api/purchaseSaleInventory/productSpec'
export default {
  name: 'StockAllDetail',
  data() {
    return {
      dialogStockVisible: false,
      stockLoading: false,
      stockData: [],
      stockCurrentPage: 1,
      stockPageSize: 10,
      stockTotal: 0,
      stockSpecId: '',
      stockType: '',
      typeOptions: [],
      startOrderCreatedTime: '',
      endOrderCreatedTime: ''
    }
  },
  created() {
    statusListss({}).then(res => {
      this.typeOptions = res.data
    })
  },
  methods: {
    stockDialogShow(index, row) {
      this.dialogStockVisible = true
      this.stockLoading = true
      this.stockSpecId = row.productSpecStock.specId
      this.getStock(10, 1, this.stockSpecId)
    },
    getStock(n1, n2, specId) {
      this.stockLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        stockType: this.stockType,
        startCreatedTime: this.startOrderCreatedTime,
        endCreatedTime: this.endOrderCreatedTime,
        status: 5,
        specId: specId
      }
      getProductIdLists(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.stockData = res.data.resultList
          this.stockTotal = res.data.totalCount
          this.stockLoading = false
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    stockSearch() {
      this.getStock(10, 1, this.stockSpecId)
    },
    stockDialogUnShow() {
      this.dialogStockVisible = false
      this.stockType = ''
      this.startOrderCreatedTime = ''
      this.endOrderCreatedTime = ''
    },
    stockHandleSizeChange(val) {
      this.stockPageSize = val
      this.getStock(val, 1, this.stockSpecId)
      this.stockCurrentPage = 1
    },
    stockHandleCurrentChange(val) {
      this.stockCurrentPage = val
      this.getStock(10, val, this.stockSpecId)
    }
  }
}
</script>

<style scoped>

</style>
