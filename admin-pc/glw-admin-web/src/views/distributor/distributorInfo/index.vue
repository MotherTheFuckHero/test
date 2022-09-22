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
      <el-table-column prop="name" label="分销商名称" width="150px" />
      <el-table-column prop="merchantName" label="商家名称" width="150px" />
      <el-table-column prop="userName" label="绑定用户" width="150px" />
      <el-table-column prop="levelName" label="代理等级" width="100px" />
      <el-table-column prop="expensesTypeDesc" label="佣金结算方式" width="110px" />
      <el-table-column prop="settlement" label="结算佣金" width="100px" />
      <el-table-column prop="expensesValue" label="平台佣金费用" width="100px" />
      <el-table-column prop="regionName" label="代理地区" width="100px" />
      <el-table-column prop="idCardNum" label="身份证号" width="150px" />
      <el-table-column prop="phone" label="代理商联系电话" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="100px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        label="操作"
        width="100px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" v-permission="['distributor_info_update']" size="mini" class="filter-item" type="danger" @click="reviewedEdit(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="审核" :visible.sync="dialogFormVisible" width="670px">
        <el-form-item label="审核结果" prop="status" :rules="[{ required: true, message: '请选择审核结果', trigger: 'blur' }]">
          <el-radio-group v-model="addForm.status">
            <el-radio class="radio" :label="2">平台通过</el-radio>
            <el-radio class="radio" :label="3">平台拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算方式" prop="expensesType" style="display: inline-block" :rules="[{ required: true, message: '请选择佣金结算方式', trigger: 'blur' }]">
          <el-select v-model="addForm.expensesType" style="width: 200px;" clearable filterable @change="expensesTypechange">
            <el-option
              v-for="item in ExpensesTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="平台佣金" prop="expensesValue" style="display: inline-block" :rules="[{ required: true, message: '请输入平台佣金费用', trigger: 'blur' }]">
          <el-input v-model="addForm.expensesValue" style="width: 200px" />
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinion" :rules="[{ required: true, message: '请输入审核意见', trigger: 'blur' }]">
          <el-input v-model="addForm.auditOpinion" style="width: 507px;" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { DistributorInfoExpensesTypeLists } from '@/api/distributor/distributorInfo'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '分销商管理',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '分销商',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: process.env.VUE_APP_distributor_API + 'admin/distributor_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['distributor_info_add'],
        edit: ['distributor_info_update'],
        del: ['distributor_info_delete']
      },
      dialogFormVisible: false,
      ExpensesTypeList: [],
      addForm: {
        id: '',
        status: 2,
        expensesType: '',
        expensesValue: '',
        auditOpinion: ''
      },
      rules: {}
    }
  },
  methods: {
    expensesTypechange() {
      this.addForm.expensesValue = ''
    },
    reviewedEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.addForm.expensesType = obj.expensesType
      this.addForm.expensesValue = obj.expensesValue
      this.dialogFormVisible = true
      DistributorInfoExpensesTypeLists().then(res => {
        this.ExpensesTypeList = res.data
      })
    },
    // 状态审核
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var Id = this.addForm.id
            var data = {
              auditOpinion: this.addForm.auditOpinion,
              expensesType: this.addForm.expensesType,
              expensesValue: this.addForm.expensesValue,
              status: this.addForm.status
            }
            var _this = this
            crudJob.edit(Id, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: msg,
                      type: 'success'
                    })
                    _this.dialogFormVisible = false
                    _this.addForm = {}
                    _this.crud.refresh()
                  } else {
                    _this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                })
          })
        } else {
          return false
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
