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
      <el-table-column prop="name" label="城市名称" width="150px" />
      <el-table-column prop="pinyin" label="拼音" width="150px" />
      <el-table-column prop="parentName" label="父级" width="150px" />
      <el-table-column prop="shortName" label="简称" width="150px" />
      <el-table-column prop="fullPath" label="全路径" width="250px" />
      <el-table-column prop="cityCode" label="城市区号" width="150px" />
      <el-table-column prop="zipCode" label="邮编" width="150px" />
      <el-table-column prop="lon" label="经度" width="150px" />
      <el-table-column prop="lat" label="纬度" width="150px" />
      <el-table-column prop="levelTypeDesc" label="级别" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['city_update','city_delete']"
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
          <el-button v-permission="['city_desc_select']" size="mini" type="primary" @click="cityDesc(scope.row)">语言管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="cityDescVisible" title="城市语言" :visible.sync="cityDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
  </div>
</template>

<script>
import crudJob from '@/api/system/city'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '城市列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '城市管理',
      url: 'admin/city/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      cityDescVisible: false,
      permission: {
        add: ['city_add'],
        edit: ['city_update'],
        del: ['city_delete']
      }
    }
  },
  methods: {
    cityDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('cityId', JSON.stringify(obj.id))
      this.cityDescVisible = true
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
