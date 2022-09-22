<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.parkInfoId" clearable filterable size="small" placeholder="停车场" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parkIdList"
        :key="item.id"
        :label="item.parkName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.parkLayerId" clearable filterable size="small" placeholder="停车场层" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in layerIdList"
        :key="item.id"
        :label="item.layerName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.parkAreaId" clearable filterable size="small" placeholder="停车场区" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parkAreaList"
        :key="item.id"
        :label="item.areaName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.carModelId" clearable filterable size="small" placeholder="车型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in carModelList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable filterable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getparkinfoLists } from '@/api/parking/parkInfo'
import { getparkLayerLists } from '@/api/parking/parkLayer'
import { getparkAreaLists } from '@/api/parking/parkArea'
import { ParkStallStatusLists, CarModelLists } from '@/api/parking/parkStall'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    permission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      statusList: [],
      parkIdList: [],
      layerIdList: [],
      parkAreaList: [],
      carModelList: []
    }
  },
  created() {
    const datas = {
      status: 1
    }
    getparkLayerLists(datas).then(res => {
      this.layerIdList = res.data
    })
    getparkinfoLists(datas).then(res => {
      this.parkIdList = res.data
    })
    getparkAreaLists(datas).then(res => {
      this.parkAreaList = res.data
    })
    const data = {
    }
    ParkStallStatusLists(data).then(res => {
      this.statusList = res.data
    })
    CarModelLists(data).then(res => {
      this.carModelList = res.data
    })
  }
}
</script>
