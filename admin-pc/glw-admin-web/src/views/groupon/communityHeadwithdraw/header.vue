<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.headId" clearable size="small" filterable placeholder="团长" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in headIdList"
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
    }
    getcommunityheadLists(data).then(res => {
      this.headIdList = res.data
    })
  }
}
</script>
