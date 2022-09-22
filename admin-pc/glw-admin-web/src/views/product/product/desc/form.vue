<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="700px"
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
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="form.unit" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="form.sellPoint" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="可用日期" prop="availableDates">
        <el-input v-model="form.availableDates" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" maxlength="32" style="width: 504px;" />
      </el-form-item>
      <el-form-item label="商品描述" prop="productDesc">
        <Editor v-model="form.productDesc" />
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
import Editor from '../../../Editor'
import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  title: '',
  languageId: '',
  productId: '',
  availableDates: '',
  keyword: '',
  productDesc: '',
  sellPoint: '',
  remarks: '',
  unit: ''
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        unit: [
          {
            required: true,
            message: '请输入单位',
            trigger: 'blur'
          }
        ],
        keyword: [
          {
            required: true,
            message: '请输入关键字',
            trigger: 'blur'
          }
        ],
        productDesc: [
          {
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }
        ],
        availableDates: [
          {
            required: true,
            message: '请输入可用日期',
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
      if (crud.form.productId === '') {
        crud.form.productId = JSON.parse(localStorage.getItem('productId'))
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
  ::v-deep  .editor{
    width: 510px !important;
  }
</style>
