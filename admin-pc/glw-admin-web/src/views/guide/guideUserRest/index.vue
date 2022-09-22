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
      <el-table-column prop="guideUserName" label="导游名称" width="150px" />
      <el-table-column prop="restDate" label="休息日期" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['user_rest_update']"
        label="操作"
        width="100px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1" size="mini" type="primary" @click="putstatus(scope.$index, scope.row)">取消休息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <eForm />
  </div>
</template>

<script>
import crudJob, { del } from '@/api/guide/guideUserRest'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '导游考勤管理',
  components: { eHeader, eForm, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '导游休息管理',
      url: 'admin/user_rest/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['user_rest_add'],
        edit: ['user_rest_update'],
        del: ['user_rest_delete']
      }
    }
  },
  methods: {
    /* 取消休息*/
    putstatus(index, row) {
      var obj = Object.assign({}, row)
      var orderId = obj.id
      const data = {
        id: obj.id,
        restDate: obj.restDate,
        status: 2,
        type: 1,
        userId: obj.userId
      }
      this.$confirm('确认取消休息吗？', '提示', {}).then(() => {
        del(orderId, data).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.crud.refresh()
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
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
