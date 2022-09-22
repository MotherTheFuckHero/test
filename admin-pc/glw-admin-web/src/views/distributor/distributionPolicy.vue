<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="100px">
      <el-form-item label="分享次数" prop="shareTimes">
        <el-input v-model="form.shareTimes"  style="width: 200px !important;" />
      </el-form-item>
      <el-form-item label="提成比例" prop="shareBack">
        <el-input v-model="form.shareBack"  style="width: 200px !important;">
          <i slot="suffix">%</i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doSubmit('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { addDistribution } from '@/api/distributor/distributionProduct'
    export default {
        name: "设置分销政策",
        data(){
            return {
                form: {
                    shareTimes: '',
                    shareBack: ''
                },
                rules: {
                    shareTimes: [
                        { required: true, message: '请输入分享次数', trigger: 'blur' },
                        { pattern: /[1-9][0-9]*$/, message: '请输入正确的分享次数', trigger: 'blur' }
                    ],
                    shareBack: [
                        { required: true, message: '请输入提成比例', trigger: 'blur' },
                        { pattern: /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/, message: '请输入正确的提成比例', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            doSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = this.form
                        addDistribution(data).then(res => {
                            if (res.code === '0'){
                                this.$notify({
                                    title: '设置分销政策成功',
                                    message: '',
                                    type: 'success'
                                })
                            }else{
                                this.$notify.error({
                                    title: '设置分销政策失败',
                                    message: res.msg
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
