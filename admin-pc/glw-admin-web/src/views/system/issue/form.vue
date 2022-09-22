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
      <el-form-item label="系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;" placeholder="系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
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

      <el-form-item label="类型" prop="issueType">
        <el-select v-model="form.issueType" clearable style="width: 200px;" placeholder="类型" @change="typechange">
          <el-option
            v-for="item in issueTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="merchants" label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="问题" prop="question">
        <el-input v-model="form.question" type="textarea" style="width: 505px;" maxlength="255" />
      </el-form-item>
      <el-form-item label="答案" prop="answer">
        <el-input v-model="form.answer" type="textarea" style="width: 505px;" maxlength="255" />
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
import { getsystemLists } from '@/api/system/sys'
import { getlanguageLists } from '@/api/system/language'
import { issuetypeLists } from '@/api/system/issue'
import { getmerchantLists } from '@/api/merchant/merchant'
const defaultForm = {
  id: null,
  merchantId: '',
  systemId: '',
  languageId: '',
  issueType: '',
  question: '',
  answer: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchants: false,
      systemIdList: [],
      languageIdList: [],
      merchantIdList: [],
      issueTypeList: [],
      rules: {
        merchantId: [
          {
            required: true,
            message: '请选择提问商家',
            trigger: 'blur'
          }
        ],
        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言',
            trigger: 'blur'
          }
        ],
        issueType: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        answer: [
          {
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }
        ],
        question: [
          {
            required: true,
            message: '请输入问题',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'form.systemId': function(newQuestion, oldQuestion) {
      const datas = {
        status: 3,
        systemId: this.form.systemId
      }
      getmerchantLists(datas).then(res => {
        this.merchantIdList = res.data
      })
    },
    'form.issueType': function(newQuestion, oldQuestion) {
      if (this.form.issueType === 1) {
        this.merchants = false
      } else {
        this.merchants = true
        const datas = {
          status: 3,
          systemId: this.form.systemId
        }
        getmerchantLists(datas).then(res => {
          this.merchantIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    issuetypeLists(data).then(res => {
      this.issueTypeList = res.data
    })
  },
  methods: {
    typechange(val) {
      if (val === 1) {
        this.merchants = false
        this.form.merchantId = 0
      } else if (val === 2) {
        this.merchants = true
        this.form.merchantId = ''
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
