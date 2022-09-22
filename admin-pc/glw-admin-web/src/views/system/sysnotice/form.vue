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
      <el-form-item label="类型" prop="noticeType">
        <el-select v-model="form.noticeType" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in noticeTypeList"
            :key="item.dataCode"
            :label="item.dataValue"
            :value="item.dataCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="noticeTitle">
        <el-input v-model="form.noticeTitle" maxlength="255" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="内容" prop="noticeContent">
        <Editor v-model="form.noticeContent" />
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
import { sysnoticetypeList } from '@/api/system/sysnotice'
import Editor from '../../Editor'
const defaultForm = {
  id: null,
  systemId: '',
  languageId: '',
  noticeType: '',
  noticeTitle: '',
  noticeContent: '',
  status: 1
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      languageIdList: [],
      noticeTypeList: [],
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
        noticeType: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        noticeTitle: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        noticeContent: [
          {
            required: true,
            message: '请输入内容',
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
    sysnoticetypeList(data).then(res => {
      this.noticeTypeList = res.data
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
  ::v-deep .editor{
    width: 505px !important;
  }
</style>

