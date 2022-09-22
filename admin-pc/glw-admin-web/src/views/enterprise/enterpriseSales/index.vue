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
      <el-table-column prop="merchantName" label="商户名称" width="150px" />
      <el-table-column prop="userName" label="用户名称" width="150px" />
      <el-table-column prop="expensesTypeDesc" label="费用类型" width="150px" />
      <el-table-column prop="expensesValue" label="费用值" width="150px" />
      <el-table-column prop="typeDesc" label="类型" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_sales_update','merchant_sales_delete']"
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
          <el-button v-if="scope.row.status === 2" style="margin: 0 !important;" size="mini" class="filter-item" type="primary" @click="editStatus(scope.$index, scope.row, 1)">正常</el-button>
          <el-button v-if="scope.row.status === 1" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="editStatus(scope.$index, scope.row, 2)">禁用</el-button>
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
import crudJob,{editstatus} from '@/api/enterprise/enterpriseSales'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '企业销售员管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '企业销售员管理',
      url: process.env.VUE_APP_enterprise_API + 'admin/merchant_sales/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  data() {
    return {
      permission: {
        add: ['merchant_sales_add'],
        edit: ['merchant_sales_update'],
        del: ['merchant_sales_delete']
      }
    }
  },
  methods: {
      editStatus(index, row, num) {
          var obj = Object.assign({}, row)
          var _this = this
          this.$confirm('确认修改状态吗？', '提示', {}).then(() => {
              editstatus(obj.id, num)
                  .then(
                      function(response) {
                          var code = response.code
                          var msg = response.msg
                          if (code === '0') {
                              _this.$message({
                                  message: '修改状态成功',
                                  type: 'success'
                              })
                              _this.crud.refresh()
                          } else {
                              _this.$message({
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
</style>
