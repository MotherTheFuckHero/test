<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
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
import { getStatus } from '@/api/groupon/headCheck'
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
      statusList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getStatus(data).then(res => {
      this.statusList = res.data
    })
  }
}
</script>
