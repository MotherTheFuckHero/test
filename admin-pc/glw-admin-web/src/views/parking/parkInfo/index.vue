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
      <el-table-column prop="merchantName" label="商家名称" width="150px" />
      <el-table-column prop="parkName" label="停车场名称" width="150px" />
      <el-table-column prop="statusDesc" label="停车场状态" width="150px" />
      <el-table-column prop="parkLon" label="停车场经度" width="150px" />
      <el-table-column prop="parkLat" label="停车场纬度" width="150px" />
      <el-table-column prop="parkAddress" label="停车场地址" width="150px" />
      <el-table-column label="停车场图片" prop="parkPicDesc" width="150px">
        <template slot-scope="scope">
          <a v-if="scope.row.parkPicDesc !== undefined" :href="scope.row.parkPicDesc"><img alt="" :src="scope.row.parkPicDesc" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['park_info_update','park_info_delete']"
        label="操作"
        width="200px"
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
    <eForm />
  </div>
</template>

<script>
import crudJob from '@/api/parking/parkInfo'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '停车场列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '停车场管理',
      url: 'admin/park_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['park_info_add'],
        edit: ['park_info_update'],
        del: ['park_info_delete']
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
