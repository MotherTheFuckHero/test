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
      <el-table-column prop="merchantName" label="商家名称" width="100px" />
      <el-table-column prop="tableName" label="餐桌名称" width="100px" />
      <el-table-column prop="tier" label="楼层" width="100px" />
      <el-table-column prop="tableNo" label="桌号" width="100px" />
      <el-table-column prop="peopleCount" label="使用人数" width="100px" />
      <el-table-column prop="tablePrice" label="订桌价" width="100px" />
      <el-table-column label="桌子图片" prop="tableImg" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.tableImg === undefined ? false: true " :href="scope.row.tableImgUrl"><img alt="" :src="scope.row.tableImgUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="是否包间" prop="room" width="100">
        <template slot-scope="scope">
          {{ scope.row.room === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有卡拉OK" prop="karaoke" width="100">
        <template slot-scope="scope">
          {{ scope.row.karaoke === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有卫生间" prop="lavatory" width="100">
        <template slot-scope="scope">
          {{ scope.row.lavatory === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有沙发" prop="sofa" width="100">
        <template slot-scope="scope">
          {{ scope.row.sofa === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有电视" prop="television" width="100">
        <template slot-scope="scope">
          {{ scope.row.television === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有空调" prop="airConditioner" width="100">
        <template slot-scope="scope">
          {{ scope.row.airConditioner === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否有wifi" prop="wifi" width="100">
        <template slot-scope="scope">
          {{ scope.row.wifi === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="100" />
      <el-table-column label="创建时间" prop="createdTime" width="100" />
      <el-table-column label="修改人" prop="updatedUserName" width="100" />
      <el-table-column label="修改时间" prop="updatedTime" width="100" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['table_info_update','table_info_delete']"
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
import crudJob from '@/api/product/orderTable'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '订桌管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '订桌管理',
      url: 'admin/table_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['table_info_add'],
        edit: ['table_info_update'],
        del: ['table_info_delete']
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
