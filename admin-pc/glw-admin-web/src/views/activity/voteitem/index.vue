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
      <el-table-column prop="voteName" label="投票活动" width="150px" />
      <el-table-column prop="valueId" label="项目编号" width="150px" />
      <el-table-column prop="title" label="主题" width="150px" />
      <el-table-column prop="subTitle" label="副主题" width="150px" />
      <el-table-column prop="desc" label="描述" width="150px" />
      <el-table-column prop="sortNo" label="排序编号" width="150px" />
      <el-table-column prop="totalCount" label="投票人总数" width="150px" />
      <el-table-column label="图标" prop="iconUrl" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.iconUrl"><img alt="" :src="scope.row.iconUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['vote_item_update','vote_item_delete']"
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
import crudJob from '@/api/activity/voteitem'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '投票项目列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '投票项目管理',
      url: 'admin/vote_item/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['vote_item_add'],
        edit: ['vote_item_update'],
        del: ['vote_item_delete']
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
