<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入导游名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.companyId" clearable filterable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.status" clearable filterable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in StatusList"
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
import { guideUserStatus } from '@/api/guide/guideUser'
import { getcompanyLists } from '@/api/system/company'
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
      StatusList: [],
      companyIdList: []
    }
  },
  created() {
    const data = {
    }
    guideUserStatus(data).then(res => {
      this.StatusList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
  }
}
</script>
