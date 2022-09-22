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
      <el-table-column prop="liveName" label="直播间名称" :show-overflow-tooltip="true" width="250px" />
      <el-table-column prop="playName" label="回放名称" :show-overflow-tooltip="true" width="250px" />
      <el-table-column prop="playSize" label="文件大小" width="100px" />
      <el-table-column prop="playUrl" label="文件地址" width="350px">
        <template slot-scope="scope">
          <a :href="scope.row.playUrl">{{ scope.row.playUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="海报" prop="imageUrl" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.imageUrl" target="_blank"><img alt="" :src="scope.row.imageUrl" width="40" height="40"></a>
        </template>
      </el-table-column>

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['live_playback_update','live_playback_delete']"
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
import crudJob from '@/api/live/liveplayback'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '直播回放列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '直播回放管理',
      url: process.env.VUE_APP_live_API + '/admin/live_playback/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['live_playback_add'],
        edit: ['live_playback_update'],
        del: ['live_playback_delete']
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
