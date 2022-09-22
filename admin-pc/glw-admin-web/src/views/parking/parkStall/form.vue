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
      <el-form-item label="停车场" prop="parkInfoId">
        <el-select v-model="form.parkInfoId" clearable filterable style="width: 200px;" placeholder="停车场" @change="parkInfochange">
          <el-option
            v-for="item in parkIdList"
            :key="item.id"
            :label="item.parkName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车场层" prop="parkLayerId">
        <el-select v-model="form.parkLayerId" clearable filterable placeholder="停车场层" style="width: 200px;">
          <el-option
            v-for="item in parkLayerIdList"
            :key="item.id"
            :label="item.layerName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车场区" prop="parkAreaId">
        <el-select v-model="form.parkAreaId" clearable filterable style="width: 200px;" placeholder="停车场区">
          <el-option
            v-for="item in parkAreaList"
            :key="item.id"
            :label="item.areaName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位状态" prop="stallStatus">
        <el-select v-model="form.stallStatus" clearable style="width: 200px;" placeholder="车位状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位车型" prop="carModelId">
        <el-select v-model="form.carModelId" clearable style="width: 200px;" placeholder="车位车型">
          <el-option
            v-for="item in carModelList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="编号" prop="stallNumber">
        <el-input v-model="form.stallNumber" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="车位横坐标" prop="coordinateX">
        <el-input v-model.number="form.coordinateX" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="车位纵坐标" prop="coordinateY">
        <el-input v-model.number="form.coordinateY" type="number" style="width: 200px;" />
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
import { getparkAreaLists } from '@/api/parking/parkArea'
import { getparkLayerLists } from '@/api/parking/parkLayer'
import { ParkStallStatusLists, CarModelLists } from '@/api/parking/parkStall'

const defaultForm = {
  id: null,
  parkInfoId: '',
  parkLayerId: '',
  parkAreaId: '',
  stallNumber: '',
  carModelId: '',
  coordinateY: '',
  coordinateX: '',
  stallStatus: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      statusList: [],
      parkIdList: [],
      parkLayerIdList: [],
      parkAreaList: [],
      carModelList: [],
      rules: {
        parkInfoId: [
          { required: true, message: '请选择停车场', trigger: 'blur' }
        ],
        parkLayerId: [
          { required: true, message: '请选择停车场层', trigger: 'blur' }
        ],
        parkAreaId: [
          { required: true, message: '请选择停车场区', trigger: 'blur' }
        ],
        stallNumber: [
          { required: true, message: '请输入停车场编号', trigger: 'blur' }
        ],
        carModelId: [
          { required: true, message: '请选择车位车型', trigger: 'blur' }
        ],
        coordinateX: [
          { required: true, message: '请输入停车场车位横坐标', trigger: 'blur' }
        ],
        coordinateY: [
          { required: true, message: '请输入停车场车位纵坐标', trigger: 'blur' }
        ],
        stallStatus: [
          { required: true, message: '请选择车位状态', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.parkInfoId': function(newQuestion, oldQuestion) {
      if (this.form.parkInfoId !== '') {
        const data = {
          parkId: this.form.parkInfoId
        }
        getparkLayerLists(data).then(res => {
          this.parkLayerIdList = res.data
        })
      }
    },
    'form.parkLayerId': function(newQuestion, oldQuestion) {
      if (this.form.parkLayerId !== '') {
        const data = {
          layerId: this.form.parkLayerId
        }
        getparkAreaLists(data).then(res => {
          this.parkAreaList = res.data
        })
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
    ParkStallStatusLists(data).then(res => {
      this.statusList = res.data
    })
    CarModelLists(data).then(res => {
      this.carModelList = res.data
    })
  },
  methods: {
    parkInfochange() {
      this.form.parkAreaId = ''
      this.form.parkLayerId = ''
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
