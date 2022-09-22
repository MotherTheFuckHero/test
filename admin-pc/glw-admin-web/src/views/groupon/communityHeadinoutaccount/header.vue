<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.orderId" clearable size="small" placeholder="输入订单编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.headId" clearable size="small" filterable placeholder="团长" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in headIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" filterable placeholder="提现方式" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
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
import { getcommunityheadLists } from '@/api/groupon/communityHead'
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
      headIdList: [],
      typeList: [
        {
          value: 1,
          name: '进账'
        },
        {
          value: 2,
          name: '出账'
        }
      ]
    }
  },
  created() {
    const data = {
    }
    getcommunityheadLists(data).then(res => {
      this.headIdList = res.data
    })
  }
}
</script>
