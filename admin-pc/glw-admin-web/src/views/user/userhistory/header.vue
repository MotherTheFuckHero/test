<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.keyword" clearable size="small" placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.from" clearable size="small" placeholder="来源" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in fromList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <span>创建时间:</span>
    <el-date-picker
      v-model="query.startCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <span style="height: 40px;line-height: 40px;margin-right: 10px;">-</span>
    <el-date-picker
      v-model="query.endCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
    />
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getsystemLists } from '@/api/system/sys'
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
      fromList: [
        {
          value: 'pc',
          name: '网页注册'
        },
        {
          value: 'app',
          name: 'App注册'
        },
        {
          value: 'wx',
          name: '公众号'
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
  }
}
</script>
