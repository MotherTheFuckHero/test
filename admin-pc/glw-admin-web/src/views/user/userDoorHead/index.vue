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
      <el-table-column prop="userId" label="用户编号" width="150px" />
      <el-table-column prop="realName" label="真实姓名" width="150px" />
      <el-table-column prop="phone" label="用户手机号" width="150px" />
      <el-table-column prop="communityName" label="社区名称" width="150px" />
      <el-table-column prop="workName" label="单位名称" width="150px" />
      <el-table-column prop="doorName" label="负责楼门名称" width="150px" />
      <el-table-column prop="sexDesc" label="性别" width="130px" />
      <el-table-column prop="politicalName" label="政治面貌" width="130px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudJob from '@/api/user/userinfo'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '楼门长管理',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '楼门长管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: false
      },
      url: '/admin/user_door_head/page_list',
      exportUrl: 'admin/user_door_head/download',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['user_door_head_add']
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
