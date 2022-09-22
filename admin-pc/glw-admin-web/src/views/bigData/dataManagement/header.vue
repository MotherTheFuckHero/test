<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.companyId" clearable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.type" clearable filterable size="small" placeholder="数据类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
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
import { getcompanyLists } from '@/api/system/company'
import { typeLists } from '@/api/bigData/dataManagement'
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
      companyIdList: [],
      typeList: []
    }
  },
  created() {
    const datas = {
      status: 1
    }
    getcompanyLists(datas).then(res => {
      this.companyIdList = res.data
    })
    typeLists(datas).then(res => {
      this.typeList = res.data
    })
  }
}
</script>
