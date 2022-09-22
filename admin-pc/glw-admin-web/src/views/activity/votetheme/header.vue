<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.title" clearable size="small" placeholder="输入投票主题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in votetypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <span>开始时间:</span>
    <el-date-picker
      v-model="query.startStartTime"
      type="datetime"
      size="small"
      class="filter-item"
      style="width: 200px;"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <span style="height: 40px;line-height: 40px;margin-right: 10px;">-</span>
    <el-date-picker
      v-model="query.endStartTime"
      type="datetime"
      size="small"
      class="filter-item"
      style="width: 200px;"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <span>结束时间:</span>
    <el-date-picker
      v-model="query.startEndTime"
      type="datetime"
      size="small"
      class="filter-item"
      style="width: 200px;"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <span style="height: 40px;line-height: 40px;margin-right: 10px;">-</span>
    <el-date-picker
      v-model="query.endEndTime"
      type="datetime"
      size="small"
      class="filter-item"
      style="width: 200px;"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getsystemLists } from '@/api/system/sys'
import { activitiesstatusLists } from '@/api/activity/raffleactivity'
import { votetypeLists } from '@/api/activity/votetheme'
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
      statusList: [],
      votetypeList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    activitiesstatusLists(data).then(res => {
      this.statusList = res.data
    })
    votetypeLists(data).then(res => {
      this.votetypeList = res.data
    })
  }
}
</script>
