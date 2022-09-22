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
      <el-table-column prop="companyName" label="分公司名称" width="200px" />
      <el-table-column prop="enterpriseName" label="企业名称" width="200px" />
      <el-table-column prop="merchantName" label="商家名称" width="200px" />
      <el-table-column prop="createdUserName" label="用户" width="200px" />
      <el-table-column prop="totalPrice" label="订单总价格" width="200px" />
      <el-table-column prop="postagePrice" label="运费价格" width="200px" />
      <el-table-column prop="orderTime" label="审核时间" width="200px" />
      <el-table-column prop="orderStatusDesc" label="审核状态" width="200px" />
      <el-table-column prop="remark" label="备注" width="200px" />

      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['enterprise_user_withdraw_update']"
        label="操作"
        width="120px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-show="scope.row.orderStatus === 2" v-permission="['enterprise_user_withdraw_update']" size="mini" type="primary" plain @click="confirmAudit(scope.$index, scope.row)">确认收到</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
    import crudJob from '@/api/enterprise/enterpriseOrderList'
    import { editEntepriseOrder } from '@/api/enterprise/enterpriseOrderList'
    import eHeader from './header'
    import CRUD, { presenter } from '@crud/crud'
    import crudOperation from '@crud/CRUD.operation'
    import pagination from '@crud/Pagination'

    export default {
        name: '企业审核单列表',
        components: { eHeader, crudOperation, pagination },
        cruds() {
            return CRUD({
                title: '企业审核单列表',
                optShow: {
                    add: false,
                    edit: false,
                    del: false,
                    download: false,
                    reset: true
                },
                url: process.env.VUE_APP_enterprise_API + 'admin/enteprise_order/page_list',
                crudMethod: { ...crudJob }
            })
        },
        mixins: [presenter()],
        // 数据字典
        data() {
            return {
                permission: {
                    edit: ['enterprise_user_withdraw_update']
                }
            }
        },
        methods: {
            confirmAudit(index, row){
                var obj = Object.assign({}, row)
                var urlId = obj.id
                this.$confirm('确认收到吗？', '提示', {}).then(() => {
                    editEntepriseOrder(5, urlId).then(res => {
                        var code = res.code
                        var msg = res.msg
                        if (code === '0') {
                            this.$message({
                                message: msg,
                                type: 'success'
                            })
                            this.crud.refresh()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    })
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
