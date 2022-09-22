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
      <el-table-column prop="merchantName" label="绑定商家" />
      <el-table-column prop="supplierName" label="供应商名称" />
      <el-table-column prop="supplierTel" label="联系电话" />
      <el-table-column prop="licenseNo" label="营业执照号" />
      <el-table-column prop="addressInfo" label="供货商地址" />
      <el-table-column prop="statusDesc" label="合作状态" />
      <el-table-column label="创建人" prop="createdUserName" />
      <el-table-column label="创建时间" prop="createdTime" />
      <el-table-column label="修改人" prop="updatedUserName" />
      <el-table-column label="修改时间" prop="updatedTime" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['park_layer_update','park_layer_delete']"
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
import crudJob from '@/api/purchaseSaleInventory/supplierManage'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '供应商管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '供应商管理',
      url: 'admin/supplier_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['park_layer_add'],
        edit: ['park_layer_update'],
        del: ['park_layer_delete']
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
