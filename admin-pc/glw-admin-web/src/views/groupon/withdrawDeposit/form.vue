<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    title="团长提现审核"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="审核结果" prop="status">
        <el-radio-group v-model="form.status" style="width: 500px">
          <el-radio class="radio" :label="1">审核通过</el-radio>
          <el-radio class="radio" :label="2">审核拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.status===2" label="拒绝原因" prop="remark" :rules="[{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]">
        <el-input v-model="form.remark" type="textarea" style="width: 400px" />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
const defaultForm = {
  id: null,
  headId: '',
  remark: '',
  amount: '',
  status: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {

      }
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
