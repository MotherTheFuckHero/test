<template>
  <div class="storehouse-index">
    <div class="storehouse-header">
      <div>
        <el-input size="mini" placeholder="输入仓库名称搜索" v-model="storehouseInput" clearable style="width: 200px;" class="filter-item"  @clear="getTableData({}, 1, 20)"></el-input>
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getSearchWareHouse">搜索</el-button>
      </div>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="addDialog = true">创建仓库</el-button>
    </div>
    <div class="supplier-body">
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column type="index" label="#" />
        <el-table-column prop="id" label="编码" />
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="peopleName" label="是否默认">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isDefault == 1">默认</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="拼音简码" />
        <el-table-column label="操作" width="340px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id,scope.row)">编辑</el-button>
            <el-button v-if="scope.row.isDefault == 0" size="mini" type="warning" icon="el-icon-setting" @click="editDefault(scope.row.id, scope.row)">设置默认</el-button>
            <el-button v-if="scope.row.isDefault == 0" type="danger" icon="el-icon-delete" size="mini" @click="toDelete(scope.row.id)">删除</el-button>
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
    import { getAllStoreHouse, delStoreHouse, editSupplier } from '@/api/newInvoicing/storehouse'
    export default {
        name: "storehouse",
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
                storehouseInput: '',
                loading: false,
                currentPage: 5,
                tableData: [],
                total: 0
            }
        },
        created(){
            this.getTableData({}, 1, 20)
        },
        methods: {
            getSearchWareHouse(){
                let data = {
                    name: this.storehouseInput
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
                this.loading = true
                getAllStoreHouse(data, no, size).then(res => {
                    if (res.code === '0'){
                        this.loading = false
                        this.tableData = res.data.resultList
                        this.total = res.data.totalCount
                    }
                })
            },
            showEditDialog(id, data){
                this.editDialog = true
                this.editData = data
                this.editDataId = id
            },
            editDefault(id, data){
                let newData = {
                    name: data.name,
                    code: data.code,
                    isDefault: 1,
                    merchantId: 10022,
                    companyId: 1,
                    status: 1,
                    systemId: 1
                }
                editSupplier(id, newData).then(res => {
                    if (res.code === '0'){
                        this.getTableData({}, 1, 20);
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        });
                    }else{
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            toDelete(id){
                this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delStoreHouse(id).then(res => {
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
  .storehouse-index{
    padding: 20px;
  }
  .storehouse-header{
    display: flex;
    justify-content: space-between;
  }
  .storehouse-body{
    padding-top: 10px;
  }
</style>
