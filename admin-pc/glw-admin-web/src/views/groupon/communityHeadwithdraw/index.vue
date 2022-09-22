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
      <el-table-column prop="headName" label="团长" width="150px" />
      <el-table-column prop="typeDesc" label="提现方式" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column prop="amount" label="提现金额" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />

      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['community_head_withdraw_update']"
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
import crudJob from '@/api/groupon/CommunityHeadwithdraw'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import eForm from './form'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/S.operation'

export default {
  name: '社区团长提现审核',
  components: { eHeader, crudOperation, pagination, udOperation, eForm },
  cruds() {
    return CRUD({
      title: '团长提现审核管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_community_API + '/admin/community_head_withdraw/page_list',
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
        add: ['community_head_withdraw_add'],
        edit: ['community_head_withdraw_update'],
        del: ['community_head_withdraw_delete']
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
