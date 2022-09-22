<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入城市名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.pinyin" clearable size="small" placeholder="输入拼音搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.parentId" clearable size="small" filterable placeholder="父级城市" class="filter-item" @change="crud.toQuery">
      <el-option value="100000" label="父级为空" />
      <el-option
        v-for="item in parentIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.levelType" clearable size="small" placeholder="城市级别" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in levelTypeList"
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
import { getcityLists, citytypeLists } from '@/api/system/city'
import rrOperation from '@crud/RR.operation'
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
      levelTypeList: [],
      parentIdList: []
    }
  },
  created() {
    const data = {}
    citytypeLists(data).then(res => {
      this.levelTypeList = res.data
    })
    getcityLists(data).then(res => {
      this.parentIdList = res.data
    })
  }
}
</script>
