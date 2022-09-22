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
      <el-form-item label="导游" prop="userId">
        <el-select v-model="form.userId" clearable style="width: 200px;" placeholder="导游">
          <el-option
            v-for="item in userIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="休息日期" prop="restDate">
        <el-date-picker
          v-model="form.restDate"
          style="width: 200px;"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="选择日期"
        />
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
import { getguideUserLists } from '@/api/guide/guideUser'
const defaultForm = {
  id: null,
  restDate: '',
  status: 1,
  type: 1,
  userId: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      userIdList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
        }
      },
      rules: {
        userId: [
          { required: true, message: '请选择导游', trigger: 'blur' }
        ],
        restDate: [
          { required: true, message: '请选择休息日期', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const data = {
    }
    getguideUserLists(data).then(res => {
      this.userIdList = res.data
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
