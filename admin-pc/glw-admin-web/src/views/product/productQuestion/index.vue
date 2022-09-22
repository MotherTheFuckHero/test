<template>
  <div class="app-container">

    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;"
      row-key="id"
      :row-class-name="tableRowClassName"
      :tree-props="{children: 'productQuestionList'}"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="productName" label="商品名称" width="100px" />
      <el-table-column prop="specName" label="规格名称" width="100px" />
      <el-table-column prop="typeDesc" label="类型" width="100px" />
      <el-table-column prop="content" :show-overflow-tooltip="true" label="内容" width="200px" />
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="150" />
      <el-table-column label="创建时间" prop="createdTime" width="150" />
      <el-table-column label="回复人" prop="updatedUserName" width="150" />
      <el-table-column label="回复时间" prop="updatedTime" width="150" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_question_update']"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.type===1" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="extendEdit(scope.$index, scope.row)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="商品问题回复" :visible.sync="dialogFormVisible" width="680px">
        <el-form-item label="问题" prop="content">
          <el-input v-model="addForm.content" disabled style="width:505px;" />
        </el-form-item>
        <el-form-item label="商品名称" prop="productName" style="display: inline-block">
          <el-input v-model="addForm.productName" disabled style="width: 200px;" />
        </el-form-item>
        <el-form-item label="规格" prop="specName" style="display: inline-block">
          <el-input v-model="addForm.specName" disabled style="width: 200px;" />
        </el-form-item>
        <el-form-item label="回复" prop="contents">
          <el-input v-model="addForm.contents" maxlength="64" style="width: 505px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right;margin-right:30px; " @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { editproductQuestion, add } from '@/api/product/productQuestion'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: '商品问答管理',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '商品问答管理',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/product_question/page_list',
      query: { type: 1 },
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['product_question_add'],
        edit: ['product_question_update'],
        del: ['product_question_delete']
      },
      dialogFormVisible: false,
      addForm: {
        specId: '',
        questionId: '',
        languageId: '',
        productId: '',
        productName: '',
        specName: '',
        type: '',
        status: '',
        content: '', // 问题
        contents: '' // 回复
      },
      rules: {
        contents: [
          {
            required: true,
            message: '请输入回复内容',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.type === 1) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    changeStatus(val) {
      editproductQuestion(val.id, val.status).then(res => {
        var code = res.code
        var msg = res.msg
        if (code !== '0') {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    extendEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.specId = obj.specId
      this.addForm.questionId = obj.questionId
      this.addForm.languageId = obj.languageId
      this.addForm.productId = obj.productId
      this.addForm.productName = obj.productName
      this.addForm.specName = obj.specName
      this.addForm.status = 1
      this.addForm.type = 2
      this.addForm.content = obj.content
      this.dialogFormVisible = true
    },
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认回复吗？', '提示', {}).then(() => {
            var data = {
              specId: this.addForm.specId,
              questionId: this.addForm.questionId,
              languageId: this.addForm.languageId,
              productId: this.addForm.productId,
              type: this.addForm.type,
              content: this.addForm.contents,
              status: this.addForm.status
            }
            var _this = this
            add(data)
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
                    _this.crud.refresh()
                  } else {
                    this.$message({
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
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
