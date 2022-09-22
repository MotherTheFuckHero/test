<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="enterpriseName" label="企业名称" />
      <el-table-column prop="productName" label="商品名称" />
      <el-table-column prop="specName" label="规格" />
      <el-table-column prop="productNum" label="收藏数量" />
      <el-table-column label="创建人" prop="createdUserName" />
      <el-table-column label="创建时间" prop="createdTime" />
      <el-table-column label="修改人" prop="updatedUserName" />
      <el-table-column label="修改时间" prop="updatedTime" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['enterprise_collect_update','enterprise_collect_delete']"
        label="操作"
        width="300px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
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
import crudJob from '@/api/enterprise/enterpriseStar'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '企业用户收藏管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '企业用户收藏管理',
      url: process.env.VUE_APP_enterprise_API + 'admin/enterprise_collect/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  data() {
    return {
      permission: {
        add: ['enterprise_collect_add'],
        edit: ['enterprise_collect_update'],
        del: ['enterprise_collect_delete']
      }
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
