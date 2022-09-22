<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.layerName" clearable size="small" placeholder="输入停车场层名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.parkId" clearable filterable size="small" placeholder="停车场" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parkIdList"
        :key="item.id"
        :label="item.parkName"
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
import { getparkinfoLists } from '@/api/parking/parkInfo'
import { ParkLayerStatusLists } from '@/api/parking/parkLayer'
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
      parkIdList: [],
      statusList: []
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
  }
}
</script>
