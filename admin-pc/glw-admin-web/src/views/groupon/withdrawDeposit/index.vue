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
      <el-table-column prop="communityHead.name" label="团长名称" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column prop="amount" label="金额" width="150px" />
      <el-table-column prop="remark" label="拒绝原因" width="200px" />
      <el-table-column label="审核人" prop="updatedUserName" width="200" />
      <el-table-column label="审核时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['withdraw_deposit_update']"
        label="操作"
        width="110px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            v-if="scope.row.status === 0"
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
  </div>
</template>

<script>
import crudJob from '@/api/groupon/withdrawDeposit'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/S.operation'

export default {
  name: 'WithdrawDeposit',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '提现审核管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_community_API + '/admin/withdraw_deposit/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['withdraw_deposit_add'],
        edit: ['withdraw_deposit_update'],
        del: ['withdraw_deposit_delete']
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
