<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="导游" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in guideList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in settlementstatusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <span>开始时间:</span>
    <el-date-picker
      v-model="query.startCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <span>结束时间:</span>
    <el-date-picker
      v-model="query.endCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getguideUserLists } from '@/api/guide/guideUser'
import { settlementStatusList } from '@/api/order/order'
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
      guideList: [],
      settlementstatusList: []
    }
  },
  created() {
    const data = {
    }
    const datas = {
      status: 1
    }
    getguideUserLists(data).then(res => {
      this.guideList = res.data
    })
    settlementStatusList(datas).then(res => {
      this.settlementstatusList = res.data
    })
  }
}
</script>
