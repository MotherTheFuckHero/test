<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="communityHead.id" label="编号" width="100" />
      <el-table-column prop="communityHead.name" label="团长名称" width="150px" />
      <el-table-column prop="communityHead.phone" label="手机号" width="150px" />
      <el-table-column prop="communityHead.communityHeadAddress.community.name" label="社区名称" width="150px" />
      <el-table-column prop="saleAmt" label="订单量" width="150px" />
      <el-table-column prop="salePrice" label="交易金额" width="150px" />
      <el-table-column prop="refundAmt" label="退款数量" width="150px" />
      <el-table-column prop="refundPrice" label="退款金额" width="150px" />
      <!--   编辑与删除   -->

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
  name: '社区团长销售统计',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '社区团长销售统计',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_community_API + '/admin/community_head/detail',
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
