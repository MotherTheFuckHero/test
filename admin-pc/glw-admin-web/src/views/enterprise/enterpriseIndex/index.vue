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
      <el-table-column prop="enterpriseName" label="企业名称" width="150px" />
      <el-table-column prop="enterpriseCode" label="统一社会信用代码" width="150px" />
      <el-table-column prop="companyName" label="分公司名称" width="150px" />
      <el-table-column prop="connectorName" label="联系人" width="150px" />
      <el-table-column prop="connectorPhone" label="联系人电话" width="150px" />
<!--      <el-table-column label="账期每月几号" prop="debtDay" width="150px">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.debtDay+'号' }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="企业详细地址" :show-overflow-tooltip="true" prop="addressInfo" width="300" />
      <el-table-column prop="statusDesc" label="企业状态" width="150px" />
      <el-table-column prop="userGradeName" label="用户等级" width="150px" />
      <el-table-column prop="settlementTypeDesc" label="结算类型" width="150px" />
      <el-table-column prop="ticketContent" label="开票内容" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['enterprise_update','enterprise_delete']"
        label="操作"
        width="300px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-if="scope.row.status === 1 || scope.row.status === 3" v-permission="['enterprise_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="primary"  @click="examineEdit(scope.$index, scope.row)">审核通过</el-button>
          <el-button v-if="scope.row.status === 2" v-permission="['enterprise_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger"  @click="takeEdit(scope.$index, scope.row)">审核不通过</el-button>
          <el-button v-permission="['enterprise_update']" size="mini" type="warning" plain style="margin: 0 !important;"  @click="resetPassword(scope.$index, scope.row)">重置密码</el-button>
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
import crudJob from '@/api/enterprise/enterpriseIndex'
import { resetPasswordPut,editstatus } from  '@/api/enterprise/enterpriseIndex'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '企业用户列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '企业户列表管理',
      url: process.env.VUE_APP_enterprise_API + 'admin/enterprise/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  data() {
    return {
      permission: {
        add: ['enterprise_add'],
        edit: ['enterprise_update'],
        del: ['enterprise_delete']
      }
    }
  },
  methods: {
      resetPassword(index, row){
          var obj = Object.assign({}, row)
          var urlId = obj.id
          this.$confirm('确认将支付密码重置为666666吗？', '提示', {}).then(() => {
              resetPasswordPut(urlId).then(res => {
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
      },
      examineEdit(index, row){
          var obj = Object.assign({}, row)
          var newId = obj.id
          this.$confirm('确认审核通过该企业吗？', '提示', {}).then(() => {
              editstatus(newId,2).then(res => {
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
      },
      takeEdit(index, row){
          var obj = Object.assign({}, row)
          var newId = obj.id
          this.$confirm('确认审核不通过该企业吗？', '提示', {}).then(() => {
              editstatus(newId,3).then(res => {
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
      },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
