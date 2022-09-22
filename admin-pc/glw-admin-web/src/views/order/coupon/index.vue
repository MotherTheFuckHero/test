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
      <el-table-column prop="name" label="优惠券名称" width="150px" />
      <el-table-column prop="desc" label="优惠券介绍" width="150px" />
      <el-table-column prop="tag" label="标签" width="150px" />
      <el-table-column prop="typeDesc" label="优惠券类型" width="150px" />
      <el-table-column prop="discount" label="优惠金额" width="150px" />
      <el-table-column prop="stockCount" label="库存" width="150px" />
      <el-table-column prop="min" label="最低使用金额" width="150px" />
      <el-table-column prop="limitCount" label="领取数量限制" width="150px" />
      <el-table-column prop="scopeTypeDesc" label="限制类型" width="150px" />
      <el-table-column prop="timeTypeDesc" label="有效时间限制类型" width="150px" />
      <el-table-column prop="days" label="有效天数" width="150px" />
      <el-table-column prop="startTime" label="开始使用时间" width="150px" />
      <el-table-column prop="endTime" label="结束使用时间" width="150px" />
      <el-table-column label="状态" prop="statusDesc" width="100" />

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['coupon_update','coupon_delete']"
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
import crudJob from '@/api/order/coupon'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '优惠券列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '优惠券管理',
      url: 'admin/coupon/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['coupon_add'],
        edit: ['coupon_update'],
        del: ['coupon_delete']
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
