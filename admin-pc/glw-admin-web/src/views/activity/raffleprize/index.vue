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
      <el-table-column prop="typeDesc" label="奖品类型" width="150px" />
      <el-table-column prop="activityName" label="活动名称" width="150px" />
      <el-table-column prop="name" label="奖品名称" width="150px" />
      <el-table-column label="奖品等级" prop="level" width="100">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '一等奖': '' }}
          {{ scope.row.level === 2 ? '二等奖': '' }}
          {{ scope.row.level === 3 ? '三等奖': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="奖品描述" width="150px" />
      <el-table-column prop="sortNo" label="排序" width="150px" />
      <el-table-column prop="inventory" label="库存" width="150px" />
      <el-table-column label="奖品图标" prop="iconUrl" width="100">
        <template slot-scope="scope">
          <a :href="scope.row.iconUrl"><img alt="" :src="scope.row.iconUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="是否受限" prop="limit" width="200">
        <template slot-scope="scope">
          {{ scope.row.limit === true ? '是': '' }}
          {{ scope.row.limit === false ? '否': '' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['raffle_prize_update','raffle_prize_delete']"
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
import crudJob from '@/api/activity/raffleprize'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '抽奖奖品列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '抽奖奖品管理',
      url: 'admin/raffle_prize/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['raffle_prize_add'],
        edit: ['raffle_prize_update'],
        del: ['raffle_prize_delete']
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
