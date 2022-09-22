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
      <el-table-column prop="companyName" label="分公司名称" width="150px" />
      <el-table-column prop="deviceName" label="终端名称" width="150px" />
      <el-table-column prop="deviceCode" label="终端编号" width="150px" />
      <el-table-column prop="merchantName" label="商家名称" width="150px" />
      <el-table-column prop="productDesc" label="商品名称" width="150px" />
      <el-table-column prop="onlineStatusDesc" label="状态" width="150px" />
      <el-table-column prop="turnoverDesc" label="进出类型" width="150px" />
      <el-table-column prop="deviceTypeDesc" label="设备类型" width="150px" />
      <el-table-column prop="deviceAgreeDesc" label="设备协议" width="150px" />
      <el-table-column prop="deviceFirm" label="设备厂商" width="150px" />
      <el-table-column prop="signTime" label="签到时间" width="150px" />
      <el-table-column prop="lastHeartbeatTime" label="最后心跳时间" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_device_update','merchant_device_delete']"
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
import crudJob from '@/api/device/merchantDevice'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '商家设备列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '商家设备管理',
      url: 'admin/merchant_device/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['merchant_device_add'],
        edit: ['merchant_device_update'],
        del: ['merchant_device_delete']
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
