<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.activityName" clearable size="small" placeholder="输入活动名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.activityId" clearable size="small" placeholder="活动列表" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in activityIdList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" placeholder="奖品类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.level" clearable size="small" placeholder="奖品等级" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in levelList"
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
import { getraffleactivityLists } from '@/api/activity/raffleactivity'
import { activitiestypeLists } from '@/api/activity/raffleprize'
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
      activityIdList: [],
      typeList: [],
      levelList: [
        {
          value: 1,
          label: '一等奖'
        },
        {
          value: 2,
          label: '二等奖'
        },
        {
          value: 3,
          label: '三等奖'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    getraffleactivityLists(data).then(res => {
      this.activityIdList = res.data
    })
    activitiestypeLists(data).then(res => {
      this.typeList = res.data
    })
  }
}
</script>
