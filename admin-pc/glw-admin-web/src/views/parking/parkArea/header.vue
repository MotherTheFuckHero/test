<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.areaName" clearable size="small" placeholder="输入停车场区名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.layerId" clearable filterable size="small" placeholder="停车场层" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in layerIdList"
        :key="item.id"
        :label="item.layerName"
        :value="item.id"
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
import { getparkLayerLists } from '@/api/parking/parkLayer'
import { ParkAreaStatusLists } from '@/api/parking/parkArea'
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
      layerIdList: [],
      statusList: []
    }
  },
  created() {
    const datas = {
      status: 1
    }
    getparkLayerLists(datas).then(res => {
      this.layerIdList = res.data
    })
    const data = {
    }
    ParkAreaStatusLists(data).then(res => {
      this.statusList = res.data
    })
  }
}
</script>
