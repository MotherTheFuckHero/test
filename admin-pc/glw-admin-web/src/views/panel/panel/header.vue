<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入板块名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.languageId" clearable size="small" placeholder="语言" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in languageIdList"
        :key="item.id"
        :label="item.name"
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
    <el-select v-model="query.type" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in paneltypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getlanguageLists } from '@/api/system/language'
import { paneltypeList } from '@/api/panel/panel'
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
      languageIdList: [],
      companyIdList: [],
      paneltypeList: [],
      statusList: [ // 状态列表
        {
          value: 1,
          label: '显示'
        },
        {
          value: 2,
          label: '隐藏'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    paneltypeList(data).then(res => {
      this.paneltypeList = res.data
    })
  }
}
</script>
