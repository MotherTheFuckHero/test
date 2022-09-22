<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" :row-style="isError" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column align="center" prop="id" label="编号" width="150px" />
      <el-table-column align="center" prop="merchantName" label="商家名称" width="150px" />
      <el-table-column align="center" prop="cateGoryName" label="分类" width="150px" />
      <el-table-column align="center" prop="productName" label="商品名称" width="150px" />
      <el-table-column align="center" prop="productSpecs" label="规格" width="100px" />
      <el-table-column align="center" prop="unit" label="单位" width="100px" />
      <el-table-column align="center" prop="productSpecStock.stockCount" label="库存" width="100px" />
      <el-table-column align="center" prop="productSpecStock.warehouseDesc" label="仓库名称" width="100px" />
      <el-table-column align="center" prop="productSpecStock.stockFictitiousCount" label="虚拟库存" width="100px" />
      <el-table-column align="center" prop="productSpecStock.stockLimitCount" label="预警库存" width="100px" />
      <el-table-column align="center" prop="productStatusDesc" label="商品状态" width="80px" />
      <el-table-column label="创建人" prop="createdUserName" width="150px" />
      <el-table-column label="创建时间" prop="createdTime" width="150px" />
      <el-table-column label="修改人" prop="updatedUserName" width="150px" />
      <el-table-column label="修改时间" prop="updatedTime" width="150px" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_spec_update']"
        label="操作"
        width="150px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
<!--          <udOperation-->
<!--            :data="scope.row"-->
<!--            :permission="permission"-->
<!--            style="display: inline-block"-->
<!--          />-->
          <el-button size="mini" class="filter-item" type="warning" icon="el-icon-document" @click="stockDetail(scope.$index, scope.row)">库存明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <!--库存明细-->
    <stockDetail ref="stockDetail" />
  </div>
</template>

<script>
import crudJob from '@/api/purchaseSaleInventory/productSpec'
import eHeader from './header'
import eForm from './form'
import stockDetail from './stockAllDetail'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/U.operation'

export default {
  name: '库存管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, stockDetail },
  cruds() {
    return CRUD({
      title: '商品价格库存管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: true,
        reset: true
      },
      url: 'admin/product_spec/page_list',
      exportUrl: 'admin/product_spec/export',
      query: { languageId: 1 },
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
    // 库存明细
    stockDetail(index, row) {
      this.$refs.stockDetail.stockDialogShow(index, row)
    },
    isError({ row, column, rowIndex, columnIndex }) {
      if (row.productSpecStock.stockCount < row.productSpecStock.stockLimitCount) {
        return {
          background: '#fffacd'
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
