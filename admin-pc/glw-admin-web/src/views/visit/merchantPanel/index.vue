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
      <el-table-column prop="companyName" label="分公司" width="100px" />
      <el-table-column prop="name" label="板块名称" width="100px" />
      <el-table-column prop="merchantName" label="商家名称" width="150px" />
      <el-table-column label="板块图标" prop="iconUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.iconUrl === null ? false: true " :href="scope.row.iconUrl"><img alt="" :src="scope.row.iconUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column prop="styleName" label="样式" width="100px" />
      <el-table-column prop="statusDesc" label="状态" width="100px" />
      <el-table-column prop="sortNo" label="排序" width="100px" />
      <el-table-column prop="limitNum" label="板块显示数量" width="150px" />
      <el-table-column prop="typeDesc" label="类型" width="100px" />
      <el-table-column prop="systemName" label="系统名称" width="150px" />
      <el-table-column prop="parentName" label="父板块" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_panel_update','merchant_panel_delete']"
        label="操作"
        width="200"
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
    <!--表单渲染-->
    <eForm />
  </div>
</template>

<script>
import crudJob from '@/api/visit/merchantPanel'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '商家板块管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '商家板块管理',
      url: process.env.VUE_APP_visit_API + 'admin/merchant_panel/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['merchant_panel_add'],
        edit: ['merchant_panel_update'],
        del: ['merchant_panel_delete']
      },
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
