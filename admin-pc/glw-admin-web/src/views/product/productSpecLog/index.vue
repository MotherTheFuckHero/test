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
      <el-table-column prop="merchantName" label="商家" />
      <el-table-column prop="product.title" label="商品名称" />
      <el-table-column prop="productSpec.productSpecs" label="规格" />
      <el-table-column prop="fieldValue" label="平台价变动记录" />
      <el-table-column prop="gradeName" label="用户等级" />

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>
<script>
import crudJob from '@/api/order/order'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '价格变动记录',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '价格变动记录',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: false
      },
      url: 'admin/product_spec_log/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
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
