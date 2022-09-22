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
      <el-table-column prop="userId" label="用户编号" width="100px" />
      <el-table-column label="收藏类型" prop="favoriteTypeDesc" width="100" />
      <el-table-column prop="valueName" label="收藏名称" width="300px" />
      <el-table-column prop="valueId" label="收藏编号" width="100px" />
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
  name: '用户收藏',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '用户收藏',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/user_favorite/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['user_favorite_add'],
        edit: ['user_favorite_update'],
        del: ['user_favorite_delete']
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
