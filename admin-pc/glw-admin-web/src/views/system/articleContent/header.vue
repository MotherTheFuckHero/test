<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.articleid" clearable size="small" placeholder="文章" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in articleIdList"
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
import { getarticleLists } from '@/api/system/article'
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
      articleIdList: []
    }
  },
  created() {
    const data = {
    }
    getarticleLists(data).then(res => {
      this.articleIdList = res.data
    })
  }
}
</script>
