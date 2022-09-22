<template>
  <div class="profitDetails-index">
<!--    <div class="profitDetails-one">-->
<!--      <h2>统计条件</h2>-->
<!--      <div style="margin-top: 10px">-->
<!--        <el-date-picker-->
<!--          size="mini"-->
<!--          v-model="saleDate"-->
<!--          type="datetimerange"-->
<!--          :picker-options="pickerOptions"-->
<!--          range-separator="至"-->
<!--          start-placeholder="销售开始日期"-->
<!--          end-placeholder="销售结束日期"-->
<!--          class="filter-item">-->
<!--        </el-date-picker>-->
<!--        <el-input size="mini" placeholder="请输入商品名称搜索" clearable v-model="productName" style="width: 200px;" class="filter-item"></el-input>-->
<!--        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchList">搜索</el-button>-->
<!--      </div>-->
<!--    </div>-->
    <div class="profitDetails-two">
      <h2>统计汇总</h2>
      <div style="margin-top: 10px;display: flex;align-items: center">
        <div style="display: flex;">
          <p style="padding-top: 5px">成本金额汇总： </p>
          <el-input size="mini" disabled clearable v-model="costAmount" style="width: 200px;" class="filter-item"></el-input>
        </div>
        <div style="display: flex; margin-left: 10px">
          <p style="padding-top: 5px">销售金额汇总：</p>
          <el-input size="mini" disabled clearable v-model="salesAmount" style="width: 200px;" class="filter-item"></el-input>
        </div>
        <div style="display: flex; margin-left: 10px">
          <p style="padding-top: 5px">毛利汇总：</p>
          <el-input size="mini" disabled clearable v-model="grossProfit" style="width: 200px;" class="filter-item"></el-input>
        </div>
      </div>
    </div>
    <div class="profitDetails-body">
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column type="index" label="#" />
        <el-table-column prop="code" label="商品编号" width="200px" />
        <el-table-column prop="supplierName" label="销售日期"/>
        <el-table-column prop="purchaseDate" label="商品名称"/>
        <el-table-column prop="payStatusDesc" label="商品规格"/>
        <el-table-column prop="totalAmount" label="销售数量"/>
        <el-table-column prop="payAmount" label="折扣"/>
        <el-table-column prop="statusDesc" label="成本单价"/>
        <el-table-column prop="remark" label="成本金额"/>
        <el-table-column prop="remark" label="销售单价"/>
        <el-table-column prop="remark" label="销售金额"/>
        <el-table-column prop="remark" label="毛利"/>
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
    import { getAllSaleItem } from '@/api/newInvoicing/profitDetails'
    export default {
        name: "profitDetails",
        data(){
            return{
                loading: false,
                tableData: [],
                currentPage: 5,
                total: 0,
                costAmount: '3273481.09',
                salesAmount: '2625930.72',
                grossProfit: '-647550.37',
                productName: '',
                saleDate: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        created(){
            this.getTableData({}, 1, 15)
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableData({}, val, 15)
            },
            searchList(){

            },
            getTableData(data, no, size){
                getAllSaleItem(data, no, size).then(res => {
                    if (res.code === '0'){
                        this.loading = false
                        this.tableData = res.data.resultList
                        this.total = res.data.totalCount
                        let one = 0
                        let two = 0
                        res.data.resultList.forEach(item => {
                            one += item.amount
                            two += item.saleAmount
                        })
                        this.costAmount = one.toFixed(2)
                        this.salesAmount = two.toFixed(2)
                        this.grossProfit = (two - one).toFixed(2)
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
  .profitDetails-index{
    padding: 20px;
  }
  .profitDetails-one{
    border: 1px solid #E5E5E5;
    padding: 20px;
  }
  .profitDetails-two{
    margin-top: 10px;
    border: 1px solid #E5E5E5;
    padding: 20px;
  }
  .profitDetails-body{
    margin-top: 10px;
  }
</style>
