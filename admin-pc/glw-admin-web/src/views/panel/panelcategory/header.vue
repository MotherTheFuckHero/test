<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入分类名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.panelId" clearable size="small" placeholder="板块" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in panelList"
        :key="item.id"
        :label="item.name+'('+item.companyName+')'"
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
import { getpanelLists } from '@/api/panel/panel'
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
      panelList: [],
      statusList: [ // 状态列表
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1,
      type: 2
    }
    getpanelLists(data).then(res => {
      this.panelList = res.data
    })
  }
}
</script>
