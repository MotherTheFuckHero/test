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
      <el-table-column prop="userName" label="用户名称" width="150px" />
      <el-table-column prop="userId" label="用户编号" width="150px" />
      <el-table-column label="地址类型" prop="addressType" width="100">
        <template slot-scope="scope">
          {{ scope.row.addressType === 1 ? '家': '' }}
          {{ scope.row.addressType === 2 ? '公司': '' }}
          {{ scope.row.addressType === 3 ? '学校': '' }}
          {{ scope.row.addressType === 4 ? '其他': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="receiverName" label="收件人" width="150px" />
      <el-table-column prop="receiverPhone" label="固定电话" width="150px" />
      <el-table-column prop="receiverStateName" label="省份" width="150px" />
      <el-table-column prop="receiverCityName" label="城市" width="150px" />
      <el-table-column prop="receiverDistrictName" label="区、县" width="150px" />
      <el-table-column prop="receiverAddress" label="详细地址" width="250px" />
      <el-table-column prop="receiverZip" label="邮政编码" width="150px" />
      <el-table-column label="是否默认" prop="isDefault" width="100">
        <template slot-scope="scope">
          {{ scope.row.isDefault === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime" width="200" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudJob from '@/api/system/sys'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '用户地址',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '用户地址',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/user_address/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['user_address_add'],
        edit: ['user_address_update'],
        del: ['user_address_delete']
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
