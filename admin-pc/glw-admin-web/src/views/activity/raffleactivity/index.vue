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
      <el-table-column prop="title" label="活动标题" width="150px" />
      <el-table-column prop="startTime" label="开始时间" width="150px" />
      <el-table-column prop="endTime" label="结束时间" width="150px" />
      <el-table-column prop="times" label="每人每天次数限制" width="150px" />
      <el-table-column prop="desc" label="活动说明" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['raffle_activity_update','raffle_activity_delete']"
        label="操作"
        width="250px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['raffle_record_select']" size="mini" type="primary" plain style="display: inline-block" @click="handleshare(scope.$index, scope.row)">获奖记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog title="获奖记录" :visible.sync="dialogTableVisible">
      <el-table :data="resultList">
        <el-table-column property="activityId" label="活动标题" width="150" />
        <el-table-column property="userId" label="用户编号" width="150" />
        <el-table-column property="name" label="用户名称" width="150" />
        <el-table-column property="recordName" label="奖品名称" width="150" />
        <el-table-column property="statusDesc" label="状态" width="150" />
        <el-table-column label="创建人" prop="createdUserName" width="200" />
        <el-table-column label="创建时间" prop="createdTime" width="250" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { recordList } from '@/api/activity/raffleactivity'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '抽奖活动列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '抽奖管理',
      url: 'admin/raffle_activity/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      resultList: [],
      dialogTableVisible: false,
      permission: {
        add: ['raffle_activity_add'],
        edit: ['raffle_activity_update'],
        del: ['raffle_activity_delete']
      }
    }
  },
  methods: {
    handleshare(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var data = {
        activityId: urlId
      }
      var params = {
        pageNo: 1,
        pageSize: 999
      }
      recordList(data, params).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultList = res.data.resultList
          this.dialogTableVisible = true
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
