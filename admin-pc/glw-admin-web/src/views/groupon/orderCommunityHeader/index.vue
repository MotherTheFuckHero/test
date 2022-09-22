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
      <el-table-column prop="orderId" label="订单编号" width="150px" />
      <el-table-column prop="communityHead.name" label="团长名称" width="150px" />
      <el-table-column prop="commission" label="所的佣金" width="150px" />
      <el-table-column prop="commissionTypeDesc" label="佣金类型" width="150px" />
      <el-table-column prop="createdTime" label="生成时间" width="150px" />
      <el-table-column prop="orderInfo.payPrice" label="订单金额" width="150px" />
      <el-table-column prop="orderInfo.refundPrice" label="退款金额" width="150px" />
      <el-table-column prop="orderInfo.isFirstOrder" label="是否首单" width="150px">
        <template slot-scope="scope">
          {{ scope.row.orderInfo.isFirstOrder===true?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column prop="orderInfo.orderStatusDesc" label="订单状态" width="150px" />
      <el-table-column label="结算状态" width="150px">
        <template slot-scope="scope">
          <span v-if="scope.row.calFlag=='1'" class="successcolor">已进账</span>
          <span v-else class="errorcolor">未入账</span>
        </template>
      </el-table-column>
      <el-table-column prop="calTime" label="结算时间" width="150px" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudJob from '@/api/groupon/headCheck'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '社区团长佣金流水',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '社区佣金流水管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: true,
        reset: true
      },
      url: 'admin/order_community_header/page_list',
      exportUrl: 'admin/order_community_header/export',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['order_community_header_add'],
        edit: ['order_community_header_update'],
        export: ['order_community_header_export'],
        del: ['order_community_header_delete']
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
