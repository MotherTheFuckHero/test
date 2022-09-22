<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.type" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
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
import { getType, getStatus } from '@/api/groupon/headCheck'
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
      typeList: [],
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
    getType(data).then(res => {
      this.typeList = res.data
    })
  }
}
</script>
