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
      <el-form-item label="用户" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户名称搜索" :remote-method="remoteMethod" style="width: 200px;">
          <el-option
            v-for="item in userIdList"
            :key="item.id"
            :label="item.userName+'('+item.nickName+')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="carPlate">
        <el-input v-model="form.carPlate" style="width: 200px;" placeholder="如京A88888" />
      </el-form-item>
      <el-form-item label="车型" prop="carModel">
        <el-select v-model="form.carModel" clearable style="width: 200px;" placeholder="车型">
          <el-option
            v-for="item in carModelList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车辆颜色" prop="carColor">
        <el-input v-model="form.carColor" style="width: 200px;" />
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
import { getuserinfoLists } from '@/api/user/userinfo'
import { CarModelLists } from '@/api/parking/parkStall'
const defaultForm = {
  id: null,
  userId: '',
  carModel: '',
  carPlate: '',
  carColor: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      userIdList: [],
      carModelList: [],
      rules: {
        userId: [
          { required: true, message: '请选择用户', trigger: 'blur' }
        ],
        carModel: [
          { required: true, message: '请选择车型', trigger: 'blur' }
        ],
        carPlate: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
          { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, message: '请输入正确车牌号' }
        ],
        carColor: [
          { required: true, message: '请输入车辆颜色', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.userId': function(newQuestion, oldQuestion) {
      if (this.form.userId !== '') {
        const data = {
          id: this.form.userId,
          status: 1
        }
        getuserinfoLists(data).then(res => {
          this.userIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
    }
    CarModelLists(data).then(res => {
      this.carModelList = res.data
    })
  },
  methods: {
    remoteMethod(query) {
      const data = {
        userName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
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
