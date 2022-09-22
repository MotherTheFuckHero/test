<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入标题名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />

    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.companyId" clearable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.languageId" clearable size="small" placeholder="语言" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in languageIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.position" clearable size="small" placeholder="位置" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in positionList"
        :key="parseFloat(item.dataCode)"
        :label="item.dataDesc"
        :value="parseFloat(item.dataCode)"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import { getcompanyLists } from '@/api/system/company'
import { getsystemLists } from '@/api/system/sys'
import { positionLists } from '@/api/system/advertisement'
import { getlanguageLists } from '@/api/system/language'
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
      systemIdList: [],
      companyIdList: [],
      positionList: [],
      languageIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    positionLists(data).then(res => {
      this.positionList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  }
}
</script>
