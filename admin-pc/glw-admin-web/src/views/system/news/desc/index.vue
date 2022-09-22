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
      <el-table-column prop="languageName" label="语言" width="100" />
      <el-table-column prop="title" label="新闻标题" width="150px" />
      <el-table-column prop="sourceName" label="来源" width="150px" />
      <el-table-column label="缩略图" prop="topImageUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.topImageUrl === null ? false: true " :href="scope.row.topImageUrl"><img alt="" :src="scope.row.topImageUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['news_desc_update','news_desc_delete']"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
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
import crudJob from '@/api/system/newsdesc'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: 'Panel',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    const newsId = JSON.parse(localStorage.getItem('newsId'))
    return CRUD({
      title: '新闻语言',
      url: 'admin/news_desc/page_list',
      query: { newsId: newsId },
      crudMethod: { ...crudJob }
    })
  },

  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['news_desc_add'],
        edit: ['news_desc_update'],
        del: ['news_desc_delete']
      }
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
