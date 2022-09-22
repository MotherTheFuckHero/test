<template>
    <div class="purchaseOrderDetail">
      <div class="purchaseOrderOne">
        <h4>表单信息</h4>
        <div style="width: 100%;height: 1px;background: #F2F2F2"></div>
        <div class="purchaseOrderOneContent">
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px" class="demo-addForm">
            <el-form-item label="损益日期" prop="indecDate">
              <el-date-picker
                v-model="form.indecDate"
                type="datetime"
                placeholder="请选择损益日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark" placeholder="请输入备注" resize="none" style="width: 400px;"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="purchaseOrderTwo">
        <h4>商品信息</h4>
        <div style="width: 100%;height: 1px;background: #F2F2F2"></div>
        <div class="purchaseOrderTwoContent">
          <el-table ref="table" :data="tableData" style="width: 100%;" show-summary :summary-method="getTotal">
            <el-table-column type="index" label="#" />
            <el-table-column prop="code" label="商品编号" align="center" />
            <el-table-column prop="title" label="商品名称" align="center" />
            <el-table-column prop="productSpecs" label="规格" align="center" />
            <el-table-column prop="unit" label="单位" align="center" />
            <el-table-column prop="warehouseName" label="仓库" align="center" />
            <el-table-column prop="actualStock" label="账面库存" align="center" />
            <el-table-column prop="stock" label="实际库存" align="center" >
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.stock" size="mini" placeholder="请输入商品实际库存" @input="getTotalPrice(scope.row,scope.$index)"/>
              </template>
            </el-table-column>
            <el-table-column prop="indecQuantity" label="损益数量" align="center" >
              <template slot-scope="scope">
                {{scope.row.indecQuantity = scope.row.stock - scope.row.actualStock}}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="损益单价" align="center" >
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.price" size="mini" placeholder="请输入商品损益单价" @input="getTotalPrice(scope.row,scope.$index)"/>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="小计" align="center" />
            <el-table-column prop="remark" label="备注" align="center" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="toDelete(scope.row.id, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 10px">
          <el-button class="filter-item" size="mini" type="warning" @click="zjDialog = true">选择商品</el-button>
        </div>
      </div>
      <div style="margin-top: 10px">
        <el-button class="filter-item" size="mini" type="success" @click="towPay">保存</el-button>
      </div>
      <allComponents :interface="2" :type="zjDialog" @dialogType="getDialogType" @productData="getProductData"/>
    </div>
</template>

<script>
    import { postIndecOrder } from '@/api/newInvoicing/lossOrder'
    import allComponents from '../../allComponents'
    export default {
        components: {
            allComponents
        },
        data(){
            return{
                zjDialog: false,
                tableData:[],
                form: {
                    indecDate: new Date().getFullYear() + '-' +
                        ((new Date().getMonth() + 1)<10?'0'+(new Date().getMonth() + 1):(new Date().getMonth() + 1)) + '-' +
                        (new Date().getDate()<10?'0'+ new Date().getDate() : new Date().getDate()) + ' ' +
                        (new Date().getHours()<10?'0'+ new Date().getHours() : new Date().getHours()) + ':' +
                        (new Date().getMinutes()<10?'0'+ new Date().getMinutes() : new Date().getMinutes()) + ':' +
                        (new Date().getSeconds()<10?'0'+ new Date().getSeconds() : new Date().getSeconds()),
                    remark: ''
                },
                rules: {
                    indecDate: [
                        {  required: true, message: '请选择采购日期', trigger: 'change' }
                    ],
                },
            }
        },
        watch: {
            tableData(newData){
                for (var i = 0; i < newData.length; i++) {
                    for (var j = i + 1; j < newData.length; j++) {
                        if (newData[i].productSpecId == newData[j].productSpecId) {
                            this.$notify({
                                title: '警告',
                                message: '该商品已选择，请勿重复选择',
                                type: 'warning'
                            });
                            this.tableData.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        },
        methods: {
            resetPurchaseOrder(){
                this.$refs['form'].resetFields()
                this.tableData = []
            },
            getDialogType(data){
                this.zjDialog = data
            },
            getProductData(data){
                let newData = {
                    id: data.id,
                    code: data.code,
                    title: data.title,
                    unit: data.unit,
                    stock: 0,
                    actualStock: data.stock,
                    indecQuantity: 0,
                    price: 0,
                    amount: 0,
                    productSpecId: data.productSpecId,
                    remark: '',
                    warehouseId: data.warehouseId,
                    warehouseName:  data.warehouseName,
                    productSpecs: data.productSpecs,
                    systemId: 1,
                    merchantId: 10022,
                    companyId: 1
                }
                this.tableData.push(newData)
            },
            getTotalPrice(v, i) {
                v.amount = 0
                if (v.stock !== '' && v.price !== '') {
                    v.amount = Number((Number(v.stock - v.actualStock) * Number(v.price)).toFixed(2))
                } else if (v.stock === '' || v.price === '') {
                    v.amount = ''
                }
            },
            toDelete(id, data){
                this.tableData = this.tableData.filter(function (item) {
                    return item.id != id
                })
            },
            getTotal(param){
                var _this=this;
                param.data = _this.tableData;
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
            towPay(){
                this.$refs.form.validate((valid)=>{
                    if (valid){
                        let sum = 0
                        this.tableData.forEach(item => {
                            sum += item.amount
                        })
                        let data = {
                            indecDate: this.form.indecDate,
                            remark: this.form.remark,
                            status: 1,
                            systemId: 1,
                            merchantId: 10022,
                            companyId: 1,
                            indecItemList: this.tableData,
                        }
                        postIndecOrder(data).then(res => {
                            if (res.code === '0'){
                                this.$emit('successAdd', false)
                                this.$notify({
                                    title: '成功',
                                    message: '添加损益单成功',
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
                    }else{
                        this.$notify({
                            title: '警告',
                            message: '请将损益信息填写完整',
                            type: 'warning'
                        });
                    }
                })
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
.purchaseOrderTwo{
  margin-top: 10px;
  background: #FFFFFF;
  padding: 5px 10px;
  border-radius: 5px;
}
.purchaseOrderTwo>h4{
  padding: 10px 0;
}
.purchaseOrderTwoContent{
  margin-top: 10px;
}
</style>
