<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="系统名称" prop="systemName">
        <el-input v-model="form.systemName" maxlength="32" style="width: 450px;" />
      </el-form-item>
      <el-form-item label="系统编码" prop="systemCode">
        <el-input v-model="form.systemCode" maxlength="32" style="width: 450px;" />
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
  systemName: '',
  systemCode: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ],
        systemCode: [
          { required: true, message: '请输入系统编码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]+$/, message: '请输入正确的系统编码' }
        ]
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
<style>
  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>
