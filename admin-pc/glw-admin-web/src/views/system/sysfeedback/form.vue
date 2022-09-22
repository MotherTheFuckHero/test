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
        <el-select v-model="form.systemId" disabled clearable style="width: 200px;" placeholder="系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" disabled clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" disabled clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.pictures" label="反馈图片" prop="pictures">
        <img alt="" :src="form.pictures" width="100" height="100">
      </el-form-item>
      <el-form-item label="反馈内容" prop="content">
        <el-input v-model="form.content" disabled type="textarea" style="width: 505px;" maxlength="255" />
      </el-form-item>
      <el-form-item label="回复内容" prop="replyContent">
        <el-input v-model="form.replyContent" type="textarea" style="width: 505px;" maxlength="255" />
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
import { typeLists, statusLists } from '@/api/system/sysfeedback'
const defaultForm = {
  id: null,
  systemId: '',
  languageId: '',
  userId: '',
  mobile: '',
  feedType: '',
  hasPicture: '',
  content: '',
  replyContent: '',
  pictures: '',
  status: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      TypeList: [],
      statusList: [],
      systemIdList: [],
      languageIdList: [],
      rules: {
        replyContent: [
          {
            required: true,
            message: '请输入回复内容',
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
    typeLists(data).then(res => {
      this.TypeList = res.data
    })
    statusLists(data).then(res => {
      this.statusList = res.data
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
