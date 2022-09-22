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
      <el-table-column prop="companyName" label="分公司" width="100" />
      <el-table-column prop="languageName" label="语言" width="100" />
      <el-table-column prop="title" label="新闻标题" width="150px" />
      <el-table-column prop="typeDesc" label="类型" width="100" />
      <el-table-column prop="statusDesc" label="状态" width="100" />
      <el-table-column label="缩略图" prop="topImageUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.topImageUrl === null ? false: true " :href="scope.row.topImageUrl"><img alt="" :src="scope.row.topImageUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column prop="releaseTime" label="发布日期" width="150px" />
      <el-table-column prop="sourceName" label="来源" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['news_update','news_delete']"
        label="操作"
        width="320px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['news_desc_select']" style="display: inline-block;margin: 0px !important;" size="mini" type="primary" @click="newsDesc(scope.row)">语言管理</el-button>
          <el-button v-if="scope.row.status !== 3" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="examineEdit(scope.$index, scope.row)">审核</el-button>
          <el-button v-if="scope.row.status === 3" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="takeEdit(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="newsDescVisible" title="新闻资讯语言" :visible.sync="newsDescVisible" :close-on-click-modal="false" width="1000px">
      <indexs />
    </el-dialog>
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="新闻审核" :visible.sync="dialogFormVisible" width="600px">
        <el-form-item label="审核结果" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio class="radio" :label="3">审核通过</el-radio>
            <el-radio class="radio" :label="4">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinion">
          <el-input v-model="addForm.auditOpinion" type="textarea" style="width: 400px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { examinePut } from '@/api/system/news'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: '新闻资讯管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '新闻资讯管理',
      url: 'admin/news/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      newsDescVisible: false,
      addForm: {
        id: '',
        status: 3,
        auditOpinion: ''
      },
      rules: {
        status: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'blur'
          }
        ],
        auditOpinion: [
          {
            required: true,
            message: '请输入审核意见',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      permission: {
        add: ['news_add'],
        edit: ['news_update'],
        del: ['news_delete']
      }
    }
  },
  methods: {
    newsDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('newsId', JSON.stringify(obj.id))
      this.newsDescVisible = true
    },
    // 审核
    examineEdit(index, row) {
      this.dialogFormVisible = !this.dialogFormVisible
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
    },
    // 状态审核
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var urlId = this.addForm.id
            var data = {
              status: this.addForm.status,
              auditOpinion: this.addForm.auditOpinion
            }
            var _this = this
            examinePut(urlId, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: '审核完成',
                      type: 'success'
                    })
                    _this.dialogFormVisible = false
                    _this.crud.refresh()
                    _this.addForm.status = ''
                    _this.addForm.auditOpinion = ''
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
    },
    // 下架
    takeEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var _this = this
      var data = {
        status: 5,
        auditOpinion: '审核下架'
      }
      this.$confirm('确认下架此新闻吗？', '提示', {}).then(() => {
        examinePut(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: '下架成功',
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
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
