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
      <el-table-column prop="companyName" label="分公司名" width="100px" />
      <el-table-column prop="panelName" label="所属板块" width="100px" />
      <el-table-column prop="positionDesc" label="板块位置" width="100px" />
      <el-table-column prop="categoryName" label="分类名称" width="100px" />
      <el-table-column prop="typeDesc" label="类型" width="100px" />
      <el-table-column prop="title" label="标题" width="150px" />
      <el-table-column prop="valueName" label="关联名称" width="150px" />
      <el-table-column prop="valueId" label="关联编号" width="150px" />
      <el-table-column prop="sortNo" label="排序" width="150px" />
      <el-table-column label="状态" prop="statusDesc" width="100" />
      <el-table-column prop="linkUrl" label="链接地址" width="150px" />
      <el-table-column prop="subtitle" label="子标题" width="150px" />
      <el-table-column prop="content" label="内容" :show-overflow-tooltip="true" width="150px" />
      <el-table-column prop="readCount" label="阅读量" width="150px" />
      <el-table-column prop="categoryId" label="分类编号" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['panel_content_update','panel_content_delete']"
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
          <el-button v-permission="['panel_content_desc_select']" size="mini" type="primary" @click="panelcontentDesc(scope.row)">语言管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="panelcontentDescVisible" title="板块内容语言" :visible.sync="panelcontentDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
  </div>
</template>

<script>
import crudJob from '@/api/panel/panelcontent'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '板块内容列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '板块内容管理',
      url: 'admin/panel_content/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      panelcontentDescVisible: false,
      permission: {
        add: ['panel_content_add'],
        edit: ['panel_content_update'],
        del: ['panel_content_delete']
      }
    }
  },
  methods: {
    panelcontentDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('panelContentId', JSON.stringify(obj.id))
      this.panelcontentDescVisible = true
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
