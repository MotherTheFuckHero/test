<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="name" label="直播间名称" :show-overflow-tooltip="true" width="250px" />
      <el-table-column prop="actorName" label="主播名称" width="150px" />
      <el-table-column prop="columnName" label="分类名称" width="100px" />
      <el-table-column prop="cameraCount" label="机位数量" width="100px" />
      <el-table-column prop="position" label="地区" width="100px" />
      <el-table-column prop="surpport" label="点赞数量" width="100px" />
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">
          {{ scope.row.status === true ? '正在直播': '停播' }}
        </template>
      </el-table-column>
      <el-table-column label="海报" prop="coverUrl" width="100">
        <template slot-scope="scope">
          <a :href="scope.row.coverUrl"><img alt="" :src="scope.row.coverUrl" width="40" height="40"></a>
        </template>
      </el-table-column>

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['glw_live_update','glw_live_delete']"
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
import crudJob from '@/api/live/liveroom'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '直播列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '直播管理',
      url: process.env.VUE_APP_live_API + '/admin/glw_live/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['glw_live_add'],
        edit: ['glw_live_update'],
        del: ['glw_live_delete']
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
