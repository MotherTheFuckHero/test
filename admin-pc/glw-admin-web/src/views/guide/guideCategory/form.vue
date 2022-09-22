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
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable filterable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model.number="form.sortNo" style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 200px;">
          <el-radio class="radio" :label="1">显示</el-radio>
          <el-radio class="radio" :label="2">隐藏</el-radio>
        </el-radio-group>
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
import { categoryTypeLists } from '@/api/guide/guideCategory'
import { getlanguageLists } from '@/api/system/language'
const defaultForm = {
  id: null,
  sortNo: 100,
  languageId: '',
  name: '',
  status: 1,
  type: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      TypeList: [],
      languageIdList: [],
      rules: {
        sortNo: [
          { required: true, message: '请输入排序编号', trigger: 'blur' }
        ],
        languageId: [
          { required: true, message: '请选择所属语言', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分类类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const data = {
    }
    categoryTypeLists(data).then(res => {
      this.TypeList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
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
