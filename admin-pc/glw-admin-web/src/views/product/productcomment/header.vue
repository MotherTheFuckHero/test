<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.orderId" clearable size="small" placeholder="输入订单编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.star" clearable size="small" placeholder="评分星级" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in starList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
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
      starList: [
        {
          value: 1,
          label: '1星'
        },
        {
          value: 2,
          label: '2星'
        },
        {
          value: 3,
          label: '3星'
        },
        {
          value: 4,
          label: '4星'
        },
        {
          value: 5,
          label: '5星'
        }
      ]
    }
  }
}
</script>
