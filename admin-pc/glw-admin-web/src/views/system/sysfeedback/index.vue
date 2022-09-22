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
      <el-table-column prop="systemName" label="系统名称" width="150px" />
      <el-table-column prop="userId" label="用户编号" width="150px" />
      <el-table-column prop="userName" label="用户名称" width="150px" />
      <el-table-column prop="mobile" label="联系电话" width="150px" />
      <el-table-column prop="feedTypeDesc" label="反馈类型" width="150px" />
      <el-table-column prop="content" label="反馈内容" width="150px" />
      <el-table-column prop="pictures" label="图片地址" width="150px" />
      <el-table-column prop="replyContent" label="回复内容" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="是否包含图片" prop="hasPicture" width="120">
        <template slot-scope="scope">
          {{ scope.row.hasPicture === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="languageName" label="语言" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['sys_feedback_update','sys_feedback_delete']"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <uOperation
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
import crudJob from '@/api/system/sysfeedback'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import uOperation from '@crud/U.operation'

export default {
  name: '意见反馈列表',
  components: { eHeader, eForm, crudOperation, pagination, uOperation },
  cruds() {
    return CRUD({
      title: '意见反馈',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/sys_feedback/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['sys_feedback_add'],
        edit: ['sys_feedback_update'],
        del: ['sys_feedback_delete']
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
