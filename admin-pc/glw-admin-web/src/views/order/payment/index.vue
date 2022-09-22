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
      <el-table-column prop="orderId" label="订单编号" width="200px" />
      <el-table-column prop="payStatusName" label="支付状态" width="150px" />
      <el-table-column prop="productName" label="商品名称" width="150px" />
      <el-table-column prop="payerId" label="付款人编号" width="150px" />
      <el-table-column prop="payerName" label="付款人" width="150px" />
      <el-table-column prop="orderAmount" label="订单金额" width="150px" />
      <el-table-column prop="payerAmount" label="付款金额" width="150px" />
      <el-table-column prop="payChannelName" label="支付方式" width="150px" />
      <el-table-column prop="remark" label="评论" width="150px" />
      <el-table-column prop="payNo" label="返回单号" width="150px" />
      <el-table-column prop="createTimeFormat" label="创建时间" width="150px" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudJob from '@/api/system/sys'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '支付列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '支付管理',
      url: process.env.VUE_APP_cashier_API + 'api/payment/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['payment_add'],
        edit: ['payment_update'],
        del: ['payment_delete']
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
