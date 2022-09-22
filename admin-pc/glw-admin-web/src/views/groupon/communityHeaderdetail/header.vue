<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.communityHeaderId" clearable size="small" filterable placeholder="团长" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in headIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
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
import { getcommunityheadLists } from '@/api/groupon/communityHead'
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
      headIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getcommunityheadLists(data).then(res => {
      this.headIdList = res.data
    })
  }
}
</script>
