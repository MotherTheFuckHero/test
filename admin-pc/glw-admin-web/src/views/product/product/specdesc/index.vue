<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="150" />
      <el-table-column prop="languageName" label="语言" width="100px" />
      <el-table-column prop="productSpecs" label="规格名称" width="200px" />
      <el-table-column prop="unit" label="单位" width="80px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_spec_update','product_spec_delete']"
        label="操作"
        width="130px"
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
import crudJob from '@/api/product/specdesc'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: 'Product',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    const productId = JSON.parse(localStorage.getItem('productId'))
    return CRUD({
      title: '商品规格语言',
      url: 'admin/product_spec/page_list',
      query: { productId: productId },
      crudMethod: { ...crudJob }
    })
  },

  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['product_spec_add'],
        edit: ['product_spec_update'],
        del: ['product_spec_delete']
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
