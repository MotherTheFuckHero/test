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
    <el-select v-model="query.userId" clearable filterable size="small" placeholder="导游" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in userIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getguideUserLists } from '@/api/guide/guideUser'
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
      userIdList: [],
      statusList: [{
        value: 1,
        name: '休息中'
      }, {
        value: 2,
        name: '取消休息'
      }]
    }
  },
  created() {
    const data = {
    }
    getguideUserLists(data).then(res => {
      this.userIdList = res.data
    })
  }
}
</script>
