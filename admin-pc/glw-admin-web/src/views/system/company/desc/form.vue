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
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司昵称" prop="nickName">
        <el-input v-model="form.nickName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input v-model="form.companyAddress" maxlength="32" style="width: 200px;" />
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
import { getlanguageLists } from '@/api/system/language'
import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  companyName: '',
  languageId: '',
  companyId: '',
  nickName: '',
  companyAddress: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      rules: {
        companyName: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入公司昵称',
            trigger: 'blur'
          }
        ],
        companyAddress: [
          {
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  },
  methods: {
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      if (crud.form.companyId === '') {
        crud.form.companyId = JSON.parse(localStorage.getItem('companyId'))
      }
    }
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
