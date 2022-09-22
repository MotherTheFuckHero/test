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
      <el-table-column prop="enterpriseUserName" label="审核人" />
      <el-table-column prop="enterpriseName" label="企业名称" />
      <el-table-column prop="amount" label="提现金额" />
      <el-table-column prop="statusDesc" label="审核状态" />
      <el-table-column prop="typeDesc" label="提现方式" />
      <el-table-column prop="remark" label="备注" />

      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['enterprise_user_withdraw_update']"
        label="操作"
        width="110px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            v-if="scope.row.status === 1"
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
import crudJob from '@/api/enterprise/enterpriseUserWithdraw'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import eForm from './form'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/S.operation'

export default {
  name: '企业提现审核',
  components: { eHeader, crudOperation, pagination, udOperation, eForm },
  cruds() {
    return CRUD({
      title: '企业提现审核',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_user_withdraw/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogFormVisib: false,
      addForm: {
        id: '',
        status: 3,
        headId: '',
        type: '',
        amount: ''
      },
      permission: {
        add: ['enterprise_user_withdraw_add'],
        edit: ['enterprise_user_withdraw_update'],
        del: ['enterprise_user_withdraw_delete']
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
