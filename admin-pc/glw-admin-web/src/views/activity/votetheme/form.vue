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
        <el-select v-model="form.systemId" clearable style="width: 200px;">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type" style="width: 200px;">
        <el-select v-model="form.type" clearable style="width: 200px;">
          <el-option
            v-for="item in votetypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投票标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>

      <el-form-item label="最多投票" prop="maxCount">
        <el-input v-model="form.maxCount" type="number" maxlength="32" placeholder="每人每天最多投票数量" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="最少投票" prop="minCount">
        <el-input v-model="form.minCount" type="number" maxlength="32" placeholder="每人每天最少投票数量" style="width: 200px;" />
      </el-form-item>

      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px;"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px;"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="活动规则" prop="ruleDesc">
        <el-input v-model="form.ruleDesc" maxlength="512" type="textarea" style="width: 505px" />
      </el-form-item>
      <el-form-item label="活动说明" prop="content">
        <el-input v-model="form.content" maxlength="512" type="textarea" style="width: 505px" />
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
import { votetypeLists } from '@/api/activity/votetheme'
const defaultForm = {
  id: null,
  systemId: '',
  title: '',
  type: '',
  startTime: '',
  endTime: '',
  maxCount: '',
  minCount: 1,
  ruleDesc: '',
  content: '',
  status: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      votetypeList: [],
      rules: {
        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入投票主题',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请输入开始时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请输入结束时间',
            trigger: 'blur'
          }
        ],
        minCount: [
          {
            required: true,
            message: '请输入每人每天最小次数限制',
            trigger: 'blur'
          }
        ],
        maxCount: [
          {
            required: true,
            message: '请输入每人每天最大次数限制',
            trigger: 'blur'
          }
        ],
        ruleDesc: [
          {
            required: true,
            message: '请输入投票活动规则',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入投票活动内容',
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
    votetypeLists(data).then(res => {
      this.votetypeList = res.data
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
