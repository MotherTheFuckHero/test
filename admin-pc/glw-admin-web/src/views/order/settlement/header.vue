<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select
      v-model="query.merchantId"
      clearable
      filterable
      size="small"
      placeholder="商家"
      class="filter-item"
      @change="crud.toQuery"
    >
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select
      v-model="query.status"
      clearable
      size="small"
      placeholder="状态"
      class="filter-item"
      @change="crud.toQuery"
    >
      <el-option
        v-for="item in settlementstatusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <span>开始时间:</span>
    <el-date-picker
      v-model="query.startSettlementDate"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <span>结束时间:</span>
    <el-date-picker
      v-model="query.endSettlementDate"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <el-checkbox v-model="query.isShow" @change="crud.toQuery">仅显示订单总额大于0的订单</el-checkbox>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getmerchantLists } from '@/api/merchant/merchant'
import { settlementStatusList } from '@/api/order/order'

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
      merchantIdList: [],
      settlementstatusList: []
    }
  },
  created() {
    const data = {
      status: 3
    }
    const datas = {
      status: 1
    }
    getmerchantLists(data).then(res => {
      this.merchantIdList = res.data
    })
    settlementStatusList(datas).then(res => {
      this.settlementstatusList = res.data
    })
  }
}
</script>
