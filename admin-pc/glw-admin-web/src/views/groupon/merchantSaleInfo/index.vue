<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="merchantName" label="商家名称" />
      <el-table-column prop="productName" label="商品名称" />
      <el-table-column prop="productSpecs" label="规格" />
      <el-table-column prop="unit" label="单位" />
      <el-table-column prop="saleAmt" label="销售量" />
      <el-table-column prop="salePrice" label="销售额" />
      <el-table-column prop="tradeTime" label="销售日期" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudJob from '@/api/groupon/community'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '商品销售统计',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '商品销售统计',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: true,
        reset: false
      },
      url: 'admin/merchant_sale_info/page_list',
      exportUrl: 'admin/merchant_sale_info/export',
      query: {
        stockType: 4,
        startCreatedTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' 00' + ':' + '00' + ':' + '00',
        endCreatedTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' 23' + ':' + '59' + ':' + '59'
      },
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
      }
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
