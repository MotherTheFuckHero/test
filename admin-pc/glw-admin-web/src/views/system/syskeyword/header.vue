<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.keyword" clearable size="small" placeholder="输入系统关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
    <el-select v-model="query.isHot" clearable size="small" placeholder="是否热门" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in isHotList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.isDefault" clearable size="small" placeholder="是否默认" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in isDefaultList"
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
import { getsystemLists } from '@/api/system/sys'
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
      systemIdList: [],
      languageIdList: [],
      isHotList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      isDefaultList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
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
  }
}
</script>
