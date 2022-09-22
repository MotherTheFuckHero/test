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
      <el-table-column prop="panelName" label="板块" width="150px" />
      <el-table-column prop="name" label="分类名称" width="150px" />
      <el-table-column label="图标" prop="iconUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.iconUrl === undefined ? false: true " :href="scope.row.iconUrl"><img alt="" :src="scope.row.iconUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sortNo" width="100" />
      <el-table-column label="状态" prop="status" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否推荐" prop="isRecommend" width="100">
        <template slot-scope="scope">
          {{ scope.row.isRecommend === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['panel_category_update','panel_category_delete']"
        label="操作"
        width="200px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block;"
          />
          <el-button v-permission="['panel_category_desc_select']" size="mini" type="primary" @click="panelcategoryDesc(scope.row)">语言管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="panelcategoryDescVisible" title="分公司语言" :visible.sync="panelcategoryDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { editpanelcategorystatus } from '@/api/panel/panelcategory'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '板块分类列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '板块分类管理',
      url: 'admin/panel_category/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      panelcategoryDescVisible: false,
      permission: {
        add: ['panel_category_add'],
        edit: ['panel_category_update'],
        del: ['panel_category_delete']
      }
    }
  },
  methods: {
    panelcategoryDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('panelCategoryId', JSON.stringify(obj.id))
      this.panelcategoryDescVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    changeStatus(val) {
      editpanelcategorystatus(val.id, val.status).then(res => {
        var code = res.code
        var msg = res.msg
        if (code !== '0') {
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
