<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.title" clearable size="small" placeholder="输入商品名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.merchantId" filterable size="small" placeholder="商家" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <span>开始时间:</span>
    <el-date-picker
      v-model="query.startCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <span>结束时间:</span>
    <el-date-picker
      v-model="query.endCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <rrOperation />

  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getmerchantLists } from '@/api/merchant/merchant'
import { orderStatusLists } from '@/api/order/order'
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
      orderstatusList: []
    }
  },
  created() {
    const data = {
    }
    orderStatusLists(data).then(res => {
      this.orderstatusList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  }
}
</script>
