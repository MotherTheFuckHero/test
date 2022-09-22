<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.shopFeature" clearable size="small" placeholder="输入商家特色搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
    }
  }
}
</script>
