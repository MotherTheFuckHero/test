<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入导览点名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.guideId" clearable size="small" placeholder="导览图" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in guideIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.scaleType" clearable size="small" placeholder="规模" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in scaleTypeList"
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
import { scaleTypeLists } from '@/api/guide/merchantguidepoint'
import { getmerchantguideLists } from '@/api/guide/merchantguide'
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
      guideIdList: [],
      scaleTypeList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getmerchantguideLists(data).then(res => {
      this.guideIdList = res.data
    })
    scaleTypeLists(data).then(res => {
      this.scaleTypeList = res.data
    })
  }
}
</script>
