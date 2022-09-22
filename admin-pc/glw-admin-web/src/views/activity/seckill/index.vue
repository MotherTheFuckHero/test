<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="50" />
      <el-table-column prop="merchantName" label="商户名称" width="120px" />
      <el-table-column prop="productName" label="商品名称" width="140px" />
      <el-table-column prop="specName" label="规格名称" width="120px" />
      <el-table-column prop="secKillPrice" label="商品秒杀价格(￥)" width="120px" />
      <el-table-column prop="typeDesc" label="场次" width="100px" />
      <el-table-column prop="statusDesc" label="状态" width="100px" />
      <el-table-column prop="secKillTime" label="秒杀时间" width="100px" />
      <el-table-column prop="secKillNum" label="商品秒杀数量" width="100px" />
      <el-table-column prop="timesLimitNum" label="商品单次限购数量" width="140px" />
      <el-table-column prop="sort" label="排序" width="100px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_seckill_update','product_seckill_delete']"
        label="操作"
        width="200px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            v-if="scope.row.status !== 2"
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-if="scope.row.status !== 2" v-permission="['product_seckill_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="examineEdit(scope.$index, scope.row)">审核</el-button>
          <el-button v-if="scope.row.status === 2" v-permission="['product_seckill_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="takeEdit(scope.$index, scope.row)">关闭</el-button>
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
import crudJob, { editseckill } from '@/api/activity/seckill'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '秒杀活动列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '秒杀活动管理',
      url: 'admin/product_seckill/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      id: '',
      permission: {
        add: ['product_seckill_add'],
        edit: ['product_seckill_update'],
        del: ['product_seckill_delete']
      }
    }
  },
  methods: {
    // 审核
    examineEdit(index, row) {
      var obj = Object.assign({}, row)
      this.id = obj.id
      var urlId = this.id
      var _this = this
      var data = {
        status: 2,
        auditOpinion: '通过'
      }
      this.$confirm('确认审核通过次商品吗？', '提示', {}).then(() => {
        editseckill(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: msg,
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
    },
    // 关闭
    takeEdit(index, row) {
      var obj = Object.assign({}, row)
      this.id = obj.id
      var urlId = this.id
      var _this = this
      var data = {
        status: 3,
        auditOpinion: '关闭'
      }
      this.$confirm('确认关闭次商品吗？', '提示', {}).then(() => {
        editseckill(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: msg,
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
