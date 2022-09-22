<template>
  <div class="app-container">
    <div class="head-container">
      <el-input v-model="title" clearable size="small" placeholder="输入商品名称搜索" style="width: 215px;" class="filter-item" @keyup.enter.native="search" />
      <el-button style="position: absolute;right:20px" class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="getProduct">添加分销商品</el-button>
    </div>
    <el-table ref="table" v-loading="distributionLoading" :data="distributionData" style="width: 100%;">
      <el-table-column type="index" width="50"/>
      <el-table-column property="productId" label="商品编号" />
      <el-table-column property="productName" label="分销商品名称" />
      <el-table-column property="price" label="分销商品价格" />
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="distributionCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="distributionPageSize"
        layout="total, prev, pager, next"
        :total="distributionTotal"
        @size-change="distributionHandleSizeChange"
        @current-change="distributionHandleCurrentChange"
      />
    </div>
    <el-dialog title="商品列表" :visible.sync="dialogProductVisible" :close-on-click-modal="false">
      <div>
        <el-input size="mini" placeholder="请输入商品名称" v-model="productName" style="width: 200px;" class="filter-item" clearable  @clear="instockClear"></el-input>
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="getProductList">搜索</el-button>
      </div>
      <p style="color: red">单击某一行商品即可添加为分销商品</p>
      <el-table v-loading="shopProductLoading" :data="ShopProductData" @cell-click="getClickProduct">
        <el-table-column show-overflow-tooltip align="center" property="id" label="编号" />
        <el-table-column show-overflow-tooltip align="center" property="companyName" label="分公司" />
        <el-table-column show-overflow-tooltip align="center" property="title" label="商品名称" />
        <el-table-column show-overflow-tooltip align="center" property="unit" label="单位" />
        <el-table-column show-overflow-tooltip align="center" property="productTypeDesc" label="商品类型" />
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="shopProductCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="shopProductPageSize"
          layout="total, prev, pager, next"
          :total="shopProductTotal"
          @size-change="shopProductHandleSizeChange"
          @current-change="shopProductHandleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import { getProduct, getDistributionProductList, selectDistribution } from '@/api/distributor/distributionProduct'
    export default {
        name: "添加分销商品",
        data(){
            return {
                title:'',
                productName: '',
                distributionLoading: false,
                distributionData: [],
                distributionCurrentPage: 1,
                distributionPageSize: 10,
                distributionTotal: 0,
                dialogProductVisible: false,
                shopProductLoading: false,
                ShopProductData: [],
                shopProductCurrentPage: 1,
                shopProductPageSize: 10,
                shopProductTotal: 0,
            }
        },
        created(){
            this.getDistribution(10, 1, {})
        },
        methods: {
            instockClear(){
                this.getShopProduct(10, 1, {status: 3})
            },
            getProductList(){
                let data = {
                    title: this.productName,
                    status: 3
                }
                this.getShopProduct(10, 1, data)
            },
            search(){
                this.getDistribution(10, 1, {productName: this.title})
            },
            getClickProduct(row, column, cell, event){
                this.$confirm('确定将“'+row.title+'”添加为分销商品?', '提示', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.dialogProductVisible = false
                    const data = {
                        productId: row.id
                    }
                    selectDistribution(data).then(res => {
                        if (res.code === '0') {
                            this.getDistribution(10, 1, {})
                            this.$notify({
                                title: '添加分销商品成功',
                                message: '',
                                type: 'success'
                            })
                        } else {
                            this.$notify.error({
                                title: '添加分销商品失败',
                                message: res.msg
                            })
                        }
                    })
                }).catch(action => {

                })
            },
            getProduct(){
                this.dialogProductVisible = true
                this.getShopProduct(10, 1, {status: 3})
            },
            getDistribution(n1, n2, getData){
                this.distributionLoading = true
                var pageSize = n1
                var pageNo = n2
                const data = getData
                getDistributionProductList(pageNo, pageSize, data).then(res => {
                    if (res.code === '0') {
                        this.distributionData = res.data.resultList
                        this.distributionTotal = res.data.totalCount
                        this.distributionLoading = false
                    } else {
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            distributionHandleSizeChange(val) {
                this.distributionPageSize = val
                this.getDistribution(val, 1, {})
                console.log(`每页 ${val} 条`)
                this.distributionCurrentPage = 1
            },
            distributionHandleCurrentChange(val) {
                this.distributionCurrentPage = val
                this.getDistribution(10, val, {})
                console.log(`当前页: ${val}`)
            },
            getShopProduct(n1, n2, getData){
                this.shopProductLoading = true
                var pageSize = n1
                var pageNo = n2
                const data = getData
                getProduct(pageNo, pageSize, data).then(res => {
                    if (res.code === '0') {
                        this.ShopProductData = res.data.resultList
                        this.shopProductTotal = res.data.totalCount
                        this.shopProductLoading = false
                    } else {
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'warning'
                        })
                    }
                })
            },
            shopProductHandleSizeChange(val) {
                this.shopProductLoading = true
                this.shopProductPageSize = val
                this.getShopProduct(val, 1, {status: 3})
                console.log(`每页 ${val} 条`)
                this.shopProductCurrentPage = 1
            },
            shopProductHandleCurrentChange(val) {
                this.shopProductLoading = true
                this.shopProductCurrentPage = val
                this.getShopProduct(10, val, {status: 3})
                console.log(`当前页: ${val}`)
            },
        }
    }
</script>

<style scoped>

</style>
