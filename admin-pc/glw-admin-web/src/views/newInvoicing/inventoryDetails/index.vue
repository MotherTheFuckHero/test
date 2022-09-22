<template>
  <div class="inventoryDetails-index">
    <div class="inventoryDetails-header">
      <div></div>
      <div>
        <el-select v-model="warehouseId" @change="checkPayStatus" clearable @clear="getTableData({}, 1, 15)" size="mini" placeholder="请选择仓库">
          <el-option
            v-for="item in warehouseData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="inventoryDetails-body">
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column type="index" label="#" />
        <el-table-column prop="code" label="订单编号"/>
        <el-table-column prop="title" label="名称"/>
        <el-table-column prop="productSpecs" label="规格"/>
        <el-table-column prop="warehouseName" label="仓库"/>
        <el-table-column prop="stock" label="库存数量"/>
        <el-table-column prop="shortageLimit" label="缺货下线"/>
        <el-table-column prop="backlogLimit" label="积压上线"/>
<!--        <el-table-column label="操作" width="480px" align="center" fixed="right">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" type="warning" icon="el-icon-search">查看</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import { getStoreHouse } from '@/api/newInvoicing/storehouse'
    import { getInventoryDetailList } from '@/api/newInvoicing/inventoryDetails'
    export default {
        name: "inventoryDetails",
        data(){
            return{
                warehouseId: '',
                warehouseData: [],
                loading: true,
                tableData: [],
                currentPage: 5,
                total: 0,
            }
        },
        created(){
            getStoreHouse({}).then(res => {
                this.warehouseData = res.data
            })
            this.getTableData({}, 1, 15)
        },
        methods: {
            checkPayStatus(val){
                this.getTableData({warehouseId:val}, 1, 15)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableData({}, val, 15)
            },
            getTableData(data, no, size){
                getInventoryDetailList(data, no, size).then(res => {
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
        }
    }
</script>

<style scoped>
  .inventoryDetails-index{
    padding: 20px;
  }
  .inventoryDetails-header{
    display: flex;
    justify-content: space-between;
  }
</style>
