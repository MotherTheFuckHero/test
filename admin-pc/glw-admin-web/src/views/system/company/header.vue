<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.companyName" clearable size="small" placeholder="输入公司名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.nickName" clearable size="small" placeholder="输入公司昵称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.companyCode" clearable size="small" placeholder="输入公司编码搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.cityId" clearable size="small" filterable placeholder="所在城市" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parentIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.companyType" clearable size="small" placeholder="公司类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyTypeList"
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
import { getcityLists } from '@/api/system/city'
import { companytypeLists } from '@/api/system/company'
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
      companyTypeList: [],
      parentIdList: []
    }
  },
  created() {
    const data = {}
    companytypeLists(data).then(res => {
      this.companyTypeList = res.data
    })
    getcityLists(data).then(res => {
      this.parentIdList = res.data
    })
  }
}
</script>
