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
      <el-table-column prop="userName" label="用户" width="200px" />
      <el-table-column prop="refundChannelDesc" label="退款渠道" width="200px" />
      <el-table-column prop="refundAmount" label="退款金额" width="200px" />
      <el-table-column prop="refundStatusDesc" label="退款状态" width="200px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
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
  name: '退款列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '退款管理',
      url: process.env.VUE_APP_cashier_API + 'api/refund/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['refund_add'],
        edit: ['refund_update'],
        del: ['refund_delete']
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
