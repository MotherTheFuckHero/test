<template>
  <div
    v-if="crud.props.searchToggle"
  >

    <el-input v-model="query.name" clearable size="small" placeholder="输入分类名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.keyword" clearable size="small" placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
  }
}
</script>
