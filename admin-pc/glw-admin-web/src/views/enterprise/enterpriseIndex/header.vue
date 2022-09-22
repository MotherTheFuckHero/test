<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.enterpriseName" clearable size="small" placeholder="输入企业名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.status" clearable filterable size="small" placeholder="企业状态" class="filter-item" @change="crud.toQuery">
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
import { enterpriseStatusList } from '@/api/enterprise/enterpriseIndex'
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
        }
        enterpriseStatusList(data).then(res => {
            this.statusList = res.data
        })
    },
}
</script>
