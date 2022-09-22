<template>
  <div class="requisition-index">
    <div class="requisition-header">
      <div>
<!--        <el-input size="mini" placeholder="请输入订单编号搜索" clearable v-model="supplierInput" style="width: 200px;" class="filter-item" @clear="getTableData({}, 1, 15)"></el-input>-->
<!--        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchList">搜索</el-button>-->
      </div>
      <div>
        <el-select v-model="value" size="mini" @change="checkPayStatus" clearable @clear="getTableData({}, 1, 15)" placeholder="请选择付款状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="showPurchaseOrder = true">创建调拨单</el-button>
      </div>
    </div>
    <div class="requisition-body">
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column type="index" label="#" />
        <el-table-column prop="code" label="订单编号" width="200px" />
        <el-table-column prop="outWarehouseName" label="调出仓库" width="200px"/>
        <el-table-column prop="inWarehouseName" label="调入仓库" width="200px"/>
        <el-table-column prop="allotDate" label="调拨日期" width="200px"/>
        <el-table-column prop="statusDesc" label="调拨状态 " width="200px"/>
        <el-table-column prop="remark" label="备注" width="200px"/>
        <el-table-column label="操作" width="480px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" size="mini" type="success" icon="el-icon-finished" @click="warehousing(scope.row.id)">调拨入库</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="primary" icon="el-icon-edit" @click="updateEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="warning" icon="el-icon-search" @click="seePurchaseOrder(scope.row.id)">查看</el-button>
            <el-button v-if="scope.row.status == 1" type="danger" icon="el-icon-delete" size="mini" @click="delPurchaseOrder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
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
    <el-dialog
      title="添加调拨单"
      append-to-body
      :before-close="closeDialog"
      :visible.sync="showPurchaseOrder"
      :close-on-click-modal="false"
      width="75%"
    >
      <add ref="childPurchaseOrder" @successAdd="getAddType"/>
    </el-dialog>
    <el-dialog
      title="编辑调拨单"
      append-to-body
      :before-close="closeEditDialog"
      :visible.sync="showEditPurchaseOrder"
      :close-on-click-modal="false"
      width="75%"
    >
      <edit ref="childEditPurchaseOrder" @successAdd="getEditType" :editId="nowUpdateEditId"/>
    </el-dialog>
    <el-dialog
      title="查看调拨单"
      append-to-body
      :before-close="closeGetDialog"
      :visible.sync="showGetPurchaseOrder"
      :close-on-click-modal="false"
      width="75%"
    >
      <get ref="childGetPurchaseOrder" :getId="nowGetOrderId"/>
    </el-dialog>
  </div>
</template>

<script>
    import { getAllAllotOrder, allotOrderWarehousing, delAllotOrder } from '@/api/newInvoicing/requisition'
    import add from './components/add'
    import edit from './components/edit'
    import get from './components/get'
    export default {
        name: "调拨单管理",
        components: {
            add,
            edit,
            get
        },
        data(){
            return{
                supplierInput: '',
                options: [
                    {
                        value: 1,
                        label: '已结清'
                    }, {
                        value: 2,
                        label: '欠款'
                    }
                ],
                value: '',
                loading: true,
                tableData: [],
                currentPage: 5,
                total: 0,
                showPurchaseOrder: false,
                showEditPurchaseOrder: false,
                showGetPurchaseOrder: false,
                nowUpdateEditId: null,
                nowGetOrderId: null
            }
        },
        created(){
            this.getTableData({}, 1, 15)
        },
        methods: {
            checkPayStatus(val){
                if(this.supplierInput != ''){
                    this.getTableData({code: this.supplierInput, payStatus:val}, 1, 15)
                }else {
                    this.getTableData({payStatus:val}, 1, 15)
                }
            },
            searchList(){
                if(this.value != ''){
                    this.getTableData({code: this.supplierInput, payStatus: this.value}, 1, 15)
                }else {
                    this.getTableData({code: this.supplierInput}, 1, 15)
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getTableData({}, val, 15)
            },
            getTableData(data, no, size){
                getAllAllotOrder(data, no, size).then(res => {
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
            closeDialog(){
                let r=confirm('单据未保存\n点【确定】表示不保存直接退出\n点【取消】回到单据界面付款/付清保存');
                if (r==true){
                    this.showPurchaseOrder = false
                    this.$refs.childPurchaseOrder.resetPurchaseOrder()
                } else{
                    this.showPurchaseOrder = true
                }
            },
            closeEditDialog(){
                let r=confirm('单据未保存\n点【确定】表示不保存直接退出\n点【取消】回到单据界面付款/付清保存');
                if (r==true){
                    this.showEditPurchaseOrder = false
                    this.$refs.childEditPurchaseOrder.resetPurchaseOrder()
                    this.nowUpdateEditId = null
                } else{
                    this.showEditPurchaseOrder = true
                }
            },
            closeGetDialog(){
                this.showGetPurchaseOrder = false
                this.nowGetOrderId = null
            },
            // 创建采购单成功后调用的方法
            getAddType(data){
                this.showPurchaseOrder = data
                this.$refs.childPurchaseOrder.resetPurchaseOrder()
                this.getTableData({}, 1, 15)
            },
            getEditType(data){
                this.showEditPurchaseOrder = data
                this.$refs.childEditPurchaseOrder.resetPurchaseOrder()
                this.getTableData({}, 1, 15)
                this.nowUpdateEditId = null
            },
            updateEdit(id){
                this.showEditPurchaseOrder = true
                this.nowUpdateEditId = id
            },
            seePurchaseOrder(id){
                this.showGetPurchaseOrder = true
                this.nowGetOrderId = id
            },
            warehousing(id){
                allotOrderWarehousing(id, {status: 2}).then(res => {
                    if (res.code === '0'){
                        this.getTableData({}, 1, 15)
                        this.$notify({
                            title: '成功',
                            message: '调拨入库成功',
                            type: 'success'
                        });
                    }else {
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            delPurchaseOrder(id){
                this.$confirm('此操作将永久删除该调拨单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delAllotOrder(id).then(res => {
                        if (res.code === '0'){
                            this.getTableData({}, 1, 15)
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
  .requisition-index{
    padding: 20px;
  }
  .requisition-header{
    display: flex;
    justify-content: space-between;
  }
  .requisition-header>div:nth-of-type(2){
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .requisition-header>div:nth-of-type(2)>div{
    margin-left: 10px;
  }
  .requisition-header>div:nth-of-type(2)>button{
    margin-left: 10px;
  }
  .requisition-body{
    padding-top: 10px;
  }
  /deep/ .el-dialog__body{
    background: #F2F2F2 !important;
  }
</style>
