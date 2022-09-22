<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="650px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="语言名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="语言编码" prop="code">
        <el-input v-model="form.code" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="语言描述" prop="description">
        <el-input v-model="form.description" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="语言状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="语言状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
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
  name: '',
  description: '',
  code: '',
  status: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      statusList: [
        {
          value: 1,
          name: '显示'
        },
        {
          value: 2,
          name: '隐藏'
        }
      ],
      rules: {
        code: [
          { required: true, message: '请输入语言编码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]+$/, message: '请输入正确的语言编码' }
        ],
        name: [
          {
            required: true,
            message: '请输入语言名称',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入语言描述',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
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
