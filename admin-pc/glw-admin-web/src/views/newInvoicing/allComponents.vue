<template>
  <el-dialog
    title="选择商品"
    append-to-body
    :before-close="closeForm"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="1300px"
  >
    <div>
      <el-input size="mini" placeholder="请输入商品名称" v-model="productName" style="width: 200px;" class="filter-item" clearable  @clear="instockClear"></el-input>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getProductList">搜索</el-button>
    </div>
    <div>
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;" @cell-click="getClickProduct">
        <el-table-column type="index" label="#" />
        <el-table-column prop="id" label="商品编码" align="center"/>
        <el-table-column prop="title" label="商品名称" align="center"/>
        <el-table-column prop="productSpecs" label="商品规格" align="center"/>
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
  </el-dialog>
</template>

<script>
    import { getAllProduct, getAllInStockProduct } from '@/api/newInvoicing/purchaseorder'
    export default {
        props: ['type', 'interface', 'warehouseId'],
        data(){
            return{
                dialogFormVisible: false,
                productName: '',
                loading: true,
                tableData: [],
                currentPage: 1,
                total: 0
            }
        },
        watch: {
            type(newData){
                this.dialogFormVisible = newData
            },
            warehouseId(newData){
                this.getInStockProduct({warehouseId: newData}, 1, 10)
            }
        },
        created(){
            if(this.interface == 1){
                this.getProduct({merchantId: 10022, status: 3}, 1, 10)
            } else {
                this.getInStockProduct({}, 1, 10)
            }
        },
        methods: {
            getClickProduct(row, column, cell, event){
                this.dialogFormVisible = false
                this.$emit('dialogType', this.dialogFormVisible)
                this.$emit('productData', row)
            },
            instockClear(){
                if(this.interface == 1){
                    this.getProduct({merchantId: 10022, status: 3}, 1, 10)
                } else {
                    this.getInStockProduct({}, 1, 10)
                }
            },
            getProductList(){
                if(this.interface == 1){
                    let data = {
                        title: this.productName,
                        merchantId: 10022,
                        status: 3
                    }
                    this.getProduct(data, 1, 10)
                } else {
                    this.getInStockProduct({}, 1, 10)
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                if(this.interface == 1){
                    this.getProduct({merchantId: 10022, status: 3}, val, 10)
                } else {
                    this.getInStockProduct({}, val, 10)
                }
            },
            getInStockProduct(data, no, size){
                getAllInStockProduct(data, no, size).then(res => {
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
            getProduct(data, no, size){
                getAllProduct(data, no, size).then(res => {
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
            closeForm(){
                this.dialogFormVisible = false
                this.$emit('dialogType', this.dialogFormVisible)
            },
        }
    }
</script>

<style scoped>

</style>
