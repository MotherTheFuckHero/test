<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.noticeTitle" clearable size="small" placeholder="输入标题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
    <el-select v-model="query.noticeType" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in noticeTypeList"
        :key="item.dataCode"
        :label="item.dataValue"
        :value="item.dataCode"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
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
import { getsystemLists } from '@/api/system/sys'
import { getlanguageLists } from '@/api/system/language'
import { sysnoticetypeList } from '@/api/system/sysnotice'
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
      languageIdList: [],
      noticeTypeList: [],
      statusList: [
        {
          value: 1,
          name: '显示'
        },
        {
          value: 2,
          name: '隐藏'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    sysnoticetypeList(data).then(res => {
      this.noticeTypeList = res.data
    })
  }
}
</script>
