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
      <el-table-column prop="userId" label="用户编号" width="150px" />
      <el-table-column prop="userName" label="用户" width="150px" />
      <el-table-column prop="ip" label="访问ip" width="150px" />
      <el-table-column prop="systemName" label="系统名称" width="150px" />
      <el-table-column prop="languageName" label="语言" width="150px" />
      <el-table-column :show-overflow-tooltip="true" prop="action" label="类及方法" width="150px" />
      <el-table-column :show-overflow-tooltip="true" prop="parameter" label="参数" width="150px" />
      <el-table-column :show-overflow-tooltip="true" prop="result" label="返回结果" width="150px" />
      <el-table-column label="状态" prop="status" width="120">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '成功': '' }}
          {{ scope.row.status === 2 ? '失败': '' }}
          {{ scope.row.status === 3 ? '异步': '' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->

    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
  </div>
</template>

<script>
import crudJob from '@/api/system/sys'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '系统日志列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '系统日志',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/sys_log/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['sys_log_add'],
        edit: ['sys_log_update'],
        del: ['sys_log_delete']
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
