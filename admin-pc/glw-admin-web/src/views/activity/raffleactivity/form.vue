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
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="次数限制" prop="times">
        <el-input v-model="form.times" type="number" maxlength="32" placeholder="每人每天抽奖次数限制" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="状态" prop="status" style="width: 200px;">
        <el-select v-model="form.status" clearable style="width: 200px;">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
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
      <el-form-item label="活动说明" prop="desc">
        <el-input v-model="form.desc" maxlength="512" type="textarea" style="width: 505px" />
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
import { activitiesstatusLists } from '@/api/activity/raffleactivity'
const defaultForm = {
  id: null,
  systemId: '',
  title: '',
  startTime: '',
  endTime: '',
  times: 1,
  desc: '',
  status: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      statusList: [],
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
            message: '请输入活动标题',
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
        times: [
          {
            required: true,
            message: '请输入每人次数限制',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入活动说明',
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
    activitiesstatusLists(data).then(res => {
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
