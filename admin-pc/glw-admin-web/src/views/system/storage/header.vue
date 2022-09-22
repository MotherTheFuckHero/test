<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入文件名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
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
    <el-select v-model="query.type" clearable size="small" placeholder="文件类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.dataCode"
        :label="item.dataDesc"
        :value="item.dataCode"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getsystemLists } from '@/api/system/sys'
import { getlanguageLists } from '@/api/system/language'
import { typeLists } from '@/api/system/storage'
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
      typeList: [],
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
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  }
}
</script>
