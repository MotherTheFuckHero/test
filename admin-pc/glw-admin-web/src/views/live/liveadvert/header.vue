<template>
  <div
    v-if="crud.props.searchToggle"
  >
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
      statusList: [
        {
          value: 1,
          name: '使用'
        }, {
          value: 0,
          name: '不使用'
        }
      ]
    }
  }
}
</script>
