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
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="子标题" prop="subtitle">
        <el-input v-model="form.subtitle" maxlength="32" style="width: 200px;" />
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
  title: '',
  subtitle: '',
  languageId: '',
  panelContentId: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            required: true,
            message: '请输入子标题',
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
      if (crud.form.panelContentId === '') {
        crud.form.panelContentId = JSON.parse(localStorage.getItem('panelContentId'))
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
