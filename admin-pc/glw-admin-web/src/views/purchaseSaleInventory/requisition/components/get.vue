<template>
    <div class="purchaseOrderDetail">
      <div class="purchaseOrderOne">
        <h4>订单信息</h4>
        <div style="width: 100%;height: 1px;background: #F2F2F2"></div>
        <div class="purchaseOrderOneContent">
          <h2 style="text-align: center">调拨单</h2>
          <div style="display: flex;justify-content: space-between">
            <p></p>
            <div>
              <h4>单号：{{detail.code}}</h4>
              <p>制单日期：{{detail.date}}</p>
            </div>
          </div>
          <div style="margin-top: 10px">
            <el-table ref="table" v-loading="loading" :data="tableDataOne" style="width: 100%;" show-summary :summary-method="getTotal">
              <el-table-column type="index" label="序号" />
              <el-table-column prop="code" label="编码" />
              <el-table-column prop="title" label="品名" />
              <el-table-column prop="productSpecs" label="规格" />
              <el-table-column prop="unit" label="单位" />
              <el-table-column prop="warehouseName" label="所在仓库" align="center" />
              <el-table-column prop="beforeAllotQuantity" label="调拨前数量" align="center" />
              <el-table-column prop="afterAllotQuantity" label="调拨后数量" align="center" />
              <el-table-column prop="quantity" label="数量" />
              <el-table-column prop="price" label="单价" />
              <el-table-column prop="amount" label="金额" />
              <el-table-column prop="remark" label="备注" />
            </el-table>
            <div style="display: flex">
              <p>调出仓库：{{outWarehouseName}}</p>
              <p style="margin-left: 10px">调入仓库：{{inWarehouseName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { getAllotOrderDetail } from '@/api/newInvoicing/requisition'
    export default {
        props: ['getId'],
        data(){
            return{
                loading: true,
                tableDataOne: [],
                detail: {}
            }
        },
        watch: {
            getId: {
                handler(newData){
                    if (newData){
                        getAllotOrderDetail(newData).then(res => {
                            if (res.code === '0'){
                                this.loading = false
                                this.detail.code = res.data.code
                                this.detail.code = res.data.code
                                this.detail.date = res.data.allotDate
                                this.detail.outWarehouseName = res.data.outWarehouseName
                                this.detail.inWarehouseName = res.data.inWarehouseName
                                this.tableDataOne = res.data.allotItemList
                            }
                        })
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            getTotal(param){
                var _this=this;
                param.data = _this.tableDataOne;
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 8 || index === 10) {
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            sums[index] = parseFloat(sums[index]);
                        } else {
                            sums[index] = '';
                        }
                    } else {
                        sums[index] = '';
                    }
                })
                return sums;
            },
        }
    }
</script>

<style scoped>
  .purchaseOrderOne{
    background: #FFFFFF;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .purchaseOrderOne>h4{
    padding: 10px 0;
  }
  .purchaseOrderOneContent{
    margin-top: 10px;
  }
</style>
