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
      <el-table-column prop="systemName" label="系统名称" width="150px" />
      <el-table-column prop="companyName" label="分公司名称" width="150px" />
      <el-table-column label="位置" prop="positionDesc" width="100" />
      <el-table-column prop="name" label="标题" width="150px" />
      <el-table-column prop="link" label="链接地址" width="150px" />
      <el-table-column label="图片" prop="imageUrl" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.imageUrl"><img alt="" :src="scope.row.imageUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="活动内容" width="150px" />
      <el-table-column prop="startTime" label="开始时间" width="150px" />
      <el-table-column prop="endTime" label="结束时间" width="150px" />
      <el-table-column prop="languageName" label="语言" 公司地址="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['sys_advertisement_update','sys_advertisement_delete']"
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
import crudJob from '@/api/system/advertisement'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '广告位列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '广告位管理',
      url: 'admin/sys_advertisement/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['sys_advertisement_add'],
        edit: ['sys_advertisement_update'],
        del: ['sys_advertisement_delete']
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
