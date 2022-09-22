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
      <el-table-column prop="createdUserName" label="打赏人名称" width="150px" />
      <el-table-column prop="liveName" label="直播名称" width="250px" />
      <el-table-column prop="giftName" label="礼物名称" width="150px" />
      <el-table-column prop="giftNum" label="打赏个数" width="150px" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <!--   编辑与删除   -->

    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
  </div>
</template>

<script>
import crudJob from '@/api/system/sys'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '打赏记录列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '直播打赏记录',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_live_API + '/admin/live_tipgift/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['live_tipgift_add'],
        edit: ['live_tipgift_update'],
        del: ['live_tipgift_delete']
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
