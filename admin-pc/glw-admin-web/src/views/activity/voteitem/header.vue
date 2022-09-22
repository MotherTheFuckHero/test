<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.title" clearable size="small" placeholder="输入主题名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.voteId" clearable size="small" placeholder="活动列表" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in voteIdList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getraffleactivityLists } from '@/api/activity/votetheme'
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
      voteIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getraffleactivityLists(data).then(res => {
      this.voteIdList = res.data
    })
  }
}
</script>
