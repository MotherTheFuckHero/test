<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入分类名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.languageId" clearable filterable size="small" placeholder="语言" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in languageIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.type" clearable filterable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in TypeList"
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
import { categoryTypeLists } from '@/api/guide/guideCategory'
import { getlanguageLists } from '@/api/system/language'
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
      TypeList: [],
      languageIdList: []
    }
  },
  created() {
    const data = {
    }
    categoryTypeLists(data).then(res => {
      this.TypeList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  }
}
</script>
