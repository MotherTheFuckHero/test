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
      <el-table-column label="模板名称" prop="name" width="150px" />
      <el-table-column label="主播名称" prop="userName" width="150px" />
      <el-table-column label="分辨率" prop="resolution" width="100" />
      <el-table-column label="码率" prop="bitrate" width="100" />
      <el-table-column label="帧率" prop="fps" width="100" />
      <el-table-column label="宽高比" prop="ratio" width="100" />
      <el-table-column label="垫片路径" :show-overflow-tooltip="true" prop="backFileUrl" width="150px" />
      <el-table-column label="台标路径" :show-overflow-tooltip="true" prop="stationLogoUrl" width="150px" />
      <el-table-column label="顶部字幕" prop="subtitleTop" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['glw_live_template_update','glw_live_template_delete']"
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
import crudJob from '@/api/live/livetemplate'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '直播模板管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '直播模板管理',
      url: process.env.VUE_APP_live_API + '/admin/glw_live_template/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['glw_live_template_add'],
        edit: ['glw_live_template_update'],
        del: ['glw_live_template_delete']
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
