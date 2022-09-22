<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.ip" clearable size="small" placeholder="输入访问ip搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
      statusList: [
        {
          value: 1,
          label: '成功'
        },
        {
          value: 2,
          label: '失败'
        },
        {
          value: 3,
          label: '异步'
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
