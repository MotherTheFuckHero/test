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
      <el-form-item label="分公司" prop="companyId">
        <el-select v-model="form.companyId" clearable filterable placeholder="分公司" style="width: 200px;">
          <el-option
            v-for="item in companyIdList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="数据类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="数据类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="参数1" prop="value">
        <el-input v-model="form.value" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="参数2" prop="resValue">
        <el-input v-model="form.resValue" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="周" prop="week">
        <el-input v-model="form.week" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="时间" prop="dateTime">
        <el-input v-model="form.dateTime" maxlength="32" style="width: 200px;" />
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
import { getcompanyLists } from '@/api/system/company'
import { typeLists } from '@/api/bigData/dataManagement'
const defaultForm = {
  id: null,
  companyId: '',
  name: '',
  type: '',
  value: '',
  dateTime: '',
  week: '',
  resValue: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      typeList: [],
      companyIdList: [],
      rules: {
        companyId: [
          { required: true, message: '请选择分公司', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择停数据类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const datas = {
      status: 1
    }
    getcompanyLists(datas).then(res => {
      this.companyIdList = res.data
    })
    typeLists(datas).then(res => {
      this.typeList = res.data
    })
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
