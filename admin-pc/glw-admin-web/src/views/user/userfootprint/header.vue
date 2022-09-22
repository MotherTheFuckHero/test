<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.footprintType" clearable size="small" placeholder="浏览类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in footprintTypeList"
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
import { FootprinttypeList } from '@/api/user/userinfo'
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
      footprintTypeList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    FootprinttypeList(data).then(res => {
      this.footprintTypeList = res.data
    })
  }
}
</script>
