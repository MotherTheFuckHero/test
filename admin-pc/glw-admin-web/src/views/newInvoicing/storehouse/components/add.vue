<template>
  <el-dialog
    title="添加仓库"
    append-to-body
    :before-close="closeForm"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="700px"
  >
    <el-form ref="form" :model="form" :inline="true" :rules="rules" size="small" label-width="100px" class="demo-addForm">
      <el-form-item label="名称" prop="name" >
        <el-input v-model="form.name" placeholder="请输入仓库名称" maxlength="32" style="width: 215px;" />
      </el-form-item>
      <el-form-item label="拼音简码" prop="code" >
        <el-input v-model="form.code" placeholder="请输入拼音简码" maxlength="32" style="width: 215px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeForm">取 消</el-button>
      <el-button type="primary" @click="addSupplier">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { addStoreHouse } from '@/api/newInvoicing/storehouse'
    export default {
        props: ['type'],
        data(){
            return{
                dialogFormVisible: false,
                form: {
                    name: '',
                    code: '',
                    isDefault: 0,
                    merchantId: 10022,
                    companyId: 1,
                    status: 1,
                    systemId: 1
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入仓库名称',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        watch: {
            type(newData){
                this.dialogFormVisible = newData
            }
        },
        methods: {
            closeForm(){
                this.dialogFormVisible = false
                this.$refs['form'].resetFields()
                this.$emit('dialogType', this.dialogFormVisible)
            },
            addSupplier(){
                this.$refs.form.validate((valid)=>{
                    if (valid){
                        addStoreHouse(this.form).then(res => {
                            if (res.code === '0'){
                                this.dialogFormVisible = false
                                this.$refs['form'].resetFields()
                                this.$emit('dialogType', this.dialogFormVisible)
                                this.$parent.getTableData({}, 1, 20);
                                this.$notify({
                                    title: '成功',
                                    message: '新增成功',
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
