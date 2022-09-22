<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入小区名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.districtId" clearable size="small" filterable placeholder="所在区/县" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parentIdList"
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
import { getcityLists } from '@/api/system/city'
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
      parentIdList: []
    }
  },
  created() {
    const data = {
      status: 1,
      levelType: 3
    }
    getcityLists(data).then(res => {
      this.parentIdList = res.data
    })
  }
}
</script>
