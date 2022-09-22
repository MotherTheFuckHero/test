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
      <el-table-column prop="companyTypeDesc" label="公司类型" width="150px" />
      <el-table-column prop="companyName" label="公司名称" width="150px" />
      <el-table-column prop="nickName" label="公司昵称" 公司地址="150px" />
      <el-table-column prop="companyCode" label="公司编码" width="150px" />
      <el-table-column prop="cityName" label="城市名称" width="150px" />
      <el-table-column prop="companyPhone" label="公司联系电话" width="150px" />
      <el-table-column prop="companyAddress" label="公司地址" width="200px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['company_update','company_delete']"
        label="操作"
        width="200px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['company_desc_select']" size="mini" type="primary" @click="companyDesc(scope.row)">语言管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="companyDescVisible" title="分公司语言" :visible.sync="companyDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
  </div>
</template>

<script>
import crudJob from '@/api/system/company'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '分公司列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '分公司管理',
      url: 'admin/company/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      companyDescVisible: false,
      permission: {
        add: ['company_add'],
        edit: ['company_update'],
        del: ['company_delete']
      }
    }
  },
  methods: {
    companyDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('companyId', JSON.stringify(obj.id))
      this.companyDescVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
