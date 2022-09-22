<template>
    <div class="supplier-index">
      <div class="supplier-header">
        <div>
          <el-input size="mini" placeholder="输入供应商名称搜索" v-model="supplierInput" clearable style="width: 200px;" class="filter-item" @clear="getTableData({}, 1, 20)"></el-input>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getSearchSupplier">搜索</el-button>
        </div>
        <div>
          <el-button-group>
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="addDialog = true">创建供应商</el-button>
<!--            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload2">导入Excel</el-button>-->
<!--            <el-button class="filter-item" size="mini" type="warning" icon="el-icon-download">下载Excel模板</el-button>-->
<!--            <el-button class="filter-item" size="mini" type="warning" icon="el-icon-download">导出Excel</el-button>-->
          </el-button-group>
        </div>
      </div>
      <div class="supplier-body">
        <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
          <el-table-column type="index" label="#" />
          <el-table-column prop="id" label="编码" />
          <el-table-column prop="name" label="名称" width="150px"/>
          <el-table-column prop="linkman" label="联系人" width="150px" />
          <el-table-column prop="phone" label="常用电话" width="150px" />
          <el-table-column prop="standbyPhone" label="备用电话" width="150px" />
          <el-table-column prop="address" label="地址" width="150px" />
          <el-table-column prop="qq" label="QQ号" width="150px" />
          <el-table-column prop="wechat" label="微信" width="150px" />
          <el-table-column prop="wangwang" label="旺旺" width="150px" />
          <el-table-column prop="email" label="Email" width="150px" />
          <el-table-column prop="website" label="网址" width="150px" />
          <el-table-column prop="bankAccount" label="银行账户" width="150px" />
          <el-table-column prop="bankName" label="银行户名" width="150px" />
          <el-table-column prop="bankNo" label="账号/卡号" width="150px" />
<!--          <el-table-column prop="payment" label="累积付款" width="150px" />-->
          <el-table-column prop="code" label="拼音简码" width="150px" />
          <el-table-column prop="remark" label="备注" width="150px" />
          <el-table-column label="操作" width="200px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id,scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="toDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <add :type="addDialog" @dialogType="getAddType"/>
      <edit :id="editDataId" :type="editDialog" :data="editData" @dialogType="getEditType" />
    </div>
</template>

<script>
    import add from './components/add'
    import edit from './components/edit'
    import { getAllSupplier, delSupplier } from '@/api/newInvoicing/supplier'
    export default {
        name: "supplier",
        components: {
            add,
            edit
        },
        data(){
            return{
                addDialog: false,
                editDialog: false,
                editDataId: null,
                editData: {},
                supplierInput: '',
                loading: true,
                currentPage: 1,
                tableData: [],
                total: 0
            }
        },
        created(){
            this.getTableData({}, 1, 20)
        },
        methods: {
            getSearchSupplier(){
                let data = {
                    name: this.supplierInput
                }
                this.getTableData(data, 1, 20)
            },
            getAddType(data){
                this.addDialog = data
            },
            getEditType(data){
                this.editDialog = data
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableData({}, val, 20)
            },
            getTableData(data, no, size){
                getAllSupplier(data, no, size).then(res => {
                    if (res.code === '0'){
                        this.loading = false
                        this.tableData = res.data.resultList
                        this.total = res.data.totalCount
                    }else{
                        this.loading = false
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            showEditDialog(id, data){
                this.editDialog = true
                this.editData = data
                this.editDataId = id
            },
            toDelete(id){
                this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delSupplier(id).then(res => {
                        if (res.code === '0'){
                            this.getTableData({}, 1, 20)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$notify({
                                title: '警告',
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    }
</script>

<style scoped>
.supplier-index{
  padding: 20px;
}
.supplier-header{
  display: flex;
  justify-content: space-between;
}
.supplier-body{
  padding-top: 10px;
}
</style>
