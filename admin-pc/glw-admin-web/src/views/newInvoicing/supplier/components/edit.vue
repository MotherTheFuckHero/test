<template>
  <el-dialog
    title="编辑供应商"
    append-to-body
    :before-close="closeForm"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="700px"
  >
    <el-form ref="form" :model="form" :inline="true" :rules="rules" size="small" label-width="100px" class="demo-addForm">
      <el-form-item label="名称" prop="name" >
        <el-input v-model="form.name" placeholder="请输入公司名称或者联系人姓名" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="联系人" prop="linkman" >
        <el-input v-model="form.linkman" placeholder="请输入联系人" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="传真" prop="fax" >
        <el-input v-model="form.fax" placeholder="请输入传真" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="常用电话" prop="phone" >
        <el-input v-model="form.phone" placeholder="请输入常用电话" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="备用电话" prop="standbyPhone" >
        <el-input v-model="form.standbyPhone" placeholder="请输入备用电话" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="地址" prop="address" >
        <el-input v-model="form.address" placeholder="请输入地址" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="QQ号" prop="qq" >
        <el-input v-model="form.qq" placeholder="请输入QQ号" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="微信" prop="wechat" >
        <el-input v-model="form.wechat" placeholder="请输入微信" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="旺旺" prop="wangwang" >
        <el-input v-model="form.wangwang" placeholder="请输入旺旺" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="Email" prop="email" >
        <el-input v-model="form.email" placeholder="请输入Email" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="网址" prop="website" >
        <el-input v-model="form.website" placeholder="请输入网址" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount" >
        <el-input v-model="form.bankAccount" placeholder="请输入银行账户" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="银行户名" prop="bankName" >
        <el-input v-model="form.bankName" placeholder="请输入银行户名" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="账号/卡号" prop="bankNo" >
        <el-input v-model="form.bankNo" placeholder="请输入账号/卡号" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="拼音简码" prop="code" >
        <el-input v-model="form.code" placeholder="请输入拼音简码" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" >
        <el-input type="textarea" v-model="form.remark" placeholder="请输入备注" style="width: 530px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeForm">取 消</el-button>
      <el-button type="primary" @click="editSupplier">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { editSupplier } from '@/api/newInvoicing/supplier'
    export default {
        props: ['id', 'type', 'data'],
        data(){
            return{
                dialogFormVisible: false,
                form: {
                    name: '',
                    linkman: '',
                    fax: '',
                    phone: '',
                    standbyPhone: '',
                    address: '',
                    qq: '',
                    wechat: '',
                    wangwang: '',
                    email: '',
                    website: '',
                    bankAccount: '',
                    bankName: '',
                    bankNo: '',
                    code: '',
                    remark: '',
                    merchantId: 10022,
                    companyId: 1,
                    status: 1,
                    systemId: 1
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入公司名称或者联系人姓名',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        watch: {
            type(newData){
                this.dialogFormVisible = newData
            },
            data(newData){
                this.form.name = newData.name
                this.form.linkman = newData.linkman
                this.form.fax = newData.fax
                this.form.phone = newData.phone
                this.form.standbyPhone = newData.standbyPhone
                this.form.address = newData.address
                this.form.qq = newData.qq
                this.form.wechat = newData.wechat
                this.form.wangwang = newData.wangwang
                this.form.email = newData.email
                this.form.website = newData.website
                this.form.bankAccount = newData.bankAccount
                this.form.bankName = newData.bankName
                this.form.bankNo = newData.bankNo
                this.form.code = newData.code
                this.form.remark = newData.remark
            }
        },
        methods: {
            closeForm(){
                this.dialogFormVisible = false
                this.$refs['form'].resetFields()
                this.$emit('dialogType', this.dialogFormVisible)
            },
            editSupplier(){
                this.$refs.form.validate((valid)=>{
                    if (valid){
                        editSupplier(this.id, this.form).then(res => {
                            if (res.code === '0'){
                                this.dialogFormVisible = false
                                this.$refs['form'].resetFields()
                                this.$emit('dialogType', this.dialogFormVisible)
                                this.$parent.getTableData({}, 1, 20);
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
                    }else{
                        this.$notify({
                            title: '警告',
                            message: '请将信息填写完整',
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
