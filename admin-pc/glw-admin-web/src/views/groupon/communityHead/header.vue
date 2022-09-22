<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入团长昵称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.phone" clearable size="small" placeholder="输入团长手机号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.withdrawType" clearable size="small" placeholder="提现方式" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in withdrawTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.expensesType" clearable size="small" placeholder="费用类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in expensesTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
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
import { getWithdrawType, getExpensesTypeEnum } from '@/api/groupon/communityHead'
import { getcommunityLists } from '@/api/groupon/community'
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
      withdrawTypeList: [],
      expensesTypeList: [],
      communityIdList: [],
      statusList: [
        {
          value: 0,
          name: '未审核'
        },
        {
          value: 1,
          name: '审核通过'
        }
      ]

    }
  },
  created() {
    const data = {
      status: 1
    }
    getWithdrawType(data).then(res => {
      this.withdrawTypeList = res.data
    })
    getExpensesTypeEnum(data).then(res => {
      this.expensesTypeList = res.data
    })
    getcommunityLists(data).then(res => {
      this.communityIdList = res.data
    })
  }
}
</script>
