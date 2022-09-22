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
      <el-table-column prop="merchantName" label="商户名称" width="150px" />
      <el-table-column prop="productName" label="商品名称" width="200px" />
      <el-table-column prop="productSpecs" label="规格" width="100px" />
      <el-table-column prop="unit" label="单位" width="100px" />
      <el-table-column prop="userTypeDesc" label="用户类型" width="100px" />
      <el-table-column prop="productSpecStock.stockCount" label="库存" width="100px" />
      <el-table-column prop="limitNum" label="限购数量" width="100px" />
      <el-table-column prop="minNum" label="最低购买数量" width="100px" />
      <el-table-column prop="platFormPrice" label="平台价" width="100px" />
      <el-table-column prop="retailPrice" label="建议零售价" width="100px" />
      <el-table-column prop="storePrice" label="门店价格" width="100px" />
      <el-table-column prop="discountPrice" label="折扣价" width="100px" />
      <el-table-column prop="vipPrice" label="会员价" width="100px" />

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_spec_update']"
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
    <!--表单渲染-->
    <eForm />
  </div>
</template>

<script>
import crudJob from '@/api/product/productSpec'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/U.operation'

export default {
  name: 'ProductSpec',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '商品价格库存管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/product_spec/page_list',
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
