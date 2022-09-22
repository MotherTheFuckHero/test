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
      <el-table-column prop="name" label="导游名称" width="150px" />
      <el-table-column prop="userName" label="绑定用户" width="150px" />
      <el-table-column prop="guidePhone" label="导游手机号" width="150px" />
      <el-table-column prop="companyName" label="所属分公司" width="150px" />
      <el-table-column prop="levelName" label="导游级别" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column prop="expensesTypeDesc" label="费用类型" width="150px" />
      <el-table-column prop="expensesValue" label="结算费用" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['guide_user_update']"
        label="操作"
        width="100px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <eForm />
  </div>
</template>

<script>
import crudJob from '@/api/guide/guideUser'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/U.operation'
export default {
  name: '导游管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '导游管理',
      url: 'admin/guide_user/page_list',
      query: { languageId: 1 },
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['guide_user_add'],
        edit: ['guide_user_update'],
        del: ['guide_user_delete']
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
