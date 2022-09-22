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
      <el-form-item label="停车场" prop="parkId">
        <el-select v-model="form.parkId" clearable filterable placeholder="停车场" style="width: 200px;">
          <el-option
            v-for="item in parkIdList"
            :key="item.id"
            :label="item.parkName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="层名称" prop="layerName">
        <el-input v-model="form.layerName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="层排序" prop="layerSort">
        <el-input v-model.number="form.layerSort" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="层状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="层状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
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
import { getparkinfoLists } from '@/api/parking/parkInfo'
import { ParkLayerStatusLists } from '@/api/parking/parkLayer'
const defaultForm = {
  id: null,
  parkId: '',
  layerSort: '',
  layerName: '',
  status: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      parkIdList: [],
      statusList: [],
      rules: {
        parkId: [
          { required: true, message: '请选择停车场', trigger: 'blur' }
        ],
        layerName: [
          {
            required: true,
            message: '请输入层名称',
            trigger: 'blur'
          }
        ],
        layerSort: [
          {
            required: true,
            message: '请输入层排序',
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
    const datas = {
      status: 1
    }
    getparkinfoLists(datas).then(res => {
      this.parkIdList = res.data
    })
    const data = {
    }
    ParkLayerStatusLists(data).then(res => {
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
