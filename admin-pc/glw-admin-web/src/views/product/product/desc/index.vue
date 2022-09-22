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
      <el-table-column prop="languageName" label="语言" width="80px" />
      <el-table-column prop="title" label="商品标题" width="80px" />
      <el-table-column prop="unit" label="单位" width="80px" />
      <el-table-column prop="remarks" label="备注" width="80px" />
      <el-table-column prop="keyword" label="关键字" width="80px" />
      <el-table-column prop="sellPoint" label="商品卖点" :show-overflow-tooltip="true" width="150px" />
      <el-table-column prop="availableDates" label="可用日期" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_desc_update','product_desc_delete']"
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
import crudJob from '@/api/product/productdesc'
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
      title: '商品语言',
      url: 'admin/product_desc/page_list',
      query: { productId: productId },
      crudMethod: { ...crudJob }
    })
  },

  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['product_desc_add'],
        edit: ['product_desc_update'],
        del: ['product_desc_delete']
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
