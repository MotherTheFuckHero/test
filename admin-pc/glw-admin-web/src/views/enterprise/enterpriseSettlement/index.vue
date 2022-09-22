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
      <el-table-column prop="enterpriseName" label="企业名称" width="150px" />
      <el-table-column prop="connectorName" label="企业联系人" width="150px" />
      <el-table-column prop="connectorPhone" label="企业联系人电话" width="150px" />
      <el-table-column prop="statusDesc" label="状态" width="150px" />
      <el-table-column prop="settlementPeriod" label="结算期间" width="200px" />
      <el-table-column prop="settlementDate" label="结算日期" width="200px" />
      <el-table-column prop="orderCount" label="订单总数量" width="200px" />
      <el-table-column prop="totalAmount" label="订单总金额" width="200px" />
      <el-table-column prop="totalRoyaltyAmount" label="总提成金额" width="200px" />
      <el-table-column prop="invoiceStatusDesc" label="开票状态" width="200px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="createdUserName" width="200" />
      <el-table-column label="修改时间" prop="createdTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['settlement_info_select', 'settlement_info_update', 'settlement_info_delete']"
        label="操作"
        width="330px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-permission="['settlement_info_select']" size="mini" type="primary" plain @click="detailsEdit(scope.$index, scope.row)">查看结算详情</el-button>
          <el-button v-show="scope.row.status === 1" v-permission="['settlement_info_update']" size="mini" type="success" plain @click="confirmSettlement(scope.$index, scope.row)">确认结算</el-button>
          <el-button v-show="scope.row.invoiceStatus === 3" v-permission="['settlement_info_update']" size="mini" type="warning" plain @click="applyInvoicing(scope.$index, scope.row)">同意开票</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />

    <el-dialog title="结算详情" :visible.sync="dialogTableVisible">
      <el-table :data="resultList">
        <el-table-column property="id" label="编号" />
        <el-table-column property="enterpriseUserId" label="商家" />
        <el-table-column property="orderId" label="订单编号" />
        <el-table-column property="totalAmount" label="总金额" />
        <el-table-column property="royaltyRatio" label="提成比例" />
        <el-table-column property="royaltyAmount" label="提成金额" />
      </el-table>
    </el-dialog>
    <el-dialog title="开票信息" :visible.sync="dialogInvoicingVisible" width="480px" @close="resetInvoicing('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="开票地址" prop="invoiceUrl">
          <el-input v-model="ruleForm.invoiceUrl" maxlength="32" />
        </el-form-item>
        <el-form-item label="导览点图" prop="invoiceImg">
          <el-upload
            v-model="ruleForm.invoiceImg"
            action="/"
            :http-request="fileAdd"
            :limit="1"
            :file-list="ruleForm.fileList"
            :on-exceed="handleExceed"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="handleRemove"
            value-key="form.pointImgKey"
            multiple
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogInvoicingVisible = false">取消</el-button>
        <el-button type="primary" @click="submitInvoicing('ruleForm')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import crudJob from '@/api/enterprise/enterpriseSettlement'
    import { settlementPut, settlementdetailList, settlementInvoice } from '@/api/enterprise/enterpriseSettlement'
    import eHeader from './header'
    import CRUD, { presenter } from '@crud/crud'
    import crudOperation from '@crud/CRUD.operation'
    import pagination from '@crud/Pagination'
    import { sysfileAdds } from '@/api/upload'
    export default {
        name: '企业结算列表',
        components: { eHeader, crudOperation, pagination },
        cruds() {
            return CRUD({
                title: '企业结算列表',
                optShow: {
                    add: false,
                    edit: false,
                    del: false,
                    reset: false
                },
                url: process.env.VUE_APP_enterprise_API + 'admin/settlement_info/page_list',
                crudMethod: { ...crudJob }
            })
        },
        mixins: [presenter()],
        // 数据字典
        data() {
            return {
                resultList: [],
                dialogTableVisible: false,
                dialogInvoicingVisible: false,
                ruleForm: {
                    id: '',
                    invoiceUrl: '',
                    invoiceImg: '',
                    fileList: [],
                },
                rules: {
                    invoiceUrl: [
                        {
                            required: true,
                            message: '请填写发票地址',
                            trigger: 'blur'
                        }
                    ],
                    invoiceImg: [
                        {
                            required: true,
                            message: '请上传开票扫描件',
                            trigger: 'blur'
                        }
                    ],
                },
                permission: {
                    edit: ['settlement_info_update'],
                    del: ['settlement_info_delete']
                }
            }
        },
        methods: {
            detailsEdit(index, row) {
                var obj = Object.assign({}, row)
                var urlId = obj.id
                var data = {
                    id: urlId
                }
                var params = {
                    pageNo: 1,
                    pageSize: 999
                }
                settlementdetailList(data, params).then(res => {
                    var code = res.code
                    var msg = res.msg
                    if (code === '0') {
                        this.resultList = res.data.resultList
                        this.dialogTableVisible = true
                    } else {
                        this.$message({
                            message: msg,
                            type: 'warning'
                        })
                    }
                })
            },
            // 修改完毕
            confirmSettlement(index, row) {
                var obj = Object.assign({}, row)
                var urlId = obj.id
                this.$confirm('确认结算完成吗？', '提示', {}).then(() => {
                    settlementPut(urlId, 2).then(res => {
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
            applyInvoicing(index, row){
                var obj = Object.assign({}, row)
                var urlId = obj.id
                this.ruleForm.id = urlId
                this.dialogInvoicingVisible = true;
            },
            submitInvoicing(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        settlementInvoice(this.ruleForm).then(res => {
                            var code = res.code
                            var msg = res.msg
                            if (code === '0') {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                })
                                this.dialogInvoicingVisible = false;
                                this.crud.refresh()
                            } else {
                                this.$message({
                                    message: msg,
                                    type: 'warning'
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetInvoicing(formName) {
                this.$refs[formName].resetFields();
            },
            // 图片提交
            handleRemove(file, fileList) {
                this.ruleForm.fileList = fileList
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`)
                this.ruleForm.fileList = fileList
            },
            // 选择文件
            fileAdd(fileList) {
                const myfile = fileList
                const file = myfile.file
                var formData = new FormData()
                formData.append('file', file)
                var _this = this
                sysfileAdds(formData).then(res => {
                    var code = res.code
                    var msg = res.msg
                    if (code === '0') {
                        _this.ruleForm.fileList.push({
                            'name': res.data.fileName,
                            'key': res.data.key,
                            'size': res.data.size,
                            'url': res.data.url
                        })
                        _this.ruleForm.invoiceImg = res.data.key
                    } else {
                        _this.$message({
                            message: msg,
                            type: 'warning'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
